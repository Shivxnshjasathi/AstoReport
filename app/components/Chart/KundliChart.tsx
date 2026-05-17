'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export interface PlanetInfo {
  name: string;
  displayName: string;
  degree: number;
  isRetrograde: boolean;
}

interface KundliChartProps {
  houses: { [key: number]: (string | PlanetInfo)[] };
  houseRashis: { [key: number]: number };
  title?: string;
}

const PLANET_ABBRS_HI: Record<string, string> = {
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

const PLANET_ABBRS_EN: Record<string, string> = {
  Sun: 'Su',
  Moon: 'Mo',
  Mars: 'Ma',
  Mercury: 'Me',
  Jupiter: 'Ju',
  Venus: 'Ve',
  Saturn: 'Sa',
  Rahu: 'Ra',
  Ketu: 'Ke',
  Uranus: 'Ur',
  Neptune: 'Ne',
  Pluto: 'Pl',
  Lagna: 'Asc'
};

const PLANET_COLORS: Record<string, string> = {
  Sun: '#FF3D00', // Sun - Bright Crimson-Red
  Moon: '#FF1744', // Moon - Vibrant Coral-Red
  Mars: '#3E2723', // Mars - Dark Brownish-Green
  Mercury: '#0277BD', // Mercury - Deep Blue
  Jupiter: '#7B1FA2', // Jupiter - Regal Purple
  Venus: '#2E7D32', // Venus - Green
  Saturn: '#C2185B', // Saturn - Magenta-Purple
  Rahu: '#D84315', // Rahu - Dark Red
  Ketu: '#E65100', // Ketu - Dark Gold-Orange
  Lagna: '#E65100', // Lagna - Dark Orange-Gold
  Uranus: '#D84315', // Uranus - Dark Orange
  Neptune: '#3E2723', // Neptune - Dark Brown
  Pluto: '#37474F' // Pluto - Charcoal Slate
};

const KundliChart: React.FC<KundliChartProps> = ({ houses, houseRashis, title }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const abbrs = isHi ? PLANET_ABBRS_HI : PLANET_ABBRS_EN;

  // SVG size and center
  const size = 400;
  const center = size / 2;

  // 100% Collision-Free Rashi Sign Positions (perfectly inside each triangle/diamond, off all lines!)
  const signPositions: { [key: number]: { x: number; y: number } } = {
    1: { x: center, y: center - 40 },      // House 1 (top center diamond)
    2: { x: 100, y: 65 },                  // House 2 (upper-left triangle) - CLEARED FROM x+y=200 LINE!
    3: { x: 65, y: 100 },                  // House 3 (left-upper triangle) - CLEARED FROM x+y=200 LINE!
    4: { x: center - 40, y: center },      // House 4 (left center diamond)
    5: { x: 65, y: 300 },                  // House 5 (left-lower triangle) - CLEARED FROM y-x=200 LINE!
    6: { x: 100, y: 335 },                 // House 6 (lower-left triangle) - CLEARED FROM y-x=200 LINE!
    7: { x: center, y: center + 40 },      // House 7 (bottom center diamond)
    8: { x: 300, y: 335 },                 // House 8 (lower-right triangle) - CLEARED FROM x+y=600 LINE!
    9: { x: 335, y: 300 },                 // House 9 (right-lower triangle) - CLEARED FROM x+y=600 LINE!
    10: { x: center + 40, y: center },     // House 10 (right center diamond)
    11: { x: 335, y: 100 },                // House 11 (right-upper triangle) - CLEARED FROM x-y=200 LINE!
    12: { x: 300, y: 65 },                 // House 12 (upper-right triangle) - CLEARED FROM x-y=200 LINE!
  };

  // 100% Collision-Free Planet Spacing coordinates (moved to outer edges away from Rashi numbers!)
  const getPlanetCoordinates = (house: number, idx: number, count: number): { x: number; y: number } => {
    const housePlanetsArea: Record<number, { cx: number; cy: number; dir: 'h' | 'v' }> = {
      1: { cx: center, cy: 70, dir: 'h' },
      2: { cx: 60, cy: 35, dir: 'h' },
      3: { cx: 35, cy: 60, dir: 'v' },
      4: { cx: 65, cy: center, dir: 'v' },
      5: { cx: 35, cy: 340, dir: 'v' },
      6: { cx: 60, cy: 365, dir: 'h' },
      7: { cx: center, cy: size - 70, dir: 'h' },
      8: { cx: 340, cy: 365, dir: 'h' },
      9: { cx: 365, cy: 340, dir: 'v' },
      10: { cx: size - 65, cy: center, dir: 'v' },
      11: { cx: 365, cy: 60, dir: 'v' },
      12: { cx: 340, cy: 35, dir: 'h' }
    };

    const area = housePlanetsArea[house] || { cx: center, cy: center, dir: 'h' };
    
    if (count === 1) {
      return { x: area.cx, y: area.cy };
    }

    const offset = 28;
    const start = -((count - 1) * offset) / 2;

    if (area.dir === 'h') {
      return { x: area.cx + start + idx * offset, y: area.cy };
    } else {
      return { x: area.cx, y: area.cy + start + idx * offset };
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#121212] backdrop-blur-md p-6 rounded-3xl border border-[#7D756B]/30 shadow-none">
      {title && <h3 className="text-sm font-serif mb-6 text-[#E5D6C8] uppercase tracking-[0.15em] font-light">{title}</h3>}
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[400px] h-auto drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Beautiful Orange-Gold Grid Lines */}
        {/* Outer Square */}
        <rect x="0" y="0" width={size} height={size} fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.8" />
        
        {/* Diagonals */}
        <line x1="0" y1="0" x2={size} y2={size} stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.8" />
        <line x1={size} y1="0" x2="0" y2={size} stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.8" />
        
        {/* Inner Diamond */}
        <path
          d={`M ${center} 0 L 0 ${center} L ${center} ${size} L ${size} ${center} Z`}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeOpacity="0.8"
        />

        {/* Content (Rashi numbers and Planets) for each house */}
        {Object.entries(houseRashis).map(([houseNum, rashi]) => {
          const h = parseInt(houseNum);
          const signPos = signPositions[h];
          const rawPlanets = houses[h] || [];

          // Map string or PlanetInfo objects to localized representations
          const planets: PlanetInfo[] = rawPlanets.map((p) => {
            const planetName = typeof p === 'string' ? p : p.name;
            const displayName = abbrs[planetName] || planetName;
            const degree = typeof p === 'string' ? 0 : p.degree;
            const isRetrograde = typeof p === 'string' ? false : p.isRetrograde;
            return {
              name: planetName,
              displayName,
              degree,
              isRetrograde
            };
          });

          return (
            <g key={houseNum}>
              {/* Rashi Number - Centered, Dark Gold, perfectly clear of lines! */}
              <text
                x={signPos.x}
                y={signPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="normal"
                fill="#8D7A65"
                className="select-none font-serif"
              >
                {rashi}
              </text>
              
              {/* Planets - Beautifully separated from Rashi numbers */}
              {planets.map((p, idx) => {
                const pos = getPlanetCoordinates(h, idx, planets.length);
                const color = PLANET_COLORS[p.name] || '#E5D6C8';
                
                return (
                  <text
                    key={idx}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="13"
                    fill={color}
                    fontWeight="bold"
                    className="select-none font-sans"
                  >
                    <tspan>{p.displayName}</tspan>
                    {/* Retrograde Asterisk */}
                    {p.isRetrograde && (
                      <tspan fill={color} fontWeight="bold">*</tspan>
                    )}
                    {/* Degrees Superscript */}
                    {p.name !== 'Lagna' && p.degree > 0 && (
                      <tspan
                        fontSize="8"
                        fontWeight="normal"
                        fill={color}
                        baselineShift="super"
                        dx="0.5"
                      >
                        {p.degree.toString().padStart(2, '0')}
                      </tspan>
                    )}
                    {/* Lagna Degrees */}
                    {p.name === 'Lagna' && p.degree > 0 && (
                      <tspan
                        fontSize="8"
                        fontWeight="normal"
                        fill={color}
                        baselineShift="super"
                        dx="0.5"
                      >
                        {p.degree.toString().padStart(2, '0')}
                      </tspan>
                    )}
                  </text>
                );
              })}
            </g>
          );
        })}
      </motion.svg>
      
      {/* Legend Block - Matching the active language */}
      <div className="w-full max-w-[400px] mt-4 grid grid-cols-2 gap-2 border-t border-[#7D756B]/20 pt-4 text-[10px] text-[#8D7A65] font-serif uppercase tracking-[0.1em]">
        <div className="flex items-center gap-1">
          <span className="text-[#FFB300] font-bold">*</span>
          <span>{isHi ? 'वक्री (RETROGRADE)' : 'RETROGRADE'}</span>
        </div>
        <div className="text-right">
          <span>{isHi ? 'लग्न (ASCENDANT)' : 'ASCENDANT'}</span>
        </div>
      </div>
    </div>
  );
};

export default KundliChart;
