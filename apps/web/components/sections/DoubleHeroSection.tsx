import { getHeading, getSubHeading } from "../../lib/heading";
import GradientImage from "../../sanity/image/GradientImage";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import { Container } from "../ui/container";
import { Link } from "../ui/link";
import Typography from "../ui/typography";

const DoubleHeroSection = ({ data, index }: PageBuilderSectionProps<"doubleHeroSection">) => {
  return (
    <Container contentWidth="xl" className="flex flex-col">
      <div className="flex md:flex-col lg:flex-row lg:items-stretch lg:justify-stretch desktop:gap-16">
        <div className="hidden min-w-60 basis-1/2 desktop:block">
          <GradientImage
            image={data.image}
            wrapperClassName="h-full"
            className="h-full object-cover"
            sizes={{
              default: "100vw",
              desktop: "30vw",
            }}
          />
        </div>
        <div className="flex flex-col items-center gap-14 desktop:basis-full desktop:items-start desktop:gap-16">
          <div className="flex flex-col items-center gap-10 desktop:items-start desktop:gap-16">
            <div className="flex flex-col items-center gap-10 desktop:items-start">
              <Typography
                as={getHeading(index)}
                variant="h1"
                className="text-center desktop:text-start"
              >
                {data.heading}
              </Typography>
              <Typography
                variant="body-xl"
                className="text-center text-gray-600 desktop:text-start"
              >
                {data.headingText}
              </Typography>
            </div>
            <div className="flex flex-col gap-8 desktop:gap-10">
              <Typography
                variant="h2"
                as={getSubHeading(index)}
                className="text-center desktop:text-start"
              >
                {data.subheading}
              </Typography>
              <div className="flex flex-col gap-6">
                <Typography variant="body-xl" className="text-center desktop:text-start">
                  {data.subheadingText}
                </Typography>
                <Typography
                  variant="body-m"
                  className="text-center text-gray-600 desktop:text-start"
                >
                  {data.caption}
                </Typography>
              </div>
            </div>
          </div>
          {data.cta && <Link variant="primary" link={data.cta} className="w-full desktop:w-auto" />}
        </div>
      </div>
    </Container>
  );
};

export default DoubleHeroSection;
