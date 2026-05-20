import type { Metadata } from "next";

// import { sanityFetch } from "../../sanity/live";
import { pageQuery, pagesMetadataQuery, pagesSlugQuery } from "@/sanity/queries/page";
import { SanitySections } from "@/sanity/sections/SanitySections";
import { runQuery } from "@/sanity/groqd";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await runQuery(pagesSlugQuery, { stega: false, perspective: "published" });

  return data.filter((item) => item.slug !== "home");
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const parameters = await props.params;

  const { data: page } = await runQuery(pagesMetadataQuery, {
    parameters,
    stega: false,
    perspective: "published",
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { data: page } = await runQuery(pageQuery, {
    parameters: {
      slug: params.slug,
      locale: params.locale,
    },
  });

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
    <div className="">
      <SanitySections value={page?.pageBuilder} />
    </div>
  );
}
