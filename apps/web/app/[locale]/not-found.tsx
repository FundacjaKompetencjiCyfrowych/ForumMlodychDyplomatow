import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import Typography from "@/components/ui/typography";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <Container contentWidth="xl">
      <div className="grid grid-cols-1 items-center gap-6 p-2 lg:grid-cols-2 lg:gap-16">
        <div className="order-1 lg:order-2">
          <Image
            width={550}
            height={400}
            alt="404 Not found"
            src="/static/img/404.png"
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="order-2 flex flex-col gap-10 lg:order-1">
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
      </div>
    </Container>
  );
}
