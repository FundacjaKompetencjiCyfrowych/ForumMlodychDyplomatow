import { z } from "zod";

/**
 * Validation for the visitor-supplied contact fields, shared by the client form
 * (`useContactForm`) and the API route (`/api/contact`) so the two cannot drift.
 *
 * Each message is a **translation key** under the `contactForm` namespace rather
 * than prose — the client resolves it with `useTranslations`, and the server
 * never surfaces it to the user at all.
 */
export const contactFieldsSchema = z.object({
  firstName: z.string().trim().min(1, "requiredError").max(100, "tooLong"),
  lastName: z.string().trim().min(1, "requiredError").max(100, "tooLong"),
  // `.pipe` runs last, so an empty value reports "requiredError" rather than
  // the less helpful "invalidEmail".
  email: z
    .string()
    .trim()
    .min(1, "requiredError")
    .max(254, "tooLong")
    .pipe(z.email("invalidEmail")),
  phone: z.string().trim().max(50, "tooLong").optional().or(z.literal("")),
  subject: z.string().trim().min(1, "requiredError").max(200, "tooLong"),
  message: z.string().trim().min(1, "requiredError").max(5000, "tooLong"),
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;
export type ContactFieldName = keyof ContactFields;

/** Translation keys any field can fail with. */
export type ContactErrorKey = "requiredError" | "invalidEmail" | "tooLong";
