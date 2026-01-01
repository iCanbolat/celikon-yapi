import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Home } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t("notFound")}
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {t("notFoundDescription")}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          >
            <Home className="w-5 h-5" />
            {t("backToHome")}
          </Link>
          <BackButton label={t("goBack")} />
        </div>
      </div>
    </div>
  );
}
