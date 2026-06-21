import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { getTranslations } from "next-intl/server";
import { getHeading } from "../../lib/heading";
import type { DeepGet } from "../../lib/types";
import { SanityImage } from "../../sanity/image/SanityImage";
import { Container } from "../ui/container";
import { Link } from "../ui/link";
import { ResponsiveCarousel } from "../ui/responsive-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Typography from "../ui/typography";
import { ChevronRight } from "lucide-react";

type Person = DeepGet<PageBuilderSectionProps<"peopleSection">, "data.people.members">;

const PersonCard = ({ person }: { person: Person }) => {
  return (
    <div className="desktop:stretch flex w-full min-w-full flex-col items-center gap-4 desktop:min-w-0">
      <SanityImage
        image={person.img}
        className="aspect-square w-full max-w-100 object-cover desktop:max-w-74"
        sizes={{
          default: "400px",
          desktop: "300px",
        }}
      />
      <Typography variant="body-xl">{person.name}</Typography>
      <Typography variant="body-m" className="text-center whitespace-break-spaces text-gray-600">
        {person.title}
      </Typography>
      {/* TODO social links after merge */}
    </div>
  );
};
const PeopleSection = async ({ index, data, locale }: PageBuilderSectionProps<"peopleSection">) => {
  const groups = data.people?.filter((group) => group.groupName && group.members) ?? [];
  const t = await getTranslations({ locale, namespace: "people" });
  return (
    <Container className="flex flex-col items-center gap-8 desktop:gap-12">
      <Typography variant="h2" as={getHeading(index)}>
        {data.heading}
      </Typography>
      <Tabs
        defaultValue={groups[0]?.groupName ?? ""}
        className="flex w-full max-w-full gap-6 desktop:gap-8"
      >
        <TabsList variant="line" className="">
          {groups.map((group, index) => (
            <TabsTrigger key={`${group._key}-${index}`} value={group.groupName ?? ""}>
              {group.groupName}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((group, index) => (
          <TabsContent key={`${group._key}-${index}`} value={group.groupName ?? ""}>
            <ResponsiveCarousel contentClassName="desktop:gap-6">
              {group.members?.map((member, index) => (
                <PersonCard key={`${member._key}-${index}`} person={member} />
              ))}
            </ResponsiveCarousel>
          </TabsContent>
        ))}
      </Tabs>
      <Link
        href="/people"
        variant="text"
        className="w-full desktop:w-auto desktop:self-end"
        iconRight={<ChevronRight />}
      >
        {t("seeAll")}
      </Link>
    </Container>
  );
};

export default PeopleSection;
