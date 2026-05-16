'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, ShieldAlert, CheckCircle, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { QUIZ_QUESTIONS, DOSHA_INFO } from '../data/doshaQuiz';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: { back:'BACK', badge:'DOSHA CHECKER', title:'Karmic Dosha Quiz', subtitle:'ANSWER 10 QUESTIONS TO IDENTIFY POTENTIAL ASTROLOGICAL DOSHAS (MANGALIK, SADE SATI, ETC)',
    start:'START QUIZ', question:'Question', of:'of', next:'NEXT', results:'ANALYZING KARMIC PATTERNS...',
    yourDosha:'Your Primary Dosha', noneFound:'No Major Doshas Detected', severity:'Severity Score', remedies:'Recommended Remedies',
    cta:'Get a complete Kundli analysis for accurate verification', ctaBtn:'GET KUNDLI REPORT', retake:'RETAKE QUIZ' },
  hi: { back:'वापस', badge:'दोष चेकर', title:'कार्मिक दोष क्विज', subtitle:'संभावित ज्योतिषीय दोषों (मांगलिक, साढ़े साती आदि) की पहचान के लिए 10 प्रश्नों के उत्तर दें',
    start:'क्विज शुरू करें', question:'प्रश्न', of:'में से', next:'अगला', results:'कार्मिक पैटर्न का विश्लेषण...',
    yourDosha:'आपका प्राथमिक दोष', noneFound:'कोई बड़ा दोष नहीं मिला', severity:'गंभीरता स्कोर', remedies:'अनुशंसित उपाय',
    cta:'सटीक सत्यापन के लिए संपूर्ण कुंडली विश्लेषण प्राप्त करें', ctaBtn:'कुंडली रिपोर्ट प्राप्त करें', retake:'पुनः प्रयास करें' },
};

