import type { Metadata } from "next";
import type { DefaultSeoSettings, SeoFragment } from "../sanity/queries/seo";
import type { Article } from "schema-dts";
type SeoInput = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  published?: string | null;
  author?: string | null;
  seo?: SeoFragment | null;
  slug?: string | null;
  default?: DefaultSeoSettings | null;
};
/**
 * Helper function to create a Metadata object for Next.js pages based on the provided SEO data.
 *
 * All data fields are optional
 *
 * @param page default page data
 * @returns metadata object
 */
export const createSeo = (page: SeoInput | null): Metadata => {
  const title = page?.title ?? page?.default?.seo?.title ?? undefined;
  const description = page?.description ?? page?.default?.seo?.description ?? undefined;
  return {
    title,
    description,
    authors: page?.author ? [{ name: page?.author }] : undefined,
    openGraph: {
      title,
      description,
      images: page?.image
        ? [{ url: page.image }]
        : page?.default?.logo
          ? [{ url: page.default.logo }]
          : undefined,
      siteName: page?.default?.siteName ?? undefined,
      authors: page?.author,
      type: "article",
      url: page?.default?.baseUrl ? `${page.default.baseUrl}/${page.slug}` : undefined,
      publishedTime: page?.published ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: page?.image ? [page.image] : page?.default?.logo ? [page.default.logo] : undefined,
    },
    applicationName: page?.default?.siteName ?? undefined,
  } satisfies Metadata;
};

export const createJsonLdArticle = (page: SeoInput | null): Article & { "@context": string } => {
  const title = page?.title ?? page?.default?.seo?.title ?? undefined;
  const description = page?.description ?? page?.default?.seo?.description ?? undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: page?.image ?? page?.default?.logo ?? undefined,
    datePublished: page?.published ?? undefined,
    author: page?.author ? { "@type": "Person", name: page.author } : undefined,
    publisher: page?.default?.siteName
      ? {
          "@type": "Organization",
          name: page.default.siteName,
          logo: page?.default?.logo
            ? { "@type": "ImageObject", url: page.default.logo }
            : undefined,
        }
      : undefined,
  };
};
