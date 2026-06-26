import type { Metadata } from "next";

// import { sanityFetch } from "../../sanity/live";
import { runQuery } from "@/sanity/groqd";
import { pageQuery, pagesMetadataQuery } from "@/sanity/queries/page";
import { SanitySections } from "@/sanity/sections/SanitySections";
import type { Locale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import { tryGettingLocaleSlug } from "../../../lib/links";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Opting into ISR instead of full-static due to searchParams being used on some pages.
// It could be reworked later to make all the search params components be client-side
export const revalidate = 3600; // 1 hour
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
    title: page?.seo?.title ?? page?.defaultSeo?.title ?? page?.name ?? undefined,
    description: page?.seo?.description ?? page?.defaultSeo?.description ?? undefined,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  setRequestLocale(params.locale ?? "pl");
  const { data: page } = await runQuery(pageQuery, {
    parameters: {
      slug: params.slug,
      locale: params.locale,
    },
  });

  if (!page?._id) {
    // See if this page exists under a different slug in the current locale, if so - redirect to it
    // This helps with language change, to stay on the same page.
    const newSlug = await tryGettingLocaleSlug(params.locale, params.slug);
    if (newSlug) {
      return redirect(`/${params.locale}/${newSlug}`);
    }
    // Alternatively, Redirect to 404 page
    return notFound();
  }
  const locale = params.locale;
  const searchParams = await props.searchParams;
  return (
    <div id="main-content" className="">
      <SanitySections value={page?.pageBuilder} locale={locale} searchParams={searchParams} />
    </div>
  );
}
