'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Trash2, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSale } from '../context/SaleContext';
import { useLanguage } from '../context/LanguageContext';

const checkoutDict = {
  en: {
    back: "BACK TO STORE",
    secure: "SECURE CHECKOUT",
    summary: "Order Summary",
    empty: "Your cart is empty.",
    browse: "Browse Reports",
    total: "Total",
    details: "Your Details",
    name: "FULL NAME",
    email: "EMAIL ADDRESS",
    phone: "PHONE NUMBER",
    dob: "DATE OF BIRTH (DD/MM/YYYY)",
    tob: "TIME OF BIRTH (HH:MM AM/PM)",
    pob: "PLACE OF BIRTH (CITY, STATE, COUNTRY)",
    processing: "PROCESSING...",
    placeOrder: "PLACE ORDER",
    alert: "Your cart is empty",
    footer: "Reports will be sent to your email instantly."
  },
  hi: {
    back: "स्टोर पर वापस जाएं",
    secure: "सुरक्षित चेकआउट",
    summary: "ऑर्डर सारांश",
    empty: "आपकी कार्ट खाली है।",
    browse: "रिपोर्ट्स ब्राउज़ करें",
    total: "कुल",
    details: "आपका विवरण",
    name: "पूरा नाम",
    email: "ईमेल पता",
    phone: "फ़ोन नंबर",
    dob: "जन्म तिथि (DD/MM/YYYY)",
    tob: "जन्म का समय (HH:MM AM/PM)",
    pob: "जन्म स्थान (शहर, राज्य, देश)",
    processing: "प्रोसेसिंग...",
    placeOrder: "ऑर्डर दें",
    alert: "आपकी कार्ट खाली है",
    footer: "रिपोर्ट तुरंत आपके ईमेल पर भेजी जाएगी।"
  }
};

export default function CheckoutPage() {
  const { cart, removeFromCart, totalINR, totalUSD, clearCart } = useCart();
  const { isSaleActive } = useSale();
  const { language } = useLanguage();
  const t = checkoutDict[language];
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    tob: '',
    pob: '',
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert(t.alert);
    
    setIsProcessing(true);

    // Simulate API call and payment gateway delay
    setTimeout(() => {
      clearCart();
      router.push('/success');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] py-12 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6 mb-12">
          <Link href="/store" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#7D756B] uppercase tracking-[0.2em] text-xs">
            <ShieldCheck className="w-4 h-4" />
            {t.secure}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Order Summary (Left) */}
          <div className="flex-1">
            <h1 className="text-3xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-8 font-light">
              {t.summary}
            </h1>

            {cart.length === 0 ? (
              <div className="py-12 border-t border-[#7D756B]/30">
                <p className="text-[#7D756B] uppercase tracking-[0.2em] text-sm">{t.empty}</p>
                <Link href="/store" className="inline-block mt-6 border-b border-[#E5D6C8] pb-1 uppercase tracking-[0.2em] text-xs hover:text-[#B78E28] hover:border-[#B78E28] transition-colors">
                  {t.browse}
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start justify-between border-b border-[#7D756B]/20 pb-4 group">
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-serif text-[#E5D6C8] mb-1">{item.title}</h3>
                        <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.1em]">{item.desc}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="text-lg text-[#B78E28] font-light">
                          {isSaleActive ? item.priceINR : (item.oldPriceINR || item.priceINR)}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#7D756B] hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-[#7D756B]/50 flex items-end justify-between">
                  <span className="text-sm uppercase tracking-[0.2em] text-[#7D756B]">{t.total}</span>
                  <div className="text-right">
                    <span className="block text-3xl font-serif text-[#E5D6C8] font-light">₹{totalINR.toLocaleString('en-IN')}</span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-[#7D756B] mt-1">${totalUSD.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Form (Right) */}
          <div className="w-full lg:w-[450px]">
            <div className="bg-[#121212] border border-[#7D756B]/30 p-8 lg:p-10 rounded-[2.5rem] shadow-2xl relative">
              <h2 className="text-xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-8 font-light text-center">
                {t.details}
              </h2>

              <form onSubmit={handleCheckout} className="space-y-8">
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder={t.name}
                    className="w-full py-3 bg-transparent border-b border-[#7D756B]/50 focus:border-[#E5D6C8] focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] transition-all font-sans text-[16px] md:text-xs uppercase tracking-[0.2em] rounded-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder={t.email}
                    className="w-full py-3 bg-transparent border-b border-[#7D756B]/50 focus:border-[#E5D6C8] focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] transition-all font-sans text-[16px] md:text-xs uppercase tracking-[0.2em] rounded-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <input
                    required
                    type="tel"
                    placeholder={t.phone}
                    className="w-full py-3 bg-transparent border-b border-[#7D756B]/50 focus:border-[#E5D6C8] focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] transition-all font-sans text-[16px] md:text-xs uppercase tracking-[0.2em] rounded-none"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder={t.dob}
                    className="w-full py-3 bg-transparent border-b border-[#7D756B]/50 focus:border-[#E5D6C8] focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] transition-all font-sans text-[16px] md:text-xs uppercase tracking-[0.2em] rounded-none"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder={t.tob}
                    className="w-full py-3 bg-transparent border-b border-[#7D756B]/50 focus:border-[#E5D6C8] focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] transition-all font-sans text-[16px] md:text-xs uppercase tracking-[0.2em] rounded-none"
                    value={formData.tob}
                    onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder={t.pob}
                    className="w-full py-3 bg-transparent border-b border-[#7D756B]/50 focus:border-[#E5D6C8] focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] transition-all font-sans text-[16px] md:text-xs uppercase tracking-[0.2em] rounded-none"
                    value={formData.pob}
                    onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || cart.length === 0}
                  className="w-full mt-12 py-4 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#E5D6C8] text-[#E5D6C8] font-sans text-xs uppercase tracking-[0.2em] rounded-full transition-all flex items-center justify-center gap-3 group"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.processing}
                    </>
                  ) : (
                    <>
                      {t.placeOrder}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-[10px] text-[#7D756B] text-center uppercase tracking-[0.1em] mt-6">
                  {t.footer}
                </p>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
