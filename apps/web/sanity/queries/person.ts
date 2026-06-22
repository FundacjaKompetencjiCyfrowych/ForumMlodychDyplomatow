import { type InferFragmentType } from "groqd";
import type { Locale } from "next-intl";
import { q } from "../groqd";
import { imgFragment } from "./imgFragment";
import type { PaginationParameters } from "./pagination";
import { intlArrayQuery } from "./intl";
export const personCardFragment = q
  .parameters<{ locale: Locale }>()
  .fragmentForType<"person">()
  .project((sub) => ({
    _id: true,
    name: true,
    title: intlArrayQuery(sub.field("title[]")),
    img: sub.field("img").project(imgFragment),
    socials: sub.field("socials[]").project((_sub) => ({
      _key: true,
      platform: true,
      url: true,
    })),
  }));
export type PersonCard = InferFragmentType<typeof personCardFragment>;
export const personFragment = q
  .parameters<{ locale: Locale }>()
  .fragmentForType<"person">()
  .project((sub) => ({
    _id: true,
    name: true,
    title: intlArrayQuery(sub.field("title[]")),
    group: true,
    img: sub.field("img").project(imgFragment),
    socials: sub.field("socials[]").project({
      _key: true,
      platform: true,
      url: true,
    }),
  }));

export type PeoplePaginatedParameters = {
  locale: Locale;
  groups: string[] | null;
  name: string | null;
};

export const peoplePaginatedQuery = ({ page = 1, perPage = 10 }: PaginationParameters) =>
  q
    .parameters<PeoplePaginatedParameters>()
    .project((sub) => ({
      items: sub.star
        .filterByType("person")
        .filterBy("locale == $locale")
        .filterRaw("$groups == null || group in $groups")
        .filterRaw("$name == null || name match $name")
        // typescript cast, since groqd doesn't support "defined(order)" syntax, but it's valid in sanity
        // This will sort defined order first, then all undefined orders
        .order("defined(order) desc" as any, "order asc", "name asc"),
    }))
    .project((sub) => ({
      total: sub.count("items[]"),
      page: sub.value(page),
      perPage: sub.value(perPage),
      items: sub.field("items[]").project(personFragment),
    }));

export type PersonFull = InferFragmentType<typeof personFragment>;
