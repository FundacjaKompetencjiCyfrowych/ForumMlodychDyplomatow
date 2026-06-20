import { runQuery } from "../../sanity/groqd";
import { eventsPaginatedQuery, type EventPreview } from "../../sanity/queries/events";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import type { PaginationQueryFunction, PaginationResult } from "../../sanity/queries/pagination";
import { type Filter, type FilterParams } from "../List/FilterList";
import { EventsFilterList } from "../List/instances/EventsFilterList";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
const getEventsAction: PaginationQueryFunction<
  EventPreview,
  FilterParams<{ location: string[]; type: "archive" | "upcoming" }>
> = async (params) => {
  "use server";

  const res = await runQuery(
    eventsPaginatedQuery({
      page: params.page ?? 1,
      perPage: params.perPage ?? 4,
      archive: params.filters?.type === "archive",
    }),
    {
      parameters: {
        locale: params.locale,
        location: (params.filters?.location as string[] | null) ?? null,
        name: params.q ? `*${params.q}*` : null,
        type: params.filters?.type ?? "upcoming",
      },
    }
  );
  return res.data as PaginationResult<EventPreview>;
};
export const EventsListSection = async ({
  data,
  locale,
}: PageBuilderSectionProps<"eventsListSection">) => {
  const filters: Filter[] = [
    {
      slug: "location",
      multiple: true,
      options: [
        {
          label: "Online",
          value: "online",
        },
        ...(data.divisions?.map((division) => ({
          label: division.name ?? "",
          value: division.slug ?? "",
        })) ?? []),
      ],
    },
  ];
  return (
    <Container className="flex flex-col gap-8">
      <Typography variant="h3" className="-mt-20 opacity-30">
        UI nie jest finalne
      </Typography>
      <EventsFilterList
        filters={filters}
        queryAction={getEventsAction}
        locale={locale}
        perPage={4}
      />
    </Container>
  );
};
