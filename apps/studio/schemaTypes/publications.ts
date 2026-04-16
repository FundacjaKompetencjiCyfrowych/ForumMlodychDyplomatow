import { defineField, defineType } from "sanity";
import { pageGroups } from "../utils/groups";
import { languageField } from "../plugins/intl";
import { seoField } from "../utils/fields";

export default defineType({
  name: "publication",
  title: "Publikacja",
  type: "document",
  description: "Publikacja wykorzystywana do pisania różnego rodzaju publikacji takich jak ...",
  groups: pageGroups,
  fields: [
    languageField,
    seoField,
    defineField({
      name: "title",
      title: "Tyutł",
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
      description: "Bardzo krótki opis publikacji wyświetlany w kafelkach z linkiem",
      validation: (Rule) => Rule.required().error("Pole wymagane").max(250).error("Max 250 znaków"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "Adres URL publikacji",
      options: {
        source: "title",
        maxLength: 120,
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
      description: "Obraz reprezentujący wydarzenie w listach i na stronie szczegółowej.",
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
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
      validation: (Rule) => Rule.required().error("Pole wymagane"),
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
          fields: [{ type: "string", name: "alt", title: "Alt" }],
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
