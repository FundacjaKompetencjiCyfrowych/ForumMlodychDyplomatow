import { q } from "../groqd";
import { Link } from "../typegen";
export const linkFragment = q.fragment<Link & { _key: string }>().project((sub) => ({
  _key: sub.field("_key"),
  linkType: sub.field("linkType"),
  href: sub.select({
    'linkType == "href"': sub.field("href"),
    'linkType == "post"': sub.field("post").deref().field("slug.current"),
    // 'linkType == "event"': sub.field("event->slug.current"),
    // 'linkType == "division"': sub.field("division->slug.current"),
  }),
  text: sub.field("text"),
  openInNewTab: sub.field("openInNewTab"),
}));
