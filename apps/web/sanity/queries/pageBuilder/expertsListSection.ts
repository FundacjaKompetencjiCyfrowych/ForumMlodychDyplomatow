import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const expertsListSectionFragment = q
  .fragment<PageBuilderSection<"expertsListSection">>()
  .project((_sub) => ({}));
