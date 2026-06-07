import { q } from "@/sanity/groqd";
import { imgFragment } from "../imgFragment";
import type { PageBuilderSection } from ".";

export const aboutUsSectionFragment = q
  .fragment<PageBuilderSection<"aboutUsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    image: sub.field("image").project(imgFragment),
    content: sub.field("content[]").project((sub) => ({
      _key: sub.field("_key"),
      text: sub.field("text"),
      icon: sub.field("icon").project(imgFragment),
    })),
  }));
