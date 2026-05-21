import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading } from "../../lib/heading";
import { Carousel, CarouselContent, CarouselControls, CarouselItem } from "../ui/carousel";
import { DescriptionCard } from "../ui/descriptionCard";

const AboutUsSection = ({ index, data }: PageBuilderSectionProps<"aboutUsSection">) => {
  return (
    <Container background="blue" override="mobile-stretch" className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center gap-10">
        <Typography as={getHeading(index)} variant="h2">
          {data.heading}
        </Typography>
        <div className="max-w-full desktop:hidden">
          <Carousel>
            <CarouselContent className="gap-4">
              {data.content?.map((item) => (
                <CarouselItem key={item._key} className="pl-8">
                  <DescriptionCard icon={item.icon} text={item.text} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselControls />
          </Carousel>
        </div>
        <div className="hidden flex-row gap-4 desktop:flex">
          {data.content?.map((item) => (
            <DescriptionCard key={item._key} icon={item.icon} text={item.text} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AboutUsSection;
