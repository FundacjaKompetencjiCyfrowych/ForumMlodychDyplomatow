import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { InferFragmentType } from "groqd";
import type { publicationPreviewFragment } from "../../sanity/queries/publications";
import { formatLink } from "../../lib/links";
import { Link } from "../ui/link";
import { SanityImage } from "../../sanity/image/SanityImage";
import { getInitials } from "../../app/[locale]/publications/[slug]/helpers";

export interface PublicationCardProps {
  publication: InferFragmentType<typeof publicationPreviewFragment>;
  layout?: "vertical" | "horizontal";
  className?: string;
}

export const PublicationCard = async ({
  publication,
  layout = "vertical",
  className,
}: PublicationCardProps) => {
  const { title, excerpt, author, date, tags = [], mainImage: image, slug } = publication;
  const visibleTags = tags?.slice(0, 2) || [];
  const hiddenTagsCount = tags && tags?.length > 2 ? tags.length - 2 : 0;

  const isHorizontal = layout === "horizontal";
  const formattedDate = new Date(date ?? "").toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <Link
      link={formatLink({
        slug,
        text: null,
        type: "publication",
      })}
      data-orientation={layout}
      size="inline"
      className={cn(
        "group flex w-full overflow-hidden border border-border/60 bg-white transition-all hover:shadow-md",
        "flex-col items-start desktop:data-[orientation=horizontal]:h-80 desktop:data-[orientation=horizontal]:flex-row desktop:data-[orientation=horizontal]:items-stretch desktop:data-[orientation=vertical]:max-h-144",
        className
      )}
    >
      {/* 1. Sekcja Obrazka / Tła */}
      <div
        className={cn(
          "relative overflow-hidden bg-slate-100",
          "aspect-375/281 w-full shrink-0 desktop:group-data-[orientation=horizontal]:aspect-auto desktop:group-data-[orientation=horizontal]:h-full desktop:group-data-[orientation=horizontal]:w-1/2 desktop:group-data-[orientation=horizontal]:flex-none"
        )}
      >
        {image ? (
          <SanityImage
            sizes={{ default: "100vw", desktop: isHorizontal ? "50vw" : "23.5rem" }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            image={image}
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-700 to-brand-red" />
        )}
      </div>

      {/* 2. Sekcja Treści */}
      <div className="flex flex-1 flex-col justify-between p-4 desktop:group-data-[orientation=horizontal]:h-full desktop:group-data-[orientation=horizontal]:w-1/2 desktop:group-data-[orientation=horizontal]:flex-none desktop:group-data-[orientation=horizontal]:py-10 desktop:group-data-[orientation=horizontal]:pr-18 desktop:group-data-[orientation=horizontal]:pl-10">
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag._id}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.65rem] font-medium text-slate-700"
              >
                {tag.name}
              </span>
            ))}
            {hiddenTagsCount > 0 && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] font-medium text-slate-700">
                {hiddenTagsCount}+
              </span>
            )}
          </div>
        )}

        <Typography
          as="h3"
          variant="h4"
          className="line-clamp-2 whitespace-break-spaces text-foreground transition-colors group-hover:text-brand-red"
        >
          {title}
        </Typography>

        {excerpt && (
          <Typography
            as="p"
            variant="body-s"
            className="mt-2 line-clamp-2 whitespace-break-spaces text-muted-foreground"
          >
            {excerpt}
          </Typography>
        )}

        <div className="mt-auto flex w-full flex-col pt-5">
          <div className="flex items-center gap-3">
            {author && (
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200/60">
                {author.img ? (
                  <SanityImage
                    image={author.img}
                    alt={author.name ?? undefined}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-[0.65rem] font-semibold text-slate-700">
                    {getInitials(author.name ?? "")}
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
                  <time dateTime={date}>{formattedDate}</time>
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
