import React from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Typography } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";
import imageUrlBuilder from "@sanity/image-url";
import { getTranslations } from "next-intl/server";
import type { Locale } from "next-intl";

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

const truncateText = (text: string, maxLength = 30) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const portableTextComponents: PortableTextComponents = {
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
  },
};

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
        <div className="sticky top-24 hidden w-full max-w-70 lg:block">
          <Typography variant="h4" className="p-2.5 pl-0 text-brand-gray-900">
            {t("singlePublicationPage.inThisArticle")}
          </Typography>

          <hr className="mb-2 h-px w-full shrink-0 border-none bg-border/60" />

          {toc.length > 0 ? (
            <ul className="flex flex-col">
              {toc.map((item, index) => {
                const number = String(index + 1).padStart(2, "0");
                const displayTitle = truncateText(item.title, 30);
                return (
                  <li key={index} className="group flex items-center">
                    <Typography as="span" variant="body-m" className="p-2.5 text-brand-red">
                      {number}
                    </Typography>

                    <Link href={`#${item.id}`} variant="none" size="inline">
                      <Typography
                        as="span"
                        variant="body-m"
                        className="text-wrap text-brand-red"
                        title={item.title}
                      >
                        {displayTitle}
                      </Typography>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Typography variant="body-m" className="text-brand-red italic">
              {t("singlePublicationPage.noHeadings")}
            </Typography>
          )}
        </div>
      </div>
    </section>
  );
};
