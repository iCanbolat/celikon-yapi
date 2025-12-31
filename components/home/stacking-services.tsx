"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface ServiceData {
  key: string;
  image: string;
  title: string;
  description: string;
}

interface StackingServicesProps {
  services: ServiceData[];
  locale: "tr" | "en";
}

function ServiceStackCard({
  service,
  index,
  totalCards,
  containerRef,
}: {
  service: ServiceData;
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate scroll progress range for this card
  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;

  const isLastCard = index === totalCards - 1;

  // Scale animation - card shrinks when next card comes
  const scale = useTransform(scrollYProgress, [cardStart, cardEnd], [1, 0.9]);

  // Opacity - card fades when next card comes, but disappears completely after
  const opacity = useTransform(
    scrollYProgress,
    isLastCard
      ? [cardStart, 1]
      : [cardStart, cardEnd - 0.05, cardEnd, cardEnd + 0.05],
    isLastCard ? [1, 1] : [1, 1, 0.4, 0]
  );

  // Y offset - each card has a small offset from top based on index
  const topOffset = 96 + index * 20; // 96px = top-24, plus 20px per card for stacking effect

  return (
    <motion.div
      style={{
        scale,
        opacity,
        zIndex: index + 1, // Later cards have higher z-index so they appear on top
        top: topOffset,
      }}
      className="sticky h-[70vh] min-h-125 rounded-3xl overflow-hidden shadow-2xl"
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
          href="/services"
          className="inline-flex items-center gap-3 text-yellow-400 hover:text-yellow-300 transition-colors group"
        >
          <span className="text-lg font-semibold">
            {service.key === "restoration" ? "Detaylar" : "Daha Fazla"}
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export function StackingServices({ services, locale }: StackingServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center py-16">
          <p className="text-yellow-400 uppercase tracking-wider text-sm font-bold mb-2">
            {locale === "tr" ? "HİZMETLERİMİZ" : "OUR SERVICES"}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {locale === "tr" ? "Uzmanlık Alanlarımız" : "Our Expertise"}
          </h2>
        </div>

        {/* Stacking Cards Container */}
        <div
          ref={containerRef}
          style={{ height: `${services.length * 100}vh` }}
          className="relative"
        >
          {services.map((service, index) => (
            <ServiceStackCard
              key={service.key}
              service={service}
              index={index}
              totalCards={services.length}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg transition-colors"
          >
            {locale === "tr" ? "Tüm Hizmetleri Gör" : "View All Services"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
