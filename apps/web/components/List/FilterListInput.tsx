"use client";
import { SearchIcon, XIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { Button } from "../ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { useTransitionProvider } from "./FilterListTransition";
import { usePage } from "./FilterListPagination";

export const FilterListInput = ({ placeholder }: { placeholder?: string }) => {
  const { startTransition } = useTransitionProvider();
  const [value, setValue] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      startTransition,
      limitUrlUpdates: {
        method: "debounce",
        timeMs: 300,
      },
    })
  );
  const [_, setPage] = usePage(startTransition);

  return (
    <InputGroup className="gap-2">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setPage(0);
        }}
      />
      <InputGroupAddon align="inline-end">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            setValue("");
            setPage(0);
          }}
        >
          <XIcon />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};
