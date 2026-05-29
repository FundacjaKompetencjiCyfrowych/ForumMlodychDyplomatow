export const createSectionPreview = (
  schemaTypeName: string,
  { title = "heading", subtitle = "subheading" }: { title?: string; subtitle?: string }
) => ({
  select: {
    subtitle,
  },
  prepare(selection: { subtitle?: string }) {
    return {
      title: title || schemaTypeName,
      subtitle: selection.subtitle,
      media: (
        <img
          src={`/static/page-builder-thumbnails/${schemaTypeName}.webp`}
          alt={schemaTypeName}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ),
    };
  },
});
