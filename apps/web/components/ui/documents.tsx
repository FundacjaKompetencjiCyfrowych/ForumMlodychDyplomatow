import type { InferFragmentType } from "groqd";
import { DownloadIcon } from "lucide-react";
import type { Locale } from "next-intl";
import { formatFileSize } from "../../lib/files";
import { cn } from "../../lib/utils";
import {
  documentGroupFragment,
  transformFile,
} from "../../sanity/queries/pageBuilder/documentsSectionFragment";
import { AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Separator } from "./separator";
import Typography from "./typography";

const FileCard = ({ children, className }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={cn("w-full border-b border-gray-300 bg-white px-6 py-7", className)}>
      {children}
    </div>
  );
};

export const DocumentItem = ({
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
          <Typography
            as="time"
            variant="caption"
            dateTime={updatedAt.toISOString()}
            className="text-gray-600"
          >
            {updatedAt.toLocaleDateString(locale, {
              year: "numeric",
              month: "numeric",
              day: "2-digit",
            })}
          </Typography>
          {file.size && <Separator orientation="vertical" />}
          {file.size && (
            <Typography variant="caption" className="text-gray-600">
              {formatFileSize(file.size)}
            </Typography>
          )}
        </div>
        <a className="shrink-0" href={file.url} target="_blank" rel="noopener noreferrer">
          <DownloadIcon size={16} className="text-(--color-brand-red)" />
        </a>
      </div>
    </FileCard>
  );
};

export const DocumentGroup = ({
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
