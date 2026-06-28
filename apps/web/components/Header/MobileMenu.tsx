import { Button } from "../ui/button";
import MenuIcon from "./MenuIcon";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { getLocale, getTranslations } from "next-intl/server";

type Props = {
  children?: React.ReactNode;
};

const MobileMenu = async ({ children }: Props) => {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "navigation" });
  return (
    <div className="flex justify-self-end md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="text-brand-red-900">
            <MenuIcon />
            <span className="sr-only">{t("menu")}</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          showOverlay={false}
          side="right"
          className="top-(--header-height-mobile)! z-40 max-h-[calc(100vh-var(--header-height-mobile))] w-full max-w-screen overflow-y-scroll px-4 pb-8"
        >
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
