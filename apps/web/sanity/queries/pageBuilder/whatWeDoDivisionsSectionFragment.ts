import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";

export const whatWeDoDivisionsSectionFragment = q
  .fragment<PageBuilderSection<"whatWeDoDivisionsSection">>()
  .project((sub) => ({
    title: sub.field("title"),
    whatWeDo: sub.field("whatWeDo[]"),
  }));
