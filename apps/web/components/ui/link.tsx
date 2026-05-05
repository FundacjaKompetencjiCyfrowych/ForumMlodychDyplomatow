import React from "react";
import { Link as BaseLink } from "@/i18n/navigation";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import type { InferFragmentType } from "groqd";
import type { linkFragment } from "../../sanity/queries/linkFragment";
type LinkType = InferFragmentType<typeof linkFragment>;
type LinkOrHref = { link: LinkType; href?: undefined } | { href: string; link?: undefined };
const slugsByType = {
  page: "/",
  post: "/post/",
} satisfies Record<Exclude<LinkType["linkType"], "href" | null | undefined>, string>;
export const Link = ({
  children,
  className,
  variant = "link",
  size = "m",
  iconLeft = null,
  iconRight = null,
  link,
  href,
  ...props
}: Omit<React.ComponentProps<typeof BaseLink>, "href"> &
  VariantProps<typeof buttonVariants> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  } & LinkOrHref) => {
  const getHref = (): string => {
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
    if (link.linkType === "page" && link.href == "home") {
      return "/";
    }

    return `${slugsByType[link.linkType]}${link.href}`;
  };
  return (
    <BaseLink
      href={getHref()}
      target={link?.openInNewTab ? "_blank" : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft}
      {children ?? (link ? link.text : null)}
      {iconRight}
    </BaseLink>
  );
};
