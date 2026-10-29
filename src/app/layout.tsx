import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./tailwind.css";
import { PremiumBackButton } from "@/components/ui/PremiumBackButton";
import { PremiumWhatsAppButton } from "@/components/ui/PremiumWhatsAppButton";
import { GlobalJsonLd } from "@/components/seo/JsonLd";
import { ScrollRevealProvider } from "@/components/motion";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saatchi.com.tr"),
  alternates: {
    canonical: "https://saatchi.com.tr",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  title: "SAATCHI | Sertifikalı Lüks Saatler & İsviçre Koleksiyonları",
  description: "Rolex, Cartier, TAG Heuer, Rado ve İsviçre saat modelleri. %100 orijinallik kontrolü, bağımsız ekspertiz ve tam değer sigortalı VIP teslimat güvencesiyle.",
  openGraph: {
    title: "SAATCHI | Lüks Saat Koleksiyonları & İsviçre Saatleri",
    description: "Rolex, Cartier, TAG Heuer ve İsviçre saat modelleri. %100 orijinallik kontrolü, bağımsız ekspertiz ve tam değer sigortalı VIP teslimat güvencesiyle.",
    url: "https://saatchi.com.tr",
    siteName: "SAATCHI",
    images: [
      {
        url: "https://saatchi.com.tr/logo.png",
        width: 800,
        height: 600,
        alt: "SAATCHI Lüks Saat Koleksiyonu",
      },
    ],
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAATCHI | Sertifikalı Lüks Saatler",
    description: "Rolex, Cartier, TAG Heuer ve elit lüks saat koleksiyonları. Tam değer sigortalı VIP teslimat.",
    images: ["https://saatchi.com.tr/logo.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SAATCHI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "HVjtbmt5yCKWy0Bakgx6BhkOwuloXCKj6ZuHxiFQOXw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <head>
        <meta name="google-site-verification" content="HVjtbmt5yCKWy0Bakgx6BhkOwuloXCKj6ZuHxiFQOXw" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta property="og:site_name" content="SAATCHI" />
        <link rel="alternate" type="text/plain" href="https://saatchi.com.tr/llms.txt" title="LLM Knowledge Vault" />
        <link rel="alternate" type="application/rss+xml" href="https://saatchi.com.tr/feed.xml" title="SAATCHI RSS 2.0" />
        <link rel="alternate" type="application/atom+xml" href="https://saatchi.com.tr/atom.xml" title="SAATCHI Atom 1.0" />
        <link rel="alternate" type="application/feed+json" href="https://saatchi.com.tr/feed.json" title="SAATCHI JSON Feed" />
        <GlobalJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-black">
        <ScrollRevealProvider />
        <Navbar />
        <PremiumBackButton />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <PremiumWhatsAppButton />
      </body>
    </html>
  );
}
