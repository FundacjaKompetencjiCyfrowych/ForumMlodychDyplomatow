import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

const containerStyles = cva("w-full", {
  variants: {
    size: {
      base: "px-2 desktop:px-22",
    },
    background: {
      default: "bg-transparent",
      blue: "bg-brand-blue",
      red: "bg-brand-red",
    },
  },
  defaultVariants: {
    size: "base",
    background: "default",
  },
});

export const Container = ({
  children,
  className,
  as: Component = "section",
  size,
}: Props & VariantProps<typeof containerStyles>) => {
  return <Component className={cn(containerStyles({ size, className }))}>{children}</Component>;
};
