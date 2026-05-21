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
        primary: "bg-blue-900 text-gray-50 hover:bg-blue-800",
        secondary: "bg-transparent hover:bg-blue-50 text-blue-900 border-blue-900 border-2",
        text: "bg-transparent border-transparent border-2 hover:border-gray-800 ",
        link: [
          "typography-p1",
          "bg-transparent border-0 border-bottom-2 border-transparent text-gray-900",
          "hover:text-red-800 active:text-red-900 active:border-bottom-2 data-active:text-brand-red",
          "active:border-red-800 p-0!",
        ],
        ghost: "typography-p1 bg-transparent border-0 text-gray-900 hover:bg-gray-100",
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
