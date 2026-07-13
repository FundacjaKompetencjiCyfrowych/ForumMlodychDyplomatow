import Typography from "../ui/typography";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { Link } from "../ui/link";
import { Container } from "../ui/container";

const JoinUsDivisions = ({ data }: PageBuilderSectionProps<"joinUsDivisionsSection">) => {
  const { header, features, button } = data;

  return (
    <Container className="w-full bg-(--color-brand-slate-50) px-6 py-18">
      <div className="mb-8 lg:mb-12">
        <Typography as="h2" variant="h2" className="mb-12 text-center text-brand-blue-900">
          {header}
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-t border-t-brand-slate-500 p-4 pt-6"
          >
            {item.icon && (
              <SanityImage
                image={item.icon}
                className="h-8 w-8 object-contain text-brand-slate-500"
              />
            )}
            <Typography as="h3" variant="title-m" className="font-bold text-brand-gray-600">
              {item.header}
            </Typography>
            <Typography as="p" variant="body-l" className="font-normal text-slate-500">
              {item.description}
            </Typography>
          </div>
        ))}
      </div>

      {button && (
        <div className="mx-auto w-fit">
          <Link link={data.button!} variant="primary" size="m" />
        </div>
      )}
    </Container>
  );
};

export default JoinUsDivisions;
