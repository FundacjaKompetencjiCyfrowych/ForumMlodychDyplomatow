"use client";

import { useEffect, useRef } from "react";
import { Button } from "../button";
import { Typography } from "../typography";

type ContactSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  /** Label for the closing button (translated). */
  closeLabel: string;
  /** Source of the decorative icon shown above the title. Static asset in /public. */
  imageSrc?: string;
};

/**
 * Centered popup shown after a successful contact form submission.
 * Overlays the viewport (backdrop + dialog); closes on backdrop click, Escape, or the button.
 */
export const ContactSuccessModal = ({
  open,
  onClose,
  title,
  description,
  closeLabel,
  imageSrc = "/success.svg",
}: ContactSuccessModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    // Move focus into the dialog and close it on Escape.
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    // Prevent the page behind the dialog from scrolling while it's open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center rounded-xs bg-black/50 p-16 text-black">
      {/* Backdrop — a real button so it's dismissible by click and keyboard. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex w-full max-w-md flex-col items-center gap-4 bg-white p-8 text-center shadow-xl"
      >
        {imageSrc && (
          // Decorative — the title/description already convey the message.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt="" aria-hidden="true" className="h-20 w-20" />
        )}
        <Typography as="h2" variant="title-m">
          {title}
        </Typography>
        <Typography as="p" variant="body-m">
          {description}
        </Typography>
        <Button
          ref={closeButtonRef}
          type="button"
          variant="secondary"
          onClick={onClose}
          className="mt-2"
        >
          {closeLabel}
        </Button>
      </div>
    </div>
  );
};
