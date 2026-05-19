import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutUsSection = defineType({
  name: "aboutUsSection",
  title: "Sekcja O Nas",
  type: "object",
  preview: {
    select: {
      subtitle: "heading",
    },
    prepare: ({ subtitle }) => {
      return {
        title: "Sekcja O Nas",
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
      name: "image",
      type: "img",
      title: "Obraz",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Treść",
      of: [
        defineArrayMember({
          name: "column",
          type: "object",
          title: "Kolumna",
          fields: [
            defineField({
              name: "text",
              type: "string",
              title: "Tekst",
            }),
            defineField({
              name: "icon",
              type: "img",
              title: "Ikona",
            }),
          ],
        }),
      ],
    }),
  ],
});
