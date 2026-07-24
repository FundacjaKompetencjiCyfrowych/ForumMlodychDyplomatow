import type { InferFragmentType } from "groqd";
import type { Locale } from "next-intl";
import { q } from "../groqd";
import { gradientImgFragment, imgFragment } from "./imgFragment";
import { intlArrayTextQuery } from "./intl";
import { PaginationParameters } from "./pagination";
import { defaultSeoSettingsQuery } from "./seo";

export type PublicationsListQueryParams = {
  locale: string;
  limit: number;
};

export type PublicationsSearchQueryParams = {
  locale: string;
  limit: number;
  type?: string | null;
  offset: number;
  searchTerm?: string | null;
  pubType?: string[] | null;
  authorId?: string | null;
  tags?: string[] | null;
};

export type RelatedPublicationsQueryParams = {
  locale: string;
  currentId: string;
  tagIds: string[];
  pubType: string | null;
  limit: number;
};

export type PublicationCard = InferFragmentType<typeof publicationPreviewFragment>;

export const publicationPreviewFragment = q
  .parameters<{ locale: Locale }>()
  .fragmentForType<"publication">()
  .project((sub) => ({
    _id: true,
    _type: true,
    title: true,
    type: sub
      .field("type")
      .deref()
      .project({
        title: true,
        slug: sub.field("slug.current"), // Pobieramy slug rodzaju
      }),
    date: true,
    excerpt: true,
    slug: sub.field("slug.current"),
    mainImage: sub.field("mainImage").project(imgFragment),
    author: sub
      .field("author")
      .deref()
      .project((sub) => ({
        name: true,
        img: sub.field("img").project(imgFragment),
      })),
    tags: sub.field("tags[]").deref().project({
      _id: true,
      name: true,
      slug: true,
    }),
  }));

export type PublicationPreview = InferFragmentType<typeof publicationPreviewFragment>;

export const publicationDetailFragment = q
  .parameters<{ locale: Locale }>()
  .fragmentForType<"publication">()
  .project((sub) => ({
    _id: true,
    _type: true,
    title: true,
    type: sub
      .field("type")
      .deref()
      .project({
        title: true,
        slug: sub.field("slug.current"), // Pobieramy slug rodzaju
      }),
    date: true,
    excerpt: true,
    slug: "slug.current",
    mainImage: sub.field("mainImage").project(gradientImgFragment),
    author: sub
      .field("author")
      .deref()
      .project((sub) => ({
        name: true,
        img: sub.field("img").project(imgFragment),
        bio: intlArrayTextQuery(sub.field("bio[]")),
      })),
    tags: sub.field("tags[]").deref().project({
      _id: true,
      name: true,
      slug: true,
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

export const countPublicationsQuery = q
  .parameters<Partial<PublicationsSearchQueryParams>>()
  .raw("count(*[_type == 'publication' && locale == $locale])", "passthrough");

export const latestPublicationsQuery = q
  .parameters<PublicationsListQueryParams>()
  .star.filterByType("publication")
  .filterRaw(`locale == $locale`)
  .order("date desc")
  .raw("[0...$limit]", "passthrough")
  .project(publicationPreviewFragment);

export const advancedPublicationsQuery = ({
  page = 1,
  perPage = 9,
  sortOrder = "desc",
}: PaginationParameters & { sortOrder?: "asc" | "desc" }) =>
  q
    .parameters<PublicationsSearchQueryParams>()
    .project((sub) => ({
      items: sub.star
        .filterByType("publication")
        .filterRaw("locale == $locale")
        .filterRaw(
          "(!defined($tags) || length($tags) == 0 || count((tags[]->slug.current)[@ in $tags]) == length($tags))"
        )
        .filterRaw(
          "(!defined($pubType) || length($pubType) == 0 || type->slug.current in $pubType)"
        )
        .filterRaw(
          "(!defined($searchTerm) || $searchTerm == '' || title match $searchTerm + '*' || author->name match $searchTerm + '*')"
        )
        .order(sortOrder === "asc" ? "date asc" : "date desc"),
    }))
    .project((sub) => ({
      total: sub.count("items[]"),
      page: sub.value(page),
      perPage: sub.value(perPage),
      items: sub
        .field("items[]")
        .slice((page - 1) * perPage, (page - 1) * perPage + perPage - 1)
        .project(publicationPreviewFragment),
    }));

export type PublicationFull = InferFragmentType<typeof publicationPreviewFragment>;

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
  .filterRaw(`(count((tags[]._ref)[@ in $tagIds]) > 0 || type->slug.current in $pubType)`)
  .order("date desc")
  .raw("[0...$limit]", "passthrough")
  .project(publicationPreviewFragment);

export const publicationsStaticParams = q.star.filterByType("publication").project({
  slug: "slug.current",
  locale: "locale",
});

export const publicationMetadataQuery = q
  .parameters<{ slug: string; locale: Locale }>()
  .star.filterByType("publication")
  .filterBy("locale == $locale")
  .filterBy("slug.current == $slug")
  .slice(0)
  .project((sub) => ({
    title: sub.coalesce(sub.field("seo.title"), sub.field("title")),
    description: sub.coalesce(sub.field("seo.description"), sub.field("excerpt")),
    image: sub.coalesce(
      sub.field("seo.ogImage.asset").deref().field("url"),
      sub.field("mainImage.asset").deref().field("url")
    ),
    published: sub.field("date"),
    author: sub.field("author").deref().field("name"),
    default: defaultSeoSettingsQuery,
  }));
