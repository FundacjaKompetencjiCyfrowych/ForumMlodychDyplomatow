import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { ChevronDown } from "lucide-react";

export const GroupAuthorsList = ({
  authors,
  showAuthorsText,
}: {
  authors: any[];
  showAuthorsText: string;
}) => {
  if (!authors || authors.length <= 1) return null;

  return (
    <Collapsible className="mt-3 w-full">
      <CollapsibleTrigger className="group flex cursor-pointer items-center gap-1 text-sm font-semibold text-brand-red transition-colors hover:text-brand-red/80">
        {showAuthorsText}
        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>

      <CollapsibleContent className="CollapsibleContent">
        <ul className="mt-4 flex flex-col gap-4 md:flex-row md:flex-wrap">
          {authors.map((author, index) => (
            <li key={index} className="flex items-center gap-3">
              <Avatar className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden">
                {author.imageUrl || author.img?.asset?.url ? (
                  <AvatarImage
                    src={author.imageUrl || author.img?.asset?.url}
                    alt={author.name}
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="text-[0.6rem] font-medium text-slate-700">
                    {author.initials ||
                      (author.name ? author.name.substring(0, 2).toUpperCase() : "")}
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
  );
};
