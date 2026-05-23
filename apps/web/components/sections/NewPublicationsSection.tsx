import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import React, { Suspense } from "react";
import { Container } from "../ui/container";
import { getHeading } from "../../lib/heading";
import Typography from "../ui/typography";
import { Skeleton } from "../ui/skeleton";

const NewPublicationsList = async () => {
  // TODO implement after merge with publications structure
  return <div>NewPublicationsList TODO, waiting for publications component</div>;
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
