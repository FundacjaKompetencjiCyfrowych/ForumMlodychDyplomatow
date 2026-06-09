import React from "react";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import { getHeading, getSubHeading } from "../../lib/heading";
import { SanityImage } from "../../sanity/image/SanityImage";

const HeadingSection = ({ data, index }: PageBuilderSectionProps<"headingSection">) => {
  return (
    <Container className="grid grid-cols-1 content-evenly items-stretch gap-8 desktop:grid-cols-2">
      <div className="flex flex-col gap-8">
        <Typography variant="h1" as={getHeading(index)} className="text-4xl desktop:text-5xl">
          {data.heading}
        </Typography>
        {data.subheading && (
          <Typography variant="p1" as={getSubHeading(index)}>
            {data.subheading}
          </Typography>
        )}
      </div>
      <div className="">
        <SanityImage image={data.image} />
      </div>
    </Container>
  );
};

export default HeadingSection;
