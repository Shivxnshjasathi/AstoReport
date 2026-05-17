'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Sparkles, ArrowRight, User, Calendar, Loader2, Star, MapPin, Milestone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { calculateDashaTimeline } from './actions';
import LocationSearch from '../components/Form/LocationSearch';
import { LocationData } from '@/lib/services/geocoding';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'DASHA TIMELINE',
    title: 'Vimshottari Dasha Timeline',
    subtitle: 'EXPLORE YOUR 120-YEAR CELESTIAL TIMELINE TO UNCOVER CURRENT AND FUTURE PLANETARY PHASES',
    name: 'FULL NAME',
    dob: 'DATE OF BIRTH',
    tob: 'TIME OF BIRTH',
    calculate: 'SCAN MY TIMELINE',
    calculating: 'MAPPING PLANETS...',
    mahadasha: 'Mahadasha',
    antardasha: 'Antardasha (Sub-period)',
    duration: 'Duration',
    currentBadge: 'CURRENT PHASE',
    activeDasha: 'Active Dasha Insights',
    ruler: 'Planetary Ruler',
    cta: 'Want a deep planetary period consultation?',
    ctaBtn: 'TALK TO A PANDIT — ₹199',
    phaseTip: 'Vedic astrology maps your life into major chapters ruled by nine cosmic bodies. Each phase shapes your career, relationships, and health.',
  },
  hi: {
    back: 'वापस',
    badge: 'दशा टाइमलाइन',
    title: 'विंशोत्तरी दशा टाइमलाइन',
    subtitle: 'अपने वर्तमान और भविष्य के ग्रहों के चरणों को उजागर करने के लिए अपने 120-वर्षीय दिव्य इतिहास का अन्वेषण करें',
    name: 'पूरा नाम',
    dob: 'जन्म तिथि',
    tob: 'जन्म समय',
    calculate: 'मेरी टाइमलाइन स्कैन करें',
    calculating: 'ग्रहों का मिलान हो रहा है...',
    mahadasha: 'महादशा',
    antardasha: 'अंतर्दशा (उप-अवधि)',
    duration: 'अवधि',
    currentBadge: 'वर्तमान चरण',
    activeDasha: 'सक्रिय दशा विश्लेषण',
    ruler: 'शासक ग्रह',
    cta: 'क्या आप ग्रहों की दशा का विस्तृत विश्लेषण चाहते हैं?',
    ctaBtn: 'पंडित से बात करें — ₹199',
    phaseTip: 'वैदिक ज्योतिष आपके जीवन को नौ लौकिक पिंडों द्वारा शासित अध्यायों में विभाजित करता है। प्रत्येक चरण आपके करियर, रिश्तों और स्वास्थ्य को प्रभावित करता है।',
  },
};

