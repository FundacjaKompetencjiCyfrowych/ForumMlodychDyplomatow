import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { intlArrayQuery, type Locale } from "../intl";

export const expertsListSectionFragment = q
  .parameters<{ locale: Locale }>()
  .fragment<PageBuilderSection<"expertsListSection">>()
  .project((sub) => ({
    groups: sub.star
      .filterByType("personGroups")
      .filterBy(`_id == "personGroups"`)
      .slice(0)
      .project((sub) => ({
        groups: sub.field("groups[]").project((sub) => ({
          _key: true,
          name: intlArrayQuery(sub.field("name[]")),
          slug: sub.field("slug.current"),
          subgroups: sub.field("subgroups[]").project((sub) => ({
            _key: true,
            slug: sub.field("slug.current"),
            name: intlArrayQuery(sub.field("name[]")),
          })),
        })),
      }))
      .field("groups[]"),
  }));
