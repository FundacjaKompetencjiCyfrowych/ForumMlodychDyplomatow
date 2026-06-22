import type { Locale } from "next-intl";
import { q } from "../groqd";
import type { InferResultItem } from "groqd";
import { imgFragment } from "./imgFragment";
import { seoFragment } from "./seo";
import { pageBuilderQueryFragment } from "./pageBuilder";

export type DivisionQueryParams = {
  slug: string;
  locale: string;
};

export const divisionPreviewFragment = q.fragmentForType<"division">().project((sub) => ({
  _id: sub.field("_id"),
  name: sub.field("name"),
  slug: sub.field("slug.current"),
  coverImage: sub.field("coverImage").project(imgFragment),
}));

export const divisionPreviewQuery = q
  .parameters<{ locale: Locale }>()
  .star.filterByType("division")
  .filterBy("locale == $locale")
  .project(divisionPreviewFragment);

export type DivisionPreview = InferResultItem<typeof divisionPreviewQuery>;

export const singleDivisionFragment = q.fragmentForType<"division">().project((sub) => ({
  _id: sub.field("_id"),
  name: sub.field("name"),
  pageBuilder: sub.field("pageBuilder[]").project(pageBuilderQueryFragment),
  seo: sub.field("seo").project(seoFragment),
}));

export const singleDivisionQuery = q.star
  .parameters<DivisionQueryParams>()
  .filterByType("division")
  .filterRaw("slug.current == $slug")
  .slice(0)
  .project((sub) => ({
    _id: sub.field("_id"),
    name: sub.field("name"),
    coverImage: sub.field("coverImage").project(imgFragment),
    pageBuilder: sub.field("pageBuilder[]").project(pageBuilderQueryFragment),
  }));

export type SingleDivision = InferResultItem<typeof singleDivisionQuery>;

export const divisionsSlugQuery = q.star
  .filterByType("division")
  .filterRaw("defined(slug.current)")
  .project((sub) => ({
    slug: sub.field("slug.current"),
    locale: sub.field("locale"),
  }));
