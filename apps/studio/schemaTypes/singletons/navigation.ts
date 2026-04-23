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
      validation: (Rule) => Rule.required().min(1).max(6),
      of: [
        defineArrayMember({
          name: "dropdown",
          title: "Menu rozwijane",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nazwa",
              type: "string",
              description: "Widoczna jako przycisk/link",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "header",
              title: "Nagłówek",
              description: "Nagłówek widoczny po rozwinięciu",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Opis",
              description: "Krótki opis widoczny po rozwinięciu",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "columns",
              title: "Kolumny",
              type: "array",
              validation: (Rule) => Rule.required().min(1).max(3),
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "header",
                      title: "Nagłówek",
                      type: "string",
                    }),
                    defineField({
                      name: "items",
                      title: "Elementy",
                      type: "array",
                      validation: (Rule) => Rule.required().min(1).max(4),
                      of: [
                        defineArrayMember({
                          type: "link",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineArrayMember({
          title: "Link",
          type: "link",
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
