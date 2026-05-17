'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, User, Calendar, Loader2, Star, Globe, MapPin, Compass, Heart, Briefcase, TrendingUp, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateAstroMap, type CartographyLine } from './actions';
import LocationSearch from '../components/Form/LocationSearch';
import { LocationData } from '@/lib/services/geocoding';
import { motion, AnimatePresence } from 'framer-motion';
import WorldMapSVG from '../components/Map/WorldMapSVG';

const dict = {
  en: {
    back: 'BACK',
    badge: 'ASTRO-CARTOGRAPHY',
    title: 'Your Power Map',
    subtitle: 'DISCOVER WHERE ON EARTH YOUR PLANETS ALIGN FOR MAXIMUM CAREER, LOVE, HEALTH & WEALTH',
    name: 'FULL NAME',
    dob: 'DATE OF BIRTH',
    tob: 'TIME OF BIRTH',
    calculate: 'PLOT MY ASTRO-MAP',
    calculating: 'PLOTTING CELESTIAL COORDINATES...',
    energy: 'Planetary Line Energy',
    regions: 'Auspicious Relocation Regions',
    cities: 'Best Cities for Relocation',
    vibe: 'Vedic Impact',
    mapTitle: 'INTERACTIVE ASTRO-MAP',
    mapSubtitle: 'Hover over planetary lines to explore influence zones. Golden dots mark power cities.',
    career: 'Career',
    love: 'Love',
    health: 'Health',
    wealth: 'Wealth',
    cta: 'Want a complete relocation roadmap with coordinate analysis?',
    ctaBtn: 'ORDER GLOBAL ROADMAP — ₹199',
    descText: 'Astro-cartography projects planetary angular positions over the globe. Traveling or living on your Jupiter or Sun lines unlocks high luck, career prosperity, and supreme health.',
  },
  hi: {
    back: 'वापस',
    badge: 'एस्ट्रो-कार्टोग्राफी',
    title: 'आपका शक्ति मानचित्र',
    subtitle: 'पता लगाएं कि पृथ्वी पर आपके ग्रह अधिकतम करियर, प्रेम, स्वास्थ्य और धन के लिए कहां संरेखित हैं',
    name: 'पूरा नाम',
    dob: 'जन्म तिथि',
    tob: 'जन्म समय',
    calculate: 'मेरा एस्ट्रो-मैप प्लॉट करें',
    calculating: 'दिव्य निर्देशांक प्लॉट किए जा रहे हैं...',
    energy: 'ग्रहीय रेखा ऊर्जा',
    regions: 'शुभ स्थानांतरण क्षेत्र',
    cities: 'स्थानांतरण के लिए सर्वोत्तम शहर',
    vibe: 'वैदिक प्रभाव',
    mapTitle: 'इंटरैक्टिव एस्ट्रो-मैप',
    mapSubtitle: 'प्रभाव क्षेत्रों का पता लगाने के लिए ग्रहीय रेखाओं पर होवर करें। सुनहरे बिंदु शक्ति शहरों को चिह्नित करते हैं।',
    career: 'करियर',
    love: 'प्रेम',
    health: 'स्वास्थ्य',
    wealth: 'धन',
    cta: 'क्या आप निर्देशांक विश्लेषण के साथ संपूर्ण स्थानांतरण रोडमैप चाहते हैं?',
    ctaBtn: 'वैश्विक रोडमैप ऑर्डर करें — ₹199',
    descText: 'एस्ट्रो-कार्टोग्राफी दुनिया भर में ग्रहों की कोणीय स्थितियों को दर्शाती है। अपने गुरु या सूर्य रेखाओं पर यात्रा करना या रहना उच्च भाग्य, करियर समृद्धि और सर्वोच्च स्वास्थ्य को सक्रिय करता है।',
  },
};

const LINE_COLORS: Record<string, string> = {
  Success: 'from-amber-500/10 to-orange-500/20 border-amber-500/30 text-amber-400',
  Wealth: 'from-yellow-500/10 to-emerald-500/20 border-yellow-500/30 text-yellow-400',
  Love: 'from-pink-500/10 to-rose-500/20 border-pink-500/30 text-pink-400',
  Intellect: 'from-cyan-500/10 to-blue-500/20 border-cyan-500/30 text-cyan-400',
  Discipline: 'from-zinc-500/10 to-slate-700/20 border-zinc-500/30 text-zinc-400',
};

