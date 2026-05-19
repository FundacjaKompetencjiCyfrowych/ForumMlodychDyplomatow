import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from "@/sanity/sections/sectionComponents/types";
import { imgFragment } from "../groqd.example";
import { linkFragment } from "../linkFragment";

export const joinUsSectionFragment = q
  .fragment<PageBuilderSection<"joinUsSection">>()
  .project((sub) => ({
    _type: true,
    _key: true,
    heading: true,
    subheading: true,
    benefits: sub.field("benefits[]").project((sub) => ({
      _key: true,
      title: true,
      description: true,
      icon: sub.field("icon").project(imgFragment),
      link: sub.field("link").project(linkFragment),
    })),
  }));
