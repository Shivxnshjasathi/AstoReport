import { NodeJHora } from '@node-jhora/core';
import { DateTime } from 'luxon';

export interface PlanetData {
  name: string;
  longitude: number;
  rashi: number; // 1-12
  nakshatra: string;
  pada: number;
  isRetrograde: boolean;
}

export interface KundliData {
  planets: PlanetData[];
  lagnaRashi: number;
  houses: { [key: number]: string[] }; // House Number -> Planet Names
  houseRashis: { [key: number]: number }; // House Number -> Rashi Number
}

export const calculateKundli = async (
  dateOrDateTime: Date | DateTime,
  lat: number,
  lon: number,
  division: number = 1
): Promise<KundliData> => {
  const client = new NodeJHora({ latitude: lat, longitude: lon });
  await client.init();
  const birthDateLuxon = dateOrDateTime instanceof DateTime 
    ? dateOrDateTime 
    : DateTime.fromJSDate(dateOrDateTime);

  const { planets, houses } = client.getChart(birthDateLuxon);

  const processedPlanets: PlanetData[] = planets.map((p: any) => {
    let rashi = 0;
    if (division === 1) {
      rashi = Math.floor(p.longitude / 30) + 1;
    } else if (division === 9) {
      // Navamsa formula: (floor(longitude * 9 / 30) % 12) + 1
      rashi = (Math.floor((p.longitude * 9) / 30) % 12) + 1;
    }

    return {
      name: p.name,
      longitude: p.longitude,
      rashi,
      nakshatra: p.nakshatra?.name || 'Unknown',
      pada: p.nakshatra?.pada || 1,
      isRetrograde: p.isRetrograde || false,
    };
  });

  let lagnaLongitude = houses.ascendant;
  let lagnaRashi = 0;
  if (division === 1) {
    lagnaRashi = Math.floor(lagnaLongitude / 30) + 1;
  } else if (division === 9) {
    lagnaRashi = (Math.floor((lagnaLongitude * 9) / 30) % 12) + 1;
  }

  const houseRashis: { [key: number]: number } = {};
  for (let i = 1; i <= 12; i++) {
    let r = ((lagnaRashi + i - 2) % 12) + 1;
    houseRashis[i] = r;
  }

  const housePlanets: { [key: number]: string[] } = {};
  for (let i = 1; i <= 12; i++) housePlanets[i] = [];

  processedPlanets.forEach((p) => {
    for (let h = 1; h <= 12; h++) {
      if (houseRashis[h] === p.rashi) {
        housePlanets[h].push(p.name);
        break;
      }
    }
  });

  return {
    planets: processedPlanets,
    lagnaRashi,
    houses: housePlanets,
    houseRashis,
  };
};
