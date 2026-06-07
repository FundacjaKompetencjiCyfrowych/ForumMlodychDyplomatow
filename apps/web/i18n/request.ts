import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { runQuery } from "../sanity/groqd";
import { intlQuery } from "../sanity/queries/intl";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const { data: messages } = await runQuery(intlQuery, {
    parameters: { locale },
  });
  return {
    locale,
    messages: messages as any, // This is already typed in the query file
  };
});
