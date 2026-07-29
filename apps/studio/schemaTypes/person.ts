import { defineField, defineType } from "sanity";
import { GroupPicker } from "../components/GroupPicker";
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
      components: {
        input: GroupPicker,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł",
      type: "internationalizedArrayString",
      description: "Krótkie określenie roli autora, np. 'Przewodniczący FMD'",
    }),

    defineField({
      name: "secondaryGroup",
      type: "string",
      title: "Dodatkowa Grupa",
      components: {
        input: GroupPicker,
      },
    }),
    defineField({
      name: "secondaryTitle",
      title: "Dodatkowy Tytuł",
      type: "internationalizedArrayString",
      description:
        "Krótkie określenie dodatkowej roli autora, wyświetlane na liście przy filtrowaniu po dodatkowej grupie, np. 'Członek FMD'",
    }),
    defineField({
      name: "img",
      title: "Obraz",
      type: "img",
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
      type: "socials",
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
