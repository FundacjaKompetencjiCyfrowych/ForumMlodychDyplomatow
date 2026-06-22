import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const eventsDivisionsSectionFragment = q
  .fragment<PageBuilderSection<"eventsDivisionsSection">>()
  .project((sub) => ({
    header: sub.field("header"),
  }));
