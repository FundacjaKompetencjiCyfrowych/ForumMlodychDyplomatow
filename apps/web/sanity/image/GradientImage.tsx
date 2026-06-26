import { SanityImage, type SanityImageProps } from "./SanityImage";
import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Direction = "top" | "bottom" | "left" | "right";
type Size = "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * A single gradient overlay config.
 *
 * `direction` / `desktopDirection` accept a single side or an array of sides.
 * When an array is given, each side renders its own gradient div sharing
 * the same size and color settings.
 *
 * `desktopDirection` is optional; when omitted the mobile direction(s) are
 * used on desktop as well.  If you change the direction axis at desktop
 * (e.g. vertical → horizontal) you should also set `desktopSize` so the
 * opposing dimension is reset correctly.
 *
 * `color` accepts the keywords "white" | "blue" | "red", or any raw Tailwind
 * gradient class string such as "from-brand-blue to-transparent".
 */
export type GradientConfig = {
  direction: Direction | Direction[];
  desktopDirection?: Direction;
  size?: Size;
  desktopSize?: Size;
  color?: "white" | "blue" | "red" | (string & {});
};

type Props = {
  /** Multiple independent gradient configs.  When provided, the flat
   *  direction/size/color props are ignored. */
  gradients?: GradientConfig | GradientConfig[];
  // ── Flat convenience props (single gradient) ──────────────────────────
  direction?: Direction | Direction[];
  desktopDirection?: Direction;
  size?: Size;
  desktopSize?: Size;
  color?: GradientConfig["color"];
  // ── Passthrough ───────────────────────────────────────────────────────
  wrapperClassName?: string;
  gradientClassName?: string;
} & SanityImageProps;

// ─── Lookup tables (no string interpolation → Tailwind can tree-shake) ────────

const dirClasses: Record<Direction, string> = {
  top: "inset-0 bottom-auto bg-linear-to-b",
  bottom: "inset-0 top-auto bg-linear-to-t",
  left: "inset-0 right-auto bg-linear-to-r",
  right: "inset-0 left-auto bg-linear-to-l",
};

const desktopDirClasses: Record<Direction, string> = {
  top: "desktop:inset-0 desktop:bottom-auto desktop:bg-linear-to-b",
  bottom: "desktop:inset-0 desktop:top-auto desktop:bg-linear-to-t",
  left: "desktop:inset-0 desktop:right-auto desktop:bg-linear-to-r",
  right: "desktop:inset-0 desktop:left-auto desktop:bg-linear-to-l",
};

/** Mobile size — axis derived from direction at render time. */
const mobileSizeClasses: Record<"horizontal" | "vertical", Record<Size, string>> = {
  horizontal: { sm: "w-20", md: "w-30", lg: "w-40", xl: "w-60", "2xl": "w-80" },
  vertical: { sm: "h-20", md: "h-30", lg: "h-40", xl: "h-60", "2xl": "h-80" },
};

/**
 * Desktop size classes.
 * Always resets the opposing dimension so axis-changing transitions work
 * without leftover mobile sizes leaking in.
 */
const desktopSizeClasses: Record<"horizontal" | "vertical", Record<Size, string>> = {
  horizontal: {
    sm: "desktop:w-20 desktop:h-auto",
    md: "desktop:w-30 desktop:h-auto",
    lg: "desktop:w-40 desktop:h-auto",
    xl: "desktop:w-60 desktop:h-auto",
    "2xl": "desktop:w-80 desktop:h-auto",
  },
  vertical: {
    sm: "desktop:h-20 desktop:w-auto",
    md: "desktop:h-30 desktop:w-auto",
    lg: "desktop:h-40 desktop:w-auto",
    xl: "desktop:h-60 desktop:w-auto",
    "2xl": "desktop:h-80 desktop:w-auto",
  },
};

const colorClasses: Record<string, string> = {
  white: "from-white to-transparent",
  blue: "from-brand-blue to-transparent",
  red: "from-brand-red to-transparent",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const axis = (dir: Direction) => (dir === "left" || dir === "right" ? "horizontal" : "vertical");

const toArray = <T,>(v: T | T[]): T[] => (Array.isArray(v) ? v : [v]);

const resolveColor = (color: GradientConfig["color"] = "white") => colorClasses[color] ?? color;

// ─── Single gradient div ──────────────────────────────────────────────────────

function GradientDiv({
  mobileDir,
  desktopDir,
  size = "md",
  desktopSize,
  color,
  gradientClassName,
}: {
  mobileDir: Direction;
  desktopDir?: Direction;
  size?: Size;
  desktopSize?: Size;
  color?: GradientConfig["color"];
  gradientClassName?: string;
}) {
  const mobileAxis = axis(mobileDir);
  // When desktopDir is set, compute the desktop size from desktopSize ?? size.
  const effectiveDesktopSize = desktopDir ? (desktopSize ?? size) : desktopSize;
  const desktopAxis = desktopDir ? axis(desktopDir) : mobileAxis;

  return (
    <div
      className={cn(
        "absolute z-10",
        dirClasses[mobileDir],
        mobileSizeClasses[mobileAxis][size],
        resolveColor(color),
        desktopDir && desktopDirClasses[desktopDir],
        effectiveDesktopSize && desktopSizeClasses[desktopAxis][effectiveDesktopSize],
        gradientClassName
      )}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Renders a SanityImage with one or more gradient overlays.
 *
 * **Single gradient** — use the flat convenience props:
 * ```tsx
 * <GradientImage direction="top" size="md" color="white" ... />
 * ```
 *
 * **Multiple gradients** — use the `gradients` prop:
 * ```tsx
 * <GradientImage
 *   gradients={[
 *     { direction: "top",  size: "md" },
 *     { direction: "left", size: "sm", color: "blue" },
 *   ]}
 *   ...
 * />
 * ```
 *
 * `direction` / `desktopDirection` accept a single side or an array of sides.
 * Each side renders its own div sharing the same size/color settings.
 */
const GradientImage = ({
  gradients,
  direction,
  desktopDirection,
  size,
  desktopSize,
  color,
  wrapperClassName,
  gradientClassName,
  ...props
}: Props) => {
  const configs: GradientConfig[] = gradients
    ? toArray(gradients)
    : direction
      ? [{ direction, desktopDirection, size, desktopSize, color }]
      : [];

  return (
    <div className={cn("relative", wrapperClassName)}>
      <SanityImage {...props} />
      {configs.map((cfg, cfgIdx) =>
        toArray(cfg.direction).map((mobileDir) => (
          <GradientDiv
            key={`${cfgIdx}-${mobileDir}`}
            mobileDir={mobileDir}
            desktopDir={cfg.desktopDirection}
            size={cfg.size}
            desktopSize={cfg.desktopSize}
            color={cfg.color}
            gradientClassName={gradientClassName}
          />
        ))
      )}
    </div>
  );
};

export default GradientImage;
