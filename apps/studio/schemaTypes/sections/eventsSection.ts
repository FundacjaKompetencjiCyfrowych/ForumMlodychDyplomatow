import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const eventsSection = defineType({
  name: "eventsSection",
  title: "Krótkie Wydarzenia",
  type: "object",
  preview: createSectionPreview("eventsSection", {
    title: "Krótkie Wydarzenia",
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
      name: "link",
      type: "link",
      title: "Link",
      description: 'Link pod listą wydarzeń, np "zobacz więcej"',
    }),
  ],
});
