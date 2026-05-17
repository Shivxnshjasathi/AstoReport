'use server';

import { NodeJHora } from '@node-jhora/core';
import { generateVimshottari } from '@node-jhora/prediction';
import { DateTime } from 'luxon';

export async function calculateDashaTimeline(
  dobStr: string,
  tobStr: string,
  lat: number,
  lon: number,
  timezone: string
) {
  try {
    const combinedStr = `${dobStr}T${tobStr}`;
    const birthDateLuxon = DateTime.fromISO(combinedStr, { zone: timezone });
    
    const client = new NodeJHora({ latitude: lat, longitude: lon });
    await client.init();
    const chart = client.getChart(birthDateLuxon);
    const moon = chart.planets.find((p: any) => p.name === 'Moon');
    const moonLongitude = moon ? moon.longitude : 0;
    
    // Generate full 120-year Vimshottari Dasha tree
    const dashas = generateVimshottari(birthDateLuxon, moonLongitude, 2);
    
    const serializedDashas = dashas.map((m: any) => ({
      planet: m.planet,
      start: m.start.toISODate(),
      end: m.end.toISODate(),
      subPeriods: m.subPeriods?.map((s: any) => ({
        planet: s.planet,
        start: s.start.toISODate(),
        end: s.end.toISODate(),
      })) || [],
    }));

    return { success: true, dashas: serializedDashas };
  } catch (error: any) {
    console.error('Error calculating dasha timeline:', error);
    return { success: false, error: error.message || 'Calculation failed' };
  }
}
