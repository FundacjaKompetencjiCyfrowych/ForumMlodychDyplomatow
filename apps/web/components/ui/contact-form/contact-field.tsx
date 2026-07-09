import { cn } from "@/lib/utils";
import { ContactFieldError } from "./contact-field-error";

/** Shared border/focus styling for a text input or textarea, with error state. */
export const fieldClassName = (hasError: boolean, multiline = false) =>
  cn(
    "w-full rounded-none border bg-white text-sm transition-colors outline-none placeholder:text-slate-400",
    multiline ? "min-h-30 resize-y px-4 py-3" : "px-4 py-2.5",
    hasError
      ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
      : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
  );

type ContactFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  /** Whether the field is currently flagged invalid (drives red styling + message). */
  hasError?: boolean;
};

/** A labeled text input or textarea with brand styling and an inline required-error. */
export const ContactField = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  multiline = false,
  rows,
  hasError = false,
}: ContactFieldProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="text-lg font-medium text-brand-gray-900">
      {label}
    </label>
    {multiline ? (
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={fieldClassName(hasError, true)}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClassName(hasError)}
      />
    )}
    <ContactFieldError show={hasError} />
  </div>
);
