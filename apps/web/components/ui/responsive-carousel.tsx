"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselControls } from "./carousel";

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
        {/*
         * ml-0 overrides the default -ml-4 in CarouselContent (which exists to
         * compensate for pl-4 on CarouselItem children – we handle padding ourselves).
         */}
        <CarouselContent className={cn("ml-0", contentClassName)}>
          {items.map((child, i) => (
            <div
              key={i}
              className={cn(
                // Mobile: full-width slide, centred with side padding
                "flex min-w-full items-stretch justify-stretch px-4",
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
