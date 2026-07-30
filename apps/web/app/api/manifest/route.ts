import { MetadataRoute } from "next";
import { runQuery } from "../../../sanity/groqd";
import { globalMetadataQuery } from "../../../sanity/queries/seo";
export const revalidate = 3600;
export async function GET(): Promise<Response> {
  const { data } = await runQuery(globalMetadataQuery, {
    parameters: {},
    stega: false,
  });

  var manifest: MetadataRoute.Manifest = {
    name: data?.siteName!,
    short_name: data?.shortName!,
    description: data?.seo?.description!,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: data?.logo?.url
      ? [
          {
            src: data.logo.url,
            sizes: "any",
            type: data.logo.mimeType!,
          },
        ]
      : [],
  };
  return Response.json(manifest);
}
