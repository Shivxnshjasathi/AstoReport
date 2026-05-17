'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, Activity, ShieldAlert, CheckCircle2, Volume2, VolumeX, Eye, Calendar, Clock, User, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const dict = {
  en: {
    back: 'BACK',
    badge: 'AURA SCANNER',
    title: 'Cosmic Aura & Chakra Scan',
    subtitle: 'PERSONALIZED CELESTIAL ENERGY MATRIX & FREQUENCY ALIGNMENT ENGINE',
    formTitle: 'Analyze Your Aura & Chakras',
    formDesc: 'Enter birth details to map planetary alignments directly to your energy nodes.',
    dob: 'Date of Birth',
    tob: 'Time of Birth',
    name: 'Your Full Name',
    scanBtn: 'INITIATE ENERGY SCAN',
    scanning: 'SCANNING CELESTIAL MATRIX...',
    resultsTitle: 'Your Cosmic Aura Signature',
    tapPrompt: 'Tap on any pulsing Chakra node to activate its alignment and play Solfeggio frequency.',
    dominantAura: 'Dominant Aura Color',
    rulerInfo: 'Planetary Lord Alignment',
    chakraStatus: 'Energy Status',
    balanced: 'Highly Balanced',
    underactive: 'Underactive / Needs Care',
    overactive: 'Overactive / High Tension',
    remedyTitle: 'Cosmic Remedies',
    soundBtn: 'Listen to Alignment Frequency',
    muteBtn: 'Stop Sound Therapy',
    cta: 'Want a full 45-page Astro-Chakra & Energy Signature booklet?',
    ctaBtn: 'GET ENERGY REPORT — ₹249',
  },
  hi: {
    back: 'वापस',
    badge: 'आभा स्कैनर',
    title: 'लौकिक आभा और चक्र स्कैन',
    subtitle: 'व्यक्तिगत दिव्य ऊर्जा मैट्रिक्स और आवृत्ति संरेखण इंजन',
    formTitle: 'अपनी आभा और चक्रों का विश्लेषण करें',
    formDesc: 'अपने ऊर्जा नोड्स पर सीधे ग्रहों के संरेखण को मैप करने के लिए जन्म विवरण दर्ज करें।',
    dob: 'जन्म तिथि',
    tob: 'जन्म का समय',
    name: 'आपका पूरा नाम',
    scanBtn: 'ऊर्जा स्कैन शुरू करें',
    scanning: 'लौकिक मैट्रिक्स को स्कैन कर रहे हैं...',
    resultsTitle: 'आपकी लौकिक आभा हस्ताक्षर',
    tapPrompt: 'अलाइनमेंट सक्रिय करने और सोल्फ़ेजियो टोन बजाने के लिए किसी भी चक्र नोड पर टैप करें।',
    dominantAura: 'प्रमुख आभा रंग',
    rulerInfo: 'ग्रह अधिपति संरेखण',
    chakraStatus: 'ऊर्जा स्थिति',
    balanced: 'अत्यधिक संतुलित',
    underactive: 'अंडरएक्टिव / देखभाल की आवश्यकता',
    overactive: 'ओवरएक्टिव / उच्च तनाव',
    remedyTitle: 'लौकिक उपाय',
    soundBtn: 'संरेखण टोन सुनें',
    muteBtn: 'ध्वनि चिकित्सा बंद करें',
    cta: 'क्या आप एक विस्तृत 45-पृष्ठ का एस्ट्रो-चक्र और ऊर्जा रिपोर्ट चाहते हैं?',
    ctaBtn: 'ऊर्जा रिपोर्ट प्राप्त करें — ₹249',
  },
};

interface ChakraData {
  id: string;
  name: string;
  nameHi: string;
  sanskrit: string;
  frequency: number;
  planet: { en: string; hi: string };
  color: string;
  glowColor: string;
  rating: number;
  status: 'balanced' | 'underactive' | 'overactive';
  y: number; // SVG position percent
  description: { en: string; hi: string };
  remedies: { en: string[]; hi: string[] };
}

