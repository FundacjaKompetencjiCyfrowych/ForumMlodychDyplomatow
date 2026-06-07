import { q } from "../groqd";
import { imgFragment } from "./imgFragment";

export const seoFragment = q.fragmentForType<"seo">().project((sub) => ({
  title: true,
  description: true,
  ogImage: sub.field("ogImage").deref().project(imgFragment),
  canonical: true,
  twitterCreator: true,
  robots: sub.field("robots").project({
    noIndex: true,
    noFollow: true,
  }),
}));
