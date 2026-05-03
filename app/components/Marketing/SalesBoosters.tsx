'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SalesBoosters() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Hello Bar (Urgency) */}
      <AnimatePresence>
        {isBannerVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-gradient-to-r from-[#B78E28]/10 via-[#B78E28]/20 to-[#B78E28]/10 border-b border-[#B78E28]/30 py-2 px-4 z-[60] relative"
          >
            <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              <p className="text-[#E5D6C8] text-[10px] sm:text-xs uppercase tracking-[0.1em] flex items-center gap-2 font-medium">
                <Sparkles className="w-3 h-3 text-[#B78E28]" />
                Rare Cosmic Alignment: 50% Off All Premium Reports
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[#B78E28] font-mono text-sm tracking-widest font-bold">
                  {formatTime(timeLeft)}
                </span>
                <button onClick={() => setIsBannerVisible(false)} className="text-[#7D756B] hover:text-[#E5D6C8] ml-4">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
