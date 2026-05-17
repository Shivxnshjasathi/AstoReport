'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert, ShieldCheck, Zap, Info, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: "BACK",
    badge: "KUNDLI CHECKER",
    title: "Dosha Analysis",
    subtitle: "IDENTIFY CELESTIAL BLOCKS IN YOUR DESTINY.",
    labelName: "Full Name",
    labelDate: "Birth Date",
    labelTime: "Birth Time",
    labelPlace: "Birth Place",
    btnCheck: "ANALYZE DOSHAS",
    scanning: "Scanning your Kundli...",
    resultsTitle: "Your Dosha Report",
    manglik: "Mangal Dosha",
    sadesati: "Sade Sati",
    pitra: "Pitra Dosha",
    kaalsarp: "Kaal Sarp Dosha",
    statusPresent: "PRESENT",
    statusAbsent: "NOT FOUND",
    statusPartial: "PARTIAL",
    remedy: "Suggested Remedy",
    wantReport: "Get detailed Dosha Report",
    buyNow: "BUY FULL ANALYSIS",
  },
  hi: {
    back: "वापस",
    badge: "कुंडली चेकर",
    title: "दोष विश्लेषण",
    subtitle: "अपने भाग्य में स्वर्गीय बाधाओं को पहचानें।",
    labelName: "पूरा नाम",
    labelDate: "जन्म तिथि",
    labelTime: "जन्म समय",
    labelPlace: "जन्म स्थान",
    btnCheck: "दोषों का विश्लेषण करें",
    scanning: "आपकी कुंडली स्कैन की जा रही है...",
    resultsTitle: "आपकी दोष रिपोर्ट",
    manglik: "मंगल दोष",
    sadesati: "साढ़े साती",
    pitra: "पितृ दोष",
    kaalsarp: "काल सर्प दोष",
    statusPresent: "उपस्थित",
    statusAbsent: "नहीं पाया गया",
    statusPartial: "आंशिक",
    remedy: "सुझाया गया उपाय",
    wantReport: "विस्तृत दोष रिपोर्ट प्राप्त करें",
    buyNow: "पूरा विश्लेषण खरीदें",
  }
};

