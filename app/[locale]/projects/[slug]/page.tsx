import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, getProjects } from "@/lib/contentful";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Tag,
  Building2,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const locales: Locale[] = ["tr", "en"];
  const params: { locale: Locale; slug: string }[] = [];

  for (const locale of locales) {
    const projects = await getProjects(locale);
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.seoTitle,
    description: project.seoDescription,
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      images: project.featuredImage ? [project.featuredImage.url] : [],
    },
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        tr: `/tr/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");
  const tCommon = await getTranslations("common");
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    // Show placeholder for development
    return (
      <div>
        <section className="bg-linear-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {tCommon("backToProjects")}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold">
              {locale === "tr" ? "Örnek Proje Detayı" : "Sample Project Detail"}
            </h1>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center mb-8">
                  <Building2 className="w-24 h-24 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("details.description")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {locale === "tr"
                    ? "Bu alan Contentful'dan proje verileri geldiğinde doldurulacaktır. Proje açıklaması, detayları ve görselleri burada görüntülenecektir."
                    : "This area will be filled when project data comes from Contentful. Project description, details and images will be displayed here."}
                </p>
              </div>
              <div>
                <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {locale === "tr" ? "Proje Bilgileri" : "Project Info"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {t("details.client")}
                        </div>
                        <div className="font-medium text-gray-900">
                          {locale === "tr" ? "Örnek Müşteri" : "Sample Client"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {t("details.location")}
                        </div>
                        <div className="font-medium text-gray-900">
                          İstanbul, Türkiye
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {t("details.year")}
                        </div>
                        <div className="font-medium text-gray-900">2024</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {t("details.category")}
                        </div>
                        <div className="font-medium text-gray-900">
                          {locale === "tr" ? "Konut" : "Residential"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tCommon("backToProjects")}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
          {project.shortDescription && (
            <p className="text-xl text-gray-300 mt-4 max-w-2xl">
              {project.shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              {project.featuredImage ? (
                <div className="relative h-96 rounded-xl overflow-hidden mb-8">
                  <Image
                    src={project.featuredImage.url}
                    alt={project.featuredImage.title || project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center mb-8">
                  <Building2 className="w-24 h-24 text-gray-400" />
                </div>
              )}

              {/* Description */}
              {project.description && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("details.description")}
                  </h2>
                  <RichTextRenderer content={project.description} />
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("details.gallery")}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative h-48 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image.url}
                          alt={image.title || `${project.title} - ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {locale === "tr" ? "Proje Bilgileri" : "Project Info"}
                </h3>
                <div className="space-y-4">
                  {project.client && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {t("details.client")}
                        </div>
                        <div className="font-medium text-gray-900">
                          {project.client}
                        </div>
                      </div>
                    </div>
                  )}
                  {project.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {t("details.location")}
                        </div>
                        <div className="font-medium text-gray-900">
                          {project.location}
                        </div>
                      </div>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {t("details.year")}
                        </div>
                        <div className="font-medium text-gray-900">
                          {project.year}
                        </div>
                      </div>
                    </div>
                  )}
                  {project.category && (
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">
                          {t("details.category")}
                        </div>
                        <div className="font-medium text-gray-900">
                          {project.category}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
