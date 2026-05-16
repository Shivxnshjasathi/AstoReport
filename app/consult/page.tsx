'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, PhoneCall, Star, Clock, CheckCircle, Video, MessageCircle, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ASTROLOGERS } from '../data/consultants';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: { back:'BACK', badge:'LIVE EXPERTS', title:'Consult Astrologers', subtitle:'CONNECT WITH VERIFIED VEDIC EXPERTS VIA CALL, VIDEO OR CHAT',
    filterAll:'All Experts', experience:'Years Exp.', lang:'Languages', offline:'Currently Offline', online:'Available Now',
    book:'BOOK CONSULTATION', mins:'/ min', type:'Select Mode', call:'Voice Call', video:'Video Call', chat:'Chat',
    confirm:'PROCEED TO PAYMENT' },
  hi: { back:'वापस', badge:'लाइव विशेषज्ञ', title:'ज्योतिषियों से परामर्श करें', subtitle:'कॉल, वीडियो या चैट के माध्यम से सत्यापित वैदिक विशेषज्ञों से जुड़ें',
    filterAll:'सभी विशेषज्ञ', experience:'वर्षों का अनुभव', lang:'भाषाएं', offline:'अभी ऑफ़लाइन', online:'अभी उपलब्ध',
    book:'परामर्श बुक करें', mins:'/ मिनट', type:'मोड चुनें', call:'वॉयस कॉल', video:'वीडियो कॉल', chat:'चैट',
    confirm:'भुगतान के लिए आगे बढ़ें' },
};

export default function ConsultPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [selectedAstro, setSelectedAstro] = useState<string | null>(null);
  const [mode, setMode] = useState<'call'|'video'|'chat'>('call');

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1A2421] to-[#121212]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1200px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all"><ArrowLeft className="w-3.5 h-3.5" /></div>{t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]"><PhoneCall className="w-3.5 h-3.5" />{t.badge}</div>
        </div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.title}</h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ASTROLOGERS.map((astro, i) => (
            <motion.div key={astro.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
              className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2rem] overflow-hidden hover:border-emerald-500/30 transition-all group flex flex-col h-full">
              
              <div className="relative h-48 w-full bg-[#1A1A1A]">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-[#B78E28]/10 pattern-dots" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10" />
                <div className="absolute top-4 right-4 z-20">
                  {astro.available ? (
                    <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-[8px] uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{t.online}
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-[8px] uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />{t.offline}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 relative z-20 -mt-12">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xl font-serif text-[#E5D6C8] uppercase tracking-widest">{language==='hi'?astro.name.hi:astro.name.en}</h3>
                  <div className="flex items-center gap-1 bg-[#1A1A1A]/80 border border-[#B78E28]/20 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-[#B78E28] fill-[#B78E28]" />
                    <span className="text-[10px] font-mono text-[#E5D6C8]">{astro.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(language==='hi'?astro.specialties.hi:astro.specialties.en).map((s, j) => (
                    <span key={j} className="text-[8px] uppercase tracking-widest text-[#B78E28] bg-[#B78E28]/10 px-2 py-1 rounded-full">{s}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div>
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.experience}</p>
                    <p className="text-xs font-serif text-[#E5D6C8]">{astro.experience} Yrs</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mb-1">{t.lang}</p>
                    <p className="text-[10px] text-[#E5D6C8] leading-tight">{astro.languages.join(', ')}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-[#7D756B]/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-[#7D756B] uppercase tracking-widest">Rate</span>
                    <span className="text-sm font-serif text-[#E5D6C8]">₹{astro.pricePerMin} <span className="text-[9px] text-[#7D756B] font-sans">{t.mins}</span></span>
                  </div>
                  
                  <button onClick={() => setSelectedAstro(astro.id)} disabled={!astro.available}
                    className="w-full py-3 bg-[#B78E28] hover:bg-[#E5D6C8] text-[#121212] rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all disabled:opacity-50 disabled:bg-[#333] disabled:text-[#7D756B]">
                    {t.book}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedAstro && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelectedAstro(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            <motion.div initial={{opacity:0, scale:0.95, y:20}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0, scale:0.95, y:20}}
              className="relative w-full max-w-md bg-[#121212] border border-[#B78E28]/30 rounded-[2rem] p-8 shadow-2xl z-10">
              
              <h2 className="text-xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-6 border-b border-[#7D756B]/20 pb-4">{t.type}</h2>
              
              <div className="grid grid-cols-3 gap-3 mb-8">
                <button onClick={()=>setMode('call')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${mode==='call'?'bg-[#B78E28]/10 border-[#B78E28] text-[#B78E28]':'border-[#7D756B]/30 text-[#7D756B] hover:border-[#E5D6C8]'}`}>
                  <PhoneCall className="w-5 h-5" />
                  <span className="text-[9px] uppercase tracking-widest">{t.call}</span>
                </button>
                <button onClick={()=>setMode('video')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${mode==='video'?'bg-[#B78E28]/10 border-[#B78E28] text-[#B78E28]':'border-[#7D756B]/30 text-[#7D756B] hover:border-[#E5D6C8]'}`}>
                  <Video className="w-5 h-5" />
                  <span className="text-[9px] uppercase tracking-widest">{t.video}</span>
                </button>
                <button onClick={()=>setMode('chat')} className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${mode==='chat'?'bg-[#B78E28]/10 border-[#B78E28] text-[#B78E28]':'border-[#7D756B]/30 text-[#7D756B] hover:border-[#E5D6C8]'}`}>
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-[9px] uppercase tracking-widest">{t.chat}</span>
                </button>
              </div>

              <div className="bg-[#1A1A1A] rounded-xl p-4 mb-8">
                <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mb-2">Duration</p>
                <select className="w-full bg-transparent border-b border-[#7D756B]/30 pb-2 focus:outline-none text-[#E5D6C8] text-sm">
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </div>

              <Link href="/checkout" onClick={() => setSelectedAstro(null)} className="w-full block text-center py-4 bg-[#B78E28] text-[#121212] rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
                {t.confirm}
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
