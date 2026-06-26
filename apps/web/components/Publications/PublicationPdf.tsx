import React from "react";
import { Typography } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";

export interface PublicationPdfProps {
  pdfUrl?: string | null;
  locale?: string;
}

const translations = {
  pl: {
    pdfFallback: "Twoja przeglądarka nie obsługuje wbudowanego czytnika PDF.",
    downloadPdf: "Pobierz plik PDF bezpośrednio",
  },
  en: {
    pdfFallback: "Your browser does not support embedded PDF viewers.",
    downloadPdf: "Download the PDF file directly",
  },
};

export const PublicationPdf = ({ pdfUrl, locale = "pl" }: PublicationPdfProps) => {
  if (!pdfUrl) return null;

  const t = translations[locale as keyof typeof translations] || translations.pl;

  return (
    <section className="mx-auto w-full px-4 py-8 sm:px-12">
      <div className="relative w-full overflow-hidden border border-border/60 bg-muted shadow-sm">
        <iframe
          src={`${pdfUrl}#view=FitH`}
          className="h-150 w-full sm:h-200"
          title="Dokument PDF"
          loading="lazy"
        >
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <Typography variant="body-m" className="mb-4 text-muted-foreground">
              {t.pdfFallback}
            </Typography>
            <Link href={pdfUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
              {t.downloadPdf}
            </Link>
          </div>
        </iframe>
      </div>
    </section>
  );
};
