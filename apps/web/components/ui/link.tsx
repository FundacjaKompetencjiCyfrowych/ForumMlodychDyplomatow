import { Link as BaseLink } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import type { InferFragmentType } from "groqd";
import React from "react";
import type { linkFragment } from "../../sanity/queries/linkFragment";
import { buttonVariants } from "./button";
type LinkType = InferFragmentType<typeof linkFragment>;
type LinkOrHref = { link: LinkType; href?: undefined } | { href: string; link?: undefined };
const slugsByType = {
  page: "/",
  post: "/post/",
  event: "/events/",
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
    if (link.homepage) {
      return slugsByType[link.linkType];
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
