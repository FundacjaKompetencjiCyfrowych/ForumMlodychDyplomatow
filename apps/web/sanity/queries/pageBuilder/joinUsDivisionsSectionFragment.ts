import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../imgFragment";
import { linkFragment } from "../linkFragment";

export const joinUsDivisionsSectionFragment = q
  .fragment<PageBuilderSection<"joinUsDivisionsSection">>()
  .project((sub) => ({
    header: sub.field("header"),
    features: sub.field("features[]").project((feat) => ({
      icon: feat.field("icon").project(imgFragment),
      header: feat.field("header"),
      description: feat.field("description"),
    })),
    button: sub.field("button").project(linkFragment),
  }));
