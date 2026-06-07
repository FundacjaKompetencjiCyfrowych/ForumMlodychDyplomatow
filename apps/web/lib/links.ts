import type { Link } from "../sanity/typegen";
import type { InferFragmentType } from "groqd";
import type { linkFragment } from "../sanity/queries/linkFragment";
type LinkType = Extract<NonNullable<Link["linkType"]>, string>;

type ResultLinkType = InferFragmentType<typeof linkFragment>;

type Options = {
  openInNewTab?: boolean;
  slug: string;
  type: LinkType;
  text: string | null;
};

export const formatLink = (options: Options): ResultLinkType => {
  return {
    linkType: options.type,
    href: options.slug,
    homepage: false,
    _key: `${options.type}-${options.slug}`,
    openInNewTab: options.openInNewTab ?? false,
    text: options.text,
  };
};
