import { defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";

export const publicationsFilterSection = defineType({
  name: "publicationFilterSection",
  title: "Lista publikacji z filtrem",
  type: "object",
  preview: createSectionPreview("publicationFilterSection", {
    title: "Lista publikacji z filtrem",
  }),
  fields: [
    defineField({
      name: "filterHeading",
      type: "string",
      title: "Nagłówek filtrów",
      description: "Wyświetlany nad wszystkimi filtrami.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "searchbarPlaceholder",
      type: "string",
      title: "Wyszarzony tekst w wyszukiwarce",
      description:
        "Tekst który na szaro wyświetla się w pasku wyszukiwania publikacji i znika po wpisaniu tekstu w polu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publicationsPerPage",
      type: "number",
      title: "Ilość publikacji",
      description:
        "Maksymalna liczba publikacji pokazywanych na stronie (Zalecana wielokrotność liczby 3). Zwiększenie tej wartości może wydłużyć czas ładowania strony.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filterPublications",
      title: "Pole filtra",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "label",
          type: "string",
          title: "Nazwa typu filtra",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "filterFields",
          title: "Nazwy filtrów",
          type: "object",
          description: "Tekst przy filtrze danego rodzaju artykułu",
          validation: (Rule) => Rule.required(),

          fields: [
            defineField({
              name: "article",
              type: "string",
              title: "Krótkie opracowanie",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "news",
              type: "string",
              title: "Analiza",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "guide",
              type: "string",
              title: "Magazyn",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "review",
              type: "string",
              title: "Publikacja",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
