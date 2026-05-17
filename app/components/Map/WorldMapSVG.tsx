'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Simplified world map paths (major continents as SVG paths in equirectangular projection)
// Viewport: 0,0 to 1000,500 mapping -180..180 lon, 90..-90 lat
function lonLatToXY(lon: number, lat: number): [number, number] {
  return [(lon + 180) * (1000 / 360), (90 - lat) * (500 / 180)];
}

interface PlanetaryLine {
  planet: string;
  color: string;
  glowColor: string;
  energy: string;
  // MC line: longitude where planet culminates (simplified as vertical line)
  mcLongitude: number;
  // IC line: opposite side
  icLongitude: number;
  // ASC/DSC: latitude curves (simplified)
  ascLatitude: number;
  cities: { name: string; lon: number; lat: number; rating: { career: number; love: number; health: number; wealth: number } }[];
}

interface WorldMapSVGProps {
  lines: PlanetaryLine[];
  language: 'en' | 'hi';
}

// Major city dots for reference
const REFERENCE_CITIES = [
  { name: 'London', lon: -0.12, lat: 51.5 },
  { name: 'New York', lon: -74, lat: 40.7 },
  { name: 'Tokyo', lon: 139.7, lat: 35.7 },
  { name: 'Sydney', lon: 151.2, lat: -33.9 },
  { name: 'Dubai', lon: 55.3, lat: 25.3 },
  { name: 'Mumbai', lon: 72.9, lat: 19.1 },
  { name: 'São Paulo', lon: -46.6, lat: -23.6 },
  { name: 'Singapore', lon: 103.8, lat: 1.35 },
  { name: 'Paris', lon: 2.35, lat: 48.9 },
  { name: 'Berlin', lon: 13.4, lat: 52.5 },
  { name: 'Los Angeles', lon: -118.2, lat: 34.1 },
  { name: 'Toronto', lon: -79.4, lat: 43.7 },
  { name: 'Delhi', lon: 77.2, lat: 28.6 },
  { name: 'Bangkok', lon: 100.5, lat: 13.8 },
  { name: 'Cairo', lon: 31.2, lat: 30.0 },
  { name: 'Nairobi', lon: 36.8, lat: -1.3 },
  { name: 'Rome', lon: 12.5, lat: 41.9 },
  { name: 'Moscow', lon: 37.6, lat: 55.8 },
];

// Simplified continent outlines as SVG paths
const CONTINENT_PATHS = [
  // North America (simplified)
  'M 60 80 L 80 60 L 120 55 L 155 50 L 175 60 L 180 80 L 190 95 L 200 110 L 210 120 L 215 140 L 225 150 L 230 165 L 220 175 L 200 180 L 185 185 L 170 180 L 165 168 L 155 160 L 140 165 L 130 170 L 125 180 L 120 185 L 115 175 L 110 160 L 100 150 L 95 135 L 90 120 L 80 110 L 70 100 L 60 90 Z',
  // South America
  'M 210 220 L 220 210 L 230 210 L 240 215 L 250 225 L 255 240 L 260 260 L 265 280 L 270 300 L 275 320 L 270 340 L 265 360 L 255 375 L 245 385 L 235 380 L 225 365 L 220 345 L 215 325 L 210 300 L 205 280 L 200 260 L 205 240 Z',
  // Europe
  'M 440 55 L 460 50 L 480 48 L 510 50 L 530 55 L 545 60 L 555 70 L 550 80 L 540 90 L 530 100 L 520 105 L 510 110 L 500 108 L 490 100 L 480 95 L 470 90 L 460 85 L 450 80 L 445 70 Z',
  // Africa
  'M 460 130 L 480 125 L 500 128 L 520 135 L 540 140 L 555 150 L 560 170 L 558 190 L 555 210 L 550 230 L 540 250 L 530 270 L 520 290 L 510 305 L 500 315 L 490 310 L 480 295 L 475 275 L 470 255 L 465 235 L 460 215 L 455 195 L 450 175 L 448 155 L 450 140 Z',
  // Asia
  'M 560 40 L 600 35 L 650 30 L 700 28 L 750 30 L 790 38 L 820 48 L 840 60 L 850 75 L 855 90 L 850 105 L 840 120 L 825 130 L 810 140 L 790 145 L 770 148 L 750 150 L 730 155 L 710 158 L 690 155 L 670 148 L 650 140 L 630 135 L 610 130 L 590 120 L 575 110 L 565 95 L 558 80 L 555 65 L 555 50 Z',
  // Australia
  'M 780 280 L 810 270 L 840 268 L 870 275 L 890 290 L 895 310 L 885 330 L 870 340 L 850 345 L 830 340 L 810 330 L 795 315 L 785 300 L 780 290 Z',
];

