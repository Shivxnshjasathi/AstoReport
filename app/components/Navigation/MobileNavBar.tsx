'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, BookOpen, ShoppingCart, Gem } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

const navDict = {
  en: { home: "Home", stars: "Stars", reports: "Reports", gems: "Gems", cart: "Cart" },
  hi: { home: "होम", stars: "सितारे", reports: "रिपोर्ट", gems: "रत्न", cart: "कार्ट" }
};

export default function MobileNavBar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { cart } = useCart();
  const t = navDict[language];

  const isReportDetail = pathname?.startsWith('/store/') && pathname !== '/store';
  if (isReportDetail) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-[#121212]/95 backdrop-blur-xl border-t border-[#7D756B]/30 z-[100] pb-safe">
      <div className="flex items-center justify-around py-3 px-1">
        
        <Link href="/" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <Home className="w-5 h-5" strokeWidth={pathname === '/' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">{t.home}</span>
        </Link>
        
        <Link href="/astrology" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/astrology' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <Sparkles className="w-5 h-5" strokeWidth={pathname === '/astrology' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">{t.stars}</span>
        </Link>
        
        <Link href="/store" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/store' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <BookOpen className="w-5 h-5" strokeWidth={pathname === '/store' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">{t.reports}</span>
        </Link>

        <Link href="/gemstones" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/gemstones' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <Gem className="w-5 h-5" strokeWidth={pathname === '/gemstones' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">{t.gems}</span>
        </Link>
        
        <Link href="/checkout" className={`flex flex-col items-center gap-1 w-14 relative ${pathname === '/checkout' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <ShoppingCart className="w-5 h-5" strokeWidth={pathname === '/checkout' ? 2 : 1.5} />
          {cart.length > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 bg-[#B78E28] text-[#121212] rounded-full flex items-center justify-center text-[8px] font-bold">
              {cart.length}
            </span>
          )}
          <span className="text-[8px] uppercase tracking-widest font-semibold">{t.cart}</span>
        </Link>

      </div>
    </div>
  );
}
