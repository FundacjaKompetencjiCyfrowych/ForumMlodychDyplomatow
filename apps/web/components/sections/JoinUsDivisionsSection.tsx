import Typography from "../ui/typography";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { Link } from "../ui/link";

const JoinUsDivisions = ({ data }: PageBuilderSectionProps<"joinUsDivisionsSection">) => {
  const { header, features, button } = data;

  return (
    <section className="w-full bg-white px-6 py-18">
      <Typography as="h2" variant="h2" className="mb-12 text-center text-brand-blue-900">
        {header}
      </Typography>

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
            <Typography as="h3" variant="h5" className="font-bold text-brand-gray-600">
              {item.header}
            </Typography>
            <Typography as="p" variant="h5" className="font-normal text-slate-500">
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
    </section>
  );
};

export default JoinUsDivisions;
