import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const headingSection = defineType({
  name: "headingSection",
  title: "Sekcja Nagłówek",
  type: "object",
  preview: createSectionPreview("headingSection", {
    title: "Nagłówek",
    subtitle: "heading",
    media: "image",
  }),
  fields: [
    defineField({
      name: "heading",
      title: "Nagłówek",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Podnagłówek",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Obraz",
      type: "img",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
