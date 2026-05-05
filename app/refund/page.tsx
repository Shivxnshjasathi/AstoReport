'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const refundDict = {
  en: {
    back: "BACK",
    title: "REFUND POLICY",
    intro: "We aim for total clarity. Below is our policy regarding payments and refunds.",
    sections: [
      {
        h: "1. Nature of Product",
        p: "Our reports are personalized digital products generated based on specific birth data. Once a report has been manually curated and delivered, we generally do not offer refunds."
      },
      {
        h: "2. Delivery Delays",
        p: "Standard delivery time is 24-48 hours. If you do not receive your report within 4 business days due to our error, you are eligible for a full refund or a free secondary report."
      },
      {
        h: "3. Incorrect Input",
        p: "Refunds are not provided if the report was generated based on incorrect birth data provided by the user. Please double-check your details before submitting."
      }
    ]
  },
  hi: {
    back: "वापस",
    title: "वापसी नीति",
    intro: "हम पूर्ण स्पष्टता का लक्ष्य रखते हैं। नीचे भुगतान और धनवापसी के संबंध में हमारी नीति है।",
    sections: [
      {
        h: "1. उत्पाद की प्रकृति",
        p: "हमारी रिपोर्ट विशिष्ट जन्म डेटा के आधार पर तैयार किए गए व्यक्तिगत डिजिटल उत्पाद हैं। एक बार रिपोर्ट तैयार होने और वितरित होने के बाद, हम आमतौर पर धनवापसी की पेशकश नहीं करते हैं।"
      },
      {
        h: "2. वितरण में देरी",
        p: "मानक वितरण समय 24-48 घंटे है। यदि आप हमारी त्रुटि के कारण 4 व्यावसायिक दिनों के भीतर अपनी रिपोर्ट प्राप्त नहीं करते हैं, तो आप पूर्ण धनवापसी या मानार्थ दूसरी रिपोर्ट के पात्र हैं।"
      },
      {
        h: "3. गलत इनपुट",
        p: "यदि रिपोर्ट उपयोगकर्ता द्वारा प्रदान किए गए गलत जन्म डेटा के आधार पर तैयार की गई थी, तो धनवापसी प्रदान नहीं की जाएगी। कृपया सबमिट करने से पहले अपने विवरण दोबारा जांचें।"
      }
    ]
  }
};

export default function RefundPage() {
  const { language } = useLanguage();
  const t = refundDict[language];

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
