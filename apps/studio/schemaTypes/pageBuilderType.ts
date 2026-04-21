import { defineType } from "sanity";
import { sections } from "./sections/sections";

export const pageBuilder = defineType({
  name: "pageBuilder",
  title: "Page builder",
  type: "array",

  of: sections,
  options: {
    insertMenu: {
      // Configure groups for additional organization
      // groups: [
      //   {name: "main", title: "Główne", of: ["ctaSection"] }
      // ],
      // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/studio/array-type#efb1fe03459d
      views: [
        // Add a list view if desired
        // {name: "list"},
        {
          name: "grid",

          // Preview image is not required, it will display an icon defined in the section instead
          previewImageUrl: (schemaTypeName) =>
            `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
        },
      ],
    },
  },
});
