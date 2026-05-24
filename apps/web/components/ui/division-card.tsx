import React from "react";
import type { DivisionPreview } from "../../sanity/queries/division";
import { cn } from "../../lib/utils";
import { Link } from "../../i18n/navigation";
import { SanityImage } from "../../sanity/image/SanityImage";
import Typography from "./typography";

type Props = {
  division: DivisionPreview;
  index: number;
};

const DivisionCard = ({ division, index }: Props) => {
  return (
    <Link
      href={`/divisions/${division.slug}`}
      className="group relative block h-full w-full overflow-clip rounded-[8px] text-white transition-all"
    >
      <SanityImage image={division.coverImage} className="h-full w-full object-cover" />
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/50",
          "fill-mode-forwards blur-in-sm blur-out-sm fade-out zoom-in-150 zoom-out-150 not-[group-hover]:animate-out group-hover:animate-in"
        )}
      >
        <Typography variant="h5" className="text-center text-slate-50">
          {division.name}
        </Typography>
      </div>
    </Link>
  );
};

export default DivisionCard;
