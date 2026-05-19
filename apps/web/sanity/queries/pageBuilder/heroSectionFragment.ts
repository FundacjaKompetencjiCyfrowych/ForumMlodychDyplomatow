import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";
import { imgFragment } from "../groqd.example";
import { linkFragment } from "../linkFragment";

export const heroSectionFragment = q
  .fragment<PageBuilderSection<"heroSection">>()
  .project((sub) => ({
    _type: true,
    _key: true,
    heading: true,
    subheading: true,
    backgroundImage: sub.field("backgroundImage").project(imgFragment),
    cta: sub.field("cta").project(linkFragment),
    secondaryCta: sub.field("secondaryCta").project(linkFragment),
  }));
