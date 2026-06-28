import React, { ComponentType, Suspense } from "react";
import { components } from "./components";
import type {
  PageBuilderFragment,
  PageBuilderFragmentData,
  PageBuilderSectionProps,
  PageBuilderSectionType,
} from "../queries/pageBuilder";
import type { Locale } from "next-intl";
import { Skeleton } from "../../components/ui/skeleton";

function renderSection<T extends PageBuilderSectionType>(
  item: PageBuilderFragmentData<T>,
  index: number,
  locale: Locale,
) {
  const Component = components[item._type] as ComponentType<PageBuilderSectionProps<T>>;
  return (
    <Component
      key={item._key}
      index={index}
      data={item}
      locale={locale}
    />
  );
}

/**
 * Dynamically renders a list of React components based on a data array.
 *
 * For each object in `data`, this function:
 * 1. Looks up a React component in the `components` map using the object's `_type`.
 * 2. Passes the entire object as the `data` prop to the corresponding component.
 * 3. Warns in the console and renders nothing if no matching component is found.
 */
export function render(
  data: PageBuilderFragment[],
  locale: Locale,
) {
  return data.map((item, index) => {
    if (!item) {
      console.warn("Item is undefined or null at index:", index);
      return null;
    }
    if (!components[item._type]) {
      console.warn("No component found for type:", item._type);
      return null;
    }
    return (
      <Suspense key={item._key} fallback={<Skeleton className="h-96 w-full" />}>
        {renderSection(
          item as PageBuilderFragmentData<PageBuilderSectionType>,
          index,
          locale,
        )}
      </Suspense>
    );
  });
}
