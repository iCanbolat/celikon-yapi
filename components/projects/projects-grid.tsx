"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import type { Project, ProjectCategory } from "@/lib/contentful";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const t = useTranslations("projects");
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as ProjectCategory | null;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const itemsPerPage = 6;

  // Set initial category from URL
  useEffect(() => {
    if (
      categoryParam &&
      ["depo", "köprü", "fabrika", "restorasyon", "diğer"].includes(
        categoryParam,
      )
    ) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories: Array<{ key: ProjectCategory | "all"; label: string }> = [
    { key: "all", label: t("filters.all") },
    { key: "depo", label: t("filters.depo") },
    { key: "köprü", label: t("filters.köprü") },
    { key: "fabrika", label: t("filters.fabrika") },
    { key: "restorasyon", label: t("filters.restorasyon") },
    { key: "diğer", label: t("filters.diğer") },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handleCategoryChange = (category: ProjectCategory | "all") => {
    setActiveCategory(category);
  };

  const updateScrollState = () => {
    const container = scrollContainerRef.current;

    if (!container) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const hasOverflow = container.scrollWidth > container.clientWidth + 1;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(hasOverflow && container.scrollLeft > 0);
    setCanScrollRight(hasOverflow && container.scrollLeft < maxScrollLeft - 1);
  };

  useEffect(() => {
    updateScrollState();

    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const observer = new ResizeObserver(() => updateScrollState());

    observer.observe(container);
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [activeCategory]);

  const scrollCategories = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const scrollAmount = Math.min(container.clientWidth * 0.8, 320);

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-12">
      {/* Category Filters - CSS horizontal scroll with arrow controls */}
      <div className="border-b border-gray-200 animate-fade-in-up">
        <div className="flex items-stretch gap-2">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollCategories("left")}
              className="shrink-0 flex items-center justify-center px-3 text-gray-500 transition-colors hover:text-gray-900"
              aria-label="Kategorileri sola kaydır"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="min-w-0 flex-1 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="flex w-max md:w-full md:justify-center">
              {categories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => handleCategoryChange(category.key)}
                  className={`relative px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap sm:px-8 sm:text-sm ${
                    activeCategory === category.key
                      ? "bg-neutral-900 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollCategories("right")}
              className="shrink-0 flex items-center justify-center px-3 text-gray-500 transition-colors hover:text-gray-900"
              aria-label="Kategorileri sağa kaydır"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <>
          <div
            key={`${activeCategory}-${currentPage}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 animate-fade-in">
              <Button
                variant="yellow"
                size="icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "yellow" : "outline"}
                    size="icon"
                    onClick={() => goToPage(page)}
                    className={`min-w-10 ${
                      currentPage === page ? "font-bold" : ""
                    }`}
                  >
                    {page}
                  </Button>
                ),
              )}

              <Button
                variant="yellow"
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 animate-fade-in-up">
          <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">{t("noProjectsInCategory")}</p>
        </div>
      )}
    </div>
  );
}
