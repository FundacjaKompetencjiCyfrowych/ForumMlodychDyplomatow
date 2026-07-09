import { type NextRequest, NextResponse } from "next/server";
import { stegaClean } from "next-sanity";
import { Resend } from "resend";
import { z } from "zod";
import { client } from "@/sanity/client";
import { buildContactEmail } from "@/lib/contact-email";

/**
 * Contact form submission endpoint.
 *
 * Security model:
 * - The destination address is NEVER taken from the request body. The browser sends
 *   only the section `_key`; we re-read `recipientEmail` from Sanity server-side, so the
 *   endpoint can't be abused as an open relay.
 * - Anti-spam: a honeypot field (`company`) plus a min-time check, plus optional per-IP
 *   rate limiting (Upstash). Bots that trip the honeypot get a fake `200`.
 * - The email is sent from `CONTACT_FROM_EMAIL`; the visitor's address is set as
 *   `replyTo` so replies reach them directly. For production deliverability, verify a
 *   sending domain in Resend and point `CONTACT_FROM_EMAIL` at an address on it.
 */

const bodySchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
  sectionKey: z.string().trim().min(1).max(100),
  // Honeypot — must stay empty. Bots tend to fill every field.
  company: z.string().optional(),
  // Client-captured timestamp (ms) of when the form was rendered. Required: a
  // missing value is treated as a bot signal (see the timing check below).
  startedAt: z.number().int(),
});

// Minimum time (ms) a genuine human needs to fill the form. Faster = bot.
const MIN_FILL_TIME_MS = 2500;
const SEND_TIMEOUT_MS = 10_000;

// Lazily-created singletons so a cold start with missing env doesn't crash on import.
let resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

// Optional Upstash rate limiter (5 requests / 10 min per IP). Skipped if unconfigured.
// Accepts credentials under either the native `UPSTASH_REDIS_REST_*` names or the
// `KV_REST_API_*` names the Vercel Marketplace integration injects.
type Limiter = { limit: (id: string) => Promise<{ success: boolean }> };
let limiter: Limiter | null | undefined;
async function getLimiter(): Promise<Limiter | null> {
  if (limiter !== undefined) return limiter;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    limiter = null;
    return limiter;
  }
  const { Ratelimit } = await import("@upstash/ratelimit");
  const { Redis } = await import("@upstash/redis");
  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    prefix: "ratelimit:contact",
  });
  return limiter;
}

// Uniform error envelope. `error` is a stable machine-readable code (never a raw
// message) so the client can branch without anything sensitive leaking.
function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

async function resolveRecipient(sectionKey: string): Promise<string | null> {
  // Deliberately uses `client.fetch` rather than the repo-standard `sanityFetch`/
  // `runQuery`: this is a POST handler that needs a fresh, uncached, published read,
  // whereas `sanityFetch` layers ISR caching and draft/live-preview semantics meant
  // for React Server Components. (The `pageBuilder[_key == $key]` union projection is
  // also impractical to express in GROQD's typed builder.)
  const recipient = await client.fetch<string | null>(
    `*[defined(pageBuilder) && count(pageBuilder[_key == $key]) > 0][0].pageBuilder[_key == $key][0].recipientEmail`,
    { key: sectionKey },
    { perspective: "published" }
  );
  const cleaned = stegaClean(recipient);
  return z.email().safeParse(cleaned).success ? (cleaned as string) : null;
}

export async function POST(req: NextRequest) {
  try {
    // Config guard — logged server-side only, never leaked to the client.
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
      console.error("[contact] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL");
      return fail("server_misconfigured", 500);
    }

    // Rate limit by IP (best-effort; no-op if Upstash isn't configured).
    const rl = await getLimiter();
    if (rl) {
      const { success } = await rl.limit(getClientIp(req));
      if (!success) {
        return fail("rate_limited", 429);
      }
    }

    let json: unknown;
    try {
      json = await req.json();
    } catch {
      return fail("invalid_body", 400);
    }

    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return fail("validation", 400);
    }
    const data = parsed.data;

    // Honeypot: pretend success so bots don't retry, but send nothing.
    if (data.company && data.company.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Timing check: anything filled faster than a human — including a future-dated
    // `startedAt` (negative delta) — is treated like the honeypot: fake success, no send.
    // Tradeoff: a visitor whose device clock runs ahead of the server is silently
    // dropped. Rare, and fails safe (no error shown); a server-issued token would avoid
    // this but is out of scope here.
    if (Date.now() - data.startedAt < MIN_FILL_TIME_MS) {
      return NextResponse.json({ ok: true });
    }

    // Destination resolved server-side from Sanity — never from the request.
    const recipient = await resolveRecipient(data.sectionKey);
    if (!recipient) {
      console.error(`[contact] No recipientEmail for section key ${data.sectionKey}`);
      return fail("recipient_unavailable", 400);
    }

    const resendClient = getResend();
    if (!resendClient) {
      return fail("server_misconfigured", 500);
    }

    const { text, html } = buildContactEmail(data);

    let result;
    try {
      // Guard against a hung provider stalling the serverless function.
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("resend_timeout")), SEND_TIMEOUT_MS)
      );
      result = await Promise.race([
        resendClient.emails.send({
          from: process.env.CONTACT_FROM_EMAIL,
          to: recipient,
          replyTo: data.email,
          subject: `Kontakt: ${data.subject}`,
          text,
          html,
        }),
        timeout,
      ]);
    } catch (err) {
      // Network error / timeout / thrown SDK error.
      console.error("[contact] Resend request failed:", err);
      return fail("send_failed", 502);
    }

    if (result.error) {
      // Provider returned an error payload (e.g. invalid domain, throttled).
      console.error("[contact] Resend returned error:", result.error);
      return fail("send_failed", 502);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return fail("server_error", 500);
  }
}
