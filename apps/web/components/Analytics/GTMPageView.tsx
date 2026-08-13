"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { useLocale } from "next-intl";

export function GTMPageView() {
  const pathname = usePathname();
  const locale = useLocale();
  useEffect(() => {
    const slugs = pathname
      .split("/")
      .filter(Boolean)
      .filter((slug) => slug !== locale);
    sendGTMEvent({ event: "fmd_page_view", locale, path: slugs });
  }, [pathname, locale]);

  return null;
}
