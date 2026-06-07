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
          _key: "_id",
          name: sub.field("name"),
          title: sub.field("title"),
          img: sub.field("img").project(imgFragment),
        })),
    })),
  }));
