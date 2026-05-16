'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, Calendar, Star, Bell, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FESTIVALS_2026, EKADASHI_2026 } from '../data/festivals';
import { motion } from 'framer-motion';

const dict = {
  en: { back:'BACK', badge:'VEDIC CALENDAR', title:'Festivals & Vrat', subtitle:'IMPORTANT HINDU FESTIVALS AND FASTING DAYS FOR 2026',
    festivals:'Major Festivals', ekadashi:'Ekadashi Dates', notify:'Get notified for upcoming Muhurats & Festivals?', ctaBtn:'JOIN WHATSAPP GROUP' },
  hi: { back:'वापस', badge:'वैदिक कैलेंडर', title:'त्योहार और व्रत', subtitle:'2026 के महत्वपूर्ण हिंदू त्योहार और उपवास के दिन',
    festivals:'प्रमुख त्योहार', ekadashi:'एकादशी तिथियां', notify:'आगामी मुहूर्त और त्योहारों के लिए सूचनाएं प्राप्त करें?', ctaBtn:'व्हाट्सएप ग्रुप से जुड़ें' },
};

export default function FestivalsPage() {
  const { language } = useLanguage();
  const t = dict[language];

  // Group ekadashis by month
  const eMonths: Record<string, typeof EKADASHI_2026> = {};
  EKADASHI_2026.forEach(e => {
    const month = new Date(e.date).toLocaleString('en-US', { month: 'long' });
    if (!eMonths[month]) eMonths[month] = [];
    eMonths[month].push(e);
  });

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#2A1515] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1000px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all"><ArrowLeft className="w-3.5 h-3.5" /></div>{t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]"><Calendar className="w-3.5 h-3.5" />{t.badge}</div>
        </div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#B78E28]/10 border border-[#B78E28]/30 px-4 py-2 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 text-[#B78E28]" /><span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#B78E28]">2026 CALENDAR</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.title}</h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Festivals */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-serif uppercase tracking-widest text-[#B78E28] mb-6 flex items-center gap-2"><Sparkles className="w-4 h-4"/>{t.festivals}</h2>
            {FESTIVALS_2026.map((f, i) => (
              <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
                className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-2xl p-5 flex items-center gap-5 hover:border-orange-500/30 transition-all group">
                <div className="w-16 h-16 rounded-xl bg-orange-900/20 border border-orange-500/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">{f.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-[#B78E28] uppercase tracking-widest mb-1 font-bold">
                    {new Date(f.date).toLocaleDateString(language==='hi'?'hi-IN':'en-US',{month:'short',day:'numeric',weekday:'long'})}
                  </p>
                  <h3 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8] mb-1">{language==='hi'?f.name.hi:f.name.en}</h3>
                  <p className="text-[10px] text-[#7D756B] uppercase tracking-widest leading-relaxed line-clamp-2">{language==='hi'?f.desc.hi:f.desc.en}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ekadashi Sidebar */}
          <div className="space-y-6">
            <h2 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8] mb-6 flex items-center gap-2"><Moon className="w-4 h-4"/>{t.ekadashi}</h2>
            <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-2xl p-6 sticky top-24">
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(eMonths).map(([month, dates], i) => (
                  <div key={i}>
                    <p className="text-[10px] text-[#B78E28] uppercase tracking-widest mb-3 border-b border-[#7D756B]/20 pb-2">{month}</p>
                    <ul className="space-y-3">
                      {dates.map((e, j) => (
                        <li key={j} className="flex items-center justify-between group">
                          <span className="text-[10px] text-[#E5D6C8] uppercase tracking-widest">{e.name}</span>
                          <span className="text-[9px] text-[#7D756B] font-mono group-hover:text-[#B78E28] transition-colors">{new Date(e.date).toLocaleDateString('en-US',{day:'2-digit',month:'short'})}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="bg-[#B78E28]/10 border border-[#B78E28]/30 rounded-[2rem] p-8 text-center mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-[#B78E28]/20 rounded-full flex items-center justify-center shrink-0"><Bell className="w-5 h-5 text-[#B78E28]" /></div>
            <div>
              <h3 className="text-sm font-serif text-[#E5D6C8] uppercase tracking-widest">{t.notify}</h3>
              <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mt-1">Get free alerts on WhatsApp</p>
            </div>
          </div>
          <a href="https://wa.me/919876543210?text=I%20want%20festival%20updates" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-[#128C7E] transition-all whitespace-nowrap">
            {t.ctaBtn}
          </a>
        </motion.div>
      </div>
    </main>
  );
}
