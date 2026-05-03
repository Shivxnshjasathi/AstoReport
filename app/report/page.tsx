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
import { ReportPDF } from '../components/PDF/ReportPDF';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false, loading: () => <button className="p-2 bg-white/5 border border-white/10 rounded-lg"><Loader2 className="w-5 h-5 text-amber-500 animate-spin" /></button> }
);

const ReportContent = () => {
  const searchParams = useSearchParams();
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
      <div className="min-h-screen bg-[#1E1B4B] flex flex-col items-center justify-center text-white gap-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-xl font-medium text-amber-100">Connecting to the Cosmos...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#1E1B4B] flex items-center justify-center text-white">
        <p className="text-amber-500 font-bold">{error || 'Invalid report data.'}</p>
      </div>
    );
  }

  const buildChartData = (planets: any[], lagnaRashi: number, isD9 = false) => {
    const housePlanets: { [key: number]: string[] } = {};
    const houseRashis: { [key: number]: number } = {};

    for (let h = 1; h <= 12; h++) {
      housePlanets[h] = [];
      houseRashis[h] = ((lagnaRashi + h - 2) % 12) + 1;
    }

    planets.forEach((p: any) => {
      const rashi = isD9 ? p.navamsaRashi : p.rashi;
      for (let h = 1; h <= 12; h++) {
        if (houseRashis[h] === rashi) {
          housePlanets[h].push(p.name);
          break;
        }
      }
    });

    return { houses: housePlanets, houseRashis };
  };

  const d1 = buildChartData(data.planets, data.lagnaRashi);
  const d9 = buildChartData(data.planets, data.navamsaLagnaRashi, true);

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-[#E5D6C8] relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto py-12 px-6 lg:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto w-full space-y-12 relative z-10"
        >
          {/* Header & Actions */}
          <div className="flex items-center justify-between border-b border-[#7D756B]/30 pb-6">
            <Link href="/" className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs">
              <ArrowLeft className="w-4 h-4" />
              BACK
            </Link>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied!');
                }}
                className="flex items-center gap-2 text-[#7D756B] hover:text-[#E5D6C8] transition-colors uppercase tracking-[0.2em] text-xs group"
                title="Share Report URL"
              >
                <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block">SHARE</span>
              </button>
              <PDFDownloadLink
                document={<ReportPDF name={name} dob={dob} tob={tob} locName={locName} planets={data.planets} dasha={data.currentDasha} />}
                fileName={`${name}_Kundli.pdf`}
                className="flex items-center gap-2 bg-transparent border border-[#E5D6C8] px-4 py-2 rounded-full hover:bg-[#E5D6C8] hover:text-[#121212] transition-colors uppercase tracking-[0.2em] text-xs group"
                title="Download PDF"
              >
                {({ loading }) => (
                  loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                )}
              </PDFDownloadLink>
            </div>
          </div>

          {/* User Info Header */}
          <div className="text-center py-8">
            <h1 className="text-4xl lg:text-5xl font-serif text-[#E5D6C8] uppercase tracking-[0.1em] mb-6 font-light">
              {name}'s Kundli
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 text-[#7D756B] text-xs uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#B78E28]" />{dob}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B78E28]" />{tob}</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#B78E28]" /><span className="line-clamp-1">{locName}</span></div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <KundliChart houses={d1.houses} houseRashis={d1.houseRashis} title="Lagna (D1)" />
            <KundliChart houses={d9.houses} houseRashis={d9.houseRashis} title="Navamsa (D9)" />
          </div>

          {/* Planetary Table */}
          <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/30 rounded-3xl overflow-hidden p-6 lg:p-8">
            <h2 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-[0.15em] mb-6 border-b border-[#7D756B]/30 pb-4">Planetary Positions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs uppercase tracking-[0.1em]">
                <thead className="text-[#7D756B]">
                  <tr>
                    <th className="py-4 font-normal">Planet</th>
                    <th className="py-4 font-normal">Longitude</th>
                    <th className="py-4 font-normal">Rashi</th>
                    <th className="py-4 font-normal">Nakshatra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#7D756B]/20">
                  {data.planets.map((p: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#E5D6C8]/5 transition-colors">
                      <td className="py-4 text-[#E5D6C8]">{p.name}</td>
                      <td className="py-4 font-mono text-[#B78E28]">{formatDegrees(p.longitude % 30)}</td>
                      <td className="py-4 text-[#7D756B]">{p.rashi}</td>
                      <td className="py-4 text-[#7D756B]">{p.nakshatra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dasha Timeline */}
          {data.currentDasha && (
            <div className="bg-[#121212]/80 backdrop-blur-lg border border-[#7D756B]/30 p-6 lg:p-8 rounded-3xl">
              <h2 className="text-lg font-serif text-[#E5D6C8] uppercase tracking-[0.15em] mb-6 flex items-center gap-2 border-b border-[#7D756B]/30 pb-4">
                <Sparkles className="w-4 h-4 text-[#B78E28]" />
                Current Vimshottari Dasha
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.currentDasha.mahadasha && (
                  <div className="border border-[#7D756B]/30 p-6 rounded-2xl relative">
                    <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-2">Maha Dasha</p>
                    <p className="text-3xl font-serif font-light text-[#E5D6C8]">{data.currentDasha.mahadasha.planet}</p>
                    <p className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] mt-4">Ends: {data.currentDasha.mahadasha.end}</p>
                  </div>
                )}
                {data.currentDasha.antardasha && (
                  <div className="border border-[#7D756B]/30 p-6 rounded-2xl relative">
                    <p className="text-[10px] text-[#7D756B] uppercase tracking-[0.2em] mb-2">Antar Dasha</p>
                    <p className="text-3xl font-serif font-light text-[#E5D6C8]">{data.currentDasha.antardasha.planet}</p>
                    <p className="text-[10px] text-[#B78E28] uppercase tracking-[0.2em] mt-4">Ends: {data.currentDasha.antardasha.end}</p>
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
                Career & Wealth Blueprint
              </h2>
              <p className="text-[#7D756B] text-xs uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed mb-8">
                Discover your hidden potential, ideal career paths, and precise timelines for financial growth.
              </p>
              <Link href="/store" className="bg-[#B78E28] text-[#121212] hover:bg-[#E5D6C8] px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all font-semibold shadow-[0_0_20px_rgba(183,142,40,0.3)]">
                Unlock Full Analysis for $19.99
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
      <div className="min-h-screen bg-[#1E1B4B] flex flex-col items-center justify-center text-white gap-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-xl font-medium text-amber-100">Loading Premium Report...</p>
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
};

export default ReportPage;
