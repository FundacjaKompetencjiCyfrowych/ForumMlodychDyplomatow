import { notFound } from "next/navigation";
import { singlePublicationQuery } from "@/sanity/queries/publications";
import { runQuery } from "../../../../sanity/groqd";
import { PublicationHero } from "@/components/Publications/PublicationHero";
import { PublicationBody } from "@/components/Publications/PublicationBody";

type Params = {
  locale: string;
  slug: string;
};

// Słownik mapujący typy z Sanity na etykiety
const typeLabels: Record<string, string> = {
  article: "Krótkie opracowanie",
  news: "Analiza",
  guide: "Magazyn",
  review: "Publikacja",
};

// Helper do generowania inicjałów
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default async function PublicationDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;

  const publication = await runQuery(singlePublicationQuery, {
    parameters: { locale, slug },
  });

  if (!publication) {
    notFound();
  }
  // 1. Formatowanie kategorii - zabezpieczenie przed null
  const categoryLabel = publication.type
    ? typeLabels[publication.type] || publication.type
    : "Publikacja";

  // 2. Formatowanie daty
  const formattedDate = publication.date
    ? new Date(publication.date).toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : undefined;

  // 3. Formatowanie tagów
  const tagNames = publication.tags?.map((tag: any) => tag.name).filter(Boolean) || [];

  // 4. Formatowanie autora - zabezpieczenie dla null
  const authorData = publication.author?.name
    ? {
        name: publication.author.name,
        initials: getInitials(publication.author.name),
        role: "Ekspert FMD",
      }
    : undefined;

  // 5. Breadcrumbs - zabezpieczenie przed nullem w tytule
  const breadcrumbs = [
    { label: "Strona główna", href: `/${locale}` },
    { label: "Publikacje", href: `/${locale}/publications` },
    { label: publication.title || "Brak tytułu" },
  ];

  return (
    <main className="min-h-screen">
      <PublicationHero
        breadcrumbs={breadcrumbs}
        category={categoryLabel}
        title={publication.title || "Brak tytułu"}
        excerpt={publication.excerpt ?? undefined}
        tags={tagNames}
        author={authorData}
        date={formattedDate}
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
      />
      <PublicationBody content={publication.text || []} author={authorData} date={formattedDate} />
    </main>
  );
}
