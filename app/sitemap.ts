import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://celikon-yapi.vercel.app";

const basePaths = ["", "/about", "/projects", "/services"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return basePaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changefreq: "weekly",
      priority: path === "" ? 1 : 0.7,
    }))
  );
}
