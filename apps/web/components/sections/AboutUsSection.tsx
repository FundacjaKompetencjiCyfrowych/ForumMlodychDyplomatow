import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading, getSubHeading } from "../../lib/heading";
import { SanityImage } from "../../sanity/image/SanityImage";
import type { ImgFragment } from "../../sanity/queries/imgFragment";

export const DescriptionCard = ({
  icon,
  text,
  sectionIndex,
}: {
  icon: ImgFragment | null;
  text: string | null;
  sectionIndex: number;
}) => {
  return (
    <div className="flex w-full flex-col items-center border border-white px-6 py-10">
      {/* TODO change this to some other icon component, this doesn't work with setting the color. Might need a separate icon schema */}
      {icon && <SanityImage image={icon} className="mb-6 h-18 w-18" />}
      {text && (
        <Typography as={getSubHeading(sectionIndex)} variant="h4" className="w-full text-center">
          {text}
        </Typography>
      )}
    </div>
  );
};
const AboutUsSection = ({
  index: sectionIndex,
  data,
}: PageBuilderSectionProps<"aboutUsSection">) => {
  return (
    <Container background="blue" size="base" contentWidth="xl">
      <div className="flex w-full flex-col items-center px-6 desktop:mb-16 desktop:px-0">
        <Typography as={getHeading(sectionIndex)} variant="h2" className="mb-10 desktop:mb-16">
          {data.heading}
        </Typography>
        <div className="grid w-full [grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))] gap-16 md:gap-8">
          {data.content?.map((item) => (
            <DescriptionCard
              key={item._key}
              icon={item.icon}
              text={item.text}
              sectionIndex={sectionIndex}
            />
          ))}
        </div>
      </div>
      <SanityImage image={data.image} className="hidden w-full md:block" sizes="100vw" />
    </Container>
  );
};

export default AboutUsSection;
