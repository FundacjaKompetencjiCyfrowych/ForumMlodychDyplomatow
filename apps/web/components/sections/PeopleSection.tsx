import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import { getHeading } from "../../lib/heading";
import Typography from "../ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Carousel, CarouselContent, CarouselControls } from "../ui/carousel";
import { SanityImage } from "../../sanity/image/SanityImage";
import type { DeepGet } from "../../lib/types";
import { Button } from "../ui/button";

type Person = DeepGet<PageBuilderSectionProps<"peopleSection">, "data.people.members">;

const PersonCard = ({ person }: { person: Person }) => {
  return (
    <div className="flex w-full min-w-full flex-col items-center gap-4 desktop:min-w-0">
      <SanityImage image={person.img} className="aspect-square w-full object-cover" />
      <Typography variant="h5">{person.name}</Typography>
      <Typography variant="h6" className="text-gray-600">
        TODO
      </Typography>
    </div>
  );
};
const PeopleSection = ({ index, data }: PageBuilderSectionProps<"peopleSection">) => {
  const groups = data.people?.filter((group) => group.groupName && group.members) ?? [];
  return (
    <Container className="flex flex-col items-center">
      <Typography variant="h2" as={getHeading(index)}>
        {data.heading}
      </Typography>
      <Tabs defaultValue={groups[0]?.groupName ?? ""} className="w-full">
        <TabsList variant="line" className="w-fit min-w-full overflow-x-auto">
          {groups.map((group, index) => (
            <TabsTrigger key={`${group._key}-${index}`} value={group.groupName ?? ""}>
              {group.groupName}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((group, index) => (
          <TabsContent key={`${group._key}-${index}`} value={group.groupName ?? ""}>
            <div className="desktop:hidden">
              <Carousel>
                <CarouselContent>
                  {group.members?.map((member, index) => (
                    <PersonCard key={`${member._key}-${index}`} person={member} />
                  ))}
                </CarouselContent>
                <CarouselControls />
              </Carousel>
            </div>
            <div className="hidden desktop:flex">
              {group.members?.map((member, index) => (
                <PersonCard key={`${member._key}-${index}`} person={member} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <Button>TODO</Button>
    </Container>
  );
};

export default PeopleSection;
