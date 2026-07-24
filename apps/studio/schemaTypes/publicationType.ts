import { defineField, defineType } from "sanity";
import { pageGroups } from "../utils/groups";
import { languageField, uniqueByLanguage } from "../plugins/intl";
import { seoField } from "../utils/fields";

export default defineType({
  name: "publicationType",
  title: "Rodzaj publikacji",
  type: "document",
  groups: pageGroups,
  fields: [
    languageField,
    seoField,
    defineField({
      name: "title",
      title: "Nazwa rodzaju",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
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
