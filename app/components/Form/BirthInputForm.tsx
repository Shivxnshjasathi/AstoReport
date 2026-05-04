'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import LocationSearch from './LocationSearch';
import { LocationData } from '@/lib/services/geocoding';
import { useLanguage } from '../../context/LanguageContext';

const formDict = {
  en: { alert: "Please select a location", name: "YOUR NAME", generating: "CONNECTING...", generate: "GENERATE KUNDLI" },
  hi: { alert: "कृपया एक स्थान चुनें", name: "आपका नाम", generating: "कनेक्ट हो रहा है...", generate: "कुंडली बनाएं" }
};

const BirthInputForm = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const t = formDict[language];
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '',
  });
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return alert(t.alert);
    setIsGenerating(true);

    // Encode data in URL params for the report page
    const params = new URLSearchParams({
      name: formData.name,
      dob: formData.dob,
      tob: formData.tob,
      lat: location.lat.toString(),
      lon: location.lon.toString(),
      tz: location.timezone,
      locName: location.name,
    });

    router.push(`/report?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg w-full mx-auto">
      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <User className="absolute left-0 top-1/2 -translate-y-1/2 text-[#7D756B] w-5 h-5" />
          <input
            required
            type="text"
            placeholder={t.name}
            className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-[#7D756B]/50 focus:border-[#E5D6C8] focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] transition-all font-sans text-[16px] md:text-xs uppercase tracking-widest rounded-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 text-[#7D756B] w-5 h-5" />
          <input
            required
            type="date"
            className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-[#7D756B]/50 focus:border-[#E5D6C8] focus:outline-none text-[#E5D6C8] transition-all [color-scheme:dark] font-sans text-[16px] md:text-xs uppercase tracking-widest rounded-none"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>

        {/* Time of Birth */}
        <div className="relative">
          <Clock className="absolute left-0 top-1/2 -translate-y-1/2 text-[#7D756B] w-5 h-5" />
          <input
            required
            type="time"
            className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-[#7D756B]/50 focus:border-[#E5D6C8] focus:outline-none text-[#E5D6C8] transition-all [color-scheme:dark] font-sans text-[16px] md:text-xs uppercase tracking-widest rounded-none"
            value={formData.tob}
            onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
          />
        </div>

        {/* Location Search */}
        <LocationSearch onSelect={setLocation} />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isGenerating}
        className="w-full group py-4 bg-transparent border border-[#E5D6C8] hover:bg-[#E5D6C8] hover:text-[#121212] text-[#E5D6C8] font-sans text-xs uppercase tracking-[0.2em] rounded-full transition-all flex items-center justify-center gap-3 mt-8"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t.generating}
          </>
        ) : (
          <>
            {t.generate}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>
    </form>
  );
};

export default BirthInputForm;
