"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

type ResponsiveCarouselProps = {
  children: React.ReactNode;
  /** Extra classes on the outer wrapper */
  className?: string;
  /** Extra classes forwarded to the CarouselContent inner flex container (e.g. "desktop:gap-6") */
  contentClassName?: string;
  /** Extra classes forwarded to each item wrapper */
  desktopItemClassName?: string;
};

/**
 * Renders children as a swipeable carousel on mobile and as a flex row on desktop.
 *
 * On mobile each item occupies the full carousel width with horizontal padding so
 * it appears centred.  On desktop the carousel layout is overridden via CSS and all
 * items are displayed side-by-side; the dot controls are hidden.
 *
 * Children are rendered only once in the DOM.
 */
export function ResponsiveCarousel({
  children,
  className,
  contentClassName,
  desktopItemClassName,
}: ResponsiveCarouselProps) {
  const items = React.Children.toArray(children);

  return (
    // On desktop we force the embla viewport to be overflow-visible so all slides
    // show at once, then rely on the flex layout provided by CarouselContent.
    <div className={cn("desktop:**:data-[slot='carousel-content']:overflow-visible!", className)}>
      <Carousel className="max-w-full">
        <CarouselContent className={contentClassName}>
          {items.map((child, i) => (
            <div
              key={i}
              className={cn(
                // Mobile: full-width slide, centred with side padding + 1px vertical
                // padding so borders aren't clipped by the embla overflow container.
                "flex min-w-full items-stretch justify-stretch px-4 py-px",
                // Desktop: flexible equal-width column, no extra padding
                "desktop:min-w-0 desktop:flex-1 desktop:px-0",
                desktopItemClassName
              )}
            >
              {child}
            </div>
          ))}
        </CarouselContent>

        <CarouselControls className="desktop:hidden" />
      </Carousel>
    </div>
  );
}

type ButtonCarouselProps = {
  children: React.ReactNode;
  /** Extra classes on the Carousel root */
  className?: string;
  /** Extra classes forwarded to the CarouselContent inner flex container */
  contentClassName?: string;
  /**
   * Controls how many items are visible at once by setting the flex basis on each
   * slide wrapper.  Any Tailwind basis/width class works, including responsive
   * variants.  Examples:
   *   "basis-full"                   → 1 item at a time (default)
   *   "basis-1/2"                    → 2 items
   *   "basis-1/3"                    → 3 items
   *   "basis-1/4"                    → 4 items
   *   "basis-full desktop:basis-1/4" → 1 on mobile, 4 on desktop
   */
  itemClassName?: string;
};

/**
 * A carousel with previous / next arrow buttons, visible on all breakpoints.
 * Use `itemClassName` to control how many items are visible at once.
 */
export function ButtonCarousel({
  children,
  className,
  contentClassName,
  itemClassName,
}: ButtonCarouselProps) {
  const items = React.Children.toArray(children);

  return (
    // px-10 reserves space on each side for the absolutely-positioned buttons so
    // the CarouselContent shrinks inward instead of being obscured.
    // left-0 / right-0 override the default -left-12 / -right-12 so the buttons
    // stay inside the container on all screen sizes.
    <Carousel
      className={cn(
        "align-stretch grid grid-cols-[36px_1fr_36px] content-stretch items-stretch justify-stretch gap-4",
        className
      )}
      opts={{
        align: "start",
      }}
    >
      <CarouselPrevious className="self-center" />

      <CarouselContent className={contentClassName}>
        {items.map((child, i) => (
          <div
            key={i}
            className={cn("shrink-0 grow-0 px-2 desktop:px-3", itemClassName ?? "basis-full")}
          >
            {child}
          </div>
        ))}
      </CarouselContent>

      <CarouselNext className="self-center" />
    </Carousel>
  );
}
