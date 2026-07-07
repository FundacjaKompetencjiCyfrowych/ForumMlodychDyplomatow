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
// import { Button } from "../ui/button";
// import { Link } from "../ui/link";
import { PublicationCard } from "../ui/publication-card";

const NewPublicationsList = async () => {
  const locale = await getLocale();
  const { data: publications } = await runQuery(latestPublicationsQuery, {
    parameters: { locale, limit: 4 },
  });
  return (
    <>
      <div className="w-full desktop:hidden">
        <ResponsiveCarousel mobileItemClassName="min-w-[80%]">
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
    <Container className="flex flex-col items-center pt-12" background="slate" contentWidth="xl">
      <Typography as={getHeading(index)} variant="h2" className="mb-12 text-center lg:mb-16">
        {data.heading}
      </Typography>
      <Suspense fallback={<Skeleton className="h-40" />}>
        <NewPublicationsList />
      </Suspense>
      {/* Tutaj nalezy dodać CTA do Sanity z hrefem  */}
      {/* <div className="mx-auto w-fit hidden desktop:block">
        <Link href="TO-DO" variant="secondary" size="l" className="desktop:mt-10">
          Test
        </Link>
      </div> */}
    </Container>
  );
};

export default NewPublicationsSection;