const ENERGY_ICONS: Record<string, React.ReactNode> = {
  Success: <Briefcase className="w-4 h-4" />,
  Wealth: <TrendingUp className="w-4 h-4" />,
  Love: <Heart className="w-4 h-4" />,
  Intellect: <Compass className="w-4 h-4" />,
  Discipline: <Activity className="w-4 h-4" />,
};

// Convert server action results to map-compatible format
function linesToMapData(lines: CartographyLine[]) {
  const PLANET_MAP_DATA: Record<string, { color: string; glowColor: string; mcLon: number; icLon: number; ascLat: number; cities: { name: string; lon: number; lat: number; rating: { career: number; love: number; health: number; wealth: number } }[] }> = {
    Sun: {
      color: '#FF6B35', glowColor: '#FF6B35',
      mcLon: -5, icLon: 175, ascLat: 45,
      cities: [
        { name: 'London', lon: -0.12, lat: 51.5, rating: { career: 5, love: 3, health: 4, wealth: 4 } },
        { name: 'Paris', lon: 2.35, lat: 48.9, rating: { career: 4, love: 5, health: 4, wealth: 3 } },
        { name: 'New York', lon: -74, lat: 40.7, rating: { career: 5, love: 3, health: 3, wealth: 5 } },
        { name: 'Toronto', lon: -79.4, lat: 43.7, rating: { career: 4, love: 3, health: 4, wealth: 4 } },
      ],
    },
    Jupiter: {
      color: '#F39C12', glowColor: '#F39C12',
      mcLon: 105, icLon: -75, ascLat: 20,
      cities: [
        { name: 'Singapore', lon: 103.8, lat: 1.35, rating: { career: 4, love: 3, health: 4, wealth: 5 } },
        { name: 'Bali', lon: 115.2, lat: -8.65, rating: { career: 3, love: 5, health: 5, wealth: 3 } },
        { name: 'Los Angeles', lon: -118.2, lat: 34.1, rating: { career: 5, love: 4, health: 3, wealth: 5 } },
        { name: 'San Francisco', lon: -122.4, lat: 37.8, rating: { career: 5, love: 3, health: 4, wealth: 5 } },
      ],
    },
    Venus: {
      color: '#E91E63', glowColor: '#E91E63',
      mcLon: 15, icLon: -165, ascLat: 35,
      cities: [
        { name: 'Rome', lon: 12.5, lat: 41.9, rating: { career: 3, love: 5, health: 4, wealth: 3 } },
        { name: 'Barcelona', lon: 2.17, lat: 41.4, rating: { career: 3, love: 5, health: 5, wealth: 3 } },
        { name: 'Tokyo', lon: 139.7, lat: 35.7, rating: { career: 4, love: 4, health: 4, wealth: 4 } },
        { name: 'Kyoto', lon: 135.8, lat: 35.0, rating: { career: 2, love: 5, health: 5, wealth: 2 } },
      ],
    },
    Mercury: {
      color: '#2ECC71', glowColor: '#2ECC71',
      mcLon: 78, icLon: -102, ascLat: 15,
      cities: [
        { name: 'Bangalore', lon: 77.6, lat: 13.0, rating: { career: 5, love: 2, health: 3, wealth: 4 } },
        { name: 'Singapore', lon: 103.8, lat: 1.35, rating: { career: 5, love: 3, health: 4, wealth: 5 } },
        { name: 'Berlin', lon: 13.4, lat: 52.5, rating: { career: 4, love: 3, health: 4, wealth: 4 } },
        { name: 'Munich', lon: 11.6, lat: 48.1, rating: { career: 4, love: 3, health: 5, wealth: 4 } },
      ],
    },
    Saturn: {
      color: '#607D8B', glowColor: '#607D8B',
      mcLon: 18, icLon: -162, ascLat: 58,
      cities: [
        { name: 'Stockholm', lon: 18.1, lat: 59.3, rating: { career: 4, love: 2, health: 3, wealth: 3 } },
        { name: 'Oslo', lon: 10.75, lat: 59.9, rating: { career: 4, love: 2, health: 4, wealth: 3 } },
        { name: 'Sydney', lon: 151.2, lat: -33.9, rating: { career: 4, love: 3, health: 4, wealth: 4 } },
        { name: 'Melbourne', lon: 144.96, lat: -37.8, rating: { career: 3, love: 3, health: 4, wealth: 3 } },
      ],
    },
  };

  return lines.map((line) => {
    const data = PLANET_MAP_DATA[line.planet];
    if (!data) return null;
    return {
      planet: line.planet,
      color: data.color,
      glowColor: data.glowColor,
      energy: line.energy,
      mcLongitude: data.mcLon,
      icLongitude: data.icLon,
      ascLatitude: data.ascLat,
      cities: data.cities,
    };
  }).filter(Boolean) as any[];
}

