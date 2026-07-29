import Typography from "../ui/typography";
import { divisionPreviewQuery } from "@/sanity/queries/division";
import DivisionPageCard from "../ui/division-page-card";
import { getTranslations } from "next-intl/server";
import { runQuery } from "@/sanity/groqd";
import { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import { getHeading } from "../../lib/heading";
import { Container } from "@/components/ui/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const DivisionsListSection = async ({
  data,
  index,
  locale,
}: PageBuilderSectionProps<"divisionsListSection">) => {
  const { header, text } = data;
  const t = await getTranslations({ locale, namespace: "divisions" });

  const { data: divisions } = await runQuery(divisionPreviewQuery, {
    parameters: { locale },
  });

  return (
    <Container
      as="section"
      className="overflow-hidden border-t border-brand-slate-100"
      contentWidth="xl"
    >
      <div className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
        <Typography as={getHeading(index)} variant="h2" className="mb-4 text-brand-gray-900">
          {header}
        </Typography>
        <Typography as="p" variant="body-xl" className="text-black">
          {text}
        </Typography>
      </div>

      {divisions && divisions.length > 0 ? (
        <div className="relative mx-auto w-full px-4 sm:px-12 xl:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {divisions.map((division) => (
                <CarouselItem
                  key={division._id}
                  className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <DivisionPageCard division={division} index={index} locale={locale} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden sm:block">
              <CarouselPrevious
                variant="icon"
                className="absolute top-1/2 -left-12 z-10 -translate-y-1/2 rounded-sm border border-brand-red bg-white hover:border-brand-slate-200 lg:-left-16"
              />
              <CarouselNext
                variant="icon"
                className="absolute top-1/2 -right-12 z-10 -translate-y-1/2 rounded-sm border border-brand-red bg-white hover:border-brand-slate-200 lg:-right-16"
              />
            </div>
          </Carousel>
        </div>
      ) : (
        <div className="py-10 text-center">
          <Typography as={getHeading(index)} variant="h2" className="text-slate-500">
            {t("divisionNotFound")}
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default DivisionsListSection;
