'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export interface PlanetInfo {
  name: string;
  displayName: string;
  degree: number;
  isRetrograde: boolean;
  isCombust?: boolean;
  isExalted?: boolean;
  isDebilitated?: boolean;
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
    2: { x: 100, y: 65 },                  // House 2 (upper-left triangle)
    3: { x: 65, y: 100 },                  // House 3 (left-upper triangle)
    4: { x: center - 40, y: center },      // House 4 (left center diamond)
    5: { x: 65, y: 300 },                  // House 5 (left-lower triangle)
    6: { x: 100, y: 335 },                 // House 6 (lower-left triangle)
    7: { x: center, y: center + 40 },      // House 7 (bottom center diamond)
    8: { x: 300, y: 335 },                 // House 8 (lower-right triangle)
    9: { x: 335, y: 300 },                 // House 9 (right-lower triangle)
    10: { x: center + 40, y: center },     // House 10 (right center diamond)
    11: { x: 335, y: 100 },                // House 11 (right-upper triangle)
    12: { x: 300, y: 65 },                 // House 12 (upper-right triangle)
  };

  // 100% Collision-Free Planet Spacing coordinates (dynamically laid out inside safe regions to avoid lines and overlapping!)
  const getPlanetCoordinates = (house: number, idx: number, count: number): { x: number; y: number } => {
    // Base safe centers and layout categories for each house
    const houseCenters: Record<number, { cx: number; cy: number; type: 'diamond' | 'tri-top' | 'tri-bottom' | 'tri-left' | 'tri-right' }> = {
      1: { cx: center, cy: 95, type: 'diamond' },
      2: { cx: 100, cy: 30, type: 'tri-top' },
      3: { cx: 30, cy: 100, type: 'tri-left' },
      4: { cx: 90, cy: center, type: 'diamond' },
      5: { cx: 30, cy: 300, type: 'tri-left' },
      6: { cx: 100, cy: 370, type: 'tri-bottom' },
      7: { cx: center, cy: 305, type: 'diamond' },
      8: { cx: 300, cy: 370, type: 'tri-bottom' },
      9: { cx: 370, cy: 300, type: 'tri-right' },
      10: { cx: 310, cy: center, type: 'diamond' },
      11: { cx: 370, cy: 100, type: 'tri-right' },
      12: { cx: 300, cy: 30, type: 'tri-top' }
    };

    const area = houseCenters[house] || { cx: center, cy: center, type: 'diamond' };
    const { cx, cy, type } = area;

    if (count === 1) {
      return { x: cx, y: cy };
    }

    if (type === 'diamond') {
      if (house === 1 || house === 7) {
        // Horizontal orientation preferred for top/bottom diamonds
        if (count === 2) {
          const offset = 26;
          return { x: cx - offset/2 + idx * offset, y: cy };
        } else if (count === 3) {
          const offset = 26;
          return { x: cx - offset + idx * offset, y: cy };
        } else if (count === 4) {
          const offsetX = 24;
          const offsetY = 24;
          const row = Math.floor(idx / 2);
          const col = idx % 2;
          return {
            x: cx - offsetX/2 + col * offsetX,
            y: cy - offsetY/2 + row * offsetY
          };
        } else {
          const offsetX = 24;
          const offsetY = 22;
          const row = Math.floor(idx / 3);
          const col = idx % 3;
          return {
            x: cx - offsetX + col * offsetX,
            y: cy - offsetY/2 + row * offsetY
          };
        }
      } else {
        // Vertical orientation preferred for left/right diamonds (4 and 10)
        if (count === 2) {
          const offset = 26;
          return { x: cx, y: cy - offset/2 + idx * offset };
        } else if (count === 3) {
          const offset = 26;
          return { x: cx, y: cy - offset + idx * offset };
        } else if (count === 4) {
          const offsetX = 24;
          const offsetY = 24;
          const row = Math.floor(idx / 2);
          const col = idx % 2;
          return {
            x: cx - offsetX/2 + col * offsetX,
            y: cy - offsetY/2 + row * offsetY
          };
        } else {
          const offsetX = 24;
          const offsetY = 22;
          const row = Math.floor(idx / 2);
          const col = idx % 2;
          return {
            x: cx - offsetX/2 + col * offsetX,
            y: cy - offsetY + row * offsetY
          };
        }
      }
    }

    if (type === 'tri-top') {
      // Triangle pointing down (Houses 2 and 12)
      if (count === 2) {
        const offset = 26;
        return { x: cx - offset/2 + idx * offset, y: cy };
      } else if (count === 3) {
        const offset = 26;
        return { x: cx - offset + idx * offset, y: cy };
      } else if (count === 4) {
        const row = Math.floor(idx / 2);
        const col = idx % 2;
        if (row === 0) {
          return { x: cx - 18 + col * 36, y: cy - 10 };
        } else {
          return { x: cx - 14 + col * 28, y: cy + 12 };
        }
      } else {
        const row = idx < 3 ? 0 : 1;
        const col = idx < 3 ? idx : idx - 3;
        if (row === 0) {
          return { x: cx - 28 + col * 28, y: cy - 11 };
        } else {
          return { x: cx - 14 + col * 28, y: cy + 11 };
        }
      }
    }

    if (type === 'tri-bottom') {
      // Triangle pointing up (Houses 6 and 8)
      if (count === 2) {
        const offset = 26;
        return { x: cx - offset/2 + idx * offset, y: cy };
      } else if (count === 3) {
        const offset = 26;
        return { x: cx - offset + idx * offset, y: cy };
      } else if (count === 4) {
        const row = Math.floor(idx / 2);
        const col = idx % 2;
        if (row === 0) {
          return { x: cx - 14 + col * 28, y: cy - 12 };
        } else {
          return { x: cx - 18 + col * 36, y: cy + 10 };
        }
      } else {
        const row = idx < 2 ? 0 : 1;
        const col = idx < 2 ? idx : idx - 2;
        if (row === 0) {
          return { x: cx - 14 + col * 28, y: cy - 11 };
        } else {
          return { x: cx - 28 + col * 28, y: cy + 11 };
        }
      }
    }

    if (type === 'tri-left') {
      // Triangle pointing right (Houses 3 and 5)
      if (count === 2) {
        const offset = 26;
        return { x: cx, y: cy - offset/2 + idx * offset };
      } else if (count === 3) {
        const offset = 26;
        return { x: cx, y: cy - offset + idx * offset };
      } else if (count === 4) {
        const col = Math.floor(idx / 2);
        const row = idx % 2;
        if (col === 0) {
          return { x: cx - 10, y: cy - 18 + row * 36 };
        } else {
          return { x: cx + 12, y: cy - 14 + row * 28 };
        }
      } else {
        const col = idx < 3 ? 0 : 1;
        const row = idx < 3 ? idx : idx - 3;
        if (col === 0) {
          return { x: cx - 11, y: cy - 28 + row * 28 };
        } else {
          return { x: cx + 11, y: cy - 14 + row * 28 };
        }
      }
    }

    if (type === 'tri-right') {
      // Triangle pointing left (Houses 9 and 11)
      if (count === 2) {
        const offset = 26;
        return { x: cx, y: cy - offset/2 + idx * offset };
      } else if (count === 3) {
        const offset = 26;
        return { x: cx, y: cy - offset + idx * offset };
      } else if (count === 4) {
        const col = Math.floor(idx / 2);
        const row = idx % 2;
        if (col === 0) {
          return { x: cx - 12, y: cy - 14 + row * 28 };
        } else {
          return { x: cx + 10, y: cy - 18 + row * 36 };
        }
      } else {
        const col = idx < 2 ? 0 : 1;
        const row = idx < 2 ? idx : idx - 2;
        if (col === 0) {
          return { x: cx - 11, y: cy - 14 + row * 28 };
        } else {
          return { x: cx + 11, y: cy - 28 + row * 28 };
        }
      }
    }

    return { x: cx, y: cy };
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
            const isCombust = typeof p === 'string' ? false : p.isCombust || false;
            const isExalted = typeof p === 'string' ? false : p.isExalted || false;
            const isDebilitated = typeof p === 'string' ? false : p.isDebilitated || false;
            return {
              name: planetName,
              displayName,
              degree,
              isRetrograde,
              isCombust,
              isExalted,
              isDebilitated
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
                    {/* Unified Status and Degree Superscript */}
                    {(p.degree > 0 || p.isRetrograde || p.isCombust || p.isExalted || p.isDebilitated) && (
                      <tspan
                        fontSize="7.5"
                        fontWeight="normal"
                        fill={color}
                        baselineShift="super"
                        dx="0.5"
                      >
                        {p.degree > 0 ? p.degree.toString().padStart(2, '0') : ''}
                        {p.isRetrograde && 'ᴿ'}
                        {p.isCombust && 'ᶜ'}
                        {p.isExalted && 'ᴱ'}
                        {p.isDebilitated && 'ᴰ'}
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
      <div className="w-full max-w-[400px] mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-[#7D756B]/20 pt-4 text-[9px] sm:text-[10px] text-[#8D7A65] font-serif uppercase tracking-[0.08em]">
        <div className="flex items-center gap-1">
          <span className="text-[#FFB300] font-bold text-xs">ᴿ</span>
          <span>{isHi ? 'वक्री (RETROGRADE)' : 'RETROGRADE'}</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <span className="text-[#FF3D00] font-bold text-xs">ᶜ</span>
          <span>{isHi ? 'अस्त (COMBUST)' : 'COMBUST'}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#2E7D32] font-bold text-xs">ᴱ</span>
          <span>{isHi ? 'उच्च (EXALTED)' : 'EXALTED'}</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <span className="text-[#C2185B] font-bold text-xs">ᴰ</span>
          <span>{isHi ? 'नीच (DEBILITATED)' : 'DEBILITATED'}</span>
        </div>
      </div>
    </div>
  );
};

export default KundliChart;
