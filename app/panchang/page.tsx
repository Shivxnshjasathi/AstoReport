'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sun, Moon, Sunrise, Sunset, AlertTriangle, Sparkles, Calendar, Clock, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculatePanchang, type PanchangData } from '@/lib/astro/panchang';
import { motion } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'LIVE PANCHANG',
    title: "Today's Panchang",
    subtitle: 'VEDIC DAILY ALMANAC — TITHI, NAKSHATRA, YOGA, KARANA & AUSPICIOUS TIMINGS',
    vara: 'Day (Vara)',
    tithi: 'Tithi',
    paksha: 'Paksha',
    nakshatra: 'Nakshatra',
    yoga: 'Yoga',
    karana: 'Karana',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    rahuKaal: 'Rahu Kaal',
    rahuWarn: 'Inauspicious — avoid starting new work',
    moonSign: 'Moon Sign',
    sunSign: 'Sun Sign',
    cta: 'Want a personalized Panchang report?',
    ctaBtn: 'GET PREMIUM REPORT',
    location: 'Delhi, India',
  },
  hi: {
    back: 'वापस',
    badge: 'लाइव पंचांग',
    title: 'आज का पंचांग',
    subtitle: 'वैदिक दैनिक पंचांग — तिथि, नक्षत्र, योग, करण एवं शुभ मुहूर्त',
    vara: 'वार',
    tithi: 'तिथि',
    paksha: 'पक्ष',
    nakshatra: 'नक्षत्र',
    yoga: 'योग',
    karana: 'करण',
    sunrise: 'सूर्योदय',
    sunset: 'सूर्यास्त',
    rahuKaal: 'राहु काल',
    rahuWarn: 'अशुभ — नया कार्य प्रारंभ न करें',
    moonSign: 'चंद्र राशि',
    sunSign: 'सूर्य राशि',
    cta: 'व्यक्तिगत पंचांग रिपोर्ट चाहिए?',
    ctaBtn: 'प्रीमियम रिपोर्ट प्राप्त करें',
    location: 'दिल्ली, भारत',
  },
};

export default function PanchangPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [panchang, setPanchang] = useState<PanchangData | null>(null);

  useEffect(() => {
    const data = calculatePanchang(new Date());
    setPanchang(data);
  }, []);

  if (!panchang) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Sparkles className="w-8 h-8 text-[#B78E28] animate-pulse" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7D756B]">Calculating Panchang...</p>
        </div>
      </div>
    );
  }

  const panchangItems = [
    { label: t.vara, value: language === 'hi' ? panchang.varaHi : panchang.vara, icon: <Calendar className="w-5 h-5" /> },
    { label: t.tithi, value: language === 'hi' ? panchang.tithiHi : panchang.tithi, icon: <Moon className="w-5 h-5" />, sub: panchang.tithiPaksha },
    { label: t.nakshatra, value: language === 'hi' ? panchang.nakshatraHi : panchang.nakshatra, icon: <Star className="w-5 h-5" /> },
    { label: t.yoga, value: panchang.yoga, icon: <Sparkles className="w-5 h-5" /> },
    { label: t.karana, value: panchang.karana, icon: <Clock className="w-5 h-5" /> },
    { label: t.moonSign, value: language === 'hi' ? panchang.moonSignHi : panchang.moonSign, icon: <Moon className="w-5 h-5" /> },
  ];

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1A1520] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B78E28]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1000px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px] animate-pulse">
            <span className="w-2 h-2 bg-[#B78E28] rounded-full" />
            {t.badge}
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#B78E28]/10 border border-[#B78E28]/30 px-4 py-2 rounded-full mb-6">
            <Sun className="w-3.5 h-3.5 text-[#B78E28]" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#B78E28]">{panchang.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light leading-tight">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose px-4">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Sunrise / Sunset / Rahu Kaal Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-[#1A1A1A]/60 backdrop-blur-lg border border-[#7D756B]/20 rounded-2xl p-5 text-center group hover:border-[#B78E28]/40 transition-all">
            <Sunrise className="w-6 h-6 text-[#B78E28] mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.sunrise}</p>
            <p className="text-sm font-serif text-[#E5D6C8]">{panchang.sunrise}</p>
          </div>
          <div className="bg-[#1A1A1A]/60 backdrop-blur-lg border border-[#7D756B]/20 rounded-2xl p-5 text-center group hover:border-[#B78E28]/40 transition-all">
            <Sunset className="w-6 h-6 text-[#B78E28] mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.sunset}</p>
            <p className="text-sm font-serif text-[#E5D6C8]">{panchang.sunset}</p>
          </div>
          <div className="bg-[#2A1515]/60 backdrop-blur-lg border border-red-900/30 rounded-2xl p-5 text-center group hover:border-red-700/40 transition-all">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-[8px] text-red-400/80 uppercase tracking-widest mb-1">{t.rahuKaal}</p>
            <p className="text-sm font-serif text-red-300">{panchang.rahuKaal}</p>
          </div>
        </motion.div>

        {/* Panchang Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12"
        >
          {panchangItems.map((item, i) => (
            <div
              key={i}
              className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[1.5rem] p-6 hover:border-[#B78E28]/40 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#B78E28]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-[#B78E28] mb-3 opacity-50 group-hover:opacity-100 transition-opacity">
                {item.icon}
              </div>
              <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2">{item.label}</p>
              <p className="text-lg font-serif text-[#E5D6C8] leading-snug">{item.value}</p>
              {item.sub && (
                <p className="text-[9px] text-[#B78E28] uppercase tracking-widest mt-2">{item.sub}</p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Rahu Kaal Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-[#2A1515]/30 border border-red-900/20 rounded-2xl p-5 flex items-start gap-4 mb-16"
        >
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-red-300 uppercase tracking-widest font-bold mb-1">{t.rahuKaal}: {panchang.rahuKaal}</p>
            <p className="text-[10px] text-red-400/60 uppercase tracking-widest">{t.rahuWarn}</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2.5rem] p-8 lg:p-12 text-center"
        >
          <Sparkles className="w-8 h-8 text-[#B78E28] mx-auto mb-6 animate-pulse" />
          <h2 className="text-xl lg:text-2xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h2>
          <Link href="/store" className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all shadow-[0_0_30px_rgba(183,142,40,0.2)]">
            {t.ctaBtn}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
