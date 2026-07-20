import { notFound } from "next/navigation";
import {
  singlePublicationQuery,
  relatedPublicationsQuery,
  publicationsStaticParams,
} from "@/sanity/queries/publications";
import { runQuery } from "../../../../sanity/groqd";
import { PublicationHero } from "@/components/Publications/PublicationHero";
import { PublicationBody } from "@/components/Publications/PublicationBody";
import { RelatedPublications } from "@/components/Publications/RelatedPublications";
import { PublicationPdf } from "@/components/Publications/PublicationPdf";
import { PublicationAuthor } from "@/components/Publications/PublicationAuthor";
import type { Locale } from "next-intl";
import { getInitials } from "./helpers";
import { setRequestLocale } from "next-intl/server";

type Params = {
  locale: Locale;
  slug: string;
};

export const revalidate = 3600; // 1 hour

export const generateStaticParams = async () => {
  const { data } = await runQuery(publicationsStaticParams, {
    stega: false,
    perspective: "published",
  });
  return data;
};
export default async function PublicationDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale ?? "pl");
  const { data: publication } = await runQuery(singlePublicationQuery, {
    parameters: { locale, slug },
  });

  if (!publication) {
    notFound();
  }

  const currentTagIds = publication.tags?.map((tag: any) => tag._id).filter(Boolean) || [];

  const { data: rawRelatedPublications } = await runQuery(relatedPublicationsQuery, {
    parameters: {
      locale,
      currentId: publication._id,
      tagIds: currentTagIds,
      pubType: publication.type?.title || null,
      limit: 3,
    },
  });

  // Formatowanie daty głównego artykułu
  const formattedDate = publication.date
    ? new Date(publication.date).toLocaleDateString(locale, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : undefined;

  const isoDate = publication.date ?? undefined;

  const tags =
    publication.tags
      ?.map((tag: any) => ({
        name: tag?.name,
        slug: tag?.slug.current,
      }))
      .filter((tag): tag is { name: string; slug: string } => Boolean(tag?.name && tag?.slug)) ||
    [];

  const authorData = publication.author?.name
    ? {
        name: publication.author.name,
        initials: getInitials(publication.author.name),
        role: "Ekspert FMD",
        imageUrl: publication.author?.img?.asset?.url ?? undefined,
        bio: publication.author.bio ?? "",
      }
    : undefined;

  return (
    <div className="min-h-screen">
      <PublicationHero
        category={publication.type?.title ?? ""}
        title={publication.title ?? ""}
        excerpt={publication.excerpt ?? undefined}
        tags={tags}
        author={authorData}
        date={formattedDate}
        isoDate={isoDate}
        pdfUrl={publication.pdfFile?.url}
        image={publication.mainImage}
        locale={locale}
      />
      <PublicationBody content={publication.text || []} locale={locale} />

      <PublicationPdf pdfUrl={publication.pdfFile?.url} />

      <PublicationAuthor author={authorData} date={formattedDate} isoDate={isoDate} tags={tags} />

      <RelatedPublications publications={rawRelatedPublications} locale={locale} />
    </div>
  );
}
