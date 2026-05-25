import { defineField, defineType } from "sanity";

export const newPublicationsSection = defineType({
  name: "newPublicationsSection",
  title: "Sekcja Nowe Publikacje",
  type: "object",
  preview: {
    select: {
      subtitle: "heading",
    },
    prepare: ({ subtitle }) => {
      return {
        title: "Sekcja Nowe Publikacje",
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
  ],
});
