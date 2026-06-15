import { aboutUsSection } from "./aboutUsSection";
import { contactSection } from "./contactSection";
import { divisionsSection } from "./divisionsSection";
import { eventsDivisionsSection } from "./eventsDivisionsSection";
import { eventsSection } from "./eventsSection";
import { heroDivisionsSection } from "./heroDivisionsSection";
import { heroSection } from "./heroSection";
import { joinUsDivisionsSection } from "./joinUsDivisionsSection";
import { joinUsSection } from "./joinUsSection";
import { newPublicationsSection } from "./newPublicationsSection";
import { peopleSection } from "./peopleSection";
import { podcastSection } from "./podcastSection";
import { supportUsSection } from "./supportUsSection";
import { teamDivisionsSection } from "./teamDivisionsSection";
import { whatWeDoDivisionsSection } from "./whatWeDoDivisionsSection";

export const sectionTypes = [
  "aboutUsSection",
  "divisionsSection",
  "eventsSection",
  "heroSection",
  "joinUsSection",
  "newPublicationsSection",
  "peopleSection",
  "podcastSection",
  "supportUsSection",
  "contactSection",
  "heroDivisionsSection",
  "teamDivisionsSection",
  "whatWeDoDivisionsSection",
  "joinUsDivisionsSection",
  "eventsDivisionsSection",
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
  heroDivisionsSection,
  teamDivisionsSection,
  whatWeDoDivisionsSection,
  joinUsDivisionsSection,
  eventsDivisionsSection,
];
