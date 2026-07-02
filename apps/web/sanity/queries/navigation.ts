import type { InferResultType } from "groqd";
import { q } from "../groqd";
import type { Locale } from "./intl";
import { linkFragment } from "./linkFragment";
import { socialsFragment } from "./socialsFragment";

export const navigationQuery = q
  .parameters<{ locale: Locale }>()
  .star.filterByType("navigation")
  .filterBy(`locale == $locale`)
  .slice(0)
  .project((sub) => ({
    navigation: sub.field("navigation[]").project((sub) => ({
      _key: true,
      ...sub.conditionalByType({
        link: (sub) =>
          sub.project({
            link: sub.project(linkFragment),
          }),
        dropdown: (sub) =>
          sub.project({
            name: sub.field("name"),
            items: sub.field("items[]").project(linkFragment),
          }),
      }),
    })),
    header: sub.project({
      button: sub.field("button").project(linkFragment),
    }),
    footer: sub.project({
      contactInfo: sub.field("contactInfo").project((sub) => ({
        "...": true,
        socials: sub.field("socials[]").project(socialsFragment),
      })),
      additionalLinks: sub.field("additionalLinks[]").project(linkFragment),
      copyright: sub.field("copyright"),
    }),
  }));

export type NavigationResult = Exclude<InferResultType<typeof navigationQuery>, null>;
export type NavigationLinks = NavigationResult["navigation"];
export type NavigationHeader = NavigationResult["header"];
export type NavigationFooter = NavigationResult["footer"];
