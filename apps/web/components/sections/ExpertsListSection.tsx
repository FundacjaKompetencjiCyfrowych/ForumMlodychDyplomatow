import { getTranslations } from "next-intl/server";
import { runQuery } from "../../sanity/groqd";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import type { PaginationQueryFunction, PaginationResult } from "../../sanity/queries/pagination";
import { peoplePaginatedQuery, type PersonFull } from "../../sanity/queries/person";
import type { Filter, FilterParams } from "../List/FilterList";
import { ExpertsFilterList } from "../List/instances/ExpertsFilterList";
import { Container } from "../ui/container";

const queryPeople: PaginationQueryFunction<PersonFull, FilterParams> = async (params) => {
  "use server";
  const { data: res } = await runQuery(
    peoplePaginatedQuery({
      page: params.page ?? 1,
      perPage: 12,
    }),
    {
      parameters: {
        locale: params.locale,
        groups: (params.filters?.groups as string[]) ?? null,
        name: params.q ? `*${params.q}*` : null,
      },
    }
  );
  return res as PaginationResult<PersonFull>;
};

const ExpertsListSection = async ({
  locale,
  data,
}: PageBuilderSectionProps<"expertsListSection">) => {
  const t = await getTranslations({ locale });

  const filters: Filter[] = [
    {
      slug: "groups",
      multiple: true,
      options: [
        {
          label: t("people.allGroups"),
          default: true,
        },
        ...(data.groups
          ? data.groups.map(
              (group) =>
                ({
                  label: group.name ?? "",
                  value: group.subgroups ? undefined : (group.slug ?? ""),
                  subgroups: group.subgroups?.map((subgroup) => ({
                    label: subgroup.name ?? "",
                    value: subgroup.slug ?? "",
                  })),
                }) as Filter["options"][number]
            )
          : []),
      ],
    },
  ];
  return (
    <Container className="flex flex-col gap-8">
      <ExpertsFilterList filters={filters} queryAction={queryPeople} locale={locale} perPage={12} />
    </Container>
  );
};

export default ExpertsListSection;
