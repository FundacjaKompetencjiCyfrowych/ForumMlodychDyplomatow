import {
  AboutUsSection,
  EventsSection,
  DivisionsSection,
  HeroSection,
  JoinUsSection,
  NewPublicationsSection,
  PeopleSection,
  PodcastSection,
  SupportUsSection,
  HeadingSection,
  ExpertsListSection,
} from "@/components/sections";
import { ComponentType } from "react";
import type { PageBuilderSectionProps, PageBuilderSectionType } from "../queries/pageBuilder";

export type ComponentsRegistry = {
  [K in PageBuilderSectionType]: ComponentType<PageBuilderSectionProps<K>>;
};

/**
 * Example: A `section` registry mapping Sanity `_type` values to React components.
 *
 * Notes:
 * - TypeScript support -> you can infer query return types from GROQD or use typegen output
 * - Components can be inlined (as shown) or imported from separate files for better organization
 * - Remember that async components are server components (won't work on the client)
 * - Missing or null fields should be handled within each component
 */
export const components: ComponentsRegistry = {
  aboutUsSection: AboutUsSection,
  eventsSection: EventsSection,
  divisionsSection: DivisionsSection,
  heroSection: HeroSection,
  joinUsSection: JoinUsSection,
  newPublicationsSection: NewPublicationsSection,
  peopleSection: PeopleSection,
  podcastSection: PodcastSection,
  supportUsSection: SupportUsSection,
  headingSection: HeadingSection,
  expertsListSection: ExpertsListSection,
};
