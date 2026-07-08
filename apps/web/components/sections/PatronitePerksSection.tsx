import React from "react";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import { Container } from "../ui/container";
import Typography from "../ui/typography";
import { getHeading, getSubHeading } from "../../lib/heading";
import type { DeepGet } from "../../lib/types";
import { Link } from "../ui/link";
import SVG from "react-inlinesvg";

const PatronitePerk = ({
  tier,
  index,
}: {
  index: number;
  tier: DeepGet<PageBuilderSectionProps<"patronitePerksSection">, "data.tiers">;
}) => {
  return (
    <div className="flex flex-col items-center gap-8 border-2 border-white px-2 py-6 desktop:gap-10 desktop:px-4 desktop:py-10">
      <Typography variant="h4" as={getSubHeading(index)} className="text-center">
        {tier.amount}
      </Typography>
      <ul className="flex flex-col items-start gap-4">
        {tier.perks?.map((perk, i) => (
          <Typography
            as="li"
            key={`${perk}_${i}`}
            variant="body-m"
            className="flex flex-row items-center gap-2 desktop:gap-4"
          >
            <SVG src="/static/icons/checkmark.svg" className="h-6 w-6 shrink-0" />
            {perk}
          </Typography>
        ))}
      </ul>
    </div>
  );
};

export const PatronitePerksSection = ({
  data,
  index,
}: PageBuilderSectionProps<"patronitePerksSection">) => {
  return (
    <Container
      background="red"
      className="flex flex-col items-center gap-10 text-white desktop:gap-16"
    >
      <div className="flex flex-col items-center gap-10">
        <Typography variant="h2" as={getHeading(index)}>
          {data.heading}
        </Typography>
        <div className="flex max-w-200 flex-col gap-6 text-center text-balance whitespace-break-spaces">
          <Typography variant="body-xl">{data.subheading}</Typography>
          <Typography variant="body-m">{data.caption}</Typography>
        </div>
      </div>
      <div className="flex flex-col items-stretch gap-6 desktop:flex-row desktop:gap-10">
        {data.tiers?.map((tier) => (
          <PatronitePerk key={tier._key} tier={tier} index={index} />
        ))}
      </div>
      {data.cta && <Link link={data.cta} size="l" variant="primaryLight" className="self-center" />}
    </Container>
  );
};
