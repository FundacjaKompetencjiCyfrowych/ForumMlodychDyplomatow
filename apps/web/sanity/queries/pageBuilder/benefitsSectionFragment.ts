import type { PageBuilderSection } from ".";
import { q } from "../../groqd";
import { imgFragment } from "../imgFragment";
import { linkFragment } from "../linkFragment";

export const benefitsSectionFragment = q
  .fragment<PageBuilderSection<"benefitsSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    benefits: sub.field("benefits[]").project((sub) => ({
      _key: sub.field("_key"),
      title: sub.field("title"),
      image: sub.field("image").project(imgFragment),
    })),
    cta: sub.field("cta").project(linkFragment),
  }));
