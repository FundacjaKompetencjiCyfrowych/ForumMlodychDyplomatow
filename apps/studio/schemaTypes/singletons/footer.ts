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
      name: "email",
      title: "Adres e-mail",
      type: "string",
      description: "Adres e-mail wyświetlany w stopce.",
      validation: (Rule) => Rule.email().error("Niepoprawny adres e-mail").required(),
    }),
    defineField({
      name: "phone",
      title: "Numer telefonu",
      type: "string",
      description: "Numer telefonu wyświetlany w stopce. Opcjonalny",
    }),

    defineField({
      name: "socials",
      title: "Media społecznościowe",
      type: "socials",
    }),

    defineField({
      name: "address",
      title: "Adres",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "identfiers",
      title: "Identyfikator",
      type: "text",
      description: "Pole na numery krs, nip, regon itp.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nav",
      title: "Nawigacja",
      type: "array",
      of: [
        defineArrayMember({
          name: "footerLink",
          type: "link",
          title: "Link stopki",
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
        "Dodatkowe linki wyświetlane w stopce, np. Polityka prywatności, Regulamin itp. (maksymalnie 3).",
      validation: (Rule) => Rule.max(3),
    }),
  ],
});
