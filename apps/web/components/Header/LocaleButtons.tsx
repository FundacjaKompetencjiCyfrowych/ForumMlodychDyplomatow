"use client";
import React, { type ReactNode } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "../../i18n/navigation";
import { useParams } from "next/navigation";
import { Separator } from "radix-ui";
import { GlobeIcon } from "lucide-react";

type Props = {
  locale: string;
  children: ReactNode;
};
export const LocaleButtons = () => {
  return (
    <div className="flex gap-2 items-center h-7">
      <GlobeIcon className="text-red-900" />
      <ChangeLocaleLink locale="pl">PL</ChangeLocaleLink>
      <Separator.Separator className="border-gray-300 border h-full" orientation="vertical" />
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
