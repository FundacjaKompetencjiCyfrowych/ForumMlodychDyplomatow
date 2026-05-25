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

  const { data: publications } = await runQuery(advancedPublicationsQuery, { parameters });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-10">
      <header>
        <h2 className="mb-2 text-4xl font-bold">Publikacje ({locale.toUpperCase()})</h2>
        <p className="text-gray-500">Znaleziono: {publications.length}</p>
      </header>

      <form
        method="GET"
        className="flex flex-wrap items-center gap-4 rounded-lg border bg-gray-50 p-4"
      >
        <input
          type="text"
          name="q"
          defaultValue={sParams.q || ""}
          placeholder="Szukaj publikacji lub autora..."
          className="w-full rounded-md border border-gray-300 p-2 md:w-64"
        />

        <select
          name="type"
          defaultValue={sParams.type || ""}
          className="rounded-md border border-gray-300 bg-white p-2"
        >
          <option value="">Wszystkie rodzaje</option>
          <option value="article">Krótkie opracowanie</option>
          <option value="news">Analiza</option>
          <option value="guide">Magazyn</option>
          <option value="review">Publikacja</option>
        </select>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Filtruj
        </button>

        {(sParams.q || sParams.type) && (
          <Link
            href={`/${locale}/publications`}
            className="text-sm text-gray-500 underline underline-offset-4 hover:text-gray-800"
          >
            Wyczyść filtry
          </Link>
        )}
      </form>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publications.map((pub) => (
          <Link
            href={`/${locale}/publications/${pub.slug}`}
            key={pub._id}
            className="group flex flex-col rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4">
              <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                {pub.type === "article" && "Krótkie opracowanie"}
                {pub.type === "news" && "Analiza"}
                {pub.type === "guide" && "Magazyn"}
                {pub.type === "review" && "Publikacja"}
                {pub.type && !["article", "news", "guide", "review"].includes(pub.type) && pub.type}
              </span>
              <h3 className="line-clamp-2 text-xl font-semibold transition-colors group-hover:text-blue-600">
                {pub.title}
              </h3>
            </div>

            <p className="mb-4 line-clamp-3 grow text-sm text-gray-600">{pub.excerpt}</p>

            <div className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-gray-500">
              <span className="font-medium">{pub.author?.name || "Nieznany autor"}</span>

              {pub.date && (
                <time dateTime={pub.date}>{new Date(pub.date).toLocaleDateString(locale)}</time>
              )}
            </div>
          </Link>
        ))}
      </div>

      {publications.length === 0 && (
        <div className="rounded-lg border border-dashed bg-gray-50 py-20 text-center">
          <p className="text-lg text-gray-500">Brak publikacji spełniających podane kryteria.</p>
          <Link
            href={`/${locale}/publications`}
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            Wróć do wszystkich publikacji
          </Link>
        </div>
      )}
    </div>
  );
}