// 7 primary chakras and their planetary rulership mappings
const CHAKRAS_BASE = [
  {
    id: 'crown',
    name: 'Sahasrara (Crown)',
    nameHi: 'सहस्रार (सहस्रदल कमल)',
    sanskrit: 'सहस्रार',
    frequency: 963, // Solfeggio 963 Hz
    planet: { en: 'Jupiter (Guru)', hi: 'बृहस्पति' },
    color: '#9c27b0',
    glowColor: 'rgba(156, 39, 176, 0.4)',
    y: 12,
    description: {
      en: 'Wisdom, spiritual awakening, and universal consciousness. Ruled by Jupiter, it reflects your divine knowledge and overall soul journey.',
      hi: 'ज्ञान, आध्यात्मिक जागृति और सार्वभौमिक चेतना। बृहस्पति द्वारा शासित, यह आपके दिव्य ज्ञान और आत्मा की यात्रा को दर्शाता है।'
    },
    remedies: {
      en: ['Meditate on the sound OM', 'Wear yellow sapphire or topaz', 'Keep a yellow handkerchief', 'Apply saffron tilak on forehead'],
      hi: ['ॐ का मौन ध्यान करें', 'पीला पुखराज या टोपाज पहनें', 'पीला रुमाल पास रखें', 'माथे पर केसर का तिलक लगाएं']
    }
  },
  {
    id: 'thirdeye',
    name: 'Ajna (Third Eye)',
    nameHi: 'आज्ञा (तीसरा नेत्र)',
    sanskrit: 'आज्ञा',
    frequency: 852, // Solfeggio 852 Hz
    planet: { en: 'Moon (Chandra)', hi: 'चंद्रमा' },
    color: '#3f51b5',
    glowColor: 'rgba(63, 81, 181, 0.4)',
    y: 22,
    description: {
      en: 'Intuition, mental clarity, foresight, and psychic abilities. Ruled by the Moon, it directly impacts your emotional processing and inner peace.',
      hi: 'अंतर्ज्ञान, मानसिक स्पष्टता, दूरदर्शिता और मानसिक क्षमताएं। चंद्रमा द्वारा शासित, यह आपके भावनात्मक संतुलन और आंतरिक शांति को प्रभावित करता है।'
    },
    remedies: {
      en: ['Practice Trataka (candle gazing)', 'Meditate under moonlight', 'Drink water from a silver vessel', 'Respect mother and elderly women'],
      hi: ['त्राटक (मोमबत्ती त्राटक) का अभ्यास करें', 'चंद्रमा की रोशनी में ध्यान करें', 'चांदी के बर्तन से पानी पिएं', 'माता और बुजुर्ग महिलाओं का सम्मान करें']
    }
  },
  {
    id: 'throat',
    name: 'Vishuddha (Throat)',
    nameHi: 'विशुद्ध (कंठ चक्र)',
    sanskrit: 'विशुद्ध',
    frequency: 741, // Solfeggio 741 Hz
    planet: { en: 'Mercury (Budh)', hi: 'बुध' },
    color: '#00bcd4',
    glowColor: 'rgba(0, 188, 212, 0.4)',
    y: 35,
    description: {
      en: 'Communication, creative self-expression, and truthfulness. Ruled by Mercury, it governs your speaking voice and commerce/business logic.',
      hi: 'संचार, रचनात्मक आत्म-अभिव्यक्ति और सत्यता। बुध द्वारा शासित, यह आपकी वाणी और व्यावसायिक बुद्धि को नियंत्रित करता है।'
    },
    remedies: {
      en: ['Chant Ham sound regularly', 'Feed green grass to cows', 'Wear emerald on the little finger', 'Practice deep breathing with throat lock'],
      hi: ['नियमित रूप से "हम" ध्वनि का जप करें', 'गौमाता को हरा चारा खिलाएं', 'कनिष्ठिका में पन्ना पहनें', 'कंठ तालु का प्राणायाम अभ्यास करें']
    }
  },
  {
    id: 'heart',
    name: 'Anahata (Heart)',
    nameHi: 'अनाहत (हृदय चक्र)',
    sanskrit: 'अनाहत',
    frequency: 639, // Solfeggio 639 Hz
    planet: { en: 'Venus (Shukra)', hi: 'शुक्र' },
    color: '#4caf50',
    glowColor: 'rgba(76, 175, 80, 0.4)',
    y: 48,
    description: {
      en: 'Unconditional love, relationships, empathy, and artistic beauty. Ruled by Venus, it controls your capacity to attract and sustain stable affection.',
      hi: 'बिना शर्त प्यार, रिश्ते, सहानुभूति और कलात्मक सुंदरता। शुक्र द्वारा शासित, यह आपके जीवन में प्रेम और सद्भाव को आकर्षित करने की क्षमता को नियंत्रित करता है।'
    },
    remedies: {
      en: ['Wear light green or white clothes', 'Apply perfume daily', 'Donate white flowers to a temple', 'Practice loving-kindness meditation'],
      hi: ['हल्के हरे या सफेद वस्त्र पहनें', 'प्रतिदिन सुगंध/इत्र का प्रयोग करें', 'मंदिर में सफेद फूल अर्पित करें', 'मैत्री (करुणा) ध्यान का अभ्यास करें']
    }
  },
  {
    id: 'solarplexus',
    name: 'Manipura (Solar Plexus)',
    nameHi: 'मणिपूर (नाभि चक्र)',
    sanskrit: 'मणिपूर',
    frequency: 528, // Solfeggio 528 Hz
    planet: { en: 'Sun (Surya)', hi: 'सूर्य' },
    color: '#ffeb3b',
    glowColor: 'rgba(255, 235, 59, 0.4)',
    y: 60,
    description: {
      en: 'Confidence, willpower, digestion, and life force vitality. Ruled by the Sun, it reflects your leadership potential and inner fire.',
      hi: 'आत्मविश्वास, इच्छाशक्ति, पाचन और जीवन शक्ति। सूर्य द्वारा शासित, यह आपके नेतृत्व क्षमता और आंतरिक ऊर्जा का प्रतिनिधित्व करता है।'
    },
    remedies: {
      en: ['Offer water to Sun at sunrise', 'Wear Ruby or gold ring', 'Practice Kapalabhati breathing', 'Donate wheat and copper vessel on Sundays'],
      hi: ['सूर्योदय के समय सूर्य देव को अर्घ्य दें', 'माणिक या सोने की अंगूठी पहनें', 'कपालभाति प्राणायाम का अभ्यास करें', 'रविवार को गेहूं और तांबे के बर्तन का दान करें']
    }
  },
  {
    id: 'sacral',
    name: 'Swadhisthana (Sacral)',
    nameHi: 'स्वाधिष्ठान चक्र',
    sanskrit: 'स्वाधिष्ठान',
    frequency: 417, // Solfeggio 417 Hz
    planet: { en: 'Mars (Mangal)', hi: 'मंगल' },
    color: '#ff9800',
    glowColor: 'rgba(255, 152, 0, 0.4)',
    y: 72,
    description: {
      en: 'Passion, creativity, emotional flow, and physical vitality. Ruled by Mars, it represents your inner drive, property strength, and action energy.',
      hi: 'जुनून, रचनात्मकता, भावनात्मक प्रवाह और शारीरिक जीवन शक्ति। मंगल द्वारा शासित, यह आपकी आंतरिक इच्छाशक्ति, संपत्ति और कर्म ऊर्जा का प्रतिनिधित्व करता है।'
    },
    remedies: {
      en: ['Recite Hanuman Chalisa', 'Drink water in copper vessel', 'Donate red lentils (masoor dal) on Tuesdays', 'Engage in rigorous physical activity'],
      hi: ['प्रतिदिन हनुमान चालीसा का पाठ करें', 'तांबे के पात्र में पानी पिएं', 'मंगलवार को लाल मसूर दाल का दान करें', 'सक्रिय रूप से शारीरिक गतिविधियों में शामिल हों']
    }
  },
  {
    id: 'root',
    name: 'Muladhara (Root)',
    nameHi: 'मूलाधार (आधार चक्र)',
    sanskrit: 'मूलाधार',
    frequency: 396, // Solfeggio 396 Hz
    planet: { en: 'Saturn (Shani)', hi: 'शनि' },
    color: '#f44336',
    glowColor: 'rgba(244, 67, 54, 0.4)',
    y: 86,
    description: {
      en: 'Grounding, stability, safety, survival, and ancestral protection. Ruled by Saturn, it reflects your discipline, boundaries, and heavy karmic lessons.',
      hi: 'स्थिरता, सुरक्षा, जीवन रक्षा और पैतृक सुरक्षा। शनि द्वारा शासित, यह आपके जीवन के अनुशासन, सीमाओं और भारी कर्म पाठों को दर्शाता है।'
    },
    remedies: {
      en: ['Donate black clothes or sesame seeds on Saturdays', 'Feed crows or stray dogs', 'Walk barefoot on grass', 'Practice root lock (Mula Bandha)'],
      hi: ['शनिवार को काली वस्तुएं या तिल दान करें', 'कौओं या बेसहारा कुत्तों को भोजन खिलाएं', 'घास पर नंगे पैर चलें', 'मूल बंध योग का अभ्यास करें']
    }
  }
];

