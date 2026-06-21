// sanity/queries/pageBuilder/teamDivisionsSectionFragment.ts
import { q } from "@/sanity/groqd";
import { imgFragment } from "../imgFragment";
import { PageBuilderSection } from ".";

export const teamDivisionsSectionFragment = q
  .fragment<PageBuilderSection<"teamDivisionsSection">>()
  .project((sub) => ({
    header: sub.field("header"),
    text: sub.field("text"),
    members: sub
      .field("members[]")
      .deref()
      .project((person) => ({
        name: person.field("name"),
        title: person.field("title"),
        img: person.field("img").project(imgFragment),
        socials: person.field("socials[]").project((soc) => ({
          platform: soc.field("platform"),
          url: soc.field("url"),
        })),
      })),
  }));
