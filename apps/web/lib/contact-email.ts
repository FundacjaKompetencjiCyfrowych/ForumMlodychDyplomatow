/**
 * Renders the notification email for a contact-form submission.
 *
 * Kept separate from the API route so the escaping and body layout can be unit-tested
 * in isolation. Labels are Polish because the recipient is always the Polish-speaking
 * organisation; the visitor's own address is set as `replyTo` by the caller.
 */

export type ContactEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

/** Escape user-supplied text before interpolating it into the HTML body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const row = (label: string, value: string) =>
  `<p style="margin:0 0 8px;font-size:14px;line-height:1.5;color:#111827;">` +
  `<strong style="color:#374151;">${label}:</strong> ${value}</p>`;

/** Build the plaintext + HTML bodies for a contact-form notification email. */
export function buildContactEmail(data: ContactEmailData): { text: string; html: string } {
  const text = [
    `Imię i nazwisko: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    `Temat: ${data.subject}`,
    "",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const esc = {
    firstName: escapeHtml(data.firstName),
    lastName: escapeHtml(data.lastName),
    email: escapeHtml(data.email),
    phone: data.phone ? escapeHtml(data.phone) : "",
    subject: escapeHtml(data.subject),
    message: escapeHtml(data.message).replace(/\n/g, "<br>"),
  };

  const html = [
    `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;">`,
    row("Imię i nazwisko", `${esc.firstName} ${esc.lastName}`),
    row("Email", esc.email),
    esc.phone ? row("Telefon", esc.phone) : "",
    row("Temat", esc.subject),
    `<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />`,
    `<p style="margin:0;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${esc.message}</p>`,
    `</div>`,
  ].join("");

  return { text, html };
}
