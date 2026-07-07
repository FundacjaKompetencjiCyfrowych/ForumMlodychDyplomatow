import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { getHeading } from "../../lib/heading";
import { ButtonCarousel } from "../ui/responsive-carousel";
import { Container } from "../ui/container";
import DivisionCard from "../ui/division-card";
import Typography from "../ui/typography";

const DivisionsSection = ({ data, index, locale }: PageBuilderSectionProps<"divisionsSection">) => {
  return (
    <Container className="flex flex-col items-stretch gap-10 desktop:gap-16" contentWidth="xl">
      <div className="flex flex-col items-center gap-10 px-6 text-center desktop:px-0">
        <Typography variant="h2" as={getHeading(index)}>
          {data.heading}
        </Typography>
        <div className="flex flex-col gap-10 text-gray-600 desktop:gap-16">
          <Typography variant="body-xl">{data.subheading}</Typography>
          <Typography variant="body-m">{data.description}</Typography>
        </div>
      </div>
      <ButtonCarousel
        itemClassName="basis-[82%] aspect-[0.7] sm:basis-[46%] lg:basis-[31%] xl:basis-[23.5%]"
        className="px-4"
      >
        {(data.divisions ?? []).map((division, index) => (
          <DivisionCard key={division._id} division={division} index={index} locale={locale} />
        ))}
      </ButtonCarousel>
    </Container>
  );
};

export default DivisionsSection;
