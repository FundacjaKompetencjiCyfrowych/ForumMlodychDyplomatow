import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const podcastSection = defineType({
  name: "podcastSection",
  title: "Sekcja Podcast",
  type: "object",
  preview: createSectionPreview("podcastSection", {
    title: "Sekcja Podcast",
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
      title: "Podtytuł",
    }),
    defineField({
      name: "embed",
      type: "string",
      title: "Kod osadzenia",
      description: "Kod osadzenia z platformy podcastowej, np. Spotify.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
