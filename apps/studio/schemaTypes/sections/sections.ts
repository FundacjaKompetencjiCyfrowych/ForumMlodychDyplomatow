import { aboutUsSection } from "./aboutUsSection";
import { contactSection } from "./contactSection";
import { divisionsSection } from "./divisionsSection";
import { eventsListSection } from "./eventsListSection";
import { eventsSection } from "./eventsSection";
import { universalHeroSection } from "./universalHeroSection";
import { expertsListSection } from "./expertsListSection";
import { headingSection } from "./headingSection";
import { heroSection } from "./heroSection";
import { cardsWithLinkSection } from "./cardsWithLinkSection";
import { newPublicationsSection } from "./newPublicationsSection";
import { peopleSection } from "./peopleSection";
import { podcastSection } from "./podcastSection";
import { supportUsSection } from "./supportUsSection";
import { divisionsListSection } from "./divisionsListSection";
import { documentsSection } from "./documentsSection";
import { doubleHeroSection } from "./doubleHeroSection";
import { benefitsSection } from "./benefitsSection";
import { iconCardSection } from "./iconCardSection";
import { patronitePerksSection } from "./patronitePerksSection";

export const sectionTypes = [
  "aboutUsSection",
  "divisionsSection",
  "eventsSection",
  "headingSection",
  "heroSection",
  "cardsWithLinkSection",
  "newPublicationsSection",
  "peopleSection",
  "podcastSection",
  "supportUsSection",
  "contactSection",
  "universalHeroSection",
  "divisionsListSection",
  "expertsListSection",
  "eventsListSection",
  "documentsSection",
  "doubleHeroSection",
  "benefitsSection",
  "iconCardSection",
  "patronitePerksSection",
] as const;

export const sections = sectionTypes.map((type) => ({ type }));

export const sectionStructure = [
  aboutUsSection,
  divisionsSection,
  eventsSection,
  heroSection,
  cardsWithLinkSection,
  newPublicationsSection,
  peopleSection,
  podcastSection,
  supportUsSection,
  contactSection,
  universalHeroSection,
  divisionsListSection,
  headingSection,
  expertsListSection,
  eventsListSection,
  documentsSection,
  doubleHeroSection,
  benefitsSection,
  iconCardSection,
  patronitePerksSection,
];
