import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../imgFragment";

export const heroDivisionsSectionFragment = q
  .fragment<PageBuilderSection<"heroDivisionsSection">>()
  .project((sub) => ({
    header: sub.field("header"),
    description: sub.field("description"),
    coverImage: sub.field("image").project(imgFragment),
  }));
