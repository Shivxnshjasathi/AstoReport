'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, ChevronDown, ChevronUp, Gem, Gift, Play, Pause, RefreshCw, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MANTRAS, PROBLEM_CATEGORIES, type MantraData } from '../data/mantras';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'SOUND SANCTUARY',
    title: 'Mantra & Sound Sanctuary',
    subtitle: 'IMMERSIVE MEDITATION PLAYER, BEEJ MANTRAS & CELESTIAL FREQUENCY GENERATOR',
    selectWeak: 'Select Weak/Combust Planet for Recommendation',
    detectBtn: 'Analyze Birth Chart Weakness',
    breathInhale: 'Inhale...',
    breathHold: 'Hold...',
    breathExhale: 'Exhale...',
    chant: 'Chant',
    times: 'times',
    beej: 'Beej Mantra',
    day: 'Auspicious Day',
    gem: 'Gemstone',
    donate: 'Donations',
    remedies: 'Remedies',
    effects: 'Effects',
    playFreq: 'Play Celestial Tone',
    stopFreq: 'Mute Tone',
    cta: 'Get personalized remedies based on your birth chart',
    ctaBtn: 'GET REMEDIES REPORT',
  },
  hi: {
    back: 'वापस',
    badge: 'ध्वनि गर्भगृह',
    title: 'मंत्र और ध्वनि गर्भगृह',
    subtitle: 'इमर्सिव ध्यान प्लेयर, बीज मंत्र और दिव्य आवृत्ति जनरेटर',
    selectWeak: 'अनुशंसा के लिए कमजोर/अस्त ग्रह चुनें',
    detectBtn: 'जन्म कुंडली की कमजोरी का विश्लेषण करें',
    breathInhale: 'सांस लें...',
    breathHold: 'रोकें...',
    breathExhale: 'सांस छोड़ें...',
    chant: 'जप करें',
    times: 'बार',
    beej: 'बीज मंत्र',
    day: 'शुभ दिन',
    gem: 'रत्न',
    donate: 'दान',
    remedies: 'उपाय',
    effects: 'प्रभाव',
    playFreq: 'दिव्य टोन बजाएं',
    stopFreq: 'टोन म्यूट करें',
    cta: 'अपनी जन्म कुंडली के आधार पर व्यक्तिगत उपाय प्राप्त करें',
    ctaBtn: 'उपाय रिपोर्ट प्राप्त करें',
  },
};

// Resonant planetary frequencies (frequencies calculated based on orbital periods)
const PLANET_FREQS: Record<string, number> = {
  sun: 126.22, // Solar frequency
  moon: 210.42, // Synodic moon frequency
  mars: 144.72, // Mars frequency
  mercury: 141.27, // Mercury frequency
  jupiter: 183.58, // Jupiter frequency
  venus: 221.23, // Venus frequency
  saturn: 147.85, // Saturn frequency
  rahu: 228.0,
  ketu: 172.0,
};

