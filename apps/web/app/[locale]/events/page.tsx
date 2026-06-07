import type { Locale } from "next-intl";
import { EventTabs } from "../../../components/Events/event-tabs";
import { runQuery } from "../../../sanity/groqd";
import { combinedEventsQuery } from "../../../sanity/queries/events";

type Params = {
  locale: Locale;
};
type SearchParams = {
  division?: string;
};
export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const { division } = await searchParams;
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
