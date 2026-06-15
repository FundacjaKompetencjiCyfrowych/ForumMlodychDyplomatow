import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const heroDivisionsSection = defineType({
  name: "heroDivisionsSection",
  title: "Hero Przedstawicielstwa",
  type: "object",
  preview: createSectionPreview("heroDivisionsSection", {
    title: "Hero Przedstawicielstwa",
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
