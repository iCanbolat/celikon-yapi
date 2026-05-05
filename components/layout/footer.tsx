import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Footer() {
  const t = useTranslations();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="mb-6 block group">
              <div className="relative h-16 w-16 bg-white overflow-hidden rounded-lg">
                <Image
                  src="/logos/logo.jpeg"
                  alt="Celikon Logo"
                  fill
                  className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("common.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("common.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("common.projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("common.about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.contact")}
            </h4>
            <address className="text-gray-400 not-italic space-y-2">
              <p>İstanbul, Türkiye</p>
              <p>info@celikon.com</p>
              <p>+90 (212) 000 00 00</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {currentYear} Celikon. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
