import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { getLocale } from "next-intl/server";
import type { NavigationHeader, NavigationLinks } from "../../sanity/queries/navigation";
import { FMDLogo } from "../Icons/FMDLogo";
import { Link } from "../ui/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import { SheetTitle } from "../ui/sheet";
import { HeaderMenu } from "./HeaderDropdown";
import { HeaderTopLink } from "./HeaderTopLink";
import { LocaleButtons } from "./LocaleButtons";
import MobileMenu from "./MobileMenu";
import MobileMenuContent from "./MobileMenuContent";
import SkipToContent from "./SkipToContent";

const Header = async ({
  navigation,
  header,
}: {
  navigation: NavigationLinks;
  header: NavigationHeader;
}) => {
  const locale = await getLocale();
  // const { data: navigation } = await runQuery(navQuery, {
  //   parameters: { locale },
  // });
  return (
    <NavigationMenu
      orientation="horizontal"
      viewport={false}
      className="sticky top-0 z-50 flex w-full max-w-screen flex-row gap-0 border border-gray-200 bg-header md:flex-col"
    >
      <div className="relative isolate z-80 grid h-(--header-height-mobile) w-full max-w-screen grid-cols-2 items-center px-6 md:grid-cols-3 md:px-12 desktop:h-(--header-height-desktop)">
        <div className="flex flex-col items-start">
          <Link href="/" className="justify-self-start text-2xl font-bold no-underline">
            <FMDLogo />
          </Link>
          <SkipToContent locale={locale} />
        </div>
        <div className="hidden items-center justify-center self-center md:flex">
          <NavigationMenuList className="flex items-center gap-5 self-center">
            {navigation?.map((navItem) =>
              navItem._type === "dropdown" ? (
                <HeaderMenu key={navItem._key} dropdown={navItem} />
              ) : (
                <NavigationMenuItem key={navItem._key}>
                  <HeaderTopLink variant="nav" size="inline" link={navItem.link} />
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </div>
        <div className="hidden items-center gap-8 justify-self-end md:flex">
          <LocaleButtons />

          {header?.button && (
            <Link key={header.button._key} variant="secondary" link={header.button} />
          )}
        </div>
        <MobileMenu>
          <VisuallyHidden asChild>
            <SheetTitle className="hidden">Menu</SheetTitle>
          </VisuallyHidden>
          {navigation && <MobileMenuContent navigation={navigation} />}
          <div className="mt-auto flex flex-col items-stretch gap-6">
            <div className="flex flex-col items-stretch gap-2">
              {header?.button && (
                <Link
                  key={header.button._key}
                  variant="primary"
                  className="w-full"
                  link={header.button}
                />
              )}
            </div>
            <div className="flex items-center justify-center">
              <LocaleButtons />
            </div>
          </div>
        </MobileMenu>
      </div>
    </NavigationMenu>
  );
};

export default Header;
