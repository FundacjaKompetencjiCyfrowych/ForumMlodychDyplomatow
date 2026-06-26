import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { getHeading } from "../../lib/heading";
import GradientImage from "../../sanity/image/GradientImage";
import { Container } from "../ui/container";
import { Link } from "../ui/link";
import Typography from "../ui/typography";

const HeroSection = ({ data, index }: PageBuilderSectionProps<"heroSection">) => {
  return (
    <Container className="flex flex-col items-center gap-5 desktop:gap-20" size="stretch">
      <div className="mx-2 flex flex-col items-center gap-14 desktop:mx-0">
        <div className="flex max-w-4xl flex-col items-center gap-8 text-center">
          <Typography as={getHeading(index)} variant="h1">
            {data.heading}
          </Typography>
          <Typography className="text-gray-600" variant="body-xl">
            {data.subheading}
          </Typography>
        </div>
        <div className="flex w-full max-w-md flex-col justify-center gap-4 desktop:flex-row desktop:gap-8">
          {data.cta && <Link size="l" link={data.cta} variant="primary" className="grow basis-1" />}
          {data.secondaryCta && (
            <Link size="l" link={data.secondaryCta} variant="secondary" className="grow basis-1" />
          )}
        </div>
      </div>
      {data.backgroundImage && (
        <GradientImage
          image={data.backgroundImage}
          className="w-full"
          sizes="100vw"
          direction="top"
          size="md"
          desktopSize="xl"
        />
      )}
    </Container>
  );
};

export default HeroSection;
