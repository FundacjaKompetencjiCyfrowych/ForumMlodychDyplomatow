import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import React from "react";
import type { PaginationQueryFunction } from "../../sanity/queries/pagination";
import Typography from "../ui/typography";
import { FilterListInput } from "./FilterListInput";
import { FilterListGroupItem, FilterListItem } from "./FilterListItem";
import FilterListPagination from "./FilterListPagination";
import { TransitionContainer, TransitionProvider } from "./FilterListTransition";

export type FilterParams = {
  q?: string;
  filters?: Record<string, string | number | string[]>;
  locale: Locale;
};

type Props<T> = {
  filters: Filter[];
  Component: React.ComponentType<{ item: T }>;
  query: PaginationQueryFunction<T, FilterParams>;
  searchParams: Record<string, string | string[] | undefined>;
  locale: Locale;
  defaultOrderBy?: string;
  perPage?: number;
};

type FilterOption = {
  label: string;
  value: string;
  default?: undefined;
  subgroups?: undefined;
};
type FilterDefaultOption = {
  label: string;
  value?: undefined;
  default: true;
  subgroups?: undefined;
};
type FilterSubgroupOption = {
  label: string;
  value?: undefined;
  default?: undefined;
  subgroups: FilterOption[];
};
export type Filter = {
  slug: string;
  label?: string;
  defaultValue?: string;
  multiple?: boolean;

  options: Array<FilterOption | FilterDefaultOption | FilterSubgroupOption>;
};

const baseFilterListParams = (defaultOrderBy?: string) => ({
  page: parseAsInteger.withDefault(1),
  q: parseAsString,
  orderBy: defaultOrderBy ? parseAsString.withDefault(defaultOrderBy) : parseAsString,
  order: parseAsStringLiteral(["asc", "desc"]),
});

type FilterResultType = typeof parseAsString | ReturnType<typeof parseAsArrayOf<string>>;

/**
 * Create a params parser nuqs object, based on the default filter list params and the filters provided.
 */
const createFilterListParams = (filters: Filter[], defaultOrderBy?: string) => {
  return {
    ...baseFilterListParams(defaultOrderBy),
    ...(Object.fromEntries(
      filters.map((filter) => {
        const singleParser = filter.defaultValue
          ? parseAsString.withDefault(filter.defaultValue)
          : parseAsString;
        if (filter.multiple) {
          return [filter.slug, parseAsArrayOf(singleParser)];
        }
        return [filter.slug, singleParser];
      })
    ) as Record<string, FilterResultType>),
  };
};

export const FilterList = async <T extends { _id: string }>({
  filters,
  query,
  Component,
  searchParams,
  defaultOrderBy,
  locale,
  perPage = 10,
}: Props<T>) => {
  const t = await getTranslations({ locale });
  // we have to make this inline instead of outside as we're depending on the filters
  const paramsParser = createFilterListParams(filters, defaultOrderBy);
  const params = createLoader(paramsParser)(searchParams);
  const data = await query({
    page: params.page,
    perPage: perPage,
    q: params.q ?? undefined,
    filters: filters.reduce(
      (acc, filter) => {
        const value = params[filter.slug as keyof typeof params] ?? undefined;
        if (value) {
          acc[filter.slug] = value;
        }
        return acc;
      },
      {} as Record<string, number | string | string[]>
    ),
    locale,
  });

  return (
    <TransitionProvider>
      <div className="flex w-full flex-col gap-4 desktop:flex-row">
        <div className="flex flex-col items-start">
          {filters.map((filter) => (
            <div key={filter.slug} className="flex w-70 flex-col items-start px-2 py-16">
              {filter.label && <Typography>{filter.label}</Typography>}
              {filter.options.map((option) => {
                if (option.subgroups) {
                  return (
                    <FilterListGroupItem
                      key={option.label}
                      label={option.label}
                      slug={filter.slug}
                      subgroups={option.subgroups}
                    />
                  );
                }
                return (
                  <FilterListItem
                    key={option.value ?? "default"}
                    label={option.label}
                    slug={filter.slug}
                    value={option.value}
                    isDefault={option.default}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex grow flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <FilterListInput placeholder={t("global.search")} />
          </div>
          <Typography>
            {t("global.results")}: {data.total}
          </Typography>
          <TransitionContainer
            pendingClassName="opacity-70"
            className="grid grid-cols-1 transition-opacity duration-150 md:grid-cols-2 lg:grid-cols-3"
          >
            {data.items.map((item, index) => (
              <Component key={index} item={item} />
            ))}
          </TransitionContainer>
          <FilterListPagination perPage={perPage} total={data.total} />
        </div>
      </div>
    </TransitionProvider>
  );
};
