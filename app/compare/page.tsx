'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Scale, ArrowRight, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateMoonSign, type MoonSignResult } from '@/lib/astro/moonSign';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: { back:'BACK', badge:'CHART COMPARISON', title:'Birth Chart Sync', subtitle:'COMPARE TWO CHARTS TO SEE ASTROLOGICAL ALIGNMENT AND SYNASTRY',
    person1:'Person 1', person2:'Person 2', dob:'Date of Birth', tob:'Time of Birth', compare:'COMPARE CHARTS', calculating:'ANALYZING SYNASTRY...',
    results:'Astrological Sync', rashi:'Moon Sign (Rashi)', nakshatra:'Nakshatra', element:'Element', ruler:'Ruler',
    harmony:'Overall Harmony', cta:'Want a full Ashtakoot Gun Milan with detailed relationship analysis?', ctaBtn:'GET KUNDLI MATCH REPORT' },
  hi: { back:'वापस', badge:'चार्ट तुलना', title:'जन्म कुंडली सिंक', subtitle:'ज्योतिषीय संरेखण देखने के लिए दो कुंडलियों की तुलना करें',
    person1:'व्यक्ति 1', person2:'व्यक्ति 2', dob:'जन्म तिथि', tob:'जन्म का समय', compare:'चार्ट की तुलना करें', calculating:'विश्लेषण कर रहा है...',
    results:'ज्योतिषीय सिंक', rashi:'चंद्र राशि', nakshatra:'नक्षत्र', element:'तत्व', ruler:'स्वामी',
    harmony:'समग्र सद्भाव', cta:'क्या आप विस्तृत विश्लेषण के साथ पूर्ण अष्टकूट गुण मिलान चाहते हैं?', ctaBtn:'कुंडली मिलान रिपोर्ट प्राप्त करें' },
};

