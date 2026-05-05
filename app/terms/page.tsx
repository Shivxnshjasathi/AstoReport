'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const termsDict = {
  en: {
    back: "BACK",
    title: "TERMS & SERVICES",
    intro: "Welcome to AstroReport. By using our services, you agree to the following terms.",
    sections: [
      {
        h: "1. Nature of Service",
        p: "AstroReport provides astrological guidance based on Vedic principles. Astrology is an interpretive science and results are for guidance only."
      },
      {
        h: "2. Accuracy of Data",
        p: "The accuracy of our reports depends entirely on the birth data (Date, Time, and Place) provided by the user. We are not responsible for errors arising from incorrect input."
      },
      {
        h: "3. Professional Advice",
        p: "Astrological reports should not be used as a substitute for professional legal, medical, or financial advice."
      }
    ]
  },
  hi: {
    back: "वापस",
    title: "नियम और शर्तें",
    intro: "AstroReport में आपका स्वागत है। हमारी सेवाओं का उपयोग करके, आप निम्नलिखित शर्तों से सहमत होते हैं।",
    sections: [
      {
        h: "1. सेवा की प्रकृति",
        p: "AstroReport वैदिक सिद्धांतों के आधार पर ज्योतिषीय मार्गदर्शन प्रदान करता है। ज्योतिष एक व्याख्यात्मक विज्ञान है और परिणाम केवल मार्गदर्शन के लिए हैं।"
      },
      {
        h: "2. डेटा की सटीकता",
        p: "हमारी रिपोर्टों की सटीकता पूरी तरह से उपयोगकर्ता द्वारा प्रदान किए गए जन्म डेटा (तारीख, समय और स्थान) पर निर्भर करती है। हम गलत इनपुट से उत्पन्न त्रुटियों के लिए जिम्मेदार नहीं हैं।"
      },
      {
        h: "3. पेशेवर सलाह",
        p: "ज्योतिषीय रिपोर्टों का उपयोग पेशेवर कानूनी, चिकित्सा या वित्तीय सलाह के विकल्प के रूप में नहीं किया जाना चाहिए।"
      }
    ]
  }
};

export default function TermsPage() {
  const { language } = useLanguage();
  const t = termsDict[language];

  return (
    <main className="min-h-screen bg-[#121212] text-[#E5D6C8] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors mb-12 uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>
        
        <h1 className="text-4xl font-serif mb-8 tracking-widest uppercase">{t.title}</h1>
        <p className="text-[#7D756B] mb-12 leading-relaxed italic">{t.intro}</p>
        
        <div className="space-y-12">
          {t.sections.map((sec, i) => (
            <div key={i} className="border-l border-[#B78E28]/30 pl-6">
              <h2 className="text-lg font-serif text-[#B78E28] mb-4 uppercase tracking-wider">{sec.h}</h2>
              <p className="text-sm text-[#7D756B] leading-relaxed tracking-wide">
                {sec.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
