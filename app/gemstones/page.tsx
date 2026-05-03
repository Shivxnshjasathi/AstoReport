'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Gem, Sparkles, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const gemstones = [
  {
    name: "Premium Sapphires",
    description: "Harness the power of Jupiter & Saturn.",
    icon: <Sparkles className="w-5 h-5 text-[#B78E28]" />,
    items: [
      { id: 101, title: "Ceylon Yellow Sapphire", priceINR: "₹25,000", priceUSD: "$299.99", desc: "For wealth, wisdom, and marriage. Certified unheated Pukhraj." },
      { id: 102, title: "Blue Sapphire (Neelam)", priceINR: "₹35,000", priceUSD: "$420.00", desc: "For career acceleration and Saturn balancing. High clarity." },
    ]
  },
  {
    name: "Emeralds & Rubies",
    description: "For intellect, business, and leadership.",
    icon: <Gem className="w-5 h-5 text-[#B78E28]" />,
    items: [
      { id: 103, title: "Zambian Emerald (Panna)", priceINR: "₹18,000", priceUSD: "$210.00", desc: "For communication, memory, and business success." },
      { id: 104, title: "Burmese Ruby (Manik)", priceINR: "₹45,000", priceUSD: "$550.00", desc: "For fame, vitality, and leadership. Powerful Sun balancing." },
    ]
  },
  {
    name: "Protective Stones",
    description: "Guard against negative planetary energies.",
    icon: <Gem className="w-5 h-5 text-[#B78E28]" />,
    items: [
      { id: 105, title: "Hessonite (Gomed)", priceINR: "₹8,500", priceUSD: "$99.99", desc: "For Rahu balancing, removing confusion, and sudden wealth." },
      { id: 106, title: "Cat's Eye (Lehsuniya)", priceINR: "₹7,200", priceUSD: "$85.00", desc: "For Ketu balancing, intuition, and spiritual growth." },
    ]
  }
];

export default function GemstonesPage() {
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
          <Gem className="w-8 h-8 text-[#B78E28] mx-auto mb-6" strokeWidth={1} />
          <h1 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">
            Premium Gemstones
          </h1>
          <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
            100% natural, untreated, and lab-certified astrological gemstones carefully sourced to balance your planetary energies.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-24">
          {gemstones.map((category, idx) => (
            <section key={idx}>
              <div className="flex flex-col items-center mb-12">
                <div className="flex items-center gap-3 mb-2">
                  {category.icon}
                  <h2 className="text-2xl font-serif text-[#E5D6C8] uppercase tracking-[0.15em] font-light text-center">
                    {category.name}
                  </h2>
                </div>
                <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] text-center">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {category.items.map((item) => (
                  <div key={item.id} className="group relative flex flex-col justify-between bg-[#121212] border border-[#7D756B]/30 p-8 rounded-[2rem] hover:border-[#E5D6C8]/60 transition-all duration-500">
                    <div>
                      <h3 className="text-xl font-serif text-[#E5D6C8] leading-snug mb-3 pr-4">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.1em] leading-relaxed mb-8 min-h-[40px]">
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex items-end justify-between mt-auto">
                      <div>
                        <span className="block text-2xl font-light text-[#B78E28]">{item.priceINR}</span>
                        <span className="block text-xs text-[#7D756B] uppercase mt-1">{item.priceUSD}</span>
                      </div>
                      {cart.find(c => c.id === item.id) ? (
                        <button disabled className="bg-[#E5D6C8] border border-[#E5D6C8] text-[#121212] text-[10px] uppercase tracking-widest px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                          <Check className="w-3 h-3" /> ADDED
                        </button>
                      ) : (
                        <button 
                          onClick={() => addToCart(item as any)}
                          className="bg-transparent border border-[#E5D6C8] text-[#E5D6C8] hover:bg-[#B78E28] hover:text-[#121212] hover:border-[#B78E28] text-[10px] uppercase tracking-widest px-6 py-3 rounded-full transition-colors font-semibold"
                        >
                          ADD TO CART
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
