import type { InferFragmentType, InferResultType } from "groqd";
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
export type SeoFragment = InferFragmentType<typeof seoFragment>;
export const defaultSeoSettingsQuery = q.star
  .filterByType("settings")
  .slice(0)
  .project((sub) => ({
    seo: sub.field("seo").project(seoFragment),
    logo: sub.field("logo.asset").deref().field("url"),
    baseUrl: sub.field("baseUrl"),
    siteName: sub.field("siteName"),
  }));
export type DefaultSeoSettings = InferResultType<typeof defaultSeoSettingsQuery>;

export const seoOrgQuery = q.star
  .filterByType("settings")
  .slice(0)
  .project((sub) => ({
    name: sub.field("organization.name"),
    logo: sub.field("logo.asset").deref().field("url"),
    url: sub.field("baseUrl"),
    socials: sub.field("organization.socials[]"),
    email: sub.field("organization.email"),
    phone: sub.field("organization.phone"),
  }));
