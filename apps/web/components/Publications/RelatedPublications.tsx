import React from "react";
import { Typography } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";
import { PublicationCard, type PublicationCardProps } from "./PublicationCard";

export interface RelatedPublicationsProps {
  publications: Omit<PublicationCardProps, "layout" | "className">[];
  locale?: string;
}

// Słownik tłumaczeń
const translations = {
  pl: {
    title: "Sprawdź podobne publikacje",
    viewAll: "Wszystkie publikacje",
    baseHref: "/publications",
  },
  en: {
    title: "Related publications",
    viewAll: "All publications",
    baseHref: "/publications",
  },
};

export const RelatedPublications = ({ publications, locale = "pl" }: RelatedPublicationsProps) => {
  if (!publications || publications.length === 0) {
    return null;
  }

  const t = translations[locale as keyof typeof translations] || translations.pl;

  return (
    <section className="mx-auto w-full bg-background-50 px-6 pt-10 pb-16 md:px-6">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <Typography as="h2" variant="h3" className="text-foreground">
          {t.title}
        </Typography>

        <Link
          href={`/${locale}${t.baseHref}`}
          variant="link"
          className="h-auto border-none p-0! text-brand-blue no-underline transition-colors hover:border-transparent hover:text-brand-400 active:border-transparent"
          iconRight={<span className="text-lg leading-none">›</span>}
        >
          <Typography as="span" variant="p2" className="font-medium">
            {t.viewAll}
          </Typography>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {publications.slice(0, 3).map((pub, index) => (
          <PublicationCard
            key={index}
            href={pub.href}
            title={pub.title}
            excerpt={pub.excerpt}
            tags={pub.tags}
            author={pub.author}
            date={pub.date}
            image={pub.image}
            layout="vertical"
            className="h-full"
          />
        ))}
      </div>
    </section>
  );
};
