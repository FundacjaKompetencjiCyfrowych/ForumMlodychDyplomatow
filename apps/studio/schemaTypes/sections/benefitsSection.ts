import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";
export const benefitsSection = defineType({
  name: "benefitsSection",
  title: "Korzyści",
  type: "object",
  preview: createSectionPreview("benefitsSection", {
    title: "Korzyści",
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
      name: "benefits",
      title: "Korzyści",
      type: "array",
      of: [
        defineArrayMember({
          name: "benefit",
          title: "Korzyść",
          type: "object",
          preview: {
            select: {
              title: "title",
              media: "image",
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
              name: "image",
              title: "Obraz",
              type: "img",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Przycisk CTA",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
