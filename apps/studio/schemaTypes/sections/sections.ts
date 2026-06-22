import { aboutUsSection } from "./aboutUsSection";
import { contactSection } from "./contactSection";
import { divisionsSection } from "./divisionsSection";
import { eventsListSection } from "./eventsListSection";
import { eventsDivisionsSection } from "./eventsDivisionsSection";
import { eventsSection } from "./eventsSection";
import { universalHeroSection } from "./universalHeroSection";
import { expertsListSection } from "./expertsListSection";
import { headingSection } from "./headingSection";
import { heroSection } from "./heroSection";
import { joinUsDivisionsSection } from "./joinUsDivisionsSection";
import { joinUsSection } from "./joinUsSection";
import { newPublicationsSection } from "./newPublicationsSection";
import { peopleSection } from "./peopleSection";
import { podcastSection } from "./podcastSection";
import { supportUsSection } from "./supportUsSection";
import { teamDivisionsSection } from "./teamDivisionsSection";
import { whatWeDoDivisionsSection } from "./whatWeDoDivisionsSection";
import { divisionsListSection } from "./divisionsListSection";

export const sectionTypes = [
  "aboutUsSection",
  "divisionsSection",
  "eventsSection",
  "headingSection",
  "heroSection",
  "joinUsSection",
  "newPublicationsSection",
  "peopleSection",
  "podcastSection",
  "supportUsSection",
  "contactSection",
  "universalHeroSection",
  "teamDivisionsSection",
  "whatWeDoDivisionsSection",
  "joinUsDivisionsSection",
  "eventsDivisionsSection",
  "divisionsListSection",
  "expertsListSection",
  "eventsListSection",
] as const;

export const sections = sectionTypes.map((type) => ({ type }));

export const sectionStructure = [
  aboutUsSection,
  divisionsSection,
  eventsSection,
  heroSection,
  joinUsSection,
  newPublicationsSection,
  peopleSection,
  podcastSection,
  supportUsSection,
  contactSection,
  universalHeroSection,
  teamDivisionsSection,
  whatWeDoDivisionsSection,
  joinUsDivisionsSection,
  eventsDivisionsSection,
  divisionsListSection,
  headingSection,
  expertsListSection,
  eventsListSection,
];
