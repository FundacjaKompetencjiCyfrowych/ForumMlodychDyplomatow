import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

type ContactFieldErrorProps = {
  /** When false, nothing renders. */
  show: boolean;
};

/** Inline "this field is required" message shown under an invalid field. */
export const ContactFieldError = ({ show }: ContactFieldErrorProps) => {
  const t = useTranslations("contactForm");
  if (!show) return null;
  return (
    <div className="mt-1.5 flex items-center gap-1.5 text-brand-red">
      <AlertTriangle className="h-4 w-4" strokeWidth={2} />
      <span className="text-[13px] font-medium">{t("requiredError")}</span>
    </div>
  );
};
