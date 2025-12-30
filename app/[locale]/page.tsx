import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getFeaturedProjects } from "@/lib/contentful";
import { ProjectCard } from "@/components/projects/project-card";
import { Building2, HardHat, Ruler, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/home/hero-section";

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
  const featuredProjects = await getFeaturedProjects(locale, 3);

  return (
    <div>
      {/* Hero Section with Video Background */}
      <HeroSection locale={locale} />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <div className="text-3xl font-bold text-gray-900">150+</div>
              <div className="text-gray-600">{t("common.projects")}</div>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">
                {locale === "tr" ? "Uzman Kadro" : "Expert Team"}
              </div>
            </div>
            <div className="text-center">
              <HardHat className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <div className="text-3xl font-bold text-gray-900">25+</div>
              <div className="text-gray-600">
                {locale === "tr" ? "Yıl Deneyim" : "Years Experience"}
              </div>
            </div>
            <div className="text-center">
              <Ruler className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <div className="text-3xl font-bold text-gray-900">500K</div>
              <div className="text-gray-600">m²</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("home.featured.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("home.featured.subtitle")}
            </p>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder cards when no projects */}
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
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                {t("common.allProjects")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
