import { getTranslations } from "next-intl/server";
import Typography from "../ui/typography";
import { getHeading } from "../../lib/heading";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "../ui/contact-form";
import { Container } from "../ui/container";

const ContactSection = async ({ index, data }: any) => {
  const t = await getTranslations();

  return (
    <Container className="bg-(--color-brand-blue-900) py-16 text-white" contentWidth="xl">
      <div className="mx-auto grid grid-cols-1 gap-24 lg:grid-cols-2">
        <div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <Typography as={getHeading(index)} variant="h1" className="mobile:mb-8 mb-12">
                {data.heading}
              </Typography>

              {data.subtitle && (
                <Typography as="p" variant="body-xl" className="font-semibold lg:text-xl">
                  {data.subtitle}
                </Typography>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {data.contactEmail && (
                <div className="text- flex items-center gap-3">
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                  <a
                    href={`mailto:${data.contactEmail}`}
                    className="underline underline-offset-4 transition-colors hover:text-brand-blue"
                  >
                    {data.contactEmail}
                  </a>
                </div>
              )}

              {data.contactAddress && (
                <div className="text- flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
                  <Typography as="span" variant="body-m">
                    {data.contactAddress}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Kliencki formularz */}
        <div>
          <Typography as="p" variant="body-m" className="mb-6">
            {t("contactForm.starsign")}
          </Typography>
          <ContactForm sectionKey={data._key} contactEmail={data.contactEmail} />
        </div>
      </div>
    </Container>
  );
};

export default ContactSection;
