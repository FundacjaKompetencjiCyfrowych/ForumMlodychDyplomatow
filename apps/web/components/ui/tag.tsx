import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link, type LinkProps } from "./link";

const tagVariants = cva(["inline-flex items-center justify-center"], {
  variants: {
    variant: {
      default:
        "rounded-md border border-brand-gray-400 px-2 text-[0.75rem] leading-normal text-brand-gray-600",
      hero: "text-[1rem] leading-[1.6] text-brand-gray-600",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TagBaseProps extends VariantProps<typeof tagVariants> {
  className?: string;
  children?: React.ReactNode;
}

type TagProps = TagBaseProps &
  (
    | {
        as?: "span" | "div" | "p";
        href?: never;
        searchParams?: never;
      }
    | {
        as?: never;
        href: LinkProps["href"];
        searchParams?: LinkProps["searchParams"];
      }
  );

export const Tag = ({
  className,
  variant,
  as: Component = "span",
  href,
  searchParams,
  children,
  ...props
}: TagProps & React.ComponentPropsWithoutRef<"span">) => {
  if (href || searchParams) {
    return (
      <Link
        href={("/publications?tags=" + href) as string}
        searchParams={searchParams}
        variant="none"
        size="inline"
        className={cn(tagVariants({ variant }), className)}
        {...(props as any)}
      >
        {children}
      </Link>
    );
  }

  return (
    <Component className={cn(tagVariants({ variant, className }), className)} {...props}>
      {children}
    </Component>
  );
};

export { tagVariants };
