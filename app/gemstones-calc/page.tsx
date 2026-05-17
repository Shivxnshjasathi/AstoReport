'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, User, Calendar, Loader2, Star, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateGemstones, type GemstoneRecommendation } from './actions';
import LocationSearch from '../components/Form/LocationSearch';
import { LocationData } from '@/lib/services/geocoding';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'GEMSTONE GUIDE',
    title: 'Lucky Ratna Recommendation',
    subtitle: 'ANALYZE YOUR LAGNA (ASCENDANT) AND PLANETARY ALIGNMENTS TO DISCOVER YOUR PERFECT SACRED GEMSTONES',
    name: 'FULL NAME',
    dob: 'DATE OF BIRTH',
    tob: 'TIME OF BIRTH',
    calculate: 'FIND MY GEMSTONES',
    calculating: 'SEARCHING CELESTIAL RATNAS...',
    ascendantText: 'Your Ascendant (Lagna):',
    benefits: 'Celestial Benefits',
    wearInfo: 'Wearing Rituals',
    finger: 'Finger',
    metal: 'Metal',
    mantra: 'Chanting Mantra',
    buyBtn: 'VIEW CERTIFIED GEMSTONES',
    cta: 'Want a custom gemstone blessing energized under your name?',
    ctaBtn: 'ORDER ANUSTHAN ENERGIZED STONE',
    descText: 'Gemstones act as organic cosmic filters. By wearing your lagna-benefactor stone, you align planetary wavelengths directly with your energy body.',
    ruler: 'Planetary Ruler',
  },
  hi: {
    back: 'वापस',
    badge: 'रत्न मार्गदर्शिका',
    title: 'भाग्यशाली रत्न अनुशंसा',
    subtitle: 'अपने उत्तम पवित्र रत्नों को खोजने के लिए अपने लग्न और ग्रहों के संरेखण का विश्लेषण करें',
    name: 'पूरा नाम',
    dob: 'जन्म तिथि',
    tob: 'जन्म समय',
    calculate: 'मेरे भाग्यशाली रत्न खोजें',
    calculating: 'दिव्य रत्नों की खोज हो रही है...',
    ascendantText: 'आपका लग्न (Lagna):',
    benefits: 'लौकिक लाभ',
    wearInfo: 'धारण करने की विधि',
    finger: 'उंगली',
    metal: 'धातु',
    mantra: 'मंत्र जाप',
    buyBtn: 'प्रमाणित रत्न देखें',
    cta: 'क्या आप अपने नाम से सिद्ध और अभिमंत्रित रत्न चाहते हैं?',
    ctaBtn: 'अनुष्ठान अभिमंत्रित रत्न ऑर्डर करें',
    descText: 'रत्न जैविक लौकिक फिल्टर के रूप में कार्य करते हैं। अपने लग्न-अनुकूल रत्न को धारण करके, आप सीधे अपने ऊर्जा शरीर के साथ ग्रहों की तरंग दैर्ध्य को संरेखित करते हैं।',
    ruler: 'शासक ग्रह',
  },
};

const STONE_GRADIENTS: Record<string, string> = {
  'Red Coral': 'from-red-500/10 to-orange-500/20 border-red-500/30 text-red-400',
  'Yellow Sapphire': 'from-yellow-500/10 to-amber-500/20 border-yellow-500/30 text-yellow-400',
  'Diamond / White Sapphire': 'from-slate-200/10 to-zinc-400/20 border-zinc-300/30 text-zinc-300',
  'Emerald': 'from-emerald-500/10 to-green-500/20 border-emerald-500/30 text-emerald-400',
  'Pearl': 'from-sky-200/10 to-blue-200/20 border-sky-300/30 text-sky-300',
  'Ruby': 'from-rose-600/10 to-red-600/20 border-rose-500/30 text-rose-400',
  'Blue Sapphire': 'from-indigo-600/10 to-purple-700/20 border-indigo-500/30 text-indigo-400',
  'Diamond / Opal': 'from-fuchsia-300/10 to-pink-400/20 border-fuchsia-400/30 text-fuchsia-300',
};

