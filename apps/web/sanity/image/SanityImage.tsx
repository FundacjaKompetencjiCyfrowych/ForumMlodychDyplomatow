import { ComponentProps, ElementType } from "react";
import { SanityImage as Image, type CropData } from "sanity-image";
import type { ImgFragment } from "../queries/imgFragment";
import SVG from "react-inlinesvg";
import ClientSvg from "./ClientSvg";
type Sizes =
  | string
  | Partial<Record<"default" | "desktop" | "sm" | "md" | "lg" | "xl" | "2xl", string>>
  | undefined;

export type SanityImageProps = {
  image?: ImgFragment | null;
  preview?: boolean;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  mode?: "cover" | "contain";
  className?: string;
  as?: ElementType;
  sizes?: Sizes;
} & Omit<ComponentProps<"img">, "sizes">;

const minWidthMap = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  desktop: "768px",
};

const getSizes = (sizes: Sizes): string | undefined => {
  if (!sizes) return undefined;
  if (typeof sizes === "string") return sizes;

  return Object.entries(sizes)
    .map(([key, value]) =>
      key in minWidthMap
        ? `(min-width: ${minWidthMap[key as keyof typeof minWidthMap]}) ${value}`
        : value
    )
    .filter(Boolean)
    .join(", ");
};

/**
 * Component for rendering Sanity images
 * @see https://www.sanity.io/plugins/sanity-image
 */
export function SanityImage({ image, preview, sizes, ...props }: SanityImageProps) {
  if (!image?.asset) {
    console.warn("Missing Sanity image object in SanityImage component");
    return null;
  }
  const id = (image.asset as { _ref?: string; _id?: string })?._ref ?? image.asset?._id;
  const alt = props.alt ?? image.asset?.altText ?? "";

  if (preview && typeof window === "undefined") {
    throw new Error("Image preview can only be used in client components");
  }
  if (image.asset.extension === "svg" && typeof image.asset.url === "string") {
    return <ClientSvg id={id} src={image.asset.url} className={props.className} />;
  }
  const sizesValue = getSizes(sizes);
  if (image.asset.metadata?.lqip)
    if (image.asset)
      return (
        <Image
          id={id}
          alt={alt}
          hotspot={image.hotspot as { x: number; y: number }}
          crop={image.crop as CropData}
          preview={preview ? image.asset?.metadata?.lqip || undefined : undefined}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          sizes={sizesValue}
          queryParams={{ fm: "webp" }}
          {...props}
        ></Image>
      );
}
