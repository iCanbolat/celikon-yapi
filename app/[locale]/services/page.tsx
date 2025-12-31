import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Building2, Paintbrush, ClipboardList, Users } from "lucide-react";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.services" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        tr: "/tr/services",
        en: "/en/services",
      },
    },
  };
}

const serviceIcons = {
  construction: Building2,
  renovation: Paintbrush,
  consulting: ClipboardList,
  projectManagement: Users,
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");

  const services = [
    { key: "construction", icon: serviceIcons.construction },
    { key: "renovation", icon: serviceIcons.renovation },
    { key: "consulting", icon: serviceIcons.consulting },
    { key: "projectManagement", icon: serviceIcons.projectManagement },
  ] as const;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {locale === "tr"
              ? "Projeniz İçin Bizimle İletişime Geçin"
              : "Contact Us For Your Project"}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === "tr"
              ? "Deneyimli ekibimiz projenizi hayata geçirmek için hazır."
              : "Our experienced team is ready to bring your project to life."}
          </p>
          <a
            href="mailto:info@celikon.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {locale === "tr" ? "İletişime Geç" : "Get in Touch"}
          </a>
        </div>
      </section>
    </div>
  );
}
