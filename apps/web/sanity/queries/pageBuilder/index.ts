import type { InferFragmentType } from "groqd";
import { q } from "../../groqd";
import type { PageBuilder } from "../../typegen";
import { aboutUsSectionFragment } from "./aboutUsSectionFragment";
import { divisionsSectionFragment } from "./divisionsSectionFragment";
import { eventsSectionFragment } from "./eventsSectionFragment";
import { heroSectionFragment } from "./heroSectionFragment";
import { joinUsSectionFragment } from "./joinUsSectionFragment";
import { newPublicationsSectionFragment } from "./newPublicationsSectionFragment";
import { peopleSectionFragment } from "./peopleSectionFragment";
import { podcastSectionFragment } from "./podcastSectionFragment";
import { supportUsSectionFragment } from "./supportUsSectionFragment";

export const pageBuilderQueryFragment = q.fragment<PageBuilder[number]>().project((sub) => ({
  _key: sub.field("_key"),
  _type: sub.field("_type"),
  ...sub.conditionalByType(
    {
      aboutUsSection: (s) => s.project(aboutUsSectionFragment),
      divisionsSection: (s) => s.project(divisionsSectionFragment),
      eventsSection: (s) => s.project(eventsSectionFragment),
      heroSection: (s) => s.project(heroSectionFragment),
      joinUsSection: (s) => s.project(joinUsSectionFragment),
      newPublicationsSection: (s) => s.project(newPublicationsSectionFragment),
      peopleSection: (s) => s.project(peopleSectionFragment),
      podcastSection: (s) => s.project(podcastSectionFragment),
      supportUsSection: (s) => s.project(supportUsSectionFragment),
    },
    {
      isExhaustive: true,
    }
  ),
}));

export type PageBuilderSectionType = PageBuilder[number]["_type"];

export type PageBuilderFragment = InferFragmentType<typeof pageBuilderQueryFragment>;

export type PageBuilderSection<T extends PageBuilderSectionType> = Extract<
  PageBuilder[number],
  { _type: T }
>;

export type PageBuilderSectionProps<T extends PageBuilderSectionType> = {
  data: PageBuilderSection<T>;
  index: number;
};
