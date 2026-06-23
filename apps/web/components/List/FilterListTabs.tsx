import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { parseAsString, useQueryState } from "nuqs";

type Props = {
  tabs: { label: string; value: string; default?: boolean }[];
  slug: string;
};

const FilterListTabs = ({ slug, tabs }: Props) => {
  const [selectedTab, setSelectedTab] = useQueryState(
    slug,
    parseAsString.withDefault(tabs.find((tab) => tab.default)?.value ?? tabs[0].value)
  );
  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="self-start">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default FilterListTabs;
