import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const universalHeroSection = defineType({
  name: "universalHeroSection",
  title: "Uniwersalna sekcja Hero",
  type: "object",
  preview: createSectionPreview("universalHeroSection", {
    title: "Uniwersalne Hero",
    subtitle: "header",
  }),
  fields: [
    defineField({
      name: "header",
      type: "string",
      title: "Nagłówek",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Opis",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Zdjęcie Hero",
      type: "img",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
