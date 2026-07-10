import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

type ContentWidth = "none" | "xl" | "max";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  contentWidth?: ContentWidth;
  contentClassName?: string;
};

const containerStyles = cva("w-full", {
  variants: {
    size: {
      base: "px-2 pt-14 pb-12 desktop:px-22 desktop:pt-24 desktop:pb-24",
      stretch: "px-0 pt-12 pb-14 desktop:pt-24",
    },
    background: {
      default: "bg-transparent text-gray-900",
      blue: "bg-brand-blue text-gray-50",
      red: "bg-brand-red text-gray-50",
      slate: "bg-(--color-brand-slate-50)",
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

const contentWidthStyles: Record<Exclude<ContentWidth, "none">, string> = {
  xl: "mx-auto w-full max-w-(--width-content-xl)",
  max: "mx-auto w-full max-w-(--width-content-max)",
};

export const Container = ({
  children,
  className,
  as: Component = "section",
  size,
  override = "none",
  background,
  contentWidth = "none",
  contentClassName,
}: Props & VariantProps<typeof containerStyles>) => {
  return (
    <Component className={cn(containerStyles({ size, background, override }), className)}>
      {contentWidth === "none" ? (
        children
      ) : (
        <div className={cn(contentWidthStyles[contentWidth], contentClassName)}>{children}</div>
      )}
    </Component>
  );
};
