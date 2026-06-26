import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const supportUsSection = defineType({
  name: "supportUsSection",
  title: "Sekcja Wspieraj nas",
  type: "object",
  preview: createSectionPreview("supportUsSection", {
    title: "Wspieraj nas",
    subtitle: "heading",
  }),
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Nagłówek",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      type: "string",
      title: "Podtytuł",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Opis",
    }),
    defineField({
      name: "cta",
      type: "link",
      title: "Call to action",
      description: "Główny wyróżniony link w sekcji.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "img",
      title: "Obraz",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
