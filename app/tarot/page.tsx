'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, RotateCcw, Heart, Briefcase, HelpCircle, Star, Layers, Eye, RefreshCw, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  drawCards, 
  DrawnCard, 
  SpreadType, 
  TAROT_TRANSLATIONS, 
  SUIT_TRANSLATIONS, 
  ELEMENT_TRANSLATIONS, 
  YES_NO_TRANSLATIONS 
} from '../data/tarotCards';
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

// Advanced Cosmic Synthesis Generator
function generateSynthesis(cards: DrawnCard[], focus: string, language: 'en' | 'hi') {
  const isHi = language === 'hi';
  
  // 1. Elements analysis
  const elements = cards.map(c => c.card.element);
  const counts: Record<string, number> = {};
  elements.forEach(el => counts[el] = (counts[el] || 0) + 1);
  let dominantElement = 'Air';
  let maxCount = 0;
  for (const [el, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantElement = el;
    }
  }

  // 2. Arcana mix
  const majorCount = cards.filter(c => c.card.arcana === 'major').length;
  const isMajorDominant = majorCount >= cards.length / 2;

  // 3. Reversed count
  const reversedCount = cards.filter(c => c.isReversed).length;
  const isReversedDominant = reversedCount >= cards.length / 2;

  let elementText = "";
  if (dominantElement === 'Fire') {
    elementText = isHi 
      ? "अग्नि तत्व की प्रबलता दर्शाती है कि इस समय आपके जीवन में अत्यधिक ऊर्जा, जुनून और प्रेरणा है। आप तुरंत साहसिक निर्णय लें।" 
      : "The dominance of Fire element indicates high energy, passion, and intense inspiration in your life right now. Bold actions are favored.";
  } else if (dominantElement === 'Water') {
    elementText = isHi 
      ? "जल तत्व की प्रबलता यह दर्शाती है कि यह समय गहरी भावनाओं, अंतर्ज्ञान और भावनात्मक उपचार का है। अपने अंतर्मन की आवाज सुनें।" 
      : "The dominance of Water element highlights deep emotions, intuition, and emotional healing. Listen to your inner voice.";
  } else if (dominantElement === 'Air') {
    elementText = isHi 
      ? "वायु तत्व की प्रबलता आपके जीवन में बौद्धिक स्पष्टता, संचार और नए विचारों के महत्व को दर्शाती है। सोच-समझकर संवाद करें।" 
      : "The dominance of Air element emphasizes mental clarity, communication, and new ideas. Plan carefully and communicate well.";
  } else {
    elementText = isHi 
      ? "पृथ्वी तत्व की प्रबलता दर्शाती है कि आपको व्यावहारिक स्थिरता, धैर्य और भौतिक/वित्तीय सुरक्षा पर ध्यान केंद्रित करना चाहिए।" 
      : "The dominance of Earth element shows that you should focus on practical stability, patience, and material or financial security.";
  }

  let arcanaText = "";
  if (isMajorDominant) {
    arcanaText = isHi 
      ? "मेजर आर्काना (मुख्य पत्ते) की बहुलता यह दर्शाती है कि आप जीवन के एक बड़े बदलाव या ब्रह्मांडीय भाग्य के दौर से गुजर रहे हैं।" 
      : "The high number of Major Arcana cards signifies that you are undergoing a major life transition or a fated cosmic cycle.";
  } else {
    arcanaText = isHi 
      ? "माइनर आर्काना (लघु पत्ते) की बहुलता दर्शाती है कि यह परिस्थिति आपके दैनिक फैसलों, कार्यों और वर्तमान प्रयासों से संबंधित है।" 
      : "The high number of Minor Arcana cards suggests that this situation is highly related to your daily decisions, actions, and current efforts.";
  }

  let blockText = "";
  if (isReversedDominant) {
    blockText = isHi 
      ? "उल्टे पत्तों (Reversed Cards) की अधिकता यह दर्शाती है कि आप किसी आंतरिक प्रतिरोध, दबी हुई भावनाओं या रुकावटों का सामना कर रहे हैं।" 
      : "Multiple reversed cards indicate that you might be facing internal resistance, hidden blockages, or unexpressed emotions.";
  } else {
    blockText = isHi 
      ? "सीधे पत्तों (Upright Cards) की बहुलता दर्शाती है कि आपकी बाहरी परिस्थितियां अनुकूल हैं और ऊर्जा का प्रवाह सीधा और सकारात्मक है।" 
      : "The dominance of upright cards shows that external conditions are favorable and the energy flow is direct and positive.";
  }

  let adviceText = "";
  if (focus === 'love') {
    adviceText = isHi 
      ? "प्रेम के संदर्भ में, ब्रह्मांड आपको सलाह देता है कि आप पुराने पैटर्न को छोड़कर अपने हृदय चक्र को खोलें। धैर्यपूर्वक संवाद से सब ठीक होगा।"
      : "In matters of love, the cosmos advises you to let go of old patterns and open your heart. Patient communication will resolve blockages.";
  } else if (focus === 'career') {
    adviceText = isHi 
      ? "करियर और वित्त के लिए, यह समय अपने कौशल पर भरोसा करने और व्यावहारिक योजना बनाने का है। अनावश्यक जोखिम से बचें।"
      : "For career and finances, this is a time to trust your skills and execute a practical plan. Avoid unnecessary impulse spending.";
  } else if (focus === 'spiritual') {
    adviceText = isHi 
      ? "आध्यात्मिक मार्ग पर, यह समय आत्मनिरीक्षण और मौन साधना का है। आपका अंतर्ज्ञान आपको बिल्कुल सही दिशा में ले जा रहा है।"
      : "On your spiritual path, this is a time for introspection and silent meditation. Trust that your intuition is leading you correctly.";
  } else {
    adviceText = isHi 
      ? "सामान्य मार्गदर्शन के रूप में, ब्रह्मांड आपको वर्तमान क्षण में जागरूक रहने और किसी भी बदलाव का शांति से स्वागत करने का संदेश देता है।"
      : "For general guidance, the cosmos asks you to remain mindful of the present moment and welcome any shifts with grace and calm.";
  }

  return {
    dominantElement,
    elementText,
    arcanaText,
    blockText,
    adviceText
  };
}

