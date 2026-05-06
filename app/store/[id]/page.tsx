'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Check, Sparkles, Book, ShieldCheck, Zap, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSale } from '../../context/SaleContext';
import { useLanguage } from '../../context/LanguageContext';
import { reportsDetails } from '../../data/reportsDetails';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
    <main className="min-h-screen bg-[#121212] text-[#E5D6C8] font-sans pb-40 relative">
      {/* Premium Hero Section */}
      <section className="relative w-full min-h-[50vh] lg:min-h-[60vh] flex flex-col items-center justify-center pt-6 pb-12 overflow-hidden border-b border-[#7D756B]/20">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/report-hero-bg.png" 
            alt="Celestial Background" 
            fill 
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="flex items-center mb-6 lg:mb-0 lg:absolute lg:top-0 lg:left-6">
            <button 
              onClick={() => router.back()} 
              className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group"
            >
              <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
              {t.back}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {isSaleActive && (
                  <div className="inline-flex items-center gap-2 bg-[#B78E28]/10 text-[#B78E28] px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest mb-6 lg:mb-8 border border-[#B78E28]/30 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    50% OFF FLASH SALE
                  </div>
                )}
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-[#E5D6C8] leading-tight mb-8">
                  {report.title[language as 'en' | 'hi']}
                </h1>
                
                <div className="flex items-center justify-center lg:justify-start gap-4 lg:gap-8 mb-10 lg:mb-12">
                   <div className="flex flex-col">
                     <span className="text-[8px] lg:text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">Domestic</span>
                     <div className="flex items-center gap-2 lg:gap-3">
                       <span className="text-2xl lg:text-4xl font-light text-[#B78E28]">
                         {isSaleActive ? report.priceINR : report.oldPriceINR}
                       </span>
                       {isSaleActive && <span className="text-[10px] lg:text-sm text-[#7D756B] line-through">{report.oldPriceINR}</span>}
                     </div>
                   </div>
                   <div className="w-px h-10 lg:h-12 bg-[#7D756B]/20" />
                   <div className="flex flex-col">
                     <span className="text-[8px] lg:text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-1">International</span>
                     <div className="flex items-center gap-2 lg:gap-3">
                       <span className="text-xl lg:text-3xl font-light text-[#B78E28]">
                         {isSaleActive ? report.priceUSD : report.oldPriceUSD}
                       </span>
                       {isSaleActive && <span className="text-[9px] lg:text-[10px] text-[#7D756B] line-through uppercase">{report.oldPriceUSD}</span>}
                     </div>
                   </div>
                </div>

                <div className="flex flex-row items-center justify-center lg:justify-start gap-3 lg:gap-4">
                  <div className="flex items-center gap-2 bg-[#1A1A1A]/50 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-[#7D756B]/20">
                    <ShieldCheck className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#B78E28]" />
                    <span className="text-[8px] lg:text-[9px] uppercase tracking-widest text-[#E5D6C8]">{t.secure}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#1A1A1A]/50 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-[#7D756B]/20">
                    <Zap className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#B78E28]" />
                    <span className="text-[8px] lg:text-[9px] uppercase tracking-widest text-[#E5D6C8]">{t.delivery}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mockup Showcase */}
            <div className="flex justify-center perspective-1000 order-2 lg:order-1 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative scale-90 lg:scale-100"
              >
                <div className="absolute -inset-10 bg-[#B78E28]/10 blur-[60px] rounded-full opacity-50" />
                <BookMockup title={report.title[language as 'en' | 'hi']} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-32">
        <div className="grid grid-cols-1 gap-10 lg:gap-12 items-start">
          <div className="space-y-10 lg:space-y-12">
            <section className="bg-[#1A1A1A]/30 backdrop-blur-md p-8 lg:p-16 rounded-[2.5rem] lg:rounded-[3rem] border border-[#7D756B]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Info className="w-24 h-24 text-[#B78E28]" />
              </div>
              <div className="flex items-center gap-4 mb-8 text-[#B78E28]">
                <div className="w-10 h-[1px] bg-[#B78E28]" />
                <h3 className="font-serif text-2xl uppercase tracking-[0.2em]">{t.overview}</h3>
              </div>
              <p className="text-[#E5D6C8]/90 leading-relaxed text-base lg:text-lg max-w-4xl">
                {report.whatIsIt[language as 'en' | 'hi']}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="p-10 rounded-[3rem] border border-[#7D756B]/10 hover:border-[#B78E28]/30 transition-all duration-700 group bg-[#121212]">
                <div className="flex items-center gap-4 mb-8 text-[#B78E28]">
                  <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-serif text-xl uppercase tracking-[0.2em]">{t.fixes}</h3>
                </div>
                <p className="text-[#7D756B] group-hover:text-[#E5D6C8] leading-relaxed text-sm lg:text-base transition-colors">
                  {report.whatItFixes[language as 'en' | 'hi']}
                </p>
              </section>

              <section className="p-10 rounded-[3rem] border border-[#7D756B]/10 hover:border-[#B78E28]/30 transition-all duration-700 group bg-[#121212]">
                <div className="flex items-center gap-4 mb-8 text-[#B78E28]">
                  <Book className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-serif text-xl uppercase tracking-[0.2em]">{t.logic}</h3>
                </div>
                <p className="text-[#7D756B] group-hover:text-[#E5D6C8] leading-relaxed text-sm lg:text-base italic font-serif transition-colors">
                  {report.astrologicalLogic[language as 'en' | 'hi']}
                </p>
              </section>
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
