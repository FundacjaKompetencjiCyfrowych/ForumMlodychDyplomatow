"use client";
import type { InferResultType } from "groqd";
import { Link } from "../ui/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import type { navQuery } from "./Header";
type QueryResult = Exclude<InferResultType<typeof navQuery>, null>;
type DropdownType = Extract<Exclude<QueryResult["links"], null>[number], { _type: "dropdown" }>;

type Props = {
  dropdown: DropdownType;
};

export const HeaderMenu = ({ dropdown }: Props) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{dropdown.name}</NavigationMenuTrigger>
      <NavigationMenuContent className="w-full bg-header">
        <div
          className="grid w-full gap-5 p-5"
          style={{
            gridTemplateColumns: `repeat(${(dropdown.columns?.length ?? 0) + 2}, 1fr)`,
          }}
        >
          <div className="col-span-2 flex flex-col">
            <h3 className="text-lg font-bold">{dropdown.header}</h3>
            <p className="text-sm">{dropdown.description}</p>
          </div>
          {dropdown.columns?.map((column, index) => (
            <div key={index} className="flex flex-col items-start gap-6">
              <h4 className="text-md font-semibold">{column.header}</h4>
              {column.items?.map((item) => (
                <Link className="p-0" key={item._key} link={item} />
              ))}
            </div>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
