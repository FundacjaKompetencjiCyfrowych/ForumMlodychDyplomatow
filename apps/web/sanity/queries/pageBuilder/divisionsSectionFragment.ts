import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { divisionPreviewFragment } from "../division";

export const divisionsSectionFragment = q
  .fragment<PageBuilderSection<"divisionsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    divisions: sub.field("divisions[]").deref().project(divisionPreviewFragment),
  }));
