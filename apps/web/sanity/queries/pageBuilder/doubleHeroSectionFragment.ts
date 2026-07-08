import type { PageBuilderSection } from ".";
import { q } from "../../groqd";
import { gradientImgFragment } from "../imgFragment";
import { linkFragment } from "../linkFragment";

export const doubleHeroSectionFragment = q
  .fragment<PageBuilderSection<"doubleHeroSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    headingText: sub.field("headingText"),
    subheading: sub.field("subheading"),
    subheadingText: sub.field("subheadingText"),
    caption: sub.field("caption"),
    cta: sub.field("cta").project(linkFragment),
    image: sub.field("image").project(gradientImgFragment),
  }));
