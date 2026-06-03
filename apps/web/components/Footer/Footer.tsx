import { LANGUAGE_FIELD } from "../../../studio/config";
import { q, runQuery } from "../../sanity/groqd";
import { SanityImage } from "../../sanity/image/SanityImage";
import { imgFragment } from "../../sanity/queries/imgFragment";
import { linkButtonFragment, linkFragment } from "../../sanity/queries/linkFragment";
import { LocaleButtons } from "../Header/LocaleButtons";
import { FMDLogo } from "../Icons/FMDLogo";
import { Link } from "../ui/link";
import Typography from "../ui/typography";
import { getLocale } from "next-intl/server";

const footerQuery = q.star
  .parameters<{ locale: string }>()
  .filterByType("footer")
  .filterBy(`${LANGUAGE_FIELD} == $locale`)
  .slice(0)
  .project((sub) => ({
    description: sub.field("description"),
    cta: sub.field("cta").project(linkButtonFragment),
    copyright: sub.field("copyright"),
    links: sub.field("links[]").project(linkFragment),
    columns: sub.field("columns[]").project((sub) => ({
      _key: sub.field("_key"),
      title: sub.field("title"),
      links: sub.field("links[]").project(linkFragment),
    })),
    contactColumn: sub.field("contactColumn").project((sub) => ({
      email: sub.field("email"),
      title: sub.field("title"),
      phone: sub.field("phone"),
      socials: sub.field("socials[]").project((sub) => ({
        _key: sub.field("_key"),
        icon: sub.field("icon").project(imgFragment),
        platform: sub.field("platform"),
        link: sub.field("link").project(linkFragment),
      })),
    })),
  }));

const Footer = async () => {
  const locale = await getLocale();

  const { data: footerData } = await runQuery(footerQuery, {
    parameters: { locale },
  });

  return (
    <footer className="flex flex-col gap-4 px-6 py-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 desktop:flex-1 desktop:flex-row desktop:justify-between">
        <div className="flex flex-col gap-4">
          <FMDLogo />
          <Typography variant="p2" className="whitespace-pre text-gray-700">
            {footerData?.description}
          </Typography>
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_130px] lg:gap-10">
          {footerData?.columns?.map((column) => (
            <div key={column._key} className="flex flex-col items-start gap-4 desktop:gap-2">
              <Typography variant="p1" className="leading-normal font-bold text-gray-600">
                {column.title}
              </Typography>
              {column.links?.map((link) => (
                <Link
                  key={link._key}
                  variant="link"
                  className="py-0 leading-normal font-normal whitespace-break-spaces"
                  link={link}
                />
              ))}
            </div>
          ))}
          {footerData?.contactColumn && (
            <div className="flex flex-col items-start gap-4">
              <Typography variant="p1" className="leading-normal font-bold text-gray-600">
                {footerData.contactColumn.title}
              </Typography>
              {footerData.contactColumn.email && (
                <Link
                  href={`mailto:${footerData.contactColumn.email}`}
                  variant="link"
                  className="font-normal"
                >
                  {footerData.contactColumn.email}
                </Link>
              )}
              {footerData.contactColumn.phone && (
                <Link
                  href={`tel:${footerData.contactColumn.phone}`}
                  variant="link"
                  className="font-normal"
                >
                  {footerData.contactColumn.phone}
                </Link>
              )}
              <div className="flex flex-row gap-8 pb-4 text-black desktop:gap-4">
                {footerData.contactColumn.socials?.map((social) => (
                  <Link
                    key={social._key}
                    href={social.link?.href ?? "#"}
                    variant="link"
                    noExternalIcon
                    className="block h-8 w-8 desktop:h-6 desktop:w-6"
                  >
                    {social.icon && (
                      <SanityImage
                        image={social.icon}
                        alt={social.platform ?? ""}
                        className="size-full"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 lg:w-[130px]">
            {footerData?.cta?.link && (
              <Link
                className="w-full"
                variant={footerData.cta.variant}
                link={footerData.cta.link}
              />
            )}
            <div className="self-start">
              <LocaleButtons />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-gray-700 desktop:flex-row desktop:justify-between">
        <Typography variant="p2">{footerData?.copyright}</Typography>
        <div className="flex flex-col items-start gap-8 desktop:flex-row desktop:gap-12">
          {footerData?.links?.map((link) => (
            <Link key={link._key} variant="link" link={link} className="leading-normal">
              <Typography variant="p2" className="font-normal">
                {link.text}
              </Typography>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