export default function DoshaQuizPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string,number>>({});
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (points: Record<string,number>) => {
    const newScores = { ...scores };
    Object.entries(points).forEach(([dosha, pts]) => {
      newScores[dosha] = (newScores[dosha] || 0) + pts;
    });
    setScores(newScores);

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setLoading(true);
      setTimeout(() => { setLoading(false); setFinished(true); }, 1500);
    }
  };

  const getPrimaryDosha = () => {
    if (Object.keys(scores).length === 0) return null;
    let max = 0; let primary = '';
    Object.entries(scores).forEach(([d, pts]) => { if (pts > max) { max = pts; primary = d; } });
    if (max < 3) return null; // threshold
    return DOSHA_INFO.find(d => d.id === primary);
  };

  const primaryDosha = getPrimaryDosha();
  const maxScore = primaryDosha ? scores[primaryDosha.id] : 0;
  const severityPct = Math.min(100, Math.round((maxScore / 10) * 100)); // 10 is roughly max points per dosha

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#2A1515] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[800px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all"><ArrowLeft className="w-3.5 h-3.5" /></div>{t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]"><ShieldAlert className="w-3.5 h-3.5" />{t.badge}</div>
        </div>

        {!started ? (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mt-20">
            <div className="w-24 h-24 bg-red-900/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-8"><ShieldAlert className="w-10 h-10 text-red-500" /></div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.title}</h1>
            <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose mb-12">{t.subtitle}</p>
            <button onClick={() => setStarted(true)} className="group inline-flex items-center gap-3 bg-red-900/40 border border-red-500/50 text-[#E5D6C8] px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-red-800/60 transition-all shadow-[0_0_30px_rgba(239,68,68,0.15)]">
              {t.start}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ) : loading ? (
          <div className="text-center mt-32"><Sparkles className="w-10 h-10 text-[#B78E28] animate-pulse mx-auto mb-6" /><p className="text-xs text-[#B78E28] uppercase tracking-[0.2em] animate-pulse">{t.results}</p></div>
        ) : finished ? (
          <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="space-y-8 mt-10">
            {primaryDosha ? (
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-red-900/50 rounded-[2.5rem] p-8 lg:p-12 text-center">
                <div className="w-20 h-20 bg-red-900/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">{primaryDosha.emoji}</div>
                <p className="text-[10px] text-red-400 uppercase tracking-widest mb-2">{t.yourDosha}</p>
                <h2 className="text-3xl lg:text-4xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-6">{language==='hi'?primaryDosha.name.hi:primaryDosha.name.en}</h2>
                <p className="text-xs text-[#7D756B] uppercase tracking-widest leading-relaxed max-w-lg mx-auto mb-8">{language==='hi'?primaryDosha.desc.hi:primaryDosha.desc.en}</p>
                
                <div className="bg-[#1A1A1A]/50 border border-[#7D756B]/20 rounded-2xl p-6 mb-8 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-[#E5D6C8] uppercase tracking-widest">{t.severity}</span>
                    <span className="text-[10px] text-red-400 font-mono">{severityPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#7D756B]/20 rounded-full overflow-hidden"><div className="h-full bg-red-500 rounded-full" style={{width:`${severityPct}%`}} /></div>
                </div>

                <div className="text-left border-t border-[#7D756B]/20 pt-8">
                  <h3 className="text-[10px] text-[#B78E28] uppercase tracking-widest mb-4">{t.remedies}</h3>
                  <ul className="space-y-3">
                    {(language==='hi'?primaryDosha.remedies.hi:primaryDosha.remedies.en).map((r,i)=>(
                      <li key={i} className="flex items-start gap-3 text-xs text-[#E5D6C8] uppercase tracking-widest leading-relaxed"><CheckCircle className="w-4 h-4 text-[#B78E28] shrink-0 mt-0.5" />{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-[#121212]/80 backdrop-blur-lg border border-green-900/50 rounded-[2.5rem] p-12 text-center">
                <div className="w-20 h-20 bg-green-900/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-500" /></div>
                <h2 className="text-2xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-4">{t.noneFound}</h2>
                <p className="text-xs text-[#7D756B] uppercase tracking-widest leading-relaxed">Based on your answers, there are no strong indications of major karmic doshas. A full Kundli analysis is still recommended for complete clarity.</p>
              </div>
            )}

            <div className="bg-[#1A1A1A]/30 border border-[#B78E28]/20 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-sm font-serif text-[#E5D6C8] uppercase tracking-widest mb-2">{t.cta}</h3>
                <button onClick={()=>{setStarted(false);setCurrentQ(0);setScores({});setFinished(false)}} className="text-[9px] text-[#7D756B] hover:text-[#B78E28] uppercase tracking-widest flex items-center gap-1 transition-colors"><RotateCcw className="w-3 h-3"/>{t.retake}</button>
              </div>
              <Link href={`/store/${primaryDosha ? primaryDosha.reportId : 1}`} className="group shrink-0 inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-6 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#E5D6C8] transition-all">
                {t.ctaBtn}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="mt-10">
            <div className="mb-8 flex items-center justify-between text-[9px] text-[#7D756B] uppercase tracking-widest">
              <span>{t.question} {currentQ + 1} {t.of} {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentQ)/QUIZ_QUESTIONS.length)*100)}%</span>
            </div>
            <div className="w-full h-1 bg-[#7D756B]/20 rounded-full mb-12 overflow-hidden"><div className="h-full bg-[#B78E28] transition-all duration-500" style={{width:`${((currentQ)/QUIZ_QUESTIONS.length)*100}%`}} /></div>

            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/30 rounded-[2rem] p-8 lg:p-12">
                <h2 className="text-xl lg:text-2xl font-serif text-[#E5D6C8] leading-relaxed mb-10 text-center">{language==='hi'?QUIZ_QUESTIONS[currentQ].question.hi:QUIZ_QUESTIONS[currentQ].question.en}</h2>
                <div className="space-y-4 max-w-md mx-auto">
                  {QUIZ_QUESTIONS[currentQ].options.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(opt.points)}
                      className="w-full py-4 px-6 bg-transparent border border-[#7D756B]/40 rounded-full text-[#E5D6C8] text-xs uppercase tracking-widest hover:bg-[#B78E28]/10 hover:border-[#B78E28] transition-all text-left group flex justify-between items-center">
                      {language==='hi'?opt.hi:opt.en}
                      <ArrowRight className="w-4 h-4 text-transparent group-hover:text-[#B78E28] transition-all -translate-x-4 group-hover:translate-x-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
