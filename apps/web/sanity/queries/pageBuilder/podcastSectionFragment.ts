import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const podcastSectionFragment = q
  .fragment<PageBuilderSection<"podcastSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
  }));
