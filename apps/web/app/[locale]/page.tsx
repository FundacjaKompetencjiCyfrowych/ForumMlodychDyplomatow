import type { Metadata } from "next";
import DefaultPage from "./[slug]/page";
import { runQuery } from "../../sanity/groqd";
import { pageQuery } from "../../sanity/queries/page";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata(props: Props): Promise<Metadata> {
  const parameters = await props.params;

  const { data: page } = await runQuery(pageQuery, {
    parameters: {
      slug: "home",
      locale: parameters.locale,
    },
    stega: false,
    perspective: "published",
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}
export default async function Page(props: Props) {
  return <DefaultPage params={props.params.then((p) => ({ slug: "home", locale: p.locale }))} />;
}
