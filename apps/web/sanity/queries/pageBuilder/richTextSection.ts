import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const richTextSectionFragment = q
  .fragment<PageBuilderSection<"richTextSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    text: sub.field("text[]"),
  }));
