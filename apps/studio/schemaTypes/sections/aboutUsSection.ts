import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const aboutUsSection = defineType({
  name: "aboutUsSection",
  title: "Sekcja O Nas",
  type: "object",
  preview: createSectionPreview("aboutUsSection", { title: "Sekcja O Nas", subtitle: "heading" }),
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
          preview: {
            select: {
              title: "text",
              media: "icon",
            },
          },
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
