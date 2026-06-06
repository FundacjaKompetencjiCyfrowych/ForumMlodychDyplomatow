import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export interface PublicationCardProps {
  title: string;
  excerpt?: string;
  author?: {
    name: string;
    initials: string;
    imageUrl?: string;
  };
  date?: string;
  isoDate?: string;
  tags?: string[];
  image?: {
    src: string;
    alt: string;
    blurDataURL?: string;
  } | null;
  href: string;
  layout?: "vertical" | "horizontal";
  className?: string;
}

export const PublicationCard = ({
  title,
  excerpt,
  author,
  date,
  isoDate,
  tags = [],
  image,
  href,
  layout = "vertical",
  className,
}: PublicationCardProps) => {
  const visibleTags = tags.slice(0, 2);
  const hiddenTagsCount = tags.length > 2 ? tags.length - 2 : 0;

  const isHorizontal = layout === "horizontal";

  return (
    <Link
      href={href}
      className={cn(
        "group flex w-full overflow-hidden rounded-lg border border-border/60 bg-white transition-all hover:shadow-md",
        isHorizontal ? "flex-col sm:flex-row" : "flex-col",
        className
      )}
    >
      {/* 1. Sekcja Obrazka / Tła */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-slate-100",
          isHorizontal ? "aspect-4/3 w-full sm:w-[40%] sm:max-w-70" : "aspect-16/10 w-full"
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-700 to-brand-red" />
        )}

        {/* Tagi nałożone na obrazek */}
        {tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {visibleTags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-white/95 px-2.5 py-0.5 text-[0.65rem] font-medium text-slate-800 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            {hiddenTagsCount > 0 && (
              <span className="rounded-full bg-white/95 px-2 py-0.5 text-[0.65rem] font-medium text-slate-800 backdrop-blur-sm">
                {hiddenTagsCount}+
              </span>
            )}
          </div>
        )}
      </div>

      {/* 2. Sekcja Treści */}
      <div className="flex flex-1 flex-col p-5">
        <Typography
          as="h3"
          variant="h6"
          className="line-clamp-2 text-foreground transition-colors group-hover:text-brand-red"
        >
          {title}
        </Typography>

        {excerpt && (
          <Typography as="p" variant="p2" className="mt-2 line-clamp-2 text-muted-foreground">
            {excerpt}
          </Typography>
        )}

        <div className="mt-auto flex w-full flex-col pt-5">
          <hr className="mb-4 h-px shrink-0 border-none bg-border/60" />

          <div className="flex items-center gap-3">
            {author && (
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200/60">
                {author.imageUrl ? (
                  <Image src={author.imageUrl} alt={author.name} fill className="object-cover" />
                ) : (
                  <span className="text-[0.65rem] font-semibold text-slate-700">
                    {author.initials}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col">
              {author && (
                <Typography as="span" variant="caption" className="font-semibold text-foreground">
                  {author.name}
                </Typography>
              )}
              {date && (
                <Typography variant="caption" className="text-muted-foreground" asChild>
                  <time dateTime={isoDate}>{date}</time>
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
