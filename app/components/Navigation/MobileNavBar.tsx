'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, BookOpen, Compass, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const navDict = {
  en: { home: "Home", stars: "Stars", tarot: "Tarot", reports: "Reports", tools: "Tools" },
  hi: { home: "होम", stars: "सितारे", tarot: "टैरो", reports: "रिपोर्ट", tools: "उपकरण" }
};

const TOOL_PATHS = ['/panchang', '/match', '/numerology', '/moon-sign'];

export default function MobileNavBar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = navDict[language];

  const isReportDetail = pathname?.startsWith('/store/') && pathname !== '/store';
  if (isReportDetail) return null;

  const isToolActive = TOOL_PATHS.some(p => pathname === p);

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

        <Link href="/tarot" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/tarot' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <Layers className="w-5 h-5" strokeWidth={pathname === '/tarot' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">{t.tarot}</span>
        </Link>
        
        <Link href="/store" className={`flex flex-col items-center gap-1 w-14 ${pathname === '/store' ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <BookOpen className="w-5 h-5" strokeWidth={pathname === '/store' ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">{t.reports}</span>
        </Link>

        <Link href="/panchang" className={`flex flex-col items-center gap-1 w-14 ${isToolActive ? 'text-[#B78E28]' : 'text-[#7D756B] hover:text-[#E5D6C8]'} transition-colors`}>
          <Compass className="w-5 h-5" strokeWidth={isToolActive ? 2 : 1.5} />
          <span className="text-[8px] uppercase tracking-widest font-semibold">{t.tools}</span>
        </Link>

      </div>
    </div>
  );
}
