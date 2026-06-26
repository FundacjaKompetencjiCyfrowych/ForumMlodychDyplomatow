import { ClockIcon, PinIcon } from "lucide-react";
import { useTranslations, type Locale } from "next-intl";
import { cn } from "../../lib/utils";
import type { EventPreview as EventPreviewType } from "../../sanity/queries/events";
import { Link } from "../ui/link";
import Typography from "../ui/typography";

type Props = {
  event: EventPreviewType;
  isArchive?: boolean;
  className?: string;
  locale: Locale;
};

const EventPreview = ({ event, isArchive, className, locale }: Props) => {
  const t = useTranslations("events");
  if (!event.startDate) return null;
  const date = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  return (
    <div className={cn("flex flex-col overflow-clip rounded-lg desktop:flex-row", className)}>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4 bg-clip-border px-2 text-gray-50 desktop:w-20",
          isArchive ? "bg-brand-red-100" : "bg-brand-red-900"
        )}
      >
        <Typography
          as="span"
          variant="h3"
          className={cn("m-0", isArchive ? "text-gray-500" : "text-white")}
        >
          {date.getDate()}
        </Typography>
        <span className="text-sm capitalize">{date.toLocaleString(locale, { month: "long" })}</span>
      </div>
      <div className="flex w-full flex-col gap-6 px-4 py-6 desktop:px-6">
        <div className="flex flex-col gap-2">
          {event.type && (
            <Typography variant="caption" className="text-gray-600 uppercase">
              {event.type}
            </Typography>
          )}
          <Typography as="h3" variant="h4">
            {event.name}
          </Typography>
        </div>

        <div className="flex flex-col gap-2 text-gray-600">
          <Typography variant="body-s" className="flex flex-row gap-2">
            <ClockIcon />
            <time dateTime={date.toISOString()}>
              {date.toLocaleString(locale, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
            {endDate && (
              <>
                {"–"}
                <time dateTime={endDate.toISOString()}>
                  {endDate.toLocaleString(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </>
            )}
          </Typography>
          <Typography variant="body-s" className="flex flex-row gap-2">
            <PinIcon />
            {event.venue}
          </Typography>
        </div>
        <Typography variant="body-m" className="whitespace-break-spaces text-gray-600">
          {event.excerpt}
        </Typography>
        {!isArchive && event.registrationUrl && (
          <Link href={event.registrationUrl} openInNewTab variant="secondary" className="w-fit">
            {t("signUp")}
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventPreview;
