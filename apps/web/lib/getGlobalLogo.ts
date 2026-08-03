import { cache } from "react";
import { globalMetadataQuery } from "../sanity/queries/seo";
import { runQuery } from "../sanity/groqd";
import { PLACEHOLDERS } from "@/sanity/image/placeholders";

export const getGlobalLogo = cache(async () => {
  try {
    const { data } = await runQuery(globalMetadataQuery, { stega: false });
    return data?.logo?.url || PLACEHOLDERS.default;
  } catch {
    return PLACEHOLDERS.default;
  }
});
