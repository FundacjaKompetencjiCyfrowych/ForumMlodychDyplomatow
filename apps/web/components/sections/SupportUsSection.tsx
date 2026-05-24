import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import { SanityImage } from "../../sanity/image/SanityImage";
import Typography from "../ui/typography";
import { getHeading, getSubHeading } from "../../lib/heading";
import { Link } from "../ui/link";

const SupportUsSection = ({ data, index }: PageBuilderSectionProps<"supportUsSection">) => {
  return (
    <Container
      background="blue"
      size="stretch"
      className="flex flex-col pt-0 pb-8 desktop:flex-row desktop:py-0"
    >
      <div className="relative desktop:w-6/11">
        <SanityImage image={data.image} />
        <div className="absolute right-0 bottom-0 left-0 block h-20 bg-linear-to-t from-brand-blue to-transparent desktop:top-0 desktop:left-auto desktop:h-auto desktop:w-30 desktop:bg-linear-to-l" />
      </div>
      <div className="flex w-full flex-col items-stretch gap-10 px-2 pt-8 text-center desktop:w-5/11 desktop:justify-center desktop:gap-8 desktop:px-10">
        <div className="flex flex-col">
          <Typography variant="h1" as={getHeading(index)}>
            {data.heading}
          </Typography>
          <Typography variant="p1" as={getSubHeading(index)}>
            {data.subheading}
          </Typography>
        </div>
        {data.cta && <Link link={data.cta} variant="accent" />}
      </div>
    </Container>
  );
};

export default SupportUsSection;
