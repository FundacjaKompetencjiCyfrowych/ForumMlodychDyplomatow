import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading, getSubHeading } from "../../lib/heading";
import { Link } from "../ui/link";
import { SanityImage } from "../../sanity/image/SanityImage";

const HeroSection = ({ data, index }: PageBuilderSectionProps<"heroSection">) => {
  return (
    <Container className="flex flex-col">
      <div className="flex flex-col items-stretch gap-14">
        <div className="flex flex-col gap-8">
          <Typography as={getHeading(index)} variant="hero">
            {data.heading}
          </Typography>
          <Typography as={getSubHeading(index)} variant="h5">
            {data.subheading}
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          {data.cta && <Link link={data.cta} variant="primaryRed" />}
          {data.secondaryCta && <Link link={data.secondaryCta} variant="secondaryRed" />}
        </div>
      </div>
      {data.backgroundImage && (
        <div className="relative">
          {/* Gradient fade */}
          <div className="absolute top-0 right-0 left-0 h-60 bg-linear-to-b from-white to-transparent"></div>
          <SanityImage image={data.backgroundImage} />
        </div>
      )}
    </Container>
  );
};

export default HeroSection;
