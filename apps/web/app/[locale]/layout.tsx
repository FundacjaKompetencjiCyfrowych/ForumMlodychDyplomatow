import { routing } from "@/i18n/routing";
import { q, runQuery } from "@/sanity/groqd";
import { sanityFetch, SanityLive } from "@/sanity/live";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { SanityPreview } from "@/sanity/preview/SanityPreview";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Libre_Baskerville, Inter, Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import Header from "../../components/Header/Header";
import "./globals.css";
import Footer from "../../components/Footer/Footer";
import { intlQuery } from "../../sanity/queries/intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SvgCacheProvider from "react-inlinesvg/provider";
/** This is the base metadata for the entire project, it will cascade down to subpages
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function */

export async function generateMetadata(): Promise<Metadata> {
  const seo = q.star
    .filterByType("settings")
    .slice(0)
    .project((sub) => ({ seo: sub.field("seo") }));
  const { data } = await sanityFetch({
    query: seo.query,
    params: { page: "settings" },
    stega: false, // always set `stega: false` in Next's `generate` functions
  });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_ORIGIN),
    ...mapMetadata(seo.parse(data)),
  };
}

/** Since we are using a dynamic route segment for the [locale] param, we need to
 *  instruct Next.js what params exist so that it may pre-generate pages */
export function generateStaticParams() {
  return routing.locales
    .map((locale) => (locale === "pl" ? undefined : { locale }))
    .filter(Boolean);
}

/** Setup font optimization
 * @see https://nextjs.org/docs/app/getting-started/fonts */

const libreBaskerville = Libre_Baskerville({
  variable: "--font-base-libre-baskerville",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-base-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-base-oswald",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validating locale at root layout ensures it is valid everywhere
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale ?? "pl"); // Enables static rendering, this should be done in every page/layout
  const { data: translations } = await runQuery(intlQuery, {
    parameters: { locale },
  });

  return (
    <html lang={locale}>
      <body
        className={`${libreBaskerville.variable} ${inter.variable} ${oswald.variable} relative bg-white font-inter text-gray-900 antialiased`}
      >
        <NuqsAdapter
          defaultOptions={{
            scroll: false,
            clearOnDefault: true,
            shallow: false,
          }}
        >
          <SvgCacheProvider>
            <NextIntlClientProvider messages={translations as any}>
              <Header />
              <main id="main-content" className="w-full" tabIndex={-1}>
                {children}
              </main>
              <Toaster />
              <SanityPreview />
              <Footer />
            </NextIntlClientProvider>
          </SvgCacheProvider>
        </NuqsAdapter>
      </body>
      <SanityLive />
    </html>
  );
}
