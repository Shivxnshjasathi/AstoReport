'use client';

import React from 'react';
import Link from 'next/link';
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
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden py-12 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6 mb-12">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
        </div>

        {/* Contact Section matching Homepage Feel */}
        <section className="w-full py-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.title}</h2>
              <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-lg bg-gradient-to-b from-[#121212] to-[#1A1A1A] border border-[#B78E28]/30 p-10 rounded-[2.5rem] hover:border-[#B78E28]/60 transition-colors flex flex-col items-center text-center shadow-[0_10px_40px_rgba(183,142,40,0.1)]">
                <div className="w-20 h-20 bg-[#B78E28]/10 border border-[#B78E28]/30 rounded-full flex items-center justify-center mb-8">
                  <Gem className="w-8 h-8 text-[#B78E28]" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-serif text-[#E5D6C8] mb-2">{t.cardTitle}</h3>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.1em] leading-relaxed mb-10">
                  {t.cardDesc}
                </p>
                
                <div className="w-full space-y-4">
                  <a href="tel:+919818999037" className="w-full bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] py-4 rounded-full text-[10px] uppercase tracking-widest transition-colors flex justify-center items-center gap-3 font-bold">
                    <PhoneCall className="w-4 h-4" /> {t.btnCall}
                  </a>
                  <a href="https://wa.me/918604802202?text=Namaste!%20I%20am%20interested%20in%20buying%20high-quality%20astrological%20gemstones.%20Please%20guide%20me. 🙏" target="_blank" rel="noopener noreferrer" className="w-full bg-transparent border border-[#E5D6C8] text-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] py-4 rounded-full text-[10px] uppercase tracking-widest transition-colors flex justify-center items-center gap-3 font-semibold">
                    <MessageCircle className="w-4 h-4" /> {t.btnMsg}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
