"use client";

import { useId } from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";

type GalleryImage = {
  url: string;
  title: string;
  width: number;
  height: number;
};

interface ProjectGalleryProps {
  images: GalleryImage[];
  projectTitle: string;
  projectLocation?: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildCaption(
  imageTitle: string,
  projectTitle: string,
  projectLocation?: string,
) {
  const title = escapeHtml(imageTitle || projectTitle);
  const location = projectLocation ? escapeHtml(projectLocation) : "";

  return `
    <div class="lg-project-caption">
      <h4>${title}</h4>
      ${location ? `<p>${location}</p>` : ""}
    </div>
  `;
}

export function ProjectGallery({
  images,
  projectTitle,
  projectLocation,
}: ProjectGalleryProps) {
  const galleryId = useId().replaceAll(":", "");
  const previousButtonClass = `project-gallery-prev-${galleryId}`;
  const nextButtonClass = `project-gallery-next-${galleryId}`;
  const showNavigation = images.length > 1;

  return (
    <LightGallery
      elementClassNames="block"
      licenseKey="0000-0000-000-0000"
      plugins={[lgThumbnail, lgZoom]}
      selector="a"
      speed={500}
      download={false}
      thumbnail
      animateThumb
      zoomFromOrigin={false}
    >
      <div className="relative">
        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous gallery images"
              className={`${previousButtonClass} [&.is-disabled]:pointer-events-none [&.is-disabled]:opacity-35 absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg ring-1 ring-black/10 backdrop-blur transition hover:bg-white`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next gallery images"
              className={`${nextButtonClass} [&.is-disabled]:pointer-events-none [&.is-disabled]:opacity-35 absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg ring-1 ring-black/10 backdrop-blur transition hover:bg-white`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <Swiper
          modules={[Navigation, A11y]}
          navigation={
            showNavigation
              ? {
                  prevEl: `.${previousButtonClass}`,
                  nextEl: `.${nextButtonClass}`,
                  disabledClass: "is-disabled",
                }
              : false
          }
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          watchOverflow
          grabCursor={showNavigation}
          allowTouchMove={showNavigation}
          a11y={{ enabled: true }}
          className="pb-0"
          style={{ paddingBottom: 0 }}
        >
          {images.map((image, index) => {
            const imageTitle = image.title || `${projectTitle} - ${index + 1}`;
            const size =
              image.width > 0 && image.height > 0
                ? `${image.width}-${image.height}`
                : undefined;

            return (
              <SwiperSlide key={`${image.url}-${index}`} className="h-auto">
                <a
                  href={image.url}
                  className="group relative block h-48 overflow-hidden rounded-lg"
                  data-sub-html={buildCaption(
                    imageTitle,
                    projectTitle,
                    projectLocation,
                  )}
                  data-lg-size={size}
                  aria-label={imageTitle}
                >
                  <ImageWithSkeleton
                    src={image.url}
                    alt={imageTitle}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </LightGallery>
  );
}
