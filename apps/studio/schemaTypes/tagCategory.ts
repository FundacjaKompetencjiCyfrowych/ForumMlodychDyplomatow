import { defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";
import { seoField } from "../utils/fields";
import { pageGroups } from "../utils/groups";

export default defineType({
  name: "tagCategory",
  title: "Kategorie Tagów",
  type: "document",
  description: "Kategorie Tagów",
  groups: pageGroups,
  fields: [
    seoField,
    languageField,
    defineField({
      name: "title",
      title: "Nazwa Kategorii",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      group: "content",
      description: "Opcjonalny opis grupy tagów",
    }),
  ],
});
