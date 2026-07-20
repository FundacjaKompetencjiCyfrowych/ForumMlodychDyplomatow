import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { type Locale } from "../intl";
import { personCardFragment } from "../person";
import { linkFragment } from "../linkFragment";

export const peopleSectionFragment = q
  .parameters<{ locale: Locale }>()
  .fragment<PageBuilderSection<"peopleSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    link: sub.field("link").project(linkFragment),

    people: sub.field("people[]").project((sub) => ({
      _key: sub.field("_key"),
      groupName: sub.field("groupName"),
      members: sub.field("members[]").project((sub) => ({
        _key: sub.field("_key"),
        person: sub.field("@").deref().project(personCardFragment),
      })),
    })),
  }));
