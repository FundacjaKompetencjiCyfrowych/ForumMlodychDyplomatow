import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { trim } from "../../lib/text";
import type { BreadcrumbsFragment } from "../../sanity/queries/breadcrumbs";
import { Container } from "./container";
import { Link } from "./link";
import Typography from "./typography";

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" className={cn(className)} {...props} />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <Typography
      as="span"
      variant="body-m"
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-5 items-center justify-center [&>svg]:size-4", className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};

export const Breadcrumbs = ({
  breadcrumbs,
  currentPageName,
}: {
  breadcrumbs: BreadcrumbsFragment[];
  currentPageName: string | null;
}) => {
  return (
    <Container
      as="div"
      contentWidth="max"
      className="flex min-h-14 items-center justify-start py-0 desktop:py-0"
    >
      <Breadcrumb className="flex items-center justify-start text-gray-500">
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb) => (
            <React.Fragment key={`${breadcrumb._key}`}>
              <BreadcrumbItem>
                {breadcrumb._type === "breadcrumb" ? (
                  <BreadcrumbLink asChild>
                    <Link
                      size="inline"
                      variant="link"
                      className="font-normal text-gray-500"
                      link={breadcrumb.link}
                    >
                      {trim(breadcrumb.link.text, 50)}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-gray-500">
                    {trim(breadcrumb.text, 50)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
          {currentPageName && (
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">{trim(currentPageName, 50)}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </Container>
  );
};
