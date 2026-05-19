import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";
import { imgFragment } from "../groqd.example";

export const peopleSectionFragment = q
  .fragment<PageBuilderSection<"peopleSection">>()
  .project((sub) => ({
    _type: true,
    _key: true,
    heading: true,
    people: sub.field("people[]").project((sub) => ({
      _key: true,
      groupName: true,
      members: sub
        .field("members[]")
        .deref()
        .project((sub) => ({
          // TODO perhaps a person card fragment
          _key: "_id",
          name: true,
          img: sub.field("img").project(imgFragment),
        })),
    })),
  }));
