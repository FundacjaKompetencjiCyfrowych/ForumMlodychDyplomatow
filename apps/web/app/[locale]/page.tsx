import type { Metadata } from "next";
import DefaultPage from "./[slug]/page";
import { runQueryNoStega } from "../../sanity/groqd";
import { pageQuery } from "../../sanity/queries/page";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata(props: Props): Promise<Metadata> {
  const parameters = await props.params;

  const page = await runQueryNoStega(pageQuery, {
    parameters: {
      slug: "home",
      locale: parameters.locale,
    },
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}
export default async function Page(props: Props) {
  return <DefaultPage params={props.params.then((p) => ({ slug: "home", locale: p.locale }))} />;
}
