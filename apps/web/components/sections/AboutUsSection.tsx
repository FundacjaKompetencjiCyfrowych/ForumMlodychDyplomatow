import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading } from "../../lib/heading";
import { ResponsiveCarousel } from "../ui/responsive-carousel";
import { DescriptionCard } from "../ui/description-card";
import { SanityImage } from "../../sanity/image/SanityImage";

const AboutUsSection = ({ index, data }: PageBuilderSectionProps<"aboutUsSection">) => {
  return (
    <Container
      background="blue"
      override="mobile-stretch"
      className="flex flex-col items-center gap-14 pb-0 desktop:gap-4"
    >
      <div className="flex w-full flex-col items-center gap-10">
        <Typography as={getHeading(index)} variant="h2">
          {data.heading}
        </Typography>
        <ResponsiveCarousel className="w-full" contentClassName="desktop:gap-4">
          {data.content?.map((item) => (
            <DescriptionCard key={item._key} icon={item.icon} text={item.text} />
          ))}
        </ResponsiveCarousel>
      </div>
      <SanityImage image={data.image} className="w-full" />
    </Container>
  );
};

export default AboutUsSection;