export default function ComparePage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [p1, setP1] = useState({ dob:'', tob:'' });
  const [p2, setP2] = useState({ dob:'', tob:'' });
  const [res, setRes] = useState<{r1:MoonSignResult, r2:MoonSignResult} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setRes(null);
    setTimeout(() => {
      try {
        const r1 = calculateMoonSign(p1.dob, p1.tob);
        const r2 = calculateMoonSign(p2.dob, p2.tob);
        setRes({r1, r2});
      } catch (err) {}
      setLoading(false);
    }, 1500);
  };

  const getHarmony = (r1: MoonSignResult, r2: MoonSignResult) => {
    // Simple mock logic for UI demonstration
    const e1 = r1.rashi.element; const e2 = r2.rashi.element;
    if (e1 === e2) return { score: 95, text: 'Excellent Sync', color: 'text-green-400' };
    if ((e1==='Fire'&&e2==='Air')||(e1==='Air'&&e2==='Fire')||(e1==='Earth'&&e2==='Water')||(e1==='Water'&&e2==='Earth')) return { score: 85, text: 'Great Harmony', color: 'text-emerald-400' };
    return { score: 65, text: 'Needs Effort', color: 'text-amber-400' };
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#2A1F1A] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1000px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all"><ArrowLeft className="w-3.5 h-3.5" /></div>{t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]"><Scale className="w-3.5 h-3.5" />{t.badge}</div>
        </div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.title}</h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">{t.subtitle}</p>
        </motion.div>

        <motion.form onSubmit={handleCompare} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-8 lg:p-12">
            {/* Person 1 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#7D756B]/20 pb-4"><div className="w-8 h-8 bg-rose-900/20 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-rose-400" /></div><h2 className="text-sm font-serif uppercase tracking-widest text-rose-400">{t.person1}</h2></div>
              <div><label className="text-[8px] text-[#7D756B] uppercase tracking-widest block mb-2">{t.dob}</label><input required type="date" value={p1.dob} onChange={e=>setP1({...p1,dob:e.target.value})} className="w-full bg-[#1A1A1A] border border-[#7D756B]/30 rounded-xl py-3 px-4 focus:outline-none focus:border-rose-400 text-[#E5D6C8] [color-scheme:dark]" /></div>
              <div><label className="text-[8px] text-[#7D756B] uppercase tracking-widest block mb-2">{t.tob}</label><input required type="time" value={p1.tob} onChange={e=>setP1({...p1,tob:e.target.value})} className="w-full bg-[#1A1A1A] border border-[#7D756B]/30 rounded-xl py-3 px-4 focus:outline-none focus:border-rose-400 text-[#E5D6C8] [color-scheme:dark]" /></div>
            </div>
            {/* Person 2 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#7D756B]/20 pb-4"><div className="w-8 h-8 bg-blue-900/20 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-blue-400" /></div><h2 className="text-sm font-serif uppercase tracking-widest text-blue-400">{t.person2}</h2></div>
              <div><label className="text-[8px] text-[#7D756B] uppercase tracking-widest block mb-2">{t.dob}</label><input required type="date" value={p2.dob} onChange={e=>setP2({...p2,dob:e.target.value})} className="w-full bg-[#1A1A1A] border border-[#7D756B]/30 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 text-[#E5D6C8] [color-scheme:dark]" /></div>
              <div><label className="text-[8px] text-[#7D756B] uppercase tracking-widest block mb-2">{t.tob}</label><input required type="time" value={p2.tob} onChange={e=>setP2({...p2,tob:e.target.value})} className="w-full bg-[#1A1A1A] border border-[#7D756B]/30 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 text-[#E5D6C8] [color-scheme:dark]" /></div>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full max-w-md mx-auto mt-8 py-5 bg-[#B78E28] text-[#121212] rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all flex items-center justify-center gap-3 disabled:opacity-50">
            {loading ? <><Sparkles className="w-4 h-4 animate-pulse" />{t.calculating}</> : <><Scale className="w-4 h-4" />{t.compare}</>}
          </button>
        </motion.form>

        <AnimatePresence>
          {res && !loading && (
            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-8">
              <div className="text-center mb-8"><h2 className="text-2xl font-serif text-[#E5D6C8] uppercase tracking-widest">{t.results}</h2></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[res.r1, res.r2].map((r, i) => (
                  <div key={i} className={`bg-[#1A1A1A]/50 border ${i===0?'border-rose-900/30':'border-blue-900/30'} rounded-[2rem] p-8 text-center relative overflow-hidden`}>
                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-20 ${i===0?'bg-rose-500':'bg-blue-500'}`} />
                    <p className={`text-[10px] uppercase tracking-widest mb-4 ${i===0?'text-rose-400':'text-blue-400'}`}>{i===0?t.person1:t.person2}</p>
                    <div className="text-6xl mb-4">{r.rashi.symbol}</div>
                    <h3 className="text-2xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-6">{language==='hi'?r.rashi.hi:r.rashi.en}</h3>
                    <div className="space-y-3 text-left border-t border-[#7D756B]/20 pt-6">
                      <div className="flex justify-between"><span className="text-[9px] text-[#7D756B] uppercase tracking-widest">{t.nakshatra}</span><span className="text-xs font-serif text-[#E5D6C8]">{language==='hi'?r.nakshatra.hi:r.nakshatra.en}</span></div>
                      <div className="flex justify-between"><span className="text-[9px] text-[#7D756B] uppercase tracking-widest">{t.element}</span><span className="text-xs font-serif text-[#E5D6C8]">{r.rashi.element}</span></div>
                      <div className="flex justify-between"><span className="text-[9px] text-[#7D756B] uppercase tracking-widest">{t.ruler}</span><span className="text-xs font-serif text-[#E5D6C8]">{language==='hi'?r.rashi.rulerHi:r.rashi.ruler}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#B78E28]/30 rounded-[2rem] p-8 text-center mt-8">
                <p className="text-[10px] text-[#7D756B] uppercase tracking-widest mb-4">{t.harmony}</p>
                <div className="text-5xl font-serif mb-2 text-[#E5D6C8]">{getHarmony(res.r1, res.r2).score}<span className="text-xl text-[#7D756B]">/100</span></div>
                <p className={`text-sm uppercase tracking-[0.2em] font-bold ${getHarmony(res.r1, res.r2).color}`}>{getHarmony(res.r1, res.r2).text}</p>
              </div>

              <div className="bg-[#B78E28]/5 border border-[#B78E28]/20 rounded-[2rem] p-8 text-center mt-8">
                <Sparkles className="w-6 h-6 text-[#B78E28] mx-auto mb-4" />
                <h3 className="text-sm font-serif text-[#E5D6C8] uppercase tracking-widest mb-6">{t.cta}</h3>
                <Link href="/store/10" className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
                  {t.ctaBtn}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
