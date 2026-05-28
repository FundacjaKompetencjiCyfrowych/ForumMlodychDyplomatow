import type { InferResultType } from "groqd";
import { q } from "../groqd";
import type { DeepNonNullable } from "../../lib/types";

export const intlQuery = q
  .parameters<{ locale: string }>()
  .star.filterByType("translations")
  .filterBy("locale == $locale")
  .slice(0)
  .project((_sub) => ({
    buttons: true,
    events: true,
  }));
/*
Use
`const t = await getTranslations("object");`
`return <div>{t("key")}</div>`
All strings should be type safe, in case you don't see your object check the projection above if it's included
And check if your dev server is running, as it needs to generate the schema to get typed properly.
*/

// Deep removal of null is required, otherwise intl doesn't really recognize the type.
// The values can still be null and will be replaced by a placeholder
export type Translations = DeepNonNullable<InferResultType<typeof intlQuery>>;
export type Locale = "pl" | "en";
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: Translations;
  }
}
