import { defineField, defineType } from "sanity";
import { languageField } from "../plugins/intl";

const formatEventDate = (date?: string) => {
  if (!date) return "Bez daty";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
};

export default defineType({
  name: "event",
  title: "Wydarzenie",
  type: "document",
  description:
    "Wydarzenia wykorzystywane do prezentacji nadchodzących i archiwalnych aktywności organizacji.",
  fields: [
    languageField,
    defineField({
      name: "name",
      title: "Nazwa wydarzenia",
      type: "string",
      description: "Pełna nazwa widoczna na liście wydarzeń i stronie szczegółowej.",
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: "type",
      title: "Typ wydarzenia",
      type: "string",
      description: "Kategoria lub format wydarzenia, np. konferencja, warsztat, webinar.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "startDate",
      title: "Data rozpoczęcia",
      type: "datetime",
      description:
        "Termin rozpoczęcia wydarzenia. Na jego podstawie można rozdzielać wydarzenia przyszłe i archiwalne.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Data zakończenia",
      type: "datetime",
      description: "Opcjonalna data zakończenia wydarzenia, jeśli trwa dłużej niż jeden termin.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const startDate = context.document?.startDate as string | undefined;

          if (!value || !startDate) {
            return true;
          }

          return new Date(value) >= new Date(startDate)
            ? true
            : "Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.";
        }),
    }),
    defineField({
      name: "isOnline",
      title: "Wydarzenie online",
      type: "boolean",
      description: "Zaznacz, jeśli wydarzenie odbywa się online.",
    }),
    defineField({
      name: "division",
      title: "Przedstawicielstwo",
      type: "reference",
      description: "Powiązanie wydarzenia z lokalną reprezentacją organizacji.",
      to: {
        type: "division",
      },
    }),
    defineField({
      name: "venue",
      title: "Miejsce",
      type: "string",
      description:
        "Nazwa obiektu, instytucji lub platformy online, na której odbywa się wydarzenie.",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "text",
      rows: 3,
      description: "Adres wydarzenia lub informacja organizacyjna dla wydarzeń online.",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "excerpt",
      title: "Krótki opis",
      type: "text",
      rows: 3,
      description: "Zwięzły opis do listingów",
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "registrationUrl",
      title: "Link do rejestracji",
      type: "url",
      description: "Link do formularza zapisów lub strony z dodatkowymi informacjami.",
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      startDate: "startDate",
      endDate: "endDate",
      division: "division.name",
      media: "image",
    },
    prepare({ title, startDate, endDate, division, media }) {
      const start = formatEventDate(startDate);
      const end = endDate ? formatEventDate(endDate) : undefined;
      const dateLabel = end ? `${start} – ${end}` : start;

      return {
        title,
        subtitle: division ? `${dateLabel} • ${division}` : dateLabel,
        media,
      };
    },
  },
});
