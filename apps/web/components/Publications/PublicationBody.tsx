import React from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Typography } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";
import imageUrlBuilder from "@sanity/image-url";
import { getTranslations } from "next-intl/server";
import type { Locale } from "next-intl";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, Globe } from "lucide-react";
import { Container } from "../ui/container";
import { trim } from "../../lib/text";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!dataset) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_SANITY_DATASET");
}

const builder = imageUrlBuilder({
  projectId,
  dataset,
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
  locale?: Locale;
}

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

// 1. FUNKCJA DO EKSTRAKCJI PRZYPISÓW Z PORTABLE TEXT
const extractFootnotes = (content: any[]) => {
  const footnotes: any[] = [];
  if (!Array.isArray(content)) return footnotes;

  content.forEach((block) => {
    if (block._type === "block" && block.markDefs) {
      block.markDefs.forEach((def: any) => {
        if (def._type === "footnote") {
          // Zapobiega duplikatom, jeśli ten sam przypis obejmuje kilka węzłów tekstowych
          if (!footnotes.find((f) => f._key === def._key)) {
            footnotes.push(def);
          }
        }
      });
    }
  });
  return footnotes;
};
// 2. FABRYKA KOMPONENTÓW (musi wiedzieć o przypisach, aby renderować poprawne numery)
const getPortableTextComponents = (footnotes: any[]): PortableTextComponents => ({
  block: {
    normal: ({ children }) => (
      <Typography as="p" variant="body-l" className="mb-6 text-brand-gray-900">
        {children}
      </Typography>
    ),
    h1: ({ children, value }) => {
      const id = slugify(getBlockText(value));
      return (
        <Typography
          as="h1"
          variant="h3"
          className="my-4 scroll-mt-[20vh] pt-4 text-brand-gray-900"
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
          variant="h4"
          className="my-4 scroll-mt-[20vh] pt-4 text-brand-gray-900"
          asChild
        >
          <h2 id={id}>{children}</h2>
        </Typography>
      );
    },
    h3: ({ children }) => (
      <Typography as="h3" variant="h4" className="mt-4 mb-4 text-brand-gray-900">
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography as="h4" variant="h4" className="mt-4 mb-3 text-brand-gray-900">
        {children}
      </Typography>
    ),
    h5: ({ children }) => (
      <Typography as="h5" variant="h4" className="mt-4 mb-2 text-brand-gray-900">
        {children}
      </Typography>
    ),
    h6: ({ children }) => (
      <Typography as="h6" variant="h4" className="mt-4 mb-2 text-brand-gray-900">
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 rounded-r-lg border-l-[3px] border-brand-red px-2 py-0.5 text-brand-red">
        <Typography variant="body-l">{children}</Typography>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-brand-gray-900">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-brand-gray-900">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li>
        <Typography as="span" variant="body-l">
          {children}
        </Typography>
      </li>
    ),
    number: ({ children }) => (
      <li>
        <Typography as="span" variant="body-l">
          {children}
        </Typography>
      </li>
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
              <Typography variant="caption" className="text-muted-brand leading-snug">
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
      <strong className="font-semibold text-brand-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          variant="link"
          className="hover:text-brand-gray-900-400 text-brand-gray-900-blue border-none no-underline underline-offset-4 transition-colors hover:border-transparent"
        >
          {children}
        </Link>
      );
    },
    // NOWY MARKER DLA PRZYPISÓW
    footnote: ({ children, value }) => {
      const index = footnotes.findIndex((f) => f._key === value._key) + 1;
      return (
        <span className="relative inline-block">
          {children}
          <sup
            id={`ref-${value._key}`}
            className="ml-0.5 scroll-mt-[20vh] font-semibold text-brand-red"
          >
            <a href={`#footnote-${value._key}`} className="hover:underline" title={value.source}>
              [{index}]
            </a>
          </sup>
        </span>
      );
    },
  },
});

