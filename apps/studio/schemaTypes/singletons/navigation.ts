import { defineType, defineField, defineArrayMember } from "sanity";
import { languageField } from "../../plugins/intl";

export default defineType({
  name: "navigation",
  title: "Nawigacja",
  type: "document",

  fields: [
    defineField({
      name: "links",
      title: "Linki",
      description: "Linki nawigacyjne",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł",
              type: "string",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "link",
            }),
          ],
        }),
      ],
    }),
    languageField,
  ],
  preview: {
    prepare() {
      return {
        title: "Nawigacja",
      };
    },
  },
});
