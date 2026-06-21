import Typography from "../ui/typography";
import type { PageBuilderSectionProps } from "@/sanity/queries/pageBuilder";
import PersonCard from "../ui/person-card";

const TeamDivisions = ({ data }: PageBuilderSectionProps<"teamDivisionsSection">) => {
  const { header, text, members } = data;

  return (
    <section className="w-full bg-slate-50 px-6 py-18">
      <div className="mb-12 text-center">
        <Typography as="h2" variant="h2" className="mb-4">
          {header}
        </Typography>
        {text && (
          <Typography as="p" variant="p1" className="mx-auto max-w-2xl text-slate-600">
            {text}
          </Typography>
        )}
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members?.map((member, index) => (
          <PersonCard person={member} key={index} />
        ))}
      </div>
    </section>
  );
};

export default TeamDivisions;
