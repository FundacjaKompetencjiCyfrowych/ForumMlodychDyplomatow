import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../imgFragment";

export const peopleSectionFragment = q
  .fragment<PageBuilderSection<"peopleSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    people: sub.field("people[]").project((sub) => ({
      _key: sub.field("_key"),
      groupName: sub.field("groupName"),
      members: sub
        .field("members[]")
        .deref()
        .project((sub) => ({
          // TODO perhaps a person card fragment
          _key: "_id",
          name: sub.field("name"),

          img: sub.field("img").project(imgFragment),
        })),
    })),
  }));
