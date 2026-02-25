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
  title: "Guthabenkarten.ch - Gaming Guthabenkarten | Sofortlieferung",
  description: "Gaming Guthabenkarten für Steam, PlayStation, Xbox, Nintendo und mehr. Sofortlieferung per E-Mail. CHF Preise, 100% sicher.",
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
