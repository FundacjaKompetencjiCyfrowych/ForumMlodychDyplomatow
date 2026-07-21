import type { PageBuilderSection } from ".";
import { q } from "../../groqd";
import { imgFragment } from "../imgFragment";

export const iconCardSectionFragment = q
  .fragment<PageBuilderSection<"iconCardSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    items: sub.field("items[]").project((sub) => ({
      _key: sub.field("_key"),
      title: sub.field("title"),
      subtitle: sub.field("subtitle"),
      icon: sub.field("icon").project(imgFragment),
    })),
  }));
