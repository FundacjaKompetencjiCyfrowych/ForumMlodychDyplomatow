import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/studio/object-type
 */

type Link = {
  linkType: "href" | "page" | "post" | "event" | "division";
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
          // { title: "Wydarzenie", value: "event" },
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
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",

      hidden: ({ parent }) => parent?.linkType !== "href" && parent?.linkType !== "page",
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
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      hidden: ({ parent }) => parent?.linkType !== "post",
      validation: (Rule) =>
        // Custom validation to ensure post reference is provided if the link type is 'post'
        Rule.custom((value, context) => {
          const parent = context.parent as Link;
          if (parent?.linkType === "post" && !value) {
            return "Post reference is required when Link Type is Post";
          }
          return true;
        }),
    }),
    /* defineField({
      name: "event",
      title: "Wydarzenie",
      type: "reference",
      to: [{ type: "event" }],
      hidden: ({ parent }) => parent?.linkType !== "event",
      validation: (Rule) =>
        // Custom validation to ensure event reference is provided if the link type is 'event'
        Rule.custom((value, context) => {
          const parent = context.parent as Link;
          if (parent?.linkType === "event" && !value) {
            return "Event reference is required when Link Type is Event";
          }
          return true;
        }),
    }),
    defineField({
      name: "division",
      title: "Oddział",
      type: "reference",
      to: [{ type: "division" }],
      hidden: ({ parent }) => parent?.linkType !== "division",
      validation: (Rule) =>
        // Custom validation to ensure division reference is provided if the link type is 'division'
        Rule.custom((value, context) => {
          const parent = context.parent as Link;
          if (parent?.linkType === "division" && !value) {
            return "Division reference is required when Link Type is Division";
          }
          return true;
        }),
    }), */
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "text",
      linkType: "linkType",
      href: "href",
      page: "page.title",
      post: "post.title",
      // event: "event.title",
      // division: "division.name",
    },
    prepare: ({ title, linkType, href, ...titles }) => {
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
    },
  },
});
