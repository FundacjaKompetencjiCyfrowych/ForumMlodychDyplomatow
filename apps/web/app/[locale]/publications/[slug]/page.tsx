import { notFound } from "next/navigation";
import Link from "next/link";
import { singlePublicationQuery } from "@/sanity/queries/publications";
import { runQuery } from "../../../../sanity/groqd"; // Dostosuj ścieżkę do swojego projektu

type Params = {
  locale: string;
  slug: string;
};

export default async function PublicationDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;

  const { data: publication } = await runQuery(singlePublicationQuery, {
    parameters: { locale, slug },
  });

  if (!publication) {
    notFound();
  }

  return (
    <article className="mx-auto flex max-w-4xl flex-col gap-6 p-10">
      <Link
        href={`/${locale}/publications`}
        className="mb-4 inline-block w-fit text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
      >
        &larr; Wróć do listy publikacji
      </Link>

      <header className="border-b pb-6">
        <div className="mb-6 flex items-center gap-3 text-sm text-gray-500">
          <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800">
            {publication.type === "article" && "Krótkie opracowanie"}
            {publication.type === "news" && "Analiza"}
            {publication.type === "guide" && "Magazyn"}
            {publication.type === "review" && "Publikacja"}
            {publication.type &&
              !["article", "news", "guide", "review"].includes(publication.type) &&
              publication.type}
          </span>

          {publication.date && (
            <time dateTime={publication.date}>
              {new Date(publication.date).toLocaleDateString(locale)}
            </time>
          )}
        </div>

        <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
          {publication.title}
        </h1>

        {publication.author?.name && (
          <p className="font-medium text-gray-700">
            Autor: <span className="font-semibold text-gray-900">{publication.author.name}</span>
          </p>
        )}
      </header>

      {/* Zajawka (Excerpt) */}
      {publication.excerpt && (
        <section className="my-2 border-l-4 border-blue-500 pl-4 text-xl leading-relaxed font-medium text-gray-600 italic">
          {publication.excerpt}
        </section>
      )}

      {/* Tagi */}
      {publication.tags && publication.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-gray-500">Tagi:</span>
          {publication.tags.map((tag: any) => (
            // Zabezpieczenie: korzystamy z tag.name (poprawka z poprzednich kroków)
            <span
              key={tag._id}
              className="rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Placeholder na pełną treść (Portable Text) */}
      <section className="mt-12 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center">
        <h3 className="mb-2 text-xl font-semibold text-gray-500">
          Miejsce na treść główną artykułu
        </h3>
        <p className="mx-auto max-w-md text-sm text-gray-400">
          Tutaj w przyszłości zamontujemy komponent z paczki <code>@portabletext/react</code>, który
          zamieni tablicę bloków z Sanity na piękne nagłówki, paragrafy i obrazki.
        </p>
      </section>

      {publication.pdfFile?.url && (
        <div className="mt-10">
          <a
            href={publication.pdfFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-6 py-3 font-medium text-red-700 transition-colors hover:bg-red-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Otwórz dokument PDF
          </a>
        </div>
      )}
    </article>
  );
}
