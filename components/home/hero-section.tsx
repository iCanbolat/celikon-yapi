"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations();
  const [videoError, setVideoError] = useState(false);

  const videoSrc = "/videos/hero-background.webm";

  return (
    <section className="relative  min-h-screen -top-16 pt-16 pb-4 sm:pt-0 sm:pb-0 flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onError={() => setVideoError(true)}
          >
            <source src={videoSrc} type="video/webm" />
          </video>
        )}
        {/* Fallback image if video missing or errors */}
        {videoError && (
          <Image
            src="/images/banner.webp"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900/60 via-gray-900/50 to-gray-900/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-block mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="bg-yellow-400 text-gray-900 px-2 sm:px-6 py-2 text-xs md:text-sm font-bold uppercase tracking-wider">
              {t("home.hero.badge")}
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {locale === "tr" ? (
              <>
                İSTİSNAİ <span className="text-yellow-400">USTALIK</span> İLE{" "}
                <span className="block mt-2">GÜVENİ İNŞA EDİYORUZ</span>
              </>
            ) : (
              <>
                BUILDING TRUST THROUGH{" "}
                <span className="block mt-2">
                  EXCEPTIONAL{" "}
                  <span className="text-yellow-400">CRAFTSMANSHIP</span>
                </span>
              </>
            )}
          </h1>

          {/* Description */}
          <p
            className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {t("home.hero.description")}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <Button variant="yellow" size="default" asChild>
              <Link href="/services">
                {t("home.hero.buttonServices")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="default"
              asChild
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              <Link href="/about">
                {t("home.hero.buttonContact")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2 animate-scroll-bounce">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
