import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import { Accordion } from "../ui/accordion";
import { Container } from "../ui/container";
import { DocumentGroup } from "../ui/documents";
import Typography from "../ui/typography";

export const DocumentsSection = ({ data, locale }: PageBuilderSectionProps<"documentsSection">) => {
  return (
    <Container
      contentWidth="xl"
      className="bg-brand-blue-50 px-5 py-12"
      contentClassName="flex flex-col gap-10 desktop:gap-16"
    >
      {data.groups?.map((group) => (
        <div key={group._key} className="flex flex-col gap-6 px-4 desktop:px-0">
          <Typography variant="h2" className="text-center desktop:text-left">
            {group.title}
          </Typography>
          <Accordion type="multiple" className="flex flex-col">
            {group.items?.map((item) => (
              <DocumentGroup key={item._key} group={item} locale={locale} />
            ))}
          </Accordion>
        </div>
      ))}
    </Container>
  );
};

export default DocumentsSection;
