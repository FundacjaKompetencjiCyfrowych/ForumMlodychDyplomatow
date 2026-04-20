import { StructureToolOptions } from "sanity/structure";
import { SingleLanguageSingleton as Singleton, TranslationMetadata as Translations } from "./intl";
import { SingleLanguageList as Collection } from "./intl";
import { ComposeIcon, HomeIcon, UsersIcon, CogIcon, TranslateIcon, TagIcon, EditIcon } from "@sanity/icons";
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
        S.divider().title("Strony"),
        Singleton(S, { type: "home", title: "Strona główna", icon: HomeIcon }),
        S.divider().title("Kolekcje"),
        Collection(S, { type: "post", title: "Wpisy", icon: ComposeIcon }),
        Collection(S, { type: "author", title: "Autorzy", icon: UsersIcon }),
        Collection(S, { type: "publication", title: "Publikacje", icon: ComposeIcon }),
        S.listItem()
          .title("Tagi wg Kategorii")
          .icon(TagIcon)
          .child(
            S.documentTypeList("tagCategory")
              .title("Wybierz Kategorię")
              .filter(`_type == "tagCategory" && ${LANGUAGE_FIELD} == $lang`)
              .params({ lang: "pl" })
              .initialValueTemplates([
                S.initialValueTemplateItem("tagCategory_pl", { lang: "pl" }) 
              ])
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
                      .title("Edytuj Kategorię")
                      .icon(EditIcon)
                      .child(categoryDocument),


                    S.listItem()
                      .id("category-tags")
                      .title("Tagi w tej kategorii")
                      .icon(TagIcon)
                      .child(
                        S.documentList()
                          .title("Lista tagów")
                          .filter(`_type == "tag" && category._ref == $categoryId && ${LANGUAGE_FIELD} == $lang`)
                          .params({ categoryId, lang: "pl" })
                          .initialValueTemplates([
                            S.initialValueTemplateItem("tag-by-category", { categoryId, lang: "pl" }),
                          ])
                      ),
                  ])
                  .canHandleIntent((name, params) => name === "edit" && params?.id === categoryId);
              })
            ),
        S.divider().title("Ustawienia"),
        Singleton(S, { type: "settings", title: "Ustawienia", icon: CogIcon }),
        S.divider().title("Tłumaczenia"),
        Translations(S, { title: "Metadane", icon: TranslateIcon }),
      ]),
};
