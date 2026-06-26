import { defineArrayMember, defineField, defineType } from "sanity";

export const socials = defineType({
  name: "socials",
  title: "Linki społecznościowe",
  type: "array",
  of: [
    defineArrayMember({
      name: "socialLink",
      title: "Link społecznościowy",
      type: "object",
      preview: {
        select: {
          title: "platform",
          subtitle: "url",
        },
        prepare: ({ title, subtitle }) => ({
          title: `Link ${title}`,
          subtitle,
        }),
      },
      fields: [
        defineField({
          name: "platform",
          title: "Platforma",
          type: "string",
          validation: (Rule) => Rule.required(),
          options: {
            list: [
              { title: "Facebook", value: "facebook" },
              { title: "Instagram", value: "instagram" },
              { title: "LinkedIn", value: "linkedin" },
              { title: "Twitter", value: "twitter" },
              { title: "YouTube", value: "youtube" },
              { title: "Spotify", value: "spotify" },
            ],
          },
        }),
        defineField({
          name: "url",
          title: "URL",
          type: "url",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }).required(),
        }),
      ],
    }),
  ],
});
