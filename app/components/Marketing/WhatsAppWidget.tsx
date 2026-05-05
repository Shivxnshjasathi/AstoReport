'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const dict = {
  en: {
    greeting: "Namaste! 🙏",
    help: "How can we help you today?",
    placeholder: "Type your question here...",
    online: "Typically replies in 5 mins",
    start: "Start Chat"
  },
  hi: {
    greeting: "नमस्ते! 🙏",
    help: "आज हम आपकी क्या मदद कर सकते हैं?",
    placeholder: "अपना प्रश्न यहाँ लिखें...",
    online: "आमतौर पर 5 मिनट में जवाब मिलता है",
    start: "चैट शुरू करें"
  }
};

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { language } = useLanguage();
  const t = dict[language];

  const handleSend = () => {
    if (!message.trim()) return;
    const waUrl = `https://wa.me/916366105204?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-32 md:bottom-8 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[calc(100vw-48px)] sm:w-[320px] bg-[#1A1A1A] border border-[#7D756B]/30 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#B78E28] p-6 text-[#121212]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center text-[#B78E28] font-serif text-xl">
                    ✧
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm tracking-widest">{t.greeting}</h4>
                    <p className="text-[10px] uppercase tracking-wider opacity-70">{t.online}</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs font-medium leading-relaxed">{t.help}</p>
            </div>

            {/* Chat Body */}
            <div className="p-6 bg-[#121212] space-y-4">
              <div className="bg-[#1A1A1A] border border-[#7D756B]/20 p-4 rounded-2xl rounded-bl-none text-[11px] text-[#7D756B] leading-relaxed">
                {language === 'hi' 
                  ? "नमस्ते! मैं आपकी ज्योतिषीय रिपोर्ट चुनने या किसी भी समस्या के समाधान में मदद कर सकता हूँ।"
                  : "Hello! I can help you choose the right astrological report or assist with any issues you're facing."}
              </div>

              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder={t.placeholder}
                  className="w-full bg-[#1A1A1A] border border-[#7D756B]/30 rounded-2xl p-4 text-[12px] text-[#E5D6C8] focus:outline-none focus:border-[#B78E28] transition-colors resize-none h-24 placeholder-[#7D756B]/50"
                />
                <button
                  onClick={handleSend}
                  className="absolute bottom-3 right-3 p-2 bg-[#B78E28] text-[#121212] rounded-xl hover:scale-110 transition-transform disabled:opacity-50"
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
      >
        <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#121212] animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#121212]" />
      </button>
    </div>
  );
}
