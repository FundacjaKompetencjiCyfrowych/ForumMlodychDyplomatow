import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button flex shrink-0 items-center justify-center rounded-sm",
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
        primary:
          "active:brand-red-800 bg-brand-red-900 font-semibold text-white hover:bg-brand-red-700 disabled:bg-brand-red-50 disabled:text-gray-400",
        secondary:
          "border border-brand-red-900 bg-transparent font-semibold text-brand-red-900 hover:border-brand-red-700 hover:text-brand-red-700 active:border-brand-red-800 active:text-brand-red-800 disabled:border-brand-red-200 disabled:text-red-200",
        text: "border-transparent bg-transparent font-semibold text-brand-red-900 hover:text-brand-red-700 active:text-brand-red-900 disabled:text-gray-400",
        page: [
          "h-8 w-8 border-none bg-transparent text-slate-600",
          "hover:text-gray-900 active:bg-brand-red-700 active:text-white disabled:text-gray-400",
          "data-current:bg-brand-red-700 data-current:text-white",
        ],
        icon: [
          "bg-white text-brand-red-900 hover:bg-slate-50 hover:text-brand-red-700 active:border-brand-red-800 active:bg-brand-red-800 active:text-white disabled:border-gray-400 disabled:bg-brand-red-50 disabled:text-gray-400",
        ],
        link: "inline-flex text-gray-900 hover:text-brand-red-800 active:text-brand-red-900",
        nav: "gap-2 text-gray-700 decoration-2 underline-offset-4 hover:text-brand-red-700 data-current:underline",
        // not updated yet
        ghost: "typography-p1 border-0 bg-transparent text-gray-900 hover:bg-gray-100",
        dot: "h-2 w-2 rounded-full border-0 bg-slate-300 p-0! hover:bg-slate-400 data-active:bg-gray-800 data-active:hover:bg-gray-800",
        toggle:
          "flex gap-1 border-2 border-transparent bg-transparent p-8 text-gray-900 hover:text-brand-red-800 data-[state=on]:border-b-brand-red-800 data-[state=on]:text-brand-red",
      },
      size: {
        s: "h-8 gap-1 px-4 text-[0.75rem]",
        m: "h-10 gap-1.5 px-5 text-[0.875rem]",
        l: "h-13 gap-2 px-6 text-[1rem]",
        inline: "",
        "icon-sm": "p-1.5",
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
