"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  locale: Locale;
}

interface HeroSlide {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  note: string;
  href: "/services" | "/projects" | "/about";
  cta: string;
  image: string;
}

const AUTOPLAY_DELAY = 6500;

type SwiperRuntime = {
  Swiper: React.ComponentType<any>;
  SwiperSlide: React.ComponentType<any>;
  modules: any[];
};

function getSlides(locale: Locale): HeroSlide[] {
  if (locale === "tr") {
    return [
      {
        eyebrow: "Celik Kopru Sistemleri",
        title: "YAYALARA GUVENLI",
        accent: "GECIS ALTYAPISI KURUYORUZ",
        description:
          "Demiryolu ve karayolu hatlarinda celik ustgecit sistemleri tasarlayip, uretip montajini gerceklestiriyoruz. Proje basından sahaya kadar tek sorumluluk.",
        note: "Guvenli gecis, kalici yapi.",
        href: "/projects",
        cta: "Projeleri Gor",
        image: "/images/slide1.jpeg",
      },
      {
        eyebrow: "Gece Aydinlatmali Yapilar",
        title: "ESTETIK VE",
        accent: "ISLEVSEL CELIK HACIMLER",
        description:
          "Mimari aydinlatma entegrasyonlu celik konstruksiyonlarla hem gunduz hem gece surdurulebilir, goze hitap eden kamusal alanlar olusturuyoruz.",
        note: "Mimari kaliteyi saha disipliniyle birlestiriyoruz.",
        href: "/about",
        cta: "Bizi Taniyin",
        image: "/images/slide2.jpeg",
      },
      {
        eyebrow: "Moduler Insaat Sistemleri",
        title: "BUYUK OLCEKLI PROJELERI",
        accent: "HIZLA VE EKSIKSIZ TESLIM EDIYORUZ",
        description:
          "Fabrika, lojistik merkezi ve endustriyel tesis projelerinde moduler celik sistemlerimizle sureci kisaltir, maliyeti optimize ederiz.",
        note: "Plandan sahaya kontrollü akis.",
        href: "/services",
        cta: "Hizmetleri Incele",
        image: "/images/slide3.jpeg",
      },
    ];
  }

  return [
    {
      eyebrow: "Illuminated Steel Structures",
      title: "AESTHETIC AND",
      accent: "FUNCTIONAL STEEL VOLUMES",
      description:
        "With architectural lighting integration, we create public steel structures that perform by day and captivate by night — sustainably and at scale.",
      note: "Architectural quality backed by site precision.",
      href: "/about",
      cta: "Learn About Us",
      image: "/images/slide2.jpeg",
    },
    {
      eyebrow: "Steel Pedestrian Bridges",
      title: "SAFE CROSSINGS BUILT",
      accent: "FOR EVERY COMMUTER",
      description:
        "We design, fabricate, and install steel overpass systems across railway and highway corridors — managing the full project lifecycle under one team.",
      note: "Safe passage, lasting structure.",
      href: "/projects",
      cta: "Vıew Projects",
      image: "/images/slide1.jpeg",
    },
    {
      eyebrow: "Modular Construction Systems",
      title: "LARGE-SCALE PROJECTS",
      accent: "DELIVERED FAST AND COMPLETE",
      description:
        "For factories, logistics hubs, and industrial facilities, our modular steel systems reduce timelines and optimize cost without compromising quality.",
      note: "One coordinated flow from planning to installation.",
      href: "/services",
      cta: "Explore Services",
      image: "/images/slide3.jpeg",
    },
  ];
}

