import React from "react";
import { Typography } from "@/components/ui/typography";
import { Tag } from "../ui/tag";
import { getAuthorDisplayData } from "../../app/[locale]/publications/[slug]/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Container } from "../ui/container";
import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";

export interface PublicationAuthorProps {
  authors?: {
    name: string;
    initials: string;
    role?: string;
    imageUrl?: string;
    bio?: string;
  }[];
  date?: string;
  isoDate?: string;
  tags?: {
    name: string;
    slug: string;
  }[];
  locale: Locale;
}

export const PublicationAuthor = async ({
  authors,
  date,
  isoDate,
  tags,
  locale,
}: PublicationAuthorProps) => {
  const t = await getTranslations({ locale, namespace: "publications" });

  if (!authors || authors.length === 0) return null;

  const authorData = await getAuthorDisplayData(authors, {
    groupName: t("groupName"),
    groupInitials: t("groupInitials"),
  });

  return (
    <Container contentWidth="xl">
      <div className="mx-auto mb-12 flex w-full flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2">
          {tags?.map((tag) => (
            <Tag key={tag.slug} href={tag.slug}>
              {tag.name}
            </Tag>
          ))}
        </div>
        <hr className="mb-2 h-px w-full shrink-0 border-none bg-border/60" />
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          {/* Lewa strona: Karta autora (lub awatar grupy) */}
          <div className="flex w-fit items-center">
            <Avatar className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden">
              {authorData.displayImageUrl ? (
                <AvatarImage src={authorData.displayImageUrl} alt={authorData.displayName} />
              ) : (
                <AvatarFallback className="text-sm font-medium text-slate-700">
                  {authorData.displayInitials}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex flex-col justify-center px-2">
              <div className="flex items-center">
                <Typography as="span" variant="body-s" className="text-brand-gray-600">
                  {authorData.displayName}
                  {authorData.displayRole ? `, ${authorData.displayRole}` : ""}
                </Typography>
              </div>
              {date && (
                <Typography variant="caption" className="text-brand-gray-600" asChild>
                  <time dateTime={isoDate}>{date}</time>
                </Typography>
              )}
            </div>
          </div>

          {/* Prawa strona: Bio pojedynczego autora lub rozwijana lista dla grupy */}
          <div className="flex flex-col">
            {authorData.isGroup ? (
              <Collapsible className="mt-3 w-full">
                <CollapsibleTrigger className="group flex cursor-pointer items-center gap-1 text-sm font-semibold text-brand-red transition-colors hover:text-brand-red/80">
                  {t("showAuthors")}
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="CollapsibleContent">
                  <ul className="mt-4 flex flex-wrap gap-4">
                    {authors.map((author, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Avatar className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden">
                          {author.imageUrl ? (
                            <AvatarImage src={author.imageUrl} alt={author.name} />
                          ) : (
                            <AvatarFallback className="text-[0.6rem] font-medium text-slate-700">
                              {author.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex flex-col justify-center">
                          <Typography
                            variant="body-s"
                            className="leading-tight font-medium text-brand-gray-900"
                          >
                            {author.name}
                          </Typography>
                          {author.role && (
                            <Typography variant="caption" className="text-brand-gray-600">
                              {author.role}
                            </Typography>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              authorData.displayBio && (
                <Typography variant="caption" className="text-black">
                  {authorData.displayBio}
                </Typography>
              )
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
