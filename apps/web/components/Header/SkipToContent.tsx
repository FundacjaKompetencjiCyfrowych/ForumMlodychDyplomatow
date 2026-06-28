import React from "react";
import { Link } from "../ui/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "next-intl";

const SkipToContent = async ({ locale }: { locale: Locale }) => {
  const t = await getTranslations({ locale, namespace: "navigation" });
  return (
    <div className="relative hidden h-0 overflow-visible desktop:block">
      <Link
        className="absolute -translate-y-40 focus:translate-y-1"
        href="#main-content"
        variant="text"
      >
        {t("skipToContent")}
      </Link>
    </div>
  );
};

export default SkipToContent;
