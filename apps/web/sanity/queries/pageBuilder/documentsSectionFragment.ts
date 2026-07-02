import { q } from "@/sanity/groqd";
import type { InferFragmentType } from "groqd";
import type { PageBuilderSection } from ".";
import type { DeepGet } from "../../../lib/types";
import type { DocumentsSection } from "../../typegen";

// Typegen doesn't generate this type separately, so we need to extract it
type DocumentFileData = Extract<
  DeepGet<DocumentsSection, "groups.items">,
  {
    _type: "fileData";
  }
>;

export const documentFileFragment = q.fragment<DocumentFileData>().project((sub) => ({
  file: sub
    .field("file.asset")
    .deref()
    .project((sub) => ({
      _id: sub.field("_id"),
      name: sub.coalesce(sub.field("title"), sub.field("originalFilename")),
      size: sub.field("size"),
      url: sub.field("url"),
      updatedAt: sub.field("_updatedAt"),
    })),
  date: sub.field("date"),
  title: sub.field("title"),
}));
export const transformFile = (fileData: InferFragmentType<typeof documentFileFragment>) => ({
  name: fileData.title || fileData.file?.name || null,
  date: fileData.date || fileData.file?.updatedAt,
  size: fileData.file?.size || null,
  url: fileData.file?.url || null,
  _id: fileData.file?._id || null,
});
type DocumentGroup = DeepGet<DocumentsSection, "groups.items">;
export const documentGroupFragment = q.fragment<DocumentGroup>().project((sub) => ({
  _type: sub.field("_type"),
  _key: sub.field("_key"),
  ...sub.conditionalByType({
    fileData: (sub) => ({
      fileData: sub.project(documentFileFragment),
    }),
    documentSubgroup: (sub) => ({
      title: sub.field("title"),
      items: sub.field("items[]").project((sub) => ({
        fileData: sub.project(documentFileFragment),
      })),
    }),
  }),
}));

export const documentsSectionFragment = q
  .fragment<PageBuilderSection<"documentsSection">>()
  .project((sub) => ({
    groups: sub.field("groups[]").project((sub) => ({
      title: sub.field("title"),
      _key: sub.field("_key"),
      items: sub.field("items[]").project(documentGroupFragment),
    })),
  }));
