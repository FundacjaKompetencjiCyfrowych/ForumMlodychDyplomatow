import { StructureToolOptions, type Child } from "sanity/structure";
import { SingleLanguageSingleton as Singleton, TranslationMetadata as Translations } from "./intl";
import { SingleLanguageList as Collection } from "./intl";
import { ComposeIcon, HomeIcon, UsersIcon, CogIcon, TranslateIcon, TagIcon } from "@sanity/icons";
import { LANGAUGE_FIELD } from "../config";

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
          .child(
            S.documentTypeList("tagCategory")
              .title("Wybierz Kategorię")
              .filter(`_type == "tagCategory" && ${LANGAUGE_FIELD} == $lang`)
              .params({ lang: "pl" })
              .child((categoryId, options) => {
                // Document to edit the category itself
                const categoryDocument = S.document()
                  .title("Kategoria")
                  .initialValueTemplate(`tagCategory_pl`, { lang: "pl" })
                  .schemaType("tagCategory")
                  .documentId(categoryId);

                // params is an empty object when editing an already existing document
                if (options?.params?.template) {
                  // If this is a new document, open it directly
                  return categoryDocument;
                }

                // list items when selecting an already existing category
                const category = S.listItem()
                  .id(categoryId)
                  .title("Kategoria")
                  .child(categoryDocument);
                const tags = S.listItem()
                  .id("tags")
                  .title("Tagi w tej kategorii")
                  .child(
                    S.documentList()
                      .title("Tagi w tej kategorii")
                      .filter(
                        `_type == "tag" && category._ref == $categoryId && ${LANGAUGE_FIELD} == $lang`
                      )
                      .params({ categoryId, lang: "pl" })
                      .initialValueTemplates([
                        S.initialValueTemplateItem("tag-by-category", {
                          categoryId,
                          lang: "pl",
                        }),
                      ])
                  );

                // custom list to combine category document and its tags in one view
                return S.list()
                  .title("Kategoria")
                  .items([category, tags])
                  .canHandleIntent((name, params) => {
                    if (name === "edit" && params?.id) {
                      return params.id === categoryId;
                    }
                    return false;
                  });
              })
          ),
        // can likely be removed now, since you can edit and add categories from the first menu directly
        // Collection(S, { type: "tagCategory", title: "Kategoria Tagów", icon: TagIcon }),
        S.divider().title("Ustawienia"),
        Singleton(S, { type: "settings", title: "Ustawienia", icon: CogIcon }),
        S.divider().title("Tłumaczenia"),
        Translations(S, { title: "Metadane", icon: TranslateIcon }),
      ]),
};
