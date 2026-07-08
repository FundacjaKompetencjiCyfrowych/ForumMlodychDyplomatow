import type { PageBuilderSection } from ".";
import { q } from "../../groqd";
import { linkFragment } from "../linkFragment";

export const patronitePerksSectionFragment = q
  .fragment<PageBuilderSection<"patronitePerksSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    caption: sub.field("caption"),
    cta: sub.field("cta").project(linkFragment),
    tiers: sub.field("tiers[]").project((sub) => ({
      _key: sub.field("_key"),
      amount: sub.field("amount"),
      perks: sub.field("perks[]"),
    })),
  }));
