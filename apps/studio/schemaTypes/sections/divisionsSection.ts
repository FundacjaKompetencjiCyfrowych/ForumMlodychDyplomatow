import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const divisionsSection = defineType({
  name: "divisionsSection",
  title: "Sekcja Przedstawicielstwa",
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
      name: "divisions",
      type: "array",
      title: "Przedstawicielstwa",
      description: "Lista używana do utrzymania odpowiedniej kolejności",
      of: [{ type: "reference", to: [{ type: "division" }] }],
    }),
  ],
});
