import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const expertsListSection = defineType({
  name: "expertsListSection",
  title: "Lista Osób",
  type: "object",
  preview: createSectionPreview(
    "expertsListSection",
    {
      title: "Lista Osób",
    },
    {
      subtitle: "Automatycznie generowana sekcja z listą osób.",
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
