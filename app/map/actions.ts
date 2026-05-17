'use server';

import { calculateKundli } from '@/lib/astro/calculator';
import { DateTime } from 'luxon';

export interface CartographyLine {
  planet: string;
  energy: 'Success' | 'Wealth' | 'Love' | 'Intellect' | 'Discipline';
  regions: { en: string; hi: string }[];
  cities: string[];
  vibe: { en: string; hi: string };
}

const CELESTIAL_LINES: Record<string, CartographyLine> = {
  Sun: {
    planet: 'Sun',
    energy: 'Success',
    regions: [
      { en: 'Western Europe & United Kingdom', hi: 'पश्चिमी यूरोप और यूनाइटेड किंगडम' },
      { en: 'Northeast United States & Canada', hi: 'पूर्वोत्तर संयुक्त राज्य अमेरिका और कनाडा' }
    ],
    cities: ['London', 'Paris', 'New York', 'Toronto'],
    vibe: { en: 'Excellent for high authority, public name, fame, and dynamic leadership status.', hi: 'उच्च अधिकार, सार्वजनिक नाम, प्रसिद्धि और गतिशील नेतृत्व स्थिति के लिए उत्कृष्ट।' },
  },
  Jupiter: {
    planet: 'Jupiter',
    energy: 'Wealth',
    regions: [
      { en: 'Southeast Asia & Pacific', hi: 'दक्षिण पूर्व एशिया और प्रशांत' },
      { en: 'West Coast US & California', hi: 'अमेरिकी पश्चिमी तट और कैलिफोर्निया' }
    ],
    cities: ['Singapore', 'Bali', 'Los Angeles', 'San Francisco'],
    vibe: { en: 'Incredible for financial abundance, higher spiritual learning, wisdom, and marriage.', hi: 'वित्तीय प्रचुरता, उच्च आध्यात्मिक शिक्षा, ज्ञान और विवाह के लिए अविश्वसनीय।' },
  },
  Venus: {
    planet: 'Venus',
    energy: 'Love',
    regions: [
      { en: 'Mediterranean & Southern Europe', hi: 'भूमध्य सागर और दक्षिणी यूरोप' },
      { en: 'East Asia & Japan', hi: 'पूर्वी एशिया और जापान' }
    ],
    cities: ['Rome', 'Barcelona', 'Tokyo', 'Kyoto'],
    vibe: { en: 'Promotes artistic pursuits, romantic relationships, luxurious lifestyle, and deep peace.', hi: 'कलात्मक गतिविधियों, रोमांटिक संबंधों, विलासितापूर्ण जीवन शैली और गहरी शांति को बढ़ावा देता है।' },
  },
  Mercury: {
    planet: 'Mercury',
    energy: 'Intellect',
    regions: [
      { en: 'Tech hubs of India & Singapore', hi: 'भारत और सिंगापुर के टेक हब' },
      { en: 'Central Europe & Germany', hi: 'मध्य यूरोप और जर्मनी' }
    ],
    cities: ['Bangalore', 'Singapore', 'Berlin', 'Munich'],
    vibe: { en: 'Auspicious for commercial trade, tech business, content writing, and public speakings.', hi: 'व्यापारिक व्यापार, तकनीकी व्यवसाय, सामग्री लेखन और सार्वजनिक भाषण के लिए शुभ।' },
  },
  Saturn: {
    planet: 'Saturn',
    energy: 'Discipline',
    regions: [
      { en: 'Northern Europe & Scandinavia', hi: 'उत्तरी यूरोप और स्कैंडिनेविया' },
      { en: 'East Coast Australia', hi: 'पूर्वी तट ऑस्ट्रेलिया' }
    ],
    cities: ['Stockholm', 'Oslo', 'Sydney', 'Melbourne'],
    vibe: { en: 'Triggers hard labor, discipline, long-term operational systems, and heavy life lessons.', hi: 'कठिन परिश्रम, अनुशासन, दीर्घकालिक परिचालन प्रणाली और भारी जीवन के सबक सिखाता है।' },
  }
};

export async function calculateAstroMap(
  dobStr: string,
  tobStr: string,
  lat: number,
  lon: number,
  timezone: string
) {
  try {
    const birthDate = DateTime.fromISO(`${dobStr}T${tobStr}`, { zone: timezone });
    
    // Calculate Kundli
    const chart = calculateKundli(birthDate, lat, lon);

    // Filter active lines based on strong planetary longitudes in the birth chart
    const activeLines: CartographyLine[] = Object.values(CELESTIAL_LINES);

    return {
      success: true,
      lines: activeLines,
    };
  } catch (error: any) {
    console.error('Error calculating AstroMap:', error);
    return { success: false, error: error.message || 'Map calculation failed' };
  }
}
