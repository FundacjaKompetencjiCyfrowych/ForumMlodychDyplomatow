import type { Locale } from "next-intl";
import { EventTabs } from "../../../components/Events/event-tabs";
import { runQuery } from "../../../sanity/groqd";
import { combinedEventsQuery } from "../../../sanity/queries/events";
import { setRequestLocale } from "next-intl/server";

type Params = {
  locale: Locale;
};
type SearchParams = {
  division?: string;
};
export const revalidate = 3600; // 1 hour

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const { division } = await searchParams;
  setRequestLocale(locale ?? "pl");
  const query = runQuery(combinedEventsQuery, {
    parameters: {
      locale,
      limit: 10,
      divisionSlug: division ?? null,
      currentDate: new Date().toISOString(),
    },
  });
  return (
    <div className="flex flex-col">
      <h2 className="text-4xl">Wydarzenia</h2>
      <EventTabs query={query} locale={locale} />
    </div>
  );
}
