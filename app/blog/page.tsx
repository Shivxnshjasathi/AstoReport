'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_POSTS } from '../data/blog';
import { motion } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'KNOWLEDGE HUB',
    title: 'Astro Blog',
    subtitle: 'EXPLORE ANCIENT VEDIC WISDOM, PRACTICAL REMEDIES, AND CELESTIAL INSIGHTS.',
    readMore: 'READ ARTICLE',
    cta: 'Want personalized insights for your birth chart?',
    ctaBtn: 'ORDER YOUR REPORT'
  },
  hi: {
    back: 'वापस',
    badge: 'ज्ञान केंद्र',
    title: 'एस्ट्रो ब्लॉग',
    subtitle: 'प्राचीन वैदिक ज्ञान, व्यावहारिक उपायों और खगोलीय अंतर्दृष्टि का अन्वेषण करें।',
    readMore: 'लेख पढ़ें',
    cta: 'अपनी जन्म कुंडली के लिए व्यक्तिगत जानकारी चाहते हैं?',
    ctaBtn: 'अपनी रिपोर्ट ऑर्डर करें'
  }
};

export default function BlogPage() {
  const { language } = useLanguage();
  const t = dict[language];

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1A1812] to-[#121212]" />
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[#B78E28]/5 blur-[120px] opacity-30" />
      </div>

      <div className="max-w-[1200px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-12">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]">
            <BookOpen className="w-3.5 h-3.5" />
            {t.badge}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.2em] max-w-2xl mx-auto leading-loose">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#121212]/80 backdrop-blur-xl border border-[#7D756B]/20 rounded-[2.5rem] overflow-hidden flex flex-col group hover:border-[#B78E28]/40 transition-all shadow-xl"
            >
              <div className="relative h-48 w-full bg-[#1A1A1A] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10" />
                <div className="absolute inset-0 bg-[#B78E28]/10 pattern-dots" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#B78E28]/20 text-[#B78E28] border border-[#B78E28]/30 px-3 py-1 rounded-full text-[8px] uppercase tracking-widest backdrop-blur-md">
                    {language === 'hi' ? post.category.hi : post.category.en}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1 relative z-20 -mt-8">
                <div className="flex items-center gap-4 mb-4 text-[#7D756B] text-[8px] uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(post.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                </div>

                <h2 className="text-xl font-serif text-[#E5D6C8] uppercase tracking-wide mb-4 leading-snug group-hover:text-[#B78E28] transition-colors">
                  {language === 'hi' ? post.title.hi : post.title.en}
                </h2>
                
                <p className="text-xs text-[#7D756B] leading-relaxed mb-8 line-clamp-3">
                  {language === 'hi' ? post.excerpt.hi : post.excerpt.en}
                </p>

                <div className="mt-auto pt-6 border-t border-[#7D756B]/20">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center justify-between text-[#B78E28] text-[9px] uppercase tracking-[0.2em] font-bold group/btn"
                  >
                    {t.readMore}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1A1A1A]/30 backdrop-blur-md border border-[#B78E28]/20 rounded-[2rem] p-10 text-center mt-20"
        >
          <Sparkles className="w-10 h-10 text-[#B78E28] mx-auto mb-6" />
          <h3 className="text-xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-6 font-light">
            {t.cta}
          </h3>
          <Link
            href="/store"
            className="group inline-flex items-center gap-3 bg-[#B78E28] text-[#121212] px-10 py-5 rounded-full text-[10px] uppercase tracking-[0.3em] font-black hover:bg-[#E5D6C8] transition-all shadow-2xl"
          >
            {t.ctaBtn}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
