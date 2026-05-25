import type { Locale } from "next-intl";
import type { CombinedEventsQueryResult } from "../../sanity/queries/events";
import EventList, { type EventListLimits } from "./EventList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { getTranslations } from "next-intl/server";

type EventTabsProps = {
  query: Promise<{ data: CombinedEventsQueryResult }>;
  locale: Locale;
} & EventListLimits;

export const EventTabs = async ({ query, ...rest }: EventTabsProps) => {
  const t = await getTranslations("events");
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="upcoming" className="grow-0">
          {t("upcoming")}
        </TabsTrigger>
        <TabsTrigger value="archived" className="grow-0">
          {t("archived")}
        </TabsTrigger>
      </TabsList>
      <Suspense fallback={<Skeleton className="h-40" />}>
        <EventTabsContent query={query} {...rest} />
      </Suspense>
    </Tabs>
  );
};

export const EventTabsContent = async ({ query, ...rest }: EventTabsProps) => {
  const { data: events } = await query;

  return (
    <>
      <TabsContent value="upcoming" className="w-full!">
        <EventList events={events.upcoming} {...rest} />
      </TabsContent>
      <TabsContent value="archived" className="w-full!">
        <EventList events={events.archived} {...rest} isArchive={true} />
      </TabsContent>
    </>
  );
};
