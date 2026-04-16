import { Template } from "sanity";
import { LANGAUGE_FIELD } from "../config";

export const addTagTemplates = (prev: Template[]) => {
  return [
    ...prev,
    {
      id: "tag-by-category",
      title: "Tag z przypisaną kategorią",
      schemaType: "tag",
      parameters: [
        { name: "categoryId", type: "string" },
        { name: "lang", type: "string" },
      ],
      value: (params: any) => ({
        category: { _type: "reference", _ref: params?.categoryId },
        [LANGAUGE_FIELD]: params?.lang,
      }),
    },
  ];
};
