import type { Link } from "../sanity/typegen";
import type { InferFragmentType } from "groqd";
import type { linkFragment } from "../sanity/queries/linkFragment";
import { runQuery } from "../sanity/groqd";
import { pagesLanguageSlugQuery } from "../sanity/queries/page";
import type { Locale } from "next-intl";
type LinkType = Extract<NonNullable<Link["linkType"]>, string>;

type ResultLinkType = InferFragmentType<typeof linkFragment>;

type Options = {
  openInNewTab?: boolean;
  slug: string | null;
  type: LinkType;
  text: string | null;
  homepage?: boolean;
  _type?: string;
};

export const formatLink = (options: Options) => {
  if (!options.slug) {
    throw new Error("Slug is required to format a link");
  }
  return {
    _type: options._type ?? "link",
    linkType: options.type,
    href: options.slug,
    homepage: options.homepage ?? false,
    _key: `${options.type}-${options.slug}`,
    openInNewTab: options.openInNewTab ?? false,
    text: options.text,
  } satisfies ResultLinkType & { _type: string };
};

export const tryGettingLocaleSlug = async (locale: Locale, slug: string) => {
  const { data: newSlug } = await runQuery(pagesLanguageSlugQuery, {
    parameters: {
      slug,
      locale,
    },
    stega: false,
  });
  return newSlug?.slug || (null as string | null);
};
