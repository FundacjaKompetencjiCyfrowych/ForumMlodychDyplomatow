import { defineField, defineType } from "sanity";

export const podcastSection = defineType({
  name: "podcastSection",
  title: "Sekcja Podcast",
  type: "object",
  preview: {
    select: {
      subtitle: "heading",
    },
    prepare: ({ subtitle }) => {
      return {
        title: "Sekcja Podcast",
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
