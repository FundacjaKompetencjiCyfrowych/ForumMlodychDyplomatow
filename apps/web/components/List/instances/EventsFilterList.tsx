"use client";
import type { Locale } from "next-intl";
import type { EventPreview as EventPreviewType } from "../../../sanity/queries/events";
import type { PaginationQueryFunction } from "../../../sanity/queries/pagination";
import EventPreview from "../../Events/event-preview";
import { FilterList, type Filter, type FilterParams } from "../FilterList";
const EventListComponent = ({ item, locale }: { item: EventPreviewType; locale: Locale }) => {
  return <EventPreview locale={locale} event={item} isArchive={item.archive} />;
};
type Props = {
  filters: Filter[];
  queryAction: PaginationQueryFunction<
    EventPreviewType,
    FilterParams<{ location: string[]; type: "archive" | "upcoming" }>
  >;
  locale: Locale;
  perPage?: number;
};

export const EventsFilterList = ({ filters, queryAction, locale, perPage }: Props) => (
  <FilterList
    filters={filters}
    Component={EventListComponent}
    queryAction={queryAction}
    locale={locale}
    perPage={perPage}
    listClassName="flex flex-col gap-4"
  />
);
