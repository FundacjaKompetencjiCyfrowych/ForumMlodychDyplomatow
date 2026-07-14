import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading, getSubHeading } from "../../lib/heading";
import type { DeepGet } from "../../lib/types";
import { SanityImage } from "../../sanity/image/SanityImage";
import { Link } from "../ui/link";
import { ResponsiveCarousel } from "../ui/responsive-carousel";
import { ArrowRight } from "lucide-react";

const OfferCard = ({
  item,
  index,
}: {
  index: number;
  item: DeepGet<PageBuilderSectionProps<"cardsWithLinkSection">, "data.benefits">;
}) => {
  return (
    <div className="flex min-w-full flex-col items-stretch gap-4 border border-slate-100 bg-white p-6 text-center desktop:min-w-auto">
      {item.icon && <SanityImage image={item.icon} className="mx-auto h-18 w-18" />}
      <Typography variant="title-l" as={getSubHeading(index)}>
        {item.title}
      </Typography>
      <Typography variant="body-m" className="text-gray-600">
        {item.description}
      </Typography>
      {item.link && (
        <Link className="mt-auto" variant="text" link={item.link} iconRight={<ArrowRight />} />
      )}
    </div>
  );
};

const CardsWithLinkSection = ({
  index: sectionIndex,
  data,
}: PageBuilderSectionProps<"cardsWithLinkSection">) => {
  return (
    <Container
      className="flex flex-col items-center gap-10 desktop:gap-16"
      background="slate"
      contentWidth="xl"
    >
      <div className="mb-8 flex flex-col gap-4 text-center lg:mb-12 desktop:gap-6">
        <Typography variant="h2" lineHeight="none" as={getHeading(sectionIndex)}>
          {data.heading}
        </Typography>
        <Typography variant="body-xl" className="text-gray-600" lineHeight="none">
          {data.subheading}
        </Typography>
      </div>
      <ResponsiveCarousel className="w-full" contentClassName="desktop:gap-6 items-stretch">
        {data.benefits?.map((item, index) => (
          <OfferCard key={`${item._key}-${index}`} item={item} index={sectionIndex} />
        ))}
      </ResponsiveCarousel>
    </Container>
  );
};

export default CardsWithLinkSection;
