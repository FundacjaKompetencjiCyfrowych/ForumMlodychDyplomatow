import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/studio/object-type
 */

type Link = {
  linkType: "href" | "page" | "division" | "publication";
};
const linkPreviewSelect = {
  text: "text",
  linkType: "linkType",
  href: "href",
  page: "page.name",
  publication: "publication.title",
  division: "division.name",
} as const;

const prepareLinkPreview = (link: Partial<Record<Link["linkType"] | "linkType" | "text", any>>) => {
  const { linkType, text, href, ...titles } = link;
  let title = text || titles[linkType as keyof typeof titles] || "Bez tytułu";
  let subtitle = "";
  if (linkType === "href") {
    subtitle = href || "Brak URL";
  } else {
    subtitle = `Link do: ${titles[linkType as keyof typeof titles]}`;
  }
  return {
    title,
    subtitle,
  };
};

const filterByLanguage = ({ document }: { document: any }) => {
  return {
    filter: "locale == $locale",
    params: {
      locale: document?.locale || "pl",
    },
  };
};
export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      initialValue: "page",
      options: {
        list: [
          { title: "Strona", value: "page" },
          { title: "Publikacja", value: "publication" },
          { title: "Oddział", value: "division" },
          { title: "Zewnętrzny URL", value: "href" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "string",
      description: "Tekst linku, który będzie wyświetlany użytkownikowi",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Link;
          if (parent.linkType === "href" && !value) {
            return "Tekst jest wymagany dla linków URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",

      hidden: ({ parent }) => parent?.linkType !== "href",
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value, context) => {
          const parent = context.parent as Link;
          if (parent?.linkType === "href" && !value) {
            return "URL jest wymagany dla linków URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "page",
      title: "Strona",
      type: "reference",
      to: [{ type: "page" }],
      options: { filter: filterByLanguage },
      hidden: ({ parent }) => parent?.linkType !== "page",
      validation: (Rule, ctx) => (ctx?.hidden ? Rule.skip() : Rule.required()),
    }),

    defineField({
      name: "division",
      title: "Oddział",
      type: "reference",
      to: [{ type: "division" }],
      options: { filter: filterByLanguage },
      hidden: ({ parent }) => parent?.linkType !== "division",
      validation: (Rule, ctx) => (ctx?.hidden ? Rule.skip() : Rule.required()),
    }),
    defineField({
      name: "publication",
      title: "Publikacja",
      type: "reference",
      to: [{ type: "publication" }],
      options: { filter: filterByLanguage },
      hidden: ({ parent }) => parent?.linkType !== "publication",
      validation: (Rule, ctx) => (ctx?.hidden ? Rule.skip() : Rule.required()),
    }),
    defineField({
      name: "openInNewTab",
      title: "Otwórz w nowej karcie",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isExternal",
      title: "Link zewnętrzny",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType !== "href",
    }),
  ],
  preview: {
    select: linkPreviewSelect,
    prepare: (params) => prepareLinkPreview(params),
  },
});

export const linkButton = defineType({
  name: "linkButton",
  type: "object",
  title: "Przycisk linkujący",
  fields: [
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      initialValue: "primary",
      options: {
        list: [
          { title: "Główny (niebieski)", value: "primary" },
          { title: "Drugorzędny (biały z ramką)", value: "secondary" },
          { title: "Tekst (bez tła)", value: "text" },
          { title: "Link (bez tła i odstępu)", value: "link" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: Object.fromEntries(
      Object.entries(linkPreviewSelect).map(([key, value]) => [key, `link.${value}`])
    ),
    prepare: (params) => prepareLinkPreview(params),
  },
});
