'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", 
  "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
  "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut"
];

const reports = [
  "Premium Kundli", "Career Report", "Love Report", "2026 Yearly Horoscope", 
  "Gemstone Suggestion", "Vastu Analysis", "Lal Kitab Remedies", "Marriage Match"
];

export default function LiveOrderPulse() {
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const showOrder = () => {
      const city = cities[Math.floor(Math.random() * cities.length)];
      const report = reports[Math.floor(Math.random() * reports.length)];
      setCurrentOrder({ city, report });

      setTimeout(() => {
        setCurrentOrder(null);
      }, 5000);
    };

    const interval = setInterval(showOrder, Math.random() * (25000 - 15000) + 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 md:top-auto md:bottom-24 left-4 md:left-6 z-[90] pointer-events-none w-[calc(100vw-32px)] md:w-auto">
      <AnimatePresence>
        {currentOrder && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-[#1A1A1A]/90 backdrop-blur-md border border-[#B78E28]/30 px-4 py-3 rounded-2xl flex items-center gap-4 shadow-2xl mx-auto md:mx-0 max-w-sm"
          >
            <div className="w-10 h-10 bg-[#B78E28]/10 rounded-xl flex items-center justify-center text-[#B78E28]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[#E5D6C8] text-[10px] font-bold uppercase tracking-widest leading-none mb-1">
                {language === 'hi' ? 'नया ऑर्डर प्राप्त हुआ' : 'Recent Order'}
              </p>
              <p className="text-[#7D756B] text-[9px] uppercase tracking-wide">
                {language === 'hi' 
                  ? `${currentOrder.city} से किसी ने ${currentOrder.report} खरीदी`
                  : `Someone from ${currentOrder.city} ordered ${currentOrder.report}`}
              </p>
            </div>
            <div className="ml-2 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2 h-2 text-[#B78E28] fill-[#B78E28]" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
