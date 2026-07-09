import type React from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type Errors = Record<string, boolean>;

const NO_ERRORS: Errors = {
  firstName: false,
  lastName: false,
  email: false,
  subject: false,
  message: false,
};

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setErrors({
        firstName: !form.firstName.value.trim(),
        lastName: !form.lastName.value.trim(),
        email: !form.email.value.trim(),
        subject: !form.subject.value.trim(),
        message: !form.message.value.trim(),
      });
      return;
    }

    setErrors(NO_ERRORS);
    setIsSubmitting(true);

    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
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

      toast.success(t("successMessage"));
      form.reset();
      startedAtRef.current = Date.now();
    } catch {
      // Keep the user's input so they can retry; point them at the direct address.
      toast.error(contactEmail ? t("errorMessageWithEmail", { email: contactEmail }) : t("errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, errors, handleSubmit };
};