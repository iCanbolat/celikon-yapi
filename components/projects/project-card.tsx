import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Building2, MapPin, Calendar } from "lucide-react";
import type { Project } from "@/lib/contentful";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {project.featuredImage ? (
          <Image
            src={project.featuredImage.url}
            alt={project.featuredImage.title || project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Building2 className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {project.category && (
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
            {project.category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        {project.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.shortDescription}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          {project.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {project.location}
            </span>
          )}
          {project.year && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {project.year}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
