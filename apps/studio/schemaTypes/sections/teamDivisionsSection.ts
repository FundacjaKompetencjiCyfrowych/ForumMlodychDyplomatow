import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const teamDivisionsSection = defineType({
  name: "teamDivisionsSection",
  title: "Zespół Przedstawicielstwa",
  type: "object",
  preview: createSectionPreview("teamDivisionsSection", {
    title: "Zespół",
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
      name: "text",
      type: "text",
      title: "Krótki opis zespołu",
    }),
    defineField({
      name: "members",
      title: "Członkowie",
      description: "Lista członków przedstawicielstwa",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