export default function AstroMapPage() {
  const { language } = useLanguage();
  const t = dict[language];

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lines, setLines] = useState<CartographyLine[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return alert(language === 'hi' ? 'कृपया एक स्थान चुनें' : 'Please select a location');
    setLoading(true);
    setError(null);
    setLines(null);

    const result = await calculateAstroMap(
      dob,
      tob,
      location.lat,
      location.lon,
      location.timezone
    );

    if (result.success && result.lines) {
      setLines(result.lines);
    } else {
      setError(result.error || 'Failed to plot AstroMap');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#151c20] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-950/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1100px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Nav Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]">
            <Globe className="w-3.5 h-3.5" />
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
          <div className="inline-flex items-center gap-2 bg-[#B78E28]/10 border border-[#B78E28]/30 px-4 py-2 rounded-full mb-6">
            <Globe className="w-3.5 h-3.5 text-[#B78E28]" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#B78E28]">LOCATIONAL ASTROLOGY</span>
          </div>
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
              <><Globe className="w-4 h-4 text-[#B78E28]" />{t.calculate}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </motion.form>

        {error && (
          <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-2xl text-center text-red-400 text-xs mb-8">
            {error}
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {lines && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Interactive Map */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-serif text-[#E5D6C8] uppercase tracking-[0.15em]">{t.mapTitle}</h2>
                  <span className="text-[8px] text-[#7D756B] uppercase tracking-[0.15em]">{t.mapSubtitle}</span>
                </div>
                <WorldMapSVG lines={linesToMapData(lines)} language={language} />
              </div>

              {/* Informative Tip */}
              <div className="p-6 bg-[#161616]/40 border border-[#7D756B]/20 rounded-3xl flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7D756B] leading-relaxed">
                  {t.descText}
                </p>
              </div>

              {/* Lines Grid */}
              <div className="space-y-6">
                {lines.map((line, index) => {
                  const gradientClass = LINE_COLORS[line.energy] || LINE_COLORS.Success;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className={`bg-gradient-to-br ${gradientClass} border rounded-[2rem] p-8 hover:border-[#B78E28]/40 transition-all`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#7D756B]/15 pb-6 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#1A1A1A]/60 border border-[#7D756B]/20 flex items-center justify-center">
                            {ENERGY_ICONS[line.energy] || <Globe className="w-4 h-4" />}
                          </div>
                          <div>
                            <h2 className="text-xl font-serif text-[#E5D6C8] uppercase tracking-wider font-light">
                              {line.planet} Celestial Line
                            </h2>
                          </div>
                        </div>

                        <span className="px-4 py-1.5 rounded-full text-[8px] uppercase tracking-widest font-black bg-[#B78E28]/10 border border-[#B78E28]/30 text-[#B78E28]">
                          {t.energy}: {line.energy}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-[9px] uppercase tracking-widest text-[#B78E28] mb-3 font-bold">
                            {t.regions}
                          </h4>
                          <ul className="space-y-2">
                            {line.regions.map((reg, rIdx) => (
                              <li key={rIdx} className="flex items-center gap-2 text-[11px] text-[#7D756B] font-light">
                                <MapPin className="w-3.5 h-3.5 text-[#B78E28] shrink-0" />
                                {language === 'hi' ? reg.hi : reg.en}
                              </li>
                            ))}
                          </ul>

                          <h4 className="text-[9px] uppercase tracking-widest text-[#B78E28] mt-6 mb-3 font-bold">
                            {t.cities}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {line.cities.map((city, cIdx) => (
                              <span key={cIdx} className="px-3 py-1 bg-[#1A1A1A]/60 border border-[#7D756B]/20 rounded-full text-[9px] uppercase tracking-widest text-[#E5D6C8]">
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-[#1A1A1A]/40 border border-[#7D756B]/25 rounded-2xl flex gap-4 items-center">
                          <div>
                            <h4 className="text-[9px] uppercase tracking-widest text-[#B78E28] mb-2 font-bold">
                              {t.vibe}
                            </h4>
                            <p className="text-[11px] leading-relaxed text-[#E5D6C8]/80 font-light">
                              {language === 'hi' ? line.vibe.hi : line.vibe.en}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Consultation CTA */}
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
