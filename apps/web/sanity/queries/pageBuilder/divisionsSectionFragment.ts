import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../imgFragment";
import type { Locale } from "next-intl";

export const divisionsSectionFragment = q
  .parameters<{ locale: Locale }>()
  .fragment<PageBuilderSection<"divisionsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    description: sub.field("description"),
    divisions: q.star
      .parameters<{ locale: Locale }>()
      .filterByType("division")
      .filterBy("locale == $locale")
      .project((div) => ({
        _id: div.field("_id"),
        name: div.field("name"),
        slug: div.field("slug.current"),
        coverImage: div.field("coverImage").project(imgFragment),
      }))
      .order("name asc"),
  }));
