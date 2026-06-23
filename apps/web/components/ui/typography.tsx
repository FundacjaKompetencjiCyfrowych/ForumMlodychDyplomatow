import { cva, type VariantProps } from "class-variance-authority";
import React, { type ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { Slot } from "radix-ui";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "font-lora text-[2.125rem] leading-tight font-semibold tracking-[-0.5%] desktop:text-[3.5rem] desktop:leading-[1.2] desktop:tracking-[-1%]",
      h2: "font-lora text-[1.75rem] leading-[1.3] font-semibold tracking-[-0.5%] desktop:text-[2.5rem] desktop:leading-tight desktop:tracking-[-0.5%]",
      h3: "font-lora text-[1.5rem] leading-[1.35] font-semibold desktop:text-[2rem] desktop:leading-[1.3] desktop:tracking-[-0.5%]",
      h4: "font-lora text-[1.25rem] leading-[1.4] font-semibold desktop:text-[1.5rem] desktop:leading-[1.35]",
      "body-xl": "text-[1.25rem] leading-[1.55]",
      "body-l": "text-[1.125rem] leading-[1.55]",
      "body-m": "text-[1rem] leading-[1.6]",
      "body-s": "text-[0.875rem] leading-[1.6]",
      caption: "text-[0.75rem] leading-normal",
      "title-l": "text-[1.25rem] leading-[1.3] font-semibold desktop:text-[1.5rem]",
      "title-m": "text-[1.125rem] leading-[1.4] font-semibold desktop:text-[1.25rem]",
      "title-s": "text-[1rem] leading-normal font-semibold desktop:text-[1rem]",

      // not updated yet
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
type Components =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "time"
  | "div"
  | "label"
  | "li"
  | "a";
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
