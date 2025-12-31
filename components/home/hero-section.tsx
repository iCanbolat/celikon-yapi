"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations();
  const [videoError, setVideoError] = useState(false);

  const videoSrc = "/videos/hero-background.mp4"; // place your video at public/videos/hero-background.mp4

  return (
    <section className="relative h-[90vh] min-h-screen -top-16 flex items-center justify-center overflow-hidden">
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
            <source src={videoSrc} type="video/mp4" />
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="bg-yellow-400 text-gray-900 px-6 py-2 text-sm font-bold uppercase tracking-wider">
              {t("home.hero.badge")}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
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
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {t("home.hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button variant="yellow" size="lg" asChild>
              <Link href="/services">
                {t("home.hero.buttonServices")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              <Link href="/about">
                {t("home.hero.buttonContact")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
