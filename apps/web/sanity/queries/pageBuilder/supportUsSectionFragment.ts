import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { linkFragment } from "../linkFragment";
import { imgFragment } from "../groqd.example";

export const supportUsSectionFragment = q
  .fragment<PageBuilderSection<"supportUsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    cta: sub.field("cta").project(linkFragment),
    image: sub.field("image").project(imgFragment),
  }));
