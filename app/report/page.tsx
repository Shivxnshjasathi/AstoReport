'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import KundliChart from '../components/Chart/KundliChart';
import { getKundaliReport } from '@/lib/astro/actions';
import { formatDegrees } from '@/lib/utils/date-time';
import { Share2, ArrowLeft, MapPin, Calendar, Clock, Loader2, Sparkles, Download, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ReportPDF } from '../components/PDF/ReportPDF';
import { useLanguage } from '../context/LanguageContext';


const reportDict = {
  en: {
    connecting: "Connecting to the Cosmos...",
    invalid: "Invalid report data.",
    back: "BACK",
    share: "SHARE",
    copied: "Link copied!",
    kundliTitle: "Kundli",
    lagna: "Lagna (D1)",
    navamsa: "Navamsa (D9)",
    planetsPos: "Planetary Positions",
    planet: "Planet",
    longitude: "Longitude",
    rashi: "Rashi",
    status: "Status",
    currentDasha: "Current Vimshottari Dasha",
    maha: "Maha Dasha",
    antar: "Antar Dasha",
    ends: "Ends",
    blueprint: "Career & Wealth Blueprint",
    discover: "Discover your hidden potential, ideal career paths, and precise timelines for financial growth.",
    unlock: "Unlock Full Analysis for ₹1499",
    loading: "Loading Premium Report...",
    modalTitle: "Unlock Your Free Kundli",
    modalDesc: "Enter your details to save this report and receive free daily personalized horoscopes via WhatsApp & Email.",
    modalPhone: "WHATSAPP NUMBER",
    modalEmail: "EMAIL ADDRESS",
    modalBtn: "UNLOCK NOW"
  },
  hi: {
    connecting: "ब्रह्मांड से जुड़ रहे हैं...",
    invalid: "अमान्य रिपोर्ट डेटा।",
    back: "वापस",
    share: "शेयर",
    copied: "लिंक कॉपी किया गया!",
    kundliTitle: "की कुंडली",
    lagna: "लग्न (D1)",
    navamsa: "नवमांश (D9)",
    planetsPos: "ग्रहों की स्थिति",
    planet: "ग्रह",
    longitude: "देशांतर",
    rashi: "राशि",
    status: "स्थिति",
    currentDasha: "वर्तमान विंशोत्तरी दशा",
    maha: "महा दशा",
    antar: "अंतर दशा",
    ends: "समाप्त",
    blueprint: "करियर और धन खाका",
    discover: "अपनी छिपी क्षमता, आदर्श करियर पथ और वित्तीय विकास के लिए सटीक समय-सीमा की खोज करें।",
    unlock: "₹1499 में पूर्ण विश्लेषण अनलॉक करें",
    loading: "प्रीमियम रिपोर्ट लोड हो रही है...",
    modalTitle: "अपनी मुफ़्त कुंडली अनलॉक करें",
    modalDesc: "इस रिपोर्ट को सहेजने और मुफ़्त दैनिक राशिफल प्राप्त करने के लिए अपना विवरण दर्ज करें।",
    modalPhone: "व्हाट्सएप नंबर",
    modalEmail: "ईमेल पता",
    modalBtn: "अभी अनलॉक करें"
  }
};

