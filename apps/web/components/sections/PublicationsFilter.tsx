// components/List/PublicationsFilter.tsx
import { advancedPublicationsQuery } from "../../sanity/queries/publications";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import { type Filter } from "../List/FilterList";
import { Container } from "../ui/container";
import { PublicationsFilterList } from "../List/instances/PublicationsFilterList";
import { runQuery } from "@/sanity/groqd";

const getPublicationsAction = async (params: any) => {
  "use server";

  const tagsParam = params.filters?.tags?.length > 0 ? params.filters.tags : null;
  const typeParam = params.filters?.pubType ? params.filters.pubType : null;
  const searchParam = params.q ? params.q : null;

  const sortParam = params.filters?.sort === "asc" ? "asc" : "desc";

  const res = await runQuery(
    advancedPublicationsQuery({
      page: params.page ?? 1,
      perPage: params.perPage,
      sortOrder: sortParam,
    }),
    {
      parameters: {
        locale: params.locale,
        type: typeParam,
        tags: tagsParam,
        searchTerm: searchParam,
        limit: params.perPage,
        offset: ((params.page ?? 1) - 1) * 9,
      },
    }
  );
  return res.data;
};

const PublicationsFilter = ({
  locale,
  data,
}: PageBuilderSectionProps<"publicationFilterSection">) => {
  const perPage = data.publicationsPerPage ?? 9;

  const filters: Filter[] = [
    {
      slug: "tags",
      multiple: true,
      options:
        (data as any).categories?.map((category: any) => ({
          label: category.title ?? "Brak nazwy",
          subgroups:
            category.tags?.map((tag: any) => ({
              label: tag.name ?? "Brak nazwy",
              value: tag.slug ?? "",
              type: "chip",
            })) ?? [],
        })) ?? [],
    },
    {
      slug: "pubType",
      multiple: false,
      options: [
        {
          label: data.filterPublications?.label ?? "Rodzaj publikacji",
          subgroups: Object.entries(data.filterPublications?.filterFields ?? {}).map(
            ([key, label]) => ({
              label: label as string,
              value: key,
              type: "radio" as const,
            })
          ),
        },
      ],
    },
  ];

  return (
    <Container>
      <PublicationsFilterList
        filters={filters}
        queryAction={getPublicationsAction}
        locale={locale}
        perPage={perPage}
      />
    </Container>
  );
};

export default PublicationsFilter;
