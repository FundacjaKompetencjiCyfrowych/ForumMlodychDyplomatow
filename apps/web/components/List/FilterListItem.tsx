"use client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Field, FieldContent, FieldGroup, FieldLabel } from "../ui/field";
import Typography from "../ui/typography";
import { useTransitionProvider } from "./FilterListTransition";
type Props = {
  label: string;
  slug: string;
  value?: string;
  isDefault?: boolean;
};

export const FilterListItem = ({ label, slug, value = "default", isDefault }: Props) => {
  const { startTransition } = useTransitionProvider();
  const [params, setParams] = useQueryState(
    slug,
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      startTransition,
    })
  );

  // TODO there's an annoying flicker when the default checkbox gets changed due to clicking/unclicking a different param
  // Will either fix or workaround this in the future
  const isChecked = isDefault ? params.length === 0 : params.includes(value);

  const onClick = () => {
    if (isDefault && !isChecked) {
      setParams([]);
      return;
    }
    setParams((prev) => {
      if (isChecked) {
        return prev.filter((p) => p !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  return (
    <FieldGroup className="w-fit flex-row">
      <Field orientation="horizontal">
        <Checkbox
          id={`${slug}-${value}`}
          className="flex flex-row items-center gap-4"
          checked={isChecked}
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
