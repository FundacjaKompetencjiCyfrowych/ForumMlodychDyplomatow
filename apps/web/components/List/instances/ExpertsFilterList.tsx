"use client";
import type { Locale } from "next-intl";
import { FilterList, type Filter, type FilterParams } from "../FilterList";
import type { PaginationQueryFunction } from "../../../sanity/queries/pagination";
import type { PersonFull } from "../../../sanity/queries/person";
import { PersonCard } from "../../People/PersonCard";

const PersonCardComponent = ({ item }: { item: PersonFull }) => <PersonCard person={item} />;

type Props = {
  filters: Filter[];
  queryAction: PaginationQueryFunction<PersonFull, FilterParams>;
  locale: Locale;
  perPage?: number;
};

export const ExpertsFilterList = ({ filters, queryAction, locale, perPage }: Props) => (
  <FilterList
    filters={filters}
    Component={PersonCardComponent}
    queryAction={queryAction}
    locale={locale}
    perPage={perPage}
    listClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  />
);
