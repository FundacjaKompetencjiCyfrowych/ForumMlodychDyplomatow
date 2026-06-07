import type { InferFragmentType } from "groqd";
import type { Locale } from "next-intl";
import type { publicationPreviewFragment } from "../../../../sanity/queries/publications";

// Helper do generowania inicjałów
export const getInitials = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};
export const formatPublicationForCard = (
  pub: InferFragmentType<typeof publicationPreviewFragment>,
  locale: Locale,
  t: any
) => ({
  title: pub.title || t.noTitle,
  excerpt: pub.excerpt ?? undefined,
  href: `/${locale}/publications/${pub.slug}`,
  date: pub.date
    ? new Date(pub.date).toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : undefined,
  isoDate: pub.date,
  tags: pub.tags?.map((tag: any) => tag.name).filter(Boolean) || [],
  author: pub.author?.name
    ? {
        name: pub.author.name,
        initials: getInitials(pub.author.name),
      }
    : undefined,
  image: pub.mainImage?.asset?.url
    ? {
        src: pub.mainImage.asset.url,
        alt: pub.mainImage.asset.altText || pub.title || "Zdjęcie powiązanej publikacji",
        blurDataURL: pub.mainImage.asset.metadata?.lqip ?? undefined,
      }
    : null,
});
