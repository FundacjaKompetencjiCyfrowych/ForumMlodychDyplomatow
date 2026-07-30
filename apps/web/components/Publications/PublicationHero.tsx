import React from "react";
import { Button } from "@/components/ui/button";
import GradientImage from "@/sanity/image/GradientImage";
import { Tag } from "../ui/tag";
import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { Download, Image as ImageIcon, ChevronDown } from "lucide-react";
import type { BreadcrumbsFragment } from "../../sanity/queries/breadcrumbs";
import type { GradientImgFragment } from "../../sanity/queries/imgFragment";
import { Breadcrumbs } from "../ui/breadcrumb";
import { Container } from "../ui/container";
import { ShareButton } from "../ui/share-button";
import { getAuthorDisplayData } from "../../app/[locale]/publications/[slug]/helpers";

// Importujemy elementy z Twojego UI kita
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export interface PublicationHeroProps {
  breadcrumbs: BreadcrumbsFragment[];
  category: string;
  title: string;
  excerpt?: string;
  tags?: {
    name: string;
    slug: string;
  }[];
  authors?: {
    name: string;
    initials: string;
    role?: string;
    imageUrl?: string;
    bio?: string;
  }[];
  date?: string;
  isoDate?: string;
  image?: GradientImgFragment | null;
  pdfUrl?: string | null;
  locale?: Locale;
}

export const PublicationHero = async ({
  breadcrumbs,
  category,
  title,
  excerpt,
  tags = [],
  authors,
  date,
  isoDate,
  image,
  pdfUrl,
  locale = "pl",
}: PublicationHeroProps) => {
  const t = await getTranslations({ locale, namespace: "publications" });

  const authorData = await getAuthorDisplayData(authors, {
    groupName: t("groupName"),
    groupInitials: t("groupInitials"),
  });

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} currentPageName={title} />
      <Container contentWidth="max" className="mx-auto w-full max-w-400 px-4 py-8 md:px-6">
        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Lewa kolumna: Treść */}
          <div className="order-2 flex w-full flex-col gap-6 lg:order-1 lg:col-span-7 xl:col-span-6">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-6 bg-brand-red"></div>
              <Typography as="span" variant="body-s" className="tracking-widest text-brand-red">
                {tags[0]?.name || category}
              </Typography>
            </div>

            <Typography as="h1" variant="h3" className="text-foreground">
              {title}
            </Typography>

            {excerpt && (
              <Typography as="p" variant="body-m" className="text-foreground/80">
                {excerpt}
              </Typography>
            )}

            {/* Tagi */}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {tags.slice(0, 8).map((tag, index, arr) => (
                  <React.Fragment key={index}>
                    <Tag variant="hero" href={tag.slug}>
                      <p>{tag.name}</p>
                    </Tag>
                    {index < arr.length - 1 && <div className="size-0.5 bg-brand-gray-600" />}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Sekcja Autora i Daty */}
            <div className="flex w-fit flex-col justify-between gap-4 py-1 sm:flex-row sm:items-start">
              {authors && authors.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-4">
                    <Avatar className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden">
                      {authorData.displayImageUrl ? (
                        <AvatarImage
                          src={authorData.displayImageUrl}
                          alt={authorData.displayName ?? "Autor"}
                        />
                      ) : (
                        <AvatarFallback className="text-sm font-medium text-slate-500">
                          {authorData.displayInitials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex flex-col">
                      <Typography as="span" variant="body-s" className="text-brand-gray-600">
                        {authorData.displayName}
                      </Typography>

                      {date && (
                        <Typography variant="caption" className="text-brand-gray-600" asChild>
                          <time dateTime={isoDate}>{date}</time>
                        </Typography>
                      )}

                      {authorData.displayRole && (
                        <Typography
                          as="span"
                          variant="body-s"
                          className="mt-0.5 text-muted-foreground"
                        >
                          {authorData.displayRole}
                        </Typography>
                      )}
                    </div>
                  </div>
                  {authorData.isGroup && (
                    <Collapsible className="mt-3 w-full">
                      <CollapsibleTrigger className="group flex cursor-pointer items-center gap-1 text-sm font-semibold text-brand-red transition-colors hover:text-brand-red/80">
                        {t("showAuthors")}
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>

                      <CollapsibleContent className="CollapsibleContent">
                        <ul className="mt-4 flex flex-col gap-4">
                          {authors.map((author, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <Avatar className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden">
                                {author.imageUrl ? (
                                  <AvatarImage src={author.imageUrl} alt={author.name} />
                                ) : (
                                  <AvatarFallback className="text-[0.6rem] font-medium text-slate-700">
                                    {author.initials}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div className="flex flex-col justify-center">
                                <Typography
                                  variant="body-s"
                                  className="leading-tight font-medium text-brand-gray-900"
                                >
                                  {author.name}
                                </Typography>
                                {author.role && (
                                  <Typography variant="caption" className="text-brand-gray-600">
                                    {author.role}
                                  </Typography>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              ) : (
                <div />
              )}
            </div>

            {/* Przyciski Akcji */}
            <div className="mt-2 flex w-full flex-col items-center gap-4 md:flex-row">
              <ShareButton
                title={title}
                label={t("singlePublicationPage.share")}
                copiedLabel="Skopiowano!"
              />

              {pdfUrl && (
                <Button
                  asChild
                  variant="secondary"
                  size="l"
                  className="w-full md:w-fit"
                  iconRight={<Download className="h-4 w-4" />}
                >
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    {t("singlePublicationPage.downloadPdf")}
                  </a>
                </Button>
              )}
            </div>
          </div>{" "}
          {/* KONIEC: Lewa kolumna */}
          {/* Prawa kolumna: Obraz */}
          <div className="order-1 flex w-full flex-col gap-3 lg:order-2 lg:col-span-5 xl:col-span-6">
            <div className="relative flex w-full items-center justify-center overflow-hidden">
              {image ? (
                <GradientImage image={image} desktopSize="xl" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-brand-gray-600/50">
                  <ImageIcon className="h-12 w-12" />
                  <Typography as="span" variant="body-s" className="font-medium">
                    {t("singlePublicationPage.noImage")}
                  </Typography>
                </div>
              )}
            </div>

            {(image?.asset?.altText || image?.asset?.description) && (
              <div className="mt-1 hidden items-start gap-3 border-l-2 border-brand-red px-2 md:flex">
                <Typography variant="body-s" className="leading-snug text-brand-gray-600">
                  {image.asset.altText || image.asset.description}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
