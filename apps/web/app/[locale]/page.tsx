import type { Metadata } from "next";
import DefaultPage from "./[slug]/page";
import { runQuery } from "../../sanity/groqd";
import { pagesMetadataQuery } from "../../sanity/queries/page";
import type { Locale } from "next-intl";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
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
  return (
    <DefaultPage
      params={props.params.then((p) => ({ slug: "home", locale: p.locale }))}
      searchParams={props.searchParams}
    />
  );
}
