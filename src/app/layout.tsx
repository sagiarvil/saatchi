import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./tailwind.css";
import { PremiumBackButton } from "@/components/ui/PremiumBackButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://saatchi.com.tr"),
  icons: {
    icon: '/favicon.svg?v=2',
    shortcut: '/favicon.svg?v=2',
    apple: '/favicon.svg?v=2',
  },
  title: "SAATCHI | Dünyanın En Seçkin Lüks Saat Koleksiyonları",
  description: "Rolex, Patek Philippe, Audemars Piguet ve diğer elit markaların yer aldığı özel lüks saat koleksiyonu. Orijinallik garantisi ve küresel referans fiyatlarıyla SAATCHI'de.",
  openGraph: {
    title: "SAATCHI | Lüks Saat Koleksiyonları",
    description: "Dünyanın en seçkin elit saat koleksiyonları. Orijinallik garantisiyle.",
    type: "website",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
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
