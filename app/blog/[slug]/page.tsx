'use client';
import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, User, BookOpen, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { BLOG_POSTS } from '../../data/blog';
import { motion } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK TO BLOG',
    writtenBy: 'Written by',
    publishedOn: 'Published on',
    share: 'SHARE ARTICLE',
    related: 'RELATED ARTICLES',
    ctaTitle: 'Unlock Your Cosmic Blueprint',
    ctaDesc: 'Get a professional Vedic analysis based on your exact birth coordinates.',
    ctaBtn: 'ORDER PERSONALIZED REPORT'
  },
  hi: {
    back: 'ब्लॉग पर वापस',
    writtenBy: 'द्वारा लिखित',
    publishedOn: 'प्रकाशित तिथि',
    share: 'लेख साझा करें',
    related: 'संबंधित लेख',
    ctaTitle: 'अपना कॉस्मिक ब्लूप्रिंट अनलॉक करें',
    ctaDesc: 'अपने सटीक जन्म निर्देशांक के आधार पर पेशेवर वैदिक विश्लेषण प्राप्त करें।',
    ctaBtn: 'व्यक्तिगत रिपोर्ट ऑर्डर करें'
  }
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { language } = useLanguage();
  const t = dict[language];

  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <p className="text-[#E5D6C8]">Post not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1A1812] to-[#121212]" />
      </div>

      <div className="max-w-[800px] mx-auto w-full pt-6 px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-12">
          <Link href="/blog" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-[#7D756B] hover:text-[#B78E28] transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#B78E28]/10 text-[#B78E28] border border-[#B78E28]/20 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
                {language === 'hi' ? post.category.hi : post.category.en}
              </span>
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-wide leading-tight mb-8">
              {language === 'hi' ? post.title.hi : post.title.en}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-[#7D756B] text-[10px] uppercase tracking-widest border-y border-[#7D756B]/20 py-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#B78E28]" />
                <span>{t.writtenBy} <span className="text-[#E5D6C8]">{post.author}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B78E28]" />
                <span>{t.publishedOn} <span className="text-[#E5D6C8]">{new Date(post.date).toLocaleDateString()}</span></span>
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-gold max-w-none">
            <div className="text-[#E5D6C8]/90 text-lg leading-relaxed space-y-8 font-light whitespace-pre-wrap">
              {language === 'hi' ? post.content.hi : post.content.en}
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-[#B78E28]/30 rounded-[3rem] p-8 lg:p-12 text-center"
        >
          <Sparkles className="w-12 h-12 text-[#B78E28] mx-auto mb-6" />
          <h2 className="text-2xl lg:text-3xl font-serif text-[#E5D6C8] uppercase tracking-widest mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-sm text-[#7D756B] uppercase tracking-widest leading-loose mb-10 max-w-lg mx-auto">
            {t.ctaDesc}
          </p>
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
