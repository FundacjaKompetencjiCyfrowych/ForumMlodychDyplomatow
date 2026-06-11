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
import type { Locale } from "next-intl";
import { contactSectionFragment } from "./contactSectionFragment";

export const pageBuilderQueryFragment = q.fragment<PageBuilder[number]>().project((sub) => ({
  _key: sub.field("_key"),
  _type: sub.field("_type"),
  ...sub.conditionalByType(
    {
      aboutUsSection: sub.project(aboutUsSectionFragment),
      divisionsSection: sub.project(divisionsSectionFragment),
      contactSection: sub.project(contactSectionFragment),
      eventsSection: sub.project(eventsSectionFragment),
      heroSection: sub.project(heroSectionFragment),
      joinUsSection: sub.project(joinUsSectionFragment),
      newPublicationsSection: sub.project(newPublicationsSectionFragment),
      peopleSection: sub.project(peopleSectionFragment),
      podcastSection: sub.project(podcastSectionFragment),
      supportUsSection: sub.project(supportUsSectionFragment),
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
export type PageBuilderFragmentData<T extends PageBuilderSectionType> = Extract<
  PageBuilderFragment,
  { _type: T }
>;

export type PageBuilderSectionProps<T extends PageBuilderSectionType> = {
  data: PageBuilderFragmentData<T>;
  index: number;
  locale: Locale;
};
