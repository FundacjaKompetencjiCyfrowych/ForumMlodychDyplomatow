import React from "react";
import { Link } from "../i18n/navigation";
import { sanityFetch } from "../sanity/live";
import { q } from "../sanity/groqd";
import { getLocale } from "next-intl/server";
import { linkFragment } from "../sanity/queries/linkFragment";
import type { InferResultType } from "groqd";

const navQuery = q.star
  .parameters<{ locale: string }>()
  .filterByType("navigation")
  .filterBy("locale == $locale")
  .slice(0)
  .project((sub) => ({
    links: sub.field("links[]").project((sub) => ({
      _key: sub.field("_key"),
      title: true,
      link: sub.field("link").project(linkFragment),
    })),
  }));
const Header = async () => {
  const locale = await getLocale();
  const navigation = (await sanityFetch({
    query: navQuery.query,
    params: { locale },
  })) as { data: InferResultType<typeof navQuery> };
  console.log({ navigation, locale });
  return (
    <nav className="grid grid-cols-3 bg-header px-12 py-5">
      <Link href="/" className="text-2xl font-bold">
        FKD Logo
      </Link>
      <div className="flex self-center items-center justify-center gap-5">
        {navigation.data?.links?.map((link) => (
          <Link key={link._key} href={link.link?.href || "/"} className="text-foreground">
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex gap-8">
        <button>something</button>
        <button>something</button>
      </div>
    </nav>
  );
};

export default Header;
