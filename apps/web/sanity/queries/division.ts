import type { Locale } from "next-intl";
import { q } from "../groqd";
import type { InferResultItem } from "groqd";
import { imgFragment } from "./imgFragment";

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
