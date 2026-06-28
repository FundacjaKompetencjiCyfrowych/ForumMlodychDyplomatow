import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const joinUsDivisionsSection = defineType({
  name: "joinUsDivisionsSection",
  title: "Dołącz do nas - przedstawicielstwa",
  type: "object",
  preview: createSectionPreview("joinUsDivisionsSection", {
    title: "Dołącz do nas - przedstawicielstwa",
    subtitle: "header",
  }),
  fields: [
    defineField({
      name: "header",
      type: "string",
      title: "Nagłówek",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Kafelki informacyjne",
      description: "Maksymalnie 4 kafelki z ikoną i tekstem.",
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          title: "Kafelek",
          fields: [
            defineField({
              name: "icon",
              type: "img", // Korzystam z Twojego zdefiniowanego typu 'img'
              title: "Ikona",
            }),
            defineField({
              name: "header",
              type: "string",
              title: "Tytuł kafelka",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Opis kafelka",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "button",
      type: "link",
      title: "Przycisk akcji",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
