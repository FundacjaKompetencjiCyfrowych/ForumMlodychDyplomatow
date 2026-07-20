import { runQuery } from "@/sanity/groqd";
import { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { countPublicationsQuery } from "@/sanity/queries/publications";
import React from "react";
import Typography from "../ui/typography";
import { Tag } from "../ui/tag";
import { Container } from "../ui/container";

const HeroPublications = async ({
  data: sectionData,
  locale,
}: PageBuilderSectionProps<"heroPublicationsSection">) => {
  const { data: queryData } = await runQuery(countPublicationsQuery, {
    parameters: { locale: locale as any },
  });

  return (
    <Container contentWidth="max" size="none" className="hidden px-30 py-8 desktop:flex">
      <section className="mx-auto flex w-full max-w-(--width-content-max) flex-col gap-2">
        <Typography variant="h3" as="h1">
          {sectionData.heading}
        </Typography>
        <Typography variant="body-m" as="p">
          {sectionData.subheading}
        </Typography>
        <div className="flex flex-wrap items-center gap-3">
          {sectionData.publicationCounter ? (
            <React.Fragment>
              <Tag variant="hero">
                <p>{sectionData.publicationCounter + ": " + queryData}</p>
              </Tag>
              <div className="size-0.5 bg-brand-gray-600" />
            </React.Fragment>
          ) : null}
          {((sectionData.badges ?? []) as string[]).map((badge, index, arr) => (
            <React.Fragment key={index}>
              <Tag variant="hero">
                <p>{badge}</p>
              </Tag>
              {index < arr.length - 1 && <div className="size-0.5 bg-brand-gray-600" />}
            </React.Fragment>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default HeroPublications;
