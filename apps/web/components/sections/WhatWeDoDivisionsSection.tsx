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
          <ul key={index} className="flex max-w-5xl list-disc items-center justify-center gap-3">
            <Typography as="li" variant="body-l" className="text-center">
              {item}
            </Typography>
          </ul>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDoDivisions;
