'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, RotateCcw, Heart, Briefcase, HelpCircle, Star, Layers, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { drawCards, DrawnCard, SpreadType } from '../data/tarotCards';
import { useLanguage } from '../context/LanguageContext';

const CARD_SYMBOLS: Record<string, string> = {
  "Fire": "🔥", "Water": "💧", "Air": "🌬️", "Earth": "🌿",
};

const ARCANA_GLYPHS: Record<number, string> = {
  0:"🃏",1:"🎭",2:"🌙",3:"🌺",4:"👑",5:"📿",6:"❤️",7:"⚡",8:"🦁",9:"🏔️",10:"☸️",
  11:"⚖️",12:"🔮",13:"💀",14:"⏳",15:"🔗",16:"🗼",17:"⭐",18:"🌑",19:"☀️",20:"📯",21:"🌍"
};

const SUIT_COLORS: Record<string, string> = {
  "Wands": "#E8763A", "Cups": "#5B8DEF", "Swords": "#A0AEC0", "Pentacles": "#D4A017"
};

const spreads: { id: SpreadType; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'single', label: 'Daily Card', icon: <Star className="w-4 h-4" />, desc: 'One card for today' },
  { id: 'three-card', label: 'Three Card', icon: <Layers className="w-4 h-4" />, desc: 'Past · Present · Future' },
  { id: 'yes-no', label: 'Yes or No', icon: <HelpCircle className="w-4 h-4" />, desc: 'Quick cosmic answer' },
  { id: 'celtic-cross', label: 'Celtic Cross', icon: <Eye className="w-4 h-4" />, desc: '10-card deep reading' },
];

function getCardGlyph(card: DrawnCard['card']): string {
  if (card.arcana === 'major') return ARCANA_GLYPHS[card.number] || '✦';
  const suitGlyphs: Record<string, string> = { Wands: '🪄', Cups: '🏆', Swords: '⚔️', Pentacles: '🪙' };
  return suitGlyphs[card.suit || ''] || '✦';
}

function getCardAccent(card: DrawnCard['card']): string {
  if (card.arcana === 'major') return '#B78E28';
  return SUIT_COLORS[card.suit || ''] || '#B78E28';
}

