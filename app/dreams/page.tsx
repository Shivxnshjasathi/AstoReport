'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Moon, Sparkles, ArrowRight, Search, Cloud } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DREAM_SYMBOLS, DREAM_CATEGORIES } from '../data/dreams';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: { back:'BACK', badge:'DREAM DICTIONARY', title:'Dream Interpretation', subtitle:'DECODE THE HIDDEN VEDIC MEANINGS OF YOUR DREAMS',
    search:'Search symbols (e.g. Snake, Water)...', empty:'No symbols found for your search.',
    cta:'Want to know how dreams relate to your current planetary Dasha?', ctaBtn:'GET KUNDLI REPORT' },
  hi: { back:'वापस', badge:'स्वप्न शब्दकोश', title:'स्वप्न फल विचार', subtitle:'अपने सपनों के छिपे वैदिक अर्थों को डिकोड करें',
    search:'प्रतीक खोजें (जैसे सांप, पानी)...', empty:'आपकी खोज के लिए कोई प्रतीक नहीं मिला।',
    cta:'जानना चाहते हैं कि सपने आपकी वर्तमान ग्रहों की दशा से कैसे संबंधित हैं?', ctaBtn:'कुंडली रिपोर्ट प्राप्त करें' },
};

export default function DreamsPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = DREAM_SYMBOLS.filter(s => {
    const matchesSearch = s.symbol.en.toLowerCase().includes(query.toLowerCase()) || s.symbol.hi.includes(query);
    const matchesCat = category === 'all' || s.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#111A24] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[900px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all"><ArrowLeft className="w-3.5 h-3.5" /></div>{t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]"><Cloud className="w-3.5 h-3.5" />{t.badge}</div>
        </div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.title}</h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">{t.subtitle}</p>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative flex items-center border border-[#7D756B]/30 rounded-full bg-[#1A1A1A]/50 focus-within:border-[#B78E28] transition-all overflow-hidden px-4">
            <Search className="text-[#7D756B] w-5 h-5 shrink-0" />
            <input type="text" placeholder={t.search} value={query} onChange={(e) => setQuery(e.target.value)}
              className="w-full py-4 px-4 bg-transparent focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] text-[16px] md:text-sm uppercase tracking-widest" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {DREAM_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-[9px] uppercase tracking-widest transition-all border ${category === cat.id ? 'bg-blue-900/40 text-blue-200 border-blue-500/50' : 'bg-transparent text-[#7D756B] border-[#7D756B]/30 hover:border-blue-500/30'}`}>
                {language === 'hi' ? cat.hi : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <AnimatePresence>
            {filtered.map((s, i) => (
              <motion.div key={s.id} layout initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.9}} transition={{duration:0.3}}
                className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[1.5rem] p-6 hover:border-blue-500/30 transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-900/20 border border-blue-500/20 flex items-center justify-center text-2xl shrink-0">{s.emoji}</div>
                <div>
                  <h3 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8] mb-2">{language==='hi'?s.symbol.hi:s.symbol.en}</h3>
                  <p className="text-[10px] text-[#7D756B] leading-relaxed uppercase tracking-widest">{language==='hi'?s.meaning.hi:s.meaning.en}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12"><Moon className="w-8 h-8 text-[#7D756B] mx-auto mb-4 opacity-50" /><p className="text-xs text-[#7D756B] uppercase tracking-widest">{t.empty}</p></div>
        )}

        {/* CTA */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-8 text-center mt-12">
          <Moon className="w-8 h-8 text-[#B78E28] mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
          <Link href="/store" className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
            {t.ctaBtn}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
