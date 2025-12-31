import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getFeaturedProjects } from "@/lib/contentful";
import { ProjectCard } from "@/components/projects/project-card";
import { Building2, HardHat, Ruler, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/home/hero-section";
import { SectionHeader } from "@/components/layout/section-header";
import { FeaturedProjectsCarousel } from "@/components/home/featured-projects-carousel";
import { TrustedPartners } from "@/components/home/trusted-partners";
import { StatsCounter } from "@/components/home/stats-counter";
import { StackingServices } from "@/components/home/stacking-services";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.home" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        tr: "/tr",
        en: "/en",
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const featuredProjects = await getFeaturedProjects(locale, 6);

  console.log(featuredProjects);
  

  return (
    <div>
      {/* Hero Section with Video Background */}
      <HeroSection locale={locale} />

      {/* Stats Section */}
      <section className="pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge={locale === "tr" ? "Öne Çıkan Değerler" : "Key Numbers"}
            title={
              locale === "tr" ? "Güçlü Referanslar" : "Strong Track Record"
            }
            description={
              locale === "tr"
                ? "Her projede kalite, güven ve deneyimi bir arada sunuyoruz."
                : "Delivering quality, trust, and expertise across every project."
            }
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter
              icon={
                <Building2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              }
              value={150}
              label={t("common.projects")}
              suffix="+"
            />
            <StatsCounter
              icon={<Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />}
              value={50}
              label={locale === "tr" ? "Uzman Kadro" : "Expert Team"}
              suffix="+"
            />
            <StatsCounter
              icon={
                <HardHat className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              }
              value={25}
              label={locale === "tr" ? "Yıl Deneyim" : "Years Experience"}
              suffix="+"
            />
            <StatsCounter
              icon={<Ruler className="w-12 h-12 mx-auto mb-4 text-blue-600" />}
              value={500}
              label="m²"
              suffix="K"
            />
          </div>
        </div>
      </section>

      {/* References */}
      <TrustedPartners locale={locale} />

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge={locale === "tr" ? "Öne Çıkan" : "Featured"}
            title={t("home.featured.title")}
            description={t("home.featured.subtitle")}
          />

          {featuredProjects.length > 0 ? (
            <FeaturedProjectsCarousel
              projects={featuredProjects}
              locale={locale}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {locale === "tr"
                        ? `Örnek Proje ${i}`
                        : `Sample Project ${i}`}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {locale === "tr"
                        ? "Bu alan Contentful'dan proje verileri geldiğinde doldurulacaktır."
                        : "This area will be filled when project data comes from Contentful."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button variant="yellow" size="lg" asChild>
              <Link href="/projects">
                {t("common.allProjects")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <StackingServices
        services={[
          {
            key: "steelFactory",
            image: "/images/iston-fabrika.jpg",
            title: t("services.items.steelFactory.title"),
            description: t("services.items.steelFactory.description"),
          },
          {
            key: "steelWarehouse",
            image: "/images/yapi.jpg",
            title: t("services.items.steelWarehouse.title"),
            description: t("services.items.steelWarehouse.description"),
          },
          {
            key: "steelBridge",
            image: "/images/kopru.jpg",
            title: t("services.items.steelBridge.title"),
            description: t("services.items.steelBridge.description"),
          },
          {
            key: "restoration",
            image: "/images/msb.jpg",
            title: t("services.items.restoration.title"),
            description: t("services.items.restoration.description"),
          },
        ]}
        locale={locale}
      />
    </div>
  );
}
