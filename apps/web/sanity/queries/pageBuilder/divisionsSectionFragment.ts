import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";

export const divisionsSectionFragment = q
  .fragment<PageBuilderSection<"divisionsSection">>()
  .project((_sub) => ({
    heading: true,
    subheading: true,
  }));
