"use client";
import { type ReactNode } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "../../i18n/navigation";
import { useParams } from "next/navigation";
import { Separator } from "radix-ui";
import { GlobeIcon } from "lucide-react";
import type { Locale } from "next-intl";

type Props = {
  locale: Locale;
  children: ReactNode;
};

export const LocaleButtons = () => {
  return (
    <div className="flex h-7 items-center gap-2">
      <GlobeIcon className="text-brand-red" />
      <ChangeLocaleLink locale="pl">PL</ChangeLocaleLink>
      <Separator.Separator className="h-full border border-gray-300" orientation="vertical" />
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
