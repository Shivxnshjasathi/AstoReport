'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', color: '#FF4444', hi: 'मेष' },
  { name: 'Taurus', symbol: '♉', color: '#4CAF50', hi: 'वृषभ' },
  { name: 'Gemini', symbol: '♊', color: '#FFD700', hi: 'मिथुन' },
  { name: 'Cancer', symbol: '♋', color: '#C0C0C0', hi: 'कर्क' },
  { name: 'Leo', symbol: '♌', color: '#FF6B35', hi: 'सिंह' },
  { name: 'Virgo', symbol: '♍', color: '#2ECC71', hi: 'कन्या' },
  { name: 'Libra', symbol: '♎', color: '#E91E63', hi: 'तुला' },
  { name: 'Scorpio', symbol: '♏', color: '#DC143C', hi: 'वृश्चिक' },
  { name: 'Sagittarius', symbol: '♐', color: '#9C27B0', hi: 'धनु' },
  { name: 'Capricorn', symbol: '♑', color: '#607D8B', hi: 'मकर' },
  { name: 'Aquarius', symbol: '♒', color: '#03A9F4', hi: 'कुंभ' },
  { name: 'Pisces', symbol: '♓', color: '#00BCD4', hi: 'मीन' },
];

const PLANETS = [
  { name: 'Sun', symbol: '☉', color: '#FF6B35', orbitRadius: 2.2, speed: 1.0, size: 0.12, hi: 'सूर्य' },
  { name: 'Moon', symbol: '☽', color: '#C0C0C0', orbitRadius: 1.8, speed: 13.37, size: 0.08, hi: 'चंद्रमा' },
  { name: 'Mercury', symbol: '☿', color: '#2ECC71', orbitRadius: 2.0, speed: 4.09, size: 0.06, hi: 'बुध' },
  { name: 'Venus', symbol: '♀', color: '#E91E63', orbitRadius: 2.4, speed: 1.62, size: 0.07, hi: 'शुक्र' },
  { name: 'Mars', symbol: '♂', color: '#DC143C', orbitRadius: 2.6, speed: 0.52, size: 0.07, hi: 'मंगल' },
  { name: 'Jupiter', symbol: '♃', color: '#F39C12', orbitRadius: 2.9, speed: 0.083, size: 0.10, hi: 'बृहस्पति' },
  { name: 'Saturn', symbol: '♄', color: '#607D8B', orbitRadius: 3.2, speed: 0.034, size: 0.09, hi: 'शनि' },
];

// Calculate planet angle based on date offset (simplified sidereal)
export function getPlanetAngle(planet: { name: string; speed: number }, dayOffset: number): number {
  const baseAngles: Record<string, number> = {
    Sun: 55, Moon: 120, Mercury: 40, Venus: 80, Mars: 150, Jupiter: 95, Saturn: 345,
  };
  const base = baseAngles[planet.name] || 0;
  return ((base + planet.speed * dayOffset) % 360) * (Math.PI / 180);
}

// Generate circle points for Line component from drei
function circlePoints(radius: number, segments: number = 128): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
  }
  return pts;
}

