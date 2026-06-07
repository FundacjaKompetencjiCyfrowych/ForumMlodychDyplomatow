import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import { getHeading, getSubHeading } from "../../lib/heading";
import Typography from "../ui/typography";

const PodcastSection = ({ index, data }: PageBuilderSectionProps<"podcastSection">) => {
  return (
    <Container className="flex flex-col items-center gap-10 desktop:gap-16">
      <div className="flex flex-col items-center gap-4 text-center desktop:gap-6">
        <Typography variant="h2" lineHeight="none" as={getHeading(index)}>
          {data.heading}
        </Typography>
        {data.subheading && (
          <Typography
            variant="h5"
            lineHeight="none"
            as={getSubHeading(index)}
            className="text-gray-600"
          >
            {data.subheading}
          </Typography>
        )}
      </div>
      {data.embed && <div className="w-full" dangerouslySetInnerHTML={{ __html: data.embed }} />}
    </Container>
  );
};

export default PodcastSection;
