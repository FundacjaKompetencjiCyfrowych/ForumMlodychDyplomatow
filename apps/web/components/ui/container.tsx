import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

const containerStyles = cva("w-full ", {
  variants: {
    size: {
      base: "px-2 desktop:px-22 desktop:pb-24 pb-14 pt-14 desktop:pt-24",
      stretch: "px-0 pb-14 pt-12 desktop:pt-26",
    },
    background: {
      default: "bg-transparent text-gray-900",
      blue: "bg-brand-blue text-gray-50",
      red: "bg-brand-red text-gray-50",
    },
    override: {
      none: "",
      "mobile-stretch": "px-0 desktop:px-22",
    },
  },
  defaultVariants: {
    size: "base",
    background: "default",
    override: "none",
  },
});

export const Container = ({
  children,
  className,
  as: Component = "section",
  size,
  override = "none",
  background,
}: Props & VariantProps<typeof containerStyles>) => {
  return (
    <Component className={cn(containerStyles({ size, background, override, className }))}>
      {children}
    </Component>
  );
};
