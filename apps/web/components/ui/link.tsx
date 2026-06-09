import { Link as BaseLink } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import type { InferFragmentType } from "groqd";
import React from "react";
import type { linkFragment } from "../../sanity/queries/linkFragment";
import { buttonVariants } from "./button";
import ClientSvg from "../../sanity/image/ClientSvg";
type LinkType = InferFragmentType<typeof linkFragment>;
type LinkOrHref =
  | {
      link: LinkType;
      href?: undefined;
      searchParams?: undefined;
    }
  | {
      href: string;
      link?: undefined;
      searchParams?: undefined;
    }
  | {
      href?: string;
      link?: undefined;
      searchParams?: Record<string, string | string[] | undefined>;
    };
const slugsByType = {
  page: "/",
  event: "/events/",
  division: "/division/",
  publication: "/publications/",
} satisfies Record<Exclude<LinkType["linkType"], "href" | null | undefined>, string>;

const ExternalLinkIcon = () => {
  return <ClientSvg src="/static/icons/external-link.svg" className="size-[0.875em] self-center" />;
  // todo hydration errors with svg lib?
  // return null;
};

export const Link = ({
  children,
  className,
  variant = "link",
  size = "m",
  iconLeft = null,
  openInNewTab = false,
  iconRight = null,
  link,
  href,
  searchParams,
  noExternalIcon = false,
  ...props
}: Omit<React.ComponentProps<typeof BaseLink>, "href"> &
  VariantProps<typeof buttonVariants> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    openInNewTab?: boolean;
    noExternalIcon?: boolean;
  } & LinkOrHref) => {
  const getHref = ():
    | string
    | { pathname?: string; query: Record<string, string | string[] | undefined> } => {
    if (searchParams) {
      return {
        pathname: href,
        query: searchParams,
      };
    }
    if (href) {
      return href;
    }
    if (!link?.linkType) {
      console.warn("Link component received a link object with null or undefined linkType", link);
      return "#";
    }
    if (link.linkType === "href") {
      return link.href || "#";
    }
    if (link.homepage) {
      return slugsByType[link.linkType];
    }

    return `${slugsByType[link.linkType]}${link.href}`;
  };
  const isExternal = link?.linkType === "href" || href?.startsWith("http");
  const rightIcon = isExternal && !noExternalIcon ? <ExternalLinkIcon /> : iconRight;
  return (
    <BaseLink
      href={getHref()}
      target={link?.openInNewTab || openInNewTab ? "_blank" : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft}
      {children ?? (link ? link.text : null)}
      {rightIcon}
    </BaseLink>
  );
};
