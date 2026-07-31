"use server";
import { getAuthorDisplayData, type AuthorInput } from "@/app/[locale]/publications/[slug]/helpers";

export const getAuthorDataAction = async (authors: AuthorInput[] | null, translations: any) => {
  return await getAuthorDisplayData(authors, translations);
};
