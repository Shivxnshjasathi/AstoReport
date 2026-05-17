'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, User, Calendar, Loader2, Star, BookOpen, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateLalKitab, type LalKitabRemedy } from './actions';
import LocationSearch from '../components/Form/LocationSearch';
import { LocationData } from '@/lib/services/geocoding';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'LAL KITAB',
    title: 'Lal Kitab Remedies',
    subtitle: 'UNCOVER UNIQUE, PRACTICAL, AND HIGHLY EFFECTIVE VEDIC REMEDIES MAPPED TO YOUR PLANETARY HOUSES',
    name: 'FULL NAME',
    dob: 'DATE OF BIRTH',
    tob: 'TIME OF BIRTH',
    calculate: 'FIND MY REMEDIES',
    calculating: 'DECODING SACRED REMEDIES...',
    housePrefix: 'House',
    effect: 'Placement Effect',
    remedy: 'Suggested Remedy',
    intensity: 'Remedy Urgency',
    cta: 'Want a complete energized Lal Kitab planetary remedy kit?',
    ctaBtn: 'ORDER REMEDY KIT — ₹199',
    descText: 'Lal Kitab remedies are unique because they are practical, do not require expensive rituals, and focus on simple household alignments to redirect planetary energies.',
  },
  hi: {
    back: 'वापस',
    badge: 'लाल किताब',
    title: 'लाल किताब उपाय',
    subtitle: 'अपने ग्रहों के भावों के अनुसार अद्वितीय, व्यावहारिक और अत्यधिक प्रभावी वैदिक उपायों की खोज करें',
    name: 'पूरा नाम',
    dob: 'जन्म तिथि',
    tob: 'जन्म समय',
    calculate: 'मेरे उपाय खोजें',
    calculating: 'दिव्य उपायों को डिकोड किया जा रहा है...',
    housePrefix: 'भाव',
    effect: 'भाव स्थिति प्रभाव',
    remedy: 'सुझाया गया उपाय',
    intensity: 'उपाय तात्कालिकता',
    cta: 'क्या आप संपूर्ण सिद्ध लाल किताब गृह शांति किट चाहते हैं?',
    ctaBtn: 'लाल किताब गृह शांति किट ऑर्डर करें',
    descText: 'लाल किताब के उपाय अद्वितीय हैं क्योंकि वे व्यावहारिक हैं, महंगे अनुष्ठानों की आवश्यकता नहीं होती है, और ग्रहों की ऊर्जा को पुनर्निर्देशित करने के लिए सरल घरेलू संरेखण पर ध्यान केंद्रित करते हैं।',
  },
};

const INTENSITY_COLORS = {
  High: 'bg-red-500/10 border-red-500/30 text-red-400',
  Moderate: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  General: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
};

export default function LalKitabPage() {
  const { language } = useLanguage();
  const t = dict[language];

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [remedies, setRemedies] = useState<LalKitabRemedy[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return alert(language === 'hi' ? 'कृपया एक स्थान चुनें' : 'Please select a location');
    setLoading(true);
    setError(null);
    setRemedies(null);

    const result = await calculateLalKitab(
      dob,
      tob,
      location.lat,
      location.lon,
      location.timezone
    );

    if (result.success && result.remedies) {
      setRemedies(result.remedies);
    } else {
      setError(result.error || 'Failed to determine remedies');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1a1515] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[150px]" />
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
            <BookOpen className="w-3.5 h-3.5" />
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
              <><BookOpen className="w-4 h-4 text-[#B78E28]" />{t.calculate}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </motion.form>

        {error && (
          <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-2xl text-center text-red-400 text-xs mb-8">
            {error}
          </div>
        )}

        {/* Results Remedies */}
        <AnimatePresence>
          {remedies && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Informative Tip */}
              <div className="p-6 bg-[#161616]/40 border border-[#7D756B]/20 rounded-3xl flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7D756B] leading-relaxed">
                  {t.descText}
                </p>
              </div>

              {/* Remedies List */}
              <div className="space-y-6">
                {remedies.map((rem, index) => {
                  const intensityClass = INTENSITY_COLORS[rem.intensity] || INTENSITY_COLORS.General;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] p-8 hover:border-[#B78E28]/40 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#7D756B]/15 pb-6 mb-6">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">📿</span>
                          <div>
                            <h2 className="text-xl font-serif text-[#E5D6C8] uppercase tracking-wider font-light">
                              {rem.planet} in {t.housePrefix} {rem.house}
                            </h2>
                          </div>
                        </div>

                        <span className={`px-4 py-1.5 rounded-full text-[8px] uppercase tracking-widest font-black border ${intensityClass}`}>
                          {t.intensity}: {rem.intensity}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-[9px] uppercase tracking-widest text-[#B78E28] mb-3 font-bold">
                            {t.effect}
                          </h4>
                          <p className="text-[11px] leading-relaxed text-[#7D756B] font-light">
                            {language === 'hi' ? rem.effect.hi : rem.effect.en}
                          </p>
                        </div>

                        <div className="p-6 bg-[#1A1A1A]/40 border border-[#7D756B]/25 rounded-2xl flex gap-4">
                          <ShieldAlert className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-[9px] uppercase tracking-widest text-[#B78E28] mb-2 font-bold">
                              {t.remedy}
                            </h4>
                            <p className="text-[11px] leading-relaxed text-[#E5D6C8]/80 font-light">
                              {language === 'hi' ? rem.remedy.hi : rem.remedy.en}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Consultation / Energized Remedies Kit CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-10 text-center"
              >
                <Star className="w-8 h-8 text-[#B78E28] mx-auto mb-4" />
                <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
                
                <Link href="/consult" className="group inline-flex items-center justify-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
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
