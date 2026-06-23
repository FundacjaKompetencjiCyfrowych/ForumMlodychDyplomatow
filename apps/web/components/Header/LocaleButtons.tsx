"use client";
import type { Locale } from "next-intl";
import { useParams } from "next/navigation";
import { type ReactNode } from "react";
import { usePathname, useRouter } from "../../i18n/navigation";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type Props = {
  locale: Locale;
  children: ReactNode;
};

export const LocaleButtons = () => {
  return (
    <div className="flex h-7 items-center gap-2">
      <ChangeLocaleLink locale="pl">PL</ChangeLocaleLink>
      <Separator orientation="vertical" />
      <ChangeLocaleLink locale="en">EN</ChangeLocaleLink>
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
      size="inline"
      onClick={() => {
        router.replace(pathname, { locale });
      }}
      className={locale === currentLocale ? "text-red-900" : "text-gray-700 hover:text-red-700"}
    >
      {children}
    </Button>
  );
};
