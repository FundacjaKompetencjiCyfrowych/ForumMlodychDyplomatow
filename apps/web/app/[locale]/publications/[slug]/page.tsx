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

  const publication = await runQuery(singlePublicationQuery, {
    parameters: { locale, slug },
  });

  if (!publication) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto p-10 flex flex-col gap-6">
      <Link
        href={`/${locale}/publications`}
        className="text-sm text-blue-600 hover:text-blue-800 hover:underline mb-4 inline-block font-medium w-fit"
      >
        &larr; Wróć do listy publikacji
      </Link>

      <header className="border-b pb-6">
        <div className="flex items-center gap-3 mb-6 text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
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

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {publication.title}
        </h1>

        {publication.author?.name && (
          <p className="text-gray-700 font-medium">
            Autor: <span className="font-semibold text-gray-900">{publication.author.name}</span>
          </p>
        )}
      </header>

      {/* Zajawka (Excerpt) */}
      {publication.excerpt && (
        <section className="text-xl text-gray-600 font-medium leading-relaxed italic border-l-4 border-blue-500 pl-4 my-2">
          {publication.excerpt}
        </section>
      )}

      {/* Tagi */}
      {publication.tags && publication.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          <span className="text-sm text-gray-500 font-medium mr-1">Tagi:</span>
          {publication.tags.map((tag: any) => (
            // Zabezpieczenie: korzystamy z tag.name (poprawka z poprzednich kroków)
            <span
              key={tag._id}
              className="text-xs bg-gray-100 border border-gray-200 text-gray-600 px-2 py-1 rounded"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Placeholder na pełną treść (Portable Text) */}
      <section className="mt-12 p-10 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50">
        <h3 className="text-xl text-gray-500 font-semibold mb-2">
          Miejsce na treść główną artykułu
        </h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
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
            className="bg-red-50 text-red-700 border border-red-200 px-6 py-3 rounded-lg hover:bg-red-100 transition-colors inline-flex items-center gap-2 font-medium"
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
