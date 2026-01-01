import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://celikon-yapi.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["Courier New", "monospace"],
});

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
    <html lang={locale}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root{--radius:.625rem;--background:oklch(1 0 0);--foreground:oklch(.129 .042 264.695)}
              body{background-color:#f9fafb;font-family:var(--font-geist-sans),system-ui,arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;min-height:100vh;display:flex;flex-direction:column}
              main{flex:1}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <ScrollToTop />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
