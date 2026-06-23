"use client";
import { useTranslations, type Locale } from "next-intl";
import type { EventPreview as EventPreviewType } from "../../../sanity/queries/events";
import type { PaginationQueryFunction } from "../../../sanity/queries/pagination";
import EventPreview from "../../Events/event-preview";
import { FilterList, type Filter, type FilterParams } from "../FilterList";
import { useMemo } from "react";
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

export const EventsFilterList = ({ filters, queryAction, locale, perPage }: Props) => {
  const t = useTranslations("events");
  const eventTabs = useMemo(() => {
    return {
      slug: "type",
      values: [
        { label: t("upcoming"), value: "upcoming", default: true },
        { label: t("archive"), value: "archive" },
      ],
    };
  }, [t]);
  return (
    <FilterList
      filters={filters}
      tabs={eventTabs}
      Component={EventListComponent}
      queryAction={queryAction}
      locale={locale}
      perPage={perPage}
      listClassName="flex flex-col gap-4"
    />
  );
};
