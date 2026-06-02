import { cva, type VariantProps } from "class-variance-authority";
import React, { type ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { Slot } from "radix-ui";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      hero: "desktop:text-[3.5rem] font-bold desktop:leading-[1.28] text-[34px] leading-[1.4]",
      title: "desktop:text-[3rem] font-bold font-baskerville leading-[1.28] text-[30px]",
      h1: "desktop:text-[3rem] font-bold leading-[1.28] text-[30px] mb-4",
      h2: "desktop:text-[2.5rem] font-semibold leading-[1.44] text-[26px] mb-3.5",
      h3: "desktop:text-[2rem] font-semibold leading-[1.52] text-[22px] mb-3",
      h4: "desktop:text-[1.75rem] font-medium leading-[1.52] text-[20px] mb-2",
      h5: "desktop:text-[1.5rem] font-medium leading-[1.52] text-[18px] mb-1",
      h6: "text-[1rem] font-semibold font-open-sans leading-[1.28] mb-1",
      p1: "text-[1rem] leading-[1.6]",
      p2: "text-[0.875rem] leading-[1.44]",
      caption: "text-[0.75rem] leading-[1.44]",
      eyebrow: "text-[0.875rem] font-semibold uppercase leading-[1.28]",
      "logo-s": "text-[1rem] text-brand-red font-normal font-oswald",
      "logo-m": "text-[1.25rem] text-brand-red font-normal font-oswald",
    },
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
  asChild = false,
}: Props<T>) => {
  const Comp = asChild ? Slot.Root : (Component ?? "p");
  return (
    <Comp className={cn(typographyVariants({ variant, className }))}>
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  );
};

export default Typography;