// Zodiac Ring — using drei Line for clean rendering
function ZodiacRing() {
  const innerRadius = 3.5;
  const outerRadius = 4.2;

  return (
    <group>
      {/* Main ring segments as colored meshes */}
      {ZODIAC_SIGNS.map((sign, i) => {
        const startAngle = (i * 30 - 90) * (Math.PI / 180);
        const endAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);

        const shape = new THREE.Shape();
        const steps = 16;
        for (let s = 0; s <= steps; s++) {
          const a = startAngle + (endAngle - startAngle) * (s / steps);
          const x = Math.cos(a) * outerRadius;
          const y = Math.sin(a) * outerRadius;
          if (s === 0) shape.moveTo(x, y);
          else shape.lineTo(x, y);
        }
        for (let s = steps; s >= 0; s--) {
          const a = startAngle + (endAngle - startAngle) * (s / steps);
          const x = Math.cos(a) * innerRadius;
          const y = Math.sin(a) * innerRadius;
          shape.lineTo(x, y);
        }
        shape.closePath();

        return (
          <mesh key={sign.name}>
            <shapeGeometry args={[shape]} />
            <meshBasicMaterial color={sign.color} transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
        );
      })}

      {/* Ring border lines using drei Line */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = Math.cos(angle) * innerRadius;
        const y1 = Math.sin(angle) * innerRadius;
        const x2 = Math.cos(angle) * outerRadius;
        const y2 = Math.sin(angle) * outerRadius;
        return (
          <Line
            key={`border-${i}`}
            points={[[x1, y1, 0], [x2, y2, 0]]}
            color="#B78E28"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        );
      })}

      {/* Inner and outer ring circles */}
      <Line points={circlePoints(innerRadius)} color="#B78E28" lineWidth={1} transparent opacity={0.4} />
      <Line points={circlePoints(outerRadius)} color="#B78E28" lineWidth={1} transparent opacity={0.4} />

      {/* Sign labels (colored dots as mesh indicators) */}
      {ZODIAC_SIGNS.map((sign, i) => {
        const midAngle = ((i + 0.5) * 30 - 90) * (Math.PI / 180);
        const labelR = (innerRadius + outerRadius) / 2;
        const lx = Math.cos(midAngle) * labelR;
        const ly = Math.sin(midAngle) * labelR;
        return (
          <mesh key={`dot-${sign.name}`} position={[lx, ly, 0.01]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color={sign.color} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

// Orbit rings
function OrbitRings() {
  return (
    <group>
      {PLANETS.map((planet) => (
        <Line
          key={`orbit-${planet.name}`}
          points={circlePoints(planet.orbitRadius)}
          color={planet.color}
          lineWidth={0.5}
          transparent
          opacity={0.08}
        />
      ))}
    </group>
  );
}

// Planet sphere (animated)
function PlanetNode({ planet, dayOffset, onHover }: { planet: typeof PLANETS[0]; dayOffset: number; onHover: (info: string | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const angle = getPlanetAngle(planet, dayOffset);
    const x = Math.cos(angle) * planet.orbitRadius;
    const y = Math.sin(angle) * planet.orbitRadius;
    groupRef.current.position.set(x, y, 0);
  });

  // Pulse glow
  useFrame(({ clock }) => {
    if (!glowRef.current) return;
    const scale = 1 + Math.sin(clock.getElapsedTime() * 3 + PLANETS.indexOf(planet)) * 0.15;
    glowRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      {/* Planet sphere */}
      <mesh
        onPointerEnter={() => onHover(planet.name)}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[planet.size, 16, 16]} />
        <meshBasicMaterial color={planet.color} />
      </mesh>

      {/* Glow ring */}
      <mesh ref={glowRef}>
        <ringGeometry args={[planet.size * 1.5, planet.size * 2.2, 32]} />
        <meshBasicMaterial color={planet.color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Center glow
function CenterSun() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#B78E28" />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#B78E28" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

// Background stars
function StarField() {
  const positions = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 3;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#E5D6C8" size={0.015} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// Complete 3D Scene
function ZodiacScene({ dayOffset, onHover }: { dayOffset: number; onHover: (info: string | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <StarField />
      <CenterSun />
      <OrbitRings />
      <ZodiacRing />
      {PLANETS.map((planet) => (
        <PlanetNode key={planet.name} planet={planet} dayOffset={dayOffset} onHover={onHover} />
      ))}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

// Exported component
interface ZodiacWheelProps {
  dayOffset: number;
  language: 'en' | 'hi';
}

export default function ZodiacWheel3D({ dayOffset, language }: ZodiacWheelProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  const hoveredInfo = hoveredPlanet
    ? PLANETS.find((p) => p.name === hoveredPlanet)
    : null;

  return (
    <div className="relative w-full aspect-square max-h-[600px] bg-[#0A0A0A] rounded-3xl border border-[#7D756B]/20 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ZodiacScene dayOffset={dayOffset} onHover={setHoveredPlanet} />
      </Canvas>

      {/* Hover info overlay */}
      {hoveredInfo && (
        <div className="absolute top-4 left-4 bg-[#121212]/90 border border-[#7D756B]/30 rounded-2xl px-4 py-3 backdrop-blur-lg">
          <p className="text-sm font-serif text-[#E5D6C8] uppercase tracking-widest">
            {language === 'hi' ? hoveredInfo.hi : hoveredInfo.name}
          </p>
          <p className="text-[9px] text-[#7D756B] uppercase tracking-widest mt-1">
            {Math.floor(getPlanetAngle(hoveredInfo, dayOffset) * (180 / Math.PI)) % 360}° {language === 'hi' ? 'अंश' : 'DEGREES'}
          </p>
        </div>
      )}

      {/* Planet legend */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
        {PLANETS.map((p) => (
          <div
            key={p.name}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[7px] uppercase tracking-[0.12em] font-bold border transition-all ${
              hoveredPlanet === p.name ? 'bg-[#1A1A1A] scale-105' : 'bg-[#0A0A0A]/80'
            }`}
            style={{ color: p.color, borderColor: `${p.color}30` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
            {language === 'hi' ? p.hi : p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
