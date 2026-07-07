import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const heroPublicationsSectionFragment = q
  .fragment<PageBuilderSection<"heroPublicationsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    publicationCounter: sub.field("publicationCounter"),
    badges: sub.field("badges[]"),
  }));
