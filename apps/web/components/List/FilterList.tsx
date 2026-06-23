"use client";
import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { cn } from "../../lib/utils";
import type { PaginationQueryFunction, PaginationResult } from "../../sanity/queries/pagination";
import Typography from "../ui/typography";
import { FilterListInput } from "./FilterListInput";
import { FilterListGroupItem, FilterListItem } from "./FilterListItem";
import FilterListPagination from "./FilterListPagination";
import FilterListTabs from "./FilterListTabs";
import { FilterListContext, TransitionContainer } from "./FilterListTransition";

export type FilterParams<
  T extends Record<string, string | number | string[]> = Record<string, string | number | string[]>,
> = {
  q?: string;
  filters?: T;
  locale: Locale;
};
type TabsType = { slug: string; values: { label: string; value: string; default?: boolean }[] };
type Props<
  T,
  TParams extends Record<string, string | number | string[]> = Record<
    string,
    string | number | string[]
  >,
> = {
  filters: Filter[];
  tabs?: TabsType;
  Component: React.ComponentType<{ item: T; locale: Locale }>;
  queryAction: PaginationQueryFunction<T, FilterParams<TParams>>;
  locale: Locale;
  perPage?: number;
  listClassName?: string;
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

type FilterResultType = typeof parseAsString | ReturnType<typeof parseAsArrayOf<string>>;

/**
 * Create a params parser nuqs object, based on the default filter list params and the filters provided.
 */
const createFilterListParams = (filters: Filter[], tabs?: TabsType) => {
  return {
    page: parseAsInteger.withDefault(1),
    q: parseAsString,
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
    ...(tabs
      ? {
          [tabs.slug]: parseAsString.withDefault(
            tabs.values.find((tab) => tab.default)?.value ?? tabs.values[0].value
          ),
        }
      : {}),
  };
};

export const FilterList = <
  T extends { _id: string },
  TParams extends Record<string, string | number | string[]>,
>({
  filters,
  tabs,
  queryAction,
  Component,
  locale,
  perPage = 10,
  listClassName,
}: Props<T, TParams>) => {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  // we have to make this inline instead of outside as we're depending on the filters
  const paramsParser = useMemo(
    () => createFilterListParams(filters, tabs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filters), JSON.stringify(tabs)]
  );

  const [params] = useQueryStates(paramsParser);
  const [data, setData] = useState<PaginationResult<T> | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const result = await queryAction({
        page: params.page ?? 1,
        perPage,
        q: params.q ?? undefined,
        filters: {
          ...(filters.reduce(
            (acc, filter) => {
              const value = params[filter.slug as keyof typeof params] ?? undefined;
              if (value) {
                acc[filter.slug] = value as string | string[] | number;
              }
              return acc;
            },
            {} as Record<string, number | string | string[]>
          ) as TParams),
          ...(tabs ? { [tabs.slug]: params[tabs.slug as keyof typeof params] } : {}),
        },
        locale,
      });
      setData(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params), locale, perPage]);
  return (
    <FilterListContext.Provider value={{ isPending, startTransition }}>
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
            {t("global.results")}: {data?.total ?? 0}
          </Typography>
          {tabs && <FilterListTabs slug={tabs.slug} tabs={tabs.values} />}
          <TransitionContainer
            pendingClassName="opacity-70"
            className={cn("transition-opacity duration-150", listClassName)}
          >
            {data === null ? (
              <Typography>Loading...</Typography>
            ) : (
              data.items.map((item, index) => <Component key={index} item={item} locale={locale} />)
            )}
          </TransitionContainer>
          <FilterListPagination perPage={perPage} total={data?.total ?? 0} />
        </div>
      </div>
    </FilterListContext.Provider>
  );
};
