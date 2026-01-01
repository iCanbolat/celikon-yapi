import { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { ProjectCategory } from "@/lib/contentful";
import { ServiceCard } from "@/components/services/service-card";
import { ServicesGrid } from "@/components/services/services-grid";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.services" });

  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://celikon-yapi.vercel.app";

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        tr: "/tr/services",
        en: "/en/services",
      },
    },
  };
}

const servicesData: Array<{
  key: string;
  image: string;
  category: ProjectCategory;
}> = [
  {
    key: "steelFactory",
    image: "/images/iston-fabrika.jpg",
    category: "fabrika",
  },
  {
    key: "steelWarehouse",
    image: "/images/yapi.jpg",
    category: "depo",
  },
  {
    key: "steelBridge",
    image: "/images/kopru.jpg",
    category: "köprü",
  },
  {
    key: "restoration",
    image: "/images/msb.jpg",
    category: "restorasyon",
  },
];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");

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
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-yellow-400 uppercase tracking-wider text-sm font-bold mb-2">
              {locale === "tr" ? "ÇÖZÜMLER" : "OUR SOLUTION"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {locale === "tr"
                ? "Neler Sunuyoruz Keşfedin"
                : "Find Out What We Offer"}
            </h2>
          </div>

          <ServicesGrid>
            {servicesData.map((service, index) => (
              <ServiceCard
                key={service.key}
                number={index + 1}
                title={t(`items.${service.key}.title`)}
                description={t(`items.${service.key}.description`)}
                image={service.image}
                category={service.category}
              />
            ))}
          </ServicesGrid>
        </div>
      </section>
    </div>
  );
}