const ReportContent = () => {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const t = reportDict[language];
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const name = searchParams.get('name') || 'Guest';
  const dob = searchParams.get('dob') || '';
  const tob = searchParams.get('tob') || '';
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lon = parseFloat(searchParams.get('lon') || '0');
  const tz = searchParams.get('tz') || 'Asia/Kolkata';
  const locName = searchParams.get('locName') || 'Unknown';

  useEffect(() => {
    async function fetchData() {
      if (!dob || !tob) return;
      const res = await getKundaliReport(`${dob}T${tob}`, lat, lon, tz);
      if (res.success) {
        setData(res.data);
      } else {
        setError(res.error || 'Failed to fetch data');
      }
      setLoading(false);
    }
    fetchData();
  }, [dob, tob, lat, lon, tz]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-[#E5D6C8] gap-4">
        <Loader2 className="w-8 h-8 text-[#B78E28] animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#7D756B]">{t.connecting}</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#1E1B4B] flex items-center justify-center text-white">
        <p className="text-amber-500 font-bold">{error || t.invalid}</p>
      </div>
    );
  }

  const buildChartData = (planets: any[], lagnaRashi: number, isD9 = false, lagnaDegree = 0) => {
    const housePlanets: { [key: number]: any[] } = {};
    const houseRashis: { [key: number]: number } = {};

    for (let h = 1; h <= 12; h++) {
      housePlanets[h] = [];
      houseRashis[h] = ((lagnaRashi + h - 2) % 12) + 1;
    }

    const PLANET_ABBRS: Record<string, string> = {
      Sun: 'सू',
      Moon: 'च',
      Mars: 'मं',
      Mercury: 'बु',
      Jupiter: 'गु',
      Venus: 'शु',
      Saturn: 'श',
      Rahu: 'रा',
      Ketu: 'के',
      Uranus: 'यू',
      Neptune: 'ने',
      Pluto: 'प्लू',
      Lagna: 'ल'
    };

    // Add Lagna to House 1
    housePlanets[1].push({
      name: 'Lagna',
      displayName: 'ल',
      degree: Math.floor(lagnaDegree % 30),
      isRetrograde: false,
      isCombust: false,
      isExalted: false,
      isDebilitated: false
    });

    // Find Sun's longitude for combust calculations (use actual longitude from the main planet list)
    const sunPlanet = planets.find((pl) => pl.name === 'Sun');
    const sunLong = sunPlanet ? sunPlanet.longitude : 0;

    planets.forEach((p: any) => {
      const rashi = isD9 ? p.navamsaRashi : p.rashi;
      const rawDeg = isD9 ? (p.longitude * 9) : p.longitude;
      const deg = Math.floor(rawDeg % 30);
      const isRetro = p.isRetrograde || false;

      // Combustion calculation:
      const isCombust = (() => {
        if (['Sun', 'Moon', 'Rahu', 'Ketu', 'Lagna'].includes(p.name)) return false;
        
        // Calculate difference in degrees (taking care of 360 boundary)
        const diff = Math.min(
          Math.abs(p.longitude - sunLong),
          360 - Math.abs(p.longitude - sunLong)
        );

        if (p.name === 'Mars' && diff <= 17) return true;
        if (p.name === 'Mercury') {
          const limit = isRetro ? 12 : 14;
          if (diff <= limit) return true;
        }
        if (p.name === 'Jupiter' && diff <= 11) return true;
        if (p.name === 'Venus') {
          const limit = isRetro ? 8 : 10;
          if (diff <= limit) return true;
        }
        if (p.name === 'Saturn' && diff <= 15) return true;
        return false;
      })();

      // Exaltation / Debilitation calculations based on rashi (1-12)
      const isExalted = (() => {
        if (p.name === 'Sun' && rashi === 1) return true;
        if (p.name === 'Moon' && rashi === 2) return true;
        if (p.name === 'Mars' && rashi === 10) return true;
        if (p.name === 'Mercury' && rashi === 6) return true;
        if (p.name === 'Jupiter' && rashi === 4) return true;
        if (p.name === 'Venus' && rashi === 12) return true;
        if (p.name === 'Saturn' && rashi === 7) return true;
        if (p.name === 'Rahu' && rashi === 2) return true;
        if (p.name === 'Ketu' && rashi === 8) return true;
        return false;
      })();

      const isDebilitated = (() => {
        if (p.name === 'Sun' && rashi === 7) return true;
        if (p.name === 'Moon' && rashi === 8) return true;
        if (p.name === 'Mars' && rashi === 4) return true;
        if (p.name === 'Mercury' && rashi === 12) return true;
        if (p.name === 'Jupiter' && rashi === 10) return true;
        if (p.name === 'Venus' && rashi === 6) return true;
        if (p.name === 'Saturn' && rashi === 1) return true;
        if (p.name === 'Rahu' && rashi === 8) return true;
        if (p.name === 'Ketu' && rashi === 2) return true;
        return false;
      })();

      for (let h = 1; h <= 12; h++) {
        if (houseRashis[h] === rashi) {
          const displayName = PLANET_ABBRS[p.name] || p.name;
          housePlanets[h].push({
            name: p.name,
            displayName,
            degree: deg,
            isRetrograde: isRetro,
            isCombust,
            isExalted,
            isDebilitated
          });
          break;
        }
      }
    });

    return { houses: housePlanets, houseRashis };
  };

  const d1 = buildChartData(data.planets, data.lagnaRashi, false, data.lagnaLongitude || 0);
  const d9 = buildChartData(data.planets, data.navamsaLagnaRashi, true, data.lagnaLongitude ? (data.lagnaLongitude * 9) : 0);


  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden pb-32">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/kundli-bg.png" 
          alt="Celestial Mandala" 
          fill 
          className="object-cover opacity-30 scale-110"
          priority
          sizes="100vw"
          quality={50}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#121212]/80 to-[#121212]" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto pt-12 pb-24 px-4 lg:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto w-full space-y-10 lg:space-y-12"
        >
          {/* Header & Actions */}
          <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6">
            <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs">
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </Link>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert(t.copied);
                }}
                className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs group"
                title="Share Report URL"
              >
                <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block">{t.share}</span>
              </button>
              <button
                onClick={async () => {
                  const { pdf } = await import('@react-pdf/renderer');
                  const blob = await pdf(
                    <ReportPDF
                      name={name} dob={dob} tob={tob} locName={locName}
                      planets={data.planets} dasha={data.currentDasha}
                      d1Houses={d1.houses} d1HouseRashis={d1.houseRashis}
                      d9Houses={d9.houses} d9HouseRashis={d9.houseRashis}
                    />
                  ).toBlob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${name}_Kundli.pdf`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 bg-transparent border border-[#E5D6C8] px-4 py-2 rounded-full hover:bg-[#E5D6C8] hover:text-[#121212] transition-colors uppercase tracking-[0.2em] text-xs group"
                title="Download PDF"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span className="hidden sm:block">PDF</span>
              </button>
            </div>
          </div>

          {/* User Info Header */}
          <div className="text-center py-8">
            <h1 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-6 font-light">
              {language === 'en' ? `${name}'s ${t.kundliTitle}` : `${name} ${t.kundliTitle}`}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 text-[#7D756B] text-xs uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#B78E28]" />{dob}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B78E28]" />{tob}</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#B78E28]" /><span className="line-clamp-1">{locName}</span></div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <KundliChart houses={d1.houses} houseRashis={d1.houseRashis} title={t.lagna} />
            <KundliChart houses={d9.houses} houseRashis={d9.houseRashis} title={t.navamsa} />
          </div>

          {/* Planetary Table */}
          <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/30 rounded-3xl overflow-hidden p-6 lg:p-8">
            <h2 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-[0.15em] mb-6 border-b border-[#7D756B]/30 pb-4">{t.planetsPos}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs uppercase tracking-[0.1em]">
                <thead className="text-[#7D756B]">
                  <tr>
                    <th className="py-4 font-normal">{t.planet}</th>
                    <th className="py-4 font-normal">{t.longitude}</th>
                    <th className="py-4 font-normal">{t.rashi}</th>
                    <th className="py-4 font-normal text-right">{t.status}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#7D756B]/20">
                  {data.planets.map((p: any, idx: number) => {
                    // Sun's longitude for combust calculations (use actual longitude from the main planet list)
                    const sunPlanet = data.planets.find((pl: any) => pl.name === 'Sun');
                    const sunLong = sunPlanet ? sunPlanet.longitude : 0;
                    const isRetro = p.isRetrograde || false;

                    // Combustion calculation:
                    const isCombust = (() => {
                      if (['Sun', 'Moon', 'Rahu', 'Ketu', 'Lagna'].includes(p.name)) return false;
                      const diff = Math.min(
                        Math.abs(p.longitude - sunLong),
                        360 - Math.abs(p.longitude - sunLong)
                      );
                      if (p.name === 'Mars' && diff <= 17) return true;
                      if (p.name === 'Mercury') {
                        const limit = isRetro ? 12 : 14;
                        if (diff <= limit) return true;
                      }
                      if (p.name === 'Jupiter' && diff <= 11) return true;
                      if (p.name === 'Venus') {
                        const limit = isRetro ? 8 : 10;
                        if (diff <= limit) return true;
                      }
                      if (p.name === 'Saturn' && diff <= 15) return true;
                      return false;
                    })();

                    // Exaltation / Debilitation calculations based on rashi (1-12)
                    const isExalted = (() => {
                      if (p.name === 'Sun' && p.rashi === 1) return true;
                      if (p.name === 'Moon' && p.rashi === 2) return true;
                      if (p.name === 'Mars' && p.rashi === 10) return true;
                      if (p.name === 'Mercury' && p.rashi === 6) return true;
                      if (p.name === 'Jupiter' && p.rashi === 4) return true;
                      if (p.name === 'Venus' && p.rashi === 12) return true;
                      if (p.name === 'Saturn' && p.rashi === 7) return true;
                      if (p.name === 'Rahu' && p.rashi === 2) return true;
                      if (p.name === 'Ketu' && p.rashi === 8) return true;
                      return false;
                    })();

                    const isDebilitated = (() => {
                      if (p.name === 'Sun' && p.rashi === 7) return true;
                      if (p.name === 'Moon' && p.rashi === 8) return true;
                      if (p.name === 'Mars' && p.rashi === 4) return true;
                      if (p.name === 'Mercury' && p.rashi === 12) return true;
                      if (p.name === 'Jupiter' && p.rashi === 10) return true;
                      if (p.name === 'Venus' && p.rashi === 6) return true;
                      if (p.name === 'Saturn' && p.rashi === 1) return true;
                      if (p.name === 'Rahu' && p.rashi === 8) return true;
                      if (p.name === 'Ketu' && p.rashi === 2) return true;
                      return false;
                    })();

                    const hasMark = isRetro || isCombust || isExalted || isDebilitated;

                    return (
                      <tr key={idx} className="hover:bg-[#E5D6C8]/5 transition-colors">
                        <td className="py-4 text-[#E5D6C8] font-medium flex items-center gap-1">
                          <span>{p.name}</span>
                          {hasMark && (
                            <span className="text-[10px] text-[#B78E28]/80 font-normal font-sans ml-1 tracking-[0.05em]">
                              {isRetro && 'ᴿ'}
                              {isCombust && 'ᶜ'}
                              {isExalted && 'ᴱ'}
                              {isDebilitated && 'ᴰ'}
                            </span>
                          )}
                        </td>
                        <td className="py-4 font-mono text-[#B78E28]">{formatDegrees(p.longitude % 30)}</td>
                        <td className="py-4 text-[#7D756B]">{p.rashi}</td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {isRetro && (
                              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#FFB300]/10 text-[#FFB300] border border-[#FFB300]/30" title="Retrograde">
                                R
                              </span>
                            )}
                            {isCombust && (
                              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#FF3D00]/10 text-[#FF3D00] border border-[#FF3D00]/30" title="Combust">
                                C
                              </span>
                            )}
                            {isExalted && (
                              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30" title="Exalted">
                                E
                              </span>
                            )}
                            {isDebilitated && (
                              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#C2185B]/10 text-[#C2185B] border border-[#C2185B]/30" title="Debilitated">
                                D
                              </span>
                            )}
                            {!hasMark && (
                              <span className="text-[#7D756B] text-[10px]">-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dasha Timeline */}
          {data.currentDasha && (
            <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/30 p-6 lg:p-8 rounded-3xl">
              <h2 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-[0.15em] mb-6 flex items-center gap-2 border-b border-[#7D756B]/30 pb-4">
                <Sparkles className="w-4 h-4 text-[#B78E28]" />
                {t.currentDasha}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.currentDasha.mahadasha && (
                  <div className="border border-[#7D756B]/30 p-6 rounded-2xl relative">
                    <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-2">{t.maha}</p>
                    <p className="text-3xl font-serif font-light text-[#E5D6C8]">{data.currentDasha.mahadasha.planet}</p>
                    <p className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] mt-4">{t.ends}: {data.currentDasha.mahadasha.end}</p>
                  </div>
                )}
                {data.currentDasha.antardasha && (
                  <div className="border border-[#7D756B]/30 p-6 rounded-2xl relative">
                    <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-2">{t.antar}</p>
                    <p className="text-3xl font-serif font-light text-[#E5D6C8]">{data.currentDasha.antardasha.planet}</p>
                    <p className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] mt-4">{t.ends}: {data.currentDasha.antardasha.end}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Premium Teaser (Blurred) */}
          <div className="relative mt-12 bg-[#121212]/80 border border-[#7D756B]/30 p-8 rounded-3xl overflow-hidden group">
            {/* Blurred Content Background */}
            <div className="absolute inset-0 filter blur-sm opacity-50 pointer-events-none select-none flex flex-col justify-center p-8">
              <div className="h-4 bg-[#7D756B]/40 rounded w-3/4 mb-4" />
              <div className="h-4 bg-[#7D756B]/40 rounded w-full mb-4" />
              <div className="h-4 bg-[#7D756B]/40 rounded w-5/6 mb-4" />
              <div className="h-4 bg-[#7D756B]/40 rounded w-1/2 mb-8" />
              
              <div className="flex gap-4">
                <div className="h-32 bg-[#7D756B]/20 rounded w-1/3" />
                <div className="h-32 bg-[#7D756B]/20 rounded w-1/3" />
                <div className="h-32 bg-[#7D756B]/20 rounded w-1/3" />
              </div>
            </div>

            {/* CTA Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-[#B78E28]/10 border border-[#B78E28]/30 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-[#B78E28]" />
              </div>
              <h2 className="text-2xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-4">
                {t.blueprint}
              </h2>
              <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed mb-8">
                {t.discover}
              </p>
              <Link href="/store" className="bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all font-semibold shadow-[0_0_20px_rgba(183,142,40,0.3)]">
                {t.unlock}
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </main>
  );
};

const ReportPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-[#E5D6C8] gap-4">
        <Loader2 className="w-8 h-8 text-[#B78E28] animate-spin" />
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
};

export default ReportPage;
