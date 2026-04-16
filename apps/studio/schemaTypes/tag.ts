import { defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";
import { seoField } from "../utils/fields";
import { pageGroups } from "../utils/groups";

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  description: "Tymczasowy dokument na tagi publikacji",
  groups: pageGroups,
  fields: [
    languageField,
    seoField,
    defineField({
      name: "name",
      title: "Nazwa",
      type: "string",
      description: "Nazwa tagu",
      group: "content",
      validation: (Rule) => Rule.required().error("Pole wymagane"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "Adres URL publikacji",
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
      group: "content",
      type: "reference",
      to: [{ type: "tagCategory" }],
      validation: (Rule) => Rule.required().error("Pole wymagane"),
    },
  ],
});
