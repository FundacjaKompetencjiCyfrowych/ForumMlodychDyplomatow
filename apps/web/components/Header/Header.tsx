import type { InferFragmentType, InferResultType } from "groqd";
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
import { Button } from "../ui/button";
import MobileMenu from "./MobileMenu";
import { SheetTitle } from "../ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import MobileMenuContent from "./MobileMenuContent";

export const navQuery = q.star
  .parameters<{ locale: string }>()
  .filterByType("navigation")
  .filterBy("locale == $locale")
  .slice(0)
  .project((sub) => ({
    button: sub
      .field("button[]")
      .project(linkButtonFragment)
      .transform((buttons) => buttons ?? []),
    links: sub
      .field("links[]")
      .project((sub) => ({
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
      }))
      .notNull(),
  }));

export type NavQueryResult = Exclude<InferResultType<typeof navQuery>, null>;

const Header = async () => {
  const locale = await getLocale();
  const navigation = await runQuery(navQuery, {
    parameters: { locale },
  });
  return (
    <NavigationMenu
      orientation="horizontal"
      viewport={false}
      className="sticky top-0 flex flex-row md:flex-col w-full max-w-full gap-0 bg-header"
    >
      <div className="max-w-full relative h-header-height-mobile md:h-header-height-mobile grid grid-cols-2 md:grid-cols-3 w-full isolate z-50 items-center  px-6 md:px-12 ">
        <Link href="/" className="text-2xl font-bold justify-self-start">
          FKD Logo
        </Link>

        <div className="hidden md:flex self-center items-center justify-center">
          <NavigationMenuList className="flex self-center items-center gap-5">
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
        </div>
        <div className="hidden md:flex gap-8 justify-self-end items-center">
          <LocaleButtons />

          {navigation?.button?.map(
            (button) =>
              button.link && <Link key={button._key} variant={button.variant} link={button.link} />
          )}
        </div>
        <MobileMenu>
          <VisuallyHidden asChild>
            <SheetTitle className="hidden">Menu</SheetTitle>
          </VisuallyHidden>
          {navigation && <MobileMenuContent navigation={navigation} />}
          <div className="justify-self-end mt-auto flex flex-col gap-6 items-stretch">
            <div className="flex flex-col gap-2 items-stretch">
              {navigation?.button?.map(
                (button) =>
                  button.link && (
                    <Link key={button._key} variant={button.variant} link={button.link} />
                  )
              )}
            </div>
            <div className="flex items-center justify-center">
              <LocaleButtons />
            </div>
          </div>
        </MobileMenu>
      </div>

      <NavigationMenuViewport wrapClassName="w-full" className=" w-full max-w-full" />
    </NavigationMenu>
  );
};

export default Header;
