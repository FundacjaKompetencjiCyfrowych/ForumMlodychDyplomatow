import { Button } from "../ui/button";
import MenuIcon from "./MenuIcon";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type Props = {
  children?: React.ReactNode;
};

const MobileMenu = ({ children }: Props) => (
  <div className="flex md:hidden justify-self-end">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        showOverlay={false}
        side="right"
        className="top-header-height-mobile! overflow-y-scroll min-h-[100%-var(--header-height-mobile)] pb-8 px-4 z-40"
      >
        {children}
      </SheetContent>
    </Sheet>
  </div>
);

export default MobileMenu;
