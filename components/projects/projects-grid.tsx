"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import type { Project, ProjectCategory } from "@/lib/contentful";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const t = useTranslations("projects");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-0 border-b border-gray-200"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.key}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleCategoryChange(category.key)}
            className={`relative px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === category.key
                ? "bg-linear-to-r from-yellow-400 to-yellow-500 text-gray-900"
                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {category.label}
            {activeCategory === category.key && (
              <motion.span
                layoutId="activeCategory"
                className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-2 mt-8"
            >
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
                    className={`min-w-[2.5rem] ${
                      currentPage === page ? "font-bold" : ""
                    }`}
                  >
                    {page}
                  </Button>
                )
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
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-12"
        >
          <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">{t("noProjectsInCategory")}</p>
        </motion.div>
      )}
    </div>
  );
}
