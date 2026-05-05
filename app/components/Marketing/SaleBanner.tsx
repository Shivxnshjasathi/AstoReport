'use client';

import React from 'react';
import { useSale } from '../../context/SaleContext';
import { useLanguage } from '../../context/LanguageContext';
import { Zap, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

const dict = {
  en: { title: "FLASH SALE: 50% OFF ON ALL REPORTS!", endsIn: "ENDS IN", shopNow: "SHOP NOW" },
  hi: { title: "फ्लैश सेल: सभी रिपोर्ट्स पर 50% की छूट!", endsIn: "समाप्त होने में", shopNow: "अभी खरीदें" }
};

export default function SaleBanner() {
  const { isSaleActive, timeLeft } = useSale();
  const { language } = useLanguage();
  const t = dict[language];

  if (!isSaleActive || timeLeft === null) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <Link href="/store" className="block z-[110] sticky top-0">
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="w-full bg-[#B78E28] text-[#121212] py-2 px-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 overflow-hidden shadow-lg cursor-pointer hover:brightness-110 transition-all"
        >
          <div className="flex items-center gap-2 font-bold uppercase tracking-[0.1em] text-[10px] md:text-xs shrink-0">
            <Zap className="w-4 h-4 fill-current animate-pulse" />
            {t.title}
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 bg-[#121212] text-[#B78E28] px-3 py-1 rounded-full font-mono text-sm font-bold border border-[#121212]">
              <Timer className="w-3 h-3" />
              <span className="uppercase text-[8px] tracking-widest mr-1 opacity-70">{t.endsIn}</span>
              {formatTime(timeLeft)}
            </div>
            
            <div className="hidden md:block bg-[#121212] text-[#E5D6C8] px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#E5D6C8] hover:text-[#121212] transition-colors">
              {t.shopNow}
            </div>
          </div>

          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden flex items-center">
            <div className="flex whitespace-nowrap animate-marquee-fast">
               {[...Array(10)].map((_, i) => (
                 <span key={i} className="mx-4 font-serif font-black italic text-2xl md:text-4xl tracking-tighter">
                   SALE SALE SALE ✧
                 </span>
               ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </AnimatePresence>
  );
}
