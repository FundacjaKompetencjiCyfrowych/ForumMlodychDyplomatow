import { defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  description: "Dokument na tagi publikacji",
  fields: [
    languageField,
    defineField({
      name: "name",
      title: "Nazwa",
      type: "string",
      description: "Nazwa tagu",
      validation: (Rule) => Rule.required().error("Pole wymagane"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Adres tagu używany w url przy filtrowaniu",
      options: {
        source: "name",
        maxLength: 120,
      },
      validation: (Rule) =>
        Rule.custom((slug) => {
          if (!slug || !slug.current) {
            return "Pole wymagane";
          }
          return true;
        }),
    }),
    {
      name: "category",
      title: "Kategoria",
      type: "reference",
      to: [{ type: "tagCategory" }],
      validation: (Rule) => Rule.required().error("Pole wymagane"),
    },
  ],
});
