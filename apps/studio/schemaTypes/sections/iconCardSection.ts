import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const iconCardSection = defineType({
  name: "iconCardSection",
  title: "Z kim współpracujemy",
  type: "object",
  preview: createSectionPreview("iconCardSection", {
    title: "Karty z ikonami",
    subtitle: "heading",
  }),
  fields: [
    defineField({
      name: "heading",
      title: "Nagłówek",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Podnagłówek",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Elementy",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(4),
      of: [
        defineArrayMember({
          name: "item",
          title: "Element",
          type: "object",
          preview: {
            select: {
              title: "title",
              media: "icon",
            },
          },
          fields: [
            defineField({
              name: "title",
              title: "Tytuł",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Podtytuł",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Ikona",
              type: "img",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
