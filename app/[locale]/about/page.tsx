import { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeader } from "@/components/layout/section-header";
import { CertificateCard } from "@/components/about/certificate-card";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.about" });

  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://celikon-yapi.vercel.app";

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        tr: "/tr/about",
        en: "/en/about",
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center -mt-16 h-96 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner.webp"
            alt={t("title")}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge={t("badge")}
            title={t("whoWeAre")}
            description={t("description")}
            align="center"
          />

          {/* Certificates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <CertificateCard
              src="/images/belge1.jpg"
              alt="EPDK Certification"
            />
            <CertificateCard
              src="/images/belge2.png"
              alt="Insperla Certification"
            />
            <CertificateCard
              src="/images/belge3.png"
              alt="HenKa Certification"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Google Map */}
            <div className="h-full min-h-150 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.157325170872!2d29.011114055580325!3d41.08740908615356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab67030a09e3d%3A0xf8d042e5c57e6676!2zS29uYWtsYXIsIFplbmNlZmlsIFNrLCAzNDMzMCBCZcWfaWt0YcWfL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1767195154653!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Celikon Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
