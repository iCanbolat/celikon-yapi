import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getProjects } from "@/lib/contentful";
import { ProjectCard } from "@/components/projects/project-card";
import { Building2 } from "lucide-react";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.projects" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        tr: "/tr/projects",
        en: "/en/projects",
      },
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");
  const projects = await getProjects(locale);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">{t("noProjects")}</p>

              {/* Placeholder projects for development */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                        {locale === "tr" ? "Kategori" : "Category"}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">
                        {locale === "tr"
                          ? `Örnek Proje ${i}`
                          : `Sample Project ${i}`}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {locale === "tr"
                          ? "Bu alan Contentful'dan proje verileri geldiğinde doldurulacaktır."
                          : "This area will be filled when project data comes from Contentful."}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{locale === "tr" ? "İstanbul" : "Istanbul"}</span>
                        <span>2024</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
