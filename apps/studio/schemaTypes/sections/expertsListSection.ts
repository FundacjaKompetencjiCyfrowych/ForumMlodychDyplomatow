import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const expertsListSection = defineType({
  name: "expertsListSection",
  title: "Sekcja Ekspertów",
  type: "object",
  preview: createSectionPreview(
    "expertsListSection",
    {
      title: "Eksperci",
    },
    {
      subtitle: "Automatycznie generowana sekcja z listą ekspertów.",
    }
  ),
  fields: [
    defineField({
      name: "dummy",
      title: "Dummy",
      type: "string",
      hidden: true,
    }),
  ],
});
