"use client";
import { ChevronDown } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { usePage } from "./FilterListPagination";

export type FilterButtonVariant = "toggle" | "chip" | "radio";

type Props = {
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
}: Omit<Props, "type"> & {
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
      className="flex items-center gap-2 text-sm text-brand-gray-700 transition-colors hover:text-brand-red"
    >
      <div
        className={`flex size-4 items-center justify-center rounded-full border border-slate-400 ${isChecked ? "border-brand-red bg-brand-red" : ""}`}
      >
        {isChecked && <div className="size-2 rounded-full bg-white" />}
      </div>
      {label}
    </button>
  );
};

// W pliku FilterListItem.tsx

export const FilterListGroupItem = ({
  label,
  slug,
  subgroups,
  type = "event",
}: Omit<Props, "value" | "type"> & {
  type?: string;
  // Zmieniamy typ na taki, który dopuszcza "radio"
  subgroups: { label: string; value: string; type: FilterButtonVariant | "radio" }[];
}) => {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild className="group">
        <Button
          variant="toggle"
          className={
            "justify-between text-start whitespace-normal " + (type == "publications" ? "p-2" : "")
          }
          iconRight={
            <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
          }
        >
          {label}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex w-full flex-wrap gap-2 pl-4">
        {/* Zmienione na flex-col dla lepszego układu */}
        {subgroups?.map((g) => {
          // Logika decyzyjna:
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
