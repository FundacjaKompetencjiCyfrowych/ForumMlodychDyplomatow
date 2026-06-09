import { type InferFragmentType } from "groqd";
import type { Locale } from "next-intl";
import { q } from "../groqd";
import { imgFragment } from "./imgFragment";
import type { PaginationParameters } from "./pagination";

export const personFragment = q.fragmentForType<"person">().project((sub) => ({
  _id: true,
  name: true,
  title: true,
  group: true,
  img: sub.field("img").project(imgFragment),
  socials: sub.field("socials[]").project({
    _key: true,
    platform: true,
    url: true,
  }),
}));

type OrderBy = "name";

export type PeoplePaginatedParameters = {
  locale: Locale;
  groups: string[] | null;
  name: string | null;
};

export const peoplePaginatedQuery = ({
  page,
  perPage,
  orderBy = "name",
  order = "asc",
}: PaginationParameters<OrderBy>) =>
  q
    .parameters<PeoplePaginatedParameters>()
    .project((sub) => ({
      items: sub.star
        .filterByType("person")
        .filterBy("locale == $locale")
        .filterRaw("$groups == null || group in $groups")
        .filterRaw("$name == null || name match $name")
        .order(`${orderBy} ${order}`),
    }))
    .project((sub) => ({
      total: sub.count("items[]"),
      page: sub.value(page),
      perPage: sub.value(perPage),
      items: sub.field("items[]").project(personFragment),
    }));

export type PersonFull = InferFragmentType<typeof personFragment>;
