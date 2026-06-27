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
import { universalHeroSectionFragment } from "./universalHeroSectionFragment";
import { whatWeDoDivisionsSectionFragment } from "./whatWeDoDivisionsSectionFragment";
import { joinUsDivisionsSectionFragment } from "./joinUsDivisionsSectionFragment";
import { teamDivisionsSectionFragment } from "./teamDivisionsSectionFragment";
import { eventsDivisionsSectionFragment } from "./eventsDivisionsSectionFragment";
import { divisionsListSectionFragment } from "./divisionsListSectionFragment";
import { headingSectionFragment } from "./headingSection";
import { expertsListSectionFragment } from "./expertsListSection";
import { eventsListSectionFragment } from "./eventsListSection";
import { documentsSectionFragment } from "./documentsSectionFragment";

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
      eventsListSection: sub.project(eventsListSectionFragment),
      podcastSection: sub.project(podcastSectionFragment),
      supportUsSection: sub.project(supportUsSectionFragment),
      universalHeroSection: sub.project(universalHeroSectionFragment),
      whatWeDoDivisionsSection: sub.project(whatWeDoDivisionsSectionFragment),
      joinUsDivisionsSection: sub.project(joinUsDivisionsSectionFragment),
      teamDivisionsSection: sub.project(teamDivisionsSectionFragment),
      eventsDivisionsSection: sub.project(eventsDivisionsSectionFragment),
      divisionsListSection: sub.project(divisionsListSectionFragment),
      headingSection: sub.project(headingSectionFragment),
      expertsListSection: sub.project(expertsListSectionFragment),
      documentsSection: sub.project(documentsSectionFragment),
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
  searchParams: Record<string, string | string[] | undefined>;
};
