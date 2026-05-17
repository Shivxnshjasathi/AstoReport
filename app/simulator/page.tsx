'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Orbit, Play, Pause, SkipBack, SkipForward, ChevronLeft, ChevronRight, Calendar, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

// Dynamic import to avoid SSR for Three.js
const ZodiacWheel3D = dynamic(() => import('../components/Simulator/ZodiacWheel3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-h-[600px] bg-[#0A0A0A] rounded-3xl border border-[#7D756B]/20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Orbit className="w-8 h-8 text-[#B78E28] animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#7D756B]">INITIALIZING 3D ENGINE...</p>
      </div>
    </div>
  ),
});

const dict = {
  en: {
    back: 'BACK',
    badge: '3D TRANSIT SIMULATOR',
    title: 'Celestial Transit Simulator',
    subtitle: 'WITNESS THE DANCE OF PLANETS ACROSS THE ZODIAC IN REAL-TIME 3D',
    today: 'TODAY',
    speed: 'SPEED',
    day: 'Day',
    days: 'Days',
    month: 'Month',
    year: 'Year',
    controls: 'TIME CONTROLS',
    currentDate: 'VIEWING DATE',
    offset: 'OFFSET FROM TODAY',
    pause: 'Pause',
    play: 'Play',
    slow: '0.5×',
    normal: '1×',
    fast: '2×',
    turbo: '10×',
    planetPositions: 'CURRENT PLANETARY POSITIONS',
    degree: 'Degree',
    sign: 'Sign',
    tip: 'Drag to rotate the zodiac wheel. Scroll to zoom. Use the time slider to travel through past and future transits.',
    cta: 'How do these transits affect your personal birth chart?',
    ctaBtn: 'GET PERSONALIZED TRANSIT REPORT',
    retrograde: 'RETROGRADE',
  },
  hi: {
    back: 'वापस',
    badge: '3D गोचर सिम्युलेटर',
    title: 'दिव्य गोचर सिम्युलेटर',
    subtitle: 'रियल-टाइम 3D में राशि चक्र में ग्रहों के नृत्य को देखें',
    today: 'आज',
    speed: 'गति',
    day: 'दिन',
    days: 'दिन',
    month: 'महीना',
    year: 'वर्ष',
    controls: 'समय नियंत्रण',
    currentDate: 'देखने की तिथि',
    offset: 'आज से अंतर',
    pause: 'रोकें',
    play: 'चलाएं',
    slow: '0.5×',
    normal: '1×',
    fast: '2×',
    turbo: '10×',
    planetPositions: 'वर्तमान ग्रह स्थितियां',
    degree: 'अंश',
    sign: 'राशि',
    tip: 'राशि चक्र को घुमाने के लिए खींचें। ज़ूम करने के लिए स्क्रॉल करें। पिछले और भविष्य के गोचर में यात्रा करने के लिए टाइम स्लाइडर का उपयोग करें।',
    cta: 'ये गोचर आपकी व्यक्तिगत जन्म कुंडली को कैसे प्रभावित करते हैं?',
    ctaBtn: 'व्यक्तिगत गोचर रिपोर्ट प्राप्त करें',
    retrograde: 'वक्री',
  },
};

const ZODIAC_SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const ZODIAC_HI = ['मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुंभ','मीन'];
const ZODIAC_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

const PLANETS_DATA = [
  { name: 'Sun', hi: 'सूर्य', color: '#FF6B35', baseAngle: 55, speed: 1.0 },
  { name: 'Moon', hi: 'चंद्रमा', color: '#C0C0C0', baseAngle: 120, speed: 13.37 },
  { name: 'Mercury', hi: 'बुध', color: '#2ECC71', baseAngle: 40, speed: 4.09 },
  { name: 'Venus', hi: 'शुक्र', color: '#E91E63', baseAngle: 80, speed: 1.62 },
  { name: 'Mars', hi: 'मंगल', color: '#DC143C', baseAngle: 150, speed: 0.52 },
  { name: 'Jupiter', hi: 'बृहस्पति', color: '#F39C12', baseAngle: 95, speed: 0.083 },
  { name: 'Saturn', hi: 'शनि', color: '#607D8B', baseAngle: 345, speed: 0.034 },
];

function getPlanetPositionInfo(planet: typeof PLANETS_DATA[0], dayOffset: number) {
  const totalDegrees = (planet.baseAngle + planet.speed * dayOffset) % 360;
  const normalizedDegrees = totalDegrees < 0 ? totalDegrees + 360 : totalDegrees;
  const signIndex = Math.floor(normalizedDegrees / 30) % 12;
  const degreeInSign = normalizedDegrees % 30;
  return { signIndex, degreeInSign: Math.floor(degreeInSign), totalDegrees: Math.floor(normalizedDegrees) };
}

