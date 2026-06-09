import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const joinUsSection = defineType({
  name: "joinUsSection",
  title: "Sekcja Dołącz do nas",
  type: "object",
  preview: createSectionPreview("joinUsSection", {
    title: "Dołącz do nas",
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
      name: "benefits",
      type: "array",
      title: "Benefity",
      description: "Krótkie opisy korzyści płynących z dołączenia do FMD.",
      of: [
        defineArrayMember({
          name: "benefit",
          type: "object",
          title: "Benefit",
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
            // TODO separate link for each option???
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
