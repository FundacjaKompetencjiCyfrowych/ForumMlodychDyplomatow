import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich Text",
  type: "object",
  preview: createSectionPreview("richTextSection", {
    title: "Rich Text - Główny",
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
      name: "text",
      title: "Tekst",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
  ],
});
