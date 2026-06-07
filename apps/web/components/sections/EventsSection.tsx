import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { getHeading } from "../../lib/heading";
import { runQuery } from "../../sanity/groqd";
import { combinedEventsQuery } from "../../sanity/queries/events";
import { Container } from "../ui/container";
import { EventTabs } from "../Events/event-tabs";
import Typography from "../ui/typography";
import { Link } from "../ui/link";
import { ChevronRight } from "lucide-react";

const EventsSection = async ({ data, index, locale }: PageBuilderSectionProps<"eventsSection">) => {
  const eventQuery = runQuery(combinedEventsQuery, {
    parameters: {
      locale,
      limit: 2,
      divisionSlug: null,
      currentDate: new Date().toISOString(),
    },
  });
  return (
    <Container className="flex flex-col items-center gap-8">
      <Typography variant="h2" as={getHeading(index)}>
        {data.heading}
      </Typography>
      <EventTabs query={eventQuery} locale={locale} desktopLimit={2} mobileLimit={1} />
      {data.link && (
        <Link variant="text" link={data.link} iconRight={<ChevronRight />} className="self-end" />
      )}
    </Container>
  );
};

export default EventsSection;
