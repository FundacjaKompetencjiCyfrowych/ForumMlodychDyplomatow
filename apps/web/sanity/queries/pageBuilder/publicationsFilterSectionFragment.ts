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

    publicationTypes: sub.star
      .filterByType("publicationType")
      .filter("locale == $locale")
      .order("title asc")
      .project((pubTypeSub) => ({
        _id: pubTypeSub.field("_id"),
        title: pubTypeSub.field("title"),
        slug: pubTypeSub.field("slug.current"),
      })),

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
    })),
  }));
