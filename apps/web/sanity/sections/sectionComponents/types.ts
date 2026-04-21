import type { PageBuilder } from "../../typegen";

export type Sections = PageBuilder[number];

export type SectionBase = {
  _key: string;
  _type: Sections["_type"];
};

export type PageBuilderSection<T extends PageBuilder[number]["_type"]> = {
  [K in T]: Extract<PageBuilder[number], { _type: K }>;
};
