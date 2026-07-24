import React from "react";
import { Typography } from "../ui/typography";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import { Container } from "../ui/container";
import { getHeading } from "../../lib/heading";
import { PortableText } from "@portabletext/react";
import { basePortableTextComponents } from "../PortableText/PortableTextComponents";

export const RichTextSection = ({ index, data }: PageBuilderSectionProps<"richTextSection">) => {
  return (
    <Container contentWidth="xl" contentClassName="flex flex-col gap-6 desktop:gap-10">
      <Typography as={getHeading(index)} variant="h2">
        {data.heading}
      </Typography>
      <div className="prose-custom">
        <PortableText value={data.text} components={basePortableTextComponents} />
      </div>
    </Container>
  );
};
