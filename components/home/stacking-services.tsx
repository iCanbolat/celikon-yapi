"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ProjectCategory } from "@/lib/contentful";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

interface ServiceData {
  key: string;
  image: string;
  title: string;
  description: string;
  category: ProjectCategory;
}

interface StackingServicesProps {
  services: ServiceData[];
  locale: "tr" | "en";
}

function ServiceStackCard({
  service,
  index,
  totalCards,
}: {
  service: ServiceData;
  index: number;
  totalCards: number;
}) {
  const t = useTranslations("home.services");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const topOffset = 96 + index * 20;

  return (
    <div
      ref={cardRef}
      style={{
        zIndex: index + 1,
        top: topOffset,
      }}
      className={`sticky h-[70vh] min-h-125 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl">
        {/* Number Badge */}
        <span className="text-yellow-400 text-7xl md:text-9xl font-bold opacity-30 absolute top-8 left-12">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {service.title}
        </h3>
        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
          {service.description}
        </p>
        <Link
          href={`/projects?category=${service.category}`}
          className="inline-flex items-center gap-3 text-yellow-400 hover:text-yellow-300 transition-colors group"
        >
          <span className="text-lg font-semibold">{t("viewProjects")}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export function StackingServices({ services, locale }: StackingServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home.services");

  // Zoom-out effect near the end of the stack while scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.92]);

  return (
    <section className="bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center py-16">
          <p className="text-yellow-400 uppercase tracking-wider text-sm font-bold mb-2">
            {t("badge")}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {t("title")}
          </h2>
        </div>

        {/* Stacking Cards Container */}
        <motion.div
          ref={containerRef}
          style={{ height: `${services.length * 100}vh`, scale, opacity }}
          className="relative will-change-transform"
        >
          {services.map((service, index) => (
            <ServiceStackCard
              key={service.key}
              service={service}
              index={index}
              totalCards={services.length}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center py-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