export default function MantrasPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  
  // Weak planet recommendation engine state
  const [weakPlanet, setWeakPlanet] = useState<string>('sun');
  const [breathState, setBreathState] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentTonePlanet, setCurrentTonePlanet] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const filtered = filter === 'all' ? MANTRAS : MANTRAS.filter(m => {
    const cat = PROBLEM_CATEGORIES.find(c => c.id === filter);
    return cat?.planets.includes(m.id);
  });

  const recommendedMantra = MANTRAS.find(m => m.id === weakPlanet) || MANTRAS[0];

  // Breath pacer timing loop
  useEffect(() => {
    const intervals = { inhale: 4000, hold: 4000, exhale: 4000 };
    let timer: NodeJS.Timeout;

    const runPacer = () => {
      setBreathState(prev => {
        if (prev === 'inhale') {
          timer = setTimeout(runPacer, intervals.hold);
          return 'hold';
        } else if (prev === 'hold') {
          timer = setTimeout(runPacer, intervals.exhale);
          return 'exhale';
        } else {
          timer = setTimeout(runPacer, intervals.inhale);
          return 'inhale';
        }
      });
    };

    timer = setTimeout(runPacer, intervals.inhale);
    return () => clearTimeout(timer);
  }, [breathState]);

  // Audio synthesizer player using Web Audio API
  const playPlanetFrequency = (planetId: string) => {
    try {
      if (isPlayingAudio && currentTonePlanet === planetId) {
        stopPlanetFrequency();
        return;
      }

      if (isPlayingAudio) {
        stopPlanetFrequency();
      }

      // Initialize Audio Context
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = PLANET_FREQS[planetId] || 136.1; // default Ohm sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Lowpass filter for warm, relaxing, rich drone sound
      const filterNode = ctx.createBiquadFilter();
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(400, ctx.currentTime);

      // Soft volume ramping to avoid clicks
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1.5); // 1.5s fade-in

      osc.connect(filterNode);
      filterNode.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlayingAudio(true);
      setCurrentTonePlanet(planetId);
    } catch (e) {
      console.error('Audio initialization failed:', e);
    }
  };

  const stopPlanetFrequency = () => {
    const ctx = audioCtxRef.current;
    const osc = oscRef.current;
    const gain = gainRef.current;

    if (ctx && osc && gain) {
      // Fade out audio gracefully over 0.5s
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      
      setTimeout(() => {
        try {
          osc.stop();
          osc.disconnect();
          ctx.close();
        } catch (e) {}
      }, 600);
    }

    oscRef.current = null;
    gainRef.current = null;
    audioCtxRef.current = null;
    setIsPlayingAudio(false);
    setCurrentTonePlanet(null);
  };

  useEffect(() => {
    return () => {
      // Clean up sound on unmount
      if (audioCtxRef.current) {
        stopPlanetFrequency();
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1A141A] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-950/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1100px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Navigation back header */}
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

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light leading-tight">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 🧘 Sound Sanctuary & Meditation Player (Immersive Pacer Section) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recommendation & Controls */}
          <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#B78E28] font-bold mb-4">
                {t.selectWeak}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {MANTRAS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setWeakPlanet(m.id);
                      if (isPlayingAudio) stopPlanetFrequency();
                    }}
                    className={`px-3 py-2 rounded-xl text-[9px] uppercase tracking-widest font-bold border transition-all ${
                      weakPlanet === m.id
                        ? 'bg-[#B78E28]/20 border-[#B78E28] text-[#B78E28]'
                        : 'bg-[#1A1A1A]/40 border-[#7D756B]/20 text-[#7D756B] hover:text-[#E5D6C8]'
                    }`}
                  >
                    {language === 'hi' ? m.planet.hi : m.planet.en.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-[#7D756B] uppercase tracking-widest">Recommended Beej Mantra</span>
                <span className="text-[12px]">{recommendedMantra.symbol}</span>
              </div>
              <p className="text-xl font-serif text-[#B78E28] tracking-wider">
                {recommendedMantra.beejMantra}
              </p>
              <p className="text-[10px] text-[#E5D6C8]/80 leading-relaxed">
                {recommendedMantra.mantra.sanskrit}
              </p>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => playPlanetFrequency(recommendedMantra.id)}
                  className={`flex-1 py-3 rounded-full text-[9px] uppercase tracking-widest font-bold border flex items-center justify-center gap-2 transition-all ${
                    isPlayingAudio && currentTonePlanet === recommendedMantra.id
                      ? 'bg-red-500/20 border-red-500/50 text-red-400'
                      : 'bg-[#B78E28] border-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] hover:border-[#E5D6C8]'
                  }`}
                >
                  {isPlayingAudio && currentTonePlanet === recommendedMantra.id ? (
                    <><VolumeX className="w-3.5 h-3.5 animate-pulse" /> {t.stopFreq}</>
                  ) : (
                    <><Volume2 className="w-3.5 h-3.5" /> {t.playFreq}</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Immersive Breathing Pacer */}
          <div className="lg:col-span-2 bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-transparent pointer-events-none" />
            
            {/* Visual Pulsing Breath circles */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-6">
              <motion.div
                animate={{
                  scale: breathState === 'inhale' ? 1.6 : breathState === 'hold' ? 1.6 : 0.9,
                  opacity: breathState === 'inhale' ? 0.35 : breathState === 'hold' ? 0.45 : 0.15,
                }}
                transition={{ duration: 4, ease: 'easeInOut' }}
                className="absolute w-40 h-40 rounded-full border border-[#B78E28]/40"
                style={{ backgroundColor: `${recommendedMantra.color}15` }}
              />
              <motion.div
                animate={{
                  scale: breathState === 'inhale' ? 1.25 : breathState === 'hold' ? 1.25 : 0.95,
                  opacity: breathState === 'inhale' ? 0.5 : breathState === 'hold' ? 0.6 : 0.25,
                }}
                transition={{ duration: 4, ease: 'easeInOut' }}
                className="absolute w-28 h-28 rounded-full border-2"
                style={{ borderColor: recommendedMantra.color, boxShadow: `0 0 25px ${recommendedMantra.color}30` }}
              />
              
              <div className="relative z-10 text-center">
                <p className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8] font-bold">
                  {breathState === 'inhale' && t.breathInhale}
                  {breathState === 'hold' && t.breathHold}
                  {breathState === 'exhale' && t.breathExhale}
                </p>
                <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mt-2">
                  Synchronize with Circle
                </p>
              </div>
            </div>

            <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] text-center max-w-md leading-relaxed px-4">
              Focus your gaze on the golden core. Play the resonant planetary tone above to align your bio-frequencies with {recommendedMantra.planet.en}'s cosmic flow.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {PROBLEM_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setFilter(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-[9px] uppercase tracking-widest transition-all border ${filter === cat.id ? 'bg-[#B78E28] text-[#121212] border-[#B78E28]' : 'bg-transparent text-[#7D756B] border-[#7D756B]/30 hover:border-[#B78E28]'}`}>
              {language === 'hi' ? cat.hi : cat.en}
            </button>
          ))}
        </div>

        {/* Planet Cards */}
        <div className="space-y-4">
          {filtered.map((m, i) => (
            <motion.div key={m.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
              className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[1.5rem] overflow-hidden hover:border-[#B78E28]/30 transition-all">
              <button onClick={() => setExpanded(expanded === m.id ? null : m.id)} className="w-full p-5 flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0" style={{backgroundColor:m.color+'20',border:`1px solid ${m.color}40`}}>
                  {m.symbol}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8]">{language==='hi'?m.planet.hi:m.planet.en}</h3>
                  <p className="text-[9px] text-[#B78E28] uppercase tracking-widest mt-1 truncate">{m.mantra.sanskrit}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {/* Miniature audio button next to each planet */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playPlanetFrequency(m.id);
                    }}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                      isPlayingAudio && currentTonePlanet === m.id
                        ? 'bg-red-500/20 border-red-500/50 text-red-400'
                        : 'bg-[#1A1A1A] border-[#7D756B]/30 text-[#7D756B] hover:text-[#E5D6C8]'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-[#7D756B]">{expanded===m.id?<ChevronUp className="w-5 h-5"/>:<ChevronDown className="w-5 h-5"/>}</div>
                </div>
              </button>

              <AnimatePresence>
                {expanded === m.id && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}}
                    className="overflow-hidden">
                    <div className="px-5 pb-6 space-y-5 border-t border-[#7D756B]/20 pt-5">
                      {/* Mantra */}
                      <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-xl p-4">
                        <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2">{t.beej}</p>
                        <p className="text-2xl font-serif text-[#B78E28] mb-2">{m.beejMantra}</p>
                        <p className="text-xs text-[#E5D6C8] leading-relaxed">{language==='hi'?m.mantra.hi:m.mantra.en}</p>
                        <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mt-3">{t.chant} {m.chantCount.toLocaleString()} {t.times}</p>
                      </div>
                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#1A1A1A]/30 border border-[#7D756B]/20 rounded-xl p-3">
                          <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.day}</p>
                          <p className="text-sm font-serif text-[#E5D6C8]">{language==='hi'?m.day.hi:m.day.en}</p>
                        </div>
                        <div className="bg-[#1A1A1A]/30 border border-[#7D756B]/20 rounded-xl p-3">
                          <Gem className="w-3.5 h-3.5 text-[#B78E28] mb-1" />
                          <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.gem}</p>
                          <p className="text-sm font-serif text-[#E5D6C8]">{language==='hi'?m.gemstone.hi:m.gemstone.en}</p>
                        </div>
                      </div>
                      {/* Donations */}
                      <div><p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2 flex items-center gap-2"><Gift className="w-3 h-3" />{t.donate}</p>
                        <div className="flex flex-wrap gap-2">{(language==='hi'?m.donations.hi:m.donations.en).map((d,j)=>(<span key={j} className="text-[9px] bg-[#B78E28]/10 text-[#B78E28] px-3 py-1 rounded-full border border-[#B78E28]/20">{d}</span>))}</div>
                      </div>
                      {/* Remedies */}
                      <div><p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-2">{t.remedies}</p>
                        <ul className="space-y-2">{(language==='hi'?m.remedies.hi:m.remedies.en).map((r,j)=>(<li key={j} className="text-[10px] text-[#E5D6C8] flex items-start gap-2"><span className="text-[#B78E28] mt-0.5 shrink-0">•</span>{r}</li>))}</ul>
                      </div>
                      {/* Effects */}
                      <div className="bg-[#B78E28]/5 border border-[#B78E28]/20 rounded-xl p-4">
                        <p className="text-[8px] text-[#B78E28] uppercase tracking-widest mb-2">{t.effects}</p>
                        <p className="text-xs text-[#E5D6C8] leading-relaxed">{language==='hi'?m.effects.hi:m.effects.en}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-8 text-center mt-12">
          <Sparkles className="w-8 h-8 text-[#B78E28] mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
          <Link href="/store" className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
            {t.ctaBtn}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
