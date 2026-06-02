import React from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Typography } from "@/components/ui/typography";
import { Link } from "@/components/ui/link"; // Upewnij się, że ścieżka do Twojego Linku jest poprawna
import imageUrlBuilder from "@sanity/image-url";

// 1. Konfiguracja buildera URL
const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "twoj_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});
const urlFor = (source: any) => builder.image(source);

// Dodano właściwość locale
export interface PublicationBodyProps {
  content: any[];
  author?: {
    name: string;
    initials: string;
    role?: string;
    imageUrl?: string;
  };
  date?: string;
  locale?: string; // np. "pl" lub "en"
}

// 2. Funkcje pomocnicze
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/ł/g, "l")
    .replace(/ś/g, "s")
    .replace(/ć/g, "c")
    .replace(/ń/g, "n")
    .replace(/ę/g, "e")
    .replace(/ą/g, "a")
    .replace(/ó/g, "o")
    .replace(/ź/g, "z")
    .replace(/ż/g, "z")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const getBlockText = (block: any) => {
  return block.children?.map((child: any) => child.text).join("") || "";
};

// 3. Prosty słownik tłumaczeń
const translations = {
  pl: {
    inThisArticle: "W tym artykule",
    noHeadings: "Brak nagłówków w tekście.",
  },
  en: {
    inThisArticle: "In this article",
    noHeadings: "No headings in the text.",
  },
};

// 4. Konfiguracja Portable Text
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Typography as="p" variant="p1" className="mb-6 text-foreground/90">
        {children}
      </Typography>
    ),
    h1: ({ children, value }) => {
      const id = slugify(getBlockText(value));
      return (
        <Typography
          as="h1"
          variant="h2"
          className="mt-12 mb-6 scroll-mt-[20vh] pt-4 text-foreground"
          asChild
        >
          <h1 id={id}>{children}</h1>
        </Typography>
      );
    },
    h2: ({ children, value }) => {
      const id = slugify(getBlockText(value));
      return (
        <Typography
          as="h2"
          variant="h3"
          className="mt-10 mb-5 scroll-mt-[20vh] pt-4 text-foreground"
          asChild
        >
          <h2 id={id}>{children}</h2>
        </Typography>
      );
    },
    h3: ({ children }) => (
      <Typography as="h3" variant="h4" className="mt-8 mb-4 text-foreground">
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography as="h4" variant="h5" className="mt-6 mb-3 text-foreground">
        {children}
      </Typography>
    ),
    h5: ({ children }) => (
      <Typography as="h5" variant="h6" className="mt-6 mb-2 text-foreground">
        {children}
      </Typography>
    ),
    h6: ({ children }) => (
      <Typography as="h6" variant="h6" className="mt-6 mb-2 text-foreground">
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-r-lg border-l-[3px] border-brand-blue bg-muted/30 py-2 pl-5 text-foreground/80 italic">
        <Typography variant="p1">{children}</Typography>
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref && !value?.asset?.url) return null;
      const imageUrl = value.asset.url || urlFor(value.asset).url();

      return (
        <div className="my-10 w-full">
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
            <Image
              src={imageUrl}
              alt={value.alt || "Zdjęcie w treści artykułu"}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <div className="mt-3 flex items-start gap-3 border-l-2 border-brand-red p-1">
              <Typography variant="caption" className="leading-snug text-muted-foreground">
                {value.caption}
              </Typography>
            </div>
          )}
        </div>
      );
    },
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          variant="link"
          className="border-none text-brand-blue no-underline underline-offset-4 transition-colors hover:border-transparent hover:text-brand-400"
        >
          {children}
        </Link>
      );
    },
  },
};

export const PublicationBody = ({ content, locale = "pl" }: PublicationBodyProps) => {
  // Wybór tekstów na podstawie locale (domyślnie "pl")
  const t = translations[locale as keyof typeof translations] || translations.pl;

  const toc = Array.isArray(content)
    ? content
        .filter(
          (block) => block._type === "block" && (block.style === "h1" || block.style === "h2")
        )
        .map((block) => {
          const text = getBlockText(block);
          return {
            title: text,
            id: slugify(text),
            style: block.style,
          };
        })
    : [];

  return (
    <section className="mx-auto w-full px-4 py-8 sm:px-12">
      <div className="relative flex flex-col items-start justify-center gap-8 md:flex-row">
        {/* Lewa kolumna: Treść główna */}
        <div className="w-full max-w-170 lg:col-span-7 xl:col-span-6">
          <div className="prose-custom max-w-none">
            <PortableText value={content} components={portableTextComponents} />
          </div>
        </div>

        {/* Prawa kolumna: Pływający Spis Treści (TOC) */}
        <div className="sticky top-24 hidden w-full max-w-48 lg:block">
          <Typography variant="h6" className="mb-4 font-normal text-muted-foreground">
            {t.inThisArticle}
          </Typography>

          <hr className="mb-6 h-px w-full shrink-0 border-none bg-border/60" />

          {toc.length > 0 ? (
            <ul className="flex flex-col gap-5">
              {toc.map((item, index) => {
                const number = String(index + 1).padStart(2, "0");
                return (
                  <li key={index} className="group flex items-start gap-4">
                    <Typography
                      as="span"
                      variant="p1"
                      className="mt-0.5 shrink-0 font-semibold text-brand-red"
                    >
                      {number}
                    </Typography>

                    {/* Zastosowanie własnego komponentu <Link> */}
                    <Link
                      href={`#${item.id}`}
                      variant="link"
                      className="block h-auto border-none p-0! text-left text-muted-foreground no-underline transition-colors hover:border-transparent hover:text-foreground active:border-transparent"
                    >
                      <Typography as="span" variant="p1">
                        {item.title}
                      </Typography>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Typography variant="p2" className="text-muted-foreground italic">
              {t.noHeadings}
            </Typography>
          )}
        </div>
      </div>
    </section>
  );
};
