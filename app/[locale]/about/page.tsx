import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Award, Shield, Lightbulb, HardHat, Users } from "lucide-react";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.about" });

  return {
    title: t("title"),
    description: t("description"),
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

  const values = [
    { key: "quality", icon: Award },
    { key: "trust", icon: Shield },
    { key: "innovation", icon: Lightbulb },
    { key: "safety", icon: HardHat },
  ] as const;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("story.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t("story.content")}
              </p>
            </div>
            <div className="bg-gray-200 rounded-xl h-80 flex items-center justify-center">
              <Users className="w-24 h-24 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t("values.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map(({ key, icon: Icon }) => (
              <div key={key} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t(`values.${key}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t("team.title")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            {t("team.content")}
          </p>

          {/* Team placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {locale === "tr" ? `Ekip Üyesi ${i}` : `Team Member ${i}`}
                </h3>
                <p className="text-gray-500 text-sm">
                  {locale === "tr" ? "Pozisyon" : "Position"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
