'use server';

import { NodeJHora } from '@node-jhora/core';
import { generateVimshottari } from '@node-jhora/prediction';
import { DateTime } from 'luxon';

export async function getKundaliReport(
  dateStr: string,
  lat: number,
  lon: number,
  timezone: string
) {
  try {
    const birthDateJS = new Date(dateStr);
    const birthDateLuxon = DateTime.fromJSDate(birthDateJS, { zone: timezone });
    
    const client = new NodeJHora({ latitude: lat, longitude: lon });
    await client.init();
    const chart = client.getChart(birthDateLuxon);
    
    // Find Moon for Dasha calculation
    const moon = chart.planets.find((p: any) => p.name === 'Moon');
    const moonLongitude = moon ? moon.longitude : 0;

    // Calculate Dashas (Depth 2 for Mahadasha + Antardasha)
    const dashaTree = generateVimshottari(birthDateLuxon, moonLongitude, 2);

    // Filter or flatten the dasha tree to find the "Current" dasha
    const now = DateTime.now();
    const currentMahadasha = dashaTree.find(m => now >= m.start && now < m.end);
    const currentAntardasha = currentMahadasha?.subPeriods?.find(a => now >= a.start && now < a.end);

    const planets = chart.planets.map((p: any) => ({
      name: p.name,
      longitude: p.longitude,
      rashi: Math.floor(p.longitude / 30) + 1,
      navamsaRashi: (Math.floor((p.longitude * 9) / 30) % 12) + 1,
      nakshatra: p.nakshatra?.name || 'Unknown',
    }));

    const lagnaLongitude = chart.houses.ascendant;
    const lagnaRashi = Math.floor(lagnaLongitude / 30) + 1;
    const navamsaLagnaRashi = (Math.floor((lagnaLongitude * 9) / 30) % 12) + 1;

    return {
      success: true,
      data: {
        planets,
        lagnaRashi,
        navamsaLagnaRashi,
        currentDasha: {
          mahadasha: currentMahadasha ? {
            planet: currentMahadasha.planet,
            end: currentMahadasha.end.toISODate(),
          } : null,
          antardasha: currentAntardasha ? {
            planet: currentAntardasha.planet,
            end: currentAntardasha.end.toISODate(),
          } : null,
        }
      },
    };
  } catch (error: any) {
    console.error('Kundali generation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate report',
    };
  }
}
