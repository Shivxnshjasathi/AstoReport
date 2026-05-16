'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, ChevronDown, ChevronUp, Gem, Gift } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MANTRAS, PROBLEM_CATEGORIES } from '../data/mantras';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: { back:'BACK', badge:'NAVAGRAHA', title:'Mantra & Remedies', subtitle:'SACRED MANTRAS, GEMSTONES & VEDIC REMEDIES FOR ALL NINE PLANETS',
    chant:'Chant', times:'times', beej:'Beej Mantra', day:'Auspicious Day', gem:'Gemstone', donate:'Donations', remedies:'Remedies', effects:'Effects',
    cta:'Get personalized remedies based on your birth chart', ctaBtn:'GET REMEDIES REPORT' },
  hi: { back:'वापस', badge:'नवग्रह', title:'मंत्र और उपाय', subtitle:'सभी नौ ग्रहों के लिए पवित्र मंत्र, रत्न और वैदिक उपाय',
    chant:'जप करें', times:'बार', beej:'बीज मंत्र', day:'शुभ दिन', gem:'रत्न', donate:'दान', remedies:'उपाय', effects:'प्रभाव',
    cta:'अपनी जन्म कुंडली के आधार पर व्यक्तिगत उपाय प्राप्त करें', ctaBtn:'उपाय रिपोर्ट प्राप्त करें' },
};

export default function MantrasPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<string|null>(null);
  const filtered = filter === 'all' ? MANTRAS : MANTRAS.filter(m => {
    const cat = PROBLEM_CATEGORIES.find(c => c.id === filter);
    return cat?.planets.includes(m.id);
  });

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0"><div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#181418] to-[#121212]" /></div>
      <div className="max-w-[900px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all"><ArrowLeft className="w-3.5 h-3.5" /></div>{t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]"><Sparkles className="w-3.5 h-3.5" />{t.badge}</div>
        </div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.title}</h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">{t.subtitle}</p>
        </motion.div>

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
                <div className="text-[#7D756B] shrink-0">{expanded===m.id?<ChevronUp className="w-5 h-5"/>:<ChevronDown className="w-5 h-5"/>}</div>
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
