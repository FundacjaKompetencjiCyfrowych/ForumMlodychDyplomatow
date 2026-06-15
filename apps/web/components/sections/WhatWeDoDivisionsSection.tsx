import Typography from "../ui/typography";
import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";

export interface WhatWeDoDivisionsProps extends PageBuilderSectionProps<"whatWeDoDivisionsSection"> {}

const WhatWeDoDivisions = ({ data }: WhatWeDoDivisionsProps) => {
  const { title, whatWeDo } = data;

  return (
    <section className="w-full bg-brand-blue-50 px-6 py-18 text-center">
      <Typography as="h2" variant="h2">
        {title}
      </Typography>

      <div className="mt-6 flex flex-col items-center gap-4">
        {whatWeDo?.map((item: string, index: number) => (
          <div key={index} className="flex max-w-5xl items-center justify-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-black" />
            <Typography as="p" variant="h5" className="text-center">
              {item}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDoDivisions;
