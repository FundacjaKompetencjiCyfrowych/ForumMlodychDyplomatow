export interface PublicationPdfProps {
  pdfUrl?: string | null;
  locale?: string;
}

export const PublicationPdf = ({ pdfUrl }: PublicationPdfProps) => {
  if (!pdfUrl) return null;

  return (
    <section className="mx-auto w-full max-w-360 px-4 py-8 sm:px-12">
      <div className="relative w-full overflow-hidden border border-border/60 bg-muted shadow-sm">
        <iframe
          src={`${pdfUrl}#view=FitH`}
          className="h-150 w-full sm:h-200"
          title="Dokument PDF"
          loading="lazy"
        />
      </div>
    </section>
  );
};
