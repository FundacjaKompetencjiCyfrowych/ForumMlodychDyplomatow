import { defineArrayMember, defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";
import { GroupPicker } from "../components/GroupPicker";

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
      components: {
        input: GroupPicker,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "img",
      title: "Obraz",
      type: "img",
    }),
    defineField({
      name: "title",
      title: "Tytuł",
      type: "internationalizedArrayString",
      description: "Krótkie określenie roli autora, np. 'Przewodniczący FMD'",
    }),
    defineField({
      name: "bio",
      title: "Biografia",
      type: "internationalizedArrayText",
      description: "Krótka biografia autora",
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
    defineField({
      name: "order",
      title: "Kolejność",
      type: "number",
      description:
        "Liczba określająca kolejność wyświetlania osób. Mniejsze liczy są wyświetlane wcześniej, te same liczby są sortowane alfabetycznie. Brak liczby będzie wyświetlany na końcu.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "img",
    },
  },
});
