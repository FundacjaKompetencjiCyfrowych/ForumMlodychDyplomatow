import { defineArrayMember, defineField, defineType } from "sanity";

export const personGroup = defineType({
  name: "personGroups",
  title: "Grupy osób",
  type: "document",
  preview: {
    prepare: () => ({
      title: "Grupy osób",
    }),
  },
  fields: [
    defineField({
      name: "groups",
      title: "Grupy",
      type: "array",
      of: [
        defineArrayMember({
          name: "group",
          title: "Grupa",
          type: "object",
          preview: {
            select: {
              title: "name.0.value",
            },
          },
          fields: [
            defineField({
              name: "name",
              title: "Nazwa grupy",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (_, ctx) => (ctx.parent as any)?.name?.[0]?.value,
              },
              description: "Unikalny identyfikator grupy, używany w url",
              hidden: (ctx) => (ctx.parent?.subgroups as any[])?.length > 0, // ukryj pole slug, jeśli grupa ma podgrupy
              validation: (Rule, ctx) => (ctx?.hidden ? Rule.skip() : Rule.required()),
            }),

            defineField({
              name: "subgroups",
              title: "Podgrupy",
              type: "array",
              description: "Podgrupy, pokazane jako rozwijane listy",
              of: [
                defineArrayMember({
                  name: "subgroup",
                  title: "Podgrupa",
                  type: "object",
                  preview: {
                    select: {
                      title: "name.0.value",
                    },
                  },
                  fields: [
                    defineField({
                      name: "name",
                      title: "Nazwa podgrupy",
                      type: "internationalizedArrayString",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "slug",
                      title: "Slug podgrupy",
                      type: "slug",
                      description: "Unikalny identyfikator podgrupy, używany w url",
                      options: {
                        source: (_, ctx) => (ctx.parent as any)?.name?.[0]?.value,
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
