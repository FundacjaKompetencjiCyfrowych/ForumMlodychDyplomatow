import { ComponentProps, ElementType } from "react";
import { SanityImage as Image, type CropData } from "sanity-image";
import type { ImgFragment } from "../queries/imgFragment";

type SanityImageProps = {
  image?: ImgFragment | null;
  preview?: boolean;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  mode?: "cover" | "contain";
  className?: string;
  as?: ElementType;
} & ComponentProps<"img">;

/**
 * Component for rendering Sanity images
 * @see https://www.sanity.io/plugins/sanity-image
 */
export function SanityImage({ image, preview, ...props }: SanityImageProps) {
  if (!image?.asset) {
    console.warn("Missing Sanity image object in SanityImage component");
    return null;
  }
  const id = (image.asset as { _ref?: string; _id?: string })?._ref ?? image.asset?._id;
  const alt = props.alt ?? image.asset?.altText ?? "";

  if (preview && typeof window === "undefined") {
    throw new Error("Image preview can only be used in client components");
  }
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
          queryParams={{ fm: "webp" }}
          {...props}
        ></Image>
      );
}
