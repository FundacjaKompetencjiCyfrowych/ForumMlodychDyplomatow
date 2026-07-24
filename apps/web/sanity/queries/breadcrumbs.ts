import type { InferFragmentType } from "groqd";
import { q } from "../groqd";
import type { Breadcrumbs } from "../typegen";
import { linkFragment } from "./linkFragment";

// Something went wrong with sanity typegen, so I'm manually changing the type of link to "breadcrumb"

type FixBreadcrumbs<T> =
  | (Omit<Extract<T, { _type: "link" }>, "_type"> & { _type: "breadcrumb" })
  | Extract<T, { _type: "label" }>;

export const breadcrumbsFragment = q
  .fragment<FixBreadcrumbs<Breadcrumbs[number]>>()
  .project((sub) => ({
    _key: sub.field("_key"),
    _type: sub.field("_type"),
    ...sub.conditionalByType({
      breadcrumb: { link: sub.project(linkFragment) },
      label: { text: sub.field("text") },
    }),
  }));

export type BreadcrumbsFragment = InferFragmentType<typeof breadcrumbsFragment>;
