'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Sparkles, ArrowRight, Calendar, Clock, User, Loader2, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateKundliMatch, type MatchResult } from '@/lib/astro/moonSign';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'GUN MILAN',
    title: 'Kundli Match',
    subtitle: 'ASHTAKOOT GUN MILAN — CHECK YOUR MARRIAGE COMPATIBILITY WITH VEDIC PRECISION',
    bride: 'Bride Details',
    groom: 'Groom Details',
    dob: 'Date of Birth',
    tob: 'Time of Birth',
    match: 'CHECK COMPATIBILITY',
    matching: 'READING THE STARS...',
    score: 'Match Score',
    outOf: 'out of 36',
    gunas: 'Guna Breakdown',
    cta: 'Want a detailed Couple Kundli report?',
    ctaBtn: 'GET COUPLE KUNDLI — ₹199',
    brideSign: 'Bride Moon Sign',
    groomSign: 'Groom Moon Sign',
    brideNak: 'Bride Nakshatra',
    groomNak: 'Groom Nakshatra',
  },
  hi: {
    back: 'वापस',
    badge: 'गुण मिलान',
    title: 'कुंडली मिलान',
    subtitle: 'अष्टकूट गुण मिलान — वैदिक सटीकता के साथ अपनी विवाह अनुकूलता जांचें',
    bride: 'वधू का विवरण',
    groom: 'वर का विवरण',
    dob: 'जन्म तिथि',
    tob: 'जन्म का समय',
    match: 'अनुकूलता जांचें',
    matching: 'सितारों को पढ़ रहे हैं...',
    score: 'मिलान स्कोर',
    outOf: '36 में से',
    gunas: 'गुण विवरण',
    cta: 'विस्तृत युगल कुंडली रिपोर्ट चाहिए?',
    ctaBtn: 'युगल कुंडली प्राप्त करें — ₹199',
    brideSign: 'वधू चंद्र राशि',
    groomSign: 'वर चंद्र राशि',
    brideNak: 'वधू नक्षत्र',
    groomNak: 'वर नक्षत्र',
  },
};

