'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Sparkles, ArrowRight, Calendar, Clock, User, Loader2, Star, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateKundliMatch, type MatchResult } from '@/lib/astro/moonSign';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'LOVE SYNASTRY compatibility',
    title: 'Love Synastry Compatibility',
    subtitle: 'ASHTAKOOT MILAN & 36-GUNA COMPATIBILITY WITH 360° CHART SUPERIMPOSITION',
    bride: 'Partner A (Bride)',
    groom: 'Partner B (Groom)',
    dob: 'Date of Birth',
    tob: 'Time of Birth',
    match: 'SUPERIMPOSE CHARTS & ANALYZE',
    matching: 'CALCULATING SYNASTRY PATTERNS...',
    score: 'Synastry Match Score',
    outOf: 'out of 36',
    gunas: 'Guna Breakdown',
    synastryWheel: 'Zodiac Superimposition (Interactive Synastry)',
    synastryAdvice: 'Synastry Connection Insights',
    cta: 'Want a highly detailed professional synastry handbook?',
    ctaBtn: 'ORDER FULL SYNASTRY REPORT',
    brideSign: 'Partner A Rashi',
    groomSign: 'Partner B Rashi',
    brideNak: 'Partner A Nakshatra',
    groomNak: 'Partner B Nakshatra',
  },
  hi: {
    back: 'वापस',
    badge: 'लव सिनैस्ट्री अनुकूलता',
    title: 'लव सिनैस्ट्री अनुकूलता',
    subtitle: 'अष्टकूट मिलान और 36-गुण अनुकूलता के साथ 360 डिग्री चार्ट सुपरइम्पोजिशन',
    bride: 'पार्टनर ए (वधू)',
    groom: 'पार्टनर बी (वर)',
    dob: 'जन्म तिथि',
    tob: 'जन्म का समय',
    match: 'चार्ट सुपरइम्पोज़ और विश्लेषण करें',
    matching: 'सिनैस्ट्री पैटर्न की गणना...',
    score: 'मिलान स्कोर',
    outOf: '36 में से',
    gunas: 'गुण विवरण',
    synastryWheel: 'राशि सुपरइम्पोजिशन (इंटरैक्टिव सिनैस्ट्री)',
    synastryAdvice: 'सिनैस्ट्री कनेक्शन अंतर्दृष्टि',
    cta: 'क्या आप एक विस्तृत पेशेवर सिनैस्ट्री हैंडबुक चाहते हैं?',
    ctaBtn: 'पूर्ण सिनैस्ट्री रिपोर्ट ऑर्डर करें',
    brideSign: 'पार्टनर ए चंद्र राशि',
    groomSign: 'पार्टनर बी चंद्र राशि',
    brideNak: 'पार्टनर ए नक्षत्र',
    groomNak: 'पार्टनर बी नक्षत्र',
  },
};

const ZODIAC_LABELS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

// mock precise tropical degrees for Sun, Moon, Venus, Mars to draw on the wheel
function getMockPlanetDegrees(dob: string) {
  const seed = dob ? dob.split('-').reduce((acc, v) => acc + Number(v), 0) : 100;
  return {
    Sun: (seed * 7) % 360,
    Moon: (seed * 11) % 360,
    Venus: (seed * 13) % 360,
    Mars: (seed * 17) % 360,
  };
}

