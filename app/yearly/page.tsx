'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, User, Calendar, Loader2, Star, Target, Compass, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateVarshphal, type VarshphalResult } from './actions';
import LocationSearch from '../components/Form/LocationSearch';
import { LocationData } from '@/lib/services/geocoding';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'VARSHPHAL',
    title: 'Yearly Solar Return Blueprint',
    subtitle: 'SCAN YOUR SOLAR RETURN CHART TO UNCOVER YOUR MUNTHA PLACEMENT AND COMPLETE ANNUAL BLUEPRINT',
    name: 'FULL NAME',
    dob: 'DATE OF BIRTH',
    tob: 'TIME OF BIRTH',
    year: 'TARGET YEAR',
    calculate: 'REVEAL YEARLY BLUEPRINT',
    calculating: 'COMPUTING SOLAR RETURN CHART...',
    munthaRashiText: 'Muntha Sign:',
    munthaHouseText: 'Muntha House:',
    yearLordText: 'Year Lord (Varsha Swami):',
    ageText: 'Target Age:',
    career: 'Career & Business',
    wealth: 'Wealth & Assets',
    love: 'Love & Family',
    health: 'Health & Energy',
    cta: 'Want a complete 50-page highly customized Varshphal handbook?',
    ctaBtn: 'ORDER YEARLY HANDBOOK — ₹199',
    descText: 'Varshphal is the Vedic solar return chart, mapped when the Sun returns to the exact birth coordinates. It reveals highly localized focus, Muntha-progressions, and yearly themes.',
  },
  hi: {
    back: 'वापस',
    badge: 'वर्षफल',
    title: 'वार्षिक सौर रिटर्न ब्लूप्रिंट',
    subtitle: 'अपनी मुंथ स्थिति और पूर्ण वार्षिक ब्लूप्रिंट को उजागर करने के लिए अपने सौर रिटर्न चार्ट को स्कैन करें',
    name: 'पूरा नाम',
    dob: 'जन्म तिथि',
    tob: 'जन्म समय',
    year: 'लक्षित वर्ष',
    calculate: 'वार्षिक ब्लूप्रिंट प्रकट करें',
    calculating: 'सौर रिटर्न चार्ट की गणना हो रही है...',
    munthaRashiText: 'मुंथ राशि:',
    munthaHouseText: 'मुंथ भाव:',
    yearLordText: 'वर्षेश (Varsha Swami):',
    ageText: 'लक्षित आयु:',
    career: 'करियर और व्यवसाय',
    wealth: 'धन और संपत्ति',
    love: 'प्रेम और परिवार',
    health: 'स्वास्थ्य और ऊर्जा',
    cta: 'क्या आप 50-पृष्ठों की अत्यधिक विशिष्ट वर्षफल पुस्तिका चाहते हैं?',
    ctaBtn: 'वार्षिक वर्षफल पुस्तिका ऑर्डर करें',
    descText: 'वर्षफल वैदिक सौर रिटर्न चार्ट है, जब सूर्य सटीक जन्म निर्देशांक पर लौटता है। यह अत्यधिक स्थानीयकृत फोकस, मुंथ-प्रगति और वार्षिक विषयों को प्रकट करता है।',
  },
};

export default function VarshphalPage() {
  const { language } = useLanguage();
  const t = dict[language];

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [targetYear, setTargetYear] = useState(2026);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VarshphalResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return alert(language === 'hi' ? 'कृपया एक स्थान चुनें' : 'Please select a location');
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await calculateVarshphal(
      dob,
      tob,
      location.lat,
      location.lon,
      location.timezone,
      targetYear
    );

    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setError(res.error || 'Failed to scan Solar Return');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1c1815] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-950/10 rounded-full blur-[150px]" />
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
            <Compass className="w-3.5 h-3.5" />
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all col-span-1 md:col-span-4">
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

            <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
              <Compass className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
              <input required type="number" placeholder={t.year} value={targetYear} onChange={e => setTargetYear(Number(e.target.value))}
                className="w-full py-3 bg-transparent focus:outline-none text-[#E5D6C8] text-[16px] md:text-sm uppercase tracking-widest" />
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
              <><Compass className="w-4 h-4 text-[#B78E28]" />{t.calculate}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
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
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Placement info Banner */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-3xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="text-[8px] text-[#7D756B] uppercase tracking-[0.2em] block mb-1">{t.ageText}</span>
                  <span className="text-sm font-serif text-[#B78E28] uppercase tracking-wider block font-light">{result.age} Years</span>
                </div>
                <div>
                  <span className="text-[8px] text-[#7D756B] uppercase tracking-[0.2em] block mb-1">{t.munthaRashiText}</span>
                  <span className="text-sm font-serif text-[#B78E28] uppercase tracking-wider block font-light">{result.munthaRashi}</span>
                </div>
                <div>
                  <span className="text-[8px] text-[#7D756B] uppercase tracking-[0.2em] block mb-1">{t.munthaHouseText}</span>
                  <span className="text-sm font-serif text-[#B78E28] uppercase tracking-wider block font-light">{result.munthaHouse}</span>
                </div>
                <div>
                  <span className="text-[8px] text-[#7D756B] uppercase tracking-[0.2em] block mb-1">{t.yearLordText}</span>
                  <span className="text-sm font-serif text-[#B78E28] uppercase tracking-wider block font-light">{result.yearLord}</span>
                </div>
              </div>

              {/* Informative Tip */}
              <div className="p-6 bg-[#161616]/40 border border-[#7D756B]/20 rounded-3xl flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7D756B] leading-relaxed">
                  {t.descText}
                </p>
              </div>

              {/* Year Lord Card */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#B78E28]/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
                <Award className="w-12 h-12 text-[#B78E28] shrink-0" />
                <div>
                  <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-2 font-light">
                    Annual Planetary Ruler: {result.yearLord}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-[#7D756B] font-light">
                    The Year Lord governs the primary life lessons and breakthroughs of this period. Alignment with {result.yearLord} remedies mitigates transiting friction and multiplies fortune.
                  </p>
                </div>
              </div>

              {/* Forecast Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: t.career, icon: '💼', text: result.forecasts.career },
                  { title: t.wealth, icon: '🪙', text: result.forecasts.wealth },
                  { title: t.love, icon: '💖', text: result.forecasts.love },
                  { title: t.health, icon: '🧘', text: result.forecasts.health },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-3xl p-6 hover:border-[#B78E28]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl">{item.icon}</span>
                      <h4 className="text-xs uppercase tracking-widest text-[#B78E28] font-bold">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#E5D6C8]/80 font-light">
                      {language === 'hi' ? item.text.hi : item.text.en}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Handbook CTA */}
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
