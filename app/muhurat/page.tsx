'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Sunrise, Sunset, Clock, ArrowRight, CheckCircle, AlertTriangle, Calendar, Info, Smile } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculatePanchang, type PanchangData } from '@/lib/astro/panchang';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'DAILY RITUAL PLANNER',
    title: 'Daily Auspicious Planner',
    subtitle: 'VEDIC HORA, RAHU KAAL & ACTIONABLE CELESTIAL WELLNESS RITUALS',
    date: 'SELECT DATE',
    check: 'CHECK TIMINGS',
    checking: 'CALCULATING PANCHANG...',
    goodTimes: 'Auspicious Windows',
    badTimes: 'Inauspicious Windows (Avoid)',
    rahuKaal: 'Rahu Kaal',
    rahuDesc: 'Strictly avoid starting new important work.',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    abhijit: 'Abhijit Muhurat',
    abhijitDesc: 'Highly auspicious for starting new ventures, contracts, and travel.',
    dayRuler: 'Day Ruler & Daily Ritual',
    horaSchedule: 'Planetary Hora Schedule (Hourly Guide)',
    auspicious: 'Auspicious',
    neutral: 'Neutral',
    inauspicious: 'Inauspicious',
    cta: 'Need a specific Muhurat for Marriage, Property or Business?',
    ctaBtn: 'GET PREMIUM MUHURAT REPORT',
  },
  hi: {
    back: 'वापस',
    badge: 'दैनिक अनुष्ठान योजनाकार',
    title: 'दैनिक शुभ मुहूर्त योजनाकार',
    subtitle: 'वैदिक होरा, राहु काल और व्यावहारिक लौकिक कल्याण अनुष्ठान',
    date: 'तिथि चुनें',
    check: 'समय जांचें',
    checking: 'पंचांग की गणना...',
    goodTimes: 'शुभ समय',
    badTimes: 'अशुभ समय (बचें)',
    rahuKaal: 'राहु काल',
    rahuDesc: 'नए महत्वपूर्ण कार्य शुरू करने से सख्ती से बचें।',
    sunrise: 'सूर्योदय',
    sunset: 'सूर्यास्त',
    abhijit: 'अभिजित मुहूर्त',
    abhijitDesc: 'नए उद्यम, अनुबंध और यात्रा शुरू करने के लिए अत्यधिक शुभ।',
    dayRuler: 'दिन के शासक और दैनिक अनुष्ठान',
    horaSchedule: 'ग्रह होरा अनुसूची (प्रति घंटा गाइड)',
    auspicious: 'शुभ',
    neutral: 'तटस्थ',
    inauspicious: 'अशुभ',
    cta: 'क्या आपको विवाह, संपत्ति या व्यापार के लिए विशिष्ट मुहूर्त चाहिए?',
    ctaBtn: 'प्रीमियम मुहूर्त रिपोर्ट प्राप्त करें',
  },
};

