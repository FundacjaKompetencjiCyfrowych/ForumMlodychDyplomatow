import React from "react";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading, getSubHeading } from "../../lib/heading";
import { SanityImage } from "../../sanity/image/SanityImage";

export const IconCardSection = ({ data, index }: PageBuilderSectionProps<"iconCardSection">) => {
  return (
    <Container contentWidth="xl" className="flex flex-col gap-4 bg-slate-50 desktop:gap-16">
      <div className="flex flex-col items-center gap-10">
        <Typography variant="h2" as={getHeading(index)}>
          {data.heading}
        </Typography>
        {data.subheading && (
          <Typography variant="body-xl" className="text-gray-800">
            {data.subheading}
          </Typography>
        )}
      </div>
      <div className="flex flex-col items-stretch justify-center gap-4 desktop:flex-row desktop:gap-10">
        {data.items?.map((item) => (
          <div
            key={item._key}
            className="flex flex-col items-center gap-4 bg-white px-4 py-6 text-center desktop:px-6 desktop:pb-10"
          >
            <SanityImage image={item.icon} className="h-12 w-12 text-brand-blue-900" />
            <div className="flex flex-col items-center gap-4">
              <Typography variant="title-m" as={getSubHeading(index)}>
                {item.title}
              </Typography>
              <Typography variant="body-l" className="text-gray-600">
                {item.subtitle}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
