'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const privacyDict = {
  en: {
    back: "BACK",
    title: "PRIVACY POLICY",
    intro: "Your privacy is our priority. This policy outlines how we handle your birth data and personal information.",
    sections: [
      {
        h: "1. Data Collection",
        p: "We collect birth details (Name, DOB, TOB, POB) solely to generate your personalized reports. This data is not shared with any third parties except for the purpose of order fulfillment."
      },
      {
        h: "2. WhatsApp Integration",
        p: "Orders are processed via WhatsApp. By initiating an order, you agree to receive communications from our official business number regarding your reports."
      },
      {
        h: "3. Data Security",
        p: "We use standard security measures to protect your information. Your birth details are used exclusively for calculation and are not stored in any public-facing database."
      }
    ]
  },
  hi: {
    back: "वापस",
    title: "गोपनीयता नीति",
    intro: "आपकी गोपनीयता हमारी प्राथमिकता है। यह नीति बताती है कि हम आपके जन्म डेटा और व्यक्तिगत जानकारी को कैसे संभालते हैं।",
    sections: [
      {
        h: "1. डेटा संग्रह",
        p: "हम केवल आपकी व्यक्तिगत रिपोर्ट तैयार करने के लिए जन्म विवरण (नाम, जन्म तिथि, जन्म समय, जन्म स्थान) एकत्र करते हैं। यह डेटा ऑर्डर पूरा करने के उद्देश्य के अलावा किसी भी तीसरे पक्ष के साथ साझा नहीं किया जाता है।"
      },
      {
        h: "2. व्हाट्सएप एकीकरण",
        p: "ऑर्डर व्हाट्सएप के माध्यम से संसाधित किए जाते हैं। ऑर्डर शुरू करके, आप अपनी रिपोर्ट के संबंध में हमारे आधिकारिक व्यावसायिक नंबर से संचार प्राप्त करने के लिए सहमत होते हैं।"
      },
      {
        h: "3. डेटा सुरक्षा",
        p: "हम आपकी जानकारी की सुरक्षा के लिए मानक सुरक्षा उपायों का उपयोग करते हैं। आपके जन्म विवरण का उपयोग विशेष रूप से गणना के लिए किया जाता है और इसे किसी भी सार्वजनिक डेटाबेस में संग्रहीत नहीं किया जाता है।"
      }
    ]
  }
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const t = privacyDict[language];

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
