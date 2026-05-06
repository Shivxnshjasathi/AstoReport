'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, Star } from 'lucide-react';
import { getDailyHoroscope } from './actions';
import { useLanguage } from '../context/LanguageContext';

const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 
  'leo', 'virgo', 'libra', 'scorpio', 
  'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const astroDict = {
  en: {
    back: "BACK",
    daily: "DAILY HOROSCOPE",
    title: "Cosmic Forecast",
    desc: "Select your sun sign to receive your daily astrological guidance.",
    reading: "Reading the stars...",
    mood: "Mood",
    color: "Color",
    luckyNum: "Lucky No.",
    luckyTime: "Lucky Time",
    selectSign: "Select a sign to view horoscope",
    wantDeeper: "Want a deeper analysis?",
    getPremium: "Get a personalized premium report.",
    buyReport: "BUY FULL REPORT",
    signs: {
      aries: "Aries", taurus: "Taurus", gemini: "Gemini", cancer: "Cancer", 
      leo: "Leo", virgo: "Virgo", libra: "Libra", scorpio: "Scorpio", 
      sagittarius: "Sagittarius", capricorn: "Capricorn", aquarius: "Aquarius", pisces: "Pisces"
    }
  },
  hi: {
    back: "वापस",
    daily: "दैनिक राशिफल",
    title: "लौकिक पूर्वानुमान",
    desc: "अपना दैनिक ज्योतिषीय मार्गदर्शन प्राप्त करने के लिए अपनी सूर्य राशि चुनें।",
    reading: "सितारों को पढ़ रहे हैं...",
    mood: "मनोदशा",
    color: "रंग",
    luckyNum: "शुभ अंक",
    luckyTime: "शुभ समय",
    selectSign: "राशिफल देखने के लिए राशि चुनें",
    wantDeeper: "गहन विश्लेषण चाहते हैं?",
    getPremium: "एक व्यक्तिगत प्रीमियम रिपोर्ट प्राप्त करें।",
    buyReport: "पूरी रिपोर्ट खरीदें",
    signs: {
      aries: "मेष", taurus: "वृषभ", gemini: "मिथुन", cancer: "कर्क", 
      leo: "सिंह", virgo: "कन्या", libra: "तुला", scorpio: "वृश्चिक", 
      sagittarius: "धनु", capricorn: "मकर", aquarius: "कुंभ", pisces: "मीन"
    }
  }
};

export default function AstrologyPage() {
  const [selectedSign, setSelectedSign] = useState<string>('aries');
  const [horoscope, setHoroscope] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { language } = useLanguage();
  const t = astroDict[language];

  const fetchHoroscope = async (sign: string) => {
    setSelectedSign(sign);
    setLoading(true);
    try {
      const data = await getDailyHoroscope(sign);
      setHoroscope(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial on mount
  React.useEffect(() => {
    fetchHoroscope('aries');
  }, []);

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/horoscope-bg.png" 
          alt="Zodiac Constellations" 
          fill 
          className="object-cover opacity-30 scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#121212]/80 to-[#121212]" />
      </div>

      <div className="max-w-[1200px] mx-auto w-full pt-12 px-4 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6 mb-12">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#E5D6C8] uppercase tracking-[0.2em] text-[9px]">
            <Star className="w-4 h-4 text-[#B78E28]" />
            {t.daily}
          </div>
        </div>

        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light leading-tight">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-[9px] sm:text-xs uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed px-4">
            {t.desc}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sign Selector */}
          <div className="w-full lg:w-1/3">
            <div className="grid grid-cols-2 gap-3">
              {ZODIAC_SIGNS.map(sign => (
                <button
                  key={sign}
                  onClick={() => fetchHoroscope(sign)}
                  className={`py-4 px-2 border rounded-xl text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                    selectedSign === sign 
                      ? 'border-[#B78E28] bg-[#B78E28]/10 text-[#B78E28]' 
                      : 'border-[#7D756B]/30 text-[#7D756B] hover:border-[#E5D6C8]/50 hover:text-[#E5D6C8]'
                  }`}
                >
                  {(t.signs as any)[sign]}
                </button>
              ))}
            </div>
          </div>

          {/* Horoscope Display */}
          <div className="flex-1">
            <div className="bg-[#121212] border border-[#7D756B]/30 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl min-h-[400px] flex flex-col relative overflow-hidden">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center opacity-50 animate-pulse">
                  <Sparkles className="w-8 h-8 text-[#B78E28] mb-4" />
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7D756B]">{t.reading}</p>
                </div>
              ) : horoscope ? (
                <>
                  <div className="flex items-center justify-between border-b border-[#7D756B]/20 pb-6 mb-8">
                    <div>
                      <h2 className="text-3xl font-serif text-[#B78E28] uppercase tracking-[0.15em] mb-2">{(t.signs as any)[selectedSign]}</h2>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#7D756B]">{horoscope.date_range}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#E5D6C8]">{horoscope.current_date}</p>
                    </div>
                  </div>

                  <p className="text-[#E5D6C8] text-sm md:text-base leading-loose font-light mb-12 flex-1">
                    {horoscope.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#7D756B]/20">
                    <div>
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">{t.mood}</p>
                      <p className="text-xs text-[#E5D6C8] uppercase tracking-[0.1em]">{horoscope.mood}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">{t.color}</p>
                      <p className="text-xs text-[#E5D6C8] uppercase tracking-[0.1em]">{horoscope.color}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">{t.luckyNum}</p>
                      <p className="text-xs text-[#B78E28] font-serif">{horoscope.lucky_number}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">{t.luckyTime}</p>
                      <p className="text-xs text-[#B78E28] font-serif">{horoscope.lucky_time}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7D756B]">{t.selectSign}</p>
                </div>
              )}
            </div>
            
            {/* Upsell / CTA */}
            <div className="mt-8 bg-[#E5D6C8]/5 border border-[#B78E28]/30 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="text-[#E5D6C8] text-sm uppercase tracking-[0.1em] mb-1">{t.wantDeeper}</h3>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.1em]">{t.getPremium}</p>
              </div>
              <Link href="/store" className="bg-transparent border border-[#B78E28] text-[#B78E28] hover:bg-[#B78E28] hover:text-[#121212] px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-colors font-semibold text-center leading-tight">
                {t.buyReport}
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
