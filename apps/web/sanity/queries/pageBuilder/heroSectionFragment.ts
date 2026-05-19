import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../groqd.example";
import { linkFragment } from "../linkFragment";

export const heroSectionFragment = q
  .fragment<PageBuilderSection<"heroSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    backgroundImage: sub.field("backgroundImage").project(imgFragment),
    cta: sub.field("cta").project(linkFragment),
    secondaryCta: sub.field("secondaryCta").project(linkFragment),
  }));
