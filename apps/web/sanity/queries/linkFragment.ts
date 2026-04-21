import { q } from "../groqd";
import { Link } from "../typegen";
export const linkFragment = q.fragment<Link>().project((sub) => ({
  linkType: true,
  href: sub.select({
    'linkType == "href"': sub.field("href"),
    'linkType == "post"': sub.field("post").deref().field("slug.current"),
    // 'linkType == "event"': sub.field("event->slug.current"),
    // 'linkType == "division"': sub.field("division->slug.current"),
  }),
  openInNewTab: true,
}));
