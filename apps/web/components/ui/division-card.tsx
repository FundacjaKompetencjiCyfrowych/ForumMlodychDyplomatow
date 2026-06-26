import { Link } from "../../i18n/navigation";
import { cn } from "../../lib/utils";
import { SanityImage } from "../../sanity/image/SanityImage";
import type { DivisionPreview } from "../../sanity/queries/division";
import Typography from "./typography";

type Props = {
  division: DivisionPreview;
  index: number;
};

const DivisionCard = ({ division }: Props) => {
  return (
    <Link
      href={`/divisions/${division.slug}`}
      className="group relative block h-full w-full overflow-clip rounded-lg text-white transition-all"
    >
      <SanityImage image={division.coverImage} className="h-full w-full object-cover" />
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/50",
          "fill-mode-forwards blur-in-sm blur-out-sm fade-out zoom-in-150 zoom-out-150 not-[group-hover]:animate-out group-hover:animate-in"
        )}
      >
        <Typography variant="title-l" className="text-center text-slate-50">
          {division.name}
        </Typography>
      </div>
    </Link>
  );
};

export default DivisionCard;
