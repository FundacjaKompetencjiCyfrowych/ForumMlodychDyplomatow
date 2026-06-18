"use client";

import React, { useState } from "react";
import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading } from "../../lib/heading";
import { Mail, Phone, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const translations = {
  pl: {
    starsign: "Pola oznaczone symbolem (*) są obowiązkowe",
    firstName: "Imię*",
    lastName: "Nazwisko*",
    email: "Email*",
    phone: "Numer telefonu",
    subject: "Temat*",
    message: "Treść*",
    submit: "Wyślij",
    sending: "Wysyłanie...",
    requiredError: "Proszę uzupełnić wszystkie wymagane pola.",
    placeholders: {
      firstName: "Jan",
      lastName: "Wiśniewski",
      email: "jan.wisniewski@gmail.com",
      phone: "(+48) 123 456 789",
      subject: "Np. Współpraca, pytanie dotyczące wydarzenia",
      message: "Opisz swoją sprawę lub wpisz treść wiadomości",
    },
  },
  en: {
    starsign: "Fields marked with (*) are require",
    firstName: "First Name*",
    lastName: "Last Name*",
    email: "Email*",
    phone: "Phone number",
    subject: "Subject*",
    message: "Message*",
    submit: "Send",
    sending: "Sending...",
    requiredError: "Please fill in all required fields.",
    placeholders: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@gmail.com",
      phone: "(+48) 123 456 789",
      subject: "E.g. Cooperation, event inquiry",
      message: "Describe your matter or type your message",
    },
  },
};

export const ContactSection = ({
  index,
  data,
  locale = "pl",
}: PageBuilderSectionProps<"contactSection"> & { locale?: string }) => {
  const t = translations[locale as keyof typeof translations] || translations.pl;
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const formData = new FormData(form);

    // const data = Object.fromEntries(formData.entries());
    const newErrors = {
      firstName: !(formData.get("firstName") as string)?.trim(),
      lastName: !(formData.get("lastName") as string)?.trim(),
      email: !(formData.get("email") as string)?.trim(),
      subject: !(formData.get("subject") as string)?.trim(),
      message: !(formData.get("message") as string)?.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    setIsSubmitting(false);

    form.reset();
  };

  // Helper do renderowania komunikatu o błędzie
  const renderError = (hasError: boolean) => {
    if (!hasError) return null;
    return (
      <div className="mt-1.5 flex items-center gap-1.5 text-brand-red">
        <AlertTriangle className="h-4 w-4" strokeWidth={2} />
        <span className="text-[13px] font-medium">{t.requiredError}</span>
      </div>
    );
  };

  return (
    <Container className="py-16">
      <div className="mx-auto grid max-w-300 grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
        {/* LEWA KOLUMNA */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <Typography as={getHeading(index)} variant="title">
              {data.heading}
            </Typography>

            {data.subtitle && (
              <Typography as="p" variant="p1" className="font-semibold lg:text-xl">
                {data.subtitle}
              </Typography>
            )}
            <Typography as="p" variant="p1" className="">
              {t.starsign}
            </Typography>
          </div>

          <div className="flex flex-col gap-2">
            {data.contactEmail && (
              <div className="text- flex items-center gap-3">
                <Mail className="h-5 w-5" strokeWidth={1.5} />
                <a
                  href={`mailto:${data.contactEmail}`}
                  className="text-brand-gray-900 underline underline-offset-4 transition-colors hover:text-brand-blue"
                >
                  {data.contactEmail}
                </a>
              </div>
            )}

            {data.contactPhone && (
              <div className="flex items-center gap-3 text-brand-gray-900">
                <Phone className="h-5 w-5" strokeWidth={1.5} />
                <a
                  href={`tel:${data.contactPhone.replace(/\s/g, "")}`}
                  className="text-brand-gray-900 underline underline-offset-4 transition-colors hover:text-brand-blue"
                >
                  {data.contactPhone}
                </a>
              </div>
            )}

            {data.contactAddress && (
              <div className="text- flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
                <Typography as="span" variant="p1" className="text-brand-gray-900">
                  {data.contactAddress}
                </Typography>
              </div>
            )}
          </div>
        </div>

        {/* PRAWA KOLUMNA */}
        <div className="flex w-full flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-lg font-medium text-brand-gray-900">
                {t.firstName}
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder={t.placeholders.firstName}
                className={cn(
                  "w-full rounded-none border bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400",
                  errors.firstName
                    ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                    : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                )}
              />
              {renderError(errors.firstName)}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-lg font-medium text-brand-gray-900">
                {t.lastName}
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder={t.placeholders.lastName}
                className={cn(
                  "w-full rounded-none border bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400",
                  errors.lastName
                    ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                    : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                )}
              />
              {renderError(errors.lastName)}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-medium text-brand-gray-900">
                {t.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t.placeholders.email}
                className={cn(
                  "w-full rounded-none border bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400",
                  errors.email
                    ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                    : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                )}
              />
              {renderError(errors.email)}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-lg font-medium text-brand-gray-900">
                {t.phone}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder={t.placeholders.phone}
                className={cn(
                  "w-full rounded-none border border-brand-slate-400 bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="subject" className="mb-1 text-lg font-medium text-brand-gray-900">
                {t.subject}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder={t.placeholders.subject}
                className={cn(
                  "w-full rounded-none border bg-white px-4 py-2.5 text-sm transition-colors outline-none placeholder:text-slate-400",
                  errors.subject
                    ? "border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                    : "border-brand-slate-400 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                )}
              />
              {renderError(errors.subject)}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="mb-1 text-lg font-medium text-brand-gray-900">
                {t.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={t.placeholders.message}
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
              {isSubmitting ? t.sending : t.submit}
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ContactSection;
