import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../imgFragment";

export const universalHeroSectionFragment = q
  .fragment<PageBuilderSection<"universalHeroSection">>()
  .project((sub) => ({
    header: sub.field("header"),
    description: sub.field("description"),
    coverImage: sub.field("image").project(imgFragment),
  }));
