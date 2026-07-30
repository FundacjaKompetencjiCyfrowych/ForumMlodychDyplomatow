import React from "react";
import { Link } from "../../i18n/navigation";
import { SanityImage } from "../../sanity/image/SanityImage";
import type { DivisionPreview } from "../../sanity/queries/division";
import Typography from "./typography";
import { ChevronRight } from "lucide-react";
import { Button } from "./button";
import { getSubHeading } from "../../lib/heading";
import { getTranslations } from "next-intl/server";
import type { Locale } from "next-intl";

type Props = {
  division: DivisionPreview;
  index: number;
  locale?: Locale;
};

const DivisionPageCard = async ({ division, index, locale = "pl" }: Props) => {
  const t = await getTranslations({ locale, namespace: "divisions" });
  return (
    <Link
      href={`/divisions/${division.slug}`}
      className="group flex h-105 w-60 flex-col items-center gap-4 overflow-hidden bg-brand-slate-50 p-6"
    >
      <Typography as={getSubHeading(index)} variant="title-l" className="text-brand-gray-900">
        {division.name}
      </Typography>
      <div className="relative h-full w-full overflow-hidden">
        {division.coverImage ? (
          <SanityImage image={division.coverImage} className="object-cover" />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-brand-red to-brand-blue" />
        )}
      </div>

      <Button
        asChild
        variant="text"
        iconRight={<ChevronRight className="transition-transform duration-300" />}
      >
        <div>{t("checkDetails")}</div>
      </Button>
    </Link>
  );
};

export default DivisionPageCard;
