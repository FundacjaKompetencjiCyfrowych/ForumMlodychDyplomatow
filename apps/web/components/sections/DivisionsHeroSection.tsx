import Typography from "../ui/typography";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";

export interface DivisionsHeroProps extends PageBuilderSectionProps<"heroDivisionsSection"> {}

const DivisionsHero = ({ data }: DivisionsHeroProps) => {
  const { header, description, coverImage } = data;

  if (!header) return null;

  return (
    <section className="bg-white desktop:p-8">
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 flex flex-col gap-4 p-4 lg:order-1 lg:gap-6">
          <Typography as="h1" variant="title">
            {header}
          </Typography>
          {description && (
            <Typography as="p" variant="h5" className="max-w-xl text-[#374151]">
              {description}
            </Typography>
          )}
        </div>

        <div className="relative order-1 aspect-4/3 w-full overflow-hidden lg:order-2">
          {coverImage ? (
            <SanityImage image={coverImage} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-slate-100" />
          )}
        </div>
      </div>
    </section>
  );
};

export default DivisionsHero;
