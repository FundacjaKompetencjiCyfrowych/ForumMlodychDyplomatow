import { defineArrayMember, defineField, defineType } from "sanity";
import { createSectionPreview } from "./sectionPreview";
const documentFileData = defineArrayMember({
  name: "fileData",
  title: "Dokument",
  type: "object",
  preview: {
    select: {
      fileName: "file.asset.originalFilename",
      title: "title",
      fileTitle: "file.asset.title",
      date: "date",
      updatedAt: "file.asset._updatedAt",
    },
    prepare: ({ fileName, title, fileTitle, date, updatedAt }) => {
      const displayTitle = title || fileTitle || fileName;
      const displayDate = date ? new Date(date).toLocaleDateString() : null;
      const displayUpdatedAt = updatedAt ? new Date(updatedAt).toLocaleDateString() : null;
      return {
        title: displayTitle || "Brak tytułu",
        subtitle: displayDate || displayUpdatedAt || "Brak daty",
      };
    },
  },
  fields: [
    defineField({
      name: "file",
      title: "Plik PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł dokumentu",
      type: "string",
      description: "Pusty tytuł użyje tytułu dokumentu lub nazwy pliku",
    }),
    defineField({
      name: "date",
      title: "Data dokumentu",
      type: "date",
      description: "Pusta data użyje daty dodania pliku",
    }),
  ],
});

export const documentsSection = defineType({
  name: "documentsSection",
  title: "Dokumenty",
  type: "object",
  preview: createSectionPreview("documentsSection", { title: "Dokumenty" }),
  fields: [
    defineField({
      name: "groups",
      title: "Grupy dokumentów",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "documentGroup",
          title: "Grupa dokumentów",
          preview: {
            select: {
              title: "title",
            },
          },
          fields: [
            defineField({
              name: "title",
              title: "Tytuł grupy dokumentów",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "items",
              title: "Dokumenty",
              type: "array",
              of: [
                documentFileData,
                defineArrayMember({
                  name: "documentSubgroup",
                  title: "Podgrupa dokumentów",
                  type: "object",
                  preview: {
                    select: {
                      title: "title",
                    },
                  },
                  fields: [
                    defineField({
                      name: "title",
                      title: "Tytuł podgrupy dokumentów",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "items",
                      title: "Dokumenty w podgrupie",
                      type: "array",
                      of: [documentFileData],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
