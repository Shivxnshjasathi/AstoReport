import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import SalesBoosters from "./components/Marketing/SalesBoosters";
import MobileNavBar from "./components/Navigation/MobileNavBar";
import { LanguageProvider } from "./context/LanguageContext";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { SaleProvider } from "./context/SaleContext";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AstroReport | Premium Vedic Astrological Guidance",
  description: "Unlock your destiny with high-precision Vedic Kundli generation, premium gemstone curation, and authentic Pandit consultations.",
  appleWebApp: {
    capable: true,
    title: "AstroReport",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: '/icon.png',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#121212',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-[#121212] text-[#E5D6C8] pb-16 md:pb-0">
        <LanguageProvider>
          <SaleProvider>
            <CartProvider>
              <SalesBoosters />
              {children}
              <MobileNavBar />
            </CartProvider>
          </SaleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
