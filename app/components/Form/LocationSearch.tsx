'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { searchLocation, LocationData } from '@/lib/services/geocoding';
import { useLanguage } from '../../context/LanguageContext';

interface LocationSearchProps {
  onSelect: (location: LocationData) => void;
}

const locationDict = {
  en: "SEARCH BIRTH CITY...",
  hi: "जन्म शहर खोजें..."
};

const LocationSearch: React.FC<LocationSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true);
        const data = await searchLocation(query);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center border-b border-[#7D756B]/50 focus-within:border-[#E5D6C8] transition-all">
        <Search className="flex-shrink-0 text-[#7D756B] w-5 h-5 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={locationDict[language]}
          className="flex-1 min-w-0 py-3 bg-transparent focus:outline-none text-[#E5D6C8] placeholder-[#7D756B] font-sans text-[16px] md:text-sm uppercase tracking-wide"
        />
        {loading && (
          <Loader2 className="flex-shrink-0 text-[#B78E28] w-4 h-4 animate-spin ml-2" />
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-[#121212] backdrop-blur-xl border border-[#7D756B]/50 rounded-none overflow-hidden shadow-2xl">
          {results.map((res, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelect(res);
                setQuery(res.name);
                setResults([]);
              }}
              className="w-full px-4 py-3 flex items-start gap-3 hover:bg-[#E5D6C8]/10 transition-colors border-b border-[#7D756B]/30 last:border-0 text-left font-sans"
            >
              <MapPin className="w-5 h-5 text-[#B78E28] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-widest font-medium text-[#E5D6C8] line-clamp-1">{res.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#7D756B] mt-1">
                  {res.lat.toFixed(4)}, {res.lon.toFixed(4)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
