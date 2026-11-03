import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/hooks/use-i18n";
import { translations } from "@/lib/translations";

// Classic web-safe fonts (year 2000s vibe: Verdana/Tahoma/Arial/serif system stack)
const classicBodyFont = "Verdana, Tahoma, 'Segoe UI', Geneva, Arial, Helvetica, sans-serif";

export const metadata: Metadata = {
  metadataBase: new URL("https://diskmize.com"),
  title: {
    default: "DiskMize - Lightweight Linux disk space analyzer",
    template: "%s · DiskMize",
  },
  description:
    "DiskMize is a lightweight desktop disk-space analyzer built with Python and Tkinter. Inspect directories, find large files, and review storage usage through a straightforward graphical interface.",
  keywords: [
    "DiskMize",
    "disk space analyzer",
    "Linux disk analyzer",
    "disk usage",
    "Tkinter",
    "Python",
    "open source",
    "GPL",
    "Mario Ramos",
    "disk cleanup",
    "filesystem",
    "analizador de disco",
    "Analyseur d'espace disque",
    "Festplattenanalyse",
  ],
  authors: [{ name: "Mario Ramos", url: "https://github.com/marrionesa" }],
  creator: "Mario Ramos",
  publisher: "Mario Ramos",
  applicationName: "DiskMize",
  category: "technology",
  alternates: {
    canonical: "https://diskmize.com/",
    languages: {
      "es": "https://diskmize.com/",
      "en": "https://diskmize.com/",
      "fr": "https://diskmize.com/",
      "de": "https://diskmize.com/",
      "x-default": "https://diskmize.com/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US", "fr_FR", "de_DE"],
    url: "https://diskmize.com/",
    siteName: "DiskMize",
    title: "DiskMize - Lightweight Linux disk space analyzer",
    description:
      "Inspect directories, find large files, and review storage usage through a straightforward graphical interface. Open source, GPL-3.0.",
    images: [
      {
        url: "/diskmize/banner.jpg",
        width: 1376,
        height: 768,
        alt: "DiskMize - Disk Space Analyzer - banner oficial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DiskMize - Lightweight Linux disk space analyzer",
    description:
      "Inspect directories, find large files, and review storage usage through a straightforward graphical interface.",
    images: ["/diskmize/banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

// Datos estructurados para Google: web + autor + aplicación de software libre
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://diskmize.com/#website",
      url: "https://diskmize.com/",
      name: "DiskMize",
      description:
        "Official website of DiskMize, a free and open-source desktop disk space analyzer for Linux.",
      inLanguage: ["es", "en", "fr", "de"],
      publisher: { "@id": "https://diskmize.com/#author" },
    },
    {
      "@type": "Person",
      "@id": "https://diskmize.com/#author",
      name: "Mario Ramos",
      url: "https://github.com/marrionesa",
      email: "diskmize@marioramos.me",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://diskmize.com/#app",
      name: "DiskMize",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Linux",
      softwareVersion: "0.1.0",
      datePublished: "2026-10-23",
      license: "https://www.gnu.org/licenses/gpl-3.0.html",
      isAccessibleForFree: true,
      url: "https://diskmize.com/",
      downloadUrl: "https://github.com/marrionesa/diskmize/releases/latest",
      codeRepository: "https://github.com/marrionesa/diskmize",
      description:
        "Lightweight Linux disk space analyzer. Inspect directories, find large files and review storage usage through a straightforward graphical interface. Free, open source (GPL-3.0), built with Python and Tkinter.",
      inLanguage: ["es", "en", "fr", "de"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": "https://diskmize.com/#author" },
      screenshot: "https://diskmize.com/diskmize/banner.jpg",
      keywords:
        "disk space analyzer, disk usage, linux, tkinter, python, open source, disk cleanup, analizador de disco",
    },
    {
      "@type": "FAQPage",
      "@id": "https://diskmize.com/#faq",
      mainEntity: translations.es.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        style={{
          fontFamily: classicBodyFont,
        }}
        className="antialiased bg-background text-foreground"
      >
        <I18nProvider>
          {children}
        </I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
        <Toaster />
      </body>
    </html>
  );
}
