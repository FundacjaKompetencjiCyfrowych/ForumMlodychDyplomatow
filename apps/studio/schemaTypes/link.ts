import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/studio/object-type
 */

type Link = {
  linkType: "href" | "page" | "post" | "event" | "division";
  homepage?: boolean;
};
const linkPreviewSelect = {
  text: "text",
  linkType: "linkType",
  href: "href",
  page: "page.name",
  post: "post.title",
  event: "event.name",
  homepage: "homepage",
  // division: "division.name",
} as const;
const prepareLinkPreview = (
  link: Partial<Record<Link["linkType"] | "linkType" | "text" | "homepage", any>>
) => {
  const { linkType, text, href, homepage, ...titles } = link;
  let title = text || titles[linkType as keyof typeof titles] || "Bez tytułu";
  let subtitle = "";
  if (linkType === "href") {
    subtitle = href || "Brak URL";
  } else if (homepage) {
    subtitle = `Link do strony głównej typu: ${titles[linkType as keyof typeof titles] || "N/A"}`;
  } else {
    subtitle = `Link do: ${titles[linkType as keyof typeof titles]}`;
  }
  return {
    title,
    subtitle,
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
          { title: "Post", value: "post" },
          { title: "Wydarzenie", value: "event" },
          // { title: "Oddział", value: "division" },
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
          } else if (parent.linkType !== "page" && parent.homepage && !value) {
            return "Tekst jest wymagany dla linków do stron głównych";
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
            return "URL is required when Link Type is URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "page",
      title: "Strona",
      type: "reference",
      to: [{ type: "page" }],
      hidden: ({ parent }) => parent?.linkType !== "page",
      validation: (Rule) =>
        // Custom validation to ensure page reference is provided if the link type is 'page'
        Rule.custom((value, context) => {
          const parent = context.parent as Link;
          if (parent?.linkType === "page" && !value) {
            return "Page reference is required when Link Type is Page";
          }
          return true;
        }),
    }),
    defineField({
      name: "homepage",
      title: "Strona główna",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType === "page" || parent?.linkType === "href",
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      hidden: ({ parent }) => parent?.linkType !== "post" || parent?.homepage,
      validation: (Rule) =>
        // Custom validation to ensure post reference is provided if the link type is 'post'
        Rule.custom((value, context) => {
          const parent = context.parent as Link;
          if (parent?.linkType === "post" && !parent?.homepage && !value) {
            return "Odwołanie do posta jest wymagane";
          }
          return true;
        }),
    }),
    defineField({
      name: "event",
      title: "Wydarzenie",
      type: "reference",
      to: [{ type: "event" }],
      hidden: ({ parent }) => parent?.linkType !== "event" || parent?.homepage,
      validation: (Rule) =>
        // Custom validation to ensure event reference is provided if the link type is 'event'
        Rule.custom((value, context) => {
          const parent = context.parent as Link;
          if (parent?.linkType === "event" && !parent?.homepage && !value) {
            return "Odwołanie do wydarzenia jest wymagane";
          }
          return true;
        }),
    }),

    defineField({
      name: "division",
      title: "Oddział",
      type: "reference",
      to: [{ type: "division" }],
      hidden: ({ parent }) => parent?.linkType !== "division" || parent?.homepage,
      validation: (Rule) =>
        // Custom validation to ensure division reference is provided if the link type is 'division'
        Rule.custom((value, context) => {
          const parent = context.parent as Link;
          if (parent?.linkType === "division" && !parent?.homepage && !value) {
            return "Odwołanie do oddziału jest wymagane";
          }
          return true;
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
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
