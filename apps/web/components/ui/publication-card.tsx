import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { PublicationCard as PublicationCardType } from "../../sanity/queries/publications";
import { Link } from "./link";
import { SanityImage } from "../../sanity/image/SanityImage";
import { Tag } from "./tag";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import type { ComponentProps } from "react";
import { getAuthorDisplayData } from "../../app/[locale]/publications/[slug]/helpers";
import { getLocale, getTranslations } from "next-intl/server";

export interface PublicationCardProps {
  publication: PublicationCardType;
  layout?: "vertical" | "horizontal";
  className?: string;
}

type SanityImageExpectedProp = ComponentProps<typeof SanityImage>["image"];

export const PublicationCard = async ({
  publication,
  layout = "vertical",
  className,
}: PublicationCardProps) => {
  const { title, excerpt, authors, date, tags = [], mainImage: image, slug } = publication;
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "publications" });
  const formattedDate = new Date(date ?? "").toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const authorData = await getAuthorDisplayData(authors, {
    groupName: t("groupName"),
    groupInitials: t("groupInitials"),
  });

  return (
    <Link
      link={{
        linkType: "publication",
        href: slug,
        _key: `publication-${slug}`,
        openInNewTab: false,
        text: null,
      }}
      variant="none"
      size="inline"
      data-orientation={layout}
      className={cn(
        "group flex w-full overflow-hidden rounded-md border border-border/60 bg-white transition-all",
        "h-full flex-col", // h-full wymusza wysokość karty
        "desktop:data-[orientation=horizontal]:h-110 desktop:data-[orientation=horizontal]:flex-row desktop:data-[orientation=horizontal]:items-start",
        className
      )}
    >
      {/* 1. Sekcja Obrazka - sztywne 4:3 */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-slate-100",
          "aspect-4/3 w-full",
          "desktop:group-data-[orientation=horizontal]:aspect-auto desktop:group-data-[orientation=horizontal]:h-full desktop:group-data-[orientation=horizontal]:w-1/2"
        )}
      >
        {image ? (
          <SanityImage
            sizes={{ default: "100vw", desktop: layout === "horizontal" ? "50vw" : "33vw" }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            image={image}
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-brand-blue via-brand-gray-800 to-brand-red" />
        )}
      </div>

      {/* 2. Sekcja Treści*/}
      <div className="flex w-full grow flex-col p-4 desktop:group-data-[orientation=horizontal]:p-10">
        <div className="flex grow flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* limit zeby nie psulo designu, wszystkie tagi wyswietlaja sie na utorem artykulu */}
            {tags?.slice(0, 8).map((tag) => (
              <Tag key={tag.slug?.current}>{tag.name}</Tag>
            ))}
          </div>

          <Typography
            as="h3"
            variant={layout !== "horizontal" ? "title-s" : "title-l"}
            className="text-wrap text-brand-gray-900 transition-colors group-hover:text-brand-red"
          >
            {title}
          </Typography>

          {excerpt && (
            <Typography
              as="p"
              variant={layout !== "horizontal" ? "body-s" : "body-m"}
              className="mb-4 line-clamp-3 text-wrap text-brand-gray-700"
            >
              {excerpt}
            </Typography>
          )}
        </div>

        <div className="mt-auto">
          <span className="flex items-center text-sm font-semibold text-brand-red">
            {t("cardButton")}
            <ChevronRight className="ml-1 h-4 w-4" />
          </span>
        </div>

        {/* Stopka z autorem */}
        <div className="mt-6 flex w-full flex-col border-t border-slate-100 pt-5">
          <div className="flex items-center gap-3">
            {authors && authors.length > 0 && (
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200/60">
                {authorData.displaySanityImage ? (
                  <SanityImage
                    image={authorData.displaySanityImage as SanityImageExpectedProp}
                    alt={authorData.displayName ?? ""}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : authorData.displayImageUrl ? (
                  <Image
                    src={authorData.displayImageUrl}
                    alt={authorData.displayName ?? "FMD"}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-[0.65rem] font-semibold text-slate-700">
                    {authorData.displayInitials}
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-col">
              {authors && authors.length > 0 && (
                <Typography as="span" variant="caption" className="font-semibold text-foreground">
                  {authorData.displayName}
                </Typography>
              )}
              {date && (
                <Typography variant="caption" className="text-muted-foreground">
                  {formattedDate}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
