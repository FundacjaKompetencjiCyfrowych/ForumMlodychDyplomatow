import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React, { Suspense } from "react";
import { Container } from "../ui/container";
import { getHeading } from "../../lib/heading";
import Typography from "../ui/typography";
import { Skeleton } from "../ui/skeleton";
import { getLocale } from "next-intl/server";
import { latestPublicationsQuery } from "../../sanity/queries/publications";
import { runQuery } from "../../sanity/groqd";
import { ResponsiveCarousel } from "../ui/responsive-carousel";
import { PublicationCard } from "../Publications/PublicationCard";

const NewPublicationsList = async () => {
  const locale = await getLocale();
  const { data: publications } = await runQuery(latestPublicationsQuery, {
    parameters: { locale, limit: 4 },
  });
  return (
    <>
      <div className="w-full desktop:hidden">
        <ResponsiveCarousel>
          {publications.map((pub, index) => (
            <PublicationCard
              key={pub._id}
              publication={pub}
              layout={index === 0 ? "horizontal" : "vertical"}
            />
          ))}
        </ResponsiveCarousel>
      </div>

      {/* Desktop: featured card on top, three equal cards below */}
      <div className="hidden w-full grid-cols-3 gap-6 desktop:grid">
        {publications.map((pub, index) => (
          <PublicationCard
            key={pub._id}
            publication={pub}
            layout={index === 0 ? "horizontal" : "vertical"}
            className={index === 0 ? "col-span-3" : undefined}
          />
        ))}
      </div>
    </>
  );
};
const NewPublicationsSection = async ({
  data,
  index,
}: PageBuilderSectionProps<"newPublicationsSection">) => {
  return (
    <Container className="flex flex-col items-center">
      <Typography as={getHeading(index)} variant="h2">
        {data.heading}
      </Typography>
      <Suspense fallback={<Skeleton className="h-40" />}>
        <NewPublicationsList />
      </Suspense>
    </Container>
  );
};

export default NewPublicationsSection;
