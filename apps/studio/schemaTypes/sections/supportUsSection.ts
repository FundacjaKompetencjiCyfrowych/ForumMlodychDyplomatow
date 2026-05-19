import { defineField, defineType } from "sanity";

export const supportUsSection = defineType({
  name: "supportUsSection",
  title: "Sekcja Wspieraj nas",
  type: "object",
  preview: {
    select: {
      subtitle: "heading",
    },
    prepare: ({ subtitle }) => {
      return {
        title: "Sekcja Wspieraj nas",
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
    defineField({
      name: "cta",
      type: "link",
      title: "Call to action",
      description: "Główny wyróżniony link w sekcji.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "img",
      title: "Obraz",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