const PLANET_INSIGHTS: Record<string, { en: string; hi: string; color: string }> = {
  Ketu: {
    en: 'A period of spiritual awakening, detachment, deep introspection, and intuitive breakthroughs. Focus on internal growth rather than material goals.',
    hi: 'आध्यात्मिक जागृति, वैराग्य, गहन आत्मनिरीक्षण और सहज ज्ञान युक्त सफलताओं का समय। भौतिक लक्ष्यों के बजाय आंतरिक विकास पर ध्यान केंद्रित करें।',
    color: 'from-purple-600 to-indigo-500',
  },
  Venus: {
    en: 'A beautiful 20-year phase of luxury, relationships, creativity, artistic pursuits, and material comfort. Excellent for career growth and love life.',
    hi: 'लक्जरी, रिश्तों, रचनात्मकता, कलात्मक गतिविधियों और भौतिक सुख-सुविधाओं का एक सुंदर 20-वर्षीय चरण। करियर के विकास और प्रेम जीवन के लिए उत्कृष्ट।',
    color: 'from-pink-400 to-rose-400',
  },
  Sun: {
    en: 'A powerful phase of authority, career advancement, self-realization, and social status. Success in administrative or leadership roles is highly likely.',
    hi: 'अधिकार, करियर में उन्नति, आत्म-साक्षात्कार और सामाजिक स्थिति का एक शक्तिशाली चरण। प्रशासनिक या नेतृत्व भूमिकाओं में सफलता मिलने की प्रबल संभावना है।',
    color: 'from-amber-400 to-orange-500',
  },
  Moon: {
    en: 'A highly emotional, nurturing phase focused on domestic happiness, mental clarity, travel, and public life. Great for creative endeavors.',
    hi: 'घरेलू सुख, मानसिक स्पष्टता, यात्रा और सार्वजनिक जीवन पर केंद्रित एक अत्यधिक भावनात्मक, पोषण संबंधी चरण। रचनात्मक प्रयासों के लिए महान।',
    color: 'from-blue-400 to-cyan-400',
  },
  Mars: {
    en: 'A high-energy phase marked by courage, ambition, property dealings, and physical vitality. Channel this intense power constructively to avoid conflicts.',
    hi: 'साहस, महत्वाकांक्षा, संपत्ति के लेन-देन और शारीरिक जीवन शक्ति की विशेषता वाला एक उच्च-ऊर्जा चरण। विवादों से बचने के लिए इस तीव्र शक्ति का रचनात्मक रूप से उपयोग करें।',
    color: 'from-red-600 to-rose-500',
  },
  Rahu: {
    en: 'An intense 18-year period of high ambition, sudden fortunes, foreign travels, and worldly gains. Stay grounded to successfully navigate illusions.',
    hi: 'उच्च महत्वाकांक्षा, अचानक भाग्य, विदेश यात्रा और सांसारिक लाभ की 18 वर्ष की तीव्र अवधि। भ्रमों से सफलतापूर्वक निपटने के लिए जमीन से जुड़े रहें।',
    color: 'from-slate-600 to-zinc-800',
  },
  Jupiter: {
    en: 'An auspicious 16-year cycle of wisdom, expansion, knowledge, spiritual growth, financial prosperity, and marriage. A highly positive period.',
    hi: 'ज्ञान, विस्तार, बुद्धि, आध्यात्मिक विकास, वित्तीय समृद्धि और विवाह का एक शुभ 16-वर्षीय चक्र। एक अत्यधिक सकारात्मक अवधि।',
    color: 'from-yellow-400 to-amber-500',
  },
  Saturn: {
    en: 'A foundational 19-year period of discipline, hard work, life lessons, and long-term structures. Patience and perseverance bring massive rewards.',
    hi: 'अनुशासन, कड़ी मेहनत, जीवन के सबक और दीर्घकालिक संरचनाओं की 19 वर्ष की बुनियादी अवधि। धैर्य और दृढ़ता भारी पुरस्कार लाते हैं।',
    color: 'from-indigo-600 to-purple-800',
  },
  Mercury: {
    en: 'A dynamic phase emphasizing communication, commerce, intellect, learning, business expansion, and lightheartedness. Great for trade and studies.',
    hi: 'संचार, वाणिज्य, बुद्धि, सीखने, व्यवसाय के विस्तार और प्रफुल्लता पर जोर देने वाला एक गतिशील चरण। व्यापार और अध्ययन के लिए महान।',
    color: 'from-green-400 to-emerald-500',
  },
};

