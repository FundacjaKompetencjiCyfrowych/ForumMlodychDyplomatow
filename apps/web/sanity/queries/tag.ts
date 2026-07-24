import { q } from "../groqd";

export const tagCategoriesQuery = q.star
  .parameters<{ locale: string }>()
  .filterByType("tagCategory")
  .filter("locale == $locale") // Filtrujemy kategorie po języku
  .project((sub) => ({
    title: sub.field("title"),
    tags: q.star
      .filterByType("tag")
      .filter("category._ref == ^._id && locale == $locale") // Pobieramy tagi dla tej kategorii
      .project((tagSub) => ({
        name: tagSub.field("name"),
        slug: tagSub.field("slug.current"),
      })),
  }));
