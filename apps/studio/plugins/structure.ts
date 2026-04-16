import { StructureToolOptions } from "sanity/structure";
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
            S.documentList()
              .title("Wybierz Kategorię")
              .filter(`_type == "tagCategory" && ${LANGAUGE_FIELD} == $lang`)
              .params({ lang: "pl" })
              .child((categoryId) =>
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
              )
          ),
        Collection(S, { type: "tagCategory", title: "Kategoria Tagów", icon: TagIcon }),
        S.divider().title("Ustawienia"),
        Singleton(S, { type: "settings", title: "Ustawienia", icon: CogIcon }),
        S.divider().title("Tłumaczenia"),
        Translations(S, { title: "Metadane", icon: TranslateIcon }),
      ]),
};
