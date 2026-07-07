import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const heroPublicationsSection = defineType({
  name: "heroPublicationsSection",
  title: "Hero Publikacje",
  type: "object",
  preview: createSectionPreview("heroPublicationsSection", {
    title: "Hero Publikacje",
    subtitle: "heading",
  }),
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Nagłówek",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      type: "string",
      title: "Podnagłówek",
    }),
    defineField({
      name: "publicationCounter",
      type: "string",
      title: "Podpis obok ilości publikacji",
    }),
    defineField({
      name: "badges",
      type: "array",
      title: "Podpisy za ilością publikacji",
      of: [{ type: "string" }],
    }),
  ],
});
