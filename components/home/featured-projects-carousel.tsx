"use client";

import { useRef, useEffect, useState } from "react";
import type { Project } from "@/lib/contentful";
import { ProjectCard } from "@/components/projects/project-card";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedProjectsCarouselProps {
  projects: Project[];
  locale: Locale;
}

export function FeaturedProjectsCarousel({
  projects,
  locale,
}: FeaturedProjectsCarouselProps) {
  const hasMultipleSlides = projects.length > 1;
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [SwiperComponents, setSwiperComponents] = useState<any>(null);

  useEffect(() => {
    // Dynamically load Swiper
    const loadSwiper = async () => {
      const [swiperReact, swiperModules] = await Promise.all([
        import("swiper/react"),
        import("swiper/modules"),
      ]);
      setSwiperComponents({
        Swiper: swiperReact.Swiper,
        SwiperSlide: swiperReact.SwiperSlide,
        Navigation: swiperModules.Navigation,
      });
    };
    loadSwiper();
  }, []);

  if (!SwiperComponents) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  }

  const { Swiper, SwiperSlide, Navigation } = SwiperComponents;

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-center gap-3">
        <Button
          ref={prevRef}
          aria-label="Previous slide"
          variant="yellow"
          size="icon"
          className="rounded-full shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          ref={nextRef}
          aria-label="Next slide"
          variant="yellow"
          size="icon"
          className="rounded-full shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation = {
            ...(swiper.params.navigation as object),
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          };
        }}
        grabCursor
        observer
        observeParents
        loop={hasMultipleSlides}
        allowTouchMove={hasMultipleSlides}
        spaceBetween={24}
        slidesPerView={1}
        speed={600}
        breakpoints={{
          640: { slidesPerView: 1.15 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="featured-swiper   pb-12"
      >
        {projects.map((project) => (
          <SwiperSlide key={`${project.id}-${locale}`}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
