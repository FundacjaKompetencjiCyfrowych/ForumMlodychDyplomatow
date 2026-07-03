import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const doubleHeroSection = defineType({
  name: "doubleHeroSection",
  title: "Podwójny Hero",
  type: "object",
  preview: createSectionPreview("doubleHeroSection", {
    title: "Podwójny Hero",
    subtitle: "heading",
  }),
  fields: [
    defineField({
      name: "heading",
      title: "Nagłówek",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingText",
      title: "Tekst nagłówka",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Podnagłówek",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheadingText",
      title: "Tekst podnagłówka",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Podpis",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "Przycisk CTA",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Obraz",
      type: "gradientImg",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
