'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Trash2, ShieldCheck, Loader2, CheckCircle, Zap, MessageCircle } from 'lucide-react';
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
    placeOrder: "CONFIRM ON WHATSAPP",
    waNote: "Clicking this will open WhatsApp to personally confirm your order details with us.",
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
    placeOrder: "व्हाट्सएप पर ऑर्डर दें",
    waNote: "इस पर क्लिक करने से हमारे साथ आपके ऑर्डर की व्यक्तिगत रूप से पुष्टि करने के लिए व्हाट्सएप खुल जाएगा।",
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
  const [orderDone, setOrderDone] = useState(false);
  const [referredBy, setReferredBy] = useState('');
  const [myCode, setMyCode] = useState('');

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
    const slug = formData.name.trim().toUpperCase().replace(/\s+/g,'').slice(0, 8);
    const code = `ASTRO-${slug}-20`;
    setMyCode(code);

    // Build WhatsApp order message
    const itemsList = cart.map(item => `• ${item.title} — ${isSaleActive ? item.priceINR : (item.oldPriceINR || item.priceINR)}`).join('%0A');
    const message =
      `🙏 *Namaste! We would like to order a report from AstroReport.*%0A%0A` +
      `*Customer Details:*%0A` +
      `👤 Name: ${formData.name}%0A` +
      `📞 Phone: ${formData.phone}%0A` +
      `📧 Email: ${formData.email}%0A` +
      `🎂 Date of Birth: ${formData.dob}%0A` +
      `⏰ Time of Birth: ${formData.tob}%0A` +
      `📍 Place of Birth: ${formData.pob}%0A` +
      (referredBy ? `🎁 Referred By: ${referredBy}%0A` : '') +
      `%0A*Reports Requested:*%0A${itemsList}%0A%0A` +
      `*Total: ₹${totalINR.toLocaleString('en-IN')}*%0A%0A` +
      `Please send the accurate & detailed report on this WhatsApp number.%0A%0A` +
      `📋 *Note:* We are happy to wait 4–5 days for the complete accurate report. 🌟%0A%0A` +
      `Thank you! 🙏`;

    setTimeout(() => {
      clearCart();
      window.open(`https://wa.me/916366105204?text=${message}`, '_blank');
      setOrderDone(true);
      setIsProcessing(false);
    }, 1500);
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
                
                <div className="pt-6 border-t border-[#7D756B]/50 space-y-4">
                  {/* Referred By */}
                  <div className="space-y-1">
                    <p className="text-[9px] text-[#7D756B] uppercase tracking-widest">
                      {language === 'hi' ? 'किसने रेफर किया? (वैकल्पिक)' : 'Referred by (Optional)'}
                    </p>
                    <input
                      type="text"
                      value={referredBy}
                      onChange={e => setReferredBy(e.target.value)}
                      placeholder={language === 'hi' ? 'दोस्त का नाम या कोड' : "Friend's name or code"}
                      className="w-full py-2 px-3 bg-transparent border border-[#7D756B]/30 focus:border-[#B78E28] focus:outline-none text-[#E5D6C8] placeholder-[#7D756B]/50 text-[10px] rounded-xl transition-colors"
                    />
                    <p className="text-[9px] text-[#7D756B]/60 tracking-wide">
                      {language === 'hi' ? '✦ अगली बार उन्हें छूट मिलेगी' : '✦ They will get a discount next time'}
                    </p>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <span className="text-sm uppercase tracking-[0.2em] text-[#7D756B]">{t.total}</span>
                    <span className="text-3xl font-serif text-[#E5D6C8] font-light">₹{totalINR.toLocaleString('en-IN')}</span>
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
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      {t.placeOrder}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-[9px] text-[#7D756B]/60 text-center uppercase tracking-widest mt-4 italic">
                  {t.waNote}
                </p>

                <p className="text-[10px] text-[#7D756B] text-center uppercase tracking-[0.1em] mt-6">
                  {t.footer}
                </p>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-[#7D756B]/20 grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#B78E28]" />
                    <span className="text-[8px] uppercase tracking-widest text-[#7D756B]">256-bit Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#B78E28]" />
                    <span className="text-[8px] uppercase tracking-widest text-[#7D756B]">100% Satisfaction</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Zap className="w-5 h-5 text-[#B78E28]" />
                    <span className="text-[8px] uppercase tracking-widest text-[#7D756B]">Instant Delivery</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
        </div>
        {/* POST-ORDER: Show referral code */}
        {orderDone && myCode && (
          <div className="fixed inset-0 z-[100] bg-[#121212]/95 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-[#1A1A1A] border border-[#B78E28]/30 rounded-[2.5rem] p-10 max-w-md w-full text-center space-y-6 shadow-[0_0_60px_rgba(183,142,40,0.15)]">
              <div className="w-16 h-16 bg-[#B78E28]/10 border border-[#B78E28]/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎉</span>
              </div>
              <div>
                <h2 className="text-xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-2">
                  {language === 'hi' ? 'ऑर्डर हो गया!' : 'Order Placed!'}
                </h2>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-widest leading-relaxed">
                  {language === 'hi'
                    ? 'आपकी रिपोर्ट 4–5 दिनों में व्हाट्सएप पर भेजी जाएगी।'
                    : 'Your report will be sent on WhatsApp within 4–5 days.'}
                </p>
              </div>
              <div className="border-t border-[#7D756B]/20 pt-6 space-y-3">
                <p className="text-[10px] text-[#7D756B] uppercase tracking-widest">
                  {language === 'hi' ? '🎁 आपका रेफरल कोड — दोस्तों को शेयर करें' : '🎁 Your referral code — share with friends'}
                </p>
                <div className="flex items-center justify-between bg-[#121212] border border-[#B78E28]/30 rounded-xl px-5 py-4">
                  <span className="font-mono text-[#B78E28] text-base tracking-widest font-bold">{myCode}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(myCode)}
                    className="text-[9px] uppercase tracking-widest text-[#7D756B] hover:text-[#E5D6C8] transition-colors"
                  >
                    {language === 'hi' ? 'कॉपी' : 'COPY'}
                  </button>
                </div>
                <p className="text-[9px] text-[#7D756B]/60 uppercase tracking-widest">
                  {language === 'hi'
                    ? 'जो दोस्त यह कोड दें उन्हें अगली बार छूट मिलेगी'
                    : 'Friends who share this code get a discount next time'}
                </p>
                <button
                  onClick={() => {
                    const msg = language === 'hi'
                      ? `🌟 *AstroReport* से सटीक ज्योतिष रिपोर्ट पाएं!%0A%0Aमैंने अभी अपनी रिपोर्ट ऑर्डर की — बहुत अच्छी सेवा है!%0A%0Aऑर्डर करते समय मेरा नाम दें: *${myCode}* — आपको अगली बार छूट मिलेगी! 🙏%0A%0Ahttps://astro-report.vercel.app/store`
                      : `🌟 Get accurate Vedic astrology reports from *AstroReport*!%0A%0AI just ordered mine — great service!%0A%0AMention my name at checkout: *${myCode}* — you may get a discount next time! 🙏%0A%0Ahttps://astro-report.vercel.app/store`;
                    window.open(`https://wa.me/?text=${msg}`, '_blank');
                  }}
                  className="w-full py-3 bg-[#25D366] text-white hover:brightness-110 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  {language === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}
                </button>
              </div>
              <button
                onClick={() => router.push('/')}
                className="text-[10px] text-[#7D756B] uppercase tracking-widest hover:text-[#E5D6C8] transition-colors"
              >
                {language === 'hi' ? 'होम पर जाएं →' : 'Go to Home →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
