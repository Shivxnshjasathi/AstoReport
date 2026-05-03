'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Star } from 'lucide-react';
import { getDailyHoroscope } from './actions';

const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 
  'leo', 'virgo', 'libra', 'scorpio', 
  'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

export default function AstrologyPage() {
  const [selectedSign, setSelectedSign] = useState<string>('aries');
  const [horoscope, setHoroscope] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden py-12 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6 mb-12">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs">
            <ArrowLeft className="w-4 h-4" />
            BACK
          </Link>
          <div className="flex items-center gap-2 text-[#E5D6C8] uppercase tracking-[0.2em] text-xs">
            <Star className="w-4 h-4" />
            DAILY HOROSCOPE
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">
            Cosmic Forecast
          </h1>
          <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
            Select your sun sign to receive your daily astrological guidance.
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
                  {sign}
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
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7D756B]">Reading the stars...</p>
                </div>
              ) : horoscope ? (
                <>
                  <div className="flex items-center justify-between border-b border-[#7D756B]/20 pb-6 mb-8">
                    <div>
                      <h2 className="text-3xl font-serif text-[#B78E28] uppercase tracking-[0.15em] mb-2">{selectedSign}</h2>
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
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">Mood</p>
                      <p className="text-xs text-[#E5D6C8] uppercase tracking-[0.1em]">{horoscope.mood}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">Color</p>
                      <p className="text-xs text-[#E5D6C8] uppercase tracking-[0.1em]">{horoscope.color}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">Lucky No.</p>
                      <p className="text-xs text-[#B78E28] font-serif">{horoscope.lucky_number}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">Lucky Time</p>
                      <p className="text-xs text-[#B78E28] font-serif">{horoscope.lucky_time}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7D756B]">Select a sign to view horoscope</p>
                </div>
              )}
            </div>
            
            {/* Upsell / CTA */}
            <div className="mt-8 bg-[#E5D6C8]/5 border border-[#B78E28]/30 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="text-[#E5D6C8] text-sm uppercase tracking-[0.1em] mb-1">Want a deeper analysis?</h3>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.1em]">Get a personalized premium report.</p>
              </div>
              <Link href="/store" className="bg-transparent border border-[#B78E28] text-[#B78E28] hover:bg-[#B78E28] hover:text-[#121212] px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-colors font-semibold">
                BUY FULL REPORT
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
