import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const eventsSectionFragment = q
  .fragment<PageBuilderSection<"eventsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
  }));
