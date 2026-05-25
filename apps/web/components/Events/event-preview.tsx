import { ChevronDown, ClockIcon, PinIcon } from "lucide-react";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { cn } from "../../lib/utils";
import type { EventPreview } from "../../sanity/queries/events";
import { Link } from "../ui/link";
import Typography from "../ui/typography";

type Props = {
  event: EventPreview;
  locale: Locale;
  isArchive?: boolean;
  className?: string;
};

const EventPreview = async ({ event, locale, isArchive, className }: Props) => {
  if (!event.startDate) return null;
  const date = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const t = await getTranslations("events");
  return (
    <div className={cn("flex flex-col overflow-clip rounded-[8px] desktop:flex-row", className)}>
      <div
        className={cn(
          "flex h-35 min-h-35 w-full flex-col items-center justify-center gap-4 bg-clip-border px-2 text-gray-50 desktop:aspect-square desktop:h-auto desktop:w-auto",
          isArchive ? "bg-brand-blue/60" : "bg-brand-blue"
        )}
      >
        <Typography as="span" variant="h3" className="m-0">
          {date.getDate()}
        </Typography>
        <span className="text-sm capitalize">{date.toLocaleString(locale, { month: "long" })}</span>
      </div>
      <div className="flex w-full flex-col gap-6 px-4 py-6 desktop:px-6">
        <Typography as="h3" variant="h4">
          {event.name}
        </Typography>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col gap-4 text-gray-600">
            {event.venue && (
              <span className="flex flex-row gap-1.5">
                <PinIcon />
                <Typography variant="h5" lineHeight="none" as="span">
                  {event.venue}
                </Typography>
              </span>
            )}
            {event.startDate && (
              <span className="flex flex-row gap-1.5">
                <ClockIcon />
                <Typography variant="h5" lineHeight="none" as="span">
                  <time dateTime={date.toISOString()}>
                    {date.toLocaleString(locale, { hour: "2-digit", minute: "2-digit" })}
                  </time>
                  {endDate && (
                    <time dateTime={endDate.toISOString()}>
                      {" - " +
                        endDate.toLocaleString(locale, { hour: "2-digit", minute: "2-digit" })}
                    </time>
                  )}
                </Typography>
              </span>
            )}
          </div>
          {!isArchive && event.registrationUrl && (
            <Link
              href={event.registrationUrl}
              openInNewTab
              variant="primary"
              iconRight={<ChevronDown />}
            >
              {t("signUp")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
