import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const divisionsListSectionFragment = q
  .fragment<PageBuilderSection<"divisionsListSection">>()
  .project((sub) => ({
    header: sub.field("header"),
    text: sub.field("text"),
  }));
