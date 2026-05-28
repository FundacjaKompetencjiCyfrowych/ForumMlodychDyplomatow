import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex gap-2 shrink-0 items-center justify-center border-r-2 ",
    "border border-transparent bg-clip-padding text-[1rem] font-medium whitespace-nowrap",
    "transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive",
    "aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: "bg-brand-blue text-gray-50 hover:bg-blue-800",
        secondary: "border-2 border-brand-blue bg-transparent text-brand-blue hover:bg-blue-50",
        text: "border-2 border-transparent bg-transparent hover:border-gray-800",
        link: [
          "typography-p1",
          "border-bottom-2 border-0 border-transparent bg-transparent text-gray-900",
          "active:border-bottom-2 hover:text-red-800 active:text-red-900 data-active:text-brand-red",
          "p-0! active:border-red-800",
        ],
        ghost: "typography-p1 border-0 bg-transparent text-gray-900 hover:bg-gray-100",
        accent: "bg-brand-red text-gray-50 hover:bg-red-800",
        accentSecondary: "border-2 border-brand-red bg-transparent text-brand-red hover:bg-red-50",
        dot: "h-2 w-2 rounded-full border-0 bg-slate-300 p-0! hover:bg-slate-400 data-active:bg-gray-800 data-active:hover:bg-gray-800",
        icon: "rounded-[3px] bg-white text-gray-900 hover:bg-slate-200 active:bg-brand-blue active:text-slate-50 disabled:text-gray-500",
      },
      size: {
        m: "px-4 py-3",
        l: "px-4 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "m",
    },
  }
);

function Button({
  className,
  variant = "primary",
  size = "m",
  iconLeft = null,
  iconRight = null,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft}
      <Slot.Slottable>{children}</Slot.Slottable>
      {iconRight}
    </Comp>
  );
}

export { Button, buttonVariants };
