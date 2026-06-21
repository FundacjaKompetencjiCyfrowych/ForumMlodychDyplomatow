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
          name: "aboutUs",
          title: "O nas",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "experts",
          title: "Eksperci",
          type: "string",
          validation: (Rule) => Rule.required(),
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
          name: "groups",
          title: "Grupy ekspertów",
          type: "object",
          description: "Opisy filtrów na stronie ekspertów",
          fields: [
            defineField({
              name: "everything",
              title: "Wszystkie",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "board",
              title: "Zarząd",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "regionalAuthority",
              title: "Władza PR",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "groupCoordinator",
              title: "Koordynator grup",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "author",
              title: "Autor",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "reviewer",
              title: "Recenzent",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
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
      ],
    }),
    languageField,
  ],
});
