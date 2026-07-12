import { defineType, defineField, ALL_FIELDS_GROUP } from "sanity";

export default defineType({
  name: "settings",
  title: "Ustawienia",
  type: "document",
  description: "top level description",
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
      name: "siteName",
      title: "Nazwa strony",
      type: "string",
      description: "Używane do SEO",
      group: "seo",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "img",
      description: "Używane do SEO",
      group: "seo",
    }),
    defineField({
      name: "baseUrl",
      title: "Podstawowy URL",
      type: "url",
      description: "Używane do SEO, początek url strony, np https://diplomacy.pl",
      group: "seo",
    }),
    defineField({
      name: "organization",
      type: "object",
      title: "Organizacja",
      group: "seo",
      description:
        "Informacje o organizacji, używane do SEO i łączenia różnych postów z tą samą organizacją",
      fields: [
        defineField({
          name: "name",
          type: "string",
          title: "Nazwa organizacji",
        }),
        defineField({
          name: "socials",
          type: "array",
          title: "Linki do social media",
          description: "Pomagają łączyć posty na social media z tą samą organizacją",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "email",
          type: "string",
          title: "Email organizacji",
        }),
        defineField({
          name: "phone",
          type: "string",
          title: "Telefon organizacji",
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Domyślne Metadane",
      description: "Metadane domyślne dla wszystkich podstron",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Ustawienia",
      };
    },
  },
});