export default function GemstonesPage() {
  const { language } = useLanguage();
  const t = dict[language];

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ recommendations: GemstoneRecommendation[]; ascendant: { en: string; hi: string } } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return alert(language === 'hi' ? 'कृपया एक स्थान चुनें' : 'Please select a location');
    setLoading(true);
    setError(null);
    setResults(null);

    const result = await calculateGemstones(
      dob,
      tob,
      location.lat,
      location.lon,
      location.timezone
    );

    if (result.success && result.recommendations) {
      setResults({
        recommendations: result.recommendations,
        ascendant: result.ascendant,
      });
    } else {
      setError(result.error || 'Failed to determine gemstones');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#151a15] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[900px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Nav Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]">
            <Sparkles className="w-3.5 h-3.5" />
            {t.badge}
          </div>
        </div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light leading-tight">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-2xl mx-auto leading-loose px-4">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleCalculate}
          className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-8 lg:p-10 mb-12 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all col-span-1 md:col-span-3">
              <User className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
              <input required type="text" placeholder={t.name} value={name} onChange={e => setName(e.target.value)}
                className="w-full py-3 bg-transparent focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] text-[16px] md:text-sm uppercase tracking-widest" />
            </div>

            <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
              <Calendar className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
              <input required type="date" value={dob} onChange={e => setDob(e.target.value)}
                className="w-full py-3 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
            </div>

            <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
              <Calendar className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
              <input required type="time" value={tob} onChange={e => setTob(e.target.value)}
                className="w-full py-3 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
            </div>

            <div className="col-span-1 md:col-span-1 border-b border-[#7D756B]/30 pb-1">
              <LocationSearch onSelect={setLocation} />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full mt-4 py-4 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[#E5D6C8] rounded-full text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group">
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />{t.calculating}</>
            ) : (
              <><Sparkles className="w-4 h-4 text-[#B78E28]" />{t.calculate}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </motion.form>

        {error && (
          <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-2xl text-center text-red-400 text-xs mb-8">
            {error}
          </div>
        )}

        {/* Results Timeline */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Ascendant Banner */}
              <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-3xl p-6 text-center">
                <span className="text-[10px] text-[#7D756B] uppercase tracking-[0.25em] block mb-2">{t.ascendantText}</span>
                <span className="text-2xl font-serif text-[#B78E28] uppercase tracking-widest font-light">
                  {language === 'hi' ? results.ascendant.hi : results.ascendant.en}
                </span>
              </div>

              {/* Informative Tip */}
              <div className="p-6 bg-[#161616]/40 border border-[#7D756B]/20 rounded-3xl flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7D756B] leading-relaxed">
                  {t.descText}
                </p>
              </div>

              {/* Recommendations Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.recommendations.map((gem, index) => {
                  const gradientClass = STONE_GRADIENTS[gem.name] || 'from-gray-500/10 to-gray-700/20 border-gray-500/30 text-gray-400';
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className={`bg-gradient-to-br ${gradientClass} border rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between group`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-[9px] uppercase tracking-widest font-black opacity-80">
                            {t.ruler}: {gem.ruler}
                          </span>
                          <span className="text-3xl">💎</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-serif uppercase tracking-wider mb-2 font-light text-[#E5D6C8]">
                          {language === 'hi' ? gem.hindiName : gem.name}
                        </h2>
                        <p className="text-[10px] text-[#7D756B] uppercase tracking-widest mb-6 font-semibold">
                          Vedic Stone: {gem.stone}
                        </p>

                        <div className="border-t border-[#7D756B]/20 pt-6 mb-6">
                          <h4 className="text-[9px] uppercase tracking-widest text-[#B78E28] mb-3 font-bold">
                            {t.benefits}
                          </h4>
                          <p className="text-[11px] leading-relaxed text-[#E5D6C8]/80 font-light">
                            {language === 'hi' ? gem.benefits.hi : gem.benefits.en}
                          </p>
                        </div>
                      </div>

                      {/* Wear specifications */}
                      <div className="border-t border-[#7D756B]/15 pt-6 space-y-3">
                        <h4 className="text-[9px] uppercase tracking-widest text-[#B78E28] mb-1 font-bold">
                          {t.wearInfo}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-[9px] uppercase tracking-wider text-[#7D756B]">
                          <div>
                            <span className="font-bold block text-[#B78E28]/70">{t.finger}</span>
                            <span className="text-[10px] text-[#E5D6C8] font-light block leading-normal mt-0.5">
                              {language === 'hi' ? gem.finger.hi : gem.finger.en}
                            </span>
                          </div>
                          <div>
                            <span className="font-bold block text-[#B78E28]/70">{t.metal}</span>
                            <span className="text-[10px] text-[#E5D6C8] font-light block leading-normal mt-0.5">
                              {language === 'hi' ? gem.metal.hi : gem.metal.en}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#7D756B]/10">
                          <span className="font-bold block text-[8px] uppercase tracking-widest text-[#B78E28]/70">{t.mantra}</span>
                          <span className="text-[9px] text-[#E5D6C8] font-serif block leading-relaxed italic mt-1 pl-2 border-l border-[#B78E28]/40">
                            " {gem.mantra} "
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Consultation / Buy CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-10 text-center"
              >
                <Star className="w-8 h-8 text-[#B78E28] mx-auto mb-4" />
                <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/gemstones" className="group inline-flex items-center justify-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
                    {t.buyBtn}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/consult" className="group inline-flex items-center justify-center gap-3 bg-transparent border border-[#7D756B]/40 text-[#E5D6C8] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:border-[#E5D6C8] transition-all">
                    {t.ctaBtn}
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
