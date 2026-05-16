'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, BellRing } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'DAILY UPDATES',
    title: 'WhatsApp Horoscope',
    subtitle: 'GET YOUR DAILY VEDIC HOROSCOPE, PANCHANG & MUHURAT ALERTS DIRECTLY ON WHATSAPP.',
    labelPhone: 'WHATSAPP NUMBER',
    labelName: 'YOUR NAME',
    placeholderPhone: '+91 00000 00000',
    placeholderName: 'Enter your name',
    btnSubscribe: 'SUBSCRIBE FOR FREE',
    subscribing: 'SYNCING WITH STARS...',
    successTitle: 'You are Subscribed!',
    successDesc: 'Expect your first cosmic update tomorrow at 6:00 AM.',
    benefit1: 'Daily personalized Rashi predictions',
    benefit2: 'Sunrise, Sunset & Rahu Kaal alerts',
    benefit3: 'Auspicious Muhurat for the day',
    benefit4: 'Exclusive Vedic remedies & tips',
    privacy: 'We respect your privacy. No spam, ever. Unsubscribe anytime.'
  },
  hi: {
    back: 'वापस',
    badge: 'दैनिक अपडेट',
    title: 'व्हाट्सएप राशिफल',
    subtitle: 'दैनिक वैदिक राशिफल, पंचांग और मुहूर्त अलर्ट सीधे व्हाट्सएप पर प्राप्त करें।',
    labelPhone: 'व्हाट्सएप नंबर',
    labelName: 'आपका नाम',
    placeholderPhone: '+91 00000 00000',
    placeholderName: 'अपना नाम दर्ज करें',
    btnSubscribe: 'मुफ्त में सब्सक्राइब करें',
    subscribing: 'सितारों के साथ जुड़ रहे हैं...',
    successTitle: 'आप सब्सक्राइब हो गए हैं!',
    successDesc: 'कल सुबह 6:00 बजे अपने पहले कॉस्मिक अपडेट की प्रतीक्षा करें।',
    benefit1: 'दैनिक व्यक्तिगत राशि भविष्यवाणियां',
    benefit2: 'सूर्योदय, सूर्यास्त और राहु काल अलर्ट',
    benefit3: 'दिन के लिए शुभ मुहूर्त',
    benefit4: 'विशेष वैदिक उपाय और सुझाव',
    privacy: 'हम आपकी गोपनीयता का सम्मान करते हैं। कभी कोई स्पैम नहीं। कभी भी अनसब्सक्राइब करें।'
  }
};

export default function NewsletterPage() {
  const { language } = useLanguage();
  const t = dict[language];
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#0A1A12] to-[#121212]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-green-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#B78E28]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1000px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-12">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#25D366] uppercase tracking-[0.2em] text-[9px]">
            <MessageCircle className="w-3.5 h-3.5" />
            {t.badge}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 px-4 py-2 rounded-full mb-6">
              <BellRing className="w-4 h-4 text-[#25D366]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#25D366]">NEVER MISS A MUHURAT</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif text-[#E5D6C8] uppercase tracking-[0.05em] mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-[#7D756B] text-[10px] sm:text-xs uppercase tracking-[0.2em] leading-loose mb-8">
              {t.subtitle}
            </p>

            <ul className="space-y-4 mb-8">
              {[t.benefit1, t.benefit2, t.benefit3, t.benefit4].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#E5D6C8]/80">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-[#7D756B] text-[10px] uppercase tracking-widest bg-[#1A1A1A] p-4 rounded-2xl border border-[#7D756B]/20">
              <ShieldCheck className="w-5 h-5 text-[#B78E28]" />
              {t.privacy}
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#121212]/80 backdrop-blur-xl border border-[#7D756B]/20 rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MessageCircle className="w-32 h-32 text-[#25D366]" />
              </div>
              
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative z-10 space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] text-[#7D756B] uppercase tracking-widest">{t.labelName}</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.placeholderName}
                        className="w-full bg-[#1A1A1A] border-b border-[#7D756B]/30 focus:border-[#B78E28] py-4 px-2 text-[#E5D6C8] placeholder-[#7D756B]/50 focus:outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-[#7D756B] uppercase tracking-widest">{t.labelPhone}</label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.placeholderPhone}
                        className="w-full bg-[#1A1A1A] border-b border-[#7D756B]/30 focus:border-[#B78E28] py-4 px-2 text-[#E5D6C8] placeholder-[#7D756B]/50 focus:outline-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-[#121212] py-5 rounded-full text-xs uppercase tracking-[0.2em] font-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {loading ? (
                        <><Sparkles className="w-5 h-5 animate-spin" /> {t.subscribing}</>
                      ) : (
                        <><MessageCircle className="w-5 h-5" /> {t.btnSubscribe}</>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-4">
                      {t.successTitle}
                    </h2>
                    <p className="text-sm text-[#7D756B] leading-relaxed mb-8">
                      {t.successDesc}
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-[#B78E28] text-[10px] uppercase tracking-[0.2em] hover:text-[#E5D6C8] transition-colors"
                    >
                      Return to Home <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
