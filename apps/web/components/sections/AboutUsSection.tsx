import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading, getSubHeading } from "../../lib/heading";
import { ResponsiveCarousel } from "../ui/responsive-carousel";
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
    <div className="flex w-full flex-col items-center gap-10 border border-white px-4 py-10">
      {/* TODO change this to some other icon component, this doesn't work with setting the color. Might need a separate icon schema */}
      {icon && <SanityImage image={icon} className="h-18 w-18" />}
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
    <Container
      background="blue"
      override="mobile-stretch"
      className="flex flex-col items-center gap-14 pb-0 desktop:gap-4"
    >
      <div className="flex w-full flex-col items-center gap-10">
        <Typography as={getHeading(sectionIndex)} variant="h2">
          {data.heading}
        </Typography>
        <ResponsiveCarousel className="w-full" contentClassName="desktop:gap-4">
          {data.content?.map((item) => (
            <DescriptionCard
              key={item._key}
              icon={item.icon}
              text={item.text}
              sectionIndex={sectionIndex}
            />
          ))}
        </ResponsiveCarousel>
      </div>
      <SanityImage image={data.image} className="w-full" sizes="100vw" />
    </Container>
  );
};

export default AboutUsSection;
