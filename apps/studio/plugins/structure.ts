import { StructureToolOptions } from "sanity/structure";
import { SingleLanguageSingleton as Singleton, TranslationMetadata as Translations } from "./intl";
import { SingleLanguageList as Collection } from "./intl";
import {
  ComposeIcon,
  HomeIcon,
  LinkIcon,
  TranslateIcon,
  UsersIcon,
  CogIcon,
  TagIcon,
  EditIcon,
  CalendarIcon,
  EarthGlobeIcon,
} from "@sanity/icons";

import { LANGUAGE_FIELD } from "../config";
/**
 * Structure of the Sanity Studio
 * @see https://www.sanity.io/docs/studio/structure-tool
 */
export const structure: StructureToolOptions = {
  structure: (S) =>
    S.list()
      .id("content")
      .title("Content")
      .items([
        S.divider().title("Kolekcje"),
        Collection(S, { type: "page", title: "Strony", icon: HomeIcon }),
        S.listItem()
          .title("Osoby")
          .icon(UsersIcon)
          .child(S.documentTypeList("person").schemaType("person").title("Osoby")),
        S.listItem()
          .title("Grupy osób")
          .icon(UsersIcon)
          .child(
            S.document().documentId("personGroups").schemaType("personGroups").title("Grupy osób")
          ),
        Collection(S, { type: "publication", title: "Publikacje", icon: ComposeIcon }),
        S.listItem()
          .title("Tagi wg kategorii")
          .icon(TagIcon)
          .child(
            S.documentTypeList("tagCategory")
              .title("Wybierz kategorię")
              .filter(`_type == "tagCategory" && ${LANGUAGE_FIELD} == $lang`)
              .params({ lang: "pl" })
              .initialValueTemplates([S.initialValueTemplateItem("tagCategory_pl", { lang: "pl" })])
              .child((categoryId, options) => {
                const isNewDocument = options?.params?.template;

                const categoryDocument = S.document()
                  .title("Kategoria")
                  .initialValueTemplate(`tagCategory-pl`, { lang: "pl" })
                  .schemaType("tagCategory")
                  .documentId(categoryId);

                if (isNewDocument) {
                  return categoryDocument;
                }

                return S.list()
                  .title("Kategoria")
                  .items([
                    S.listItem()
                      .id(`category-edit-${categoryId}`)
                      .title("Edytuj kategorię")
                      .icon(EditIcon)
                      .child(categoryDocument),

                    S.listItem()
                      .id("category-tags")
                      .title("Tagi w tej kategorii")
                      .icon(TagIcon)
                      .child(
                        S.documentList()
                          .title("Lista tagów")
                          .filter(
                            `_type == "tag" && category._ref == $categoryId && ${LANGUAGE_FIELD} == $lang`
                          )
                          .params({ categoryId, lang: "pl" })
                          .initialValueTemplates([
                            S.initialValueTemplateItem("tag-by-category", {
                              categoryId,
                              lang: "pl",
                            }),
                          ])
                      ),
                  ])
                  .canHandleIntent((name, params) => name === "edit" && params?.id === categoryId);
              })
          ),
        Collection(S, { type: "event", title: "Wydarzenia", icon: CalendarIcon }),
        Collection(S, { type: "division", title: "Przedstawicielstwa", icon: EarthGlobeIcon }),
        S.divider().title("Ustawienia"),
        Singleton(S, { type: "settings", title: "Ustawienia", icon: CogIcon }),
        Singleton(S, { type: "navigation", title: "Nawigacja", icon: LinkIcon }),
        Singleton(S, { type: "footer", title: "Stopka", icon: LinkIcon }),
        S.divider().title("Tłumaczenia"),
        Translations(S, { title: "Metadane", icon: TranslateIcon }),
        Singleton(S, {
          type: "translations",
          id: "translations",
          title: "Tłumaczenia",
          icon: TranslateIcon,
        }),
      ]),
};
