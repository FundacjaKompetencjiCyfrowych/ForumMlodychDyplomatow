import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const divisionsSection = defineType({
  name: "divisionsSection",
  title: "Przedstawicielstwa",
  type: "object",
  preview: createSectionPreview("divisionsSection", {
    title: "Przedstawicielstwa",
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
  ],
});
