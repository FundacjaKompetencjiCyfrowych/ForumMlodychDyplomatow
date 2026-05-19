import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";

export const eventsSectionFragment = q
  .fragment<PageBuilderSection<"eventsSection">>()
  .project((_sub) => ({
    _type: true,
    _key: true,
    heading: true,
  }));
