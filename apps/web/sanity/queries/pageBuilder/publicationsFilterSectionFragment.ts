import { q } from "@/sanity/groqd";
import type { PageBuilderSection } from ".";
import { type Locale } from "../intl";

export const publicationFilterSectionFragment = q
  .parameters<{ locale: Locale }>()
  .fragment<PageBuilderSection<"publicationFilterSection">>()
  .project((sub) => ({
    filterHeading: sub.field("filterHeading"),
    publicationsPerPage: sub.field("publicationsPerPage"),
    searchbarPlaceholder: sub.field("searchbarPlaceholder"),
    categories: sub.star
      .filterByType("tagCategory")
      .filter("locale == $locale")
      .order("title asc")
      .project((catSub) => ({
        _id: catSub.field("_id"),
        title: catSub.field("title"),
        tags: catSub.star
          .filterByType("tag")
          .filter("category._ref == ^._id && locale == $locale")
          .order("name asc")
          .project((tagSub) => ({
            name: tagSub.field("name"),
            slug: tagSub.field("slug.current"),
          })),
      })),
    filterPublications: sub.project((fields) => ({
      label: fields.field("filterPublications.label"),
      filterFields: fields.project((ff) => ({
        article: ff.field("filterPublications.filterFields.article"),
        news: ff.field("filterPublications.filterFields.news"),
        guide: ff.field("filterPublications.filterFields.guide"),
        review: ff.field("filterPublications.filterFields.review"),
      })),
    })),
  }));
