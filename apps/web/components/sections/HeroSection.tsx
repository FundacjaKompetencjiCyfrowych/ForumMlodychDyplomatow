import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading, getSubHeading } from "../../lib/heading";
import { Link } from "../ui/link";
import { SanityImage } from "../../sanity/image/SanityImage";

const HeroSection = ({ data, index }: PageBuilderSectionProps<"heroSection">) => {
  return (
    <Container className="flex flex-col items-center gap-5 desktop:gap-20" size="stretch">
      <div className="mx-2 flex flex-col items-center gap-14 desktop:mx-0">
        <div className="flex max-w-4xl flex-col items-center gap-8 text-center">
          <Typography as={getHeading(index)} variant="hero">
            {data.heading}
          </Typography>
          <Typography as={getSubHeading(index)} className="text-gray-600" variant="h5">
            {data.subheading}
          </Typography>
        </div>
        <div className="flex w-full max-w-3xl flex-col justify-stretch gap-4 desktop:flex-row desktop:gap-8">
          {data.cta && <Link link={data.cta} variant="accent" className="grow" />}
          {data.secondaryCta && (
            <Link link={data.secondaryCta} variant="accentSecondary" className="grow" />
          )}
        </div>
      </div>
      {data.backgroundImage && (
        <div className="relative w-full">
          {/* Gradient fade */}
          <div className="absolute top-0 right-0 left-0 h-30 bg-linear-to-b from-white to-transparent desktop:h-60"></div>
          <SanityImage className="w-full" image={data.backgroundImage} />
        </div>
      )}
    </Container>
  );
};

export default HeroSection;
