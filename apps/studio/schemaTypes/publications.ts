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
      validation: (Rule) => Rule.required().min(3).max(150),
    }),
    defineField({
      name: "excerpt",
      title: "Krótki opis artykułu",
      type: "string",
      group: "content",
      description: "Bardzo krótki opis publikacji wyświetlany w kafelkach z linkiem",
      validation: (Rule) => Rule.required().max(250),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "datetime",
      group: "content",
      description: "Data dodania artykułu",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Grafika główna",
      type: "img",
      group: "content",
      description: "Obraz reprezentujący wydarzenie w listach i na stronie szczegółowej.",
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "author",
      group: "content",
      description: "Autor publikacji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "manual",
      title: "Instruction Manual",
      type: "file",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) =>
        Rule.custom((file) => {
          if (!file || !file.asset?._ref) {
            return true;
          }
          const isPdf = file.asset._ref.endsWith("-pdf");

          return isPdf ? true : "Only PDF files are allowed";
        }),
    }),
  ],
});
