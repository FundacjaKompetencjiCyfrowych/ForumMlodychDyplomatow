/**
 * Fallback images rendered by `SanityImage` when a document has no image yet.
 * The variant is chosen by the calling component, which knows what kind of
 * subject is missing.
 */
export const PLACEHOLDERS = {
  person: "/static/images/person_placeholder.webp",
  default: "/static/image/default_placeholder.webp",
} as const;

export type PlaceholderVariant = keyof typeof PLACEHOLDERS;
