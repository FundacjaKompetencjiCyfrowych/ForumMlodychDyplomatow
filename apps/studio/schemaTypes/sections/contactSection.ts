import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const contactSection = defineType({
  name: "contactSection",
  title: "Sekcja Kontaktowa",
  type: "object",
  preview: createSectionPreview("contactSection", { title: "Sekcja Kontakt", subtitle: "heading" }),
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Nagłówek (np. Kontakt)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "text",
      title: "Podtytuł / Krótki opis",
      description: "Tekst wyświetlany pod głównym nagłówkiem.",
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: "Wyświetlany Email",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "contactAddress",
      type: "string",
      title: "Wyświetlany Adres",
    }),
    defineField({
      name: "recipientEmail",
      type: "string",
      title: "Email docelowy formularza",
      description: "Na jaki adres e-mail mają trafiać wiadomości z tego formularza?",
      validation: (Rule) => Rule.required().email(),
    }),
  ],
});
