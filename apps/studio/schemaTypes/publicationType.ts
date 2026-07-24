import { defineField, defineType } from "sanity";
import { languageField, uniqueByLanguage } from "../plugins/intl";

export default defineType({
  name: "publicationType",
  title: "Rodzaj publikacji",
  type: "document",
  fields: [
    languageField,
    defineField({
      name: "title",
      title: "Nazwa rodzaju",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Unikalna końcówka adresu URL dla tego rodzaju (np. 'analizy')",
      options: {
        source: "title",
        maxLength: 120,
        isUnique: uniqueByLanguage,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
