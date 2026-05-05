'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Check, Sparkles, Book, ShieldCheck, Zap, Info } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useSale } from '@/app/context/SaleContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { reportsDetails } from '@/app/data/reportsDetails';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const BookMockup = dynamic(() => import('@/app/components/Product/BookMockup'), { 
  ssr: false,
  loading: () => <div className="w-[280px] h-[380px] bg-[#1A1A1A] animate-pulse rounded-xl border border-[#7D756B]/20" />
});

export default function ReportDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { cart, addToCart, removeFromCart } = useCart();
  const { isSaleActive } = useSale();
  const { language } = useLanguage();
  
  const reportId = parseInt(id);
  const report = reportsDetails[reportId];

  if (!report) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-[#E5D6C8] p-6 text-center">
        <h1 className="text-4xl font-serif mb-6 uppercase tracking-widest text-[#B78E28]">Coming Soon</h1>
        <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] mb-12 max-w-sm leading-relaxed">
          We are currently handcrafting the details for this report to ensure the highest astrological accuracy.
        </p>
        <Link href="/store" className="text-[#E5D6C8] uppercase tracking-[0.2em] text-[10px] border border-[#7D756B]/40 px-8 py-3 rounded-full hover:bg-[#E5D6C8] hover:text-[#121212] transition-all">
          Back to Store
        </Link>
      </div>
    );
  }

  const isInCart = cart.find((item: any) => item.id === report.id);
  
  const translations = {
    en: { back: "BACK", addToCart: "ADD TO CART", added: "IN CART", overview: "OVERVIEW", fixes: "WHAT IT FIXES", logic: "ASTROLOGICAL LOGIC", secure: "100% SECURE DELIVERY", delivery: "Delivered within 24 hours" },
    hi: { back: "वापस", addToCart: "कार्ट में जोड़ें", added: "कार्ट में है", overview: "विवरण", fixes: "क्या ठीक करेगा", logic: "ज्योतिषीय तर्क", secure: "100% सुरक्षित डिलीवरी", delivery: "24 घंटे के भीतर डिलीवरी" }
  };
  
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <main className="min-h-screen bg-[#121212] text-[#E5D6C8] font-sans pb-40">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[10px]">
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </button>
        <Link href="/checkout" className="flex items-center gap-2 text-[#E5D6C8] hover:text-[#B78E28] transition-colors uppercase tracking-[0.2em] text-[10px]">
          <ShoppingCart className="w-4 h-4" />
          ({cart.length})
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mt-4 lg:mt-8">
        {/* Left Side: Book Mockup */}
        <div className="lg:sticky lg:top-12 flex justify-center perspective-1000 order-1 mb-8 lg:mb-0">
          <BookMockup title={report.title[language as 'en' | 'hi']} />
        </div>

        {/* Right Side: Details */}
        <div className="space-y-8 lg:space-y-12 py-4 lg:py-8 order-2">
          <div className="text-center lg:text-left">
            {isSaleActive && (
              <div className="inline-flex items-center gap-2 bg-[#B78E28]/10 text-[#B78E28] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-[#B78E28]/30 animate-pulse">
                <Sparkles className="w-3 h-3" />
                50% OFF FLASH SALE
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-serif text-[#E5D6C8] leading-tight mb-6">
              {report.title[language as 'en' | 'hi']}
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
               <div className="flex items-center gap-2">
                 <span className="text-2xl md:text-3xl font-light text-[#B78E28]">
                   {isSaleActive ? report.priceINR : report.oldPriceINR}
                 </span>
                 {isSaleActive && <span className="text-sm text-[#7D756B] line-through">{report.oldPriceINR}</span>}
               </div>
               <div className="w-px h-8 bg-[#7D756B]/30" />
               <div className="flex items-center gap-2">
                 <span className="text-lg font-light text-[#B78E28]">
                   {isSaleActive ? report.priceUSD : report.oldPriceUSD}
                 </span>
                 {isSaleActive && <span className="text-[10px] text-[#7D756B] line-through uppercase">{report.oldPriceUSD}</span>}
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-[#1A1A1A] p-8 rounded-3xl border border-[#7D756B]/20">
              <div className="flex items-center gap-3 mb-4 text-[#B78E28]">
                <Info className="w-5 h-5" />
                <h3 className="font-serif text-lg uppercase tracking-widest">{t.overview}</h3>
              </div>
              <p className="text-[#E5D6C8]/80 leading-relaxed text-sm md:text-base">
                {report.whatIsIt[language as 'en' | 'hi']}
              </p>
            </section>

            <section className="p-8 rounded-3xl border border-[#7D756B]/10 hover:border-[#B78E28]/30 transition-all group">
              <div className="flex items-center gap-3 mb-4 text-[#B78E28]">
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-lg uppercase tracking-widest">{t.fixes}</h3>
              </div>
              <p className="text-[#E5D6C8]/80 leading-relaxed text-sm md:text-base">
                {report.whatItFixes[language as 'en' | 'hi']}
              </p>
            </section>

            <section className="p-8 rounded-3xl border border-[#7D756B]/10 hover:border-[#B78E28]/30 transition-all group">
              <div className="flex items-center gap-3 mb-4 text-[#B78E28]">
                <Book className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-lg uppercase tracking-widest">{t.logic}</h3>
              </div>
              <p className="text-[#E5D6C8]/80 leading-relaxed text-sm md:text-base italic font-serif">
                {report.astrologicalLogic[language as 'en' | 'hi']}
              </p>
            </section>
          </div>

          <div className="flex items-center gap-6 py-6 border-y border-[#7D756B]/20">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#B78E28]" />
              <span className="text-[10px] uppercase tracking-widest text-[#7D756B]">{t.secure}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#B78E28]" />
              <span className="text-[10px] uppercase tracking-widest text-[#7D756B]">{t.delivery}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-2xl border-t border-[#7D756B]/30 p-4 pb-8 md:p-6 z-[120] safe-area-bottom">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-6">
          <div className="hidden md:block">
            <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1 font-bold">Total Price</p>
            <p className="text-xl text-[#B78E28] font-light">{isSaleActive ? report.priceINR : report.oldPriceINR}</p>
          </div>

          <div className="flex-1 md:flex-initial flex gap-3 md:gap-4">
            <button
              onClick={() => {
                const waMsg = `Namaste! I want to order the *${report.title.en}* report. Please guide me. 🙏`;
                window.open(`https://wa.me/916366105204?text=${encodeURIComponent(waMsg)}`, '_blank');
              }}
              className="flex-1 md:w-48 bg-transparent border border-[#25D366] text-[#25D366] px-4 md:px-8 py-3 md:py-4 rounded-full uppercase tracking-widest text-[9px] md:text-[10px] font-bold hover:bg-[#25D366]/10 transition-all flex items-center justify-center gap-2"
            >
              WA ORDER
            </button>
            <button
              onClick={() => {
                if (isInCart) {
                  removeFromCart(report.id);
                } else {
                  addToCart(report as any);
                }
              }}
              className={`flex-1 md:w-64 px-4 md:px-8 py-3 md:py-4 rounded-full uppercase tracking-widest text-[9px] md:text-[10px] font-bold transition-all flex items-center justify-center gap-2 ${
                isInCart 
                ? 'bg-[#E5D6C8] text-[#121212] hover:bg-[#7D756B]/20 hover:text-[#E5D6C8] shadow-[0_0_20px_rgba(229,214,200,0.3)]' 
                : 'bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] shadow-[0_0_20px_rgba(183,142,40,0.3)]'
              }`}
            >
              {isInCart ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />}
              {isInCart ? t.added : t.addToCart}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
