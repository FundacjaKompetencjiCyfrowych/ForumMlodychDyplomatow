import { type InferFragmentType, type InferResultType } from "groqd";
import { q } from "../groqd";
import type { PaginationParameters } from "./pagination";
import type { Locale } from "next-intl";

export type EventsListQueryParams = {
  locale: string;
  divisionSlug?: string[] | null;
  limit?: number;
};

export const DEFAULT_EVENTS_LIST_LIMIT = 6;

export const eventPreviewFragment = (archive?: boolean) =>
  q.fragmentForType<"event">().project((sub) => ({
    _id: sub.field("_id"),
    name: sub.field("name"),
    startDate: sub
      .field("startDate")
      .transform((date) => (date ? new Date(date).toISOString() : null)),
    type: sub.field("type"),
    endDate: sub.field("endDate").transform((date) => (date ? new Date(date).toISOString() : null)),
    excerpt: sub.field("excerpt"),
    venue: sub.coalesce(
      sub.field("venue"),
      sub.select({
        isOnline: sub.value("Online"),
        "!isOnline": sub.value(null),
      })
    ),
    registrationUrl: sub.field("registrationUrl"),
    isOnline: sub.field("isOnline"),
    archive: sub.value(archive ?? false),
    division: sub
      .field("division")
      .deref()
      .project((sub) => ({
        _id: sub.field("_id"),
        name: sub.field("name"),
        slug: sub.field("slug.current"),
      })),
  }));
export type EventPreview = InferFragmentType<ReturnType<typeof eventPreviewFragment>>;

const baseEventsListQuery = ({
  timeFilterSign,
  sortOrder,
  archive,
}: {
  timeFilterSign: ">=" | "<";
  sortOrder: "asc" | "desc";
  archive?: boolean;
}) =>
  q
    .parameters<EventsListQueryParams>()
    .star.filterByType("event")
    .filterBy("locale == $locale")
    .filterRaw(
      `!defined($divisionSlug) || ("online" in $divisionSlug  && isOnline) || division->slug.current in $divisionSlug`
    )
    .filterRaw(`dateTime(coalesce(endDate, startDate)) ${timeFilterSign} dateTime(now())`)
    .order(`startDate ${sortOrder}`)
    .raw(`[0...$limit]`, "passthrough")
    .project(eventPreviewFragment(archive));

export const upcomingEventsQuery = baseEventsListQuery({
  timeFilterSign: ">=",
  sortOrder: "asc",
  archive: false,
});

export const archivedEventsQuery = baseEventsListQuery({
  timeFilterSign: "<",
  sortOrder: "desc",
  archive: true,
});

export const combinedEventsQuery = q.parameters<EventsListQueryParams>().project({
  upcoming: upcomingEventsQuery,
  archived: archivedEventsQuery,
});
export type CombinedEventsQueryResult = InferResultType<typeof combinedEventsQuery>;
export type EventsPaginatedParameters = {
  locale: Locale;
  location: string[] | null;
  name: string | null;
  type: "archive" | "upcoming";
};
export const eventsPaginatedQuery = ({
  page = 1,
  perPage = 10,
  archive = false,
}: PaginationParameters & { archive?: boolean }) =>
  q
    .parameters<EventsPaginatedParameters>()
    .project((sub) => ({
      items: sub.star
        .filterByType("event")
        .filterBy("locale == $locale")
        .filterRaw(
          "$location == null || division->slug.current in $location || (isOnline && 'online' in $location)"
        )
        .filterRaw("$name == null || name match $name")
        .filterRaw(`dateTime(coalesce(endDate, startDate)) ${archive ? "<" : ">="} dateTime(now())`)
        .order(`startDate ${archive ? "desc" : "asc"}`),
    }))
    .project((sub) => ({
      total: sub.count("items[]"),
      page: sub.value(page),
      perPage: sub.value(perPage),
      items: sub.field("items[]").project(eventPreviewFragment(archive)),
    }));
