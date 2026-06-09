import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import React from "react";
import type { PaginationQueryFunction } from "../../sanity/queries/pagination";
import { Button } from "../ui/button";
import Typography from "../ui/typography";
import { FilterListInput } from "./FilterListInput";
import { FilterListItem } from "./FilterListItem";
import { TransitionContainer, TransitionProvider } from "./FilterListTransition";
import { ChevronDown } from "lucide-react";

export type FilterParams = {
  q?: string;
  filters?: Record<string, string[]>;
  locale: Locale;
};

type Props<T> = {
  filters: Filter[];
  Component: React.ComponentType<{ item: T }>;
  query: PaginationQueryFunction<T, FilterParams>;
  searchParams: Record<string, string | string[] | undefined>;
  locale: Locale;
};

export type Filter = {
  slug: string;
  label: string;
  options: Array<
    | {
        label: string;
        value: string;
        everything?: undefined;
      }
    | { label: string; value?: undefined; everything: true }
  >;
};

const getParamsAsArray = (param: string | string[] | undefined): string[] => {
  if (!param) return [];
  if (Array.isArray(param)) return param;
  if (param.includes(",")) return param.split(",");
  return [param];
};

export const FilterList = async <T extends { _id: string }>({
  filters,
  query,
  Component,
  searchParams,
  locale,
}: Props<T>) => {
  const t = await getTranslations();
  const data = await query({
    page: searchParams.page ? getParamsAsArray(searchParams.page).map((p) => parseInt(p))[0] : 1,
    perPage: searchParams.perPage
      ? getParamsAsArray(searchParams.perPage).map((p) => parseInt(p))[0]
      : 10,
    orderBy: searchParams.orderBy ? getParamsAsArray(searchParams.orderBy)[0] : "name",
    order: searchParams.order ? (getParamsAsArray(searchParams.order)[0] as "asc" | "desc") : "asc",
    q: searchParams.q ? getParamsAsArray(searchParams.q)[0] : undefined,
    filters: filters.reduce(
      (acc, filter) => {
        const value = searchParams[filter.slug];
        if (value) {
          acc[filter.slug] = Array.isArray(value) ? value : [value];
        }
        return acc;
      },
      {} as Record<string, string[]>
    ),
    locale,
  });
  return (
    <TransitionProvider>
      <div className="flex w-full flex-col gap-4 desktop:flex-row">
        <div className="flex flex-col items-start">
          {filters.map((filter) => (
            <div key={filter.slug} className="flex w-auto flex-col items-start">
              <Typography>{filter.label}</Typography>
              {filter.options.map((option) => (
                <FilterListItem
                  key={option.value ?? "everything"}
                  label={option.label}
                  slug={filter.slug}
                  value={option.value}
                  everything={option.everything}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex grow flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <FilterListInput />
            <Button variant="ghost" iconRight={<ChevronDown />} disabled>
              Sort (not implemented)
            </Button>
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
        </div>
      </div>
    </TransitionProvider>
  );
};
