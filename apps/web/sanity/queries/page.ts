import { type InferResultType } from "groqd";
import { q } from "../groqd";
import { pageBuilderFragment } from "./pageBuilder";
import { seoFragment } from "./seo";
import { LANGAUGE_FIELD } from "../../../studio/config";

export const pageQuery = q
  .parameters<{ slug: string; locale: string }>()
  .star.filterByType("page")
  .filterBy("slug.current == $slug")
  .filterBy(`${LANGAUGE_FIELD} == $locale`)
  .slice(0)
  .project((sub) => ({
    _id: sub.field("_id"),
    _type: sub.field("_type"),
    name: sub.field("name"),
    slug: sub.field("slug.current"),
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    pageBuilder: sub.field("pageBuilder[]").project(pageBuilderFragment),
    seo: sub.field("seo").project(seoFragment),
  }));

export type PageData = InferResultType<typeof pageQuery>;

export const pagesSlugQuery = q.star
  .parameters<{ locale: string }>()
  .filterByType("page")
  .filterRaw("defined(slug.current)")
  .filterBy(`${LANGAUGE_FIELD} == $locale`)
  .project({
    slug: "slug.current",
  });
