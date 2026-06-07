import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { getHeading, getSubHeading } from "../../lib/heading";
import { ButtonCarousel } from "../ui/responsive-carousel";
import { Container } from "../ui/container";
import DivisionCard from "../ui/division-card";
import Typography from "../ui/typography";

const DivisionsSection = ({ data, index }: PageBuilderSectionProps<"divisionsSection">) => {
  return (
    <Container className="flex flex-col items-stretch gap-10 desktop:gap-16">
      <div className="flex flex-col items-center text-center">
        <Typography variant="h2" as={getHeading(index)}>
          {data.heading}
        </Typography>
        <Typography variant="h5" as={getSubHeading(index)}>
          {data.subheading}
        </Typography>
      </div>
      <ButtonCarousel itemClassName="basis-full aspect-[0.7] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
        {(data.divisions ?? []).map((division, index) => (
          <DivisionCard key={division._id} division={division} index={index} />
        ))}
      </ButtonCarousel>
    </Container>
  );
};

export default DivisionsSection;
