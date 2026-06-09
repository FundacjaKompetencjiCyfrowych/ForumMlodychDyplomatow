import { defineField, defineType } from "sanity";
import { pageGroups } from "../utils/groups";
import { languageField, uniqueByLanguage } from "../plugins/intl";
import { seoField } from "../utils/fields";

export default defineType({
  name: "publication",
  title: "Publikacja",
  type: "document",
  description: "Uniwersalny typ treści dla analiz, krótkich opracowań oraz artykułów do magazynu",
  groups: pageGroups,
  fields: [
    languageField,
    seoField,
    defineField({
      name: "type",
      title: "Rodzaj",
      type: "string",
      group: "content",
      description: "Rodzaj publikacji jaki chcesz opublikować",
      options: {
        list: [
          { title: "Krótkie opracowanie", value: "article" },
          { title: "Analiza", value: "news" },
          { title: "Magazyn", value: "guide" },
          { title: "Publikacja", value: "review" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required().error("Pole wymagane"),
    }),
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      group: "content",
      description: "Tytuł publikacji",
      validation: (Rule) =>
        Rule.required().error("Pole wymagane").min(3).max(150).error("Między 3 a 120 znaków"),
    }),
    defineField({
      name: "excerpt",
      title: "Krótki opis artykułu",
      type: "string",
      group: "content",
      description: "Bardzo krótki opis wyświetlany w kafelkach z linkiem",
      validation: (Rule) => Rule.required().error("Pole wymagane").max(500).error("Max 500 znaków"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description:
        'Unikalna końcówka adresu strony (np. moja-publikacja). Kliknij "Generate", aby utworzyć ją automatycznie na podstawie tytułu.',
      options: {
        source: "title",
        maxLength: 120,
        isUnique: uniqueByLanguage,
      },
      validation: (Rule) => Rule.required().error("Pole wymagane"),
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "datetime",
      group: "content",
      description: "Data dodania artykułu",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error("Pole wymagane"),
    }),
    defineField({
      name: "mainImage",
      title: "Grafika główna",
      type: "img",
      group: "content",
      description:
        "Obraz widoczny na górze artykułu oraz w kafelkach z linkiem do artykułu na innych stronach",
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "person" }],
      group: "content",
      description: "Wybierz autora publikacji z listy",
      validation: (Rule) => Rule.required().error("Pole wymagane"),
    }),
    defineField({
      name: "pdfFile",
      title: "Plik PDF",
      description: "Plik PDF z tekstem",
      type: "file",
      group: "content",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Tekst alternatywny (dla czytników ekranu i wyszukiwarek)",
            },
            {
              name: "caption",
              type: "string",
              title: "Podpis pod zdjęciem (widoczny dla czytelnika)",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
  ],
});
