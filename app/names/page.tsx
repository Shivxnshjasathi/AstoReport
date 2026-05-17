'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, User, Calendar, Loader2, Star, Eye, Smile } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateBabyNames } from './actions';
import LocationSearch from '../components/Form/LocationSearch';
import { LocationData } from '@/lib/services/geocoding';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'NAKSHATRA NAMES',
    title: 'Vedic Baby Name Finder',
    subtitle: 'FIND THE PERFECT CELESTIAL BABY NAME MAPPED TO THE EXACT NAKSHATRA AND PADA AT BIRTH',
    name: 'EXPECTED / BIRTH DETAILS',
    dob: 'DATE OF BIRTH',
    tob: 'TIME OF BIRTH',
    calculate: 'FIND AUSPICIOUS NAMES',
    calculating: 'GENERATING SACRED NAMES...',
    nakshatraText: 'Janma Nakshatra:',
    padaText: 'Pada (Quarter):',
    rashiText: 'Janma Rashi:',
    seeds: 'Auspicious Start Syllables',
    suggested: 'Celestial Name Recommendations',
    boy: 'Boy Names',
    girl: 'Girl Names',
    meaning: 'Meaning',
    cta: 'Want a complete customized Vedic name report with 100+ options?',
    ctaBtn: 'ORDER FULL NAME REPORT — ₹199',
    descText: 'Vedic naming uses the moon position at birth. Naming a baby starting with their Janma Nakshatra seed letters triggers long-term mental balance, prosperity, and cosmic luck.',
  },
  hi: {
    back: 'वापस',
    badge: 'नक्षत्र नाम',
    title: 'वैदिक बेबी नाम जेनरेटर',
    subtitle: 'जन्म के समय सटीक नक्षत्र और चरण के अनुसार सर्वोत्तम दिव्य बेबी नाम खोजें',
    name: 'अपेक्षित / जन्म विवरण',
    dob: 'जन्म तिथि',
    tob: 'जन्म समय',
    calculate: 'शुभ नाम खोजें',
    calculating: 'दिव्य नामों की गणना हो रही है...',
    nakshatraText: 'जन्म नक्षत्र:',
    padaText: 'चरण (Quarter):',
    rashiText: 'जन्म राशि:',
    seeds: 'शुभ प्रारंभिक अक्षर',
    suggested: 'दिव्य नाम अनुशंसाएं',
    boy: 'लड़कों के नाम',
    girl: 'लड़कियों के नाम',
    meaning: 'अर्थ',
    cta: 'क्या आप 100+ विकल्पों के साथ पूर्ण अनुकूलित वैदिक नाम रिपोर्ट चाहते हैं?',
    ctaBtn: 'पूर्ण नाम रिपोर्ट ऑर्डर करें',
    descText: 'वैदिक नामकरण जन्म के समय चंद्रमा की स्थिति का उपयोग करता है। अपने जन्म नक्षत्र के बीज अक्षरों से शुरू होने वाले बच्चे का नामकरण करने से दीर्घकालिक मानसिक संतुलन, समृद्धि और लौकिक भाग्य सक्रिय होता है।',
  },
};

export default function NamesPage() {
  const { language } = useLanguage();
  const t = dict[language];

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return alert(language === 'hi' ? 'कृपया एक स्थान चुनें' : 'Please select a location');
    setLoading(true);
    setError(null);
    setResults(null);

    const result = await calculateBabyNames(
      dob,
      tob,
      location.lat,
      location.lon,
      location.timezone
    );

    if (result.success) {
      setResults(result);
    } else {
      setError(result.error || 'Failed to determine baby names');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#15171a] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-950/10 rounded-full blur-[150px]" />
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
            <Smile className="w-3.5 h-3.5" />
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
              <><Smile className="w-4 h-4 text-[#B78E28]" />{t.calculate}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </motion.form>

        {error && (
          <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-2xl text-center text-red-400 text-xs mb-8">
            {error}
          </div>
        )}

        {/* Results Banner & Grid */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Placement info Banner */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-3xl p-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-[8px] text-[#7D756B] uppercase tracking-[0.2em] block mb-1">{t.nakshatraText}</span>
                  <span className="text-sm font-serif text-[#B78E28] uppercase tracking-wider block font-light">{results.nakshatra}</span>
                </div>
                <div>
                  <span className="text-[8px] text-[#7D756B] uppercase tracking-[0.2em] block mb-1">{t.padaText}</span>
                  <span className="text-sm font-serif text-[#B78E28] uppercase tracking-wider block font-light">{results.pada}</span>
                </div>
                <div>
                  <span className="text-[8px] text-[#7D756B] uppercase tracking-[0.2em] block mb-1">{t.rashiText}</span>
                  <span className="text-sm font-serif text-[#B78E28] uppercase tracking-wider block font-light">{results.rashi}</span>
                </div>
              </div>

              {/* Informative Tip */}
              <div className="p-6 bg-[#161616]/40 border border-[#7D756B]/20 rounded-3xl flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7D756B] leading-relaxed">
                  {t.descText}
                </p>
              </div>

              {/* Seed Syllables Card */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#B78E28]/20 rounded-3xl p-6 text-center">
                <h4 className="text-[9px] uppercase tracking-widest text-[#B78E28] mb-4 font-bold">
                  {t.seeds}
                </h4>
                <div className="flex justify-center gap-4 flex-wrap">
                  {results.seedLetters.map((letter: string, index: number) => (
                    <span
                      key={index}
                      className="px-6 py-3 bg-[#B78E28]/10 border border-[#B78E28]/30 rounded-full text-sm font-serif text-[#E5D6C8] uppercase tracking-widest"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              {/* Baby Names List */}
              <div className="space-y-6">
                <h3 className="text-base font-serif uppercase tracking-widest text-[#E5D6C8] pl-2 text-center">
                  {t.suggested}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Boy names */}
                  <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-3xl p-6 space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#B78E28] font-black border-b border-[#7D756B]/20 pb-2 mb-2 text-center">
                      ♂️ {t.boy}
                    </h4>
                    <div className="space-y-3">
                      {results.suggestedNames.filter((n: any) => n.gender === 'boy').map((nameObj: any, index: number) => (
                        <div key={index} className="p-3 bg-[#1A1A1A]/40 rounded-2xl border border-[#7D756B]/10 hover:border-[#B78E28]/30 transition-colors">
                          <span className="text-sm font-bold uppercase tracking-wider text-[#E5D6C8]">{nameObj.name}</span>
                          <span className="text-[9px] text-[#7D756B] block uppercase tracking-[0.1em] mt-1">{t.meaning}: {nameObj.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Girl names */}
                  <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-3xl p-6 space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#B78E28] font-black border-b border-[#7D756B]/20 pb-2 mb-2 text-center">
                      ♀️ {t.girl}
                    </h4>
                    <div className="space-y-3">
                      {results.suggestedNames.filter((n: any) => n.gender === 'girl').map((nameObj: any, index: number) => (
                        <div key={index} className="p-3 bg-[#1A1A1A]/40 rounded-2xl border border-[#7D756B]/10 hover:border-[#B78E28]/30 transition-colors">
                          <span className="text-sm font-bold uppercase tracking-wider text-[#E5D6C8]">{nameObj.name}</span>
                          <span className="text-[9px] text-[#7D756B] block uppercase tracking-[0.1em] mt-1">{t.meaning}: {nameObj.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Name Report CTA */}
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