export default function MatchPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [brideDob, setBrideDob] = useState('1998-05-15');
  const [brideTob, setBrideTob] = useState('08:30');
  const [groomDob, setGroomDob] = useState('1996-10-22');
  const [groomTob, setGroomTob] = useState('14:45');
  
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoveredBridge, setHoveredBridge] = useState<string | null>(null);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

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

  // Coordinates computation for superimposition wheel
  const partnerADegrees = getMockPlanetDegrees(brideDob);
  const partnerBDegrees = getMockPlanetDegrees(groomDob);

  // Compute aspects (Energy Bridges)
  const energyBridges = [
    {
      id: 'bridge-1',
      p1: 'Moon',
      p2: 'Moon',
      deg1: partnerADegrees.Moon,
      deg2: partnerBDegrees.Moon,
      type: Math.abs(partnerADegrees.Moon - partnerBDegrees.Moon) % 120 < 10 ? 'trine' : 'conjunction',
      label: 'Golden Bridge (Moon Trine Moon)',
      desc: 'Intuitive harmony. You process emotions and life changes on the exact same wavelength. Creates a deep sense of safety.',
      descHi: 'सहज सामंजस्य। आप जीवन और भावनाओं को एक ही तरंगदैर्घ्य पर महसूस करते हैं। सुरक्षा की गहरी भावना प्रदान करता है।'
    },
    {
      id: 'bridge-2',
      p1: 'Sun',
      p2: 'Venus',
      deg1: partnerADegrees.Sun,
      deg2: partnerBDegrees.Venus,
      type: 'trine',
      label: 'Affection Bridge (Sun Trine Venus)',
      desc: 'Romance & Appreciation. Natural aesthetic alignment. You bring out the absolute best in each other’s social expressions.',
      descHi: 'रोमांस और सराहना। प्राकृतिक सौंदर्य संरेखण। आप एक-दूसरे के सामाजिक जीवन में सर्वश्रेष्ठ लाते हैं।'
    },
    {
      id: 'bridge-3',
      p1: 'Mars',
      p2: 'Moon',
      deg1: partnerADegrees.Mars,
      deg2: partnerBDegrees.Moon,
      type: 'friction',
      label: 'Friction Point (Mars Square Moon)',
      desc: 'Emotional triggers. Impatience may occasionally lead to brief defensive reactions. Practice patience during stress.',
      descHi: 'भावनात्मक ट्रिगर। असंतोष कभी-कभी रक्षात्मक प्रतिक्रियाओं को जन्म दे सकता है। तनाव के दौरान धैर्य का अभ्यास करें।'
    }
  ];

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1A1318] to-[#121212]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1100px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.dob}</label>
                <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-pink-400 transition-all">
                  <input required type="date" value={brideDob} onChange={e => setBrideDob(e.target.value)}
                    className="w-full py-2 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[13px]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.tob}</label>
                <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-pink-400 transition-all">
                  <input required type="time" value={brideTob} onChange={e => setBrideTob(e.target.value)}
                    className="w-full py-2 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[13px]" />
                </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.dob}</label>
                <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-blue-400 transition-all">
                  <input required type="date" value={groomDob} onChange={e => setGroomDob(e.target.value)}
                    className="w-full py-2 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[13px]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.tob}</label>
                <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-blue-400 transition-all">
                  <input required type="time" value={groomTob} onChange={e => setGroomTob(e.target.value)}
                    className="w-full py-2 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[13px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="group px-10 py-4 bg-[#B78E28] hover:bg-[#E5D6C8] text-[#121212] rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />{t.matching}</>
              ) : (
                <><Heart className="w-4 h-4 text-pink-700" />{t.match}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
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
              {/* Overlay Zodiac Wheel (Love Synastry Superimposition) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 360° Synastry Superimposition SVG */}
                <div className="lg:col-span-2 bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-6 flex flex-col items-center justify-center">
                  <h3 className="text-xs uppercase tracking-widest text-[#B78E28] font-bold mb-6 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {t.synastryWheel}
                  </h3>
                  
                  <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                    <svg className="w-full h-full" viewBox="0 0 400 400">
                      {/* Bounding Outer Circle */}
                      <circle cx="200" cy="200" r="180" stroke="#7D756B" strokeWidth="1" fill="none" opacity="0.3" />
                      <circle cx="200" cy="200" r="140" stroke="#7D756B" strokeWidth="1" fill="none" opacity="0.3" />
                      <circle cx="200" cy="200" r="100" stroke="#7D756B" strokeWidth="1" fill="none" opacity="0.3" />
                      
                      {/* Zodiac division lines */}
                      {Array.from({ length: 12 }).map((_, idx) => {
                        const angle = idx * 30 * (Math.PI / 180);
                        const x1 = 200 + Math.cos(angle) * 100;
                        const y1 = 200 + Math.sin(angle) * 100;
                        const x2 = 200 + Math.cos(angle) * 180;
                        const y2 = 200 + Math.sin(angle) * 180;
                        return (
                          <line
                            key={idx}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#7D756B"
                            strokeWidth="0.5"
                            opacity="0.2"
                          />
                        );
                      })}

                      {/* Zodiac Labels */}
                      {ZODIAC_SYMBOLS.map((sym, idx) => {
                        const angle = (idx * 30 + 15) * (Math.PI / 180);
                        const x = 200 + Math.cos(angle) * 160;
                        const y = 200 + Math.sin(angle) * 160;
                        return (
                          <text
                            key={idx}
                            x={x}
                            y={y + 5}
                            fill="#7D756B"
                            fontSize="10"
                            textAnchor="middle"
                            opacity="0.5"
                          >
                            {sym}
                          </text>
                        );
                      })}

                      {/* Draw Partner A Planets (Inner Ring) */}
                      {Object.entries(partnerADegrees).map(([planet, deg]) => {
                        const angle = deg * (Math.PI / 180);
                        const x = 200 + Math.cos(angle) * 120;
                        const y = 200 + Math.sin(angle) * 120;
                        return (
                          <g key={`A-${planet}`}>
                            <circle cx={x} cy={y} r="5" fill="#E91E63" />
                            <text x={x} y={y - 8} fill="#E91E63" fontSize="7" textAnchor="middle" fontWeight="bold">
                              {planet[0]}
                            </text>
                          </g>
                        );
                      })}

                      {/* Draw Partner B Planets (Outer Ring) */}
                      {Object.entries(partnerBDegrees).map(([planet, deg]) => {
                        const angle = deg * (Math.PI / 180);
                        const x = 200 + Math.cos(angle) * 150;
                        const y = 200 + Math.sin(angle) * 150;
                        return (
                          <g key={`B-${planet}`}>
                            <circle cx={x} cy={y} r="5" fill="#03A9F4" />
                            <text x={x} y={y + 12} fill="#03A9F4" fontSize="7" textAnchor="middle" fontWeight="bold">
                              {planet[0]}
                            </text>
                          </g>
                        );
                      })}

                      {/* Dynamic Golden Energy Bridges & Friction Lines */}
                      {energyBridges.map((br) => {
                        const a1 = br.deg1 * (Math.PI / 180);
                        const a2 = br.deg2 * (Math.PI / 180);
                        const x1 = 200 + Math.cos(a1) * 120;
                        const y1 = 200 + Math.sin(a1) * 120;
                        const x2 = 200 + Math.cos(a2) * 150;
                        const y2 = 200 + Math.sin(a2) * 150;

                        const isHovered = hoveredBridge === br.id;

                        return (
                          <g key={br.id} onMouseEnter={() => setHoveredBridge(br.id)} onMouseLeave={() => setHoveredBridge(null)}>
                            {/* Interactive broad hover hitbox line */}
                            <line
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="transparent"
                              strokeWidth="8"
                              className="cursor-pointer"
                            />
                            {/* Rendered bridge path */}
                            <path
                              d={`M ${x1} ${y1} Q 200 200 ${x2} ${y2}`}
                              fill="none"
                              stroke={br.type === 'trine' || br.type === 'conjunction' ? '#B78E28' : '#ef4444'}
                              strokeWidth={isHovered ? 2.5 : 1}
                              strokeDasharray={br.type === 'friction' ? '4,4' : undefined}
                              className="transition-all duration-300"
                              opacity={isHovered ? 0.95 : 0.4}
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  
                  <div className="flex gap-4 mt-4 text-[9px] uppercase tracking-widest text-[#7D756B]">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E91E63]" /> Partner A</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#03A9F4]" /> Partner B</span>
                    <span className="flex items-center gap-1.5"><span className="w-5 h-[1px] bg-[#B78E28]" /> Harmonious Bridge</span>
                    <span className="flex items-center gap-1.5"><span className="w-5 h-[1px] border-t border-dashed border-red-500" /> Friction Zone</span>
                  </div>
                </div>

                {/* Synastry Advice column */}
                <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-[#B78E28] font-bold mb-4">
                      {t.synastryAdvice}
                    </h3>
                    <p className="text-[9px] text-[#7D756B] uppercase tracking-widest leading-relaxed mb-6">
                      Hover over any colored bridge or friction line in the zodiac superimposed chart to read actionable modern relationship advice.
                    </p>

                    <div className="space-y-4">
                      {energyBridges.map((br) => {
                        const isHovered = hoveredBridge === br.id;
                        return (
                          <div
                            key={br.id}
                            onMouseEnter={() => setHoveredBridge(br.id)}
                            onMouseLeave={() => setHoveredBridge(null)}
                            className={`p-4 rounded-2xl border transition-all ${
                              isHovered
                                ? 'bg-[#1A1A1A] border-[#B78E28]/50 scale-[1.02]'
                                : 'bg-[#1A1A1A]/30 border-[#7D756B]/15'
                            }`}
                          >
                            <h4
                              className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${
                                br.type === 'friction' ? 'text-red-400' : 'text-[#B78E28]'
                              }`}
                            >
                              {br.label}
                            </h4>
                            <p className="text-[11px] leading-relaxed text-[#E5D6C8] font-light">
                              {language === 'hi' ? br.descHi : br.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#7D756B]/20">
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest">Calculated Alignment</p>
                    <p className="text-xs text-[#E5D6C8] mt-1">Both planetary grids superimposed seamlessly.</p>
                  </div>
                </div>
              </div>

              {/* Score Circle & Gun Milan Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-8 text-center flex flex-col justify-center">
                  <p className="text-[10px] text-[#7D756B] uppercase tracking-widest mb-6">{t.score}</p>
                  <div className="relative w-36 h-36 mx-auto mb-6">
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
                  <p className="text-xs text-[#E5D6C8] uppercase tracking-widest mt-4 leading-relaxed">
                    {language === 'hi' ? result.verdict.hi : result.verdict.en}
                  </p>
                </div>

                <div className="md:col-span-2 bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-6 lg:p-8">
                  <h3 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8] mb-6 flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#B78E28]" />
                    {t.gunas}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.categories.map((cat, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] text-[#E5D6C8] uppercase tracking-widest">{language === 'hi' ? cat.nameHi : cat.name}</span>
                          <span className="text-[9px] text-[#B78E28] font-mono">{cat.score}/{cat.max}</span>
                        </div>
                        <div className="w-full h-1 bg-[#7D756B]/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(cat.score / cat.max) * 100}%` }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                            className={`h-full rounded-full ${getBarColor(cat.score, cat.max)}`}
                          />
                        </div>
                        <p className="text-[7.5px] text-[#7D756B] uppercase tracking-widest mt-1">{cat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Signs Summary */}
              <div className="grid grid-cols-2 gap-4 bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] p-6 text-center">
                <div className="border-r border-[#7D756B]/20">
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
