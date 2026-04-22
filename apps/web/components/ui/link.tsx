import React from "react";
import { Link as BaseLink } from "@/i18n/navigation";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

const Link = ({
  children,
  href,
  className,
  variant = "link",
  size = "m",
  iconLeft = null,
  iconRight = null,
  ...props
}: React.ComponentProps<typeof BaseLink> &
  VariantProps<typeof buttonVariants> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  }) => {
  return (
    <BaseLink href={href} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {iconLeft}
      {children}
      {iconRight}
    </BaseLink>
  );
};

export default Link;
