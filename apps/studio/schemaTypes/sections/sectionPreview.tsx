export const createSectionPreview = (
  schemaTypeName: string,
  {
    title = "heading",
    subtitle = "subheading",
    media = undefined,
  }: { title?: string; subtitle?: string; media?: string },
  values: { subtitle?: string; media?: string } = {}
) => ({
  select: {
    ...(subtitle ? { subtitle: subtitle } : {}),
    ...(media ? { media: media } : {}),
  },
  prepare(selection: { subtitle?: string; media?: any }) {
    return {
      title: title || schemaTypeName,
      subtitle: values.subtitle || selection.subtitle,
      media: selection.media ? (
        selection.media
      ) : (
        <img
          src={values.media || `/static/page-builder-thumbnails/${schemaTypeName}.webp`}
          alt={schemaTypeName}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ),
    };
  },
});
