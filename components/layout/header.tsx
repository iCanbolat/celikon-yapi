"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { type Locale } from "@/i18n/routing";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Track mount for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
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

  // Toggle header background after scrolling past 64px
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/contact", label: t("contact") },
  ];

  const otherLocale = currentLocale === "tr" ? "en" : "tr";

  const bgClass = scrolled
    ? "bg-gradient-to-r from-black/60 via-black/50 to-neutral-900/60 backdrop-blur-sm transition-colors duration-300 ease-in-out"
    : "bg-transparent transition-colors duration-300 ease-in-out";

  const linkBase =
    "text-sm uppercase font-medium transition-colors duration-300 ease-in-out";
  const linkDefault = "text-white hover:text-yellow-400";
  const linkActive = "text-yellow-400";

  return (
    <motion.header
      className={`sticky top-0 z-100  ${bgClass}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white">
            CELİKON
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
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

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link
              href={pathname}
              locale={otherLocale}
              className="flex items-center gap-1 text-sm font-semibold text-white hover:text-yellow-400 transition-colors relative z-101"
            >
              <Globe className="w-4 h-4" />
              {otherLocale.toUpperCase()}
            </Link>

            <button
              className="md:hidden p-2 relative z-101 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with Animated Background - Rendered via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Animated Background - Diagonal Wipe */}
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
                  className="md:hidden fixed inset-0 bg-linear-to-br from-black via-neutral-900 to-black z-90"
                />

                {/* Menu Content */}
                <motion.nav
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="md:hidden fixed inset-0 z-91 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-8">
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
                              ? "text-yellow-400"
                              : "text-white hover:text-yellow-400"
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
          document.body
        )}
    </motion.header>
  );
}
