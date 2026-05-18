import { q } from "../groqd";
import { Link, type LinkButton } from "../typegen";
export const linkFragment = q.fragment<Link & { _key: string }>().project((sub) => ({
  _key: sub.field("_key"),
  linkType: sub.field("linkType"),
  ...sub.conditional(
    {
      'linkType == "href"': {
        href: sub.field("href"),
        text: sub.field("text"),
      },
      'linkType == "post"': {
        href: sub.select({
          "homepage==true": sub.value(""),
          "homepage!=true": sub.field("post").deref().field("slug.current"),
        }),
        text: sub.coalesce(sub.field("text"), sub.field("post").deref().field("title")),
      },
      'linkType == "page"': {
        href: sub.select({
          "homepage==true": sub.value(""),
          "homepage!=true": sub.field("page").deref().field("slug.current"),
        }),
        text: sub.coalesce(sub.field("text"), sub.field("page").deref().field("name")),
      },
      'linkType == "event"': {
        href: sub.select({
          "homepage==true": sub.value(""),
          "homepage!=true": sub.field("event").deref().field("slug.current"),
        }),
        text: sub.coalesce(sub.field("text"), sub.field("event").deref().field("name")),
      },
      'linkType == "division"': {
        href: sub.select({
          "homepage==true": sub.value(""),
          "homepage!=true": sub.field("division").deref().field("slug.current"),
        }),
        text: sub.coalesce(sub.field("text"), sub.field("division").deref().field("name")),
      },
    },
    {
      isExhaustive: true,
    }
  ),
  openInNewTab: sub.field("openInNewTab"),
  homepage: sub.field("homepage"),
}));

export const linkButtonFragment = q.fragment<LinkButton & { _key: string }>().project((sub) => ({
  _key: sub.field("_key"),
  variant: sub.field("variant"),
  link: sub.field("link").project(linkFragment),
}));
