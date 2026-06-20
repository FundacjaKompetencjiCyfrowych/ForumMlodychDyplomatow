"use client";
import { ChevronDown } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { usePage } from "./FilterListPagination";
type Props = {
  label: string;
  slug: string;
  value?: string;
  isDefault?: boolean;
};

export const FilterListItem = ({ label, slug, value = "default", isDefault }: Props) => {
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
      variant="toggle"
      className="w-full justify-start"
      data-state={isChecked ? "on" : "off"}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export const FilterListGroupItem = ({
  label,
  slug,
  subgroups,
}: Omit<Props, "value"> & { subgroups: { label: string; value: string }[] }) => {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild className="group">
        <Button
          variant="toggle"
          className="justify-between text-start whitespace-normal"
          iconRight={
            <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
          }
        >
          {label}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full pl-4">
        {subgroups?.map((g) => (
          <FilterListItem key={g.value} label={g.label} slug={slug} value={g.value} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
