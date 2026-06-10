import React from "react";
import { Link } from "../ui/link";
import { getTranslations } from "next-intl/server";

const SkipToContent = async () => {
  const t = await getTranslations("navigation");
  return (
    <div className="relative w-0 overflow-visible">
      <Link
        className="absolute -translate-y-40 focus:relative focus:translate-y-1"
        href="#main-content"
        variant="text"
      >
        {t("skipToContent")}
      </Link>
    </div>
  );
};

export default SkipToContent;
