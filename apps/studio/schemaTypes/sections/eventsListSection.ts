import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const eventsListSection = defineType({
  name: "eventsListSection",
  title: "Lista Wydarzeń",
  type: "object",
  preview: createSectionPreview(
    "eventsListSection",
    {
      title: "Lista Wydarzeń",
    },
    {
      subtitle: "Automatycznie generowana sekcja z listą wydarzeń.",
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
