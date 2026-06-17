import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../imgFragment";
import { intlArrayQuery, type Locale } from "../intl";

const personFragment = q
  .parameters<{ locale: Locale }>()
  .fragmentForType<"person">()
  .project((sub) => ({
    _key: "_id",
    name: sub.field("name"),
    title: intlArrayQuery(sub.field("title[]")),
    img: sub.field("img").project(imgFragment),
  }));

export const peopleSectionFragment = q
  .parameters<{ locale: Locale }>()
  .fragment<PageBuilderSection<"peopleSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    people: sub.field("people[]").project((sub) => ({
      _key: sub.field("_key"),
      groupName: sub.field("groupName"),
      members: sub.field("members[]").deref().project(personFragment),
    })),
  }));
