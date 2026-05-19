import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const divisionsSectionFragment = q
  .fragment<PageBuilderSection<"divisionsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
  }));
