'use client';
import { useState } from 'react';
import BirthInputForm from './components/Form/BirthInputForm';
import { ArrowRight, Sun, Moon, PhoneCall, MessageCircle, Star, ShieldCheck, PlayCircle, BookOpen, Gem, Users, BookMarked, Activity, ArrowUpRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './context/LanguageContext';
import { useCart } from './context/CartContext';
import { motion, useScroll, useTransform } from 'framer-motion';

const dict = {
  en: {
    navGemstones: "GEMSTONES",
    navHoroscopes: "HOROSCOPES",
    navReports: "REPORTS",
    navContact: "CONTACT US",
    heroTitle1: "A Deeper",
    heroTitle2: "Understanding",
    heroTitle3: "Of Your Life",
    heroDesc: "Refined Vedic insights designed to guide your decisions. Explore your cosmic blueprint.",
    heroBtn: "GENERATE PREMIUM REPORT",
    formTitle: "Get Your Free Kundli",
    formDesc: "Clear insights into your life, career, and relationships.",
    qsGemstones: "Buy Gemstones",
    qsReports: "Explore Reports",
    feelLost: "Feeling Lost?",
    feelLostDesc: "Connect with our expert Astrologers & Pandits for clarity you can trust. One call can change everything.",
    connectTitle: "Need Guidance?",
    connectDesc: "Not sure which Astrologer to choose? Our support team will help match you with the perfect Pandit for your specific cosmic needs.",
    btnCall: "CALL SUPPORT",
    btnMsg: "WHATSAPP US",
    trustTitle: "A Journey Built on Trust",
    trustDesc: "Years of experience, guiding millions with accurate insights and meaningful transformation.",
    footerLinks: "Quick Links",
    footerLang: "Language",
    monthlyViews: "Monthly Views",
    followers: "Followers",
    reportsDelivered: "Reports Delivered",
    legacy: "Years of Legacy",
    expertTitle: "Curated by Vedic Experts",
    expertDesc: "Every algorithm and report is strictly verified by authentic Pandits and Astrologers with 15+ years of experience.",
    expert1Name: "Acharya Sharma",
    expert1Tag: "20+ Yrs Experience",
    expert2Name: "Dr. K. Verma",
    expert2Tag: "Vedic Scholar",
    testimonialTitle: "Real Cosmic Impact",
    testimonialDesc: "Don't just take our word for it. Here is what our community has to say.",
    t1Quote: "\"The Career Report told me to pivot in October 2025, and I got a 30% raise within two months. Absolutely frightening how accurate it was.\"",
    t1Name: "Rohan M.",
    t1Location: "Delhi, India",
    t2Quote: "\"We were facing so many delays in our marriage. The couples Kundli and the remedies suggested changed the energy in our home completely.\"",
    t2Name: "Priya & Aman",
    t2Location: "Mumbai, India",
    t3Quote: "\"I consult the 2026 Yearly Report every single month. It's like having a cheat code for life's obstacles.\"",
    t3Name: "Sarah K.",
    t3Location: "London, UK",
    footerTagline: "A trusted guide in Vedic Astrology. Built on research, ethics, and responsibility.",
    footerSales: "Sales: +91-6366105204",
    footerSupport: "Support: +91-6366105204",
    footerGemstones: "Premium Gemstones",
    footerReports: "Explore Reports",
    footerCalc: "Free Calculators",
    footerAstro: "Talk to Astrologers",
    footerContact: "Contact Support",
    footerCopy: "All rights reserved © AstroReport 2026",
    footerTerms: "Terms & Services",
    footerPrivacy: "Privacy Policy",
    footerRefund: "Refund Policy",
    heroTag: "✦ Vedic Astrology & Spiritual Guidance"
  },
  hi: {
    navGemstones: "रत्न",
    navHoroscopes: "राशिफल",
    navReports: "रिपोर्ट्स",
    navContact: "संपर्क करें",
    heroTitle1: "आपके जीवन की",
    heroTitle2: "गहरी समझ",
    heroTitle3: "और मार्गदर्शन",
    heroDesc: "आपके निर्णयों का मार्गदर्शन करने के लिए परिष्कृत वैदिक अंतर्दृष्टि। अपनी लौकिक रूपरेखा का अन्वेषण करें।",
    heroBtn: "प्रीमियम रिपोर्ट जनरेट करें",
    formTitle: "अपनी निःशुल्क कुंडली प्राप्त करें",
    formDesc: "जीवन, करियर और रिश्तों की स्पष्ट अंतर्दृष्टि।",
    qsGemstones: "रत्न खरीदें",
    qsReports: "रिपोर्ट देखें",
    feelLost: "क्या आप खोया हुआ महसूस कर रहे हैं?",
    feelLostDesc: "भरोसेमंद स्पष्टता के लिए हमारे विशेषज्ञ ज्योतिषियों से जुड़ें। एक कॉल सब कुछ बदल सकती है।",
    connectTitle: "मार्गदर्शन चाहिए?",
    connectDesc: "सुनिश्चित नहीं हैं कि किस ज्योतिषी को चुनें? हमारी सहायता टीम आपको सही पंडित से मिलाने में मदद करेगी।",
    btnCall: "कॉल समर्थन",
    btnMsg: "हमें व्हाट्सएप करें",
    trustTitle: "विश्वास पर बनी यात्रा",
    trustDesc: "वर्षों का अनुभव, सटीक अंतर्दृष्टि और सार्थक परिवर्तन के साथ लाखों लोगों का मार्गदर्शन।",
    footerLinks: "त्वरित लिंक",
    footerLang: "भाषा",
    monthlyViews: "मासिक दृश्य",
    followers: "फॉलोअर्स",
    reportsDelivered: "रिपोर्ट वितरित",
    legacy: "वर्षों की विरासत",
    expertTitle: "वैदिक विशेषज्ञों द्वारा निर्मित",
    expertDesc: "प्रत्येक एल्गोरिदम और रिपोर्ट को 15+ वर्षों के अनुभव वाले प्रामाणिक पंडितों और ज्योतिषियों द्वारा सख्ती से सत्यापित किया जाता है।",
    expert1Name: "आचार्य शर्मा",
    expert1Tag: "20+ वर्षों का अनुभव",
    expert2Name: "डॉ. के. वर्मा",
    expert2Tag: "वैदिक विद्वान",
    testimonialTitle: "वास्तविक लौकिक प्रभाव",
    testimonialDesc: "सिर्फ हमारी बात न मानें। यहाँ हमारे समुदाय का क्या कहना है।",
    t1Quote: "\"करियर रिपोर्ट ने मुझे अक्टूबर 2025 में बदलाव करने को कहा, और दो महीनों में मुझे 30% वेतन वृद्धि मिली। यह कितना सटीक था, यह डरावना था।\"",
    t1Name: "रोहन एम.",
    t1Location: "दिल्ली, भारत",
    t2Quote: "\"हमारी शादी में बहुत देरी हो रही थी। कपल्स कुंडली और सुझाए गए उपायों ने हमारे घर की ऊर्जा पूरी तरह बदल दी।\"",
    t2Name: "प्रिया और अमन",
    t2Location: "मुंबई, भारत",
    t3Quote: "\"मैं हर महीने 2026 की वार्षिक रिपोर्ट देखती हूं। यह जीवन की बाधाओं के लिए एक चीट कोड की तरह है।\"",
    t3Name: "सारा के.",
    t3Location: "लंदन, यूके",
    footerTagline: "वैदिक ज्योतिष में एक विश्वसनीय मार्गदर्शक। अनुसंधान, नैतिकता और जिम्मेदारी पर निर्मित।",
    footerSales: "बिक्री: +91-6366105204",
    footerSupport: "सहायता: +91-6366105204",
    footerGemstones: "प्रीमियम रत्न",
    footerReports: "रिपोर्ट्स देखें",
    footerCalc: "मुफ्त कैलकुलेटर",
    footerAstro: "ज्योतिषियों से बात करें",
    footerContact: "सहायता से संपर्क करें",
    footerCopy: "सभी अधिकार सुरक्षित © AstroReport 2026",
    footerTerms: "नियम और सेवाएं",
    footerPrivacy: "गोपनीयता नीति",
    footerRefund: "वापसी नीति",
    heroTag: "✦ वैदिक ज्योतिष और आध्यात्मिक मार्गदर्शन"
  }
};

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const { cart } = useCart();
  const t = dict[language];
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, -120]);
  const parallaxOpacity = useTransform(scrollY, [0, 400], [0.20, 0.06]);
  const [referName, setReferName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const generateCode = () => {
    if (!referName.trim()) return;
    const slug = referName.trim().toUpperCase().replace(/\s+/g, '').slice(0, 8);
    setGeneratedCode(`ASTRO-${slug}-20`);
  };

  const shareOnWhatsApp = () => {
    const code = generatedCode;
    const msg = language === 'hi'
      ? `🌟 *AstroReport* पर 20% की छूट पाएं!%0A%0Aमेरा रेफरल कोड उपयोग करें चेकआउट के समय: *${code}*%0A%0Aअभी खरीदें: https://astro-report.vercel.app/store`
      : `🌟 Get 20% OFF on AstroReport premium reports!%0A%0AUse my referral code at checkout: *${code}*%0A%0AShop now: https://astro-report.vercel.app/store`;
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#121212] font-sans flex flex-col relative overflow-hidden">
      
      <nav className="flex justify-center items-center gap-6 lg:gap-16 py-6 px-4 text-[#E5D6C8] text-[10px] lg:text-xs tracking-[0.2em] uppercase border-b border-[#7D756B]/20 w-full z-50 bg-[#121212]/80 backdrop-blur-md sticky top-0 md:top-[40px]">
        <div className="flex items-center gap-6 lg:gap-16">
          <Link href="/gemstones" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navGemstones}</Link>
          <Link href="/astrology" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navHoroscopes}</Link>
        </div>
        
        <div className="flex items-center gap-4 text-[#E5D6C8] mx-4 lg:mx-8">
          <Sun className="w-5 h-5 font-light" strokeWidth={1} />
          <span className="text-2xl font-serif font-light">✧</span>
          <Moon className="w-5 h-5 font-light" strokeWidth={1} />
        </div>
        
        <div className="flex items-center gap-6 lg:gap-12">
          <Link href="/store" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navReports}</Link>
          <Link href="/contact" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navContact}</Link>
          <Link href="/checkout" className="flex items-center gap-2 hover:text-[#B78E28] transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#B78E28] text-[#121212] rounded-full flex items-center justify-center text-[8px] font-bold">
                {cart.length}
              </span>
            )}
            <span className="hidden lg:block">CART</span>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-24 py-16 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
        <motion.div style={{ y: parallaxY, opacity: parallaxOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Ring 4 (Outermost) */}
          <div className="absolute w-[900px] h-[900px] rounded-full border border-[#7D756B]/10 animate-[spin_120s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#B78E28] rounded-full shadow-[0_0_20px_#B78E28]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#E5D6C8] rounded-full shadow-[0_0_10px_#E5D6C8]" />
          </div>

          {/* Ring 3 */}
          <div className="absolute w-[700px] h-[700px] rounded-full border border-[#7D756B]/15 animate-[spin_90s_linear_infinite_reverse]">
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#E5D6C8] rounded-full shadow-[0_0_15px_#E5D6C8]" />
          </div>

          {/* Ring 2 */}
          <div className="absolute w-[500px] h-[500px] rounded-full border border-[#7D756B]/20 animate-[spin_60s_linear_infinite]">
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#B78E28] rounded-full shadow-[0_0_15px_#B78E28]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#E5D6C8] rounded-full shadow-[0_0_8px_#E5D6C8]" />
          </div>
          
          {/* Ring 1 (Innermost) */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-[#7D756B]/30 animate-[spin_40s_linear_infinite_reverse]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-[#E5D6C8] rounded-full shadow-[0_0_15px_#E5D6C8]" />
          </div>

          {/* Central Core */}
          <div className="absolute w-3 h-3 bg-[#B78E28] rounded-full shadow-[0_0_50px_rgba(183,142,40,1)] animate-pulse" />
        </motion.div>

        <div className="flex-1 relative z-10 text-center lg:text-left w-full">
          <p className="text-[#B78E28] text-[10px] uppercase tracking-[0.3em] mb-4">{t.heroTag}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-[#E5D6C8] uppercase leading-[1.1] mb-6 font-light break-words px-2 sm:px-0">
            {t.heroTitle1} <br />{t.heroTitle2}<br />{t.heroTitle3}
          </h1>
          <p className="text-[#7D756B] text-xs lg:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em] max-w-lg leading-relaxed mb-10 mx-auto lg:mx-0 px-2 sm:px-0">
            {t.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <Link href="/store" className="w-full sm:w-auto bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all font-semibold shadow-[0_0_30px_rgba(183,142,40,0.3)] hover:shadow-[0_0_40px_rgba(183,142,40,0.6)] text-center">
              {t.heroBtn}
            </Link>
          </div>
        </div>

        <div className="w-full lg:flex-1 lg:max-w-md relative z-10 bg-[#121212]/80 backdrop-blur-lg p-6 sm:p-8 lg:p-10 border border-[#7D756B]/30 rounded-[2rem] shadow-2xl hover:border-[#B78E28]/50 transition-colors duration-700 group overflow-hidden">
          <h3 className="text-center font-serif text-[#E5D6C8] text-lg sm:text-xl mb-2 tracking-widest uppercase font-light group-hover:text-[#B78E28] transition-colors duration-500">{t.formTitle}</h3>
          <p className="text-center text-[#7D756B] text-[10px] uppercase tracking-[0.1em] mb-8">{t.formDesc}</p>
          <BirthInputForm />
        </div>
      </section>

      {/* EXPERT PROFILES SECTION */}
      <section className="w-full bg-[#121212] py-24 border-t border-[#7D756B]/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.expertTitle}</h2>
            <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">{t.expertDesc}</p>
          </div>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            <div className="text-center cursor-pointer group">
              <div className="w-24 h-24 rounded-full bg-[#B78E28]/10 border border-[#B78E28]/30 mx-auto mb-4 flex items-center justify-center group-hover:bg-[#B78E28]/20 transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(183,142,40,0.3)]">
                <span className="text-[#B78E28] font-serif text-3xl">A</span>
              </div>
              <h4 className="text-[#E5D6C8] font-serif uppercase tracking-widest text-sm">{t.expert1Name}</h4>
              <p className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] mt-1">{t.expert1Tag}</p>
            </div>
            <div className="text-center cursor-pointer group">
              <div className="w-24 h-24 rounded-full bg-[#B78E28]/10 border border-[#B78E28]/30 mx-auto mb-4 flex items-center justify-center group-hover:bg-[#B78E28]/20 transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(183,142,40,0.3)]">
                <span className="text-[#B78E28] font-serif text-3xl">V</span>
              </div>
              <h4 className="text-[#E5D6C8] font-serif uppercase tracking-widest text-sm">{t.expert2Name}</h4>
              <p className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] mt-1">{t.expert2Tag}</p>
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

      {/* QUICK SERVICES SECTION */}
      <section className="w-full bg-[#E5D6C8]/5 border-y border-[#7D756B]/20 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-2 gap-8 text-center max-w-2xl mx-auto">
            <Link href="/gemstones" className="flex flex-col items-center group cursor-pointer">
              <Gem className="w-8 h-8 text-[#B78E28] mb-4 group-hover:scale-110 transition-transform" strokeWidth={1} />
              <h4 className="text-[#E5D6C8] text-sm tracking-[0.2em] uppercase font-serif">{t.qsGemstones}</h4>
            </Link>
            <Link href="/store" className="flex flex-col items-center group cursor-pointer">
              <BookMarked className="w-8 h-8 text-[#B78E28] mb-4 group-hover:scale-110 transition-transform" strokeWidth={1} />
              <h4 className="text-[#E5D6C8] text-sm tracking-[0.2em] uppercase font-serif">{t.qsReports}</h4>
            </Link>
          </div>
        </div>
      </section>


      {/* CONSULTATION SECTION */}
      <section id="consult" className="w-full bg-[#1A1A1A] py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">{t.feelLost}</h2>
            <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
              {t.feelLostDesc}
            </p>
          </div>

          <div className="flex justify-center">
            <div
              id="contact" 
              className="w-full max-w-lg bg-gradient-to-b from-[#121212] to-[#1A1A1A] border border-[#B78E28]/30 p-10 rounded-[2.5rem] hover:border-[#B78E28]/60 transition-all duration-700 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(183,142,40,0.1)] hover:shadow-[0_20px_60px_rgba(183,142,40,0.2)] hover:-translate-y-2"
            >
              <div className="w-20 h-20 bg-[#B78E28]/10 border border-[#B78E28]/30 rounded-full flex items-center justify-center mb-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#B78E28]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <PhoneCall className="w-8 h-8 text-[#B78E28] relative z-10" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-serif text-[#E5D6C8] mb-2">{t.connectTitle}</h3>
              <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.1em] leading-relaxed mb-10">
                {t.connectDesc}
              </p>
              
              <div className="w-full space-y-4">
                <a href="tel:+916366105204" className="w-full bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] py-4 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-3 font-bold hover:shadow-[0_0_20px_rgba(183,142,40,0.4)]">
                  <PhoneCall className="w-4 h-4" /> {t.btnCall}
                </a>
                <a href="https://wa.me/916366105204?text=Namaste!%20I%20would%20like%20to%20consult%20with%20an%20astrologer.%20Please%20help%20me%20choose%20the%20right%20report." target="_blank" rel="noopener noreferrer" className="w-full bg-transparent border border-[#E5D6C8] text-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] py-4 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-3 font-semibold hover:shadow-[0_0_20px_rgba(229,214,200,0.2)]">
                  <MessageCircle className="w-4 h-4" /> {t.btnMsg}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#B78E28] py-20 text-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif uppercase tracking-[0.1em] mb-4 font-bold">{t.trustTitle}</h2>
            <p className="text-[#121212]/70 text-xs uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
              {t.trustDesc}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#121212]/10">
            <div className="transition-transform duration-300">
              <p className="text-5xl font-serif mb-2">15K+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">{t.monthlyViews}</p>
            </div>
            <div className="transition-transform duration-300">
              <p className="text-5xl font-serif mb-2">2.5K+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">{t.followers}</p>
            </div>
            <div className="transition-transform duration-300">
              <p className="text-5xl font-serif mb-2">5K+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">{t.reportsDelivered}</p>
            </div>
            <div className="transition-transform duration-300">
              <p className="text-5xl font-serif mb-2">2+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">{t.legacy}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="w-full bg-[#121212] overflow-hidden py-16 border-t border-[#7D756B]/20 relative flex items-center">
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max animate-marquee">
          {/* First block */}
          <div className="flex gap-16 px-8 items-center text-[#7D756B]/10 font-serif font-bold text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter whitespace-nowrap select-none">
            {language === 'hi' ? (
              <>
                <span>वैदिक ज्योतिष</span> <span>✦</span>
                <span>प्रीमियम रिपोर्ट्स</span> <span>✦</span>
                <span>विशेषज्ञ पंडित</span> <span>✦</span>
                <span>कार्मिक दोष</span> <span>✦</span>
                <span>सटीक उपाय</span> <span>✦</span>
              </>
            ) : (
              <>
                <span>Vedic Astrology</span> <span>✦</span>
                <span>Premium Reports</span> <span>✦</span>
                <span>Expert Pandits</span> <span>✦</span>
                <span>Karmic Doshas</span> <span>✦</span>
                <span>Exact Remedies</span> <span>✦</span>
              </>
            )}
          </div>
          {/* Second identical block for seamless loop */}
          <div className="flex gap-16 px-8 items-center text-[#7D756B]/10 font-serif font-bold text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter whitespace-nowrap select-none">
            {language === 'hi' ? (
              <>
                <span>वैदिक ज्योतिष</span> <span>✦</span>
                <span>प्रीमियम रिपोर्ट्स</span> <span>✦</span>
                <span>विशेषज्ञ पंडित</span> <span>✦</span>
                <span>कार्मिक दोष</span> <span>✦</span>
                <span>सटीक उपाय</span> <span>✦</span>
              </>
            ) : (
              <>
                <span>Vedic Astrology</span> <span>✦</span>
                <span>Premium Reports</span> <span>✦</span>
                <span>Expert Pandits</span> <span>✦</span>
                <span>Karmic Doshas</span> <span>✦</span>
                <span>Exact Remedies</span> <span>✦</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* REFERRAL SECTION */}
      <section className="w-full py-24 bg-[#121212] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-6 leading-tight">
              {language === 'hi' ? 'दोस्तों को रेफर करें,' : 'Refer a Friend,'}<br />
              <span className="text-[#B78E28]">{language === 'hi' ? 'खुशियां फैलाएं' : 'Spread the Light'}</span>
            </h2>
            <p className="text-[#7D756B] text-xs lg:text-sm uppercase tracking-widest leading-loose mb-10 max-w-xl mx-auto lg:mx-0">
              {language === 'hi' 
                ? 'अपने दोस्तों के साथ ज्योतिष की शक्ति साझा करें। उन्हें उनके पहले प्रीमियम ऑर्डर पर 20% की छूट मिलेगी।' 
                : 'Share the power of Vedic astrology with your friends. They get 20% OFF on their first premium order.'}
            </p>
          </div>

          <div className="w-full max-w-md bg-[#1A1A1A] border border-[#B78E28]/30 p-10 rounded-[2.5rem] shadow-2xl">
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'अपना नाम दर्ज करें' : "ENTER YOUR NAME"}
                  className="w-full py-4 bg-transparent border-b border-[#7D756B]/30 focus:border-[#B78E28] focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] transition-all font-sans text-xs uppercase tracking-[0.2em] rounded-none"
                  value={referName}
                  onChange={(e) => setReferName(e.target.value)}
                />
              </div>

              {!generatedCode ? (
                <button
                  onClick={generateCode}
                  disabled={!referName.trim()}
                  className="w-full py-4 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[#E5D6C8] font-sans text-[10px] uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {language === 'hi' ? 'कोड जनरेट करें' : 'GENERATE MY CODE'}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between bg-[#121212] border border-[#B78E28]/30 rounded-2xl px-6 py-5">
                    <span className="font-mono text-[#B78E28] text-lg tracking-[0.2em] font-bold">{generatedCode}</span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(generatedCode)}
                      className="text-[10px] uppercase tracking-widest text-[#7D756B] hover:text-[#E5D6C8] transition-colors"
                    >
                      {language === 'hi' ? 'कॉपी' : 'COPY'}
                    </button>
                  </div>
                  <button
                    onClick={shareOnWhatsApp}
                    className="w-full py-4 bg-[#25D366] text-white hover:brightness-110 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,211,102,0.3)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {language === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'SHARE ON WHATSAPP'}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & SEO */}
      <footer className="w-full border-t border-[#7D756B]/20 pt-20 pb-10 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-4 text-[#E5D6C8] mb-6">
                <Sun className="w-5 h-5 font-light" strokeWidth={1} />
                <span className="text-2xl font-serif font-light">✧</span>
                <Moon className="w-5 h-5 font-light" strokeWidth={1} />
              </div>
              <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] leading-loose mb-6">{t.footerTagline}</p>
              <p className="text-[#E5D6C8] text-[10px] uppercase tracking-[0.1em] mb-1">{t.footerSales}</p>
              <p className="text-[#E5D6C8] text-[10px] uppercase tracking-[0.1em]">{t.footerSupport}</p>
            </div>

            {/* Features & Quick Links */}
            <div>
              <h4 className="text-[#E5D6C8] font-serif uppercase tracking-[0.15em] mb-6">{t.footerLinks}</h4>
              <ul className="space-y-4 text-[#7D756B] text-[10px] uppercase tracking-[0.1em]">
                <li><Link href="/gemstones" className="hover:text-[#B78E28] transition-colors">{t.footerGemstones}</Link></li>
                <li><Link href="/store" className="hover:text-[#B78E28] transition-colors">{t.footerReports}</Link></li>
                <li><Link href="/astrology" className="hover:text-[#B78E28] transition-colors">{t.footerCalc}</Link></li>
                <li><Link href="#consult" className="hover:text-[#B78E28] transition-colors">{t.footerAstro}</Link></li>
                <li><Link href="/contact" className="hover:text-[#B78E28] transition-colors">{t.footerContact}</Link></li>
              </ul>
            </div>

            {/* Language Switcher */}
            <div>
              <h4 className="text-[#E5D6C8] font-serif uppercase tracking-[0.15em] mb-6">{t.footerLang}</h4>
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors w-max font-semibold text-[10px] uppercase tracking-widest ${
                    language === 'en' 
                      ? 'border-[#B78E28]/30 bg-[#B78E28]/10 text-[#E5D6C8]' 
                      : 'border-[#7D756B]/30 hover:border-[#B78E28]/30 hover:bg-[#B78E28]/5 text-[#7D756B] hover:text-[#E5D6C8]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${language === 'en' ? 'bg-[#B78E28] text-[#121212]' : 'bg-[#7D756B] text-[#121212]'}`}>E</span>
                  ENGLISH
                </button>
                <button 
                  onClick={() => setLanguage('hi')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors w-max font-semibold text-[10px] uppercase tracking-widest ${
                    language === 'hi' 
                      ? 'border-[#B78E28]/30 bg-[#B78E28]/10 text-[#E5D6C8]' 
                      : 'border-[#7D756B]/30 hover:border-[#B78E28]/30 hover:bg-[#B78E28]/5 text-[#7D756B] hover:text-[#E5D6C8]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${language === 'hi' ? 'bg-[#B78E28] text-[#121212]' : 'bg-[#7D756B] text-[#121212]'}`}>H</span>
                  HINDI (हिन्दी)
                </button>
              </div>
            </div>
            
          </div>

          <div className="border-t border-[#7D756B]/20 pt-8 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#7D756B] text-[10px] uppercase tracking-[0.1em]">
              <p>{t.footerCopy}</p>
              <div className="flex gap-4">
                <Link href="/terms" className="hover:text-[#E5D6C8] transition-colors">{t.footerTerms}</Link>
                <Link href="/privacy" className="hover:text-[#E5D6C8] transition-colors">{t.footerPrivacy}</Link>
                <Link href="/refund" className="hover:text-[#E5D6C8] transition-colors">{t.footerRefund}</Link>
              </div>
            </div>
            {/* Referral tiny note */}
            <p className="text-[#7D756B]/50 text-[9px] uppercase tracking-[0.15em] text-center">
              {language === 'hi'
                ? '✦ दोस्त को रेयर करें — उन्हें अपना कोड ASTRO-[NAME]-20 दें और वे चेकआउट पर 20% छूट पाएंगे'
                : '✦ Refer a friend — share your code ASTRO-[NAME]-20 and they get 20% off at checkout'}
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
