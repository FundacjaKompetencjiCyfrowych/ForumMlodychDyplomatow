import type { Metadata } from "next";
import DefaultPage from "./[slug]/page";
import { runQuery } from "../../sanity/groqd";
import { pagesMetadataQuery } from "../../sanity/queries/page";
import type { Locale } from "next-intl";
import { routing } from "../../i18n/routing";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export function generateStaticParams() {
  return routing.locales
    .map((locale) => (locale === "pl" ? undefined : { locale }))
    .filter(Boolean);
}
export const revalidate = 3600; // 1 hour
export async function generateMetadata(props: Props): Promise<Metadata> {
  const parameters = await props.params;

  const { data: page } = await runQuery(pagesMetadataQuery, {
    parameters: {
      slug: "home",
      locale: parameters.locale,
    },
    stega: false,
    perspective: "published",
  });

  return {
    title: page?.seo?.title,
    description: page?.seo?.description,
  } satisfies Metadata;
}
export default async function Page(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale ?? "pl");
  return (
    <DefaultPage
      params={props.params.then((p) => ({ slug: "home", locale: p.locale }))}
      searchParams={props.searchParams}
    />
  );
}
