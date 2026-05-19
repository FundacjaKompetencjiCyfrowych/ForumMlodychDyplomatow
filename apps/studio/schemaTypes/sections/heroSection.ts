import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Sekcja Hero",
  type: "object",
  preview: {
    select: {
      subtitle: "heading",
    },
    prepare: ({ subtitle }) => {
      return {
        title: "Sekcja Hero",
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
      type: "text",
      title: "Podnagłówek",
      rows: 3,
    }),
    defineField({
      name: "backgroundImage",
      type: "img",
      title: "Tło",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      type: "link",
      title: "Call to action",
      description: "Główny wyróżniony link w sekcji.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      type: "link",
      title: "Drugorzędny call to action",
      description: "Dodatkowy link, który może być użyty do wsparcia głównego CTA.",
    }),
  ],
});
