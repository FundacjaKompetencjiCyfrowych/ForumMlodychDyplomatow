import { getHeading } from "../../lib/heading";
import GradientImage from "../../sanity/image/GradientImage";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import { Container } from "../ui/container";
import Typography from "../ui/typography";

const HeadingSection = ({ data, index }: PageBuilderSectionProps<"headingSection">) => {
  return (
    <Container className="grid grid-cols-1 content-evenly items-stretch gap-8 desktop:grid-cols-2">
      <div className="flex flex-col gap-8">
        <Typography variant="h1" as={getHeading(index)} className="text-4xl desktop:text-5xl">
          {data.heading}
        </Typography>
        {data.subheading && <Typography variant="body-xl">{data.subheading}</Typography>}
      </div>
      <div className="">
        <GradientImage
          sizes={{
            default: "100vw",
            desktop: "50vw",
          }}
          direction={["left", "right"]}
          image={data.image}
          className="max-h-46 object-cover desktop:max-h-80"
        />
      </div>
    </Container>
  );
};

export default HeadingSection;
