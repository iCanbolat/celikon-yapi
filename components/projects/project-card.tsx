import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import type { Project } from "@/lib/contentful";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full"
      aria-label={project.title}
    >
      <article className="flex min-h-128.75 sm:min-h-140 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative">
          <div className="relative h-64 overflow-hidden">
            {project.featuredImage ? (
              <Image
                src={project.featuredImage.url}
                alt={project.featuredImage.title || project.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw"
                priority={false}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <Building2 className="h-16 w-16 text-gray-300" />
              </div>
            )}

            <div className="absolute left-4 top-4 rounded-xl bg-white/90 px-3 py-2 text-center shadow-sm backdrop-blur">
              <div className="text-3xl font-bold leading-none text-gray-900">
                {project.year || "—"}
              </div>
              <div className="mx-auto mt-1 h-0.5 w-6 bg-yellow-400" />
              {project.location && (
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 line-clamp-1">
                  {project.location}
                </div>
              )}
            </div>
          </div>

          {project.categoryLabel && (
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-gray-900/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg">
              <span className="block h-px w-4 bg-yellow-400" />
              {project.categoryLabel}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          {project.client && (
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              <span className="block h-px w-6 bg-yellow-400" />
              {project.client}
            </div>
          )}

          <h3 className="text-xl font-semibold leading-tight text-gray-900 transition-colors group-hover:text-blue-700">
            {project.title}
          </h3>

          {project.shortDescription && (
            <div className="space-y-2">
              <div className="h-0.5 w-10 bg-yellow-400" />
              <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">
                {project.shortDescription}
              </p>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              {project.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-all group-hover:gap-3">
              Read more
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-gray-900 shadow-md transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
