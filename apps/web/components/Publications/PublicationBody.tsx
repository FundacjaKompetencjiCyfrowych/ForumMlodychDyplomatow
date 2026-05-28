import React from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Typography } from "@/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import imageUrlBuilder from "@sanity/image-url";

// 1. Konfiguracja buildera URL
const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "twoj_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});
const urlFor = (source: any) => builder.image(source);

export interface PublicationBodyProps {
  content: any[];
  author?: {
    name: string;
    initials: string;
    role?: string;
    imageUrl?: string;
  };
  date?: string;
}

// 2. Funkcja pomocnicza: Tworzy bezpieczne ID (slug) z tekstu, radząc sobie z polskimi znakami
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

// 3. Funkcja pomocnicza: Wyciąga czysty tekst z bloku Sanity
const getBlockText = (block: any) => {
  return block.children?.map((child: any) => child.text).join("") || "";
};

export const PublicationBody = ({ content, author, date }: PublicationBodyProps) => {
  // 4. Generowanie dynamicznego Spisu Treści (TOC) na podstawie nagłówków h1 i h2
  const toc = React.useMemo(() => {
    if (!Array.isArray(content)) return [];

    return content
      .filter((block) => block._type === "block" && (block.style === "h1" || block.style === "h2"))
      .map((block) => {
        const text = getBlockText(block);
        return {
          title: text,
          id: slugify(text),
          style: block.style, // Żeby móc np. wciąć h2 pod h1, jeśli będziesz chciał
        };
      });
  }, [content]);

  // 5. Konfiguracja Portable Text ze wstrzykiwaniem ID
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
          // Dodano klasę scroll-mt-[20vh]
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
          // Dodano klasę scroll-mt-[20vh]
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
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
              <Image
                src={imageUrl}
                alt={value.alt || "Zdjęcie w treści artykułu"}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
            </div>
            {value.caption && (
              <div className="mt-3 flex items-start gap-3 border-l-[2px] border-brand-red p-1">
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
      strong: ({ children }) => (
        <strong className="font-semibold text-foreground">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => {
        const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "noindex nofollow" : undefined}
            className="text-brand-blue underline underline-offset-4 transition-colors hover:text-brand-400"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <section className="mx-auto w-full px-4 py-8 md:px-6">
      <div className="relative flex flex-col items-start gap-8 lg:grid lg:grid-cols-12 lg:gap-16">
        {/* Lewa kolumna: Treść główna */}
        <div className="lg:col-span-7 lg:col-start-1 xl:col-span-6">
          <div className="prose-custom max-w-none">
            <PortableText value={content} components={portableTextComponents} />
          </div>

          {/* Sekcja Autora */}
          <div className="mt-16 flex w-fit flex-col gap-4 py-1 pt-8 sm:flex-row sm:items-center">
            {author && (
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 bg-slate-100">
                  {author.imageUrl && <AvatarImage src={author.imageUrl} alt={author.name} />}
                  <AvatarFallback className="text-sm font-medium text-slate-500">
                    {author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Typography as="span" variant="p2" className="font-semibold text-foreground">
                    {author.name}
                  </Typography>
                  {author.role && (
                    <Typography
                      as="span"
                      variant="caption"
                      className="mt-0.5 text-muted-foreground"
                    >
                      {author.role}
                    </Typography>
                  )}
                </div>
              </div>
            )}

            {author && date && (
              <Separator orientation="vertical" className="mx-2 hidden h-8 sm:block" />
            )}

            {date && (
              <Typography variant="p2" className="whitespace-nowrap text-muted-foreground" asChild>
                <time dateTime={date}>{date}</time>
              </Typography>
            )}
          </div>
        </div>

        {/* Prawa kolumna: Pływający Spis Treści (TOC) z anchorami */}
        <div className="sticky top-24 hidden lg:col-span-4 lg:col-start-9 lg:block xl:col-span-4">
          <Typography variant="h6" className="mb-4 font-normal text-muted-foreground">
            W tym artykule
          </Typography>

          <Separator className="mb-6 bg-border/60" />

          {toc.length > 0 ? (
            <ul className="flex flex-col gap-5">
              {toc.map((item, index) => {
                const number = String(index + 1).padStart(2, "0");
                return (
                  <li key={index} className="group flex items-start gap-4">
                    <Typography
                      as="span"
                      variant="p1"
                      className="mt-[2px] shrink-0 font-oswald font-semibold text-brand-red"
                    >
                      {number}
                    </Typography>
                    <a
                      href={`#${item.id}`}
                      className="block text-muted-foreground no-underline transition-colors group-hover:text-foreground"
                    >
                      <Typography as="span" variant="p1">
                        {item.title}
                      </Typography>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Typography variant="p2" className="text-muted-foreground italic">
              Brak nagłówków w tekście.
            </Typography>
          )}
        </div>
      </div>
    </section>
  );
};
