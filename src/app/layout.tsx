import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./tailwind.css";
import { PremiumBackButton } from "@/components/ui/PremiumBackButton";
import { GlobalJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://saatchi.com.tr"),
  alternates: {
    canonical: "https://saatchi.com.tr",
  },
  icons: {
    icon: '/favicon.svg?v=2',
    shortcut: '/favicon.svg?v=2',
    apple: '/favicon.svg?v=2',
  },
  title: "SAATCHI & CO. | Dünyanın En Seçkin Lüks Saat Koleksiyonları",
  description: "Rolex, Cartier, TAG Heuer, Rado ve İsviçre'nin en seçkin lüks kol saatleri. %100 orijinallik garantisi, sertifikalı ekspertiz ve VIP sigortalı teslimat ile SAATCHI'de.",
  keywords: [
    "lüks saat",
    "rolex",
    "cartier",
    "tag heuer",
    "rado",
    "tissot",
    "ikinci el rolex",
    "isviçre saatleri",
    "orijinal lüks saat",
    "saatchi"
  ],
  openGraph: {
    title: "SAATCHI & CO. | Lüks Saat Koleksiyonları & İsviçre Saatleri",
    description: "Dünyanın en prestijli saat markaları. Orijinallik garantisi ve tam sigortalı VIP teslimat.",
    url: "https://saatchi.com.tr",
    siteName: "SAATCHI & CO.",
    images: [
      {
        url: "https://saatchi.com.tr/logo.png",
        width: 800,
        height: 600,
        alt: "SAATCHI & CO. Lüks Saat Koleksiyonu",
      },
    ],
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAATCHI & CO. | Dünyanın En Seçkin Lüks Saatleri",
    description: "Rolex, Cartier, TAG Heuer ve elit lüks saat koleksiyonları.",
    images: ["https://saatchi.com.tr/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <link rel="alternate" type="text/plain" href="https://saatchi.com.tr/llms.txt" title="LLM Knowledge Vault" />
        <GlobalJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-black">
        <Navbar />
        <PremiumBackButton />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
