import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";

export const eventsSectionFragment = q
  .fragment<PageBuilderSection<"eventsSection">>()
  .project((_sub) => ({
    heading: true,
  }));