function HeroSlidePanel({
  slide,
  index,
  activeIndex,
  priority = false,
  animateContent = true,
}: {
  slide: HeroSlide;
  index: number;
  activeIndex: number;
  priority?: boolean;
  animateContent?: boolean;
}) {
  const cardKey = animateContent
    ? activeIndex === index
      ? `a${index}`
      : `i${index}`
    : `s${index}`;

  const eyebrowClass = animateContent
    ? "hero-item-1 text-[0.72rem] font-black uppercase tracking-[0.32em] text-neutral-600 sm:text-xs"
    : "text-[0.72rem] font-black uppercase tracking-[0.32em] text-neutral-600 sm:text-xs";
  const titleClass = animateContent
    ? "hero-item-2 mt-3 text-[clamp(1.7rem,5.2vw,3.2rem)] font-black uppercase leading-[0.9] tracking-tight text-neutral-900"
    : "mt-3 text-[clamp(1.7rem,5.2vw,3.2rem)] font-black uppercase leading-[0.9] tracking-tight text-neutral-900";
  const descriptionClass = animateContent
    ? "hero-item-3 mt-4 max-w-xl text-sm leading-6 text-neutral-700 sm:text-base"
    : "mt-4 max-w-xl text-sm leading-6 text-neutral-700 sm:text-base";
  const ctaClass = animateContent
    ? "hero-item-4 mt-5 flex items-center gap-3"
    : "mt-5 flex items-center gap-3";

  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.image}
          alt=""
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          quality={priority ? 72 : 68}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/15" />
        <div className="absolute inset-0 bg-linear-to-r from-[#f7f4ed]/95 via-[#f7f4ed]/70 to-black/15" />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-sky-100/25" />
        <div className="absolute -bottom-28 -left-12 h-64 w-64 rounded-full bg-yellow-300/30 blur-3xl" />
        <div className="absolute right-[8%] top-[10%] h-40 w-40 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="w-full max-w-120">
          <div key={cardKey} className="relative">
            <div className="absolute inset-0 translate-x-4 -translate-y-4 border-8 border-yellow-400 sm:translate-x-5 sm:-translate-y-5 sm:border-10" />
            <div className="relative z-10 bg-white p-4 shadow-[0_20px_52px_rgba(17,24,39,0.2)] ring-1 ring-black/5 sm:p-5 lg:p-6">
              <p className={eyebrowClass}>{slide.eyebrow}</p>
              <h1 className={titleClass}>
                <span className="block">{slide.title}</span>
                <span className="mt-1.5 block">{slide.accent}</span>
              </h1>
              <p className={descriptionClass}>{slide.description}</p>
              <div className={ctaClass}>
                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="h-10 border-2 border-neutral-900 px-4 text-[0.64rem] font-black uppercase tracking-[0.18em] text-neutral-900 hover:bg-neutral-900 hover:text-white sm:h-11"
                >
                  <Link href={slide.href}>
                    {slide.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <span className="h-px w-12 bg-neutral-900/35" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function HeroSection({ locale }: HeroSectionProps) {
  const slides = getSlides(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRuntime, setSwiperRuntime] = useState<SwiperRuntime | null>(
    null,
  );
  const [hasLeftFirstSlide, setHasLeftFirstSlide] = useState(false);
  const [initialHeroAnimationDone, setInitialHeroAnimationDone] =
    useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const runtime =
    swiperRuntime && initialHeroAnimationDone ? swiperRuntime : null;
  const showControls = initialHeroAnimationDone;

  const shouldAnimateSlide = (index: number) => {
    if (!runtime) {
      return true;
    }

    if (!hasLeftFirstSlide && activeIndex === 0 && index === 0) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) {
      setInitialHeroAnimationDone(true);
      return;
    }

    const timerId = setTimeout(() => {
      setInitialHeroAnimationDone(true);
    }, 950);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const loadSwiper = async () => {
      const [swiperReact, swiperModules] = await Promise.all([
        import("swiper/react"),
        import("swiper/modules"),
      ]);

      if (!cancelled) {
        setSwiperRuntime({
          Swiper: swiperReact.Swiper,
          SwiperSlide: swiperReact.SwiperSlide,
          modules: [
            swiperModules.EffectFade,
            swiperModules.Autoplay,
            swiperModules.A11y,
          ],
        });
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(
        () => {
          void loadSwiper();
        },
        { timeout: 1200 },
      );
    } else {
      timeoutId = setTimeout(() => {
        void loadSwiper();
      }, 250);
    }

    return () => {
      cancelled = true;

      if (idleId !== null) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[60vh] select-none bg-[#f7f4ed]">
        {runtime ? (
          <runtime.Swiper
            modules={runtime.modules}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: AUTOPLAY_DELAY,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            speed={500}
            className="h-full"
            style={{ position: "relative", zIndex: 10, paddingBottom: 0 }}
            onSwiper={(swiper: SwiperType) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper: SwiperType) => {
              setActiveIndex(swiper.realIndex);
              if (swiper.realIndex !== 0) {
                setHasLeftFirstSlide(true);
              }
            }}
            a11y={{ enabled: true }}
          >
            {slides.map((slide, index) => (
              <runtime.SwiperSlide key={slide.title}>
                <HeroSlidePanel
                  slide={slide}
                  index={index}
                  activeIndex={activeIndex}
                  priority={index === 0}
                  animateContent={shouldAnimateSlide(index)}
                />
              </runtime.SwiperSlide>
            ))}
          </runtime.Swiper>
        ) : (
          <div className="relative h-full">
            <HeroSlidePanel
              slide={slides[0]}
              index={0}
              activeIndex={0}
              priority
              animateContent
            />
          </div>
        )}

        {/* Bottom controls — visible right after the card reveal */}
        {showControls && (
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:left-auto sm:right-6 sm:translate-x-0 lg:bottom-6 lg:right-8">
            {/* Slide note text */}
            <div
              key={`note-${activeIndex}`}
              className="hero-note-enter hidden max-w-[16rem] text-right sm:block"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-white/70">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-white/90">
                {slides[activeIndex].note}
              </p>
            </div>

            {/* ← dots → */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={locale === "tr" ? "Onceki slayt" : "Previous slide"}
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={!runtime}
                className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-sm transition-all hover:border-white hover:bg-black/35 disabled:cursor-default disabled:opacity-60 md:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {slides.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={slide.title}
                    type="button"
                    aria-label={
                      locale === "tr"
                        ? `${index + 1}. slayti goster`
                        : `Show slide ${index + 1}`
                    }
                    aria-pressed={isActive}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    disabled={!runtime}
                    className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors disabled:cursor-default ${
                      isActive
                        ? "border-white bg-white/15"
                        : "border-white/55 bg-transparent hover:border-white"
                    } ${runtime ? "" : "opacity-70"}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-transform ${
                        isActive ? "scale-100 bg-white" : "scale-90 bg-white/55"
                      }`}
                    />
                  </button>
                );
              })}

              <button
                type="button"
                aria-label={locale === "tr" ? "Sonraki slayt" : "Next slide"}
                onClick={() => swiperRef.current?.slideNext()}
                disabled={!runtime}
                className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-sm transition-all hover:border-white hover:bg-black/35 disabled:cursor-default disabled:opacity-60 md:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
