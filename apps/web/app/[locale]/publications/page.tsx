import Link from "next/link";
import { advancedPublicationsQuery } from "@/sanity/queries/publications";
import { runQuery } from "../../../sanity/groqd";

type Params = {
  locale: string;
};

type SearchParams = {
  q?: string;
  type?: string;
  author?: string;
};

export default async function PublicationsPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const sParams = await searchParams;

  const parameters = {
    locale: locale,
    limit: 10,
    offset: 0,
    searchTerm: sParams.q || null,
    pubType: sParams.type || null,
    authorId: sParams.author || null,
  };

  const publications = await runQuery(advancedPublicationsQuery, { parameters });

  return (
    <div className="flex flex-col gap-8 p-10 max-w-7xl mx-auto">
      <header>
        <h2 className="text-4xl font-bold mb-2">Publikacje ({locale.toUpperCase()})</h2>
        <p className="text-gray-500">Znaleziono: {publications.length}</p>
      </header>

      <form
        method="GET"
        className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-lg border"
      >
        <input
          type="text"
          name="q"
          defaultValue={sParams.q || ""}
          placeholder="Szukaj publikacji lub autora..."
          className="border border-gray-300 p-2 rounded-md w-full md:w-64"
        />

        <select
          name="type"
          defaultValue={sParams.type || ""}
          className="border border-gray-300 p-2 rounded-md bg-white"
        >
          <option value="">Wszystkie rodzaje</option>
          <option value="article">Krótkie opracowanie</option>
          <option value="news">Analiza</option>
          <option value="guide">Magazyn</option>
          <option value="review">Publikacja</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Filtruj
        </button>

        {(sParams.q || sParams.type) && (
          <Link
            href={`/${locale}/publications`}
            className="text-sm text-gray-500 hover:text-gray-800 underline underline-offset-4"
          >
            Wyczyść filtry
          </Link>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map((pub) => (
          <Link
            href={`/${locale}/publications/${pub.slug}`}
            key={pub._id}
            className="group flex flex-col border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-3">
                {pub.type === "article" && "Krótkie opracowanie"}
                {pub.type === "news" && "Analiza"}
                {pub.type === "guide" && "Magazyn"}
                {pub.type === "review" && "Publikacja"}
                {pub.type && !["article", "news", "guide", "review"].includes(pub.type) && pub.type}
              </span>
              <h3 className="font-semibold text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                {pub.title}
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3 grow">{pub.excerpt}</p>

            <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t">
              <span className="font-medium">{pub.author?.name || "Nieznany autor"}</span>

              {pub.date && (
                <time dateTime={pub.date}>{new Date(pub.date).toLocaleDateString(locale)}</time>
              )}
            </div>
          </Link>
        ))}
      </div>

      {publications.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500 text-lg">Brak publikacji spełniających podane kryteria.</p>
          <Link
            href={`/${locale}/publications`}
            className="text-blue-600 mt-2 inline-block hover:underline"
          >
            Wróć do wszystkich publikacji
          </Link>
        </div>
      )}
    </div>
  );
}
