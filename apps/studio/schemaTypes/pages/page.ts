import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { documentNameField, seoField } from "../../utils/fields";
import { languageField } from "../../plugins/intl";
import { pageGroups } from "../../utils/groups";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: pageGroups,

  fields: [
    documentNameField,
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
    }),
    defineField({
      name: "pageBuilder",
      title: "Page builder",
      type: "pageBuilder",
    }),

    languageField,
    seoField,
  ],
  preview: {
    select: {
      title: "documentName",
    },
  },
});
