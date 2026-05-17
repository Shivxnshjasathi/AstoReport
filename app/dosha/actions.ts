'use server';

import { calculateKundli } from '@/lib/astro/calculator';
import { DateTime } from 'luxon';

export interface DoshaReportResult {
  manglik: {
    status: 'present' | 'absent' | 'partial';
    desc: { en: string; hi: string };
  };
  sadesati: {
    status: 'present' | 'absent';
    desc: { en: string; hi: string };
  };
  kaalsarp: {
    status: 'present' | 'absent';
    desc: { en: string; hi: string };
  };
  pitra: {
    status: 'present' | 'absent';
    desc: { en: string; hi: string };
  };
}

export async function calculateDoshaReport(
  dobStr: string,
  tobStr: string,
  lat: number,
  lon: number,
  timezone: string
) {
  try {
    const birthDate = DateTime.fromISO(`${dobStr}T${tobStr}`, { zone: timezone });
    const chart = await calculateKundli(birthDate, lat, lon);

    // 1. Helper: Find which house a planet is in
    const getPlanetHouse = (planetName: string): number => {
      for (let h = 1; h <= 12; h++) {
        if (chart.houses[h]?.includes(planetName)) return h;
      }
      return 1;
    };

    const marsHouse = getPlanetHouse('Mars');
    const rahuHouse = getPlanetHouse('Rahu');
    const ketuHouse = getPlanetHouse('Ketu');
    const sunHouse = getPlanetHouse('Sun');
    const moonHouse = getPlanetHouse('Moon');

    // 2. Manglik Dosha
    // Mars in 1, 4, 7, 8, 12 from Lagna
    const isManglikHouse = [1, 4, 7, 8, 12].includes(marsHouse);
    let manglikStatus: 'present' | 'absent' | 'partial' = 'absent';
    let manglikDesc = {
      en: 'No Mangal Dosha detected in your birth chart. Marriage and relationship houses are highly peaceful.',
      hi: 'आपकी जन्म कुंडली में कोई मंगल दोष नहीं पाया गया। विवाह और संबंध भाव अत्यधिक शांतिपूर्ण हैं।'
    };

    if (isManglikHouse) {
      // Check for cancelation (exaltation in Capricorn (10) or own signs Aries (1) / Scorpio (8))
      const mars = chart.planets.find(p => p.name === 'Mars');
      const marsRashi = mars ? mars.rashi : 0;
      if ([1, 8, 10].includes(marsRashi)) {
        manglikStatus = 'partial';
        manglikDesc = {
          en: 'Partial Mangal Dosha detected. The intense fire of Mars is naturally softened by own-sign or exaltation status in your chart.',
          hi: 'आंशिक मंगल दोष पाया गया। आपकी कुंडली में स्वराशि या उच्च स्थिति होने से मंगल का तीव्र प्रभाव स्वाभाविक रूप से शांत हो जाता है।'
        };
      } else {
        manglikStatus = 'present';
        manglikDesc = {
          en: 'Mangal Dosha detected in your chart due to Mars placement. Requires standard energetic alignment or specific mantra sadhana.',
          hi: 'मंगल की स्थिति के कारण आपकी कुंडली में मंगल दोष पाया गया। इसके लिए सामान्य ऊर्जा संरेखण या विशेष मंत्र साधना की आवश्यकता है।'
        };
      }
    }

    // 3. Sade Sati
    // Transit Saturn is in Pisces (Sign 12) during 2026-2027.
    // Sade Sati affects Moon sign in 11 (Aquarius), 12 (Pisces), 1 (Aries).
    const moon = chart.planets.find(p => p.name === 'Moon');
    const moonRashi = moon ? moon.rashi : 0; // 1 to 12
    let sadesatiStatus: 'present' | 'absent' = 'absent';
    let sadesatiDesc = {
      en: 'You are currently not under the influence of Shani Sade Sati. Major career undertakings are free of delay.',
      hi: 'आप वर्तमान में शनि साढ़े साती के प्रभाव में नहीं हैं। प्रमुख व्यावसायिक उपक्रमों में कोई देरी नहीं होगी।'
    };

    if (moonRashi === 11) {
      sadesatiStatus = 'present';
      sadesatiDesc = {
        en: 'Active Sade Sati detected (Last Phase - Rising). Shani is concluding lessons on structure, requiring patient discipline.',
        hi: 'सक्रिय साढ़े साती पाई गई (अंतिम चरण - उदय)। शनि संरचना पर सबक समाप्त कर रहे हैं, जिसके लिए धैर्यपूर्वक अनुशासन की आवश्यकता है।'
      };
    } else if (moonRashi === 12) {
      sadesatiStatus = 'present';
      sadesatiDesc = {
        en: 'Active Sade Sati detected (Peak Phase - Janma Shani). Demands high personal integrity, structured changes, and meditative calm.',
        hi: 'सक्रिय साढ़े साती पाई गई (शिखर चरण - जन्म शनि)। उच्च व्यक्तिगत अखंडता, संरचित परिवर्तन और ध्यानपूर्ण शांति की मांग करता है।'
      };
    } else if (moonRashi === 1) {
      sadesatiStatus = 'present';
      sadesatiDesc = {
        en: 'Active Sade Sati detected (First Phase - Rising). Initiates new long-term growth structures and operational focus.',
        hi: 'सक्रिय साढ़े साती पाई गई (पहला चरण - उदय)। नए दीर्घकालिक विकास संरचनाओं और परिचालन फोकस को शुरू करता है।'
      };
    }

    // 4. Kaal Sarp Dosha
    // Check if all planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn) are on one side of Rahu-Ketu axis
    // Houses are 1 to 12. Rahu & Ketu divide the circle in two halves.
    // Let's count planets in houses relative to Rahu and Ketu
    const getHouseDistance = (h1: number, h2: number) => {
      return (h1 - h2 + 12) % 12;
    };

    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    let countSideA = 0;
    let countSideB = 0;

    planets.forEach(pName => {
      const pHouse = getPlanetHouse(pName);
      // Distance from Rahu to Ketu counter-clockwise
      const distToKetu = getHouseDistance(ketuHouse, rahuHouse);
      const distToPlanet = getHouseDistance(pHouse, rahuHouse);
      
      if (distToPlanet > 0 && distToPlanet < distToKetu) {
        countSideA++;
      } else if (distToPlanet !== 0 && distToPlanet !== distToKetu) {
        countSideB++;
      }
    });

    // If either side is empty (all planets are on the other side), it is Kaal Sarp Dosha!
    const isKaalSarp = countSideA === 0 || countSideB === 0;
    const kaalsarpStatus: 'present' | 'absent' = isKaalSarp ? 'present' : 'absent';
    const kaalsarpDesc = isKaalSarp
      ? {
          en: 'Kaal Sarp Dosha detected. All key planets are hemmed between the Karmic axis of Rahu and Ketu. May cause initial obstacles.',
          hi: 'काल सर्प दोष पाया गया। सभी प्रमुख ग्रह राहु और केतु के कर्म अक्ष के बीच फंसे हुए हैं। प्रारंभिक बाधाएं आ सकती हैं।'
        }
      : {
          en: 'No Kaal Sarp Dosha detected in your chart. The flow of planetary energy is highly balanced and unrestricted.',
          hi: 'आपकी कुंडली में कोई काल सर्प दोष नहीं पाया गया। ग्रहों की ऊर्जा का प्रवाह अत्यधिक संतुलित और निर्बाध है।'
        };

    // 5. Pitra Dosha
    // Affliction from ancestors: Rahu/Ketu conjunct Sun/Moon, or Rahu/Ketu in House 9
    const isPitra =
      sunHouse === rahuHouse ||
      sunHouse === ketuHouse ||
      moonHouse === rahuHouse ||
      moonHouse === ketuHouse ||
      rahuHouse === 9 ||
      ketuHouse === 9;

    const pitraStatus: 'present' | 'absent' = isPitra ? 'present' : 'absent';
    const pitraDesc = isPitra
      ? {
          en: 'Pitra Dosha detected in your chart due to Rahu/Ketu ancestral house alignment. Requires respect to elders and planetary charity.',
          hi: 'राहु/केतु की पैतृक भाव स्थिति के कारण आपकी कुंडली में पितृ दोष पाया गया। बड़ों का सम्मान और ग्रहों के दान की आवश्यकता है।'
        }
      : {
          en: 'No Pitra Dosha detected. Ancestral energies are highly supportive and protective of your life journey.',
          hi: 'कोई पितृ दोष नहीं पाया गया। पैतृक ऊर्जाएं आपके जीवन की यात्रा में अत्यधिक सहायक और सुरक्षात्मक हैं।'
        };

    return {
      success: true,
      data: {
        manglik: { status: manglikStatus, desc: manglikDesc },
        sadesati: { status: sadesatiStatus, desc: sadesatiDesc },
        kaalsarp: { status: kaalsarpStatus, desc: kaalsarpDesc },
        pitra: { status: pitraStatus, desc: pitraDesc }
      }
    };
  } catch (error: any) {
    console.error('Error calculating Dosha report:', error);
    return { success: false, error: error.message || 'Dosha calculation failed' };
  }
}
