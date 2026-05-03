'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KundliChartProps {
  houses: { [key: number]: string[] };
  houseRashis: { [key: number]: number };
  title?: string;
}

const KundliChart: React.FC<KundliChartProps> = ({ houses, houseRashis, title }) => {
  // SVG size and center
  const size = 400;
  const center = size / 2;

  // House label and planet positions (approximate centers of polygons)
  const positions: { [key: number]: { x: number; y: number } } = {
    1: { x: center, y: center - 80 },
    2: { x: center - 100, y: 50 },
    3: { x: 50, y: 100 },
    4: { x: center - 80, y: center },
    5: { x: 50, y: 300 },
    6: { x: 100, y: 350 },
    7: { x: center, y: center + 80 },
    8: { x: 300, y: 350 },
    9: { x: 350, y: 300 },
    10: { x: center + 80, y: center },
    11: { x: 350, y: 100 },
    12: { x: 300, y: 50 },
  };

  // Sign number positions (slightly offset from house centers)
  const signPositions: { [key: number]: { x: number; y: number } } = {
    1: { x: center, y: center - 40 },
    2: { x: center - 60, y: 30 },
    3: { x: 30, y: 60 },
    4: { x: center - 40, y: center },
    5: { x: 30, y: 340 },
    6: { x: 60, y: 370 },
    7: { x: center, y: center + 40 },
    8: { x: 340, y: 370 },
    9: { x: 370, y: 340 },
    10: { x: center + 40, y: center },
    11: { x: 370, y: 60 },
    12: { x: 340, y: 30 },
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
        {/* Outer Border */}
        <rect x="0" y="0" width={size} height={size} fill="none" stroke="#7D756B" strokeWidth="1" strokeOpacity="0.5" />
        
        {/* Diagonals */}
        <line x1="0" y1="0" x2={size} y2={size} stroke="#7D756B" strokeWidth="1" strokeOpacity="0.5" />
        <line x1={size} y1="0" x2="0" y2={size} stroke="#7D756B" strokeWidth="1" strokeOpacity="0.5" />
        
        {/* Inner Diamond */}
        <path
          d={`M ${center} 0 L 0 ${center} L ${center} ${size} L ${size} ${center} Z`}
          fill="none"
          stroke="#7D756B"
          strokeWidth="1"
          strokeOpacity="0.5"
        />

        {/* Content for each house */}
        {Object.entries(houseRashis).map(([houseNum, rashi]) => {
          const h = parseInt(houseNum);
          const pos = positions[h];
          const signPos = signPositions[h];
          const planets = houses[h] || [];

          return (
            <g key={houseNum}>
              {/* Rashi Number */}
              <text
                x={signPos.x}
                y={signPos.y}
                textAnchor="middle"
                fontSize="12"
                fontWeight="normal"
                fill="#B78E28"
                className="select-none"
              >
                {rashi}
              </text>
              
              {/* Planets */}
              <g transform={`translate(${pos.x}, ${pos.y})`}>
                {planets.map((p, idx) => (
                  <text
                    key={idx}
                    y={idx * 16 - (planets.length * 8)}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#E5D6C8"
                    fontWeight="normal"
                    className="select-none"
                  >
                    {p}
                  </text>
                ))}
              </g>
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
};

export default KundliChart;
