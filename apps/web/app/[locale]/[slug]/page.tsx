import type { Metadata } from "next";
import Head from "next/head";

// import { sanityFetch } from "../../sanity/live";
import { pageQuery, pagesSlugQuery } from "@/sanity/queries/page";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { sanityFetch } from "@/sanity/live";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugQuery.query,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: pageQuery.query,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([sanityFetch({ query: pageQuery.query, params })]);
  if (!page?._id) {
    // Alternatively, Redirect to 404 page
    return (
      <div className="py-40">
        <div className="container">
          <h1 className="text-4xl text-gray-200 sm:text-5xl lg:text-7xl">Strona nie znaleziona</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12 lg:my-24">
      <Head>
        <title className="text-grey-200">{page.heading}</title>
      </Head>
      <div className="">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-3xl">
              <h1 className="text-4xl text-gray-200 sm:text-5xl lg:text-7xl">{page.heading}</h1>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {page.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
      <SanitySections value={page?.pageBuilder} />
    </div>
  );
}
