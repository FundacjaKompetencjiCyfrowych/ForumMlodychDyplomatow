import { Button } from "../ui/button";
import MenuIcon from "./MenuIcon";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type Props = {
  children?: React.ReactNode;
};

const MobileMenu = ({ children }: Props) => (
  <div className="flex justify-self-end md:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        showOverlay={false}
        side="right"
        className="top-header-height-mobile! z-40 min-h-[100%-var(--header-height-mobile)] overflow-y-scroll px-4 pb-8"
      >
        {children}
      </SheetContent>
    </Sheet>
  </div>
);

export default MobileMenu;
