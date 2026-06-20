import { aboutUsSection } from "./aboutUsSection";
import { divisionsSection } from "./divisionsSection";
import { eventsListSection } from "./eventsListSection";
import { eventsSection } from "./eventsSection";
import { expertsListSection } from "./expertsListSection";
import { headingSection } from "./headingSection";
import { heroSection } from "./heroSection";
import { joinUsSection } from "./joinUsSection";
import { newPublicationsSection } from "./newPublicationsSection";
import { peopleSection } from "./peopleSection";
import { podcastSection } from "./podcastSection";
import { supportUsSection } from "./supportUsSection";

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
  headingSection,
  expertsListSection,
  eventsListSection,
];
