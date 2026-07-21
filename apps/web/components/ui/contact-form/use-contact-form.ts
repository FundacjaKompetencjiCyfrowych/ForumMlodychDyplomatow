import type React from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { z } from "zod";
import {
  contactFieldsSchema,
  type ContactErrorKey,
  type ContactFieldName,
} from "@/lib/contact-schema";

/** Per-field translation key for the current validation failure, if any. */
type Errors = Partial<Record<ContactFieldName, ContactErrorKey>>;

const NO_ERRORS: Errors = {};

// Focus order on a failed submit — matches the visual order of the fields.
const FIELD_ORDER: ContactFieldName[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "subject",
  "message",
];

type UseContactFormArgs = {
  /** _key of the contactSection — resolves the destination address server-side. */
  sectionKey: string;
  /** Displayed contact address, surfaced as a fallback if sending fails. */
  contactEmail?: string;
};

/** Owns the contact form's submission behavior: validation, network, and toasts. */
export const useContactForm = ({ sectionKey, contactEmail }: UseContactFormArgs) => {
  const t = useTranslations("contactForm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Timestamp the form was mounted — used server-side for a bot min-time check.
  const startedAtRef = useRef<number>(Date.now());
  // Error state drives border styling (border-brand-red) on required fields.
  const [errors, setErrors] = useState<Errors>(NO_ERRORS);
  // Drives the success popup; only errors use a toast.
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const result = contactFieldsSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      const next: Errors = {};
      for (const field of FIELD_ORDER) {
        const key = fieldErrors[field]?.[0];
        if (key) next[field] = key as ContactErrorKey;
      }
      setErrors(next);

      // Send focus to the first problem so the failure is discoverable without
      // hunting — especially for keyboard and screen-reader users.
      const firstInvalid = FIELD_ORDER.find((field) => next[field]);
      if (firstInvalid) {
        const control = form.elements.namedItem(firstInvalid);
        if (control instanceof HTMLElement) control.focus();
      }
      return;
    }

    setErrors(NO_ERRORS);
    setIsSubmitting(true);

    const payload = {
      ...result.data, // already trimmed by the schema
      company: String(formData.get("company") ?? ""), // honeypot
      sectionKey,
      startedAt: startedAtRef.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setShowSuccess(true);
      form.reset();
      startedAtRef.current = Date.now();
    } catch {
      // Keep the user's input so they can retry; point them at the direct address.
      toast.error(
        contactEmail ? t("errorMessageWithEmail", { email: contactEmail }) : t("errorMessage")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    errors,
    handleSubmit,
    showSuccess,
    closeSuccess: () => setShowSuccess(false),
  };
};