export default function TarotPage() {
  const [spread, setSpread] = useState<SpreadType>('three-card');
  const [focus, setFocus] = useState<'general' | 'love' | 'career' | 'spiritual'>('general');
  const [question, setQuestion] = useState('');
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
  const isHi = language === 'hi';

  // Compute cosmic synthesis of the reading
  const synthesis = cards && allFlipped ? generateSynthesis(cards, focus, language) : null;

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background aesthetics */}
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
            {isHi ? 'वापस' : 'BACK'}
          </Link>
          <div className="flex items-center gap-2 text-[#E5D6C8] uppercase tracking-[0.2em] text-[9px]">
            <Sparkles className="w-4 h-4 text-[#B78E28]" />
            {isHi ? 'टैरो रीडिंग' : 'TAROT READING'}
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light">
            {isHi ? 'दिव्य टैरो रीडिंग' : 'Divine Tarot Reading'}
          </h1>
          <div className="w-16 h-[1px] bg-[#B78E28] mx-auto mb-4" />
          <p className="text-[#7D756B] text-[9px] sm:text-xs uppercase tracking-[0.2em] max-w-xl mx-auto">
            {isHi ? 'अपने ब्रह्मांडीय मार्गदर्शन और दिव्य उत्तरों को प्रकट करें' : 'Unveil your cosmic guidance and divine answers'}
          </p>
        </div>

        {/* Focus & Spread Selectors Form Card */}
        <div className="bg-[#1A1A1A]/40 border border-[#7D756B]/20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          {/* Question / Focus Selector */}
          <div className="mb-6">
            <label className="block text-[#7D756B] text-[9px] uppercase tracking-[0.25em] mb-3">
              {isHi ? '1. अपने मार्गदर्शन का विषय चुनें' : '1. Select Reading Focus'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {([
                { id: 'general' as const, label: isHi ? 'सामान्य मार्गदर्शन' : 'General Guidance', icon: <Compass className="w-3.5 h-3.5" /> },
                { id: 'love' as const, label: isHi ? 'प्रेम और संबंध' : 'Love & Romance', icon: <Heart className="w-3.5 h-3.5" /> },
                { id: 'career' as const, label: isHi ? 'करियर और धन' : 'Career & Finance', icon: <Briefcase className="w-3.5 h-3.5" /> },
                { id: 'spiritual' as const, label: isHi ? 'आध्यात्मिक यात्रा' : 'Spiritual Journey', icon: <Sparkles className="w-3.5 h-3.5" /> }
              ]).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFocus(item.id)}
                  className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl border text-[9px] uppercase tracking-wider transition-all duration-300 ${
                    focus === item.id 
                      ? 'border-[#B78E28] bg-[#B78E28]/10 text-[#E5D6C8]' 
                      : 'border-[#7D756B]/20 text-[#7D756B] hover:border-[#7D756B]/40'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Specific Question Input */}
          <div className="mb-6">
            <label className="block text-[#7D756B] text-[9px] uppercase tracking-[0.25em] mb-2">
              {isHi ? '2. अपना विशिष्ट प्रश्न दर्ज करें (वैकल्पिक)' : '2. Enter Your Specific Question (Optional)'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={isHi ? "उदाहरण के लिए: क्या मुझे इस महीने नया नौकरी का अवसर मिलेगा?" : "e.g., 'Will my upcoming business venture succeed?'"}
                className="w-full bg-[#121212]/60 border border-[#7D756B]/30 rounded-xl px-4 py-3 text-xs text-[#E5D6C8] placeholder-[#7D756B]/60 focus:outline-none focus:border-[#B78E28] transition-colors"
              />
              <Sparkles className="absolute right-3.5 top-3.5 w-4 h-4 text-[#7D756B]/40" />
            </div>
          </div>

          {/* Spread Selector */}
          <div>
            <label className="block text-[#7D756B] text-[9px] uppercase tracking-[0.25em] mb-3">
              {isHi ? '3. टैरो स्प्रेड का प्रकार चुनें' : '3. Choose Tarot Spread Type'}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {spreads.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSpread(s.id); setCards(null); setFlippedIndices([]); }}
                  className={`p-3.5 rounded-xl border text-center transition-all duration-300 ${
                    spread === s.id
                      ? 'border-[#B78E28] bg-[#B78E28]/10 shadow-[0_0_20px_rgba(183,142,40,0.1)]'
                      : 'border-[#7D756B]/20 hover:border-[#7D756B]/40'
                  }`}
                >
                  <div className={`mx-auto mb-1.5 ${spread === s.id ? 'text-[#B78E28]' : 'text-[#7D756B]'}`}>{s.icon}</div>
                  <p className={`text-[10px] uppercase tracking-[0.15em] mb-0.5 ${spread === s.id ? 'text-[#E5D6C8]' : 'text-[#7D756B]'}`}>{s.label}</p>
                  <p className="text-[7px] text-[#7D756B]/60 uppercase tracking-wider">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Draw Button */}
        <div className="text-center mb-12">
          <button
            onClick={doReading}
            disabled={reading}
            className="group relative inline-flex items-center gap-4 bg-[#B78E28] text-[#121212] px-12 py-4.5 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(183,142,40,0.4)] disabled:opacity-50"
          >
            <span className="relative z-10">
              {reading 
                ? (isHi ? 'ब्रह्मांडीय ऊर्जा से जुड़ रहे हैं...' : 'Channeling the Cosmos...') 
                : (isHi ? 'दिव्य पत्ते खोलें' : 'Draw Sacred Cards')
              }
            </span>
            {reading ? <RefreshCw className="w-4 h-4 animate-spin relative z-10" /> : <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 relative z-10" />}
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
              {/* Help tip when not all cards are revealed */}
              {!allFlipped && (
                <div className="text-center mb-6 animate-pulse">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#B78E28]">
                    {isHi ? '✦ मार्गदर्शन प्रकट करने के लिए सभी पत्तों पर टैप करें ✦' : '✦ Tap all cards to reveal your divine reading ✦'}
                  </p>
                </div>
              )}

              {/* Cards Grid */}
              <div
                className={`grid gap-4 mb-12 ${
                  cards.length === 1 ? 'grid-cols-1 max-w-[220px] mx-auto' :
                  cards.length <= 3 ? 'grid-cols-3 max-w-2xl mx-auto' :
                  'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-5xl mx-auto'
                }`}
              >
                {cards.map((dc, i) => {
                  const isFlipped = flippedIndices.includes(i);
                  const accent = getCardAccent(dc.card);
                  
                  // Localized translations helper
                  const details = TAROT_TRANSLATIONS[dc.card.name] || {
                    nameHi: dc.card.name,
                    uprightHi: dc.card.upright,
                    reversedHi: dc.card.reversed,
                  };
                  
                  const displayName = isHi ? details.nameHi : dc.card.name;
                  const displayMeaning = dc.isReversed 
                    ? (isHi ? details.reversedHi : dc.card.reversed)
                    : (isHi ? details.uprightHi : dc.card.upright);

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.12, duration: 0.6 }}
                    >
                      <button
                        onClick={() => flipCard(i)}
                        className={`w-full rounded-2xl relative transition-all duration-500 ${
                          isFlipped ? '' : 'hover:scale-105 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(183,142,40,0.2)]'
                        }`}
                        style={{ aspectRatio: '2/3' }}
                        disabled={isFlipped}
                      >
                        {!isFlipped ? (
                          /* Card Back */
                          <div className="absolute inset-0 rounded-2xl border border-[#B78E28]/40 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] flex flex-col items-center justify-center overflow-hidden group">
                            <div className="absolute inset-2 rounded-xl border border-[#B78E28]/10" />
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform text-[#B78E28]/70">✦</div>
                            <p className="text-[8px] uppercase tracking-[0.25em] text-[#B78E28]/80 px-2 text-center leading-normal">{dc.position}</p>
                            <p className="text-[6px] uppercase tracking-widest text-[#7D756B]/50 mt-2 font-semibold">tap to reveal</p>
                            <div className="absolute inset-0 bg-[#B78E28]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                          </div>
                        ) : (
                          /* Card Front */
                          <motion.div
                            initial={{ opacity: 0, rotateY: 180 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 rounded-2xl border bg-gradient-to-b from-[#1E1E1E] via-[#151515] to-[#0D0D0D] flex flex-col items-center justify-between p-3.5 overflow-hidden"
                            style={{ borderColor: `${accent}50`, boxShadow: `0 4px 30px ${accent}20` }}
                          >
                            <div className="absolute top-0 left-0 right-0 h-1 opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                            <div className="text-center w-full">
                              <p className="text-[7px] uppercase tracking-[0.35em] text-[#7D756B] font-semibold">{dc.position}</p>
                              {dc.isReversed && <span className="text-[6px] font-bold bg-red-950/60 border border-red-500/20 text-red-400 px-2 py-0.5 rounded-full uppercase tracking-widest mt-1 inline-block">Reversed</span>}
                            </div>
                            <div className="text-center my-auto w-full">
                              <div className="text-3xl mb-2.5 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] animate-pulse" style={dc.isReversed ? { transform: 'rotate(180deg)' } : {}}>{getCardGlyph(dc.card)}</div>
                              <h3 className="font-serif text-[10px] sm:text-xs tracking-wider mb-1 px-1 font-semibold leading-snug line-clamp-1" style={{ color: accent }}>{displayName}</h3>
                              <p className="text-[6px] uppercase tracking-[0.2em] text-[#7D756B]/90 font-medium">
                                {isHi ? (SUIT_TRANSLATIONS[dc.card.suit || ''] || ELEMENT_TRANSLATIONS[dc.card.element] || '') : `${dc.card.element} ${CARD_SYMBOLS[dc.card.element]}`}
                              </p>
                            </div>
                            <p className="text-[6.5px] sm:text-[7.5px] text-center text-[#7D756B] leading-relaxed line-clamp-3 overflow-hidden px-0.5">{displayMeaning}</p>
                          </motion.div>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Yes/No Answer Option */}
              {spread === 'yes-no' && allFlipped && cards[0] && (() => {
                const cardDetails = TAROT_TRANSLATIONS[cards[0].card.name] || { nameHi: cards[0].card.name };
                const yesNoDisplayName = isHi ? cardDetails.nameHi : cards[0].card.name;
                return (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10">
                    <div className="inline-block bg-[#1A1A1A]/80 border border-[#B78E28]/30 rounded-3xl p-6 max-w-md mx-auto">
                      <p className="text-[#7D756B] text-[8px] uppercase tracking-[0.2em] mb-2">{isHi ? 'ब्रह्मांड का स्पष्ट उत्तर' : 'Cosmic Decision'}</p>
                      <div className={`inline-block px-10 py-4.5 rounded-full border text-xl uppercase tracking-[0.3em] font-serif font-semibold mb-3 ${
                        cards[0].card.yesNo === 'yes' ? 'border-green-500/40 bg-green-500/10 text-green-400' :
                        cards[0].card.yesNo === 'no' ? 'border-red-500/40 bg-red-500/10 text-red-400' :
                        'border-yellow-500/40 bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {isHi ? (YES_NO_TRANSLATIONS[cards[0].card.yesNo] || '') : cards[0].card.yesNo === 'yes' ? '✓ Yes' : cards[0].card.yesNo === 'no' ? '✗ No' : '~ Maybe'}
                      </div>
                      <p className="text-[10px] text-[#7D756B] leading-relaxed">
                        {isHi 
                          ? `यह उत्तर "${yesNoDisplayName}" की ऊर्जा पर आधारित है, जो दर्शाती है कि परिणाम ${cards[0].card.yesNo === 'yes' ? 'सकारात्मक और आपके पक्ष में है।' : cards[0].card.yesNo === 'no' ? 'प्रतिकूल है, अधिक आत्मनिरीक्षण की आवश्यकता है।' : 'अस्पष्ट है, सही समय की प्रतीक्षा करें।'}`
                          : `This decision is shaped by the active energy of ${yesNoDisplayName}, implying a ${cards[0].card.yesNo === 'yes' ? 'highly favorable and positive result.' : cards[0].card.yesNo === 'no' ? 'highly challenging or restrictive path requiring redirection.' : 'delicate and uncertain situation that requires patient timing.'}`
                        }
                      </p>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Advanced Cosmic Synthesis - Only displayed when all cards are flipped */}
              {allFlipped && synthesis && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.2 }}
                  className="max-w-3xl mx-auto mb-12 bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-[#B78E28]/40 rounded-3xl p-6.5 sm:p-8 relative overflow-hidden shadow-[0_0_40px_rgba(183,142,40,0.1)]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B78E28]/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#B78E28]/10 border border-[#B78E28]/30 flex items-center justify-center text-[#B78E28]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg tracking-wider text-[#E5D6C8]">
                        {isHi ? 'समग्र ब्रह्मांडीय विश्लेषण' : 'Cosmic Reading Synthesis'}
                      </h2>
                      {question && (
                        <p className="text-[8px] text-[#7D756B] uppercase tracking-[0.1em] mt-0.5 max-w-md line-clamp-1">
                          {isHi ? 'प्रश्न:' : 'Question:'} "{question}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4.5 text-xs text-[#E5D6C8]/95 leading-relaxed">
                    <p className="border-l-2 border-[#B78E28]/60 pl-3">
                      <strong>{isHi ? 'तत्व संरेखण (Element Balance): ' : 'Dominant Element: '}</strong>
                      {synthesis.elementText}
                    </p>
                    <p className="border-l-2 border-[#7D756B]/60 pl-3">
                      <strong>{isHi ? 'भाग्य का स्तर (Fate Cycles): ' : 'Fate & Transition Level: '}</strong>
                      {synthesis.arcanaText}
                    </p>
                    <p className="border-l-2 border-red-500/40 pl-3">
                      <strong>{isHi ? 'आंतरिक ऊर्जा प्रवाह (Energy Alignment): ' : 'Inner Blockage Level: '}</strong>
                      {synthesis.blockText}
                    </p>
                    <div className="bg-[#B78E28]/10 border border-[#B78E28]/20 rounded-2xl p-5 mt-6">
                      <div className="flex items-center gap-2 mb-2 text-[#B78E28] font-serif text-[13px] tracking-wide font-medium">
                        <Compass className="w-4 h-4" />
                        {isHi ? 'दिव्य मार्गदर्शन और संदेश' : 'Sacred Guidance & Counsel'}
                      </div>
                      <p className="text-[11px] text-[#E5D6C8]/90 font-light leading-relaxed">
                        {synthesis.adviceText}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Detailed Reading Cards Panel - when all cards revealed */}
              {allFlipped && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  {/* Tab Selector */}
                  <div className="flex justify-center gap-2.5 mb-10">
                    {([
                      { id: 'upright' as const, label: isHi ? 'सामान्य' : 'General', icon: <Sparkles className="w-3 h-3" /> },
                      { id: 'love' as const, label: isHi ? 'प्रेम' : 'Love & Romance', icon: <Heart className="w-3 h-3" /> },
                      { id: 'career' as const, label: isHi ? 'करियर' : 'Career & Finance', icon: <Briefcase className="w-3 h-3" /> },
                    ]).map(t2 => (
                      <button
                        key={t2.id}
                        onClick={() => setTab(t2.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-[9px] uppercase tracking-[0.2em] border transition-all ${
                          tab === t2.id
                            ? 'border-[#B78E28] bg-[#B78E28]/10 text-[#B78E28]'
                            : 'border-[#7D756B]/30 text-[#7D756B] hover:border-[#7D756B]/60'
                        }`}
                      >
                        {t2.icon} {t2.label}
                      </button>
                    ))}
                  </div>

                  {/* Card Details list */}
                  <div className="space-y-5.5 max-w-3xl mx-auto">
                    {cards.map((dc, i) => {
                      const accent = getCardAccent(dc.card);
                      
                      // Localized helper
                      const details = TAROT_TRANSLATIONS[dc.card.name] || {
                        nameHi: dc.card.name,
                        uprightHi: dc.card.upright,
                        reversedHi: dc.card.reversed,
                        loveHi: dc.card.love,
                        careerHi: dc.card.career,
                        keywordsHi: dc.card.keywords,
                      };

                      const displayName = isHi ? details.nameHi : dc.card.name;
                      const displayMeaning = tab === 'love' 
                        ? (isHi ? details.loveHi || details.uprightHi : dc.card.love)
                        : tab === 'career' 
                          ? (isHi ? details.careerHi || details.uprightHi : dc.card.career)
                          : dc.isReversed 
                            ? (isHi ? details.reversedHi : dc.card.reversed)
                            : (isHi ? details.uprightHi : dc.card.upright);

                      const displayKeywords = isHi ? details.keywordsHi || dc.card.keywords : dc.card.keywords;

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-[#1A1A1A]/60 border border-[#7D756B]/20 rounded-2xl p-6.5 backdrop-blur-sm hover:border-[#B78E28]/30 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                        >
                          <div className="flex items-start gap-4 sm:gap-6">
                            <div className="text-3xl flex-shrink-0 bg-[#121212] w-14 h-14 border border-[#7D756B]/20 rounded-xl flex items-center justify-center" style={dc.isReversed ? { transform: 'rotate(180deg)', borderColor: `${accent}30` } : { borderColor: `${accent}30` }}>
                              {getCardGlyph(dc.card)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                                <span className="text-[7.5px] uppercase tracking-[0.3em] text-[#7D756B] font-semibold">{dc.position}</span>
                                {dc.isReversed && <span className="text-[6.5px] font-semibold bg-red-950/60 border border-red-500/20 text-red-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Reversed</span>}
                              </div>
                              <h3 className="font-serif text-lg tracking-wider mb-2 font-medium" style={{ color: accent }}>{displayName}</h3>
                              <p className="text-xs sm:text-[13px] text-[#E5D6C8]/85 leading-relaxed mb-4">{displayMeaning}</p>
                              
                              <div className="flex flex-wrap gap-2">
                                {displayKeywords.map(kw => (
                                  <span key={kw} className="text-[7px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#7D756B]/20 text-[#7D756B] bg-[#121212]/40 font-semibold">{kw}</span>
                                ))}
                                <span className="text-[7px] uppercase tracking-wider px-2.5 py-1 rounded-full border text-[#7D756B] bg-[#121212]/40 font-semibold" style={{ borderColor: `${accent}30` }}>
                                  {isHi ? (ELEMENT_TRANSLATIONS[dc.card.element] || dc.card.element) : `${dc.card.element} ${CARD_SYMBOLS[dc.card.element]}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-12 bg-[#E5D6C8]/5 border border-[#B78E28]/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
                    <div>
                      <h3 className="text-[#E5D6C8] text-sm uppercase tracking-[0.1em] mb-1 font-semibold">{isHi ? 'गहरी जानकारी चाहते हैं?' : 'Want deeper insight?'}</h3>
                      <p className="text-[#7D756B] text-[10px] uppercase tracking-[0.1em]">{isHi ? 'अपनी संपूर्ण व्यक्तिगत वैदिक रिपोर्ट प्राप्त करें' : 'Get a personalized premium Vedic Astrology report'}</p>
                    </div>
                    <Link href="/store" className="bg-transparent border border-[#B78E28] text-[#B78E28] hover:bg-[#B78E28] hover:text-[#121212] px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-colors font-semibold whitespace-nowrap">
                      {isHi ? 'रिपोर्ट खरीदें' : 'Buy Report'}
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!cards && !reading && (
          <div className="text-center py-24 opacity-40">
            <div className="text-6xl mb-6">🃏</div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#7D756B]">
              {isHi ? 'पत्ते खोलने के लिए ऊपर ड्रा बटन दबाएं' : 'Press Draw Cards above to begin your reading'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
