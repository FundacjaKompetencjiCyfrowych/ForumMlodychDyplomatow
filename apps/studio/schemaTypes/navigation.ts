import { defineType, defineField, ALL_FIELDS_GROUP, defineArrayMember } from "sanity";

export default defineType({
  name: "navigation",
  title: "Nawigacja",
  type: "document",
  groups: [
    {
      name: "seo",
      title: "SEO",
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
  ],
  fields: [
    defineField({
      name: "links",
      title: "Linki",
      description: "Linki nawigacyjne",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł",
              type: "string",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "link",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Nawigacja",
      };
    },
  },
});
