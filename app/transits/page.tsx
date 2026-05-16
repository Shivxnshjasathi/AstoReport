'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Orbit, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateTransits, type PlanetTransit } from '@/lib/astro/transits';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: { back:'BACK', badge:'LIVE TRANSITS', title:'Planetary Transits', subtitle:'CURRENT POSITION OF PLANETS IN THE ZODIAC AND THEIR GLOBAL EFFECTS',
    planet:'Planet', sign:'Current Sign', degree:'Degree', effect:'Transit Effect',
    cta:'How do these transits affect your personal birth chart?', ctaBtn:'GET TRANSIT REPORT' },
  hi: { back:'वापस', badge:'लाइव गोचर', title:'ग्रह गोचर', subtitle:'राशि चक्र में ग्रहों की वर्तमान स्थिति और उनके वैश्विक प्रभाव',
    planet:'ग्रह', sign:'वर्तमान राशि', degree:'अंश', effect:'गोचर प्रभाव',
    cta:'ये गोचर आपकी व्यक्तिगत जन्म कुंडली को कैसे प्रभावित करते हैं?', ctaBtn:'गोचर रिपोर्ट प्राप्त करें' },
};

export default function TransitsPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [transits, setTransits] = useState<PlanetTransit[]>([]);

  useEffect(() => {
    setTransits(calculateTransits(new Date()));
  }, []);

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#111A24] to-[#121212]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1000px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all"><ArrowLeft className="w-3.5 h-3.5" /></div>{t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]"><Orbit className="w-3.5 h-3.5" />{t.badge}</div>
        </div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#B78E28]/10 border border-[#B78E28]/30 px-4 py-2 rounded-full mb-6">
            <Clock className="w-3.5 h-3.5 text-[#B78E28]" /><span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#B78E28]">REAL-TIME POSITIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.title}</h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">{t.subtitle}</p>
        </motion.div>

        {transits.length === 0 ? (
           <div className="flex flex-col items-center gap-4 py-20"><Orbit className="w-8 h-8 text-[#B78E28] animate-spin-slow" /><p className="text-[10px] uppercase tracking-[0.2em] text-[#7D756B]">CALCULATING ORBITS...</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {transits.map((tr, i) => (
                <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
                  className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] p-6 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" style={{backgroundColor:tr.color}} />
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8] mb-1">{language==='hi'?tr.nameHi:tr.name}</h3>
                      <p className="text-[10px] text-[#7D756B] font-mono">{tr.degree}</p>
                    </div>
                    <div className="text-3xl" style={{color:tr.color}}>{tr.symbol}</div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-xl p-3 mb-4">
                    <span className="text-2xl">{tr.rashiSymbol}</span>
                    <div>
                      <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-0.5">{t.sign}</p>
                      <p className="text-xs font-serif text-[#E5D6C8] uppercase tracking-widest">{language==='hi'?tr.rashiHi:tr.rashi}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[8px] text-[#B78E28] uppercase tracking-widest mb-1.5">{t.effect}</p>
                    <p className="text-[10px] text-[#E5D6C8] leading-relaxed uppercase tracking-widest">{language==='hi'?tr.effect.hi:tr.effect.en}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}} className="bg-[#1A1A1A]/30 backdrop-blur-md border border-indigo-900/30 rounded-[2rem] p-8 text-center mt-12">
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
