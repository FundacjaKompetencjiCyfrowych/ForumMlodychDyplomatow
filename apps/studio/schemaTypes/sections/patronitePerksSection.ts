import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const patronitePerksSection = defineType({
  name: "patronitePerksSection",
  title: "Patronite - korzyści",
  type: "object",
  preview: createSectionPreview("patronitePerksSection", {
    title: "Patronite - korzyści",
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
      name: "caption",
      title: "Podpis",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tiers",
      title: "Poziomy",
      type: "array",
      of: [
        defineArrayMember({
          name: "tier",
          title: "Poziom",
          type: "object",
          preview: {
            select: {
              title: "amount",
            },
          },
          fields: [
            defineField({
              name: "amount",
              title: "Kwota",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "perks",
              title: "Korzyści",
              type: "array",
              validation: (Rule) => Rule.required().min(1),
              of: [
                defineArrayMember({
                  type: "string",
                }),
              ],
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: "cta",
      title: "Przycisk CTA",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
