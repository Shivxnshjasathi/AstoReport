'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Gem, PhoneCall, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const dict = {
  en: {
    back: "BACK",
    title: "PREMIUM GEMSTONES",
    subtitle: "CONNECT WITH OUR EXPERTS FOR HIGH QUALITY CERTIFIED GEMS. ONE CALL CAN CHANGE EVERYTHING.",
    cardTitle: "Need High Quality Gems?",
    cardDesc: "CONTACT US FOR 100% NATURAL, UNTREATED, AND LAB-CERTIFIED ASTROLOGICAL GEMSTONES. WE PROVIDE THE HIGHEST QUALITY GEMS FOR YOUR SPECIFIC COSMIC NEEDS.",
    btnCall: "CALL SUPPORT",
    btnMsg: "WHATSAPP US"
  },
  hi: {
    back: "वापस",
    title: "प्रीमियम रत्न",
    subtitle: "उच्च गुणवत्ता वाले प्रमाणित रत्नों के लिए हमारे विशेषज्ञों से जुड़ें। एक कॉल सब कुछ बदल सकती है।",
    cardTitle: "उच्च गुणवत्ता वाले रत्न चाहिए?",
    cardDesc: "100% प्राकृतिक, अनुपचारित और लैब-प्रमाणित ज्योतिषीय रत्नों के लिए हमसे संपर्क करें। हम आपकी विशिष्ट लौकिक आवश्यकताओं के लिए उच्चतम गुणवत्ता वाले रत्न प्रदान करते हैं।",
    btnCall: "कॉल समर्थन",
    btnMsg: "हमें व्हाट्सएप करें"
  }
};

export default function GemstonesPage() {
  const { language } = useLanguage();
  const t = dict[language];

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-20">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/gemstones-bg.png" 
          alt="Sacred Gemstones" 
          fill 
          className="object-cover opacity-40 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#121212]/80 to-[#121212]" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[10px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            {t.back}
          </Link>
        </div>

        {/* Content Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full py-8 lg:py-12"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-6 font-light leading-tight">{t.title}</h2>
              <p className="text-[#7D756B] text-[9px] lg:text-xs uppercase tracking-[0.2em] max-w-2xl mx-auto leading-loose px-4">
                {t.subtitle}
              </p>
            </div>

            <div className="flex justify-center px-4">
              <div className="w-full max-w-lg bg-[#121212]/60 backdrop-blur-2xl border border-[#B78E28]/30 p-8 sm:p-12 rounded-[3rem] hover:border-[#B78E28]/60 transition-colors flex flex-col items-center text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="w-20 h-20 bg-[#B78E28]/10 border border-[#B78E28]/30 rounded-full flex items-center justify-center mb-10">
                  <Gem className="w-8 h-8 text-[#B78E28]" strokeWidth={1} />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-serif text-[#E5D6C8] mb-4 tracking-wide font-light">{t.cardTitle}</h3>
                <p className="text-[#7D756B] text-[10px] lg:text-[11px] uppercase tracking-[0.15em] leading-relaxed mb-12 max-w-sm">
                  {t.cardDesc}
                </p>
                
                <div className="w-full space-y-5">
                  <a href="tel:+916366105204" className="group w-full bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] py-5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all flex justify-center items-center gap-3 font-bold shadow-[0_0_20px_rgba(183,142,40,0.2)]">
                    <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" /> {t.btnCall}
                  </a>
                  <a href="https://wa.me/916366105204?text=Namaste!%20I%20am%20interested%20in%20buying%20high-quality%20astrological%20gemstones.%20Please%20guide%20me. 🙏" target="_blank" rel="noopener noreferrer" className="group w-full bg-[#121212]/50 border border-[#E5D6C8]/30 text-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] py-5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all flex justify-center items-center gap-3 font-semibold">
                    <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" /> {t.btnMsg}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
