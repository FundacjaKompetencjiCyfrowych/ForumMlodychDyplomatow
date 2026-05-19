import { defineArrayMember, defineField, defineType } from "sanity";

export const peopleSection = defineType({
  name: "peopleSection",
  title: "Sekcja Ludzie",
  type: "object",
  preview: {
    select: {
      subtitle: "heading",
    },
    prepare: ({ subtitle }) => {
      return {
        title: "Sekcja Ludzie",
        subtitle,
      };
    },
  },
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
      validation: (Rule) => Rule.required().min(1),
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
            }),
            defineField({
              name: "members",
              type: "array",
              title: "Członkowie grupy",
              of: [{ type: "reference", to: { type: "author" } }],
              validation: (Rule) => Rule.required().min(4).max(4),
            }),
          ],
        }),
      ],
    }),
  ],
});
