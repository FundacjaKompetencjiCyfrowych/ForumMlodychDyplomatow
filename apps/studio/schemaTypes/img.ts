import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { mediaAssetSource } from "sanity-plugin-media";

export const img = defineType({
  name: "img",
  title: "Obraz",
  type: "image",
  icon: ImageIcon,
  options: {
    hotspot: true,
    sources: [mediaAssetSource],
    disableNew: true,
  },
  preview: {
    select: {
      media: "asset",
    },
    prepare(selection) {
      return {
        title: "Obraz",
        media: selection.media,
      };
    },
  },
});

export const gradientImg = defineType({
  ...img,
  name: "gradientImg",
  title: "Obraz z gradientem",
  fields: [
    defineField({
      name: "gradient",
      type: "object",
      title: "Gradient",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "enabled",
          type: "boolean",
          title: "Włączony",
          initialValue: false,
        }),
        defineField({
          name: "color",
          type: "string",
          title: "Kolor",
          options: {
            list: [
              { title: "Czerwony", value: "red" },
              { title: "Niebieski", value: "blue" },
              { title: "Biały", value: "white" },
            ],
          },
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: "config",
          type: "array",
          title: "Konfiguracja",
          description: "",
          of: [
            defineArrayMember({
              name: "gradientConfig",
              type: "object",
              title: "Konfiguracja gradientu",
              preview: {
                select: {
                  direction: "direction",
                  size: "size",
                  color: "color",
                },
                prepare({ direction, size, color }) {
                  return {
                    title: `Gradient ${direction}`,
                    subtitle: `Size: ${size}, Color: ${color}`,
                  };
                },
              },
              fields: [
                defineField({
                  name: "direction",
                  type: "string",
                  title: "Kierunek",
                  options: {
                    list: [
                      { title: "Na górze", value: "top" },
                      { title: "Na dole", value: "bottom" },
                      { title: "Po lewej", value: "left" },
                      { title: "Po prawej", value: "right" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "desktopDirection",
                  type: "string",
                  title: "Kierunek na komputerze",
                  description:
                    "Kierunek na większych ekranach. Jeśli nie zostanie ustawiony, użyty zostanie kierunek mobilny.",
                  options: {
                    list: [
                      { title: "Na górze", value: "top" },
                      { title: "Na dole", value: "bottom" },
                      { title: "Po lewej", value: "left" },
                      { title: "Po prawej", value: "right" },
                    ],
                  },
                }),
                defineField({
                  name: "size",
                  type: "string",
                  title: "Rozmiar",
                  options: {
                    list: [
                      { title: "Bardzo mały", value: "xs" },
                      { title: "Mały", value: "sm" },
                      { title: "Średni", value: "md" },
                      { title: "Duży", value: "lg" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "desktopSize",
                  type: "string",
                  title: "Rozmiar na komputerze",
                  description:
                    "Rozmiar na większych ekranach. Jeśli nie zostanie ustawiony, użyty zostanie rozmiar mobilny.",
                  options: {
                    list: [
                      { title: "Bardzo mały", value: "xs" },
                      { title: "Mały", value: "sm" },
                      { title: "Średni", value: "md" },
                      { title: "Duży", value: "lg" },
                    ],
                  },
                }),
                defineField({
                  name: "color",
                  type: "string",
                  title: "Kolor",
                  options: {
                    list: [
                      { title: "Czerwony", value: "red" },
                      { title: "Niebieski", value: "blue" },
                      { title: "Biały", value: "white" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          hidden: ({ parent }) => !parent?.enabled,
        }),
      ],
    }),
  ],
});
