import { defineType, defineField, ALL_FIELDS_GROUP } from "sanity";
import { languageField } from "../plugins/intl";

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
