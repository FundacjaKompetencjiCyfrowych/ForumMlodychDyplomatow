import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";
import { imgFragment } from "../groqd.example";

export const aboutUsSectionFragment = q
  .fragment<PageBuilderSection<"aboutUsSection">>()
  .project((sub) => ({
    heading: true,
    image: sub.field("image").project(imgFragment).notNull(),
    content: sub.field("content[]").project((sub) => ({
      _key: true,
      text: true,
      icon: sub.field("icon").project(imgFragment),
    })),
  }));
