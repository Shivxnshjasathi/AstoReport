'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Star, Diamond, Crown, ShoppingCart, Check, Sparkles, Compass } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSale } from '../context/SaleContext';
import { useLanguage } from '../context/LanguageContext';

const getTiers = (lang: 'en' | 'hi') => {
  if (lang === 'hi') {
    return [
      {
        name: "सर्वश्रेष्ठ जीवन ब्लूप्रिंट",
        description: "5 सबसे शक्तिशाली रिपोर्टों का एक विशेष बंडल। सब कुछ एक साथ प्राप्त करें और भारी बचत करें।",
        icon: <Crown className="w-5 h-5 text-[#B78E28]" />,
        reports: [
          { id: 99, title: "अल्टीमेट डेस्टिनी गाइड (बंडल)", priceINR: "₹999", oldPriceINR: "₹1999", priceUSD: "$19.99", oldPriceUSD: "$39.99", desc: "करियर, भाग्य, प्रेम, 2026 वार्षिक और वास्तु रिपोर्ट शामिल हैं।" },
        ]
      },
      {
        name: "मूलभूत रूपरेखा",
        description: "मूल ग्रहीय अंतर्दृष्टि और पारंपरिक विश्लेषण।",
        icon: <Star className="w-5 h-5 text-[#B78E28]" />,
        reports: [
          { id: 1, title: "प्रीमियम वैयक्तिकृत कुंडली", priceINR: "₹99", oldPriceINR: "₹199", priceUSD: "$1.99", oldPriceUSD: "$3.99", desc: "आपका संपूर्ण जन्म चार्ट विश्लेषण और ग्रह स्थिति।" },
          { id: 2, title: "वैयक्तिकृत युगल कुंडली", priceINR: "₹199", oldPriceINR: "₹399", priceUSD: "$3.99", oldPriceUSD: "$7.99", desc: "विस्तृत गुण मिलान और विवाह अनुकूलता जांच।" },
          { id: 3, title: "लाल किताब रिपोर्ट", priceINR: "₹175", oldPriceINR: "₹349", priceUSD: "$3.49", oldPriceUSD: "$6.99", desc: "लाल किताब सिद्धांतों पर आधारित व्यावहारिक और सरल उपाय।" },
          { id: 4, title: "शिशु नाम रिपोर्ट", priceINR: "₹99", oldPriceINR: "₹199", priceUSD: "$1.99", oldPriceUSD: "$3.99", desc: "नवजात शिशुओं के लिए शुभ प्रारंभिक अक्षर और नक्षत्र।" },
          { id: 5, title: "नाम सुधार रिपोर्ट", priceINR: "₹149", oldPriceINR: "₹299", priceUSD: "$2.99", oldPriceUSD: "$5.99", desc: "बेहतर भाग्य और सद्भाव के लिए अंक ज्योतिष समायोजन।" },
        ]
      },
      {
        name: "भाग्य और जीवन",
        description: "आपके करियर, धन और रिश्तों का गहन विश्लेषण।",
        icon: <Diamond className="w-5 h-5 text-[#B78E28]" />,
        reports: [
          { id: 6, title: "करियर रिपोर्ट", priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99", desc: "अपना आदर्श पेशा और सफलता के लिए समयसीमा खोजें।" },
          { id: 7, title: "प्रेम रिपोर्ट", priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99", desc: "अपनी रोमांटिक अनुकूलता और जीवनसाथी संकेतक समझें।" },
          { id: 8, title: "भाग्य रिपोर्ट", priceINR: "₹199", oldPriceINR: "₹399", priceUSD: "$3.99", oldPriceUSD: "$7.99", desc: "सामान्य भाग्य, भाग्यशाली अंक और शुभ दिन।" },
          { id: 9, title: "भाग्य रिपोर्ट प्लस", priceINR: "₹399", oldPriceINR: "₹799", priceUSD: "$7.99", oldPriceUSD: "$15.99", desc: "आपके धन योग का उन्नत विश्लेषण।" },
          { id: 10, title: "मैं अमीर कब बनूंगा?", priceINR: "₹299", oldPriceINR: "₹599", priceUSD: "$5.99", oldPriceUSD: "$11.99", desc: "बड़े वित्तीय उत्थान के लिए सटीक दशा समय।" },
        ]
      },
      {
        name: "गोचर और समयरेखा",
        description: "आने वाले वर्षों के लिए भविष्य कहनेवाला ज्योतिष।",
        icon: <Sparkles className="w-5 h-5 text-[#B78E28]" />,
        reports: [
          { id: 11, title: "2026 वार्षिक राशिफल रिपोर्ट", priceINR: "₹399", oldPriceINR: "₹799", priceUSD: "$7.99", oldPriceUSD: "$15.99", desc: "2026 में क्या उम्मीद करनी है, इसका महीने-दर-महीने विवरण।" },
          { id: 12, title: "वर्षफल रिपोर्ट", priceINR: "₹349", oldPriceINR: "₹699", priceUSD: "$6.99", oldPriceUSD: "$13.99", desc: "वर्तमान वर्ष के लिए आपका सौर वापसी चार्ट विश्लेषण।" },
          { id: 13, title: "शनि गोचर रिपोर्ट", priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99", desc: "शनि की वर्तमान चाल आपके जीवन में कैसे बदलाव लाएगी।" },
          { id: 14, title: "बृहस्पति गोचर रिपोर्ट", priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99", desc: "भाग्य और विस्तार का ग्रह आपको अभी कहाँ आशीर्वाद दे रहा है।" },
        ]
      },
      {
        name: "कार्मिक दोष",
        description: "रुकावटों की पहचान करें और सटीक उपाय करें।",
        icon: <Crown className="w-5 h-5 text-[#B78E28]" />,
        reports: [
          { id: 15, title: "राहु केतु रिपोर्ट", priceINR: "₹299", oldPriceINR: "₹599", priceUSD: "$5.99", oldPriceUSD: "$11.99", desc: "छाया ग्रहों पर महारत हासिल करें और अराजकता को अवसर में बदलें।" },
          { id: 16, title: "काल सर्प और मांगलिक दोष", priceINR: "₹349", oldPriceINR: "₹699", priceUSD: "$6.99", oldPriceUSD: "$13.99", desc: "प्रमुख ज्योतिषीय श्रापों और उनके शक्तिशाली उपायों की जाँच करें।" },
          { id: 17, title: "साढ़े साती रिपोर्ट", priceINR: "₹449", oldPriceINR: "₹899", priceUSD: "$8.99", oldPriceUSD: "$17.99", desc: "आपके 7.5 साल के शनि के लिए एक व्यापक उत्तरजीविता मार्गदर्शिका।" },
        ]
      },
      {
        name: "अंक ज्योतिष और वास्तु",
        description: "संख्याओं और स्थान की शक्ति का उपयोग करें।",
        icon: <Compass className="w-5 h-5 text-[#B78E28]" />,
        reports: [
          { id: 18, title: "संपूर्ण अंक ज्योतिष रिपोर्ट", priceINR: "₹199", oldPriceINR: "₹399", priceUSD: "$3.99", oldPriceUSD: "$7.99", desc: "अपने जीवन पथ, अभिव्यक्ति और आत्मा की लालसा संख्या की खोज करें।" },
          { id: 19, title: "गृह वास्तु विश्लेषण", priceINR: "₹499", oldPriceINR: "₹999", priceUSD: "$9.99", oldPriceUSD: "$19.99", desc: "शांति और समृद्धि के लिए अपने रहने की जगह को ब्रह्मांडीय ऊर्जा के साथ संरेखित करें।" },
          { id: 20, title: "व्यापार वास्तु रिपोर्ट", priceINR: "₹799", oldPriceINR: "₹1599", priceUSD: "$15.99", oldPriceUSD: "$31.99", desc: "अपने व्यावसायिक स्थान में विकास को अधिकतम करें और बाधाओं को कम करें।" },
        ]
      }
    ];
  }

  // Default English
  return [
    {
      name: "All-Access Life Blueprint",
      description: "An exclusive bundle of the 5 most powerful reports. Get everything at once and save massive.",
      icon: <Crown className="w-5 h-5 text-[#B78E28]" />,
      reports: [
        { id: 99, title: "Ultimate Destiny Guide (Bundle)", priceINR: "₹999", oldPriceINR: "₹1999", priceUSD: "$19.99", oldPriceUSD: "$39.99", desc: "Includes Career, Fortune, Love, 2026 Yearly, and Vastu Reports." },
      ]
    },
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
    },
    {
      name: "Numerology & Vastu",
      description: "Harness the power of numbers and space.",
      icon: <Compass className="w-5 h-5 text-[#B78E28]" />,
      reports: [
        { id: 18, title: "Complete Numerology Report", priceINR: "₹199", oldPriceINR: "₹399", priceUSD: "$3.99", oldPriceUSD: "$7.99", desc: "Discover your life path, expression, and soul urge numbers." },
        { id: 19, title: "Home Vastu Analysis", priceINR: "₹499", oldPriceINR: "₹999", priceUSD: "$9.99", oldPriceUSD: "$19.99", desc: "Align your living space with cosmic energies for peace and prosperity." },
        { id: 20, title: "Business Vastu Report", priceINR: "₹799", oldPriceINR: "₹1599", priceUSD: "$15.99", oldPriceUSD: "$31.99", desc: "Maximize growth and minimize obstacles in your commercial space." },
      ]
    }
  ];
};

const storeDict = {
  en: { back: "BACK", cart: "CART", title: "Premium Reports", desc: "Unlock profound cosmic insights. Choose from our curated collection of high-precision astrological blueprints.", add: "ADD", added: "ADDED" },
  hi: { back: "वापस", cart: "कार्ट", title: "प्रीमियम रिपोर्ट", desc: "गहन लौकिक अंतर्दृष्टि प्राप्त करें। उच्च-सटीक ज्योतिषीय ब्लूप्रिंट के हमारे क्यूरेटेड संग्रह में से चुनें।", add: "जोड़ें", added: "जोड़ दिया" }
};

export default function StorePage() {
  const { cart, addToCart } = useCart();
  const { isSaleActive } = useSale();
  const { language } = useLanguage();
  
  const tiers = getTiers(language);
  const t = storeDict[language];

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden py-12 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6 mb-12">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
          <Link href="/checkout" className="flex items-center gap-2 text-[#E5D6C8] hover:text-[#B78E28] transition-colors uppercase tracking-[0.2em] text-xs">
            <ShoppingCart className="w-4 h-4" />
            <span>{t.cart} ({cart.length})</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <BookOpen className="w-8 h-8 text-[#B78E28] mx-auto mb-6" strokeWidth={1} />
          <h1 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
            {t.desc}
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
                          <span className="block text-xl font-light text-[#B78E28]">
                            {isSaleActive ? report.priceINR : report.oldPriceINR}
                          </span>
                          {isSaleActive && <span className="block text-xs text-[#7D756B] line-through mb-1">{report.oldPriceINR}</span>}
                        </div>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="block text-[10px] text-[#B78E28] uppercase">
                            {isSaleActive ? report.priceUSD : report.oldPriceUSD}
                          </span>
                          {isSaleActive && <span className="block text-[8px] text-[#7D756B] line-through mb-[1px] uppercase">{report.oldPriceUSD}</span>}
                        </div>
                      </div>
                      {cart.find(item => item.id === report.id) ? (
                        <button disabled className="bg-[#E5D6C8] border border-[#E5D6C8] text-[#121212] text-[10px] uppercase tracking-widest px-4 py-2 rounded-full font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> {t.added}
                        </button>
                      ) : (
                        <button 
                          onClick={() => addToCart(report as any)}
                          className="bg-transparent border border-[#E5D6C8] text-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors font-semibold"
                        >
                          {t.add}
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
