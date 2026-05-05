"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { type Locale } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [secondNavVisible, setSecondNavVisible] = useState(false);
  const firstNavRef = useRef<HTMLDivElement>(null);
  const [firstNavHeight, setFirstNavHeight] = useState(0);

  // Mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // İlk navbar yüklendiğinde yüksekliğini ölç
  useEffect(() => {
    if (firstNavRef.current) {
      setFirstNavHeight(firstNavRef.current.offsetHeight);
    }
  }, []);

  // Menü açıkken scroll'u kilitle
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Scroll ile ikinci navbar’ı göster/gizle
  useEffect(() => {
    const handleScroll = () => {
      if (firstNavHeight > 0) {
        setSecondNavVisible(window.scrollY > firstNavHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [firstNavHeight]);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/about", label: t("about") },
  ];

  const linkBase =
    "text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ease-in-out";
  const linkDefault = "text-black hover:text-blue-600";
  const linkActive = "text-[#0f2747]";

  const locales: Array<{ code: Locale; label: string; flag: string }> = [
    { code: "tr", label: "Turkce", flag: "/logos/tr.png" },
    { code: "en", label: "English", flag: "/logos/en.png" },
  ];

  // Ortak navbar içeriği (tekrar kullanmak için)
  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex items-center justify-between gap-6 w-full">
      {/* Logo */}
      <Link
        href="/"
        className={`relative block overflow-hidden ${
          isMobile ? "h-14 w-14" : "h-18 w-18 sm:h-20 sm:w-20"
        }`}
      >
        <Image
          src="/logos/logo.jpeg"
          alt="Celikon logo"
          fill
          priority
          sizes={isMobile ? "56px" : "(max-width: 640px) 72px, 80px"}
          className="object-cover"
        />
      </Link>

      {/* Desktop linkler */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-10">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${linkBase} ${
              pathname === item.href ? linkActive : linkDefault
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Dil seçici + mobil menü butonu */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          {locales.map((localeOption) => {
            const isActive = localeOption.code === currentLocale;
            return (
              <Link
                key={localeOption.code}
                href={pathname}
                locale={localeOption.code}
                aria-label={localeOption.label}
                className={`flex items-center rounded-sm border px-1.5 py-1 transition-all ${
                  isActive
                    ? "border-black/20 bg-black/4 shadow-sm"
                    : "border-transparent opacity-70 hover:border-[#0f2747]/18 hover:bg-[#0f2747]/4 hover:opacity-100"
                }`}
              >
                <Image
                  src={localeOption.flag}
                  alt={localeOption.label}
                  width={22}
                  height={16}
                  className="h-4 w-5.5 object-cover"
                />
              </Link>
            );
          })}
        </div>

        <button
          className="p-2 text-black md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ===== İlk navbar (normal akış) ===== */}
      <div
        ref={firstNavRef}
        className={`relative bg-white border-b border-black/8 ${mobileMenuOpen ? "z-100" : "z-10"}`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-22 items-center">
            <NavContent />
          </div>
        </div>
      </div>

      {/* ===== İkinci navbar (fixed, slide in) ===== */}
      <div
        className={`fixed top-0 left-0 w-full transition-transform duration-500 ease-out bg-white backdrop-blur-md border-b border-black/8 shadow-[0_12px_28px_rgba(15,23,42,0.08)] ${mobileMenuOpen ? "z-100" : "z-50"} ${
          secondNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-22 items-center">
            <NavContent />
          </div>
        </div>
      </div>

      {/* ===== Mobil menü (portal) ===== */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Animated Background - Circle Wipe */}
                <motion.div
                  initial={{ clipPath: "circle(0% at 100% 0%)" }}
                  animate={{ clipPath: "circle(150% at 100% 0%)" }}
                  exit={{ clipPath: "circle(0% at 100% 0%)" }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    duration: 0.6,
                  }}
                  className="fixed inset-0 z-90 bg-white md:hidden"
                />

                {/* Menu Content */}
                <motion.nav
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="fixed inset-0 z-91 flex items-center justify-center md:hidden"
                >
                  <div className="flex flex-col items-center gap-8">
                    <div className="mb-2 flex items-center gap-3">
                      {locales.map((localeOption) => {
                        const isActive = localeOption.code === currentLocale;
                        return (
                          <Link
                            key={localeOption.code}
                            href={pathname}
                            locale={localeOption.code}
                            aria-label={localeOption.label}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center rounded-sm border px-2 py-1.5 transition-all ${
                              isActive
                                ? "border-black/20 bg-black/4"
                                : "border-transparent opacity-70 hover:border-[#0f2747]/18 hover:bg-[#0f2747]/4 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={localeOption.flag}
                              alt={localeOption.label}
                              width={26}
                              height={18}
                              className="h-4.5 w-6.5 object-cover"
                            />
                          </Link>
                        );
                      })}
                    </div>

                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{
                          delay: 0.35 + index * 0.08,
                          duration: 0.4,
                          type: "spring",
                          stiffness: 100,
                        }}
                      >
                        <Link
                          href={item.href}
                          className={`text-3xl font-bold transition-colors ${
                            pathname === item.href
                              ? "text-[#0f2747]"
                              : "text-black hover:text-[#0f2747]"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
