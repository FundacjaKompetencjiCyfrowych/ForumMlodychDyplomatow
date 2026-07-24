import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ContactErrorKey } from "@/lib/contact-schema";

type ContactFieldErrorProps = {
  /** Id the field's `aria-describedby` points at. */
  id: string;
  /** Translation key of the failure, or undefined when the field is valid. */
  messageKey?: ContactErrorKey;
};

/** Inline validation message shown under an invalid field. */
export const ContactFieldError = ({ id, messageKey }: ContactFieldErrorProps) => {
  const t = useTranslations("contactForm");
  if (!messageKey) return null;
  return (
    <div id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-brand-red">
      <AlertTriangle className="h-4 w-4" strokeWidth={2} />
      <span className="text-[13px] font-medium">{t(messageKey)}</span>
    </div>
  );
};
