"use client";

import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useContactForm } from "./contact-form/use-contact-form";
import { ContactField } from "./contact-form/contact-field";
import { HoneypotInput } from "./contact-form/honeypot-input";
import { ContactSuccessModal } from "./contact-form/contact-success-modal";

type ContactFormProps = {
  /** _key of the contactSection — used to resolve the destination address server-side. */
  sectionKey: string;
  /** Displayed contact address, surfaced as a fallback if sending fails. */
  contactEmail?: string;
};

export const ContactForm = ({ sectionKey, contactEmail }: ContactFormProps) => {
  const t = useTranslations("contactForm");
  const { isSubmitting, errors, handleSubmit, showSuccess, closeSuccess } = useContactForm({
    sectionKey,
    contactEmail,
  });

  return (
    <>
      {/* noValidate disables the browser bubbles, giving us full control over errors. */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <HoneypotInput />

        <div className="flex flex-col gap-6 sm:flex-row [&>div]:flex-1">
          <ContactField
            name="firstName"
            label={t("firstName")}
            placeholder={t("placeholders.firstName")}
            required
            error={errors.firstName}
          />
          <ContactField
            name="lastName"
            label={t("lastName")}
            placeholder={t("placeholders.lastName")}
            required
            error={errors.lastName}
          />
        </div>
        <ContactField
          name="email"
          label={t("email")}
          placeholder={t("placeholders.email")}
          type="email"
          required
          error={errors.email}
        />
        <ContactField
          name="phone"
          label={t("phone")}
          placeholder={t("placeholders.phone")}
          type="tel"
          error={errors.phone}
        />
        <ContactField
          name="subject"
          label={t("subject")}
          placeholder={t("placeholders.subject")}
          required
          error={errors.subject}
        />
        <ContactField
          name="message"
          label={""}
          placeholder={t("placeholders.message")}
          multiline
          rows={5}
          required
          error={errors.message}
        />

        <Button type="submit" variant="primary" disabled={isSubmitting} className="lg:max-w-70">
          {isSubmitting ? t("sending") : t("submit")}
        </Button>
      </form>

      <ContactSuccessModal
        open={showSuccess}
        onClose={closeSuccess}
        title={t("successTitle")}
        description={t("successMessage")}
        closeLabel={t("successClose")}
      />
    </>
  );
};
