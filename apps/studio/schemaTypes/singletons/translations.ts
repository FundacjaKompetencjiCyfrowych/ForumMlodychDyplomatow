import { defineField, defineType } from "sanity";

export const translations = defineType({
  name: "translations",
  title: "Tłumaczenia",
  type: "document",
  groups: [
    {
      name: "events",
      title: "Wydarzenia",
    },
  ],
  fields: [
    // Do we want this or just plain json files?
    defineField({
      name: "eventsUpcoming",
      title: "Nadchodzące wydarzenia",
      type: "string",
      group: "events",
    }),
  ],
});
