"use client";
import type { NavigationLinks } from "../../sanity/queries/navigation";
import { Link } from "../ui/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

type Props = {
  dropdown: Extract<Exclude<NavigationLinks, null>[number], { _type: "dropdown" }>;
};

export const HeaderMenu = ({ dropdown }: Props) => {
  return (
    <NavigationMenuItem className="overflow-visible">
      <NavigationMenuTrigger>{dropdown.name}</NavigationMenuTrigger>
      <NavigationMenuContent className="top-[calc(var(--header-height-desktop)/1.55)] rounded-b-sm bg-header shadow-md">
        <div className="flex w-fit flex-col gap-5 p-5">
          {dropdown.items?.map((item) => (
            <div key={item._key} className="flex w-fit flex-col items-start gap-6">
              <Link className="w-fit p-0" variant="nav" key={item._key} link={item} size="inline" />
            </div>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
