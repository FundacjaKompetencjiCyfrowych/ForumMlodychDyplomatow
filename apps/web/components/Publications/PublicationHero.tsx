import React from "react";
import { Share2, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import GradientImage from "@/sanity/image/GradientImage";
import { ImgFragment } from "@/sanity/queries/imgFragment";
import { Tag } from "../ui/tag";
import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";

export interface PublicationHeroProps {
  category: string;
  title: string;
  excerpt?: string;
  tags?: {
    name: string;
    slug: string;
  }[];
  author?: {
    name: string;
    initials: string;
    role?: string;
    imageUrl?: string;
    bio: string;
  };
  date?: string;
  isoDate?: string;
  image?: ImgFragment | null;
  pdfUrl?: string | null;
  locale?: Locale;
}

export const PublicationHero = async ({
  category,
  title,
  excerpt,
  tags = [],
  author,
  date,
  isoDate,
  image,
  pdfUrl,
  locale = "pl",
}: PublicationHeroProps) => {
  const t = await getTranslations({ locale, namespace: "publications" });

  return (
    <section className="mx-auto w-full max-w-(--width-content-max) px-5 py-10 md:px-6">
      <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-12 lg:gap-16">
        {/* Lewa kolumna: Treść */}
        <div className="order-2 flex w-full flex-col gap-6 lg:order-1 lg:col-span-7 xl:col-span-6">
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-6 bg-brand-red"></div>
            <Typography as="span" variant="body-s" className="tracking-widest text-brand-red">
              {tags[0].name || category}
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
              {tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <Tag variant="hero" href={tag.slug}>
                    <p>{tag.name}</p>
                  </Tag>
                  {index < tags.length - 1 && <div className="size-0.5 bg-brand-gray-600" />}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Sekcja Autora i Daty */}
          <div className="flex w-fit flex-col justify-between gap-4 py-1 sm:flex-row sm:items-center">
            {author ? (
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 bg-slate-100">
                  {author.imageUrl && <AvatarImage src={author.imageUrl} alt={author.name} />}
                  <AvatarFallback className="text-sm font-medium text-slate-500">
                    {author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Typography as="span" variant="body-s" className="text-brand-gray-600">
                    {author.name}
                  </Typography>
                  {date && (
                    <Typography variant="caption" className="text-brand-gray-600" asChild>
                      <time dateTime={isoDate}>{date}</time>
                    </Typography>
                  )}
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>

          {/* Przyciski Akcji */}
          <div className="mt-2 flex w-full flex-col items-center gap-4 md:flex-row">
            <Button
              variant="primary"
              size="l"
              className="w-full md:w-fit"
              iconLeft={<Share2 className="h-4 w-4" />}
            >
              {t("singlePublicationPage.share")}
            </Button>

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
        </div>

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

          {/* Teraz caption bierzemy z obiektu Sanity */}
          {(image?.asset?.altText || image?.asset?.description) && (
            <div className="mt-1 hidden items-start gap-3 border-l-2 border-brand-red px-2 md:flex">
              <Typography variant="body-s" className="leading-snug text-brand-gray-600">
                {image.asset.altText || image.asset.description}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
