import type { InferFragmentType } from "groqd";
import { q } from "../groqd";
import { imgFragment } from "./imgFragment";

export type PublicationsListQueryParams = {
  locale: string;
  limit: number;
};

export type PublicationsSearchQueryParams = {
  locale: string;
  limit: number;
  offset: number;
  searchTerm?: string | null;
  pubType?: string | null;
  authorId?: string | null;
};

export type RelatedPublicationsQueryParams = {
  locale: string;
  currentId: string;
  tagIds: string[];
  pubType: string | null;
  limit: number;
};

export const publicationPreviewFragment = q.fragmentForType<"publication">().project((sub) => ({
  _id: true,
  _type: true,
  title: true,
  type: true,
  date: true,
  excerpt: true,
  slug: sub.field("slug.current").notNull(),
  mainImage: sub.field("mainImage").project(imgFragment),
  author: sub
    .field("author")
    .deref()
    .project({
      name: true,
      img: sub.field("mainImage").project(imgFragment),
    }),
  tags: sub.field("tags[]").deref().project({
    _id: true,
    name: true,
  }),
}));

export type PublicationPreview = InferFragmentType<typeof publicationPreviewFragment>;

export const publicationDetailFragment = q.fragmentForType<"publication">().project((sub) => ({
  _id: true,
  _type: true,
  title: true,
  type: true,
  date: true,
  excerpt: true,
  slug: "slug.current",
  mainImage: sub.field("mainImage").project(imgFragment),
  author: sub.field("author").deref().project({
    name: true,
  }),
  tags: sub.field("tags[]").deref().project({
    _id: true,
    name: true,
  }),
  pdfFile: sub.field("pdfFile").field("asset").deref().project({
    url: true,
  }),
  text: sub.field("text[]"),

  seo: sub.field("seo"),
}));

export type PublicationDetail = InferFragmentType<typeof publicationDetailFragment>;

// ZAPYTANIA
// -----------------------------------------------------------------------------

export const latestPublicationsQuery = q
  .parameters<PublicationsListQueryParams>()
  .star.filterByType("publication")
  .filterRaw(`locale == $locale`)
  .order("date desc")
  .raw("[0...$limit]", "passthrough")
  .project(publicationPreviewFragment);

export const advancedPublicationsQuery = q
  .parameters<PublicationsSearchQueryParams>()
  .star.filterByType("publication")
  .filterRaw(`locale == $locale`)
  .filterRaw(`(!defined($pubType) || type == $pubType)`)
  .filterRaw(`(!defined($authorId) || author._ref == $authorId)`)
  .filterRaw(
    `(!defined($searchTerm) || (title match $searchTerm + "*" || author->name match $searchTerm + "*"))`
  )
  .order("date desc")
  .raw("[$offset...$offset + $limit]", "passthrough")
  .project(publicationPreviewFragment);

export const singlePublicationQuery = q
  .parameters<{ slug: string; locale: string }>()
  .star.filterByType("publication")
  .filterRaw(`locale == $locale && slug.current == $slug`)
  .slice(0)
  .project(publicationDetailFragment);

export const relatedPublicationsQuery = q
  .parameters<RelatedPublicationsQueryParams>()
  .star.filterByType("publication")
  .filterRaw(`locale == $locale && _id != $currentId`)
  .filterRaw(`(count((tags[]._ref)[@ in $tagIds]) > 0 || type == $pubType)`)
  .order("date desc")
  .raw("[0...$limit]", "passthrough")
  .project(publicationPreviewFragment);

export const publicationsStaticParams = q.star.filterByType("publication").project({
  slug: "slug.current",
  locale: "locale",
});
