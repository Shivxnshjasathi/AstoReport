'use client';
import BirthInputForm from './components/Form/BirthInputForm';
import { ArrowRight, Sun, Moon, PhoneCall, MessageCircle, Star, ShieldCheck, PlayCircle, BookOpen, Gem, Users, BookMarked, Activity, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './context/LanguageContext';

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
    legacy: "Years of Legacy"
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
    legacy: "वर्षों की विरासत"
  }
};

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const t = dict[language];

  return (
    <main className="min-h-screen bg-[#121212] font-sans flex flex-col relative overflow-hidden">
      
      <nav className="flex justify-center items-center gap-6 lg:gap-16 py-6 px-4 text-[#E5D6C8] text-[10px] lg:text-xs tracking-[0.2em] uppercase border-b border-[#7D756B]/20 w-full z-50 bg-[#121212]/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-6 lg:gap-16">
          <Link href="/gemstones" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navGemstones}</Link>
          <Link href="/astrology" className="hover:text-[#B78E28] transition-colors hidden md:block">{t.navHoroscopes}</Link>
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
      <section className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-24 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[600px] h-[600px] rounded-full border-[1px] border-[#7D756B]/30" />
          <div className="absolute w-[400px] h-[400px] rounded-full border-[1px] border-[#7D756B]/20" />
        </div>

        <div className="flex-1 relative z-10 text-center lg:text-left mb-16 lg:mb-0">
          <p className="text-[#B78E28] text-[10px] uppercase tracking-[0.3em] mb-4">✦ Vedic Astrology & Spiritual Guidance</p>
          <h1 className="text-5xl lg:text-7xl font-serif text-[#E5D6C8] uppercase leading-[1.1] mb-6 font-light">
            {t.heroTitle1} <br />{t.heroTitle2}<br />{t.heroTitle3}
          </h1>
          <p className="text-[#7D756B] text-xs lg:text-sm uppercase tracking-[0.2em] max-w-lg leading-relaxed mb-10 mx-auto lg:mx-0">
            {t.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <Link href="/store" className="bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all font-semibold shadow-[0_0_30px_rgba(183,142,40,0.3)]">
              {t.heroBtn}
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md relative z-10 bg-[#121212]/80 backdrop-blur-lg p-8 lg:p-10 border border-[#7D756B]/30 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-center font-serif text-[#E5D6C8] text-xl mb-2 tracking-widest uppercase font-light">{t.formTitle}</h3>
          <p className="text-center text-[#7D756B] text-[10px] uppercase tracking-[0.1em] mb-8">{t.formDesc}</p>
          <BirthInputForm />
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
            <div id="contact" className="w-full max-w-lg bg-gradient-to-b from-[#121212] to-[#1A1A1A] border border-[#B78E28]/30 p-10 rounded-[2.5rem] hover:border-[#B78E28]/60 transition-colors flex flex-col items-center text-center shadow-[0_10px_40px_rgba(183,142,40,0.1)]">
              <div className="w-20 h-20 bg-[#B78E28]/10 border border-[#B78E28]/30 rounded-full flex items-center justify-center mb-8">
                <PhoneCall className="w-8 h-8 text-[#B78E28]" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-serif text-[#E5D6C8] mb-2">{t.connectTitle}</h3>
              <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.1em] leading-relaxed mb-10">
                {t.connectDesc}
              </p>
              
              <div className="w-full space-y-4">
                <button className="w-full bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] py-4 rounded-full text-[10px] uppercase tracking-widest transition-colors flex justify-center items-center gap-3 font-bold">
                  <PhoneCall className="w-4 h-4" /> {t.btnCall}
                </button>
                <button className="w-full bg-transparent border border-[#E5D6C8] text-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] py-4 rounded-full text-[10px] uppercase tracking-widest transition-colors flex justify-center items-center gap-3 font-semibold">
                  <MessageCircle className="w-4 h-4" /> {t.btnMsg}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS & SOCIAL PROOF */}
      <section className="w-full bg-[#B78E28] py-20 text-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif uppercase tracking-[0.1em] mb-4 font-bold">{t.trustTitle}</h2>
            <p className="text-[#121212]/70 text-xs uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
              {t.trustDesc}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#121212]/10">
            <div>
              <p className="text-5xl font-serif mb-2">15K+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">{t.monthlyViews}</p>
            </div>
            <div>
              <p className="text-5xl font-serif mb-2">2.5K+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">{t.followers}</p>
            </div>
            <div>
              <p className="text-5xl font-serif mb-2">5K+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">{t.reportsDelivered}</p>
            </div>
            <div>
              <p className="text-5xl font-serif mb-2">2+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">{t.legacy}</p>
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
              <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] leading-loose mb-6">
                A trusted guide in Vedic Astrology. Built on research, ethics, and responsibility.
              </p>
              <p className="text-[#E5D6C8] text-[10px] uppercase tracking-[0.1em] mb-1">Sales: +91-9818999037</p>
              <p className="text-[#E5D6C8] text-[10px] uppercase tracking-[0.1em]">Support: +91-8604802202</p>
            </div>

            {/* Features & Quick Links */}
            <div>
              <h4 className="text-[#E5D6C8] font-serif uppercase tracking-[0.15em] mb-6">{t.footerLinks}</h4>
              <ul className="space-y-4 text-[#7D756B] text-[10px] uppercase tracking-[0.1em]">
                <li><Link href="/gemstones" className="hover:text-[#B78E28] transition-colors">Premium Gemstones</Link></li>
                <li><Link href="/store" className="hover:text-[#B78E28] transition-colors">Explore Reports</Link></li>
                <li><Link href="/astrology" className="hover:text-[#B78E28] transition-colors">Free Calculators</Link></li>
                <li><Link href="#consult" className="hover:text-[#B78E28] transition-colors">Talk to Astrologers</Link></li>
                <li><Link href="/contact" className="hover:text-[#B78E28] transition-colors">Contact Support</Link></li>
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

          <div className="border-t border-[#7D756B]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#7D756B] text-[10px] uppercase tracking-[0.1em]">
            <p>All rights reserved by © Astro 2026</p>
            <div className="flex gap-4">
              <span className="hover:text-[#E5D6C8] cursor-pointer">Terms & Services</span>
              <span className="hover:text-[#E5D6C8] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#E5D6C8] cursor-pointer">Refund Policy</span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
