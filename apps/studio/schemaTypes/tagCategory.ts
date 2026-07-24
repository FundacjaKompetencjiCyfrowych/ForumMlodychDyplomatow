import { defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";

export default defineType({
  name: "tagCategory",
  title: "Kategorie Tagów",
  type: "document",
  description: "Kategorie Tagów",
  fields: [
    languageField,
    defineField({
      name: "title",
      title: "Nazwa Kategorii",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      description: "Opcjonalny opis grupy tagów",
    }),
  ],
});
