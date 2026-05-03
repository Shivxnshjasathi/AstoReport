'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Star, Diamond, Crown, ShoppingCart, Check, Sparkles, CheckCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const tiers = [
  {
    name: "Foundational Blueprints",
    description: "Core planetary insights and traditional analysis.",
    icon: <Star className="w-5 h-5 text-[#B78E28]" />,
    reports: [
      { id: 1, title: "Premium Personalized Kundli", priceINR: "₹99", oldPriceINR: "₹199", priceUSD: "$1.99", oldPriceUSD: "$3.99", desc: "Your complete birth chart analysis and planetary positions." },
      { id: 2, title: "Personalized Couple Kundli", priceINR: "₹199", oldPriceINR: "₹399", priceUSD: "$3.99", oldPriceUSD: "$7.99", desc: "Detailed Guna Milan and marriage compatibility check." },
      { id: 3, title: "Lal Kitab Report", priceINR: "₹175", oldPriceINR: "₹349", priceUSD: "$3.49", oldPriceUSD: "$6.99", desc: "Practical and simple remedies based on Lal Kitab principles." },
      { id: 4, title: "Baby Name Report", priceINR: "₹99", oldPriceINR: "₹199", priceUSD: "$1.99", oldPriceUSD: "$3.99", desc: "Auspicious starting letters and Nakshatra for newborns." },
      { id: 5, title: "Name Correction Report", priceINR: "₹149", oldPriceINR: "₹299", priceUSD: "$2.99", oldPriceUSD: "$5.99", desc: "Numerological adjustments for better luck and harmony." },
    ]
  },
  {
    name: "Destiny & Life Focus",
    description: "Deep dives into your career, wealth, and relationships.",
    icon: <Diamond className="w-5 h-5 text-[#B78E28]" />,
    reports: [
      { id: 6, title: "Career Report", priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99", desc: "Discover your ideal profession and timelines for success." },
      { id: 7, title: "Love Report", priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99", desc: "Understand your romantic compatibility and soulmate indicators." },
      { id: 8, title: "Fortune Report", priceINR: "₹199", oldPriceINR: "₹399", priceUSD: "$3.99", oldPriceUSD: "$7.99", desc: "General luck, lucky numbers, and auspicious days." },
      { id: 9, title: "Fortune Report Plus", priceINR: "₹399", oldPriceINR: "₹799", priceUSD: "$7.99", oldPriceUSD: "$15.99", desc: "Advanced analysis of your Dhana Yogas (Wealth combinations)." },
      { id: 10, title: "When Will I Get Rich?", priceINR: "₹299", oldPriceINR: "₹599", priceUSD: "$5.99", oldPriceUSD: "$11.99", desc: "Precise Dasha timing for massive financial uplifts." },
    ]
  },
  {
    name: "Transits & Timelines",
    description: "Predictive astrology for the coming years.",
    icon: <Sparkles className="w-5 h-5 text-[#B78E28]" />,
    reports: [
      { id: 11, title: "2026 Yearly Horoscope Report", priceINR: "₹399", oldPriceINR: "₹799", priceUSD: "$7.99", oldPriceUSD: "$15.99", desc: "Month-by-month breakdown of exactly what to expect in 2026." },
      { id: 12, title: "Varshphal Report", priceINR: "₹349", oldPriceINR: "₹699", priceUSD: "$6.99", oldPriceUSD: "$13.99", desc: "Your solar return chart analysis for the current year." },
      { id: 13, title: "Saturn Transit Report", priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99", desc: "How Saturn's current movement will force changes in your life." },
      { id: 14, title: "Jupiter Transit Report", priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99", desc: "Where the planet of luck and expansion is blessing you right now." },
    ]
  },
  {
    name: "Karmic Doshas",
    description: "Identify blockages and perform exact remedies.",
    icon: <Crown className="w-5 h-5 text-[#B78E28]" />,
    reports: [
      { id: 15, title: "Rahu Ketu Report", priceINR: "₹299", oldPriceINR: "₹599", priceUSD: "$5.99", oldPriceUSD: "$11.99", desc: "Master the shadow planets and turn chaos into opportunity." },
      { id: 16, title: "Kaal Sarp And Manglik Dosh", priceINR: "₹349", oldPriceINR: "₹699", priceUSD: "$6.99", oldPriceUSD: "$13.99", desc: "Check for major astrological curses and their powerful remedies." },
      { id: 17, title: "Sade Sati Report", priceINR: "₹449", oldPriceINR: "₹899", priceUSD: "$8.99", oldPriceUSD: "$17.99", desc: "A comprehensive survival guide for your 7.5 years of Saturn." },
    ]
  }
];

export default function StorePage() {
  const { cart, addToCart } = useCart();

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden py-12 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6 mb-12">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs">
            <ArrowLeft className="w-4 h-4" />
            BACK
          </Link>
          <Link href="/checkout" className="flex items-center gap-2 text-[#E5D6C8] hover:text-[#B78E28] transition-colors uppercase tracking-[0.2em] text-xs">
            <ShoppingCart className="w-4 h-4" />
            <span>CART ({cart.length})</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <BookOpen className="w-8 h-8 text-[#B78E28] mx-auto mb-6" strokeWidth={1} />
          <h1 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">
            Premium Reports
          </h1>
          <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
            Unlock profound cosmic insights. Choose from our curated collection of high-precision astrological blueprints.
          </p>
        </div>

        {/* Tiers */}
        <div className="space-y-24">
          {tiers.map((tier, idx) => (
            <section key={idx}>
              <div className="flex flex-col items-center mb-12">
                <div className="flex items-center gap-3 mb-2">
                  {tier.icon}
                  <h2 className="text-2xl font-serif text-[#E5D6C8] uppercase tracking-[0.15em] font-light text-center">
                    {tier.name}
                  </h2>
                </div>
                <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] text-center">
                  {tier.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {tier.reports.map((report) => (
                  <div key={report.id} className="group relative flex flex-col justify-between bg-[#121212] border border-[#7D756B]/30 p-6 rounded-[2rem] hover:border-[#E5D6C8]/60 transition-all duration-500">
                    <div>
                      <h3 className="text-lg font-serif text-[#E5D6C8] leading-snug mb-3 pr-4">
                        {report.title}
                      </h3>
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.1em] leading-relaxed mb-8 min-h-[40px]">
                        {report.desc}
                      </p>
                    </div>
                    <div className="flex items-end justify-between mt-auto">
                      <div>
                        <div className="flex items-end gap-2">
                          <span className="block text-xl font-light text-[#B78E28]">{report.priceINR}</span>
                          <span className="block text-xs text-[#7D756B] line-through mb-1">{report.oldPriceINR}</span>
                        </div>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="block text-[10px] text-[#B78E28] uppercase">{report.priceUSD}</span>
                          <span className="block text-[8px] text-[#7D756B] line-through mb-[1px] uppercase">{report.oldPriceUSD}</span>
                        </div>
                      </div>
                      {cart.find(item => item.id === report.id) ? (
                        <button disabled className="bg-[#E5D6C8] border border-[#E5D6C8] text-[#121212] text-[10px] uppercase tracking-widest px-4 py-2 rounded-full font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> ADDED
                        </button>
                      ) : (
                        <button 
                          onClick={() => addToCart(report as any)}
                          className="bg-transparent border border-[#E5D6C8] text-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors font-semibold"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        
      </div>
    </main>
  );
}
