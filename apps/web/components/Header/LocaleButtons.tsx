"use client";
import type { Locale } from "next-intl";
import { useParams } from "next/navigation";
import { type ReactNode } from "react";
import { usePathname, useRouter } from "../../i18n/navigation";
import { Button } from "../ui/button";

type Props = {
  locale: Locale;
  children: ReactNode;
};

export const LocaleButtons = () => {
  return (
    <div className="flex h-7 items-center gap-2">
      <ChangeLocaleLink locale="pl">PL</ChangeLocaleLink>
      <ChangeLocaleLink locale="en">ENG</ChangeLocaleLink>
    </div>
  );
};
const ChangeLocaleLink = ({ locale, children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { locale: currentLocale } = useParams<{ locale: string }>();
  return (
    <Button
      variant="link"
      data-active={locale === currentLocale ? "true" : undefined}
      onClick={() => {
        router.replace(pathname, { locale });
      }}
    >
      {children}
    </Button>
  );
};
