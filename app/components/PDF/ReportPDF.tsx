'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Rect, Line, G } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 36, backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  title: { fontSize: 20, color: '#121212', marginBottom: 16, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 },
  section: { marginBottom: 16, padding: 12, border: '1px solid #7D756B', borderRadius: 6 },
  subtitle: { fontSize: 11, color: '#B78E28', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  row: { flexDirection: 'row', marginBottom: 4, borderBottom: '1px solid #F3F4F6', paddingBottom: 4 },
  label: { width: 90, fontSize: 10, color: '#6B7280' },
  value: { flex: 1, fontSize: 10, color: '#111827' },
  tableHeader: { flexDirection: 'row', borderBottom: '1px solid #7D756B', paddingBottom: 4, marginBottom: 4 },
  headerText: { fontSize: 9, color: '#7D756B', flex: 1, textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', borderBottom: '1px solid #E5D6C8', paddingVertical: 4 },
  cellText: { fontSize: 9, color: '#121212', flex: 1 },
  chartRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  chartLabel: { fontSize: 10, color: '#B78E28', textAlign: 'center', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
});

// North Indian 12-house grid positions (x, y, width, height) for a 240x240 SVG
const HOUSE_CELLS: Record<number, [number, number, number, number]> = {
  1:  [80,  0,   80,  80],
  2:  [160, 0,   80,  80],
  3:  [160, 80,  80,  80],
  4:  [160, 160, 80,  80],
  5:  [80,  160, 80,  80],
  6:  [0,   160, 80,  80],
  7:  [0,   80,  80,  80],
  8:  [0,   0,   80,  80],
  9:  [80,  0,   0,   0],   // center placeholder - skip
  10: [80,  80,  80,  80],  // center
  11: [0,   0,   0,   0],   // unused
  12: [0,   0,   0,   0],   // unused
};

// Proper North Indian layout: 12 cells arranged in 3x3 with corners split
const NORTH_INDIAN_HOUSES: Record<number, { x: number; y: number; w: number; h: number }> = {
  1:  { x: 80,  y: 0,   w: 80,  h: 80  }, // top center
  2:  { x: 160, y: 0,   w: 80,  h: 80  }, // top right
  3:  { x: 160, y: 80,  w: 80,  h: 80  }, // middle right
  4:  { x: 160, y: 160, w: 80,  h: 80  }, // bottom right
  5:  { x: 80,  y: 160, w: 80,  h: 80  }, // bottom center
  6:  { x: 0,   y: 160, w: 80,  h: 80  }, // bottom left
  7:  { x: 0,   y: 80,  w: 80,  h: 80  }, // middle left
  8:  { x: 0,   y: 0,   w: 80,  h: 80  }, // top left
  9:  { x: 80,  y: 80,  w: 0,   h: 0   }, // not shown separately
  10: { x: 80,  y: 80,  w: 80,  h: 80  }, // center
  11: { x: 0,   y: 0,   w: 0,   h: 0   },
  12: { x: 0,   y: 0,   w: 0,   h: 0   },
};

const RASHI_NAMES = ['','Ar','Ta','Ge','Ca','Le','Vi','Li','Sc','Sg','Cp','Aq','Pi'];

const KundliGrid = ({ houses, houseRashis }: { houses: Record<number, string[]>; houseRashis: Record<number, number> }) => (
  <Svg width={240} height={240}>
    {/* Outer border */}
    <Rect x={0} y={0} width={240} height={240} stroke="#7D756B" strokeWidth={1} fill="none" />
    {/* Draw 8 perimeter houses */}
    {[1,2,3,4,5,6,7,8].map(h => {
      const cell = NORTH_INDIAN_HOUSES[h];
      if (!cell || cell.w === 0) return null;
      const planets = (houses[h] || []).join(' ');
      const rashi = RASHI_NAMES[houseRashis[h]] || '';
      return (
        <G key={h}>
          <Rect x={cell.x} y={cell.y} width={cell.w} height={cell.h} stroke="#7D756B" strokeWidth={0.5} fill="#FAFAFA" />
          <Text style={{ fontSize: 7, fill: '#7D756B' }} x={cell.x + 3} y={cell.y + 10}>{h}</Text>
          <Text style={{ fontSize: 7, fill: '#B78E28' }} x={cell.x + 3} y={cell.y + 20}>{rashi}</Text>
          <Text style={{ fontSize: 7, fill: '#121212' }} x={cell.x + 3} y={cell.y + 32}>{planets}</Text>
        </G>
      );
    })}
    {/* Center diamond (houses 9-12) */}
    <Line x1={80} y1={80} x2={160} y2={80} stroke="#7D756B" strokeWidth={0.5} />
    <Line x1={80} y1={160} x2={160} y2={160} stroke="#7D756B" strokeWidth={0.5} />
    <Line x1={80} y1={80} x2={80} y2={160} stroke="#7D756B" strokeWidth={0.5} />
    <Line x1={160} y1={80} x2={160} y2={160} stroke="#7D756B" strokeWidth={0.5} />
    {/* Center diagonals for houses 9-12 */}
    <Line x1={80} y1={80} x2={160} y2={160} stroke="#7D756B" strokeWidth={0.5} />
    <Line x1={160} y1={80} x2={80} y2={160} stroke="#7D756B" strokeWidth={0.5} />
    {/* Labels for center houses */}
    {[9, 10, 11, 12].map((h, i) => {
      const positions = [
        { x: 120, y: 92 },  // 9 top
        { x: 94,  y: 122 }, // 10 left
        { x: 120, y: 152 }, // 11 bottom
        { x: 146, y: 122 }, // 12 right
      ];
      const pos = positions[i];
      const planets = (houses[h] || []).join(' ');
      const rashi = RASHI_NAMES[houseRashis[h]] || '';
      return (
        <G key={h}>
          <Text style={{ fontSize: 7, fill: '#7D756B' }} x={pos.x} y={pos.y}>{h} {rashi}</Text>
          <Text style={{ fontSize: 7, fill: '#121212' }} x={pos.x} y={pos.y + 10}>{planets}</Text>
        </G>
      );
    })}
  </Svg>
);

interface ReportPDFProps {
  name: string;
  dob: string;
  tob: string;
  locName: string;
  planets: any[];
  dasha: any;
  d1Houses: Record<number, string[]>;
  d1HouseRashis: Record<number, number>;
  d9Houses: Record<number, string[]>;
  d9HouseRashis: Record<number, number>;
}

export const ReportPDF = ({ name, dob, tob, locName, planets, dasha, d1Houses, d1HouseRashis, d9Houses, d9HouseRashis }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{name}&apos;s Kundli Report</Text>

      {/* Birth Details */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Birth Details</Text>
        <View style={styles.row}><Text style={styles.label}>Date of Birth:</Text><Text style={styles.value}>{dob}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Time of Birth:</Text><Text style={styles.value}>{tob}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Location:</Text><Text style={styles.value}>{locName}</Text></View>
      </View>

      {/* Charts side by side */}
      <View style={styles.chartRow}>
        <View>
          <Text style={styles.chartLabel}>Lagna Chart (D1)</Text>
          <KundliGrid houses={d1Houses} houseRashis={d1HouseRashis} />
        </View>
        <View>
          <Text style={styles.chartLabel}>Navamsa Chart (D9)</Text>
          <KundliGrid houses={d9Houses} houseRashis={d9HouseRashis} />
        </View>
      </View>

      {/* Planetary Positions */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Planetary Positions</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Planet</Text>
          <Text style={styles.headerText}>Longitude</Text>
          <Text style={styles.headerText}>Rashi</Text>
          <Text style={styles.headerText}>Nakshatra</Text>
        </View>
        {planets.map((p, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.cellText}>{p.name}</Text>
            <Text style={styles.cellText}>{Math.floor(p.longitude % 30)}°</Text>
            <Text style={styles.cellText}>{p.rashi}</Text>
            <Text style={styles.cellText}>{p.nakshatra}</Text>
          </View>
        ))}
      </View>

      {/* Dasha */}
      {dasha && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Current Vimshottari Dasha</Text>
          {dasha.mahadasha && (
            <View style={styles.row}>
              <Text style={styles.label}>Maha Dasha:</Text>
              <Text style={styles.value}>{dasha.mahadasha.planet} (Ends: {dasha.mahadasha.end})</Text>
            </View>
          )}
          {dasha.antardasha && (
            <View style={styles.row}>
              <Text style={styles.label}>Antar Dasha:</Text>
              <Text style={styles.value}>{dasha.antardasha.planet} (Ends: {dasha.antardasha.end})</Text>
            </View>
          )}
        </View>
      )}
    </Page>
  </Document>
);
