import { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getProjects } from "@/lib/contentful";
import { ProjectsGrid } from "@/components/projects/projects-grid";

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

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </div>
  );
}
