import React, { Fragment } from "react";
import type { NavQueryResult } from "./Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Link } from "../ui/link";
import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";
import Typography from "../ui/typography";

type Props = {
  navigation: NavQueryResult;
};
type NavLink = Extract<NavQueryResult["links"][number], { _type: "link" }>;
type NavDropdown = Extract<NavQueryResult["links"][number], { _type: "dropdown" }>;

const MenuLinkItem = ({ link }: { link: NavLink }) => {
  return <Link link={link} variant="ghost" className="justify-start" />;
};
const MenuDropdownItem = ({ dropdown }: { dropdown: NavDropdown }) => {
  return (
    <AccordionItem value={dropdown._key}>
      <AccordionTrigger className={cn(buttonVariants({ variant: "ghost" }), "w-full")}>
        {dropdown.name}
      </AccordionTrigger>
      <AccordionContent className=" justify-start pl-3 flex flex-col gap-2">
        {dropdown.columns?.map((column, i) => (
          <Fragment key={i}>
            {column.header && (
              <Typography variant="h6" as="h4" className="mb-0 pl-4 py-2  text-gray-500">
                {column.header}
              </Typography>
            )}
            {column.items.map((item) => (
              <Link
                key={item._key}
                link={item}
                variant="ghost"
                className="text-start no-underline! justify-start"
              />
            ))}
          </Fragment>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
const MobileMenuContent: React.FC<Props> = (props) => {
  return (
    <Accordion type="single" className="flex flex-col w-full" collapsible>
      {props.navigation.links.map((link) => {
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
