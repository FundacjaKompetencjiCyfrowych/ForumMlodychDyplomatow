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
      'linkType == "page"': {
        href: sub.field("page").deref().field("slug.current"),
        text: sub.select(
          {
            "defined(text)": sub.field("text"),
          },
          sub.field("page").deref().field("name")
        ),
      },
      'linkType == "division"': {
        href: sub.field("division").deref().field("slug.current"),
        text: sub.select(
          {
            "defined(text)": sub.field("text"),
          },
          sub.field("division").deref().field("name")
        ),
      },
      'linkType == "publication"': {
        href: sub.field("publication").deref().field("slug.current"),
        text: sub.select(
          {
            "defined(text)": sub.field("text"),
          },
          sub.field("publication").deref().field("title")
        ),
      },
    },
    {
      isExhaustive: true,
    }
  ),
  openInNewTab: sub.field("openInNewTab"),
}));

export const linkButtonFragment = q.fragment<LinkButton & { _key: string }>().project((sub) => ({
  _key: sub.field("_key"),
  variant: sub.field("variant"),
  link: sub.field("link").project(linkFragment),
}));
