import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { languageField, uniqueByLanguage } from "../../plugins/intl";
import { seoField } from "../../utils/fields";
import { pageGroups } from "../../utils/groups";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: pageGroups,

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description:
        'Używany do generowania URL strony. wpisanie "home" będzie interpretowane jako strona główna',
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 96,
        isUnique: uniqueByLanguage,
      },
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "pageBuilder",
      title: "Page builder",
      type: "pageBuilder",
      group: "content",
    }),

    languageField,
    seoField,
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
