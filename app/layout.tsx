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
              <Link
                href="https://wa.me/916366105204?text=Namaste!%20I%20am%20interested%20in%20a%20premium%20astrology%20report.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-20 md:bottom-8 right-4 md:right-8 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all z-[90] flex items-center justify-center"
              >
                <MessageCircle className="w-6 h-6" />
              </Link>
            </CartProvider>
          </SaleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
