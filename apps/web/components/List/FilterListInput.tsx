"use client";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { Input } from "../ui/input";
import { useTransitionProvider } from "./FilterListTransition";

export const FilterListInput = () => {
  const t = useTranslations("global");
  const { startTransition } = useTransitionProvider();
  const [value, setValue] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      scroll: false,
      clearOnDefault: true,
      shallow: false,
      startTransition,
      limitUrlUpdates: {
        method: "debounce",
        timeMs: 300,
      },
    })
  );
  return (
    <Input placeholder={t("search")} value={value} onChange={(e) => setValue(e.target.value)} />
  );
};
