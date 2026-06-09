import { defineArrayMember, defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";

export default defineType({
  name: "person",
  title: "Osoba",
  type: "document",
  fields: [
    languageField,
    defineField({
      name: "name",
      title: "Imię",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "group",
      type: "string",
      title: "Grupa",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Zarząd", value: "board" },
          { title: "Władza PR", value: "regionalAuthority" },
          { title: "Koordynator grup", value: "groupCoordinator" },
          { title: "Autor", value: "author" },
          { title: "Recenzent", value: "reviewer" },
        ],
      },
    }),

    defineField({
      name: "img",
      title: "Obraz",
      type: "img",
    }),
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      description: "Krótkie określenie roli autora, np. 'Przewodniczący FMD'",
    }),

    defineField({
      name: "socials",
      title: "Media społecznościowe",
      type: "array",
      of: [
        defineArrayMember({
          name: "social",
          title: "Media społecznościowe",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platforma",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "img",
    },
  },
});
