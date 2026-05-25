import { cn } from "../../lib/utils";
import type { EventPreview as EventPreviewType } from "../../sanity/queries/events";
import EventPreview from "./event-preview";

export type EventListLimits = {
  desktopLimit?: number;
  mobileLimit?: number;
};
type Props = {
  events: Array<EventPreviewType>;
  locale: string;
  isArchive?: boolean;
} & EventListLimits;

async function EventList({ events, locale, desktopLimit, mobileLimit, isArchive }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {events.map((e, index) => (
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
      ))}
    </div>
  );
}

export default EventList;
