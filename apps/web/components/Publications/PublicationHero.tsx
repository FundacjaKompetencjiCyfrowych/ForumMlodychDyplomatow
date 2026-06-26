import React from "react";
import Image from "next/image";
import { Share2, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { Link } from "@/components/ui/link"; // Upewnij się, że ścieżka jest prawidłowa

export interface PublicationHeroProps {
  breadcrumbs: { label: string; href?: string }[];
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
  image?: {
    src: string;
    alt: string;
    caption?: string;
    blurDataURL?: string;
  } | null;
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
    <section className="mx-auto w-full max-w-400 px-4 py-8 md:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 lg:mb-8">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link
                href={item.href}
                variant="link"
                className="h-auto border-none p-0! text-muted-foreground no-underline transition-colors hover:border-transparent hover:text-foreground active:border-transparent"
              >
                <Typography as="span" variant="body-s">
                  {item.label}
                </Typography>
              </Link>
            ) : (
              <Typography as="span" variant="body-s" className="text-foreground">
                {item.label}
              </Typography>
            )}
            {index < breadcrumbs.length - 1 && (
              <Typography as="span" variant="body-s" className="text-muted-foreground">
                ›
              </Typography>
            )}
          </React.Fragment>
        ))}
      </nav>

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
                  <Typography as="span" variant="body-s" className="font-semibold text-foreground">
                    {author.name}
                  </Typography>
                  {author.role && (
                    <Typography as="span" variant="body-s" className="mt-0.5 text-muted-foreground">
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
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                placeholder={image.blurDataURL ? "blur" : "empty"}
                blurDataURL={image.blurDataURL}
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

          {image?.caption && (
            <div className="mt-1 flex items-start gap-3 border-l-2 border-brand-red p-1">
              <Typography variant="caption" className="leading-snug text-muted-foreground">
                {image.caption}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
