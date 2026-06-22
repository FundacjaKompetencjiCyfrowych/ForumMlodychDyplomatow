import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const eventsDivisionsSection = defineType({
  name: "eventsDivisionsSection",
  title: "Sekcja wydarzeń przedstawicielstw",
  type: "object",
  preview: createSectionPreview("eventsDivisionsSection", {
    title: "Sekcja wydarzeń przedstawicielstwa",
    subtitle: "header",
  }),
  fields: [
    defineField({
      name: "header",
      type: "string",
      title: "Nagłówek",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
