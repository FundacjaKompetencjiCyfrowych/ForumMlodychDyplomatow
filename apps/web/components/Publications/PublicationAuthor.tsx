import React from "react";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { Tag } from "../ui/tag";

export interface PublicationAuthorProps {
  author?: {
    name: string;
    initials: string;
    role?: string;
    imageUrl?: string;
    bio?: string;
  };
  date?: string;
  isoDate?: string;
  tags?: {
    name: string;
    slug: string;
  }[];
}

export const PublicationAuthor = ({ author, date, isoDate, tags }: PublicationAuthorProps) => {
  if (!author) return null;

  return (
    <div className="mx-auto mb-12 flex w-full max-w-200 flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {tags?.map((tag) => (
          <Tag key={tag.slug} href={tag.slug}>
            {tag.name}
          </Tag>
        ))}
      </div>
      <hr className="mb-2 h-px w-full shrink-0 border-none bg-border/60" />
      <div className="grid grid-cols-2 items-center gap-8">
        {/* Author Card */}
        <div className="flex w-fit items-center">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200/60">
            {author.imageUrl ? (
              <Image src={author.imageUrl} alt={author.name} fill className="object-cover" />
            ) : (
              <span className="text-sm font-medium text-slate-700">{author.initials}</span>
            )}
          </div>

          <div className="flex flex-col justify-center px-2">
            <div className="flex items-center">
              <Typography as="span" variant="body-s" className="text-brand-gray-600">
                {author.name}, {author.role && author.role}
              </Typography>
            </div>
            {date && (
              <Typography variant="caption" className="text-brand-gray-600" asChild>
                <time dateTime={isoDate}>{date}</time>
              </Typography>
            )}
          </div>
        </div>

        <Typography variant="caption" className="text-black">
          {author.bio}
        </Typography>
      </div>
    </div>
  );
};