export default function MatchPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [brideDob, setBrideDob] = useState('');
  const [brideTob, setBrideTob] = useState('');
  const [groomDob, setGroomDob] = useState('');
  const [groomTob, setGroomTob] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Slight delay for UX
    setTimeout(() => {
      try {
        const res = calculateKundliMatch(brideDob, brideTob, groomDob, groomTob);
        setResult(res);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 1200);
  };

  const getScoreColor = (pct: number) => {
    if (pct >= 75) return 'text-green-400';
    if (pct >= 50) return 'text-[#B78E28]';
    if (pct >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getBarColor = (score: number, max: number) => {
    const pct = (score / max) * 100;
    if (pct >= 75) return 'bg-green-400';
    if (pct >= 50) return 'bg-[#B78E28]';
    return 'bg-red-400';
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1A1318] to-[#121212]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[900px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]">
            <Heart className="w-3.5 h-3.5" />
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
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light leading-tight">
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
          onSubmit={handleMatch}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Bride */}
          <div className="bg-[#121212]/80 backdrop-blur-lg border border-pink-900/30 rounded-[2rem] p-6 lg:p-8 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-pink-900/20 border border-pink-900/30 flex items-center justify-center">
                <User className="w-4 h-4 text-pink-300" />
              </div>
              <h3 className="text-sm font-serif uppercase tracking-widest text-pink-200">{t.bride}</h3>
            </div>
            <div className="space-y-1">
              <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.dob}</label>
              <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-pink-400 transition-all">
                <Calendar className="w-4 h-4 text-[#7D756B] mr-2 shrink-0" />
                <input required type="date" value={brideDob} onChange={e => setBrideDob(e.target.value)}
                  className="w-full py-2.5 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.tob}</label>
              <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-pink-400 transition-all">
                <Clock className="w-4 h-4 text-[#7D756B] mr-2 shrink-0" />
                <input required type="time" value={brideTob} onChange={e => setBrideTob(e.target.value)}
                  className="w-full py-2.5 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
              </div>
            </div>
          </div>

          {/* Groom */}
          <div className="bg-[#121212]/80 backdrop-blur-lg border border-blue-900/30 rounded-[2rem] p-6 lg:p-8 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-900/20 border border-blue-900/30 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-300" />
              </div>
              <h3 className="text-sm font-serif uppercase tracking-widest text-blue-200">{t.groom}</h3>
            </div>
            <div className="space-y-1">
              <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.dob}</label>
              <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-blue-400 transition-all">
                <Calendar className="w-4 h-4 text-[#7D756B] mr-2 shrink-0" />
                <input required type="date" value={groomDob} onChange={e => setGroomDob(e.target.value)}
                  className="w-full py-2.5 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.tob}</label>
              <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-blue-400 transition-all">
                <Clock className="w-4 h-4 text-[#7D756B] mr-2 shrink-0" />
                <input required type="time" value={groomTob} onChange={e => setGroomTob(e.target.value)}
                  className="w-full py-2.5 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="group px-10 py-4 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[#E5D6C8] rounded-full text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />{t.matching}</>
              ) : (
                <><Heart className="w-4 h-4 text-pink-400" />{t.match}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </div>
        </motion.form>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Score Circle */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-8 lg:p-12 text-center">
                <p className="text-[10px] text-[#7D756B] uppercase tracking-widest mb-6">{t.score}</p>
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" stroke="#7D756B" strokeWidth="4" fill="none" opacity="0.2" />
                    <circle cx="60" cy="60" r="52" stroke={result.percentage >= 75 ? '#22c55e' : result.percentage >= 50 ? '#B78E28' : '#ef4444'}
                      strokeWidth="4" fill="none" strokeLinecap="round"
                      strokeDasharray={`${(result.percentage / 100) * 327} 327`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-serif font-light ${getScoreColor(result.percentage)}`}>{result.totalScore}</span>
                    <span className="text-[10px] text-[#7D756B] uppercase tracking-widest">{t.outOf}</span>
                  </div>
                </div>
                <p className={`text-sm uppercase tracking-widest font-bold ${getScoreColor(result.percentage)}`}>
                  {result.percentage}%
                </p>
                <p className="text-xs text-[#E5D6C8] uppercase tracking-widest mt-4 max-w-md mx-auto leading-relaxed">
                  {language === 'hi' ? result.verdict.hi : result.verdict.en}
                </p>

                {/* Signs Summary */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#7D756B]/20">
                  <div>
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.brideSign}</p>
                    <p className="text-lg font-serif text-pink-300">{result.brideRashi.symbol} {language === 'hi' ? result.brideRashi.hi : result.brideRashi.en}</p>
                    <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mt-1">{language === 'hi' ? result.brideNakshatra.hi : result.brideNakshatra.en}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.groomSign}</p>
                    <p className="text-lg font-serif text-blue-300">{result.groomRashi.symbol} {language === 'hi' ? result.groomRashi.hi : result.groomRashi.en}</p>
                    <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mt-1">{language === 'hi' ? result.groomNakshatra.hi : result.groomNakshatra.en}</p>
                  </div>
                </div>
              </div>

              {/* Guna Breakdown */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] p-6 lg:p-8">
                <h3 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8] mb-6 flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#B78E28]" />
                  {t.gunas}
                </h3>
                <div className="space-y-4">
                  {result.categories.map((cat, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-[#E5D6C8] uppercase tracking-widest">{language === 'hi' ? cat.nameHi : cat.name}</span>
                        <span className="text-[10px] text-[#B78E28] font-mono">{cat.score}/{cat.max}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#7D756B]/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(cat.score / cat.max) * 100}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                          className={`h-full rounded-full ${getBarColor(cat.score, cat.max)}`}
                        />
                      </div>
                      <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mt-1">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-8 text-center">
                <Heart className="w-8 h-8 text-[#B78E28] mx-auto mb-4" />
                <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
                <Link href="/store/2" className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
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
