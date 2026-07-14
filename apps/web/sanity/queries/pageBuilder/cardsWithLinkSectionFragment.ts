import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { imgFragment } from "../imgFragment";
import { linkFragment } from "../linkFragment";

export const cardsWithLinkSectionFragment = q
  .fragment<PageBuilderSection<"cardsWithLinkSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    benefits: sub.field("benefits[]").project((sub) => ({
      _key: sub.field("_key"),
      title: sub.field("title"),
      description: sub.field("description"),
      icon: sub.field("icon").project(imgFragment),
      link: sub.field("link").project(linkFragment),
    })),
  }));
