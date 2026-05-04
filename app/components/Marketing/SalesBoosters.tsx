'use client';

import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSale } from '../../context/SaleContext';
import { useLanguage } from '../../context/LanguageContext';

const bannerDict = {
  en: "50% Off All Premium Reports",
  hi: "सभी प्रीमियम रिपोर्ट पर 50% की छूट"
};

export default function SalesBoosters() {
  const { isSaleActive, timeLeft } = useSale();
  const { language } = useLanguage();
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '00:00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Hello Bar (Urgency) */}
      <AnimatePresence>
        {isSaleActive && isBannerVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-gradient-to-r from-[#B78E28]/10 via-[#B78E28]/20 to-[#B78E28]/10 border-b border-[#B78E28]/30 py-2 z-[60] relative"
          >
            <div className="max-w-[1400px] mx-auto flex flex-row items-center justify-center gap-3 sm:gap-6 px-2">
              <p className="text-[#E5D6C8] text-[8px] sm:text-xs uppercase tracking-[0.1em] flex items-center gap-1 sm:gap-2 font-medium whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-[#B78E28] shrink-0" />
                {bannerDict[language]}
              </p>
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <span className="text-[#B78E28] font-mono text-xs sm:text-sm tracking-widest font-bold">
                  {formatTime(timeLeft)}
                </span>
                <button onClick={() => setIsBannerVisible(false)} className="text-[#7D756B] hover:text-[#E5D6C8] ml-2">
                  <X className="w-3 h-3 sm:w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
