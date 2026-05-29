import { cva, type VariantProps } from "class-variance-authority";
import { SanityImage, type SanityImageProps } from "./SanityImage";
import { cn } from "../../lib/utils";

const gradientStyles = cva("absolute z-10", {
  variants: {
    direction: {
      top: "inset-0 bottom-auto bg-linear-to-b",
      bottom: "inset-0 top-auto bg-linear-to-t",
      left: "inset-0 right-auto bg-linear-to-r",
      right: "inset-0 left-auto bg-linear-to-l",
    },
    desktopDirection: {
      none: "",
      top: "desktop:inset-0 desktop:bottom-auto desktop:bg-linear-to-b",
      bottom: "desktop:inset-0 desktop:top-auto desktop:bg-linear-to-t",
      left: "desktop:inset-0 desktop:right-auto desktop:bg-linear-to-r",
      right: "desktop:inset-0 desktop:left-auto desktop:bg-linear-to-l",
    },
    size: {
      sm: "data-[dir=horizontal]:w-20 data-[dir=vertical]:h-20",
      md: "data-[dir=horizontal]:w-30 data-[dir=vertical]:h-30",
      lg: "data-[dir=horizontal]:w-40 data-[dir=vertical]:h-40",
      xl: "data-[dir=horizontal]:w-60 data-[dir=vertical]:h-60",
      "2xl": "data-[dir=horizontal]:w-80 data-[dir=vertical]:h-80",
    },
    // I'd love shorter classes for this but unfortunately I need to manually override width and height for both cases to get rid of mobile styling
    desktopSize: {
      none: "",
      sm: "desktop:data-[desktop-dir=horizontal]:h-auto desktop:data-[desktop-dir=horizontal]:w-20 desktop:data-[desktop-dir=vertical]:h-20",
      md: "desktop:data-[desktop-dir=horizontal]:h-auto desktop:data-[desktop-dir=horizontal]:w-30 desktop:data-[desktop-dir=vertical]:h-30",
      lg: "desktop:data-[desktop-dir=horizontal]:h-auto desktop:data-[desktop-dir=horizontal]:w-40 desktop:data-[desktop-dir=vertical]:h-40",
      xl: "desktop:data-[desktop-dir=horizontal]:h-auto desktop:data-[desktop-dir=horizontal]:w-60 desktop:data-[desktop-dir=vertical]:h-60",
      "2xl":
        "desktop:data-[desktop-dir=horizontal]:h-auto desktop:data-[desktop-dir=horizontal]:w-80 desktop:data-[desktop-dir=vertical]:h-80",
    },
    color: {
      white: "from-white to-transparent",
      blue: "from-brand-blue to-transparent",
      red: "from-brand-red to-transparent",
    },
  },
  defaultVariants: {
    desktopDirection: "none",
    desktopSize: "none",
    color: "white",
  },
});

type Props = {
  wrapperClassName?: string;
  gradientClassName?: string;
} & VariantProps<typeof gradientStyles> &
  SanityImageProps;
const getDir = (direction: Props["desktopDirection"]) => {
  if (direction === "top" || direction === "bottom") {
    return "vertical";
  }
  if (direction === "left" || direction === "right") {
    return "horizontal";
  }
  return undefined;
};
/**
 * Used to render an image with a gradient overlay, as seen in the hero and support us sections.
 *
 * The gradient direction and size can be configured separately for mobile and desktop using the
 * `direction`, `desktopDirection`, `size`, and `desktopSize` props.
 *
 * Desktop props are optional, if not provided the mobile style will be used for both.
 *
 * Accepts any SanityImage props to pass to the underlying SanityImage
 *
 * exposes wrapperClassName and gradientClassName for styling the image wrapper and gradient div directly if needed.
 *
 * Requires desktopSize to be set if you want a different desktopDirection (I'm not going to bother enforcing this with typescript)
 */
const GradientImage = ({
  color,
  desktopDirection,
  desktopSize,
  size,
  direction,
  wrapperClassName,
  gradientClassName,
  ...props
}: Props) => {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <SanityImage {...props} />
      <div
        data-dir={getDir(direction)}
        data-desktop-dir={getDir(desktopDirection)}
        className={cn(
          gradientStyles({ color, direction, desktopDirection, size, desktopSize }),
          gradientClassName
        )}
      />
    </div>
  );
};

export default GradientImage;
