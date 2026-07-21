import { defineField, defineType } from "sanity";
import { languageField } from "../../plugins/intl";
import { Card } from "@sanity/ui";

export const translations = defineType({
  name: "translations",
  title: "Tłumaczenia",
  type: "document",
  description: (
    <Card>
      <p>
        Zawiera tłumaczenia tekstów statycznych używanych w aplikacji. Każdy dokument reprezentuje
        jeden język.
      </p>

      <p>Wspiera dynamiczne tłumaczenia z formatowaniem w miejscach wskazanych przez opisy</p>
      <a href="https://next-intl.dev/docs/usage/translations">
        Dokumentacja dynamicznych tłumaczeń
      </a>
    </Card>
  ),
  preview: {
    select: {
      title: "locale",
    },
  },
  fields: [
    defineField({
      name: "global",
      title: "Globalne",
      type: "object",
      fields: [
        defineField({
          name: "results",
          title: "Wyniki",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "search",
          title: "Szukaj",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Nawigacja",
      type: "object",
      fields: [
        defineField({
          name: "home",
          title: "Strona główna",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "skipToContent",
          title: "Przejdź do treści",
          type: "string",
          description: "Niewidoczny przycisk ułatwiający nawigację klawiaturą",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "menu",
          title: "Menu",
          type: "string",
          validation: (Rule) => Rule.required(),
          description: "Niewidoczny przycisk otwierający menu mobilne",
        }),
      ],
    }),
    defineField({
      name: "buttons",
      title: "Przyciski",
      type: "object",
      fields: [
        defineField({
          name: "support",
          title: "Wspomóż",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "events",
      title: "Wydarzenia",
      type: "object",
      fields: [
        defineField({
          name: "upcoming",
          title: "Nadchodzące",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "archive",
          title: "Archiwum",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "signUp",
          title: "Zapisz się",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "noEvents",
          title: "Brak wydarzeń",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "people",
      title: "Ludzie",
      type: "object",
      fields: [
        defineField({
          name: "seeAll",
          title: "Zobacz wszystkich",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "groupName",
          title: "Grupa",
          type: "string",
          description: "Nagłówek listy grup",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "allGroups",
          title: "Wszystkie grupy",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "contactForm",
      title: "Formularz kontaktowy",
      type: "object",
      fields: [
        defineField({
          name: "starsign",
          title: "Info o polach wymaganych",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "firstName",
          title: "Imię",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "lastName",
          title: "Nazwisko",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "phone",
          title: "Telefon",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subject",
          title: "Temat",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "message",
          title: "Wiadomość",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "submit",
          title: "Przycisk wysyłania",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "sending",
          title: "Status wysyłania",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "requiredError",
          title: "Komunikat błędu",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "placeholders",
          title: "Placeholdery",
          type: "object",
          fields: [
            defineField({ name: "firstName", title: "Placeholder Imię", type: "string" }),
            defineField({ name: "lastName", title: "Placeholder Nazwisko", type: "string" }),
            defineField({ name: "email", title: "Placeholder Email", type: "string" }),
            defineField({ name: "phone", title: "Placeholder Telefon", type: "string" }),
            defineField({ name: "subject", title: "Placeholder Temat", type: "string" }),
            defineField({ name: "message", title: "Placeholder Wiadomość", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "divisions",
      title: "Przedstawicielstwa",
      type: "object",
      fields: [
        defineField({
          name: "divisionNotFound",
          title: "Przedstawicielstwo nie znalezione",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "checkDetails",
          title: "Sprawdź szczegóły",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "publications",
      title: "Publikacje",
      type: "object",
      fields: [
        defineField({
          name: "cardButton",
          title: "Przycisk na karcie publikacji",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "singlePublicationPage",
          title: "Strona pojedynczej publikacji",
          type: "object",
          fields: [
            defineField({
              name: "share",
              title: "Udostępnij",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "downloadPdf",
              title: "Pobierz PDF",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "noImage",
              title: "Brak zdjęcia",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "inThisArticle",
              title: "W tym artykule",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "noHeadings",
              title: "Brak nagłówków",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "relatedPublicationTitle",
              title: "Podobne publikacje",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "allPublications",
              title: "Wszystkie publikacje",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "bibliography",
              title: "Bibliografia",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "filterComponent",
      title: "Komponent filtra",
      type: "object",
      fields: [
        defineField({
          name: "search",
          title: "Szukaj",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "category",
          title: "Kateogie",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "publicationsSearch",
          title: "Szukaj (strona publiakcji)",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "results",
          title: "Rezultaty",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "reset",
          title: "Reset",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "sortBy",
          title: "Sortuj",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "sortNewest",
          title: "Od najnowszych",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "sortOldest",
          title: "Od najstarszych",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "emptyState",
          title: "Brak wyników",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "emptyStatePublicationsTitle",
          title: "Brak publikacji tytuł",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "emptyStatePublicationsDesc",
          title: "Brak publiakcji opis",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "showAllPublications",
          title: "Wszystkie publikacje",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "loading",
          title: "Ładowanie",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "maxAmmount",
          title: "Wybierz maksymalnie",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    languageField,
  ],
});
