import type { Locale } from "next-intl";
import { cn } from "../../lib/utils";
import type { EventPreview as EventPreviewType } from "../../sanity/queries/events";
import EventPreview from "./event-preview";
import { getTranslations } from "next-intl/server";
import Typography from "../ui/typography";

export type EventListLimits = {
  desktopLimit?: number;
  mobileLimit?: number;
};
type Props = {
  events: Array<EventPreviewType>;
  locale: Locale;
  isArchive?: boolean;
} & EventListLimits;

async function EventList({ events, locale, desktopLimit, mobileLimit, isArchive }: Props) {
  const t = await getTranslations({ locale, namespace: "events" });
  return (
    <div className="flex flex-col gap-4">
      {events && events.length > 0 ? (
        events.map((e, index) => (
          <EventPreview
            key={e._id}
            event={e}
            locale={locale}
            isArchive={isArchive}
            className={cn(
              mobileLimit && index >= mobileLimit && "hidden desktop:block",
              desktopLimit && index >= desktopLimit && "desktop:hidden"
            )}
          />
        ))
      ) : (
        <Typography variant="h5" className="self-center pt-12 opacity-60">
          {t("noEvents")}
        </Typography>
      )}
    </div>
  );
}

export default EventList;