export default function TarotPage() {
  const [spread, setSpread] = useState<SpreadType>('three-card');
  const [cards, setCards] = useState<DrawnCard[] | null>(null);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [reading, setReading] = useState(false);
  const [tab, setTab] = useState<'upright' | 'love' | 'career'>('upright');
  const { language } = useLanguage();

  const doReading = useCallback(() => {
    setCards(null);
    setFlippedIndices([]);
    setReading(true);
    setTimeout(() => {
      setCards(drawCards(spread));
      setReading(false);
    }, 1200);
  }, [spread]);

  const flipCard = (i: number) => {
    setFlippedIndices(prev => prev.includes(i) ? prev : [...prev, i]);
  };

  const allFlipped = cards ? flippedIndices.length === cards.length : false;

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(183,142,40,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full border border-[#B78E28]/5" style={{ transform: 'translate(-50%, -50%)', animation: 'spin 120s linear infinite' }} />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full border border-[#7D756B]/10" style={{ transform: 'translate(-50%, -50%)', animation: 'spin 80s linear infinite reverse' }} />
      </div>

      <div className="max-w-[1200px] mx-auto w-full pt-12 px-4 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6 mb-10">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {language === 'hi' ? 'वापस' : 'BACK'}
          </Link>
          <div className="flex items-center gap-2 text-[#E5D6C8] uppercase tracking-[0.2em] text-[9px]">
            <Sparkles className="w-4 h-4 text-[#B78E28]" />
            {language === 'hi' ? 'टैरो रीडिंग' : 'TAROT READING'}
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">
            {language === 'hi' ? 'दिव्य टैरो' : 'Divine Tarot'}
          </h1>
          <div className="w-16 h-[1px] bg-[#B78E28] mx-auto mb-4" />
          <p className="text-[#7D756B] text-[9px] sm:text-xs uppercase tracking-[0.2em] max-w-xl mx-auto">
            {language === 'hi' ? 'अपने ब्रह्मांडीय मार्गदर्शन के लिए एक स्प्रेड चुनें' : 'Choose a spread to unveil your cosmic guidance'}
          </p>
        </div>

        {/* Spread Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {spreads.map(s => (
            <button
              key={s.id}
              onClick={() => { setSpread(s.id); setCards(null); setFlippedIndices([]); }}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                spread === s.id
                  ? 'border-[#B78E28] bg-[#B78E28]/10 shadow-[0_0_30px_rgba(183,142,40,0.15)]'
                  : 'border-[#7D756B]/30 hover:border-[#7D756B]/60'
              }`}
            >
              <div className={`mx-auto mb-2 ${spread === s.id ? 'text-[#B78E28]' : 'text-[#7D756B]'}`}>{s.icon}</div>
              <p className={`text-xs uppercase tracking-[0.15em] mb-1 ${spread === s.id ? 'text-[#E5D6C8]' : 'text-[#7D756B]'}`}>{s.label}</p>
              <p className="text-[8px] text-[#7D756B]/60 uppercase tracking-wider">{s.desc}</p>
            </button>
          ))}
        </div>

        {/* Draw Button */}
        <div className="text-center mb-12">
          <button
            onClick={doReading}
            disabled={reading}
            className="group relative inline-flex items-center gap-4 bg-[#B78E28] text-[#121212] px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(183,142,40,0.4)] disabled:opacity-50"
          >
            <span className="relative z-10">{reading ? (language === 'hi' ? 'ब्रह्मांड से जुड़ रहे हैं...' : 'Channeling the cosmos...') : (language === 'hi' ? 'पत्ते खोलें' : 'Draw Cards')}</span>
            {reading ? <Sparkles className="w-4 h-4 animate-spin relative z-10" /> : <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 relative z-10" />}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E5D6C8] to-[#B78E28] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Cards Display */}
        <AnimatePresence mode="wait">
          {cards && (
            <motion.div
              key={spread + cards[0].card.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Cards Grid */}
              <div
                className={`grid gap-3 sm:gap-4 mb-10 ${
                  cards.length === 1 ? 'grid-cols-1 max-w-[200px] mx-auto' :
                  cards.length <= 3 ? 'grid-cols-3 max-w-2xl mx-auto' :
                  'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-5xl mx-auto'
                }`}
              >
                {cards.map((dc, i) => {
                  const isFlipped = flippedIndices.includes(i);
                  const accent = getCardAccent(dc.card);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15, duration: 0.6 }}
                    >
                      <button
                        onClick={() => flipCard(i)}
                        className={`w-full rounded-2xl relative transition-all duration-500 ${
                          isFlipped ? '' : 'hover:scale-105 cursor-pointer'
                        }`}
                        style={{ aspectRatio: '2/3' }}
                        disabled={isFlipped}
                      >
                        {!isFlipped ? (
                          /* Card Back */
                          <div className="absolute inset-0 rounded-2xl border border-[#B78E28]/40 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] flex flex-col items-center justify-center overflow-hidden group">
                            <div className="absolute inset-2 rounded-xl border border-[#B78E28]/20" />
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">✦</div>
                            <p className="text-[8px] uppercase tracking-[0.3em] text-[#B78E28]/60">{dc.position}</p>
                            <p className="text-[7px] uppercase tracking-widest text-[#7D756B]/40 mt-1">tap to reveal</p>
                            <div className="absolute inset-0 bg-[#B78E28]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                          </div>
                        ) : (
                          /* Card Front */
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 rounded-2xl border bg-gradient-to-b from-[#1A1A1A] via-[#151515] to-[#0D0D0D] flex flex-col items-center justify-between p-3 sm:p-4 overflow-hidden"
                            style={{ borderColor: `${accent}40` }}
                          >
                            <div className="absolute top-0 left-0 right-0 h-1 opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                            <div>
                              <p className="text-[7px] uppercase tracking-[0.3em] text-[#7D756B] mb-1">{dc.position}</p>
                              {dc.isReversed && <span className="text-[7px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Reversed</span>}
                            </div>
                            <div className="text-center">
                              <div className="text-2xl sm:text-3xl mb-2" style={dc.isReversed ? { transform: 'rotate(180deg)' } : {}}>{getCardGlyph(dc.card)}</div>
                              <h3 className="font-serif text-[10px] sm:text-sm tracking-wider mb-1" style={{ color: accent }}>{dc.card.name}</h3>
                              <p className="text-[6px] sm:text-[7px] uppercase tracking-[0.2em] text-[#7D756B]">{dc.card.element} {CARD_SYMBOLS[dc.card.element]}</p>
                            </div>
                            <p className="text-[6px] sm:text-[7px] text-center text-[#7D756B]/80 leading-relaxed overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{dc.isReversed ? dc.card.reversed : dc.card.upright}</p>
                          </motion.div>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Yes/No Answer */}
              {spread === 'yes-no' && allFlipped && cards[0] && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10">
                  <div className={`inline-block px-10 py-4 rounded-full border text-xl uppercase tracking-[0.3em] font-serif ${
                    cards[0].card.yesNo === 'yes' ? 'border-green-500/40 bg-green-500/10 text-green-400' :
                    cards[0].card.yesNo === 'no' ? 'border-red-500/40 bg-red-500/10 text-red-400' :
                    'border-yellow-500/40 bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {cards[0].card.yesNo === 'yes' ? '✓ Yes' : cards[0].card.yesNo === 'no' ? '✗ No' : '~ Maybe'}
                  </div>
                </motion.div>
              )}

              {/* Detailed Reading - when all cards revealed */}
              {allFlipped && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  {/* Tab Selector */}
                  <div className="flex justify-center gap-3 mb-8">
                    {([
                      { id: 'upright' as const, label: language === 'hi' ? 'सामान्य' : 'General', icon: <Sparkles className="w-3 h-3" /> },
                      { id: 'love' as const, label: language === 'hi' ? 'प्रेम' : 'Love', icon: <Heart className="w-3 h-3" /> },
                      { id: 'career' as const, label: language === 'hi' ? 'करियर' : 'Career', icon: <Briefcase className="w-3 h-3" /> },
                    ]).map(t2 => (
                      <button
                        key={t2.id}
                        onClick={() => setTab(t2.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-full text-[9px] uppercase tracking-[0.2em] border transition-all ${
                          tab === t2.id
                            ? 'border-[#B78E28] bg-[#B78E28]/10 text-[#B78E28]'
                            : 'border-[#7D756B]/30 text-[#7D756B] hover:border-[#7D756B]/60'
                        }`}
                      >
                        {t2.icon} {t2.label}
                      </button>
                    ))}
                  </div>

                  {/* Card Details */}
                  <div className="space-y-4 max-w-3xl mx-auto">
                    {cards.map((dc, i) => {
                      const accent = getCardAccent(dc.card);
                      const meaning = tab === 'love' ? dc.card.love : tab === 'career' ? dc.card.career : (dc.isReversed ? dc.card.reversed : dc.card.upright);
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-[#1A1A1A]/60 border border-[#7D756B]/20 rounded-2xl p-6 backdrop-blur-sm hover:border-[#B78E28]/30 transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-2xl flex-shrink-0" style={dc.isReversed ? { transform: 'rotate(180deg)' } : {}}>{getCardGlyph(dc.card)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1 flex-wrap">
                                <span className="text-[8px] uppercase tracking-[0.3em] text-[#7D756B]">{dc.position}</span>
                                {dc.isReversed && <span className="text-[7px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full">Reversed</span>}
                              </div>
                              <h3 className="font-serif text-lg tracking-wider mb-2" style={{ color: accent }}>{dc.card.name}</h3>
                              <p className="text-sm text-[#E5D6C8]/80 leading-relaxed mb-3">{meaning}</p>
                              <div className="flex flex-wrap gap-2">
                                {dc.card.keywords.map(kw => (
                                  <span key={kw} className="text-[7px] uppercase tracking-wider px-2 py-1 rounded-full border border-[#7D756B]/20 text-[#7D756B]">{kw}</span>
                                ))}
                                <span className="text-[7px] uppercase tracking-wider px-2 py-1 rounded-full border text-[#7D756B]" style={{ borderColor: `${accent}30` }}>
                                  {dc.card.element} {CARD_SYMBOLS[dc.card.element]}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <div className="mt-10 bg-[#E5D6C8]/5 border border-[#B78E28]/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
                    <div>
                      <h3 className="text-[#E5D6C8] text-sm uppercase tracking-[0.1em] mb-1">{language === 'hi' ? 'गहरी जानकारी चाहते हैं?' : 'Want deeper insight?'}</h3>
                      <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.1em]">{language === 'hi' ? 'व्यक्तिगत प्रीमियम रिपोर्ट प्राप्त करें' : 'Get a personalized premium Kundli report'}</p>
                    </div>
                    <Link href="/store" className="bg-transparent border border-[#B78E28] text-[#B78E28] hover:bg-[#B78E28] hover:text-[#121212] px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-colors font-semibold whitespace-nowrap">
                      {language === 'hi' ? 'रिपोर्ट खरीदें' : 'Buy Report'}
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!cards && !reading && (
          <div className="text-center py-20 opacity-40">
            <div className="text-6xl mb-6">🃏</div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#7D756B]">{language === 'hi' ? 'पत्ते खोलने के लिए ऊपर बटन दबाएं' : 'Press draw cards to begin your reading'}</p>
          </div>
        )}
      </div>
    </main>
  );
}