export default function DashaPage() {
  const { language } = useLanguage();
  const t = dict[language];

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [dashas, setDashas] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return alert(language === 'hi' ? 'कृपया एक स्थान चुनें' : 'Please select a location');
    setLoading(true);
    setError(null);
    setDashas(null);

    const result = await calculateDashaTimeline(
      dob,
      tob,
      location.lat,
      location.lon,
      location.timezone
    );

    if (result.success && result.dashas) {
      setDashas(result.dashas);
    } else {
      setError(result.error || 'Failed to map celestial timeline');
    }
    setLoading(false);
  };

  const isCurrentDasha = (startStr: string, endStr: string) => {
    const today = new Date();
    const start = new Date(startStr);
    const end = new Date(endStr);
    return today >= start && today <= end;
  };

  const getCurrentActive = () => {
    if (!dashas) return null;
    return dashas.find(d => isCurrentDasha(d.start, d.end)) || dashas[0];
  };

  const currentDasha = getCurrentActive();

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Stars Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#161622] to-[#121212]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[900px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Nav Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]">
            <Milestone className="w-3.5 h-3.5" />
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
              <Clock className="w-5 h-5 text-[#7D756B] mr-3 shrink-0" />
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
              <><Milestone className="w-4 h-4 text-[#B78E28]" />{t.calculate}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </motion.form>

        {error && (
          <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-2xl text-center text-red-400 text-xs mb-8">
            {error}
          </div>
        )}

        {/* Results Timeline */}
        <AnimatePresence>
          {dashas && currentDasha && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Highlight current active Dasha card */}
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#B78E28]/30 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${PLANET_INSIGHTS[currentDasha.planet]?.color || 'from-amber-400 to-orange-500'}`} />
                <span className="inline-block bg-[#B78E28]/10 border border-[#B78E28]/30 px-4 py-1.5 rounded-full text-[8px] uppercase tracking-widest text-[#B78E28] font-bold mb-6">
                  ✦ {t.currentBadge}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-sm text-[#7D756B] uppercase tracking-[0.25em] mb-1">{t.mahadasha}</h2>
                    <h1 className="text-4xl sm:text-5xl font-serif text-[#E5D6C8] uppercase tracking-wider mb-4 font-light">
                      {currentDasha.planet}
                    </h1>
                    <p className="text-[10px] text-[#7D756B] uppercase tracking-widest mb-6">
                      {currentDasha.start} — {currentDasha.end}
                    </p>
                  </div>

                  <div className="p-6 bg-[#1A1A1A]/40 rounded-3xl border border-[#7D756B]/20">
                    <h4 className="text-[9px] uppercase tracking-widest text-[#B78E28] mb-3 font-black">
                      {t.activeDasha}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-[#E5D6C8]/80 font-light">
                      {language === 'hi' ? PLANET_INSIGHTS[currentDasha.planet]?.hi : PLANET_INSIGHTS[currentDasha.planet]?.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informative Tip */}
              <div className="p-6 bg-[#161616]/40 border border-[#7D756B]/20 rounded-3xl flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7D756B] leading-relaxed">
                  {t.phaseTip}
                </p>
              </div>

              {/* Horizontal Scrollable/Expandable timeline of all Dashas */}
              <div className="space-y-6">
                <h3 className="text-base font-serif uppercase tracking-widest text-[#E5D6C8] pl-2">
                  120-Year Vimshottari Timeline
                </h3>

                <div className="space-y-4">
                  {dashas.map((d, index) => {
                    const isActive = isCurrentDasha(d.start, d.end);
                    const planetColor = PLANET_INSIGHTS[d.planet]?.color || 'from-gray-500 to-gray-700';

                    return (
                      <div
                        key={index}
                        className={`p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          isActive 
                            ? 'bg-[#B78E28]/5 border-[#B78E28] shadow-[0_0_20px_rgba(183,142,40,0.05)]' 
                            : 'bg-[#121212]/40 border-[#7D756B]/20 hover:border-[#7D756B]/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${planetColor}`} />
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-[#E5D6C8] flex items-center gap-2">
                              {d.planet}
                              {isActive && (
                                <span className="text-[7px] bg-[#B78E28] text-[#121212] px-2 py-0.5 rounded-full font-black tracking-widest uppercase">
                                  ACTIVE
                                </span>
                              )}
                            </h4>
                            <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mt-1">
                              {d.start} to {d.end}
                            </p>
                          </div>
                        </div>

                        {/* Nested Antardashas */}
                        <div className="flex flex-wrap gap-2 max-w-md">
                          {d.subPeriods.slice(0, 5).map((sub: any, subIdx: number) => {
                            const isSubActive = isCurrentDasha(sub.start, sub.end);
                            return (
                              <span
                                key={subIdx}
                                className={`px-3 py-1.5 rounded-full text-[8px] uppercase tracking-widest ${
                                  isSubActive
                                    ? 'bg-[#B78E28] text-[#121212] font-black'
                                    : 'bg-[#1A1A1A] text-[#7D756B] border border-[#7D756B]/10'
                                }`}
                              >
                                {sub.planet}
                              </span>
                            );
                          })}
                          {d.subPeriods.length > 5 && (
                            <span className="px-3 py-1.5 rounded-full text-[8px] uppercase tracking-widest bg-[#1A1A1A] text-[#7D756B] opacity-50">
                              +{d.subPeriods.length - 5} MORE
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consultation CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-8 text-center"
              >
                <Star className="w-8 h-8 text-[#B78E28] mx-auto mb-4" />
                <h3 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-widest mb-4 font-light">{t.cta}</h3>
                <Link href="/consult" className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
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