export const PublicationBody = async ({ content, locale = "pl" }: PublicationBodyProps) => {
  const t = await getTranslations({ locale, namespace: "publications" });

  const toc = Array.isArray(content)
    ? content
        .filter(
          (block) => block._type === "block" && (block.style === "h1" || block.style === "h2")
        )
        .map((block) => {
          const text = getBlockText(block);
          return {
            title: trim(text, 40),
            id: slugify(text),
            style: block.style,
          };
        })
    : [];

  const footnotes = extractFootnotes(content);
  const components = getPortableTextComponents(footnotes);

  return (
    <Container contentWidth="max">
      <div className="relative flex flex-col-reverse items-start justify-center gap-8 md:flex-row">
        {/* Lewa kolumna: Treść główna + Bibliografia */}
        <div className="flex w-full max-w-170 flex-col gap-12 lg:col-span-7 xl:col-span-6">
          <div className="prose-custom max-w-none">
            <PortableText value={content} components={components} />
          </div>

          {/* 3. KOMPONENT BIBLIOGRAFII Renderowany pod głównym tekstem */}
          {footnotes.length > 0 && (
            <div className="mt-4">
              <Collapsible className="w-full">
                <CollapsibleTrigger className="group flex w-full items-center justify-between text-left outline-none">
                  <Typography variant="h4" className="text-brand-gray-900">
                    {t("singlePublicationPage.bibliography")}
                  </Typography>
                  <ChevronDown className="size-6 text-brand-gray-900 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                  <ol className="flex flex-col gap-3">
                    {footnotes.map((note, index) => (
                      <li
                        key={note._key}
                        id={`footnote-${note._key}`}
                        className="flex scroll-mt-[20vh] gap-2 text-sm text-brand-gray-700"
                      >
                        <a href={`#ref-${note._key}`} className="" title="Wróć do tekstu">
                          <Typography variant="body-l" className="text-brand-red">
                            [{index + 1}]
                          </Typography>
                        </a>
                        <div>
                          <Typography variant="body-l" as="span">
                            {note.source}
                          </Typography>
                          {note.url && (
                            <Typography variant="body-l" as="span">
                              {" | link:"}
                              <a
                                href={note.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-1 break-all hover:underline"
                              >
                                {note.url}
                              </a>
                            </Typography>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>

        {/* Prawa kolumna: Pływający Spis Treści (TOC) */}
        <div className="top-24 block w-full md:sticky md:max-w-70">
          <Collapsible defaultOpen className="w-full">
            <CollapsibleTrigger className="group flex w-full items-center justify-between pb-3 text-left outline-none">
              <div className="flex items-center gap-2 text-brand-gray-900">
                <Globe className="size-5" />
                <Typography variant="h4">{t("singlePublicationPage.inThisArticle")}</Typography>
              </div>
              <div className="flex items-center gap-2 text-brand-gray-600">
                <ChevronDown className="size-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>

            <hr className="mb-4 h-px w-full shrink-0 border-none bg-border/60" />

            <CollapsibleContent>
              {toc.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {toc.map((item, index) => {
                    const number = String(index + 1).padStart(2, "0");

                    return (
                      <li key={index} className="group flex w-full items-center text-left">
                        <Typography
                          as="span"
                          variant="body-m"
                          className="shrink-0 py-2 pr-3 text-brand-red"
                        >
                          {number}
                        </Typography>

                        <Link
                          href={`#${item.id}`}
                          variant="none"
                          size="inline"
                          className="block min-w-0 flex-1 text-left"
                        >
                          <Typography
                            as="span"
                            variant="body-m"
                            className="block truncate text-left text-brand-gray-500 transition-colors hover:text-brand-gray-900"
                            title={item.title}
                          >
                            {item.title}
                          </Typography>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <Typography variant="body-m" className="text-left text-brand-red italic">
                  {t("singlePublicationPage.noHeadings")}
                </Typography>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </Container>
  );
};
