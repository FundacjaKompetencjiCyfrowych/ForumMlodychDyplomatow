import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const whatWeDoDivisionsSection = defineType({
  name: "whatWeDoDivisionsSection",
  title: "Czym się zajmujemy",
  type: "object",
  preview: createSectionPreview("whatWeDoDivisionsSection", {
    title: "Czym się zajmujemy",
    subtitle: "title",
  }),
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Tytuł",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatWeDo",
      type: "array",
      title: "Lista zadań",
      description: "Lista zadań i wydarzeń jakimi zajmuje się dane przedstawicielstwo. (max 6)",
      validation: (Rule) => Rule.max(6),
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),
  ],
});
