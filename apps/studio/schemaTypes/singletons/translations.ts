import { defineField, defineType } from "sanity";
import { languageField } from "../../plugins/intl";

export const translations = defineType({
  name: "translations",
  title: "Tłumaczenia",
  type: "document",
  description:
    "Zawiera tłumaczenia tekstów statycznych używanych w aplikacji. Każdy dokument reprezentuje jeden język.",
  preview: {
    select: {
      title: "locale",
    },
  },
  fields: [
    defineField({
      name: "buttons",
      title: "Przyciski",
      type: "object",
      fields: [
        defineField({
          name: "support",
          title: "Wspomóż",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    languageField,
  ],
});
