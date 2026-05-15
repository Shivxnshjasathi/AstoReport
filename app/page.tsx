'use client';
import { useState } from 'react';
import BirthInputForm from './components/Form/BirthInputForm';
import { ArrowRight, Sun, Moon, PhoneCall, MessageCircle, Star, ShieldCheck, PlayCircle, BookOpen, Gem, Users, BookMarked, Activity, ArrowUpRight, ShoppingCart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './context/LanguageContext';
import { useCart } from './context/CartContext';
import { motion, useScroll, useTransform } from 'framer-motion';

const dict = {
  en: {
    navGemstones: "GEMSTONES",
    navHoroscopes: "HOROSCOPES",
    navTarot: "TAROT",
    navReports: "REPORTS",
    navContact: "CONTACT US",
    heroTitle1: "A Deeper",
    heroTitle2: "Understanding",
    heroTitle3: "Of Your Life",
    heroDesc: "Refined Vedic insights designed to guide your decisions. Explore your cosmic blueprint.",
    heroBtn: "GENERATE PREMIUM REPORT",
    heroTag: "✦ Vedic Astrology & Spiritual Guidance",
    formTitle: "Get Your Free Kundli",
    formDesc: "Clear insights into your life, career, and relationships.",
    qsGemstones: "Buy Gemstones",
    qsReports: "Explore Reports",
    connectTitle: "Need Guidance?",
    connectDesc: "Not sure which report to choose? Our support team will help match you with the perfect Pandit for your specific cosmic needs.",
    expertTitle: "Curated by Vedic Experts",
    expertDesc: "Every algorithm and report is strictly verified by authentic Pandits and Astrologers with 15+ years of experience.",
    expert1Name: "Acharya Sharma",
    expert1Tag: "20+ Yrs Experience",
    expert2Name: "Dr. K. Verma",
    expert2Tag: "Vedic Scholar",
    footerAbout: "A trusted guide in Vedic Astrology. Built on research, ethics, and responsibility.",
    footerExplore: "Explore More",
    footerLang: "Language",
    footerGemstones: "Premium Gemstones",
    footerReports: "Explore Reports",
    footerCalc: "Free Calculators",
    footerContact: "Contact Support",
    footerCopy: "All rights reserved © AstroReport 2026",
    footerTerms: "Terms & Services",
    footerPrivacy: "Privacy Policy",
    footerRefund: "Refund Policy",
    testimonialTitle: "Real Cosmic Impact",
    testimonialDesc: "Our community's journey through the stars.",
    t1Quote: "\"The Career Report told me to pivot in October 2025, and I got a 30% raise within two months. Absolutely frightening how accurate it was.\"",
    t1Name: "Rohan M.",
    t1Location: "Delhi, India",
    t2Quote: "\"We were facing so many delays in our marriage. The couples Kundli and the remedies suggested changed the energy in our home completely.\"",
    t2Name: "Priya & Aman",
    t2Location: "Mumbai, India",
    t3Quote: "\"I consult the 2026 Yearly Report every single month. It's like having a cheat code for life's obstacles.\"",
    t3Name: "Sarah K.",
    t3Location: "Indiana, USA",
    qsTitle: "Divine Offerings",
    qsDesc: "Explore sacred gemstones and high-precision blueprints curated for your cosmic alignment.",
  },
  hi: {
    navGemstones: "रत्न",
    navHoroscopes: "राशिफल",
    navTarot: "टैरो",
    navReports: "रिपोर्ट्स",
    navContact: "संपर्क करें",
    heroTitle1: "आपके जीवन की",
    heroTitle2: "गहरी समझ",
    heroTitle3: "और मार्गदर्शन",
    heroDesc: "आपके निर्णयों का मार्गदर्शन करने के लिए परिष्कृत वैदिक अंतर्दृष्टि। अपनी लौकिक रूपरेखा का अन्वेषण करें।",
    heroBtn: "प्रीमियम रिपोर्ट जनरेट करें",
    heroTag: "✦ वैदिक ज्योतिष और आध्यात्मिक मार्गदर्शन",
    formTitle: "अपनी निःशुल्क कुंडली प्राप्त करें",
    formDesc: "जीवन, करियर और रिश्तों की स्पष्ट अंतर्दृष्टि।",
    qsGemstones: "रत्न खरीदें",
    qsReports: "रिपोर्ट देखें",
    connectTitle: "मार्गदर्शन चाहिए?",
    connectDesc: "सुनिश्चित नहीं हैं कि कौन सी रिपोर्ट चुनें? हमारी सहायता टीम आपको आपकी विशिष्ट आवश्यकताओं के लिए सही पंडित से मिलाने में मदद करेगी।",
    expertTitle: "वैदिक विशेषज्ञों द्वारा निर्मित",
    expertDesc: "प्रत्येक एल्गोरिदम और रिपोर्ट को 15+ वर्षों के अनुभव वाले प्रामाणिक पंडितों द्वारा सत्यापित किया जाता है।",
    expert1Name: "आचार्य शर्मा",
    expert1Tag: "20+ वर्षों का अनुभव",
    expert2Name: "डॉ. के. वर्मा",
    expert2Tag: "वैदिक विद्वान",
    footerAbout: "वैदिक ज्योतिष में एक विश्वसनीय मार्गदर्शक। अनुसंधान और नैतिकता पर निर्मित।",
    footerExplore: "अन्य सेवाएं",
    footerLang: "भाषा बदलें",
    footerGemstones: "प्रीमियम रत्न",
    footerReports: "रिपोर्ट्स देखें",
    footerCalc: "मुफ्त कैलकुलेटर",
    footerContact: "सहायता",
    footerCopy: "सभी अधिकार सुरक्षित © AstroReport 2026",
    footerTerms: "नियम और सेवाएं",
    footerPrivacy: "गोपनीयता नीति",
    footerRefund: "वापसी नीति",
    testimonialTitle: "वास्तविक लौकिक प्रभाव",
    testimonialDesc: "सितारों के माध्यम से हमारे समुदाय की यात्रा।",
    t1Quote: "\"करियर रिपोर्ट ने मुझे अक्टूबर 2025 में बदलाव करने के लिए कहा, और मुझे दो महीने के भीतर 30% वेतन वृद्धि मिली। यह अविश्वसनीय रूप से सटीक था।\"",
    t1Name: "रोहन एम.",
    t1Location: "दिल्ली, भारत",
    t2Quote: "\"हम अपनी शादी में बहुत देरी का सामना कर रहे थे। युगल कुंडली और सुझाए गए उपायों ने हमारे घर की ऊर्जा को पूरी तरह बदल दिया।\"",
    t2Name: "प्रिया और अमन",
    t2Location: "मुंबई, भारत",
    t3Quote: "\"मैं हर महीने 2026 की वार्षिक रिपोर्ट देखता हूं। यह जीवन की बाधाओं के लिए चीट कोड रखने जैसा है।\"",
    t3Name: "सारा के.",
    t3Location: "लंदन, यूके",
    qsTitle: "दिव्य भेंट",
    qsDesc: "अपने लौकिक संरेखण के लिए क्यूरेट किए गए पवित्र रत्नों और उच्च-सटीक ब्लूप्रिंट का अन्वेषण करें।",
  }
};

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const t = dict[language];
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, -120]);
  const parallaxOpacity = useTransform(scrollY, [0, 400], [0.3, 0.0]);

  const handleShare = () => {
    const msg = "Check out AstroReport for Vedic insights!";
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans flex flex-col relative overflow-hidden">
      
      <nav className="flex justify-center items-center gap-6 lg:gap-16 py-6 px-4 text-[#E5D6C8] text-[10px] lg:text-xs tracking-[0.2em] uppercase border-b border-[#7D756B]/20 w-full z-50 bg-[#121212]/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-6 lg:gap-16">
          <Link href="/gemstones" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navGemstones}</Link>
          <Link href="/astrology" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navHoroscopes}</Link>
          <Link href="/tarot" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navTarot}</Link>
        </div>
        
        <div className="flex items-center gap-4 text-[#E5D6C8] mx-4 lg:mx-8">
          <Sun className="w-5 h-5 font-light" strokeWidth={1} />
          <span className="text-2xl font-serif font-light">✧</span>
          <Moon className="w-5 h-5 font-light" strokeWidth={1} />
        </div>
        
        <div className="flex items-center gap-6 lg:gap-16">
          <Link href="/store" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navReports}</Link>
          <Link href="/contact" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navContact}</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center py-12 lg:py-20 overflow-hidden">
        {/* Parallax Celestial Background */}
        <motion.div 
          style={{ y: parallaxY, opacity: parallaxOpacity }} 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {/* Decorative Rings */}
          <div className="absolute w-[800px] h-[800px] rounded-full border border-[#7D756B]/10 animate-[spin_120s_linear_infinite]" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-[#7D756B]/20 animate-[spin_80s_linear_infinite_reverse]" />
          
          {/* Animated Zodiac Wheel Overlay */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1000px] h-[1000px] opacity-10"
          >
            <Image src="/zodiac-wheel.png" alt="Zodiac Wheel" fill className="object-contain" sizes="(max-width: 768px) 100vw, 1000px" quality={50} loading="eager" />
          </motion.div>
        </motion.div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 px-6 lg:px-12 w-full">
          
          <div className="text-center lg:text-left order-1 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#B78E28]/10 border border-[#B78E28]/30 px-4 py-2 rounded-full mb-8"
            >
              <Sparkles className="w-3 h-3 text-[#B78E28]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B78E28]">{t.heroTag}</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-[#E5D6C8] leading-[1.1] mb-6 lg:mb-8 uppercase font-light">
              {t.heroTitle1} <br />
              <span className="text-[#B78E28] italic normal-case">{t.heroTitle2}</span> <br />
              {t.heroTitle3}
            </h1>
            
            <p className="text-[#7D756B] text-xs lg:text-sm max-w-md mx-auto lg:mx-0 mb-12 leading-relaxed uppercase tracking-[0.2em]">
              {t.heroDesc}
            </p>

            <Link href="/store" className="group relative inline-flex items-center gap-6 bg-[#B78E28] text-[#121212] px-10 py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(183,142,40,0.4)]">
              <span className="relative z-10">{t.heroBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#E5D6C8] to-[#B78E28] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <div className="relative order-2 lg:order-2 flex justify-center">
            <div className="relative z-10 w-full max-w-md">
              <div className="absolute -inset-10 bg-[#B78E28]/10 blur-[100px] rounded-full opacity-50" />
              <div className="relative bg-[#121212]/60 backdrop-blur-xl border border-[#7D756B]/30 rounded-[3rem] p-8 sm:p-12 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B78E28]/50 to-transparent" />
                <h3 className="text-center font-serif text-[#E5D6C8] text-xl mb-2 tracking-widest uppercase font-light">{t.formTitle}</h3>
                <p className="text-center text-[#7D756B] text-[10px] uppercase tracking-[0.1em] mb-10">{t.formDesc}</p>
                <BirthInputForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="pt-6 pb-12 lg:pt-12 lg:pb-20 px-4 lg:px-12 relative overflow-hidden bg-[#121212]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 lg:mb-6 font-light leading-tight">
              {t.qsTitle}
            </h2>
            <div className="w-16 lg:w-24 h-[1px] bg-[#B78E28] mx-auto mb-6 lg:mb-8" />
            <p className="text-[#7D756B] text-[8px] sm:text-xs uppercase tracking-[0.2em] lg:tracking-[0.3em] max-w-2xl mx-auto leading-loose px-4">
              {t.qsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <Link href="/gemstones" className="group h-[30rem] lg:h-[40rem] relative rounded-[3rem] overflow-hidden border border-[#7D756B]/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent z-10" />
              <Image src="/gemstones-showcase.png" alt="Gemstones" fill className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
              <div className="absolute bottom-12 left-12 z-20">
                <span className="text-[#B78E28] text-[10px] uppercase tracking-[0.3em] mb-4 block opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Celestial Remedies</span>
                <h3 className="text-3xl lg:text-5xl font-serif mb-4 text-[#E5D6C8]">{t.qsGemstones}</h3>
                <div className="w-12 h-[1px] bg-[#B78E28] group-hover:w-32 transition-all duration-700" />
              </div>
            </Link>
            
            <Link href="/store" className="group h-[30rem] lg:h-[40rem] relative rounded-[3rem] overflow-hidden border border-[#7D756B]/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent z-10" />
              <Image src="/reports-showcase.png" alt="Astrology Reports" fill className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
              <div className="absolute bottom-12 left-12 z-20">
                <span className="text-[#B78E28] text-[10px] uppercase tracking-[0.2em] mb-4 block opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Ancient Blueprints</span>
                <h3 className="text-3xl lg:text-5xl font-serif mb-4 text-[#E5D6C8]">{t.qsReports}</h3>
                <div className="w-12 h-[1px] bg-[#B78E28] group-hover:w-32 transition-all duration-700" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERT PROFILES SECTION */}
      <section className="w-full bg-[#121212] py-20 lg:py-32 border-t border-[#7D756B]/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 lg:mb-6 font-light leading-tight">{t.expertTitle}</h2>
            <div className="w-16 lg:w-24 h-[1px] bg-[#B78E28] mx-auto mb-6 lg:mb-8" />
            <p className="text-[#7D756B] text-[8px] sm:text-xs uppercase tracking-[0.2em] lg:tracking-[0.3em] max-w-2xl mx-auto leading-loose px-4">{t.expertDesc}</p>
          </div>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            <div className="text-center group">
              <div className="w-32 h-32 rounded-full bg-[#1A1A1A] border border-[#B78E28]/30 mx-auto mb-6 flex items-center justify-center group-hover:border-[#B78E28] transition-all duration-700 relative overflow-hidden">
                <Image src="/acharya-sharma.png" alt="Acharya Sharma" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="128px" quality={75} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-[#E5D6C8] font-serif uppercase tracking-widest text-base mb-2">{t.expert1Name}</h4>
              <p className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em]">{t.expert1Tag}</p>
            </div>
            <div className="text-center group">
              <div className="w-32 h-32 rounded-full bg-[#1A1A1A] border border-[#B78E28]/30 mx-auto mb-6 flex items-center justify-center group-hover:border-[#B78E28] transition-all duration-700 relative overflow-hidden">
                <Image src="/dr-verma.png" alt="Dr. K. Verma" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="128px" quality={75} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-[#E5D6C8] font-serif uppercase tracking-widest text-base mb-2">{t.expert2Name}</h4>
              <p className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em]">{t.expert2Tag}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="w-full bg-[#1A1A1A] py-24 border-y border-[#7D756B]/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.testimonialTitle}</h2>
            <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">{t.testimonialDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#121212] p-8 rounded-3xl border border-[#7D756B]/30 relative flex flex-col justify-between hover:shadow-[0_10px_40px_rgba(183,142,40,0.15)] hover:border-[#B78E28]/50 transition-all duration-500">
              <Star className="absolute top-8 right-8 w-6 h-6 text-[#B78E28] opacity-20" />
              <p className="text-[#E5D6C8] italic text-sm leading-loose mb-8 relative z-10 pr-6">{t.t1Quote}</p>
              <div className="mt-auto relative z-10 border-t border-[#7D756B]/20 pt-6">
                <p className="text-xs uppercase tracking-widest font-semibold text-[#B78E28]">{t.t1Name}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7D756B] mt-1">{t.t1Location}</p>
              </div>
            </div>
            <div className="bg-[#121212] p-8 rounded-3xl border border-[#7D756B]/30 relative flex flex-col justify-between hover:shadow-[0_10px_40px_rgba(183,142,40,0.15)] hover:border-[#B78E28]/50 transition-all duration-500">
              <Star className="absolute top-8 right-8 w-6 h-6 text-[#B78E28] opacity-20" />
              <p className="text-[#E5D6C8] italic text-sm leading-loose mb-8 relative z-10 pr-6">{t.t2Quote}</p>
              <div className="mt-auto relative z-10 border-t border-[#7D756B]/20 pt-6">
                <p className="text-xs uppercase tracking-widest font-semibold text-[#B78E28]">{t.t2Name}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7D756B] mt-1">{t.t2Location}</p>
              </div>
            </div>
            <div className="bg-[#121212] p-8 rounded-3xl border border-[#7D756B]/30 relative flex flex-col justify-between hover:shadow-[0_10px_40px_rgba(183,142,40,0.15)] hover:border-[#B78E28]/50 transition-all duration-500">
              <Star className="absolute top-8 right-8 w-6 h-6 text-[#B78E28] opacity-20" />
              <p className="text-[#E5D6C8] italic text-sm leading-loose mb-8 relative z-10 pr-6">{t.t3Quote}</p>
              <div className="mt-auto relative z-10 border-t border-[#7D756B]/20 pt-6">
                <p className="text-xs uppercase tracking-widest font-semibold text-[#B78E28]">{t.t3Name}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7D756B] mt-1">{t.t3Location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEED GUIDANCE SECTION */}
      <section className="py-24 lg:py-40 px-4 lg:px-12 relative overflow-hidden border-y border-[#7D756B]/20">
        {/* Cosmic Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image src="/cosmic-bg.png" alt="Cosmic Background" fill className="object-cover opacity-30" sizes="100vw" quality={50} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212]" />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-[#121212]/40 backdrop-blur-2xl border border-[#B78E28]/20 rounded-[4rem] p-12 lg:p-24 text-center relative group overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#B78E28]/10 blur-[100px] rounded-full group-hover:bg-[#B78E28]/20 transition-colors duration-1000" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#B78E28]/10 blur-[100px] rounded-full group-hover:bg-[#B78E28]/20 transition-colors duration-1000" />
            
            <div className="max-w-3xl mx-auto relative z-10">
              <Sparkles className="w-8 h-8 text-[#B78E28] mx-auto mb-8 animate-pulse" />
              <h2 className="text-4xl lg:text-7xl font-serif text-[#E5D6C8] mb-8 uppercase font-light tracking-tight">{t.connectTitle}</h2>
              <p className="text-[#7D756B] uppercase tracking-[0.3em] text-[10px] sm:text-xs leading-loose mb-16 max-w-xl mx-auto">
                {t.connectDesc}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <a 
                  href="tel:+916366105204" 
                  className="group flex items-center gap-4 text-[#E5D6C8] hover:text-[#B78E28] transition-all"
                >
                  <div className="w-14 h-14 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] group-hover:bg-[#B78E28]/10 transition-all">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-[#7D756B] uppercase tracking-widest mb-1">Direct Call</p>
                    <p className="text-sm font-bold tracking-widest">+91 6366105204</p>
                  </div>
                </a>
                
                <div className="w-[1px] h-12 bg-[#7D756B]/20 hidden sm:block" />
                
                <a 
                  href="https://wa.me/916366105204" 
                  target="_blank"
                  className="group flex items-center gap-4 text-[#E5D6C8] hover:text-[#25D366] transition-all"
                >
                  <div className="w-14 h-14 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#25D366] group-hover:bg-[#25D366]/10 transition-all">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-[#7D756B] uppercase tracking-widest mb-1">WhatsApp Us</p>
                    <p className="text-sm font-bold tracking-widest">+91 6366105204</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#121212] pt-20 lg:pt-32 pb-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <Sun className="w-6 h-6 text-[#B78E28]" />
                <span className="text-3xl font-serif text-[#E5D6C8] tracking-widest uppercase font-light">AstroReport</span>
              </div>
              <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] leading-loose max-w-sm mb-10">
                {t.footerAbout}
              </p>
              {/* Share Button (Referral) */}
              <button 
                onClick={handleShare}
                className="inline-flex items-center gap-4 text-[#B78E28] hover:text-[#E5D6C8] transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-[#B78E28]/30 flex items-center justify-center group-hover:bg-[#B78E28]/10 transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Share on WhatsApp</span>
              </button>
            </div>

            <div>
              <h4 className="text-[#E5D6C8] font-serif uppercase tracking-[0.15em] mb-8">{t.footerExplore}</h4>
              <ul className="space-y-4 text-[#7D756B] text-[10px] uppercase tracking-[0.2em]">
                <li><Link href="/gemstones" className="hover:text-[#B78E28] transition-colors">{t.footerGemstones}</Link></li>
                <li><Link href="/store" className="hover:text-[#B78E28] transition-colors">{t.footerReports}</Link></li>
                <li><Link href="/tarot" className="hover:text-[#B78E28] transition-colors">{language === 'hi' ? 'टैरो रीडिंग' : 'Tarot Reading'}</Link></li>
                <li><Link href="/astrology" className="hover:text-[#B78E28] transition-colors">{t.footerCalc}</Link></li>
                <li><Link href="/contact" className="hover:text-[#B78E28] transition-colors">{t.footerContact}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#E5D6C8] font-serif uppercase tracking-[0.15em] mb-8">{t.footerLang}</h4>
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all w-max font-bold text-[9px] tracking-[0.3em] ${
                    language === 'en' 
                      ? 'border-[#B78E28] bg-[#B78E28]/10 text-[#E5D6C8]' 
                      : 'border-[#7D756B]/30 text-[#7D756B] hover:border-[#B78E28]/50 transition-colors'
                  }`}
                >
                  ENGLISH
                </button>
                <button 
                  onClick={() => setLanguage('hi')}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all w-max font-bold text-[9px] tracking-[0.3em] ${
                    language === 'hi' 
                      ? 'border-[#B78E28] bg-[#B78E28]/10 text-[#E5D6C8]' 
                      : 'border-[#7D756B]/30 text-[#7D756B] hover:border-[#B78E28]/50 transition-colors'
                  }`}
                >
                  HINDI (हिन्दी)
                </button>
              </div>
            </div>
            
          </div>

          <div className="border-t border-[#7D756B]/20 pt-12 space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-[#7D756B] text-[9px] uppercase tracking-[0.2em]">
              <p>{t.footerCopy}</p>
              <div className="flex gap-8">
                <Link href="/terms" className="hover:text-[#E5D6C8] transition-colors">{t.footerTerms}</Link>
                <Link href="/privacy" className="hover:text-[#E5D6C8] transition-colors">{t.footerPrivacy}</Link>
                <Link href="/refund" className="hover:text-[#E5D6C8] transition-colors">{t.footerRefund}</Link>
              </div>
            </div>
            <p className="text-[#7D756B]/40 text-[8px] uppercase tracking-[0.25em] text-center max-w-2xl mx-auto">
              {language === 'hi'
                ? '✦ दोस्त को रेफर करें — उन्हें अपना कोड ASTRO-[NAME]-20 दें और वे 20% छूट पाएंगे'
                : '✦ Refer a friend — share your code ASTRO-[NAME]-20 and they get 20% off at checkout'}
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
