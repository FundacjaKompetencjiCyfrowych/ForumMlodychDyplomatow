import React from "react";
import { Link as BaseLink } from "@/i18n/navigation";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import type { InferFragmentType } from "groqd";
import type { linkFragment } from "../../sanity/queries/linkFragment";
type LinkType = InferFragmentType<typeof linkFragment>;
type LinkOrHref = { link: LinkType } | { href: string };
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
  ...props
}: Omit<React.ComponentProps<typeof BaseLink>, "href"> &
  VariantProps<typeof buttonVariants> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  } & LinkOrHref) => {
  const getHref = (): string => {
    if ("href" in props) {
      return props.href;
    }
    if (props.link.linkType == null) {
      console.warn(
        "Link component received a link object with null or undefined linkType",
        props.link
      );
      return "#";
    }
    if (props.link.linkType === "href") {
      return props.link.href || "#";
    }
    if (props.link.linkType === "page" && props.link.href == "home") {
      return "/";
    }

    return `${slugsByType[props.link.linkType]}${props.link.href}`;
  };
  return (
    <BaseLink
      href={getHref()}
      target={"link" in props && props.link.openInNewTab ? "_blank" : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft}
      {children ?? ("link" in props ? props.link.text : null)}
      {iconRight}
    </BaseLink>
  );
};
