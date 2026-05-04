'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const successDict = {
  en: {
    title: "Order Confirmed",
    desc: "Your cosmic insights are being prepared. The premium reports will be delivered to your email address shortly.",
    check: "Check your inbox in 5-10 minutes",
    home: "RETURN TO HOME"
  },
  hi: {
    title: "ऑर्डर की पुष्टि",
    desc: "आपकी लौकिक अंतर्दृष्टि तैयार की जा रही है। प्रीमियम रिपोर्ट जल्द ही आपके ईमेल पते पर दी जाएंगी।",
    check: "5-10 मिनट में अपना इनबॉक्स जांचें",
    home: "होम पर लौटें"
  }
};

export default function SuccessPage() {
  const { language } = useLanguage();
  const t = successDict[language];

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] flex items-center justify-center py-12 px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] max-w-[800px] aspect-square rounded-full border-[0.5px] border-[#7D756B]/20 flex items-center justify-center">
          <div className="w-[75%] aspect-square rounded-full bg-[#E5D6C8]/5" />
        </div>
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        <div className="w-24 h-24 mx-auto border border-[#B78E28] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(183,142,40,0.15)]">
          <CheckCircle className="w-10 h-10 text-[#B78E28]" strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-6 font-light">
          {t.title}
        </h1>
        
        <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] leading-relaxed mb-12">
          {t.desc}
        </p>

        <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/30 p-6 rounded-3xl mb-12 flex items-center justify-center gap-4">
          <Mail className="w-5 h-5 text-[#B78E28]" />
          <span className="text-xs text-[#E5D6C8] uppercase tracking-[0.1em]">{t.check}</span>
        </div>

        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[#E5D6C8] px-8 py-4 uppercase tracking-[0.2em] text-xs rounded-full transition-all group font-semibold"
        >
          {t.home}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
}
