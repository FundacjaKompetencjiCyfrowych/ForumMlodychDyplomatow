import React from "react";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import { Container } from "../ui/container";
import { getHeading, getSubHeading } from "../../lib/heading";
import Typography from "../ui/typography";
import type { DeepGet } from "../../lib/types";
import { SanityImage } from "../../sanity/image/SanityImage";
import { Link } from "../ui/link";

const BenefitCard = ({
  benefit,
  index,
}: {
  index: number;
  benefit: DeepGet<PageBuilderSectionProps<"benefitsSection">, "data.benefits">;
}) => {
  return (
    <div className="row-span-2 grid grid-cols-1 items-start gap-6 rounded-sm bg-white p-4 desktop:grid-rows-subgrid">
      <SanityImage
        sizes={{
          default: "100vw",
          desktop: "30vw",
        }}
        className="max-h-72 rounded-sm object-cover desktop:max-h-80"
        image={benefit.image}
      />
      <Typography
        variant="h4"
        as={getSubHeading(index)}
        className="text-center text-gray-600 desktop:text-start"
      >
        {benefit.title}
      </Typography>
    </div>
  );
};

export const BenefitsSection = ({ data, index }: PageBuilderSectionProps<"benefitsSection">) => {
  return (
    <Container
      contentWidth="xl"
      background="blue"
      className="flex flex-col items-center gap-10 desktop:gap-16"
    >
      <Typography variant="h3" as={getHeading(index)}>
        {data.heading}
      </Typography>
      <div className="grid grid-cols-1 content-stretch gap-6 desktop:grid-cols-3 desktop:grid-rows-[minmax(0,1fr)_minmax(0,auto)]">
        {data.benefits?.map((benefit) => (
          <BenefitCard key={benefit._key} benefit={benefit} index={index} />
        ))}
      </div>
      {data.cta && <Link link={data.cta} variant="secondaryLight" className="text-white" />}
    </Container>
  );
};
