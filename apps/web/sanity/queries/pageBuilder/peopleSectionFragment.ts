import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { type Locale } from "../intl";
import { personCardFragment } from "../person";

export const peopleSectionFragment = q
  .parameters<{ locale: Locale }>()
  .fragment<PageBuilderSection<"peopleSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    people: sub.field("people[]").project((sub) => ({
      _key: sub.field("_key"),
      groupName: sub.field("groupName"),
      members: sub.field("members[]").deref().project(personCardFragment),
    })),
  }));
