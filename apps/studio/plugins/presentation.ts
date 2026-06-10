import {
  defineDocuments,
  defineLocations,
  PresentationPluginOptions,
  type DocumentLocation,
} from "sanity/presentation";
import { DOCUMENTS, LANGUAGES, LANGUAGE_FIELD } from "../config";

const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";
/**
 * Formats a path by joining the provided segments and ensuring there are no duplicate slashes.
 * Automatically adds a leading slash to the path if necessary.
 * Omits any undefined and empty string segments from the resulting path.
 * @param args arguments to join into a path
 * @returns a joined path
 */
const joinPath = (...args: (string | undefined)[]) =>
  ["/", ...args.filter(Boolean)].join("/").replace(/\/+/g, "/");
const mainDocumentRoutes = DOCUMENTS.flatMap((doc) => {
  if (!doc.intl) {
    if (doc._type === "page") {
      return [
        {
          route: joinPath(":slug"),
          filter: `_type == "${doc._type}" && _id == "${doc.id || doc._type}"`,
        },
      ];
    }
    if (doc.slug && doc.path) {
      return [
        {
          route: joinPath(doc.path, ":slug"),
          filter: `_type == "${doc._type}" && slug.current == $slug`,
        },
      ];
    }
    if (doc.path) {
      return [
        {
          route: joinPath(doc.path),
          filter: `_type == "${doc._type}" && _id == "${doc.id || doc._type}"`,
        },
      ];
    }
    return [];
  }

  return LANGUAGES.flatMap(({ id: lang }) => {
    if (doc._type === "page") {
      return [
        {
          route: joinPath(lang, ":slug"),
          filter: `_type == "${doc._type}" && _id == "${doc.id || doc._type}-${lang}"`,
        },
      ];
    }
    if (doc.slug && doc.path) {
      return [
        {
          route: joinPath(lang, doc.path, ":slug"),
          filter: `_type == "${doc._type}" && slug.current == $slug && ${LANGUAGE_FIELD} == "${lang}"`,
        },
      ];
    }
    if (doc.path) {
      return [
        {
          route: joinPath(doc.path),
          filter: `_type == "${doc._type}" && _id == "${doc.id || doc._type}"`,
        },
      ];
    }
    return [];
  });
});

const locationResolvers: Record<string, ReturnType<typeof defineLocations>> = Object.fromEntries(
  DOCUMENTS.flatMap((doc): Array<[string, ReturnType<typeof defineLocations>]> => {
    if (doc.intl) {
      if (doc.slug && doc.path) {
        return [
          [
            doc._type,
            defineLocations({
              select: { title: "title", name: "name", slug: "slug.current", lang: LANGUAGE_FIELD },
              resolve: (d) => {
                const lang = d?.lang ?? LANGUAGES[0].id;

                const href = d?.slug
                  ? d.slug.replace("/", "") === "home"
                    ? joinPath(lang, doc.path)
                    : joinPath(lang, doc.path, d.slug)
                  : undefined;
                return {
                  locations: href
                    ? [
                        {
                          title: d?.title || d?.name || "Untitled",
                          href,
                        } satisfies DocumentLocation,
                      ]
                    : [],
                };
              },
            }),
          ],
        ];
      }

      /* if (doc.root) {
        return [
          [
            doc._type,
            defineLocations({
              select: { lang: LANGUAGE_FIELD },
              resolve: (d) => {
                const lang = d?.lang ?? LANGUAGES[0].id;
                return {
                  locations: [
                    {
                      title: `Home (${lang.toUpperCase()})`,
                      href: `/${lang}`,
                    } satisfies DocumentLocation,
                  ],
                };
              },
            }),
          ],
        ];
      } */

      // Translated singleton with path (non-root)
      return [
        [
          doc._type,
          defineLocations({
            select: { title: "title", name: "name", lang: LANGUAGE_FIELD },
            resolve: (d) => {
              const lang = d?.lang ?? LANGUAGES[0].id;
              return {
                locations: [
                  {
                    title: d?.title || d?.name || doc._type,
                    href: joinPath(lang, doc.path),
                  } satisfies DocumentLocation,
                ],
              };
            },
          }),
        ],
      ];
    }

    // Non-translated singleton with path
    if (doc.singleton || (!doc.slug && doc.path)) {
      return [
        [
          doc._type,
          defineLocations({
            locations: [{ title: doc._type, href: joinPath(doc.path) } satisfies DocumentLocation],
            message: "This document is used globally",
            tone: "positive" as const,
          }),
        ],
      ];
    }

    // Non-translated slug document
    if (doc.slug && doc.path) {
      return [
        [
          doc._type,
          defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (d) => ({
              locations: d?.slug
                ? [
                    {
                      title: d?.title || "Untitled",
                      href:
                        d.slug.replace("/", "") === "home"
                          ? joinPath(doc.path)
                          : joinPath(doc.path, d.slug),
                    } satisfies DocumentLocation,
                  ]
                : [],
            }),
          }),
        ],
      ];
    }

    return [];
  })
);

export const presentationConfig: PresentationPluginOptions = {
  previewUrl: {
    origin: SANITY_STUDIO_PREVIEW_URL,
    previewMode: {
      enable: "/api/draft-mode/enable",
    },
  },
  resolve: {
    mainDocuments: defineDocuments(mainDocumentRoutes),
    locations: locationResolvers,
  },
};
