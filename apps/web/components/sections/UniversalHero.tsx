import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { getHeading } from "../../lib/heading";
import GradientImage from "../../sanity/image/GradientImage";
import { Container } from "../ui/container";
import Typography from "../ui/typography";

export interface UniversalHeroProps extends PageBuilderSectionProps<"universalHeroSection"> {}

const UniversalHero = ({ data, index }: UniversalHeroProps) => {
  const { header, description, coverImage, caption } = data;

  if (!header) return null;

  return (
    <Container contentWidth="xl">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 flex flex-col gap-4 py-4 text-center lg:order-1 lg:gap-6 desktop:text-left">
          <Typography as={getHeading(index)} variant="h1" className="text-brand-gray-900">
            {header}
          </Typography>
          {description && (
            <Typography as="p" variant="body-xl" className="max-w-xl text-brand-gray-600">
              {description}
            </Typography>
          )}
          {caption && (
            <Typography as="p" variant="body-m" className="max-w-xl text-brand-gray-600">
              {caption}
            </Typography>
          )}
        </div>

        <div className="relative order-1 hidden aspect-4/3 w-full overflow-hidden lg:order-2 desktop:block">
          {coverImage ? (
            <GradientImage image={coverImage} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-slate-100" />
          )}
        </div>
      </div>
    </Container>
  );
};

export default UniversalHero;
