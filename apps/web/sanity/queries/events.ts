import { type InferFragmentType, type InferResultType } from "groqd";
import { q } from "../groqd";

export type EventsListQueryParams = {
  locale: string;
  divisionSlug?: string | null;
  currentDate?: string | null;
  limit?: number;
};

export const DEFAULT_EVENTS_LIST_LIMIT = 6;

export const eventPreviewFragment = q.fragmentForType<"event">().project((sub) => ({
  _id: sub.field("_id"),
  name: sub.field("name"),
  startDate: sub
    .field("startDate")
    .transform((date) => (date ? new Date(date).toISOString() : null)),
  endDate: sub.field("endDate").transform((date) => (date ? new Date(date).toISOString() : null)),
  excerpt: sub.field("excerpt"),
  venue: sub.select(
    {
      isOnline: sub.value("Online"),
      "!isOnline": sub.field("venue"),
    },
    sub.field("venue")
  ),
  slug: sub.field("slug.current"),
  registrationUrl: sub.field("registrationUrl"),
  isOnline: sub.field("isOnline"),
  division: sub
    .field("division")
    .deref()
    .project({
      _id: sub.field("_id"),
      name: sub.field("name"),
      slug: sub.field("slug.current"),
    }),
}));
export type EventPreview = InferFragmentType<typeof eventPreviewFragment>;

const baseEventsListQuery = ({
  timeFilterSign,
  sortOrder,
}: {
  timeFilterSign: ">=" | "<";
  sortOrder: "asc" | "desc";
}) =>
  q
    .parameters<EventsListQueryParams>()
    .star.filterByType("event")
    .filterBy("locale == $locale")
    .filterRaw(
      `!defined($divisionSlug) || ($divisionSlug == "online" && isOnline) || division->slug.current == $divisionSlug`
    )
    .filterRaw(
      `dateTime(coalesce(endDate, startDate)) ${timeFilterSign} dateTime(coalesce($currentDate, now()))`
    )
    .order(`startDate ${sortOrder}`)
    .raw(`[0...$limit]`, "passthrough")
    .project(eventPreviewFragment);
export const upcomingEventsQuery = baseEventsListQuery({
  timeFilterSign: ">=",
  sortOrder: "asc",
});

export const archivedEventsQuery = baseEventsListQuery({
  timeFilterSign: "<",
  sortOrder: "desc",
});

export const combinedEventsQuery = q.parameters<EventsListQueryParams>().project({
  upcoming: upcomingEventsQuery,
  archived: archivedEventsQuery,
});
export type CombinedEventsQueryResult = InferResultType<typeof combinedEventsQuery>;
