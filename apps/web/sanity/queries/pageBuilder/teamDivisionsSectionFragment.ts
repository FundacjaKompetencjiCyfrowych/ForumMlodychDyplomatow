// sanity/queries/pageBuilder/teamDivisionsSectionFragment.ts
import { q } from "@/sanity/groqd";
import { PageBuilderSection } from ".";
import { personCardFragment } from "../person";

export const teamDivisionsSectionFragment = q
  .fragment<PageBuilderSection<"teamDivisionsSection">>()
  .project((sub) => ({
    header: sub.field("header"),
    text: sub.field("text"),
    members: sub.field("members[]").deref().project(personCardFragment),
  }));
