import { runQuery } from "@/sanity/groqd";
import { singleDivisionQuery, divisionsSlugQuery } from "@/sanity/queries/division"; // Upewnij się co do nazwy pliku
import { SanitySections } from "@/sanity/sections/SanitySections";
import type { Locale } from "next-intl";

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>; // Dodaj to
};

export async function generateStaticParams() {
  const { data } = await runQuery(divisionsSlugQuery, { stega: false, perspective: "published" });

  return data.map((division) => ({
    slug: division.slug,
    locale: division.locale,
  }));
}

export default async function DivisionSlugPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams; // Pobierz searchParams
  const { slug, locale } = params;

  const { data: division } = await runQuery(singleDivisionQuery, {
    parameters: {
      slug: slug,
      locale: locale,
    },
  });

  if (!division?._id) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-4xl text-slate-800 sm:text-5xl lg:text-7xl">
          Przedstawicielstwo nie znalezione
        </h1>
      </div>
    );
  }

  // Używamy params.slug zamiast division.slug.current
  const sectionsWithSlug =
    division?.pageBuilder?.map((section) => ({
      ...section,
      currentDivisionSlug: slug,
    })) || [];

  return (
    <main className="min-h-screen">
      <SanitySections
        value={sectionsWithSlug}
        locale={locale}
        searchParams={searchParams} // 3. Przekaż pobrane searchParams tutaj
      />
    </main>
  );
}