// Actionable planetary day rituals
const DAY_RITUALS: Record<string, { en: string; hi: string; color: string; symbol: string; ruler: string; rulerHi: string }> = {
  Sunday: {
    ruler: 'Sun (Surya)',
    rulerHi: 'सूर्य',
    symbol: '☉',
    color: '#FF6B35',
    en: 'Sunday is ruled by the Sun. Highly recommended to offer water to the Sun at sunrise, practice Surya Namaskar, express gratitude to father figures, and plan leadership or career goals. Avoid ego clashes.',
    hi: 'रविवार सूर्य द्वारा शासित है। सूर्योदय के समय सूर्य को जल अर्पित करना, सूर्य नमस्कार करना, पिता का सम्मान करना और नेतृत्व या करियर लक्ष्यों की योजना बनाना अत्यधिक अनुशंसित है। अहंकार के टकराव से बचें।'
  },
  Monday: {
    ruler: 'Moon (Chandra)',
    rulerHi: 'चंद्रमा',
    symbol: '☽',
    color: '#C0C0C0',
    en: 'Monday is ruled by the Moon. Best for emotional healing, meditation, journaling, and consuming milk or cooling herbs. Worship Lord Shiva to bring mental peace and balance. Avoid overthinking.',
    hi: 'सोमवार चंद्रमा द्वारा शासित है। भावनात्मक उपचार, ध्यान, जर्नलिंग और दूध या ठंडी जड़ी-बूटियों के सेवन के लिए सर्वोत्तम है। मानसिक शांति और संतुलन के लिए भगवान शिव की पूजा करें। अधिक सोचने से बचें।'
  },
  Tuesday: {
    ruler: 'Mars (Mangal)',
    rulerHi: 'मंगल',
    symbol: '♂',
    color: '#DC143C',
    en: 'Tuesday is ruled by Mars. Engage in dynamic physical exercise, courageously tackle outstanding tasks, and chant Hanuman Chalisa. Recommended to avoid arguments, sharp items, and angry reactions.',
    hi: 'मंगलवार मंगल द्वारा शासित है। शारीरिक व्यायाम करें, साहसपूर्वक लंबित कार्यों को निपटाएं और हनुमान चालीसा का पाठ करें। विवादों, नुकीली चीजों और क्रोधित प्रतिक्रियाओं से बचने की सलाह दी जाती है।'
  },
  Wednesday: {
    ruler: 'Mercury (Budh)',
    rulerHi: 'बुध',
    symbol: '☿',
    color: '#2ECC71',
    en: 'Wednesday is ruled by Mercury. Highly auspicious day for commercial transactions, learning new skills, writing, and clear communication. Feed green grass or vegetables to cows for intellect.',
    hi: 'बुधवार बुध द्वारा शासित है। व्यावसायिक लेन-देन, नए कौशल सीखने, लिखने और स्पष्ट संचार के लिए अत्यधिक शुभ दिन। बुद्धि के लिए गायों को हरी घास या सब्जियां खिलाएं।'
  },
  Thursday: {
    ruler: 'Jupiter (Guru)',
    rulerHi: 'बृहस्पति',
    symbol: '♃',
    color: '#F39C12',
    en: 'Thursday is ruled by Jupiter. Perfect for spiritual studies, counseling, requesting blessing from teachers, and donating yellow items (like chana dal/turmeric). Plan long-term investments today.',
    hi: 'गुरुवार बृहस्पति द्वारा शासित है। आध्यात्मिक अध्ययन, परामर्श, गुरुओं से आशीर्वाद लेने और पीली वस्तुओं (जैसे चना दाल/हल्दी) के दान के लिए बिल्कुल सही। आज दीर्घकालिक निवेश की योजना बनाएं।'
  },
  Friday: {
    ruler: 'Venus (Shukra)',
    rulerHi: 'शुक्र',
    symbol: '♀',
    color: '#E91E63',
    en: 'Friday is ruled by Venus. Ideal for romantic gestures, purchasing art, grooming, starting new relationships, and worshipping Goddess Lakshmi. Chant Venus mantras for luxury and harmony.',
    hi: 'शुक्रवार शुक्र द्वारा शासित है। रोमांटिक इशारों, कला की खरीद, संवारने, नए रिश्ते शुरू करने और देवी लक्ष्मी की पूजा करने के लिए आदर्श। विलासिता और सद्भाव के लिए शुक्र मंत्रों का जप करें।'
  },
  Saturday: {
    ruler: 'Saturn (Shani)',
    rulerHi: 'शनि',
    symbol: '♄',
    color: '#607D8B',
    en: 'Saturday is ruled by Saturn. Best day for selfless service, donating blankets/food to the needy, feeding stray dogs/crows, and self-discipline. Avoid purchasing iron/oil today.',
    hi: 'शनिवार शनि द्वारा शासित है। परोपकार, जरूरतमंदों को कंबल/भोजन दान करने, आवारा कुत्तों/कौओं को खिलाने और आत्म-अनुशासन के लिए सबसे अच्छा दिन। आज लोहा/तेल खरीदने से बचें।'
  }
};

// Hora sequencing starting from day lord
const HORA_ORDER = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];
const HORA_STATUSES: Record<string, 'auspicious' | 'inauspicious' | 'neutral'> = {
  Jupiter: 'auspicious',
  Venus: 'auspicious',
  Mercury: 'auspicious',
  Moon: 'neutral',
  Sun: 'neutral',
  Mars: 'inauspicious',
  Saturn: 'inauspicious',
};

const HORA_SYMBOLS: Record<string, string> = {
  Sun: '☉', Moon: '☽', Mars: '♂', Mercury: '☿', Jupiter: '♃', Venus: '♀', Saturn: '♄'
};

const HORA_COLORS: Record<string, string> = {
  Sun: '#FF6B35', Moon: '#C0C0C0', Mars: '#DC143C', Mercury: '#2ECC71', Jupiter: '#F39C12', Venus: '#E91E63', Saturn: '#607D8B'
};

