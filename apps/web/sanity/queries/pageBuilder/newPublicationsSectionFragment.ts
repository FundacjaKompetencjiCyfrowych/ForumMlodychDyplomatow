import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";

export const newPublicationsSectionFragment = q
  .fragment<PageBuilderSection<"newPublicationsSection">>()
  .project((_sub) => ({
    heading: true,
  }));
