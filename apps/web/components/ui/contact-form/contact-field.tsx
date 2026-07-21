import { cn } from "@/lib/utils";
import type { ContactErrorKey } from "@/lib/contact-schema";
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
  /** Translation key of the current validation failure, if any. */
  error?: ContactErrorKey;
};

/** A labeled text input or textarea with brand styling and an inline error message. */
export const ContactField = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  multiline = false,
  rows,
  error,
}: ContactFieldProps) => {
  const errorId = `${name}-error`;
  // Wires the control to its message so assistive tech announces the two together.
  const a11yProps = {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-lg font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className={fieldClassName(!!error, true)}
          {...a11yProps}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={fieldClassName(!!error)}
          {...a11yProps}
        />
      )}
      <ContactFieldError id={errorId} messageKey={error} />
    </div>
  );
};
