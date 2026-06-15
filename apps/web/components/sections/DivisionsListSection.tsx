import Typography from "../ui/typography";
import type { DivisionPreview } from "@/sanity/queries/division";
import DivisionPageCard from "../ui/division-page-card";

interface DivisionsListSectionProps {
  title: string;
  description: string;
  divisions: DivisionPreview[];
  locale?: string;
}

export const DivisionsListSection = ({
  title,
  description,
  divisions,
  locale = "pl",
}: DivisionsListSectionProps) => {
  return (
    <section className="bg-brand-blue-50 px-8 py-16 desktop:py-24">
      {/* Nagłówek i opis sekcji zawsze widoczne */}
      <div className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
        <Typography as="h2" variant="h2" className="mb-4 text-brand-gray-900">
          {title}
        </Typography>
        <Typography as="p" variant="h5" className="text-black">
          {description}
        </Typography>
      </div>

      {/* Renderowanie warunkowe: Siatka z kafelkami LUB komunikat o braku */}
      {divisions && divisions.length > 0 ? (
        <div className="max-w-250r mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {divisions.map((division, index) => (
            <DivisionPageCard
              key={division._id}
              division={division}
              index={index}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <Typography as="h3" variant="h3" className="text-slate-500">
            {locale === "pl" ? "Brak przedstawicielstw" : "No divisions found"}
          </Typography>
        </div>
      )}
    </section>
  );
};
