"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("contactForm");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stan błędów używany do stylowania (border-brand-red)
  const [errors, setErrors] = useState<Record<string, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    subject: false,
    message: false,
  });

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

    setErrors({ firstName: false, lastName: false, email: false, subject: false, message: false });
    setIsSubmitting(true);

    // To use later when sending form is implemented
    // const formData = new FormData(form);
    // const data = Object.fromEntries(formData.entries());

    setIsSubmitting(false);
    form.reset();
  };

  const renderError = (hasError: boolean) => {
    if (!hasError) return null;
    return (
      <div className="mt-1.5 flex items-center gap-1.5 text-brand-red">
        <AlertTriangle className="h-4 w-4" strokeWidth={2} />
        <span className="text-[13px] font-medium">{t("requiredError")}</span>
      </div>
    );
  };

  return (
    // noValidate wyłącza dymki przeglądarki, pozwalając na Twoją pełną kontrolę
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* firstName */}
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="text-lg font-medium text-brand-gray-900">
          {t("firstName")}
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          placeholder={t("placeholders.firstName")}
          className={cn(
            "w-full rounded-none border bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400",
            errors.firstName
              ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
          )}
        />
        {renderError(errors.firstName)}
      </div>

      {/* lastName */}
      <div className="flex flex-col gap-2">
        <label htmlFor="lastName" className="text-lg font-medium text-brand-gray-900">
          {t("lastName")}
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          required
          placeholder={t("placeholders.lastName")}
          className={cn(
            "w-full rounded-none border bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400",
            errors.lastName
              ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
          )}
        />
        {renderError(errors.lastName)}
      </div>

      {/* email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-lg font-medium text-brand-gray-900">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("placeholders.email")}
          className={cn(
            "w-full rounded-none border bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400",
            errors.email
              ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
          )}
        />
        {renderError(errors.email)}
      </div>

      {/* phone */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-lg font-medium text-brand-gray-900">
          {t("phone")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder={t("placeholders.phone")}
          className="w-full rounded-none border border-brand-slate-400 bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
        />
      </div>

      {/* subject */}
      <div className="flex flex-col gap-1">
        <label htmlFor="subject" className="mb-1 text-lg font-medium text-brand-gray-900">
          {t("subject")}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder={t("placeholders.subject")}
          className={cn(
            "w-full rounded-none border bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400",
            errors.subject
              ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
          )}
        />
        {renderError(errors.subject)}
      </div>

      {/* message */}
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="mb-1 text-lg font-medium text-brand-gray-900">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={t("placeholders.message")}
          className={cn(
            "min-h-30 w-full resize-y rounded-none border bg-white px-4 py-3 text-sm transition-colors outline-none placeholder:text-slate-400",
            errors.message
              ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
          )}
        />
        {renderError(errors.message)}
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting} className="lg:max-w-70">
        {isSubmitting ? t("sending") : t("submit")}
      </Button>
    </form>
  );
};
