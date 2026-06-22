import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const divisionsListSection = defineType({
  name: "divisionsListSection",
  title: "Sekcja Listy przedstawicielstw",
  type: "object",
  preview: createSectionPreview("divisionsListSection", {
    title: "Sekcja Listy przedstawicielstw",
    subtitle: "heading",
  }),
  fields: [
    defineField({
      name: "header",
      type: "string",
      title: "Nagłówek",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      type: "string",
      title: "Tekst pod nagłówkiem",
    }),
  ],
});
