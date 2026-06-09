"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import Typography from "../ui/typography";
import { Field, FieldContent, FieldGroup, FieldLabel } from "../ui/field";
import { useTransitionProvider } from "./FilterListTransition";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
type Props = {
  label: string;
  slug: string;
  value?: string;
  everything?: boolean;
};

export const FilterListItem = ({ label, slug, value = "everything", everything }: Props) => {
  // TODO check nuqs library
  const { startTransition } = useTransitionProvider();
  const [params, setParams] = useQueryState(
    slug,
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      scroll: false,
      clearOnDefault: true,
      startTransition,
      shallow: false,
    })
  );
  const isChecked = everything ? params.length === 0 : params.includes(value);

  const [checked, setChecked] = React.useOptimistic(isChecked);

  if (!everything && (value === undefined || value === "everything")) {
    console.warn(
      "FilterListItem with slug",
      slug,
      "is missing value and is not marked as everything"
    );
    return null;
  }

  const onClick = () => {
    startTransition(() => {
      if (everything && !checked) {
        setParams([]);
        setChecked(true);
        return;
      }
      setParams((prev) => {
        if (checked) {
          return prev.filter((p) => p !== value);
        } else {
          return [...prev, value];
        }
      });
      setChecked((prev) => !prev);
    });
  };
  return (
    <FieldGroup className="w-fit flex-row">
      <Field orientation="horizontal">
        <Checkbox
          id={`${slug}-${value}`}
          className="flex flex-row items-center gap-4"
          checked={checked}
          onCheckedChange={onClick}
        />
        <FieldContent>
          <Typography asChild>
            <FieldLabel htmlFor={`${slug}-${value}`} className="whitespace-nowrap">
              {label}
            </FieldLabel>
          </Typography>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
};
