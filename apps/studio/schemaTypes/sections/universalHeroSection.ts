import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const universalHeroSection = defineType({
  name: "universalHeroSection",
  title: "Uniwersalne Hero",
  type: "object",
  preview: createSectionPreview("universalHeroSection", {
    title: "Hero - Uniwersalne",
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
      name: "caption",
      title: "Podpis",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Zdjęcie Hero",
      type: "gradientImg",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