export default function AuraPage() {
  const { language } = useLanguage();
  const t = dict[language];

  // Form states
  const [name, setName] = useState('');
  const [dob, setDob] = useState('1998-05-15');
  const [tob, setTob] = useState('08:30');
  const [isScanning, setIsScanning] = useState(false);
  const [chakras, setChakras] = useState<ChakraData[] | null>(null);
  const [selectedChakra, setSelectedChakra] = useState<ChakraData | null>(null);
  
  // Sound synthesizer states
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setChakras(null);
    setSelectedChakra(null);

    // Dynamic scanning timeout
    setTimeout(() => {
      // Calculate chakra ratings based on dob seed
      const seed = dob.split('-').reduce((acc, v) => acc + Number(v), 0) + (name ? name.length : 12);
      const computedChakras = CHAKRAS_BASE.map((chk, idx) => {
        const rating = 40 + ((seed * (idx + 7)) % 61); // 40% to 100% rating
        let status: 'balanced' | 'underactive' | 'overactive' = 'balanced';
        if (rating < 60) status = 'underactive';
        else if (rating > 92) status = 'overactive';
        
        return {
          ...chk,
          rating,
          status,
        };
      });

      setChakras(computedChakras);
      setSelectedChakra(computedChakras[0]); // default to Sahasrara Crown
      setIsScanning(false);
    }, 1800);
  };

  const playSolfeggioTone = (freq: number) => {
    try {
      if (isPlayingAudio && activeFrequency === freq) {
        stopSolfeggioTone();
        return;
      }

      if (isPlayingAudio) {
        stopSolfeggioTone();
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Deep celestial warm sound lowpass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 1.0); // 1s smooth fade-in

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlayingAudio(true);
      setActiveFrequency(freq);
    } catch (e) {
      console.error('Web Audio Synth failed:', e);
    }
  };

  const stopSolfeggioTone = () => {
    const ctx = audioCtxRef.current;
    const osc = oscRef.current;
    const gain = gainRef.current;

    if (ctx && osc && gain) {
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      setTimeout(() => {
        try {
          osc.stop();
          osc.disconnect();
          ctx.close();
        } catch (e) {}
      }, 500);
    }

    oscRef.current = null;
    gainRef.current = null;
    audioCtxRef.current = null;
    setIsPlayingAudio(false);
    setActiveFrequency(null);
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        stopSolfeggioTone();
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#15131A] to-[#121212]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-900/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1200px] mx-auto w-full pt-6 px-4 lg:px-12 relative z-10">
        {/* Header navigation */}
        <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-[9px] group">
            <div className="w-8 h-8 rounded-full border border-[#7D756B]/30 flex items-center justify-center group-hover:border-[#B78E28] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            {t.back}
          </Link>
          <div className="flex items-center gap-2 text-[#B78E28] uppercase tracking-[0.2em] text-[9px]">
            <Compass className="w-3.5 h-3.5" />
            {t.badge}
          </div>
        </div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4 font-light leading-tight">
            {t.title}
          </h1>
          <p className="text-[#7D756B] text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Interactive Aura Scanner Input Form */}
        {!chakras && (
          <motion.form
            onSubmit={handleScan}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[600px] mx-auto bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/25 rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B78E28]/50 to-transparent" />
            
            <h3 className="text-center font-serif text-[#E5D6C8] text-xl mb-2 tracking-widest uppercase font-light">
              {t.formTitle}
            </h3>
            <p className="text-center text-[#7D756B] text-[10px] uppercase tracking-[0.1em] mb-8">
              {t.formDesc}
            </p>

            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.name}</label>
                <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
                  <User className="w-4 h-4 text-[#7D756B] mr-2" />
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Shivansh Jasathi"
                    className="w-full py-2.5 bg-transparent focus:outline-none text-[#E5D6C8] text-[14px]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.dob}</label>
                  <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
                    <Calendar className="w-4 h-4 text-[#7D756B] mr-2" />
                    <input required type="date" value={dob} onChange={e => setDob(e.target.value)}
                      className="w-full py-2.5 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[13px]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-[#7D756B] uppercase tracking-widest">{t.tob}</label>
                  <div className="flex items-center border-b border-[#7D756B]/30 focus-within:border-[#B78E28] transition-all">
                    <Clock className="w-4 h-4 text-[#7D756B] mr-2" />
                    <input required type="time" value={tob} onChange={e => setTob(e.target.value)}
                      className="w-full py-2.5 bg-transparent focus:outline-none text-[#E5D6C8] [color-scheme:dark] text-[13px]" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="w-full mt-6 py-4 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[#E5D6C8] rounded-full text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 font-bold group"
              >
                {isScanning ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin text-[#B78E28]" />
                    {t.scanning}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#B78E28] group-hover:rotate-12 transition-transform" />
                    {t.scanBtn}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}

        {/* Aura & Chakra scan results dashboard */}
        {chakras && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Meditating Human Silhouette and pulsing SVGs */}
            <div className="lg:col-span-2 bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/25 rounded-[3rem] p-8 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
              <div className="absolute top-4 left-6">
                <h3 className="text-xs uppercase tracking-widest text-[#B78E28] font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  {t.resultsTitle}
                </h3>
                <p className="text-[8px] text-[#7D756B] uppercase tracking-widest mt-1">
                  {t.tapPrompt}
                </p>
              </div>

              {/* Pulsing Aura visualizer overlay */}
              <div className="relative w-80 h-[500px] flex items-center justify-center mt-6">
                <svg className="w-full h-full" viewBox="0 0 200 400">
                  {/* Aura Glow filter definition */}
                  <defs>
                    <radialGradient id="aura-gradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={selectedChakra?.color} stopOpacity="0.6" />
                      <stop offset="60%" stopColor={selectedChakra?.color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Pulsing Backlight Aura */}
                  <motion.circle
                    cx="100"
                    cy={selectedChakra ? (selectedChakra.y / 100) * 350 + 25 : 200}
                    r="120"
                    fill="url(#aura-gradient)"
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Meditating Figure Outline */}
                  <path
                    d="M 100 45 C 93 45 88 50 88 57 C 88 64 93 69 100 69 C 107 69 112 64 112 57 C 112 50 107 45 100 45 Z 
                       M 100 70 C 85 75 75 90 75 110 C 75 140 60 170 45 200 C 35 220 30 250 30 280 C 30 330 60 360 100 360 C 140 360 170 330 170 280 C 170 250 165 220 155 200 C 140 170 125 140 125 110 C 125 90 115 75 100 70 Z"
                    fill="none"
                    stroke="#E5D6C8"
                    strokeWidth="1"
                    opacity="0.15"
                  />

                  {/* Energy connection channel */}
                  <line x1="100" y1="65" x2="100" y2="350" stroke="#E5D6C8" strokeWidth="0.5" opacity="0.1" />

                  {/* 7 Pulsing Chakra Nodes */}
                  {chakras.map((chk) => {
                    const yPos = (chk.y / 100) * 350 + 25;
                    const isSelected = selectedChakra?.id === chk.id;

                    return (
                      <g key={chk.id} className="cursor-pointer" onClick={() => setSelectedChakra(chk)}>
                        {/* Hover/click larger target */}
                        <circle cx="100" cy={yPos} r="18" fill="transparent" />
                        
                        {/* Pulsing outer aura ring */}
                        <motion.circle
                          cx="100"
                          cy={yPos}
                          r={isSelected ? 14 : 9}
                          fill="none"
                          stroke={chk.color}
                          strokeWidth={isSelected ? 1.5 : 1}
                          animate={{
                            scale: isSelected ? [1, 1.4, 1] : [1, 1.2, 1],
                            opacity: isSelected ? [0.6, 0.9, 0.6] : [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: isSelected ? 2 : 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />

                        {/* Solid Core node */}
                        <circle
                          cx="100"
                          cy={yPos}
                          r={isSelected ? 6 : 4.5}
                          fill={chk.color}
                          style={{ filter: `drop-shadow(0 0 8px ${chk.color})` }}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Chakra details and Solfeggio audio controls column */}
            <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/25 rounded-[3rem] p-6 lg:p-8 flex flex-col justify-between">
              {selectedChakra && (
                <div className="space-y-6">
                  {/* Title & Planet */}
                  <div>
                    <span className="text-[7.5px] uppercase tracking-[0.25em] font-bold px-2.5 py-1 rounded-full border border-[#7D756B]/20" style={{ color: selectedChakra.color, borderColor: `${selectedChakra.color}30` }}>
                      {selectedChakra.sanskrit}
                    </span>
                    <h3 className="text-lg font-serif uppercase tracking-widest text-[#E5D6C8] mt-3">
                      {language === 'hi' ? selectedChakra.nameHi : selectedChakra.name}
                    </h3>
                    <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mt-1">
                      {t.rulerInfo}: <span className="font-bold text-[#E5D6C8]">{language === 'hi' ? selectedChakra.planet.hi : selectedChakra.planet.en}</span>
                    </p>
                  </div>

                  {/* Rating / Alignment Status */}
                  <div className="bg-[#1A1A1A]/40 border border-[#7D756B]/15 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between items-center text-[9px] uppercase tracking-widest">
                      <span>{t.chakraStatus}</span>
                      <span className={selectedChakra.status === 'balanced' ? 'text-green-400' : 'text-red-400'}>
                        {selectedChakra.status === 'balanced' && t.balanced}
                        {selectedChakra.status === 'underactive' && t.underactive}
                        {selectedChakra.status === 'overactive' && t.overactive}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-[#121212] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${selectedChakra.rating}%`,
                          backgroundColor: selectedChakra.color,
                        }}
                      />
                    </div>

                    <p className="text-[10px] text-[#7D756B] uppercase tracking-widest font-mono text-right">
                      {selectedChakra.rating}% Alignment
                    </p>
                  </div>

                  {/* Solfeggio sound therapy player */}
                  <button
                    onClick={() => playSolfeggioTone(selectedChakra.frequency)}
                    className={`w-full py-4 rounded-full text-[9px] uppercase tracking-widest font-bold border flex items-center justify-center gap-2.5 transition-all ${
                      isPlayingAudio && activeFrequency === selectedChakra.frequency
                        ? 'bg-red-500/25 border-red-500/60 text-red-400'
                        : 'bg-[#B78E28] border-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] hover:border-[#E5D6C8]'
                    }`}
                  >
                    {isPlayingAudio && activeFrequency === selectedChakra.frequency ? (
                      <>
                        <VolumeX className="w-4 h-4 animate-pulse" />
                        {t.muteBtn} ({selectedChakra.frequency}Hz)
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        {t.soundBtn} ({selectedChakra.frequency}Hz)
                      </>
                    )}
                  </button>

                  {/* Description */}
                  <p className="text-[11px] leading-relaxed text-[#E5D6C8] font-light">
                    {language === 'hi' ? selectedChakra.description.hi : selectedChakra.description.en}
                  </p>

                  {/* Remedies */}
                  <div className="border-t border-[#7D756B]/20 pt-4 space-y-2">
                    <h4 className="text-[8.5px] uppercase tracking-widest text-[#B78E28] font-bold">
                      {t.remedyTitle}
                    </h4>
                    <ul className="space-y-1.5">
                      {(language === 'hi' ? selectedChakra.remedies.hi : selectedChakra.remedies.en).map((rem, i) => (
                        <li key={i} className="text-[10px] text-[#7D756B] flex items-start gap-2">
                          <span className="text-xs" style={{ color: selectedChakra.color }}>•</span>
                          <span className="leading-relaxed">{rem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Report CTA */}
              <div className="pt-6 border-t border-[#7D756B]/20 mt-6 text-center">
                <Sparkles className="w-6 h-6 text-[#B78E28] mx-auto mb-3 animate-pulse" />
                <p className="text-[9px] uppercase tracking-widest text-[#E5D6C8] max-w-xs mx-auto mb-3 leading-relaxed">
                  {t.cta}
                </p>
                <Link href="/store" className="inline-flex items-center gap-2 text-[9px] font-bold text-[#B78E28] hover:text-[#E5D6C8] tracking-widest uppercase transition-colors">
                  {t.ctaBtn}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