export default function DoshaPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate complex calculation using NPM logic
    setTimeout(() => {
      setResults({
        manglik: { status: 'partial', desc: language === 'hi' ? 'अल्पांश मंगल दोष - विवाह में देरी हो सकती है।' : 'Partial Manglik - May cause minor delays in marriage.' },
        sadesati: { status: 'absent', desc: language === 'hi' ? 'अभी आप साढ़े साती के प्रभाव में नहीं हैं।' : 'You are currently not under the influence of Sade Sati.' },
        pitra: { status: 'absent', desc: language === 'hi' ? 'कोई पितृ दोष नहीं पाया गया।' : 'No Pitra Dosha detected in your chart.' },
        kaalsarp: { status: 'present', desc: language === 'hi' ? 'काल सर्प दोष पाया गया - कार्यों में बाधाएं आ सकती हैं।' : 'Kaal Sarp Dosha detected - May cause hurdles in undertakings.' },
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] selection:bg-[#B78E28]/30">
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#B78E28]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#B78E28]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-20 relative z-10">
        <Link href="/" className="inline-flex items-center gap-3 text-[#7D756B] hover:text-[#E5D6C8] transition-all uppercase tracking-[0.3em] text-[10px] mb-12 group">
          <div className="w-10 h-10 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] group-hover:bg-[#B78E28]/5 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          {t.back}
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: FORM */}
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-[#B78E28] text-[10px] font-bold tracking-[0.4em] uppercase bg-[#B78E28]/10 px-4 py-2 rounded-full inline-block mb-2 border border-[#B78E28]/20">{t.badge}</span>
              <h1 className="text-4xl lg:text-7xl font-serif leading-tight uppercase tracking-tight">{t.title}</h1>
              <p className="text-[#7D756B] text-xs lg:text-sm tracking-[0.2em] uppercase max-w-md">{t.subtitle}</p>
            </div>

            <form onSubmit={handleCheck} className="space-y-6 bg-[#1A1A1A]/50 backdrop-blur-xl border border-[#7D756B]/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] font-bold ml-1">{t.labelName}</label>
                  <input required type="text" placeholder="Arjun Sharma" className="w-full bg-[#121212]/50 border border-[#7D756B]/30 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-[#B78E28] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] font-bold ml-1">{t.labelDate}</label>
                  <input required type="date" className="w-full bg-[#121212]/50 border border-[#7D756B]/30 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-[#B78E28] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] font-bold ml-1">{t.labelTime}</label>
                  <input required type="time" className="w-full bg-[#121212]/50 border border-[#7D756B]/30 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-[#B78E28] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] font-bold ml-1">{t.labelPlace}</label>
                  <input required type="text" placeholder="New Delhi, India" className="w-full bg-[#121212]/50 border border-[#7D756B]/30 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-[#B78E28] transition-colors" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#B78E28] hover:bg-[#E5D6C8] text-[#121212] font-bold py-5 rounded-2xl transition-all duration-500 uppercase tracking-[0.3em] text-[10px] shadow-[0_10px_30px_rgba(183,142,40,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.scanning}
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    {t.btnCheck}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: RESULTS */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!results && !loading && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full flex flex-col items-center justify-center text-center p-12 border border-[#7D756B]/20 rounded-[3rem] bg-[#1A1A1A]/20 dashed-border">
                  <div className="w-24 h-24 rounded-full bg-[#B78E28]/5 border border-[#B78E28]/20 flex items-center justify-center mb-8">
                    <ShieldCheck className="w-10 h-10 text-[#B78E28]/40" />
                  </div>
                  <p className="text-[#7D756B] uppercase tracking-[0.2em] text-[10px] leading-relaxed">Enter your birth details to reveal potential celestial afflictions and their remedies.</p>
                </motion.div>
              )}

              {loading && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full flex flex-col items-center justify-center py-20">
                  <div className="relative w-48 h-48 mb-12">
                    <div className="absolute inset-0 border-4 border-[#B78E28]/10 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-[#B78E28] rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="w-12 h-12 text-[#B78E28] animate-pulse" />
                    </div>
                  </div>
                  <p className="text-[#B78E28] text-xs uppercase tracking-[0.4em] font-black animate-pulse">{t.scanning}</p>
                </motion.div>
              )}

              {results && !loading && (
                <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="space-y-8">
                  <div className="bg-[#1A1A1A]/80 backdrop-blur-2xl border border-[#B78E28]/30 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B78E28]/10 blur-[50px] -mr-16 -mt-16" />
                    
                    <h3 className="text-2xl font-serif uppercase tracking-widest mb-10 text-center border-b border-[#7D756B]/20 pb-6">{t.resultsTitle}</h3>
                    
                    <div className="space-y-6">
                      {[
                        { id: 'manglik', label: t.manglik, data: results.manglik },
                        { id: 'kaalsarp', label: t.kaalsarp, data: results.kaalsarp },
                        { id: 'sadesati', label: t.sadesati, data: results.sadesati },
                        { id: 'pitra', label: t.pitra, data: results.pitra }
                      ].map((dosha) => (
                        <div key={dosha.id} className="group p-5 rounded-2xl bg-[#121212]/50 border border-[#7D756B]/20 hover:border-[#B78E28]/30 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-[#E5D6C8] uppercase tracking-[0.2em] font-bold">{dosha.label}</span>
                            <span className={`text-[8px] px-3 py-1 rounded-full font-black tracking-widest ${
                              dosha.data.status === 'present' ? 'bg-red-500/10 text-red-500 border border-red-500/30' :
                              dosha.data.status === 'partial' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' :
                              'bg-green-500/10 text-green-500 border border-green-500/30'
                            }`}>
                              {dosha.data.status === 'present' ? t.statusPresent : 
                               dosha.data.status === 'partial' ? t.statusPartial : t.statusAbsent}
                            </span>
                          </div>
                          <p className="text-[9px] text-[#7D756B] leading-relaxed uppercase tracking-wider">{dosha.data.desc}</p>
                        </div>
                      ))}
                    </div>

                    <Link href="/store" className="mt-10 block w-full bg-[#121212] border border-[#B78E28]/40 hover:bg-[#B78E28] hover:text-[#121212] transition-all duration-500 py-5 rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.4em]">
                      {t.buyNow}
                    </Link>
                  </div>

                  <div className="bg-[#B78E28]/5 border border-[#B78E28]/20 p-6 rounded-2xl flex items-start gap-4">
                    <Info className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
                    <p className="text-[9px] text-[#7D756B] leading-relaxed uppercase tracking-widest">
                      {language === 'hi' ? 'नोट: ये भविष्यवाणियां सामान्य हैं। सटीक दोष शांति के लिए, हमारे आचार्यों के साथ लाइव परामर्श बुक करें।' : 'Note: These are general analysis. For precise remedy guidance, book a live consultation with our Acharyas.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
