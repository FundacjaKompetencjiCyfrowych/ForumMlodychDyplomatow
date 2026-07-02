import { defineArrayMember, defineField, defineType } from "sanity";
import { languageField } from "../../plugins/intl";

export const footer = defineType({
  name: "footer",
  title: "Stopka",
  type: "document",
  preview: {
    prepare() {
      return {
        title: "Stopka",
      };
    },
  },
  fields: [
    languageField,

    defineField({
      name: "nav",
      title: "Nawigacja",
      type: "array",
      of: [
        defineArrayMember({
          name: "footerLink",
          type: "link",
          title: "Link stopki",
        }),
      ],
    }),
  ],
});
