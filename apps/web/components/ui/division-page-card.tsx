import React from "react";
import { Link } from "../../i18n/navigation";
import { SanityImage } from "../../sanity/image/SanityImage";
import type { DivisionPreview } from "../../sanity/queries/division";
import Typography from "./typography";
import { ChevronRight } from "lucide-react";
import { Button } from "./button";
import { getSubHeading } from "../../lib/heading";

type Props = {
  division: DivisionPreview;
  index: number;
  locale?: string;
};

const DivisionPageCard = ({ division, index, locale = "pl" }: Props) => {
  return (
    <Link
      href={`/divisions/${division.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-sm bg-white"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        {division.coverImage ? (
          <SanityImage image={division.coverImage} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-brand-red to-brand-blue" />
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <Typography
          as={getSubHeading(index)}
          variant="body-xl"
          className="font-medium text-[#1a2332]"
        >
          {division.name}
        </Typography>

        <Button
          asChild
          variant="text"
          className="p-0 text-[15px] font-semibold text-brand-blue-900 hover:border-transparent hover:bg-transparent"
          iconRight={
            <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
          }
        >
          <div>{locale === "pl" ? "Sprawdź szczegóły" : "Check details"}</div>
        </Button>
      </div>
    </Link>
  );
};

export default DivisionPageCard;
