import { ImageResponse } from "next/og";
import { q, runQuery } from "../sanity/groqd";
import { imgFragment } from "../sanity/queries/imgFragment";
import Image from "next/image";

export const cache = "force-cache";
export const staleTime = 60 * 60 * 24; // 24 hours
export default async function FavIcon() {
  const header = await runQuery(
    q.star
      .filterByType("navigation")
      .slice(0)
      .project((sub) => ({
        logo: sub.field("logo").project(imgFragment),
      })),
    { stega: false }
  );
  if (!header.data?.logo?.asset?.url) {
    return new ImageResponse(<Image sizes="32" alt="favicon" src="/favicon.ico" />);
  }
  return new ImageResponse(<Image sizes="32" alt="favicon" src={header.data?.logo?.asset?.url} />);
}
