import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const newPublicationsSectionFragment = q
  .fragment<PageBuilderSection<"newPublicationsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
  }));
