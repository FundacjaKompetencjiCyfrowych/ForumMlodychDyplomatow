export const LANGUAGE_FIELD = "locale";

type LanguageConfig = {
  id: string;
  title: string;
};

export const LANGUAGES: LanguageConfig[] = [
  { id: "pl", title: "PL" },
  { id: "en", title: "EN" },
];

type DocumentConfig = {
  _type: string;
  id?: string;
  intl?: boolean;
  singleton?: boolean;
  path?: string;
  slug?: boolean;
};

// Please run `pnpm run singletons` to generate translation metadata pages when adding singleton types
export const DOCUMENTS: DocumentConfig[] = [
  // { _type: "home", id: "home", intl: true, singleton: true, root: true },
  { _type: "settings", id: "settings" },
  { _type: "page", intl: true, path: "/", slug: true },
  { _type: "post", intl: true, path: "/post", slug: true },
  { _type: "event", intl: true },
  { _type: "division", intl: true },
  { _type: "author", intl: true },
  { _type: "person", intl: true },
  { _type: "navigation", intl: true },
  { _type: "publication", intl: true },
  { _type: "tag", intl: true },
  { _type: "tagCategory", intl: true },
  { _type: "footer", intl: true, singleton: true },
  { _type: "translations", intl: true },
];
