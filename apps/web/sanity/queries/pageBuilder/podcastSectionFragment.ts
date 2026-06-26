import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { linkFragment } from "../linkFragment";

export const podcastSectionFragment = q
  .fragment<PageBuilderSection<"podcastSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    embed: sub.field("embed"),
    link: sub.field("link").project(linkFragment),
  }));
