import { q } from "../../groqd"; // upewnij się, że ścieżka do groqd jest poprawna
import type { PageBuilderSection } from ".";

export const contactSectionFragment = q
  .fragment<PageBuilderSection<"contactSection">>()
  .project((sub) => ({
    heading: sub.field("heading"),
    subtitle: sub.field("subtitle"),
    contactEmail: sub.field("contactEmail"),
    contactPhone: sub.field("contactPhone"),
    contactAddress: sub.field("contactAddress"),
    recipientEmail: sub.field("recipientEmail"),
  }));
