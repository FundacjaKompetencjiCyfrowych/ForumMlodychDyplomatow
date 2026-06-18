import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const peopleSection = defineType({
  name: "peopleSection",
  title: "Sekcja Ludzie",
  type: "object",
  preview: createSectionPreview("peopleSection", {
    title: "Ludzie",
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
      name: "people",
      type: "array",
      title: "Ludzie",
      validation: (Rule) => Rule.required().min(1).max(3),
      of: [
        defineArrayMember({
          name: "group",
          type: "object",
          title: "Grupa",
          fields: [
            defineField({
              name: "groupName",
              type: "string",
              title: "Nazwa grupy",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "members",
              type: "array",
              title: "Członkowie grupy",
              of: [{ type: "reference", to: { type: "person" } }],
              validation: (Rule) => Rule.required().max(4),
            }),
          ],
        }),
      ],
    }),
  ],
});
