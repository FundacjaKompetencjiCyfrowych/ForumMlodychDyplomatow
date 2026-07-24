import { defineArrayMember, defineField, defineType } from "sanity";

export const breadcrumbs = defineType({
  name: "breadcrumbs",
  type: "array",
  title: "Breadcrumbs",
  description:
    "Lista linków do pokazania lokalizacji w strukturze stron. Obecna strona dodawana jest automatycznie na końcu",
  of: [
    defineArrayMember({
      name: "breadcrumb",
      type: "link",
      title: "Link",
    }),
    defineArrayMember({
      name: "label",
      title: "Tekst",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Tekst",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
