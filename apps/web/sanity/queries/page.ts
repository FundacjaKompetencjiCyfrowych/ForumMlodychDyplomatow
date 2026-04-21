import { type InferResultType } from "groqd";
import { q } from "../groqd";
import { pageBuilderFragment } from "./pageBuilder";

export const pageQuery = q
  .parameters<{ slug: string }>()
  .star.filterByType("page")
  .filterBy("slug.current == $slug")
  .slice(0)
  .project((sub) => ({
    _id: sub.field("_id"),
    _type: sub.field("_type"),
    name: sub.field("name"),
    slug: sub.field("slug.current"),
    heading: sub.field("heading"),
    subheading: sub.field("subheading"),
    pageBuilder: sub.field("pageBuilder[]").project(pageBuilderFragment),
  }));

export type PageData = InferResultType<typeof pageQuery>;

export const pagesSlugQuery = q.star
  .filterByType("page")
  .filterRaw("defined(slug.current)")
  .project({
    slug: "slug.current",
  });
