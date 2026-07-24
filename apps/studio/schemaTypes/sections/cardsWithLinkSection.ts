import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const cardsWithLinkSection = defineType({
  name: "cardsWithLinkSection",
  title: "Karty z Linkami",
  type: "object",
  preview: createSectionPreview("cardsWithLinkSection", {
    title: "Karty z Linkami",
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
      name: "subheading",
      type: "string",
      title: "Podtytuł",
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Elementy",
      of: [
        defineArrayMember({
          name: "item",
          type: "object",
          title: "Element",
          preview: {
            select: {
              title: "title",
              media: "icon",
            },
          },
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Tytuł",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Opis",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              type: "img",
              title: "Ikona",
            }),
            defineField({
              name: "link",
              type: "link",
              title: "Link",
            }),
          ],
        }),
      ],
    }),
  ],
});
