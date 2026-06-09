import { getTranslations } from "next-intl/server";
import { runQuery } from "../../sanity/groqd";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import type { PaginationQueryFunction, PaginationResult } from "../../sanity/queries/pagination";
import { peoplePaginatedQuery, type PersonFull } from "../../sanity/queries/person";
import { FilterList, type Filter, type FilterParams } from "../List/FilterList";
import { PersonCard } from "../People/PersonCard";
import { Container } from "../ui/container";
import Typography from "../ui/typography";

const queryPeople: PaginationQueryFunction<PersonFull, FilterParams> = async (params) => {
  const { data: res } = await runQuery(
    peoplePaginatedQuery({
      page: params.page ?? 1,
      perPage: params.perPage ?? 10,
      orderBy: params.orderBy as Parameters<typeof peoplePaginatedQuery>[0]["orderBy"],
      order: params.order as Parameters<typeof peoplePaginatedQuery>[0]["order"],
    }),
    {
      parameters: {
        locale: params.locale,
        groups: params.filters?.groups
          ? Array.isArray(params.filters.groups)
            ? params.filters.groups
            : [params.filters.groups]
          : null,
        name: params.q ? `*${params.q}*` : null,
      },
    }
  );
  return res as PaginationResult<PersonFull>;
};

const PersonCardComponent = ({ item }: { item: PersonFull }) => {
  return <PersonCard person={item} />;
};

const expertsFilterGroupIds = [
  "everything",
  "board",
  "regionalAuthority",
  "groupCoordinator",
  "author",
  "reviewer",
] as const;

const ExpertsListSection = async ({
  locale,
  searchParams,
}: PageBuilderSectionProps<"expertsListSection">) => {
  const t = await getTranslations();
  const filters: Filter[] = [
    {
      slug: "groups",
      label: t("people.groupName"),
      options: expertsFilterGroupIds.map((id) =>
        id === "everything"
          ? {
              label: t("people.groups.everything"),
              everything: true,
            }
          : {
              label: t(`people.groups.${id}`),
              value: id,
            }
      ),
    },
  ];
  return (
    <Container className="flex flex-col gap-8">
      <Typography variant="h3" className="-mt-20 opacity-30">
        UI nie jest finalne
      </Typography>
      <FilterList
        filters={filters}
        Component={PersonCardComponent}
        query={queryPeople}
        searchParams={searchParams}
        locale={locale}
      />
    </Container>
  );
};

export default ExpertsListSection;
