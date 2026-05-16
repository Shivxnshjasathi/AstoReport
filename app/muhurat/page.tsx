'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Sunrise, Sunset, Clock, ArrowRight, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculatePanchang, type PanchangData } from '@/lib/astro/panchang';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: { back:'BACK', badge:'MUHURAT FINDER', title:'Auspicious Timings', subtitle:'FIND THE BEST TIME FOR IMPORTANT ACTIVITIES BASED ON PANCHANG',
    date:'SELECT DATE', check:'CHECK TIMINGS', checking:'CALCULATING PANCHANG...',
    goodTimes:'Auspicious Windows', badTimes:'Inauspicious Windows (Avoid)',
    rahuKaal:'Rahu Kaal', rahuDesc:'Strictly avoid starting new important work.',
    sunrise:'Sunrise', sunset:'Sunset', abhijit:'Abhijit Muhurat', abhijitDesc:'Highly auspicious for all activities.',
    cta:'Need a specific Muhurat for Marriage, Property or Business?', ctaBtn:'GET PREMIUM MUHURAT REPORT' },
  hi: { back:'वापस', badge:'मुहूर्त फाइंडर', title:'शुभ मुहूर्त', subtitle:'पंचांग के आधार पर महत्वपूर्ण कार्यों के लिए सबसे अच्छा समय खोजें',
    date:'तिथि चुनें', check:'समय जांचें', checking:'पंचांग की गणना...',
    goodTimes:'शुभ समय', badTimes:'अशुभ समय (बचें)',
    rahuKaal:'राहु काल', rahuDesc:'नए महत्वपूर्ण कार्य शुरू करने से सख्ती से बचें।',
    sunrise:'सूर्योदय', sunset:'सूर्यास्त', abhijit:'अभिजित मुहूर्त', abhijitDesc:'सभी कार्यों के लिए अत्यंत शुभ।',
    cta:'क्या आपको विवाह, संपत्ति या व्यापार के लिए विशिष्ट मुहूर्त चाहिए?', ctaBtn:'प्रीमियम मुहूर्त रिपोर्ट प्राप्त करें' },
};

// Calculate Abhijit Muhurat (midday +/- 24 mins)
function getAbhijit(panchang: PanchangData) {
  // Simple approximation: Abhijit is exactly at solar noon (midway between sunrise and sunset)
  // For precise calculation we need exact sunrise/sunset JS dates, but since we have strings like "6:15 AM", 
  // we'll do a simple string parse for UI demonstration.
  try {
    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(' ');
      let [h, m] = time.split(':').map(Number);
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      return h + m / 60;
    };
    const sr = parseTime(panchang.sunrise);
    const ss = parseTime(panchang.sunset);
    const mid = sr + (ss - sr) / 2;
    const start = mid - 0.4; // 24 mins = 0.4 hrs
    const end = mid + 0.4;
    
    const format = (dec: number) => {
      let h = Math.floor(dec);
      const m = Math.round((dec - h) * 60);
      const ampm = h >= 12 ? 'PM' : 'AM';
      if (h > 12) h -= 12;
      if (h === 0) h = 12;
      return `${h}:${m.toString().padStart(2,'0')} ${ampm}`;
    };
    return `${format(start)} – ${format(end)}`;
  } catch (e) {
    return '11:45 AM – 12:30 PM'; // fallback
  }
}

export default function MuhuratPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [panchang, setPanchang] = useState<PanchangData | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPanchang(null);
    setTimeout(() => {
      setPanchang(calculatePanchang(new Date(dateStr)));
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1A1812] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[800px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all"><ArrowLeft className="w-3.5 h-3.5" /></div>{t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]"><Clock className="w-3.5 h-3.5" />{t.badge}</div>
        </div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.title}</h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">{t.subtitle}</p>
        </motion.div>

        <motion.form onSubmit={handleCheck} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
          className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-8 lg:p-10 mb-12 space-y-6">
          <div className="space-y-2">
            <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.date}</label>
            <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
              <Calendar className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
              <input required type="date" value={dateStr} onChange={e => setDateStr(e.target.value)}
                className="w-full py-3 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[16px] md:text-sm" />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full mt-4 py-4 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[#E5D6C8] rounded-full text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group">
            {loading ? <><Sparkles className="w-4 h-4 animate-pulse text-[#B78E28]" />{t.checking}</> : <><Clock className="w-4 h-4 text-[#B78E28]" />{t.check}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </motion.form>

        <AnimatePresence mode="wait">
          {panchang && !loading && (
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-8">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-2xl p-5 flex items-center gap-4">
                  <Sunrise className="w-6 h-6 text-[#B78E28]" />
                  <div><p className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.sunrise}</p><p className="text-sm font-serif">{panchang.sunrise}</p></div>
                </div>
                <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-2xl p-5 flex items-center gap-4">
                  <Sunset className="w-6 h-6 text-[#7D756B]" />
                  <div><p className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.sunset}</p><p className="text-sm font-serif">{panchang.sunset}</p></div>
                </div>
              </div>

              {/* Good Times */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-green-900/30 rounded-[2rem] p-6 lg:p-8">
                <h3 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8] mb-6 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />{t.goodTimes}</h3>
                <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-5 flex items-start gap-4">
                  <div className="text-2xl mt-1">✨</div>
                  <div>
                    <h4 className="text-sm font-serif text-green-400 mb-1">{t.abhijit}</h4>
                    <p className="text-lg font-serif text-[#E5D6C8] mb-2">{getAbhijit(panchang)}</p>
                    <p className="text-[10px] text-green-500/70 uppercase tracking-widest leading-relaxed">{t.abhijitDesc}</p>
                  </div>
                </div>
              </div>

              {/* Bad Times */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-red-900/30 rounded-[2rem] p-6 lg:p-8">
                <h3 className="text-sm font-serif uppercase tracking-widest text-[#E5D6C8] mb-6 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" />{t.badTimes}</h3>
                <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-5 flex items-start gap-4">
                  <div className="text-2xl mt-1">⚠️</div>
                  <div>
                    <h4 className="text-sm font-serif text-red-400 mb-1">{t.rahuKaal}</h4>
                    <p className="text-lg font-serif text-[#E5D6C8] mb-2">{panchang.rahuKaal}</p>
                    <p className="text-[10px] text-red-400/70 uppercase tracking-widest leading-relaxed">{t.rahuDesc}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-8 text-center mt-12">
                <Sparkles className="w-8 h-8 text-[#B78E28] mx-auto mb-4 animate-pulse" />
                <h3 className="text-sm font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
                <Link href="/store/12" className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
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
