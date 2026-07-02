import React from "react";
import { cn } from "../../lib/utils";
import type { NavigationLinks } from "../../sanity/queries/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { buttonVariants } from "../ui/button";
import { Link } from "../ui/link";

type Props = {
  navigation: NavigationLinks;
};
type NavItem = Exclude<NavigationLinks, null>[number];
type NavLink = Extract<NavItem, { _type: "link" }>;
type NavDropdown = Extract<NavItem, { _type: "dropdown" }>;

const MenuLinkItem = ({ link }: { link: NavLink }) => {
  return <Link link={link.link} variant="ghost" className="justify-start" />;
};
const MenuDropdownItem = ({ dropdown }: { dropdown: NavDropdown }) => {
  return (
    <AccordionItem value={dropdown._key}>
      <AccordionTrigger className={cn(buttonVariants({ variant: "ghost" }), "w-full")}>
        {dropdown.name}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col justify-start gap-2 pl-3">
        {dropdown.items?.map((item) => (
          <Link
            key={item._key}
            link={item}
            variant="ghost"
            className="justify-start text-start no-underline!"
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
const MobileMenuContent: React.FC<Props> = (props) => {
  return (
    <Accordion type="single" className="flex flex-col" collapsible>
      {props.navigation?.map((link) => {
        if (link._type === "link") {
          return <MenuLinkItem key={link._key} link={link} />;
        }
        if (link._type === "dropdown") {
          return <MenuDropdownItem key={link._key} dropdown={link} />;
        }
        return null;
      })}
    </Accordion>
  );
};

export default MobileMenuContent;
