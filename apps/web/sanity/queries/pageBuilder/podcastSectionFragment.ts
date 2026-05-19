import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";

export const podcastSectionFragment = q
  .fragment<PageBuilderSection<"podcastSection">>()
  .project((_sub) => ({
    heading: true,
    subheading: true,
  }));
