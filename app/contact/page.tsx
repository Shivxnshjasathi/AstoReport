'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const contactDict = {
  en: {
    back: "BACK",
    contactUs: "CONTACT US",
    title: "Get in Touch",
    desc: "We are here to help you navigate your cosmic journey. Reach out to us for support, consultations, or inquiries.",
    callUs: "Call Us",
    callTime: "Available Mon-Sat, 10 AM to 7 PM",
    sales: "Sales:",
    support: "Support:",
    emailUs: "Email Us",
    emailTime: "We typically respond within 24 hours.",
    location: "Location",
    locSub: "Our spiritual headquarters",
    sendMsg: "Send a Message",
    nameLabel: "Full Name",
    namePlace: "Enter your name",
    emailLabel: "Email Address",
    emailPlace: "Enter your email",
    msgLabel: "Message",
    msgPlace: "How can we help you?",
    submit: "Send Message",
    alert: "Message Sent Successfully!"
  },
  hi: {
    back: "वापस",
    contactUs: "संपर्क करें",
    title: "संपर्क में रहें",
    desc: "हम आपकी लौकिक यात्रा में आपकी मदद करने के लिए यहाँ हैं। समर्थन, परामर्श या पूछताछ के लिए हमसे संपर्क करें।",
    callUs: "हमें कॉल करें",
    callTime: "सोम-शनि, सुबह 10 बजे से शाम 7 बजे तक उपलब्ध",
    sales: "बिक्री:",
    support: "समर्थन:",
    emailUs: "हमें ईमेल करें",
    emailTime: "हम आमतौर पर 24 घंटे के भीतर जवाब देते हैं।",
    location: "स्थान",
    locSub: "हमारा आध्यात्मिक मुख्यालय",
    sendMsg: "एक संदेश भेजें",
    nameLabel: "पूरा नाम",
    namePlace: "अपना नाम दर्ज करें",
    emailLabel: "ईमेल पता",
    emailPlace: "अपना ईमेल दर्ज करें",
    msgLabel: "संदेश",
    msgPlace: "हम आपकी कैसे मदद कर सकते हैं?",
    submit: "संदेश भेजें",
    alert: "संदेश सफलतापूर्वक भेजा गया!"
  }
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = contactDict[language];

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden py-12 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6 mb-12">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#E5D6C8] uppercase tracking-[0.2em] text-xs">
            {t.contactUs}
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-12">
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-[#B78E28]/10 flex items-center justify-center shrink-0 border border-[#B78E28]/30">
                <Phone className="w-5 h-5 text-[#B78E28]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#E5D6C8] font-serif text-xl tracking-widest uppercase mb-2">{t.callUs}</h3>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-4">{t.callTime}</p>
                <div className="space-y-2">
                  <p className="text-[#E5D6C8] text-sm tracking-[0.1em]"><span className="text-[#7D756B] mr-2">{t.sales}</span> +91-6366105204</p>
                  <p className="text-[#E5D6C8] text-sm tracking-[0.1em]"><span className="text-[#7D756B] mr-2">{t.support}</span> +91-6366105204</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-[#B78E28]/10 flex items-center justify-center shrink-0 border border-[#B78E28]/30">
                <Mail className="w-5 h-5 text-[#B78E28]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#E5D6C8] font-serif text-xl tracking-widest uppercase mb-2">{t.emailUs}</h3>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-4">{t.emailTime}</p>
                <p className="text-[#E5D6C8] text-sm tracking-[0.1em]">contact.zincstate@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-[#B78E28]/10 flex items-center justify-center shrink-0 border border-[#B78E28]/30">
                <MapPin className="w-5 h-5 text-[#B78E28]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#E5D6C8] font-serif text-xl tracking-widest uppercase mb-2">{t.location}</h3>
                <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-4">{t.locSub}</p>
                <p className="text-[#E5D6C8] text-sm tracking-[0.1em] leading-relaxed">
                  Bellandur, Bangalore,<br />
                  Karnataka, India - 560103
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-[#121212] border border-[#7D756B]/30 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
              <div className="w-[300px] h-[300px] rounded-full border border-white -top-20 -right-20 absolute" />
            </div>

            <h3 className="text-2xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-8">{t.sendMsg}</h3>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert(t.alert); }}>
              
              <div>
                <label className="block text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-2">{t.nameLabel}</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-[#7D756B]/30 pb-3 text-[#E5D6C8] text-sm focus:outline-none focus:border-[#B78E28] transition-colors"
                  placeholder={t.namePlace}
                  required
                />
              </div>

              <div>
                <label className="block text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-2">{t.emailLabel}</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-[#7D756B]/30 pb-3 text-[#E5D6C8] text-sm focus:outline-none focus:border-[#B78E28] transition-colors"
                  placeholder={t.emailPlace}
                  required
                />
              </div>

              <div>
                <label className="block text-[#7D756B] text-[10px] uppercase tracking-[0.2em] mb-2">{t.msgLabel}</label>
                <textarea 
                  className="w-full bg-transparent border-b border-[#7D756B]/30 pb-3 text-[#E5D6C8] text-sm focus:outline-none focus:border-[#B78E28] transition-colors min-h-[100px] resize-none"
                  placeholder={t.msgPlace}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] py-4 rounded-full text-xs uppercase tracking-widest transition-colors font-semibold flex justify-center items-center gap-3 mt-8"
              >
                {t.submit} <Send className="w-4 h-4" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
