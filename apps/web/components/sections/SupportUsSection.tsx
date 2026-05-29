import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { getHeading, getSubHeading } from "../../lib/heading";
import GradientImage from "../../sanity/image/GradientImage";
import { Container } from "../ui/container";
import { Link } from "../ui/link";
import Typography from "../ui/typography";

const SupportUsSection = ({ data, index }: PageBuilderSectionProps<"supportUsSection">) => {
  return (
    <Container
      background="blue"
      size="stretch"
      className="flex flex-col pt-0 pb-8 desktop:flex-row desktop:py-0"
    >
      <GradientImage
        image={data.image}
        sizes={{
          default: "100vw",
          desktop: "60vw",
        }}
        className="h-full object-cover"
        wrapperClassName="desktop:w-6/11"
        direction="bottom"
        desktopDirection="right"
        color="blue"
        size="sm"
        desktopSize="md"
      />
      <div className="flex w-full flex-col items-stretch gap-10 px-2 pt-8 text-center desktop:w-5/11 desktop:justify-center desktop:gap-8 desktop:px-10">
        <div className="flex flex-col">
          <Typography variant="h1" as={getHeading(index)}>
            {data.heading}
          </Typography>
          <Typography variant="p1" as={getSubHeading(index)}>
            {data.subheading}
          </Typography>
        </div>
        {data.cta && <Link link={data.cta} variant="accent" />}
      </div>
    </Container>
  );
};

export default SupportUsSection;
