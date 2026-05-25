import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { linkFragment } from "../linkFragment";

export const eventsSectionFragment = q
  .fragment<PageBuilderSection<"eventsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    link: sub.field("link").project(linkFragment),
  }));
