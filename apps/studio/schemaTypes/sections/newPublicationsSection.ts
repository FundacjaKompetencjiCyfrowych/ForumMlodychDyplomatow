import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const newPublicationsSection = defineType({
  name: "newPublicationsSection",
  title: "Sekcja Nowe Publikacje",
  type: "object",
  preview: createSectionPreview("newPublicationsSection", {
    title: "Sekcja Nowe Publikacje",
    subtitle: "heading",
  }),
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Nagłówek",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
