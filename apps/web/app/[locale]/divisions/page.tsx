import React from "react";
import { runQuery } from "@/sanity/groqd";
import { divisionPreviewQuery, divisionsPageHeroQuery } from "@/sanity/queries/division";
import type { Locale } from "next-intl";
import Typography from "@/components/ui/typography";

import { DivisionsListSection } from "@/components/sections/DivisionsListSection";
import { DivisionsHero } from "@/components/sections";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function DivisionsPage(props: Props) {
  const { locale } = await props.params;

  try {
    const [pageResponse, divisionsResponse] = await Promise.all([
      runQuery(divisionsPageHeroQuery, { parameters: { locale } }),
      runQuery(divisionPreviewQuery, { parameters: { locale } }),
    ]);

    const pageData = pageResponse.data;
    const divisions = divisionsResponse.data;

    return (
      <main>
        {/* Hero zawsze się wyrenderuje, jeśli mamy dane strony */}
        {pageData && pageData.title && pageData.heroImage && (
          <DivisionsHero
            data={{
              _type: "heroDivisionsSection", // Wymagane przez typ
              _key: "hero-section-key", // Wymagane przez typ
              header: pageData.title,
              description: pageData.description,
              coverImage: pageData.heroImage,
            }}
            index={0}
            locale={locale}
          />
        )}

        {/* Sekcja z listą również renderuje się zawsze */}
        <DivisionsListSection
          title={pageData?.titleDivisions || "Poznaj nasze przedstawicielstwa"}
          description={pageData?.descriptionDivisions || ""}
          divisions={divisions || []}
          locale={locale}
        />
      </main>
    );
  } catch (error) {
    console.error("Error fetching divisions page data:", error);
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <Typography as="h1" variant="h3" className="text-red-600">
          Wystąpił problem z ładowaniem danych.
        </Typography>
      </main>
    );
  }
}
