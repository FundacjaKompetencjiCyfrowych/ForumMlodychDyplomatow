import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import Typography from "@/components/ui/typography";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <Container contentWidth="max">
      <div className="lg:gap-16*: flex flex-col items-center gap-6 lg:min-h-150 lg:flex-row">
        <div className="flex flex-1 flex-col gap-10">
          <Typography variant="h1" as="h1">
            {t("title")}
          </Typography>
          <Typography variant="body-xl" as="p">
            {t("desc")}
          </Typography>
          <Link href="/" variant="primary" className="w-fit" size="l">
            {t("button")}
          </Link>
        </div>
        <div className="flex-1">
          <Image width={600} height={500} alt="" src="" />
        </div>
      </div>
    </Container>
  );
}
