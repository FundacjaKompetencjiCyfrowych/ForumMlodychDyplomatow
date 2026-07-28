"use client";
import { ChevronDown, Check } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Button, buttonVariants } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { usePage } from "./FilterListPagination";
import { cn } from "@/lib/utils";

export const FilterCheckboxItem = ({
  label,
  slug,
  value,
  isDisabled,
}: {
  label: string;
  slug: string;
  value: string;
  isDisabled?: boolean;
}) => {
  const [params, setParams] = useQueryState(slug, parseAsArrayOf(parseAsString).withDefault([]));
  const [_, setPage] = usePage();

  const isChecked = params.includes(value);

  const onClick = () => {
    if (isDisabled && !isChecked) return;

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
      size="inline"
      variant="none"
      onClick={onClick}
      disabled={isDisabled && !isChecked}
      className={`group flex w-full items-center justify-start gap-2 py-1 text-left transition-colors ${
        isDisabled && !isChecked
          ? "cursor-not-allowed text-brand-gray-400 opacity-50"
          : "text-brand-gray-700 hover:text-brand-gray-900"
      }`}
    >
      <div
        className={`flex size-3.5 shrink-0 items-center justify-center border-2 border-brand-gray-900 transition-colors ${
          isChecked
            ? "border-brand-gray-900"
            : isDisabled && !isChecked
              ? "border-slate-300 bg-slate-100"
              : "group-hover:border-brand-gray-400"
        }`}
      >
        {isChecked && <Check className="size-2 text-brand-gray-900" strokeWidth={5} />}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
};

export const FilterListGroupItem = ({
  label,
  slug,
  subgroups,
  type = "event",
  activeCount = 0,
  maxSelection,
}: {
  label: string;
  slug: string;
  type?: string;
  subgroups: { label: string; value: string; type?: string }[];
  activeCount?: number;
  maxSelection?: number;
}) => {
  const [params] = useQueryState(slug, parseAsArrayOf(parseAsString).withDefault([]));

  const currentSelectionCount = params.length;
  const isMaxReached = maxSelection !== undefined && currentSelectionCount >= maxSelection;

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger
        className={cn(
          "group",
          buttonVariants({ variant: "toggle" }),
          "w-full justify-between text-start font-bold whitespace-normal",
          type === "publications" && "p-2"
        )}
      >
        <span className="flex items-center gap-2">
          {label}
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-red-900 text-[10px] font-bold text-white desktop:hidden">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown className="shrink-0 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex w-full flex-col gap-3 pl-4">
        {subgroups?.map((g) => {
          const isChecked = params.includes(g.value);
          const isDisabled = isMaxReached && !isChecked;

          return (
            <FilterCheckboxItem
              key={g.value}
              label={g.label}
              slug={slug}
              value={g.value}
              isDisabled={isDisabled}
            />
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};
