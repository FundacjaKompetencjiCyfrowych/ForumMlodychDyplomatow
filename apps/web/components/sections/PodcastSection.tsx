import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { stegaClean } from "next-sanity";
import { getHeading } from "../../lib/heading";
import { Container } from "../ui/container";
import { Link } from "../ui/link";
import Typography from "../ui/typography";

const PodcastSection = ({ index, data }: PageBuilderSectionProps<"podcastSection">) => {
  return (
    <Container className="flex flex-col items-center gap-10 desktop:gap-16" contentWidth="xl">
      <div className="mb-6 flex flex-col items-center gap-10 text-center desktop:mb-10 desktop:gap-16">
        <Typography variant="h2" lineHeight="none" as={getHeading(index)}>
          {data.heading}
        </Typography>
        {data.subheading && (
          <Typography variant="body-xl" lineHeight="none" className="text-gray-600">
            {data.subheading}
          </Typography>
        )}
      </div>
      {data.embed && (
        <div
          className="deskop:px-0 mb-8 w-full px-8 lg:mb-12"
          dangerouslySetInnerHTML={{ __html: stegaClean(data.embed) }}
        />
      )}
      {data.link && (
        <div className="hidden justify-center md:flex">
          <Link variant="primary" link={data.link} className="w-max" />
        </div>
      )}
    </Container>
  );
};

export default PodcastSection;
