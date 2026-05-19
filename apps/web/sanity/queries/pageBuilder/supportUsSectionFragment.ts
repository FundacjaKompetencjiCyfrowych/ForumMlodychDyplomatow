import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";
import { linkFragment } from "../linkFragment";
import { imgFragment } from "../groqd.example";

export const supportUsSectionFragment = q
  .fragment<PageBuilderSection<"supportUsSection">>()
  .project((sub) => ({
    _type: true,
    _key: true,
    heading: true,
    subheading: true,
    cta: sub.field("cta").project(linkFragment),
    image: sub.field("image").project(imgFragment),
  }));
