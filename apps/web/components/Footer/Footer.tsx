import { getLocale } from "next-intl/server";
import React from "react";
import { LANGUAGE_FIELD } from "../../../studio/config";
import { q, runQuery } from "../../sanity/groqd";
import { linkFragment } from "../../sanity/queries/linkFragment";
import { socialsFragment } from "../../sanity/queries/socialsFragment";
import { LocaleButtons } from "../Header/LocaleButtons";
import { FMDLogo } from "../Icons/FMDLogo";
import { Link } from "../ui/link";
import { Separator } from "../ui/separator";
import SocialIcons from "../ui/social-icons";
import Typography from "../ui/typography";

const footerQuery = q.star
  .parameters<{ locale: string }>()
  .filterByType("footer")
  .filterBy(`${LANGUAGE_FIELD} == $locale`)
  .slice(0)
  .project((sub) => ({
    address: sub.field("address"),
    copyright: sub.field("copyright"),
    email: sub.field("email"),
    phone: sub.field("phone"),
    identfiers: sub.field("identfiers"),
    links: sub.field("links[]").project(linkFragment),
    socials: sub.field("socials[]").project(socialsFragment),
    nav: sub.field("nav[]").project(linkFragment),
  }));

const Footer = async () => {
  const locale = await getLocale();

  const { data: footerData } = await runQuery(footerQuery, {
    parameters: { locale },
  });

  return (
    <footer className="flex max-w-full flex-col gap-4 px-6 py-8 text-gray-600">
      <FMDLogo />
      <div className="grid grid-cols-1 gap-4 desktop:grid-cols-3 desktop:flex-row">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start justify-between gap-4">
            <div className="flex flex-col items-start gap-4">
              {footerData?.email && (
                <Link variant="nav" size="inline" href={`mailto:${footerData.email}`}>
                  {footerData.email}
                </Link>
              )}
              {footerData?.phone && (
                <Link variant="nav" size="inline" href={`tel:${footerData.phone}`}>
                  {footerData.phone}
                </Link>
              )}
            </div>
            <SocialIcons socials={footerData?.socials} />
          </div>
        </div>
        <Separator className="desktop:hidden" />
        <div className="items-between flex flex-col gap-4">
          <Typography className="whitespace-break-spaces">{footerData?.address}</Typography>
          <Typography className="whitespace-break-spaces">{footerData?.identfiers}</Typography>
        </div>
        <Separator className="desktop:hidden" />
        <div className="flex flex-col items-start gap-6 desktop:items-end">
          <div className="flex flex-col items-start gap-3 desktop:items-end">
            {footerData?.nav?.map((link) => (
              <Link key={link._key} link={link} variant="nav" size="inline">
                <Typography variant="body-m" className="font-normal">
                  {link.text}
                </Typography>
              </Link>
            ))}
          </div>
          <LocaleButtons />
        </div>
      </div>
      <div className="flex w-full flex-col-reverse desktop:flex-row desktop:justify-between">
        <Typography variant="caption">{footerData?.copyright}</Typography>
        <div className="flex flex-col items-start justify-end desktop:flex-row desktop:gap-2">
          {footerData?.links?.map((link, index) => (
            <React.Fragment key={link._key}>
              <Typography asChild variant="caption">
                <Link link={link} variant="nav" className="font-normal" size="inline">
                  {link.text}
                </Link>
              </Typography>
              {index < (footerData.links?.length ?? 0) - 1 && (
                <Separator orientation="vertical" className="hidden desktop:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
