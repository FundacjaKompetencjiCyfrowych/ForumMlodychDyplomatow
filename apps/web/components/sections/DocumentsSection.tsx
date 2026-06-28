import type { InferFragmentType } from "groqd";
import { DownloadIcon } from "lucide-react";
import type { Locale } from "next-intl";
import { cn } from "../../lib/utils";
import type { PageBuilderSectionProps } from "../../sanity/queries/pageBuilder";
import {
  documentGroupFragment,
  transformFile,
} from "../../sanity/queries/pageBuilder/documentsSectionFragment";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Container } from "../ui/container";
import { Separator } from "../ui/separator";
import Typography from "../ui/typography";
const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  else if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  else return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};
const FileCard = ({ children, className }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={cn("w-full border-b border-gray-300 bg-white px-6 py-6", className)}>
      {children}
    </div>
  );
};
const DocumentItem = ({
  file,
  locale,
  subItem = false,
}: {
  locale: Locale;
  file: ReturnType<typeof transformFile>;
  subItem?: boolean;
}) => {
  if (!file.url) return null;
  const updatedAt = new Date(file.date ?? "0");
  return (
    <FileCard
      className={cn(
        "flex flex-col items-start gap-2 desktop:flex-row desktop:items-center",
        subItem && "border-gray-200"
      )}
    >
      <Typography variant="body-m" className="mb-0! grow font-bold">
        {file.name}
      </Typography>
      <div className="flex w-full flex-row items-center justify-between gap-10 desktop:w-auto desktop:justify-end">
        <div className="flex shrink-0 flex-row gap-2">
          <Typography as="time" variant="body-s" dateTime={updatedAt.toISOString()}>
            {updatedAt.toLocaleDateString(locale, {
              year: "numeric",
              month: "numeric",
              day: "2-digit",
            })}
          </Typography>
          {file.size && <Separator orientation="vertical" />}
          {file.size && <Typography variant="body-s">{formatFileSize(file.size)}</Typography>}
        </div>
        <a className="shrink-0" href={file.url} target="_blank" rel="noopener noreferrer">
          <DownloadIcon />
        </a>
      </div>
    </FileCard>
  );
};

const DocumentGroup = ({
  group,
  locale,
}: {
  locale: Locale;
  group: InferFragmentType<typeof documentGroupFragment>;
}) => {
  if (group._type === "fileData") {
    // GROQD transform seems to be broken, so we need to transform the file data here instead of in the GROQD query
    return <DocumentItem file={transformFile(group.fileData)} locale={locale} />;
  }
  return (
    <AccordionItem value={group._key} className="w-full">
      <FileCard className="hover:bg-gray-50">
        <AccordionTrigger className="w-full cursor-pointer items-center p-0">
          <Typography variant="body-l" className="font-bold">
            {group.title}
          </Typography>
        </AccordionTrigger>
      </FileCard>
      <AccordionContent className="p-0">
        {group.items?.map((item) =>
          item.fileData ? (
            <DocumentItem
              key={item.fileData.file?._id}
              file={transformFile(item.fileData)}
              locale={locale}
            />
          ) : null
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export const DocumentsSection = ({ data, locale }: PageBuilderSectionProps<"documentsSection">) => {
  return (
    <Container className="flex flex-col gap-16 bg-brand-blue-50">
      {data.groups?.map((group) => (
        <div key={group._key} className="flex flex-col gap-6">
          <Typography variant="h2">{group.title}</Typography>
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
