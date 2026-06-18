import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../imgFragment";

export const headingSectionFragment = q
  .fragment<PageBuilderSection<"headingSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    image: sub.field("image").project(imgFragment),
  }));
