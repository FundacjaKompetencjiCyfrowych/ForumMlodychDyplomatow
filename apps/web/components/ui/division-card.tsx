import { SanityImage } from "../../sanity/image/SanityImage";
import type { DivisionPreview } from "../../sanity/queries/division";
import Typography from "./typography";
import { ChevronRight } from "lucide-react";
import { Link } from "./link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "next-intl";

type Props = {
  division: DivisionPreview;
  index: number;
  locale: Locale;
};

const DivisionCard = async ({ division, locale }: Props) => {
  const t = await getTranslations({ locale, namespace: "divisions" });
  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-slate-50 p-6">
      <Typography as="h3" variant="title-l" className="text-center text-gray-900">
        {division.name}
      </Typography>

      <div className="relative mt-2 min-h-0 w-full flex-1 overflow-hidden">
        <SanityImage image={division.coverImage} className="mt-4 h-full w-full object-cover" />
      </div>

      <Link
        href={`/divisions/${division.slug}`}
        variant="text"
        className="mt-4 justify-center"
        iconRight={
          <ChevronRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
        }
      >
        {t("checkDetails")}
      </Link>
    </div>
  );
};

export default DivisionCard;
