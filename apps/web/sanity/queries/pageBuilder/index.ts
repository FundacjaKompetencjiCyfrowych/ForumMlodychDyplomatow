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

export const pageBuilderFragment = q.fragment<PageBuilder[number]>().project((sub) => ({
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

export type PageBuilderData = Array<InferFragmentType<typeof pageBuilderFragment>>;

export type PageBuilderSection<T extends PageBuilderData[number]["_type"] = any> = Extract<
  PageBuilderData[number],
  { _type: T }
>;
export type PageBuilderFragment = InferFragmentType<typeof pageBuilderFragment>;
export type PageBuilderSectionProps<T extends PageBuilderData[number]["_type"] = any> = Extract<
  PageBuilderFragment,
  { _type: T }
>;
