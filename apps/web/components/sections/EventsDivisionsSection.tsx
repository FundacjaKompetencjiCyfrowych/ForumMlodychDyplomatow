// components/sections/EventsDivisions.tsx
import { runQuery } from "@/sanity/groqd"; // Twoja funkcja do zapytań
import { combinedEventsQuery } from "@/sanity/queries/events";
import { EventTabs } from "@/components/Events/event-tabs";
import Typography from "../ui/typography";

const EventsDivisions = async ({ data, locale }: any) => {
  const { header } = data;
  const divisionSlug = data.currentDivisionSlug;

  // Pobieramy dane bezpośrednio tutaj
  const eventsQuery = runQuery(combinedEventsQuery, {
    parameters: {
      locale,
      limit: 3,
      divisionSlug: divisionSlug,
      currentDate: new Date().toISOString(),
    },
  });

  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-8 py-12">
      <Typography as="h2" variant="h2">
        {header}
      </Typography>
      <EventTabs query={eventsQuery} locale={locale} />
    </section>
  );
};

export default EventsDivisions;