export default function SimulatorPage() {
  const { language } = useLanguage();
  const t = dict[language];

  const [dayOffset, setDayOffset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);

  // Auto-play effect
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setDayOffset((prev) => prev + playSpeed);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, playSpeed]);

  const viewingDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + Math.floor(dayOffset));
    return d;
  }, [dayOffset]);

  const formattedDate = viewingDate.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const planetPositions = useMemo(() => {
    return PLANETS_DATA.map((p) => ({
      ...p,
      ...getPlanetPositionInfo(p, dayOffset),
    }));
  }, [dayOffset]);

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A14] via-[#121212] to-[#0A0A14]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-950/8 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-950/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1100px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Nav */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]">
            <Orbit className="w-3.5 h-3.5" />
            {t.badge}
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-full mb-6">
            <Orbit className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-indigo-400">REAL-TIME 3D</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light leading-tight">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-2xl mx-auto leading-loose px-4">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Main Layout: 3D Wheel + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* 3D Zodiac Wheel */}
          <div className="lg:col-span-2">
            <Suspense fallback={
              <div className="w-full aspect-square max-h-[600px] bg-[#0A0A0A] rounded-3xl border border-[#7D756B]/20 flex items-center justify-center">
                <Orbit className="w-8 h-8 text-[#B78E28] animate-spin" />
              </div>
            }>
              <ZodiacWheel3D dayOffset={dayOffset} language={language} />
            </Suspense>
          </div>

          {/* Sidebar: Date + Planet Positions */}
          <div className="space-y-6">
            {/* Current Date Display */}
            <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] p-6">
              <h3 className="text-[8px] uppercase tracking-[0.2em] text-[#B78E28] font-bold mb-3 flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {t.currentDate}
              </h3>
              <p className="text-sm font-serif text-[#E5D6C8] uppercase tracking-widest mb-2">
                {formattedDate}
              </p>
              <p className="text-[9px] text-[#7D756B] uppercase tracking-[0.15em]">
                {t.offset}: {dayOffset >= 0 ? '+' : ''}{Math.floor(dayOffset)} {t.days}
              </p>
            </div>

            {/* Planet Positions Table */}
            <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] p-6">
              <h3 className="text-[8px] uppercase tracking-[0.2em] text-[#B78E28] font-bold mb-4">
                {t.planetPositions}
              </h3>
              <div className="space-y-3">
                {planetPositions.map((p) => (
                  <div key={p.name} className="flex items-center justify-between py-2 border-b border-[#7D756B]/10 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-[10px] text-[#E5D6C8] uppercase tracking-widest font-medium">
                        {language === 'hi' ? p.hi : p.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono text-[#B78E28]">{p.degreeInSign}°</span>
                      <span className="text-[14px]" title={language === 'hi' ? ZODIAC_HI[p.signIndex] : ZODIAC_SIGNS[p.signIndex]}>
                        {ZODIAC_SYMBOLS[p.signIndex]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Time Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] p-6 lg:p-8 mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[9px] uppercase tracking-[0.2em] text-[#B78E28] font-bold flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {t.controls}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-[#7D756B] uppercase tracking-[0.15em]">{t.speed}:</span>
              {[
                { label: t.slow, value: 0.5 },
                { label: t.normal, value: 1 },
                { label: t.fast, value: 2 },
                { label: t.turbo, value: 10 },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => setPlaySpeed(s.value)}
                  className={`px-2.5 py-1 rounded-full text-[8px] uppercase tracking-widest font-bold border transition-all ${
                    playSpeed === s.value
                      ? 'bg-[#B78E28]/20 border-[#B78E28]/40 text-[#B78E28]'
                      : 'bg-transparent border-[#7D756B]/20 text-[#7D756B] hover:text-[#E5D6C8]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slider */}
          <div className="mb-4">
            <input
              type="range"
              min={-3650}
              max={3650}
              value={dayOffset}
              onChange={(e) => setDayOffset(Number(e.target.value))}
              className="w-full h-1 bg-[#7D756B]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#B78E28] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(183,142,40,0.4)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#E5D6C8]"
            />
            <div className="flex justify-between mt-2 text-[8px] text-[#7D756B] uppercase tracking-widest">
              <span>-10 {t.year}</span>
              <span>{t.today}</span>
              <span>+10 {t.year}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setDayOffset((p) => p - 365)}
              className="w-9 h-9 rounded-full border border-[#7D756B]/30 flex items-center justify-center text-[#7D756B] hover:text-[#E5D6C8] hover:border-[#B78E28] transition-all"
              title={`-1 ${t.year}`}
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDayOffset((p) => p - 30)}
              className="w-9 h-9 rounded-full border border-[#7D756B]/30 flex items-center justify-center text-[#7D756B] hover:text-[#E5D6C8] hover:border-[#B78E28] transition-all"
              title={`-1 ${t.month}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-[#B78E28]/20 border-[#B78E28] text-[#B78E28]'
                  : 'border-[#E5D6C8] text-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212]'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={() => setDayOffset((p) => p + 30)}
              className="w-9 h-9 rounded-full border border-[#7D756B]/30 flex items-center justify-center text-[#7D756B] hover:text-[#E5D6C8] hover:border-[#B78E28] transition-all"
              title={`+1 ${t.month}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDayOffset((p) => p + 365)}
              className="w-9 h-9 rounded-full border border-[#7D756B]/30 flex items-center justify-center text-[#7D756B] hover:text-[#E5D6C8] hover:border-[#B78E28] transition-all"
              title={`+1 ${t.year}`}
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setDayOffset(0); setIsPlaying(false); }}
              className="ml-4 px-4 py-2 rounded-full border border-[#7D756B]/30 text-[8px] uppercase tracking-widest text-[#7D756B] hover:text-[#E5D6C8] hover:border-[#B78E28] transition-all font-bold"
            >
              {t.today}
            </button>
          </div>
        </motion.div>

        {/* Tip */}
        <div className="p-6 bg-[#161616]/40 border border-[#7D756B]/20 rounded-3xl flex items-start gap-4 mb-10">
          <Sparkles className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#7D756B] leading-relaxed">
            {t.tip}
          </p>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-[#1A1A1A]/30 backdrop-blur-md border border-indigo-900/30 rounded-[2rem] p-8 text-center"
        >
          <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
          <Link href="/store/19" className="group inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(79,70,229,0.2)]">
            {t.ctaBtn}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
