import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../imgFragment";

export const divisionsSectionFragment = q
  .fragment<PageBuilderSection<"divisionsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    divisions: sub
      .field("divisions[]")
      .deref()
      .project((div) => ({
        _id: div.field("_id"),
        name: div.field("name"),
        slug: div.field("slug.current"),
        coverImage: div.field("coverImage").project(imgFragment),
      })),
  }));
