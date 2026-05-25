import { defineField, defineType } from "sanity";

export const eventsSection = defineType({
  name: "eventsSection",
  title: "Sekcja Wydarzenia",
  type: "object",
  preview: {
    select: {
      subtitle: "heading",
    },
    prepare: ({ subtitle }) => {
      return {
        title: "Sekcja Wydarzenia",
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
      name: "link",
      type: "link",
      title: "Link",
      description: 'Link pod listą wydarzeń, np "zobacz więcej"',
    }),
  ],
});
