import { defineArrayMember, defineField, defineType } from "sanity";
import { languageField } from "../../plugins/intl";

export const footer = defineType({
  name: "footer",
  title: "Stopka",
  type: "document",
  preview: {
    prepare() {
      return {
        title: "Stopka",
      };
    },
  },
  fields: [
    languageField,
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      description: "Tekst wyświetlany w stopce, np. Adres, KRS, NIP itp.",
    }),

    defineField({
      name: "cta",
      title: "Call to action",
      type: "linkButton",
      description: "Przycisk wyświetlany w stopce, np. z linkiem do kontaktu lub wsparcia.",
    }),
    defineField({
      name: "columns",
      title: "Kolumny",
      type: "array",
      validation: (Rule) => Rule.min(2).max(2),
      of: [
        defineArrayMember({
          name: "footerColumn",
          title: "Kolumna stopki",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł kolumny",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Linki",
              type: "array",
              validation: (Rule) => Rule.max(3),
              of: [
                defineArrayMember({
                  name: "footerLink",
                  title: "Link stopki",
                  type: "link",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "contactColumn",
      title: "Kolumna kontaktowa",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "title",
          title: "Tytuł kolumny",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "email",
          title: "Adres email",
          type: "string",
          validation: (Rule) =>
            Rule.required().email().error("Proszę wprowadzić poprawny adres email."),
        }),
        defineField({
          name: "phone",
          title: "Numer telefonu",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "socials",
          title: "Media społecznościowe",
          type: "array",
          validation: (Rule) => Rule.max(5),
          of: [
            defineArrayMember({
              name: "socialLink",
              title: "Link społecznościowy",
              type: "object",
              fields: [
                defineField({
                  name: "platform",
                  title: "Platforma",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "link",
                  title: "Link",
                  type: "link",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "icon",
                  title: "Ikona",
                  type: "img",
                  description: "Ikona platformy społecznościowej, np. Facebook, Spotify itp.",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright",
      type: "string",
      description: "Tekst wyświetlany na samym dole stopki, np. informacja o prawach autorskich.",
    }),
    defineField({
      name: "links",
      title: "Dodatkowe linki",
      type: "array",
      of: [
        defineArrayMember({
          name: "footerLink",
          title: "Link stopki",
          type: "link",
        }),
      ],
      description:
        "Dodatkowe linki wyświetlane w stopce, np. Polityka prywatności, Regulamin itp. (maksymalnie 5).",
      validation: (Rule) => Rule.max(5),
    }),
  ],
});
