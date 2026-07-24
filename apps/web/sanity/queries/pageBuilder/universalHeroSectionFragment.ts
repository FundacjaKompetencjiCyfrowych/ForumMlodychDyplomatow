import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { gradientImgFragment } from "../imgFragment";

export const universalHeroSectionFragment = q
  .fragment<PageBuilderSection<"universalHeroSection">>()
  .project((sub) => ({
    header: sub.field("header"),
    description: sub.field("description"),
    caption: sub.field("caption"),
    coverImage: sub.field("image").project(gradientImgFragment),
  }));