export default function WorldMapSVG({ lines, language }: WorldMapSVGProps) {
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<{ name: string; x: number; y: number; rating?: any } | null>(null);

  // Generate wavy sine-like planetary lines across the map
  const planetaryPaths = useMemo(() => {
    return lines.map((line) => {
      // MC line: vertical-ish with slight sine wave
      const mcPoints: string[] = [];
      const icPoints: string[] = [];
      const ascPoints: string[] = [];

      for (let lat = -80; lat <= 80; lat += 2) {
        // MC line (Midheaven): primarily vertical, with a sine-wave offset
        const mcX = ((line.mcLongitude + 180) / 360) * 1000 + Math.sin((lat / 180) * Math.PI * 3) * 15;
        const mcY = ((90 - lat) / 180) * 500;
        mcPoints.push(`${mcX.toFixed(1)},${mcY.toFixed(1)}`);

        // IC line: opposite hemisphere
        const icX = ((line.icLongitude + 180) / 360) * 1000 + Math.sin((lat / 180) * Math.PI * 2.5) * 12;
        icPoints.push(`${icX.toFixed(1)},${mcY.toFixed(1)}`);

        // ASC line: horizontal-ish sine curve
        const ascX = ((lat + 90) / 180) * 1000;
        const ascY = ((90 - line.ascLatitude) / 180) * 500 + Math.sin((lat / 180) * Math.PI * 4) * 30;
        ascPoints.push(`${ascX.toFixed(1)},${ascY.toFixed(1)}`);
      }

      return {
        ...line,
        mcPath: `M ${mcPoints.join(' L ')}`,
        icPath: `M ${icPoints.join(' L ')}`,
        ascPath: `M ${ascPoints.join(' L ')}`,
      };
    });
  }, [lines]);

  return (
    <div className="relative w-full aspect-[2/1] bg-[#0A0A0A] rounded-3xl border border-[#7D756B]/20 overflow-hidden">
      {/* Pulsing background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B78E28]/3 via-transparent to-[#B78E28]/3" />
      
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(183, 142, 40, 0.1))' }}
      >
        <defs>
          {/* Grid pattern */}
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#7D756B" strokeWidth="0.15" strokeOpacity="0.25" />
          </pattern>
          
          {/* Glow filters for each planet */}
          {lines.map((line) => (
            <filter key={`glow-${line.planet}`} id={`glow-${line.planet}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor={line.glowColor} floodOpacity="0.6" result="glowColor" />
              <feComposite in="glowColor" in2="blur" operator="in" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Grid background */}
        <rect width="1000" height="500" fill="url(#grid)" />

        {/* Latitude/Longitude reference lines */}
        {[-60, -30, 0, 30, 60].map((lat) => {
          const y = ((90 - lat) / 180) * 500;
          return (
            <g key={`lat-${lat}`}>
              <line x1="0" y1={y} x2="1000" y2={y} stroke="#7D756B" strokeWidth="0.3" strokeOpacity="0.2" strokeDasharray="4,8" />
              <text x="5" y={y - 3} fill="#7D756B" fillOpacity="0.3" fontSize="6">{lat}°</text>
            </g>
          );
        })}
        {[-120, -60, 0, 60, 120].map((lon) => {
          const x = ((lon + 180) / 360) * 1000;
          return (
            <line key={`lon-${lon}`} x1={x} y1="0" x2={x} y2="500" stroke="#7D756B" strokeWidth="0.3" strokeOpacity="0.2" strokeDasharray="4,8" />
          );
        })}

        {/* Continent outlines */}
        {CONTINENT_PATHS.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="#1A1A1A"
            stroke="#7D756B"
            strokeWidth="0.5"
            strokeOpacity="0.4"
            fillOpacity="0.6"
          />
        ))}

        {/* Planetary lines */}
        {planetaryPaths.map((pLine) => {
          const isHovered = hoveredLine === pLine.planet;
          const opacity = hoveredLine === null ? 0.7 : isHovered ? 1 : 0.15;
          
          return (
            <g
              key={pLine.planet}
              onMouseEnter={() => setHoveredLine(pLine.planet)}
              onMouseLeave={() => setHoveredLine(null)}
              style={{ cursor: 'pointer', transition: 'opacity 0.3s' }}
              opacity={opacity}
            >
              {/* MC Line (Midheaven) */}
              <path
                d={pLine.mcPath}
                fill="none"
                stroke={pLine.color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                filter={isHovered ? `url(#glow-${pLine.planet})` : undefined}
                strokeLinecap="round"
              />
              
              {/* IC Line */}
              <path
                d={pLine.icPath}
                fill="none"
                stroke={pLine.color}
                strokeWidth={isHovered ? 2 : 1}
                strokeDasharray="6,4"
                strokeOpacity="0.6"
                strokeLinecap="round"
              />

              {/* ASC Line (Ascendant – horizontal wave) */}
              <path
                d={pLine.ascPath}
                fill="none"
                stroke={pLine.color}
                strokeWidth={isHovered ? 2 : 1.2}
                strokeOpacity="0.5"
                strokeLinecap="round"
              />

              {/* Planet label at top of MC line */}
              <text
                x={((pLine.mcLongitude + 180) / 360) * 1000}
                y="18"
                textAnchor="middle"
                fill={pLine.color}
                fontSize="8"
                fontWeight="bold"
                style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                {pLine.planet}
              </text>
            </g>
          );
        })}

        {/* City power dots */}
        {lines.flatMap((line) =>
          line.cities.map((city) => {
            const [cx, cy] = lonLatToXY(city.lon, city.lat);
            const isLineHovered = hoveredLine === null || hoveredLine === line.planet;
            return (
              <g
                key={`${line.planet}-${city.name}`}
                opacity={isLineHovered ? 1 : 0.15}
                style={{ transition: 'opacity 0.3s' }}
              >
                {/* Pulsing circle */}
                <circle cx={cx} cy={cy} r="6" fill={line.color} fillOpacity="0.15">
                  <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="fill-opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Solid center dot */}
                <circle
                  cx={cx} cy={cy} r="2.5"
                  fill={line.color}
                  stroke="#0A0A0A"
                  strokeWidth="0.5"
                  onMouseEnter={() => setHoveredCity({ name: city.name, x: cx, y: cy, rating: city.rating })}
                  onMouseLeave={() => setHoveredCity(null)}
                  style={{ cursor: 'pointer' }}
                />
              </g>
            );
          })
        )}

        {/* Reference city labels */}
        {REFERENCE_CITIES.map((city) => {
          const [cx, cy] = lonLatToXY(city.lon, city.lat);
          return (
            <text
              key={city.name}
              x={cx}
              y={cy + 8}
              textAnchor="middle"
              fill="#7D756B"
              fillOpacity="0.35"
              fontSize="5"
              style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              {city.name}
            </text>
          );
        })}

        {/* Hover tooltip */}
        {hoveredCity && (
          <g>
            <rect
              x={hoveredCity.x - 55}
              y={hoveredCity.y - 52}
              width="110"
              height="42"
              rx="6"
              fill="#121212"
              stroke="#B78E28"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
            <text x={hoveredCity.x} y={hoveredCity.y - 38} textAnchor="middle" fill="#E5D6C8" fontSize="7" fontWeight="bold">
              {hoveredCity.name}
            </text>
            {hoveredCity.rating && (
              <>
                <text x={hoveredCity.x - 40} y={hoveredCity.y - 26} fill="#FFB300" fontSize="5.5">
                  Career: {'★'.repeat(hoveredCity.rating.career)}{'☆'.repeat(5 - hoveredCity.rating.career)}
                </text>
                <text x={hoveredCity.x - 40} y={hoveredCity.y - 18} fill="#E91E63" fontSize="5.5">
                  Love: {'★'.repeat(hoveredCity.rating.love)}{'☆'.repeat(5 - hoveredCity.rating.love)}
                </text>
              </>
            )}
          </g>
        )}
      </svg>

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        {lines.map((line) => (
          <button
            key={line.planet}
            onMouseEnter={() => setHoveredLine(line.planet)}
            onMouseLeave={() => setHoveredLine(null)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[8px] uppercase tracking-[0.15em] font-bold border transition-all ${
              hoveredLine === line.planet
                ? 'bg-[#1A1A1A] border-current scale-105'
                : 'bg-[#0A0A0A]/80 border-[#7D756B]/20 hover:border-current'
            }`}
            style={{ color: line.color, borderColor: hoveredLine === line.planet ? line.color : undefined }}
          >
            <span className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: line.color }} />
            {line.planet} — {line.energy}
          </button>
        ))}
      </div>
    </div>
  );
}
