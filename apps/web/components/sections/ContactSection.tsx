import { getTranslations } from "next-intl/server";
import Typography from "../ui/typography";
import { getHeading } from "../../lib/heading";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "../ui/contact-form";
import { Container } from "../ui/container";

const ContactSection = async ({ index, data }: any) => {
  const t = await getTranslations();

  return (
    <Container className="py-16">
      <div className="mx-auto grid grid-cols-1 gap-24 lg:grid-cols-2">
        <div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <Typography as={getHeading(index)} variant="h1">
                {data.heading}
              </Typography>

              {data.subtitle && (
                <Typography as="p" variant="title-m" className="font-semibold lg:text-xl">
                  {data.subtitle}
                </Typography>
              )}
              <Typography as="p" variant="body-m" className="text-gray-600">
                {t("contactForm.starsign")}
              </Typography>
            </div>

            <div className="flex flex-col gap-2">
              {data.contactEmail && (
                <div className="text- flex items-center gap-3">
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                  <a
                    href={`mailto:${data.contactEmail}`}
                    className="text-brand-gray-900 underline underline-offset-4 transition-colors hover:text-brand-blue"
                  >
                    {data.contactEmail}
                  </a>
                </div>
              )}

              {data.contactAddress && (
                <div className="text- flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
                  <Typography as="span" variant="body-m" className="text-brand-gray-900">
                    {data.contactAddress}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Kliencki formularz */}
        <ContactForm />
      </div>
    </Container>
  );
};

export default ContactSection;
