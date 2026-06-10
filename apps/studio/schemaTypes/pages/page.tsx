import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { languageField, uniqueByLanguage } from "../../plugins/intl";
import { seoField } from "../../utils/fields";
import { pageGroups } from "../../utils/groups";
import { Card, Text } from "@sanity/ui";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: pageGroups,

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: (
        <Card tone="primary" padding={4} radius={2} border>
          <Text size={1} muted style={{ marginTop: "0.5rem" }}>
            Dostępne specjalne podstrony:
            <ul>
              <li>
                Strona główna: <code>home</code>
              </li>
            </ul>
          </Text>
        </Card>
      ),
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 96,
        isUnique: uniqueByLanguage,
      },
    }),
    // TODO breadcrumbs
    defineField({
      name: "pageBuilder",
      title: "Page builder",
      type: "pageBuilder",
      group: "content",
    }),

    languageField,
    seoField,
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
