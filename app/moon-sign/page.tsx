'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Moon, Sparkles, ArrowRight, Calendar, Clock, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateMoonSign, type MoonSignResult } from '@/lib/astro/moonSign';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'RASHI CALCULATOR',
    title: 'Moon Sign Calculator',
    subtitle: 'DISCOVER YOUR VEDIC MOON SIGN (RASHI) AND BIRTH NAKSHATRA — THE FOUNDATION OF VEDIC ASTROLOGY',
    dob: 'DATE OF BIRTH',
    tob: 'TIME OF BIRTH',
    calculate: 'FIND MY MOON SIGN',
    calculating: 'CONSULTING THE COSMOS...',
    yourMoon: 'Your Moon Sign',
    yourNak: 'Your Birth Nakshatra',
    nakPada: 'Pada',
    deity: 'Presiding Deity',
    element: 'Element',
    ruler: 'Ruler',
    sunSign: 'Sun Sign (Western)',
    traits: 'Personality Traits',
    moonDeg: 'Moon at',
    cta: 'Want a complete Kundli with Dasha predictions?',
    ctaBtn: 'GET PREMIUM KUNDLI — ₹99',
  },
  hi: {
    back: 'वापस',
    badge: 'राशि कैलकुलेटर',
    title: 'चंद्र राशि कैलकुलेटर',
    subtitle: 'अपनी वैदिक चंद्र राशि और जन्म नक्षत्र जानें — वैदिक ज्योतिष की नींव',
    dob: 'जन्म तिथि',
    tob: 'जन्म का समय',
    calculate: 'मेरी चंद्र राशि खोजें',
    calculating: 'ब्रह्मांड से पूछ रहे हैं...',
    yourMoon: 'आपकी चंद्र राशि',
    yourNak: 'आपका जन्म नक्षत्र',
    nakPada: 'पाद',
    deity: 'अधिष्ठाता देवता',
    element: 'तत्व',
    ruler: 'स्वामी ग्रह',
    sunSign: 'सूर्य राशि (पश्चिमी)',
    traits: 'व्यक्तित्व लक्षण',
    moonDeg: 'चंद्रमा',
    cta: 'दशा भविष्यवाणी के साथ संपूर्ण कुंडली चाहिए?',
    ctaBtn: 'प्रीमियम कुंडली — ₹99',
  },
};

const ELEMENT_ICONS: Record<string, string> = {
  Fire: '🔥', Earth: '🌍', Air: '💨', Water: '🌊',
};

export default function MoonSignPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [result, setResult] = useState<MoonSignResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        const res = calculateMoonSign(dob, tob);
        setResult(res);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#12161E] to-[#121212]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#B78E28]/5 rounded-full blur-[150px]" />
        {/* Decorative Moon */}
        <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#E5D6C8]/10 to-transparent blur-sm opacity-30" />
      </div>

      <div className="max-w-[800px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]">
            <Moon className="w-3.5 h-3.5" />
            {t.badge}
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light leading-tight">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose px-4">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleCalculate}
          className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-8 lg:p-10 mb-12 space-y-6"
        >
          <div className="space-y-1">
            <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.dob}</label>
            <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
              <Calendar className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
              <input required type="date" value={dob} onChange={e => setDob(e.target.value)}
                className="w-full py-3 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.tob}</label>
            <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
              <Clock className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
              <input required type="time" value={tob} onChange={e => setTob(e.target.value)}
                className="w-full py-3 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full mt-4 py-4 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[#E5D6C8] rounded-full text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group">
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />{t.calculating}</>
            ) : (
              <><Moon className="w-4 h-4 text-[#B78E28]" />{t.calculate}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </motion.form>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Moon Sign Hero Card */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#B78E28]/30 rounded-[2.5rem] p-8 lg:p-12 text-center relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#B78E28]/5 rounded-full blur-[80px]" />
                <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mb-4">{t.yourMoon}</p>
                <div className="text-7xl mb-4">{result.rashi.symbol}</div>
                <h2 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-2">
                  {language === 'hi' ? result.rashi.hi : result.rashi.en}
                </h2>
                <p className="text-[10px] text-[#B78E28] uppercase tracking-widest">
                  {t.moonDeg} {result.moonDegree.toFixed(2)}°
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#7D756B]/20">
                  <div>
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.element}</p>
                    <p className="text-sm font-serif text-[#E5D6C8]">{ELEMENT_ICONS[result.rashi.element]} {result.rashi.element}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.ruler}</p>
                    <p className="text-sm font-serif text-[#E5D6C8]">{language === 'hi' ? result.rashi.rulerHi : result.rashi.ruler}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.sunSign}</p>
                    <p className="text-sm font-serif text-[#E5D6C8]">{result.sunSign.symbol} {language === 'hi' ? result.sunSign.hi : result.sunSign.en}</p>
                  </div>
                </div>
              </div>

              {/* Nakshatra Card */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-5 h-5 text-[#B78E28]" />
                  <h3 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8]">{t.yourNak}</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-xl p-4 text-center">
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2">{t.yourNak}</p>
                    <p className="text-lg font-serif text-[#B78E28]">{language === 'hi' ? result.nakshatra.hi : result.nakshatra.en}</p>
                  </div>
                  <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-xl p-4 text-center">
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2">{t.nakPada}</p>
                    <p className="text-lg font-serif text-[#E5D6C8]">{result.nakshatraPada}</p>
                  </div>
                  <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-xl p-4 text-center">
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2">{t.deity}</p>
                    <p className="text-sm font-serif text-[#E5D6C8]">{result.nakshatra.deity}</p>
                  </div>
                </div>
              </div>

              {/* Traits */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] p-6 lg:p-8">
                <h3 className="text-sm font-serif uppercase tracking-widest text-[#B78E28] mb-4 flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  {t.traits}
                </h3>
                <p className="text-sm text-[#E5D6C8] leading-loose font-light">
                  {language === 'hi' ? result.traits.hi : result.traits.en}
                </p>
              </div>

              {/* CTA */}
              <div className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-8 text-center">
                <Moon className="w-8 h-8 text-[#B78E28] mx-auto mb-4" />
                <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
                <Link href="/store/1" className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
                  {t.ctaBtn}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
