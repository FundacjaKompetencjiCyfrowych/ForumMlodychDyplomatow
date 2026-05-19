import { defineField, defineType } from "sanity";

export const divisionsSection = defineType({
  name: "divisionsSection",
  title: "Sekcja Przedstawicielstwa",
  type: "object",
  preview: {
    select: {
      subtitle: "heading",
    },
    prepare: ({ subtitle }) => {
      return {
        title: "Sekcja Przedstawicielstwa",
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
      name: "subheading",
      type: "string",
      title: "Podtytuł",
    }),
  ],
});
