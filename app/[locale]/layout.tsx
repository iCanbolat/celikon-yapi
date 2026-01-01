import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://celikon-yapi.vercel.app";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const activeLocale = routing.locales.includes(locale)
    ? locale
    : routing.defaultLocale;

  const languageAlternates = Object.fromEntries(
    routing.locales.map((loc) => [loc, `/${loc}`])
  );

  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${activeLocale}`,
      languages: languageAlternates,
    },
    other: {
      "x-dns-prefetch-control": "on",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LenisProvider>
        <ScrollToTop />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </LenisProvider>
    </NextIntlClientProvider>
  );
}
