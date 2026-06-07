import { notFound } from "next/navigation";
import { singlePublicationQuery, relatedPublicationsQuery } from "@/sanity/queries/publications";
import { runQuery } from "../../../../sanity/groqd";
import { PublicationHero } from "@/components/Publications/PublicationHero";
import { PublicationBody } from "@/components/Publications/PublicationBody";
import { RelatedPublications } from "@/components/Publications/RelatedPublications";
import { PublicationPdf } from "@/components/Publications/PublicationPdf";
import { PublicationAuthor } from "@/components/Publications/PublicationAuthor";
import type { Locale } from "next-intl";
import { getInitials } from "./helpers";

type Params = {
  locale: Locale;
  slug: string;
};

const pageTranslations = {
  pl: {
    home: "Strona główna",
    publications: "Publikacje",
    noTitle: "Brak tytułu",
    defaultCategory: "Publikacja",
    types: {
      article: "Krótkie opracowanie",
      news: "Analiza",
      guide: "Magazyn",
      review: "Publikacja",
    } as Record<string, string>,
  },
  en: {
    home: "Home",
    publications: "Publications",
    noTitle: "No title",
    defaultCategory: "Publication",
    types: {
      article: "Brief",
      news: "Analysis",
      guide: "Magazine",
      review: "Publication",
    } as Record<string, string>,
  },
};

// TODO static params

export default async function PublicationDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;

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
      pubType: publication.type || null,
      limit: 3,
    },
  });

  const t = pageTranslations[locale as keyof typeof pageTranslations] || pageTranslations.pl;

  const categoryLabel = publication.type
    ? t.types[publication.type] || publication.type
    : t.defaultCategory;

  // Formatowanie daty głównego artykułu
  const formattedDate = publication.date
    ? new Date(publication.date).toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : undefined;

  const isoDate = publication.date ?? undefined;

  const tagNames = publication.tags?.map((tag: any) => tag.name).filter(Boolean) || [];

  const authorData = publication.author?.name
    ? {
        name: publication.author.name,
        initials: getInitials(publication.author.name),
        role: "Ekspert FMD",
      }
    : undefined;

  const breadcrumbs = [
    { label: t.home, href: `/${locale}` },
    { label: t.publications, href: `/${locale}/publications` },
    { label: publication.title || t.noTitle },
  ];

  return (
    <main className="min-h-screen">
      <PublicationHero
        breadcrumbs={breadcrumbs}
        category={categoryLabel}
        title={publication.title || t.noTitle}
        excerpt={publication.excerpt ?? undefined}
        tags={tagNames}
        author={authorData}
        date={formattedDate}
        isoDate={isoDate}
        pdfUrl={publication.pdfFile?.url}
        image={
          publication.mainImage?.asset?.url
            ? {
                src: publication.mainImage.asset.url,
                alt: publication.mainImage.asset.altText || publication.title || "Zdjęcie główne",
                caption: publication.mainImage.asset.description ?? undefined,
                blurDataURL: publication.mainImage.asset.metadata?.lqip ?? undefined,
              }
            : null
        }
        locale={locale}
      />
      <PublicationBody content={publication.text || []} locale={locale} />

      <PublicationPdf pdfUrl={publication.pdfFile?.url} locale={locale} />

      <PublicationAuthor author={authorData} date={formattedDate} isoDate={isoDate} />

      <RelatedPublications publications={rawRelatedPublications} locale={locale} />
    </main>
  );
}
