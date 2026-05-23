import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React from "react";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading, getSubHeading } from "../../lib/heading";
import type { DeepGet } from "../../lib/types";
import { SanityImage } from "../../sanity/image/SanityImage";
import { Link } from "../ui/link";
import { ResponsiveCarousel } from "../ui/responsive-carousel";

const OfferCard = ({
  item,
}: {
  item: DeepGet<PageBuilderSectionProps<"joinUsSection">, "data.benefits">;
}) => {
  return (
    <div className="flex min-w-full flex-col items-stretch gap-4 rounded-[8px] border border-slate-100 bg-slate-50 p-6 text-center desktop:min-w-auto">
      {item.icon && <SanityImage image={item.icon} className="mx-auto h-18 w-18" />}
      <Typography variant="h4">{item.title}</Typography>
      <Typography variant="p1" className="text-gray-600">
        {item.description}
      </Typography>
      {item.link && <Link className="mt-auto" variant="primary" link={item.link} />}
    </div>
  );
};

const JoinUsSection = ({ index, data }: PageBuilderSectionProps<"joinUsSection">) => {
  return (
    <Container className="flex flex-col items-center gap-10 desktop:gap-16">
      <div className="flex flex-col gap-4 text-center desktop:gap-6">
        <Typography variant="h2" lineHeight="none" as={getHeading(index)}>
          {data.heading}
        </Typography>
        <Typography
          variant="h5"
          className="text-gray-600"
          lineHeight="none"
          as={getSubHeading(index)}
        >
          {data.subheading}
        </Typography>
      </div>
      <ResponsiveCarousel className="w-full" contentClassName="desktop:gap-6 items-stretch">
        {data.benefits?.map((item, index) => (
          <OfferCard key={`${item._key}-${index}`} item={item} />
        ))}
      </ResponsiveCarousel>
    </Container>
  );
};

export default JoinUsSection;