// Calculate Abhijit Muhurat (midday +/- 24 mins)
function getAbhijit(panchang: PanchangData) {
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
    const start = mid - 0.4;
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
    return '11:45 AM – 12:30 PM';
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

  // Run automatically on mount for current day
  useEffect(() => {
    setPanchang(calculatePanchang(new Date()));
  }, []);

  // Compute 12 Day Hora hours based on sunrise/sunset
  const getHoraSchedule = () => {
    if (!panchang) return [];
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
      const dayLength = ss - sr;
      const horaLength = dayLength / 12;

      // Find day lord index to start sequence
      const dayOfWeek = panchang.vara; // e.g. Saturday
      const baseLord = dayOfWeek === 'Sunday' ? 'Sun' : dayOfWeek === 'Monday' ? 'Moon' : dayOfWeek === 'Tuesday' ? 'Mars' : dayOfWeek === 'Wednesday' ? 'Mercury' : dayOfWeek === 'Thursday' ? 'Jupiter' : dayOfWeek === 'Friday' ? 'Venus' : 'Saturn';
      
      const startIndex = HORA_ORDER.indexOf(baseLord);
      
      const schedule = [];
      const formatTimeDecimal = (dec: number) => {
        let hr = Math.floor(dec);
        const mn = Math.round((dec - hr) * 60);
        const ampm = hr >= 12 ? 'PM' : 'AM';
        if (hr > 12) hr -= 12;
        if (hr === 0) hr = 12;
        return `${hr}:${mn.toString().padStart(2, '0')} ${ampm}`;
      };

      for (let i = 0; i < 12; i++) {
        const lord = HORA_ORDER[(startIndex + i) % 7];
        const startVal = sr + i * horaLength;
        const endVal = startVal + horaLength;
        schedule.push({
          hourIndex: i + 1,
          time: `${formatTimeDecimal(startVal)} – ${formatTimeDecimal(endVal)}`,
          lord,
          status: HORA_STATUSES[lord],
        });
      }
      return schedule;
    } catch (e) {
      return [];
    }
  };

  const dayRitual = panchang ? DAY_RITUALS[panchang.vara] : null;

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1A1812] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1000px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all"><ArrowLeft className="w-3.5 h-3.5" /></div>{t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]"><Clock className="w-3.5 h-3.5" />{t.badge}</div>
        </div>

        {/* Title */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light leading-tight">{t.title}</h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">{t.subtitle}</p>
        </motion.div>

        {/* Day Ruler & Actionable Daily Ritual */}
        <AnimatePresence>
          {dayRitual && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/30 rounded-[2.5rem] p-8 mb-8 overflow-hidden relative"
            >
              <div className="absolute right-6 top-6 text-7xl opacity-[0.04] font-bold pointer-events-none select-none">
                {dayRitual.symbol}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" style={{ color: dayRitual.color }}>{dayRitual.symbol}</span>
                <h3 className="text-xs uppercase tracking-widest text-[#B78E28] font-bold">
                  {t.dayRuler} — {language === 'hi' ? dayRitual.rulerHi : dayRitual.ruler}
                </h3>
              </div>

              <p className="text-sm font-light leading-relaxed text-[#E5D6C8] uppercase tracking-wider">
                {language === 'hi' ? dayRitual.hi : dayRitual.en}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
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

              {/* Hora Hourly planner */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/20 rounded-[2.5rem] p-6 lg:p-8">
                <h3 className="text-xs uppercase tracking-widest text-[#E5D6C8] mb-6 font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B78E28]" />
                  {t.horaSchedule}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getHoraSchedule().map((hr) => (
                    <div
                      key={hr.hourIndex}
                      className="bg-[#1A1A1A]/40 border border-[#7D756B]/25 rounded-2xl p-4 flex items-center justify-between hover:border-[#B78E28]/40 transition-all"
                    >
                      <div className="space-y-1">
                        <p className="text-[8px] text-[#7D756B] uppercase tracking-widest">Hora {hr.hourIndex}</p>
                        <p className="text-xs font-serif text-[#E5D6C8]">{hr.time}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="text-xs" style={{ color: HORA_COLORS[hr.lord] }}>{HORA_SYMBOLS[hr.lord]}</span>
                          <span className="text-[9px] uppercase tracking-widest text-[#7D756B]">{hr.lord} Hora</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold border ${
                            hr.status === 'auspicious'
                              ? 'bg-green-500/10 border-green-500/20 text-green-400'
                              : hr.status === 'inauspicious'
                              ? 'bg-red-500/10 border-red-500/20 text-red-400'
                              : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {hr.status === 'auspicious' && t.auspicious}
                          {hr.status === 'inauspicious' && t.inauspicious}
                          {hr.status === 'neutral' && t.neutral}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Good Times */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-green-900/30 rounded-[2rem] p-6 lg:p-8">
                <h3 className="text-xs uppercase tracking-widest text-[#E5D6C8] mb-6 font-bold flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />{t.goodTimes}</h3>
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
                <h3 className="text-xs uppercase tracking-widest text-[#E5D6C8] mb-6 font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" />{t.badTimes}</h3>
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
