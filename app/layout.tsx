import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CartProvider } from "@/lib/CartContext";
import TopBar from "@/components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sofortvoucher.de - Gaming Guthabenkarten | Sofortlieferung",
  description: "Gaming Guthabenkarten für Steam, PlayStation, Xbox, Nintendo und mehr. Sofortlieferung per E-Mail. EUR Preise, 100% sicher.",
  keywords: ["Steam Guthaben", "PlayStation Store", "Xbox Live", "Nintendo eShop", "Netflix Geschenkkarte", "Spotify Premium", "Gaming Guthabenkarten Deutschland"],
  authors: [{ name: "sofortvoucher.de" }],
  openGraph: {
    title: "sofortvoucher.de - Gaming Guthabenkarten | Sofortlieferung",
    description: "Gaming Guthabenkarten für Steam, PlayStation, Xbox, Nintendo und mehr. Sofortlieferung per E-Mail. EUR Preise, 100% sicher.",
    url: "https://sofortvoucher.de",
    siteName: "sofortvoucher.de",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "sofortvoucher.de - Gaming Guthabenkarten",
    description: "Gaming Guthabenkarten für Steam, PlayStation, Xbox, Nintendo und mehr. Sofortlieferung per E-Mail.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sofortvoucher.de",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        <LanguageProvider>
          <CartProvider>
            <TopBar />
            <main className="pt-14">
              {children}
            </main>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
