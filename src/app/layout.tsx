import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";
import { PremiumBackButton } from "@/components/ui/PremiumBackButton";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' }
    ]
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
