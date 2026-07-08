"use client";
import { ChevronDown } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { usePage } from "./FilterListPagination";

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
      className={"justify-start"}
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
      className="flex w-full items-center gap-2 text-left text-sm text-brand-gray-700 transition-colors hover:text-brand-red"
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
    <Collapsible className="w-full">
      <CollapsibleTrigger asChild className="group">
        <Button
          variant="toggle"
          className={
            "w-full justify-between text-start font-bold whitespace-normal " +
            (type == "publications" ? "p-2" : "")
          }
          iconRight={
            <ChevronDown className="shrink-0 transition-transform group-data-[state=open]:rotate-180" />
          }
        >
          <span className="flex items-center gap-2">
            {label}
            {activeCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-brand-red-900 text-[10px] font-bold text-white desktop:hidden">
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
