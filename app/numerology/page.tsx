'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Hash, Sparkles, ArrowRight, User, Calendar, Loader2, Star, Palette, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateNumerology, LIFE_PATH_MEANINGS, DESTINY_MEANINGS, type NumerologyResult } from '@/lib/astro/numerology';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'NUMEROLOGY',
    title: 'Lucky Number Calculator',
    subtitle: 'DISCOVER YOUR LIFE PATH, DESTINY, SOUL URGE & PERSONALITY NUMBERS USING PYTHAGOREAN NUMEROLOGY',
    name: 'FULL NAME',
    dob: 'DATE OF BIRTH',
    calculate: 'REVEAL MY NUMBERS',
    calculating: 'CALCULATING...',
    lifePath: 'Life Path Number',
    destiny: 'Destiny Number',
    soulUrge: 'Soul Urge Number',
    personality: 'Personality Number',
    birthday: 'Birthday Number',
    luckyNums: 'Lucky Numbers',
    luckyColors: 'Lucky Colors',
    luckyDay: 'Lucky Day',
    cta: 'Want a complete numerology breakdown?',
    ctaBtn: 'GET FULL REPORT — ₹199',
    meaning: 'What It Means',
  },
  hi: {
    back: 'वापस',
    badge: 'अंक ज्योतिष',
    title: 'भाग्यशाली अंक कैलकुलेटर',
    subtitle: 'पाइथागोरियन अंक ज्योतिष का उपयोग करके अपने जीवन पथ, भाग्य, आत्मा और व्यक्तित्व अंक खोजें',
    name: 'पूरा नाम',
    dob: 'जन्म तिथि',
    calculate: 'मेरे अंक बताएं',
    calculating: 'गणना हो रही है...',
    lifePath: 'जीवन पथ अंक',
    destiny: 'भाग्य अंक',
    soulUrge: 'आत्मा अंक',
    personality: 'व्यक्तित्व अंक',
    birthday: 'जन्मदिन अंक',
    luckyNums: 'भाग्यशाली अंक',
    luckyColors: 'भाग्यशाली रंग',
    luckyDay: 'भाग्यशाली दिन',
    cta: 'संपूर्ण अंक ज्योतिष विश्लेषण चाहिए?',
    ctaBtn: 'पूरी रिपोर्ट प्राप्त करें — ₹199',
    meaning: 'इसका अर्थ',
  },
};

const NUMBER_COLORS: Record<number, string> = {
  1: 'from-red-500 to-amber-500',
  2: 'from-blue-400 to-cyan-400',
  3: 'from-yellow-400 to-orange-400',
  4: 'from-blue-600 to-indigo-500',
  5: 'from-gray-400 to-white',
  6: 'from-pink-400 to-rose-400',
  7: 'from-green-400 to-emerald-500',
  8: 'from-indigo-500 to-purple-600',
  9: 'from-red-600 to-rose-500',
  11: 'from-yellow-200 to-white',
  22: 'from-amber-500 to-orange-600',
  33: 'from-cyan-400 to-blue-500',
};

export default function NumerologyPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        const res = calculateNumerology(name, dob);
        setResult(res);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 1000);
  };

  const getGradient = (num: number) => NUMBER_COLORS[num] || NUMBER_COLORS[1];

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#151520] to-[#121212]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[150px]" />
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
            <Hash className="w-3.5 h-3.5" />
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
          <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
            <User className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
            <input required type="text" placeholder={t.name} value={name} onChange={e => setName(e.target.value)}
              className="w-full py-3 bg-transparent focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] text-[16px] md:text-sm uppercase tracking-widest" />
          </div>
          <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
            <Calendar className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
            <input required type="date" value={dob} onChange={e => setDob(e.target.value)}
              className="w-full py-3 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full mt-4 py-4 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[#E5D6C8] rounded-full text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group">
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />{t.calculating}</>
            ) : (
              <><Hash className="w-4 h-4 text-[#B78E28]" />{t.calculate}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
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
              {/* Core Numbers Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: t.lifePath, number: result.lifePathNumber, meaning: language === 'hi' ? (LIFE_PATH_MEANINGS[result.lifePathNumber]?.hi || '') : result.lifePathMeaning },
                  { label: t.destiny, number: result.destinyNumber, meaning: language === 'hi' ? (DESTINY_MEANINGS[result.destinyNumber]?.hi || '') : result.destinyMeaning },
                  { label: t.soulUrge, number: result.soulUrgeNumber, meaning: language === 'hi' ? (LIFE_PATH_MEANINGS[result.soulUrgeNumber]?.hi || '') : result.soulUrgeMeaning },
                  { label: t.personality, number: result.personalityNumber, meaning: language === 'hi' ? (DESTINY_MEANINGS[result.personalityNumber]?.hi || '') : result.personalityMeaning },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                    className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[1.5rem] p-6 hover:border-[#B78E28]/40 transition-all group"
                  >
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-3">{item.label}</p>
                    <div className={`text-5xl font-serif font-light bg-gradient-to-br ${getGradient(item.number)} bg-clip-text text-transparent mb-4`}>
                      {item.number}
                    </div>
                    <p className="text-[9px] text-[#7D756B] group-hover:text-[#E5D6C8] uppercase tracking-widest leading-relaxed transition-colors">
                      {item.meaning}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Lucky Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-2xl p-5 text-center">
                  <Star className="w-5 h-5 text-[#B78E28] mx-auto mb-2" />
                  <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2">{t.luckyNums}</p>
                  <p className="text-lg font-serif text-[#B78E28]">{result.luckyNumbers.join(', ')}</p>
                </div>
                <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-2xl p-5 text-center">
                  <Palette className="w-5 h-5 text-[#B78E28] mx-auto mb-2" />
                  <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2">{t.luckyColors}</p>
                  <p className="text-sm font-serif text-[#E5D6C8]">{result.luckyColors.join(', ')}</p>
                </div>
                <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-2xl p-5 text-center">
                  <Clock className="w-5 h-5 text-[#B78E28] mx-auto mb-2" />
                  <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2">{t.luckyDay}</p>
                  <p className="text-sm font-serif text-[#E5D6C8]">{result.luckyDay}</p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-8 text-center"
              >
                <Hash className="w-8 h-8 text-[#B78E28] mx-auto mb-4" />
                <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
                <Link href="/store/18" className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
                  {t.ctaBtn}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
