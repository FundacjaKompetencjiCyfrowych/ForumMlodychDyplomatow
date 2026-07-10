import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { Download, Image as ImageIcon, Share2 } from "lucide-react";
import React from "react";
import GradientImage from "../../sanity/image/GradientImage";
import type { BreadcrumbsFragment } from "../../sanity/queries/breadcrumbs";
import type { GradientImgFragment } from "../../sanity/queries/imgFragment";
import { Breadcrumbs } from "../ui/breadcrumb";
import { Container } from "../ui/container";

export interface PublicationHeroProps {
  breadcrumbs: BreadcrumbsFragment[];
  category: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  author?: {
    name: string;
    initials: string;
    role?: string;
    imageUrl?: string;
  };
  date?: string;
  isoDate?: string;
  image?: GradientImgFragment | null;
  pdfUrl?: string | null;
  locale?: string; // Dodana właściwość języka
}

// Słownik tłumaczeń
const translations = {
  pl: {
    share: "Udostępnij",
    downloadPdf: "Pobierz PDF",
    noImage: "Brak zdjęcia głównego",
  },
  en: {
    share: "Share",
    downloadPdf: "Download PDF",
    noImage: "No main image",
  },
};

export const PublicationHero = ({
  breadcrumbs,
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
  // Wybór odpowiedniego zestawu tłumaczeń
  const t = translations[locale as keyof typeof translations] || translations.pl;

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} currentPageName={title} />
      <Container className="mx-auto w-full max-w-400 px-4 py-8 md:px-6">
        {/* Breadcrumbs */}

        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Lewa kolumna: Treść */}
          <div className="order-2 flex w-full flex-col gap-6 lg:order-1 lg:col-span-7 xl:col-span-6">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-6 bg-brand-red"></div>
              <Typography as="span" variant="body-s" className="tracking-widest text-brand-red">
                {tags[1] || category}
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
                    <Typography as="span" variant="body-m" className="text-muted-foreground">
                      {tag}
                    </Typography>
                    {index < tags.length - 1 && (
                      <Typography
                        as="span"
                        variant="body-m"
                        className="text-muted-foreground opacity-50"
                      >
                        •
                      </Typography>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Sekcja Autora i Daty */}
            <div className="flex w-fit flex-col justify-between gap-4 py-1 sm:flex-row sm:items-center">
              {author ? (
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 bg-slate-100">
                    {author.imageUrl && <AvatarImage src={author.imageUrl} alt={author.name} />}
                    <AvatarFallback className="text-sm font-medium text-slate-500">
                      {author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Typography
                      as="span"
                      variant="body-s"
                      className="font-semibold text-foreground"
                    >
                      {author.name}
                    </Typography>
                    {author.role && (
                      <Typography
                        as="span"
                        variant="body-s"
                        className="mt-0.5 text-muted-foreground"
                      >
                        {author.role}
                      </Typography>
                    )}
                  </div>
                </div>
              ) : (
                <div />
              )}

              {author && date && (
                <Separator orientation="vertical" className="mx-2 hidden h-8 sm:block" />
              )}

              {date && (
                <Typography
                  variant="caption"
                  className="whitespace-nowrap text-muted-foreground"
                  asChild
                >
                  <time dateTime={isoDate}>{date}</time>
                </Typography>
              )}
            </div>

            {/* Przyciski Akcji */}
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Button className="gap-2 rounded-md bg-brand-blue px-5 text-white hover:bg-brand-blue/90">
                <Share2 className="h-4 w-4" />
                {t.share}
              </Button>

              {pdfUrl && (
                <Button
                  asChild
                  variant="ghost"
                  className="gap-2 rounded-md border-border px-5 text-foreground hover:bg-muted"
                >
                  {/* W przypadku bezpośrednich plików do pobrania bezpieczniej zostawić natywny tag <a> z target="_blank" zamiast routerowego Linku */}
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                    {t.downloadPdf}
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Prawa kolumna: Obraz */}
          <div className="order-1 flex w-full flex-col gap-3 lg:order-2 lg:col-span-5 xl:col-span-6">
            <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-muted">
              {image ? (
                <GradientImage
                  image={image}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                  wrapperClassName="h-full w-full"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                  <ImageIcon className="h-12 w-12" />
                  <Typography as="span" variant="body-s" className="font-medium">
                    {t.noImage}
                  </Typography>
                </div>
              )}
            </div>

            {image?.asset?.description && (
              <div className="mt-1 flex items-start gap-3 border-l-2 border-brand-red p-1">
                <Typography variant="caption" className="leading-snug text-muted-foreground">
                  {image.asset.description}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
