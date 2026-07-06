import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { getTranslations } from "next-intl/server";
import { getHeading } from "../../lib/heading";
import { Container } from "../ui/container";
import { Link } from "../ui/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Typography from "../ui/typography";
import { ChevronRight } from "lucide-react";
import PersonCard from "../ui/person-card";

const PeopleSection = async ({ index, data, locale }: PageBuilderSectionProps<"peopleSection">) => {
  const groups = data.people?.filter((group) => group.groupName && group.members) ?? [];
  const t = await getTranslations({ locale, namespace: "people" });
  return (
    <Container
      className="flex flex-col items-center gap-8 desktop:gap-12"
      background="slate"
      contentWidth="xl"
    >
      <Typography variant="h2" as={getHeading(index)} className="mb-4 text-center desktop:mb-16">
        {data.heading}
      </Typography>
      <Tabs
        defaultValue={groups[0]?.groupName ?? ""}
        className="flex w-full max-w-full gap-6 px-8 desktop:gap-8 desktop:px-0"
      >
        <TabsList variant="line" className="gap-20">
          {groups.map((group, index) => (
            <TabsTrigger
              key={`${group._key}-${index}`}
              value={group.groupName ?? ""}
              className="max-w-60 flex-none"
            >
              {group.groupName}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((group, index) => (
          <TabsContent key={`${group._key}-${index}`} value={group.groupName ?? ""}>
            <div className="grid w-full grid-cols-2 gap-16 sm:gap-4 md:gap-8 desktop:grid-cols-4">
              {group.members?.map((member) => (
                <PersonCard key={member._id} person={member} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mx-auto mt-16 hidden w-fit desktop:block">
        <Link href="/people" variant="secondary" iconRight={<ChevronRight />}>
          {t("seeAll")}
        </Link>
      </div>
    </Container>
  );
};

export default PeopleSection;
