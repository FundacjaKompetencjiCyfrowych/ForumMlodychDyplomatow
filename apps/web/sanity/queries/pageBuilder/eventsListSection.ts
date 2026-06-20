import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { type Locale } from "../intl";

export const eventsListSectionFragment = q
  .parameters<{ locale: Locale }>()
  .fragment<PageBuilderSection<"eventsListSection">>()
  .project((sub) => ({
    divisions: sub.star
      .filterByType("division")
      .filterBy("locale == $locale")
      .project((sub) => ({
        _id: sub.field("_id"),
        name: sub.field("name"),
        slug: sub.field("slug.current"),
      })),
  }));
