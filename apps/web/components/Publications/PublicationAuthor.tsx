import React from "react";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";

export interface PublicationAuthorProps {
  author?: {
    name: string;
    initials: string;
    role?: string;
    imageUrl?: string;
  };
  date?: string;
  isoDate?: string;
}

export const PublicationAuthor = ({ author, date, isoDate }: PublicationAuthorProps) => {
  if (!author) return null;

  return (
    <div className="mx-auto w-full max-w-170 pb-12 lg:col-span-7 xl:col-span-6">
      <div className="mx-auto mt-4 flex w-fit items-center gap-4 pt-4">
        <div className="relative flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200/60">
          {author.imageUrl ? (
            <Image src={author.imageUrl} alt={author.name} fill className="object-cover" />
          ) : (
            <span className="text-sm font-medium text-slate-700">{author.initials}</span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <Typography as="span" variant="p1" className="font-semibold text-foreground">
            {author.name}
          </Typography>
          {author.role && (
            <Typography as="span" variant="p2" className="mt-0.5 text-muted-foreground">
              {author.role}
            </Typography>
          )}
          {date && (
            <Typography variant="p2" className="mt-0.5 text-muted-foreground" asChild>
              <time dateTime={isoDate}>{date}</time>
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
