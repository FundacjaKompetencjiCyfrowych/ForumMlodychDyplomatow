import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "../../sanity/client";
export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/ł/g, "l")
    .replace(/ś/g, "s")
    .replace(/ć/g, "c")
    .replace(/ń/g, "n")
    .replace(/ę/g, "e")
    .replace(/ą/g, "a")
    .replace(/ó/g, "o")
    .replace(/ź/g, "z")
    .replace(/ż/g, "z")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
export const builder = createImageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

export const getBlockText = (block: any) => {
  return block.children?.map((child: any) => child.text).join("") || "";
};
