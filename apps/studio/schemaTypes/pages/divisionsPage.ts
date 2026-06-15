// sanity/schemaTypes/documents/divisionsPage.ts
import { defineField, defineType } from "sanity";
import { languageField } from "../../plugins/intl";
import { seoField } from "../../utils/fields";
import { pageGroups } from "../../utils/groups";

export default defineType({
  name: "divisionsPage",
  title: "Strona Lista Przedstawicielstw",
  type: "document",
  groups: pageGroups,
  fields: [
    languageField,
    seoField,
    defineField({
      name: "title",
      title: "Nagłówek Hero",
      group: "content",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis Hero",
      group: "content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Zdjęcie Hero",
      group: "content",
      type: "img",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleDivisions",
      title: "Nagłówek listy przedstawicielstw",
      group: "content",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionDivisions",
      title: "Opis listy przedstawicielstw",
      group: "content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
