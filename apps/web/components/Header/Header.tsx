import type { InferFragmentType } from "groqd";
import { getLocale } from "next-intl/server";
import { q, runQuery } from "../../sanity/groqd";
import { linkButtonFragment, linkFragment } from "../../sanity/queries/linkFragment";
import { Link } from "../ui/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuViewport,
} from "../ui/navigation-menu";
import { HeaderMenu } from "./HeaderDropdown";
import { LocaleButtons } from "./LocaleButtons";

export const navQuery = q.star
  .parameters<{ locale: string }>()
  .filterByType("navigation")
  .filterBy("locale == $locale")
  .slice(0)
  .project((sub) => ({
    button: sub.field("button[]").project(linkButtonFragment),
    links: sub.field("links[]").project((sub) => ({
      _key: true,
      ...sub.conditionalByType({
        link: (sub) => sub.project(linkFragment),
        dropdown: (sub) =>
          sub.project({
            name: true,
            header: true,
            description: true,
            columns: sub.field("columns[]").project((sub) => ({
              header: true,
              items: sub
                .field("items[]")
                .project(linkFragment)
                // groqd got confused here a bit, so I'm giving it the type manually
                .as<InferFragmentType<typeof linkFragment>[]>(),
            })),
          }),
      }),
    })),
  }));

const Header = async () => {
  const locale = await getLocale();
  const navigation = await runQuery(navQuery, {
    parameters: { locale },
  });

  return (
    <NavigationMenu
      orientation="horizontal"
      viewport={false}
      className="sticky top-0 flex flex-col w-full max-w-full gap-0"
    >
      <div className="max-w-full grid grid-cols-3 w-full items-center bg-header px-12 py-5">
        <Link href="/" className="text-2xl font-bold justify-self-start">
          FKD Logo
        </Link>

        <NavigationMenuList className="flex self-center items-center justify-center gap-5">
          {navigation?.links?.map((link) =>
            link._type == "dropdown" ? (
              <HeaderMenu key={link._key} dropdown={link} />
            ) : (
              <NavigationMenuItem key={link._key}>
                <Link href={link?.href || "/"}>{link.text}</Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
        <div className="flex gap-8 justify-self-end items-center">
          <LocaleButtons />

          {navigation?.button?.map(
            (button) =>
              button.link && <Link key={button._key} variant={button.variant} link={button.link} />
          )}
        </div>
      </div>

      <NavigationMenuViewport
        wrapClassName="w-full"
        className="h-0 w-full max-w-full overflow-visible"
      />
    </NavigationMenu>
  );
};

export default Header;
