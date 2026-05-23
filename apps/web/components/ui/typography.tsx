import { cva, type VariantProps } from "class-variance-authority";
import React, { type ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { Slot } from "radix-ui";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      hero: "text-[34px] leading-[1.4] font-bold desktop:text-[3.5rem] desktop:leading-[1.28]",
      title: "font-baskerville text-[30px] leading-[1.28] font-bold desktop:text-[3rem]",
      h1: "mb-4 text-[30px] leading-[1.28] font-bold desktop:text-[3rem]",
      h2: "mb-3.5 text-[26px] leading-[1.44] font-semibold desktop:text-[2.5rem]",
      h3: "mb-3 text-[22px] leading-[1.52] font-semibold desktop:text-[2rem]",
      h4: "mb-2 text-[20px] leading-[1.52] font-medium desktop:text-[1.75rem]",
      h5: "mb-1 text-[18px] leading-[1.52] font-medium desktop:text-[1.5rem]",
      h6: "font-open-sans mb-1 text-[1rem] leading-[1.28] font-semibold",
      p1: "text-[1rem] leading-[1.6]",
      p2: "text-[0.875rem] leading-[1.44]",
      caption: "text-[0.75rem] leading-[1.44]",
      eyebrow: "text-[0.875rem] leading-[1.28] font-semibold uppercase",
      "logo-s": "font-oswald text-[1rem] font-normal text-brand-red",
      "logo-m": "font-oswald text-[1.25rem] font-normal text-brand-red",
    },
    lineHeight: {
      default: "",
      none: "leading-none",
    },
  },
  defaultVariants: {
    lineHeight: "default",
  },
});
type Components = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
type Props<T extends Components> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
} & VariantProps<typeof typographyVariants> &
  ComponentProps<T>;

export const Typography = <T extends Components>({
  as: Component,
  children,
  className,
  variant,
  lineHeight,
  asChild = false,
}: Props<T>) => {
  const Comp = asChild ? Slot.Root : (Component ?? "p");
  return (
    <Comp className={cn(typographyVariants({ variant, lineHeight, className }))}>
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  );
};

export default Typography;
