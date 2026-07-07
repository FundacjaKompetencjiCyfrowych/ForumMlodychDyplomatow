"use client";
import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates, useQueryState } from "nuqs";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { ChevronDown, X, List, ChevronLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import type { PaginationQueryFunction, PaginationResult } from "../../sanity/queries/pagination";
import Typography from "../ui/typography";
import { FilterListInput } from "./FilterListInput";
import FilterListPagination, { usePage } from "./FilterListPagination";
import FilterListTabs from "./FilterListTabs";
import { FilterListContext, TransitionContainer } from "./FilterListTransition";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

// --- TYPY I KOMPONENTY POJEDYNCZYCH FILTRÓW ---

export type FilterButtonVariant = "toggle" | "chip" | "radio";

type FilterItemProps = {
  label: string;
  slug: string;
  value?: string;
  isDefault?: boolean;
  type?: FilterButtonVariant;
};

export const FilterListItem = ({
  label,
  slug,
  value = "default",
  isDefault,
  type = "toggle",
}: Omit<FilterItemProps, "type"> & {
  type?: "chip" | "toggle";
}) => {
  const [params, setParams] = useQueryState(slug, parseAsArrayOf(parseAsString).withDefault([]));
  const [_, setPage] = usePage();
  const isChecked = isDefault ? params.length === 0 : params.includes(value);

  const onClick = () => {
    if (isDefault && !isChecked) {
      setParams([]);
      setPage(0);
      return;
    }
    setParams((prev) => {
      if (isChecked) {
        return prev.filter((p) => p !== value);
      } else {
        return [...prev, value];
      }
    });
    setPage(0);
  };
  return (
    <Button
      id={`${slug}-${value}`}
      variant={type}
      size="inline"
      className={"justify-start text-left"}
      data-state={isChecked ? "on" : "off"}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export const FilterRadioItem = ({
  label,
  slug,
  value,
}: {
  label: string;
  slug: string;
  value: string;
}) => {
  const [currentValue, setValue] = useQueryState(slug, parseAsString);
  const [_, setPage] = usePage();

  const isChecked = currentValue === value;

  const onClick = () => {
    setValue(isChecked ? null : value);
    setPage(0);
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-left text-sm text-brand-gray-700 transition-colors hover:text-brand-red"
    >
      <div
        className={`flex size-4 shrink-0 items-center justify-center rounded-full border border-slate-400 ${isChecked ? "border-brand-red bg-brand-red" : ""}`}
      >
        {isChecked && <div className="size-2 rounded-full bg-white" />}
      </div>
      {label}
    </button>
  );
};

export const FilterListGroupItem = ({
  label,
  slug,
  subgroups,
  type = "event",
  activeCount = 0,
}: Omit<FilterItemProps, "value" | "type"> & {
  type?: string;
  subgroups: { label: string; value: string; type: FilterButtonVariant | "radio" }[];
  activeCount?: number;
}) => {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild className="group">
        <Button
          variant="toggle"
          className={
            "justify-between text-start font-bold whitespace-normal " +
            (type == "publications" ? "p-2" : "")
          }
          iconRight={
            <ChevronDown className="shrink-0 transition-transform group-data-[state=open]:rotate-180" />
          }
        >
          <span className="flex items-center gap-2">
            {label}
            {activeCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-brand-red-900 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex w-full flex-wrap gap-2 pt-2 pb-4 pl-4">
        {subgroups?.map((g) => {
          if (g.type === "radio") {
            return <FilterRadioItem key={g.value} label={g.label} slug={slug} value={g.value} />;
          }
          return (
            <FilterListItem
              key={g.value}
              label={g.label}
              slug={slug}
              value={g.value}
              type={g.type as "chip" | "toggle"}
            />
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

// --- GŁÓWNE TYPY DLA FILTER LIST ---

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
  type?: string;
};
type FilterOption = {
  label: string;
  value: string;
  type?: FilterButtonVariant;
  default?: undefined;
  subgroups?: undefined;
};
type FilterDefaultOption = {
  label: string;
  value?: undefined;
  default: true;
  type?: undefined;
  subgroups?: undefined;
};
type FilterSubgroupOption = {
  label: string;
  value?: undefined;
  default?: undefined;
  subgroups: {
    label: string;
    value: string;
    type: FilterButtonVariant;
  }[];
};

export type Filter = {
  slug: string;
  label?: string;
  defaultValue?: string;
  multiple?: boolean;
  options: Array<FilterOption | FilterDefaultOption | FilterSubgroupOption>;
};

type FilterResultType = typeof parseAsString | ReturnType<typeof parseAsArrayOf<string>>;

const createFilterListParams = (filters: Filter[], tabs?: TabsType) => {
  return {
    page: parseAsInteger.withDefault(1),
    q: parseAsString,
    sort: parseAsString.withDefault("desc"),
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

// --- GŁÓWNY KOMPONENT ---

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
  type = "event",
}: Props<T, TParams>) => {
  const t = useTranslations("publications.filterComponent");
  const [isPending, startTransition] = useTransition();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const paramsParser = useMemo(
    () => createFilterListParams(filters, tabs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filters), JSON.stringify(tabs)]
  );

  const [params, setParams] = useQueryStates(paramsParser);
  const [data, setData] = useState<PaginationResult<T> | null>(null);

  const allOptionsFlat = useMemo(() => {
    const flat: { value: string; label: string; slug: string }[] = [];
    filters.forEach((filter) => {
      filter.options.forEach((opt) => {
        if (opt.subgroups) {
          opt.subgroups.forEach((sub) => {
            if (sub.value) flat.push({ value: sub.value, label: sub.label, slug: filter.slug });
          });
        } else if (opt.value) {
          flat.push({ value: opt.value, label: opt.label, slug: filter.slug });
        }
      });
    });
    return flat;
  }, [filters]);

  const activeFilters = useMemo(() => {
    const active: { label: string; value: string; slug: string }[] = [];
    filters.forEach((f) => {
      const val = params[f.slug as keyof typeof params];
      if (Array.isArray(val)) {
        val.forEach((v) => {
          const match = allOptionsFlat.find((o) => o.value === v);
          if (match) active.push(match);
        });
      } else if (typeof val === "string" && val) {
        const match = allOptionsFlat.find((o) => o.value === val);
        if (match) active.push(match);
      }
    });
    return active;
  }, [params, allOptionsFlat, filters]);

  const getActiveCountForGroup = (slug: string, subgroups: any[]) => {
    const current = params[slug as keyof typeof params];
    if (!current) return 0;
    if (Array.isArray(current)) {
      return current.filter((v) => subgroups.some((sub) => sub.value === v)).length;
    }
    return subgroups.some((sub) => sub.value === current) ? 1 : 0;
  };

  const handleRemoveFilter = (slug: string, value: string) => {
    const currentVal = params[slug as keyof typeof params];
    if (Array.isArray(currentVal)) {
      setParams({ [slug]: currentVal.filter((v) => v !== value) } as any);
    } else {
      setParams({ [slug]: null } as any);
    }
    setParams({ page: 1 } as any);
  };

  const handleResetFilters = () => {
    const resetObj: Record<string, any> = { q: null, page: 1 };
    filters.forEach((f) => {
      resetObj[f.slug] = null;
    });
    setParams(resetObj);
  };

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
          sort: params.sort,
        },
        locale,
      });
      setData(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params), locale, perPage]);

  const renderFiltersList = () => (
    <>
      {filters.map((filter) => (
        <div key={filter.slug} className="flex w-full flex-col items-start">
          {filter.label && type !== "publications" && (
            <Typography variant="body-m" className="mb-2 font-semibold">
              {filter.label}
            </Typography>
          )}
          {filter.options.map((option) => {
            if (option.subgroups) {
              return (
                <FilterListGroupItem
                  key={option.label}
                  label={option.label}
                  slug={filter.slug}
                  subgroups={option.subgroups}
                  type={type}
                  activeCount={getActiveCountForGroup(filter.slug, option.subgroups)}
                />
              );
            }

            const isRadio = (option as FilterOption).type === "radio";
            return isRadio ? (
              <FilterRadioItem
                key={option.value}
                label={option.label}
                slug={filter.slug}
                value={option.value ?? ""}
              />
            ) : (
              <FilterListItem
                key={option.value ?? "default"}
                label={option.label}
                slug={filter.slug}
                value={option.value}
                isDefault={option.default}
                type={(option as FilterOption).type as "toggle" | "chip" | undefined}
              />
            );
          })}
        </div>
      ))}
    </>
  );

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <FilterListContext.Provider value={{ isPending, startTransition }}>
      {/* --- MOBILE DRAWER OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-100 flex flex-col bg-white desktop:hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gray-200 p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-full p-1 text-brand-red-900 hover:bg-gray-50"
            >
              <ChevronLeft className="size-6" />
            </button>
            <div className="flex-1">
              <FilterListInput placeholder={t("search")} />
            </div>
          </div>

          {/* Ciało z filtrami i opcjami */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Aktywne filtry mobilnie */}
            {(activeFilters.length > 0 || params.q) && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {activeFilters.map((f, i) => (
                  <button
                    key={`mobile-${f.slug}-${f.value}-${i}`}
                    onClick={() => handleRemoveFilter(f.slug, f.value)}
                    className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm transition-colors hover:bg-red-50 hover:text-brand-red-700"
                  >
                    {f.label}
                    <X className="size-3.5" />
                  </button>
                ))}
                <button
                  onClick={handleResetFilters}
                  className="ml-2 text-sm font-semibold text-brand-red-900"
                >
                  {t("reset")}
                </button>
              </div>
            )}

            {/* Renderowanie filtrów dla widoku mobilnego */}
            {renderFiltersList()}
          </div>
        </div>
      )}

      {/* --- GŁÓWNY WIDOK KOMPONENTU --- */}
      <div className="relative flex w-full flex-col gap-10 desktop:flex-row">
        {/* LEWA KOLUMNA (DESKTOP) */}
        <div className="hidden w-64 shrink-0 flex-col items-start desktop:flex">
          {renderFiltersList()}
        </div>

        {/* PRAWA KOLUMNA */}
        <div className="flex grow flex-col gap-4">
          {/* PASEK WYSZUKIWANIA I TRIGGER MOBILNY (TERAZ DLA WSZYSTKICH TYPÓW) */}
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-row items-center gap-4">
              <FilterListInput placeholder={t("search")} />
            </div>

            {/* Trigger "KATEGORIE" widoczny tylko na mobile */}
            <div className="flex items-center justify-center py-2 desktop:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center gap-2 font-semibold text-brand-blue-900"
              >
                <List className="size-5" />
                KATEGORIE
                {activeFilters.length > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-brand-red-900 text-xs font-bold text-white">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* BELKA Z FILTRAMI TYLKO DLA PUBLICATIONS (DESKTOP) */}
          {type === "publications" && (
            <div className="hidden flex-col items-start justify-between gap-4 border-b border-gray-100 py-2 pb-4 text-sm text-gray-500 md:flex-row md:items-center desktop:flex">
              <div className="flex flex-wrap items-center gap-2">
                <span>
                  {t("results")}: {data?.total ?? 0}
                </span>

                {activeFilters.map((f, i) => (
                  <button
                    key={`${f.slug}-${f.value}-${i}`}
                    onClick={() => handleRemoveFilter(f.slug, f.value)}
                    className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 transition-colors hover:bg-red-50 hover:text-brand-red-700"
                  >
                    {f.label}
                    <X className="size-3" />
                  </button>
                ))}

                {(activeFilters.length > 0 || params.q) && (
                  <button
                    onClick={handleResetFilters}
                    className="ml-2 font-semibold text-brand-red-900 hover:text-brand-red-700"
                  >
                    {t("reset")}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span>{t("sortBy")}:</span>
                <select
                  className="cursor-pointer bg-transparent font-semibold text-gray-900 outline-none"
                  value={params.sort as string}
                  onChange={(e) => {
                    setParams({ sort: e.target.value, page: 1 } as any);
                  }}
                >
                  <option value="desc">{t("sortNewest")}</option>
                  <option value="asc">{t("sortOldest")}</option>
                </select>
              </div>
            </div>
          )}

          {/* DLA INNYCH TYPÓW (STARY WIDOK NA DESKTOPIE) */}
          {type !== "publications" && (
            <Typography>
              {t("results")}: {data?.total ?? 0}
            </Typography>
          )}

          {tabs && <FilterListTabs slug={tabs.slug} tabs={tabs.values} />}

          <TransitionContainer
            pendingClassName="opacity-70"
            className={cn("transition-opacity duration-150", listClassName)}
          >
            {data === null ? (
              <Typography>{t("loading")}</Typography>
            ) : data.items.length === 0 && type === "publications" ? (
              <div className="mt-4 flex flex-col items-center justify-between rounded-lg border border-gray-100 bg-white p-8 shadow-sm md:flex-row">
                <div className="mb-4 md:mb-0">
                  <Typography variant="body-m" className="font-bold text-gray-900">
                    {t("emptyStateTitle")}
                  </Typography>
                  <Typography className="mt-1 text-sm text-gray-500">
                    {t("emptyStateDesc")}
                  </Typography>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="rounded-md border border-slate-900 px-6 py-2 font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                >
                  {t("showAll")}
                </button>
              </div>
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
