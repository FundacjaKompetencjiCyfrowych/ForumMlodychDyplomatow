import { render } from "@/sanity/sections/render";
import type { Locale } from "next-intl";
import { Suspense } from "react";
import { Skeleton } from "../../components/ui/skeleton";

/**
 * Dynamically renders an array of Sanity content blocks using a component registry.
 *
 * This component takes a `value` array of Sanity documents and, for each item:
 * 1. Looks up the corresponding React component from a `components` map based on `_type`.
 * 2. Passes the entire data object as the `item` prop to the matched component.
 * 3. Renders the component, or nothing if no match is found.
 *
 * Notes:
 * - This pattern is useful for building flexible pages or section builders.
 * - In most cases you can render components directly without using this dynamic approach.
 * - Consider code-splitting your component registry if the map grows large.
 * - The `value` prop can be `undefined` or `null`, in which case nothing is rendered.
 * - Feel free to modify or create variants of this logic for your specific use case.
 * */
export function SanitySections({
  value = [],
  locale,
  searchParams,
}: {
  value: Array<any> | null | undefined;
  locale: Locale;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  if (!Array.isArray(value)) return null;
  return render(value, locale, searchParams);
}
