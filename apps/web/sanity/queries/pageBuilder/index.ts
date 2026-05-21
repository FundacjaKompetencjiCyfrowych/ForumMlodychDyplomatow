import type { InferFragmentType } from "groqd";
import { q } from "../../groqd";
import type { PageBuilder } from "../../typegen";

export const pageBuilderFragment = q.fragment<PageBuilder[number]>().project((sub) => ({
  _key: sub.field("_key"),
  _type: sub.field("_type"),
  ...sub.conditionalByType({
    // leadSection:
  }),
}));

export type PageBuilderData = Array<InferFragmentType<typeof pageBuilderFragment>>;

export type PageBuilderSection<T extends PageBuilderData[number]["_type"] = any> = Extract<
  PageBuilderData[number],
  { _type: T }
>;
