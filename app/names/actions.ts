'use server';

import { calculateKundli } from '@/lib/astro/calculator';
import { DateTime } from 'luxon';

export interface BabyNameResult {
  nakshatra: string;
  pada: number;
  rashi: string;
  seedLetters: string[];
  suggestedNames: { name: string; meaning: string; gender: 'boy' | 'girl' }[];
}

const NAKSHATRA_SEEDS: Record<string, string[]> = {
  Ashwini: ['Chu', 'Che', 'Cho', 'La'],
  Bharani: ['Lee', 'Lu', 'Le', 'Lo'],
  Krittika: ['A', 'Ee', 'U', 'Ea'],
  Rohini: ['O', 'Va', 'Vi', 'Vu'],
  Mrigashira: ['Ve', 'Vo', 'Ka', 'Ki'],
  Ardra: ['Ku', 'Gha', 'Ng', 'Chha'],
  Punarvasu: ['Ke', 'Ko', 'Ha', 'Hi'],
  Pushya: ['Hu', 'He', 'Ho', 'Da'],
  Ashlesha: ['Dee', 'Doo', 'De', 'Do'],
  Magha: ['Ma', 'Me', 'Mu', 'Me'],
  'Purva Phalguni': ['Mo', 'Ta', 'Tee', 'Too'],
  'Uttara Phalguni': ['Te', 'To', 'Pa', 'Pee'],
  Hasta: ['Pu', 'Sha', 'Na', 'Tha'],
  Chitra: ['Pe', 'Po', 'Ra', 'Ree'],
  Swati: ['Ru', 'Re', 'Ro', 'Ta'],
  Vishakha: ['Tee', 'Too', 'Te', 'To'],
  Anuradha: ['Na', 'Nee', 'Noo', 'Ne'],
  Jyeshtha: ['No', 'Ya', 'Yee', 'Yoo'],
  Mula: ['Ye', 'Yo', 'Bha', 'Bhee'],
  'Purva Ashadha': ['Bhoo', 'Dha', 'Pha', 'Dha'],
  'Uttara Ashadha': ['Bhe', 'Bho', 'Ja', 'Jee'],
  Shravana: ['Ju', 'Je', 'Jo', 'Gha'],
  Dhanishta: ['Ga', 'Gee', 'Goo', 'Ge'],
  Shatabhisha: ['Go', 'Sa', 'See', 'Soo'],
  'Purva Bhadrapada': ['Se', 'So', 'Da', 'Dee'],
  'Uttara Bhadrapada': ['Du', 'Tha', 'Jha', 'Jna'],
  Revati: ['De', 'Do', 'Cha', 'Che'],
};

const RASHI_NAMES = [
  'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)',
  'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrischika)',
  'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
];

const NAMES_DATABASE: Record<string, { name: string; meaning: string; gender: 'boy' | 'girl' }[]> = {
  A: [
    { name: 'Aarav', meaning: 'Peaceful, calm, wise', gender: 'boy' },
    { name: 'Aditya', meaning: 'The Sun, bright, limitless', gender: 'boy' },
    { name: 'Ananya', meaning: 'Matchless, unique, beautiful', gender: 'girl' },
    { name: 'Anya', meaning: 'Graceful, favorable, bright', gender: 'girl' },
  ],
  V: [
    { name: 'Vihaan', meaning: 'Dawn, morning first ray', gender: 'boy' },
    { name: 'Vivaan', meaning: 'Full of life, Lord Krishna', gender: 'boy' },
    { name: 'Veda', meaning: 'Sacred knowledge, wise', gender: 'girl' },
    { name: 'Vrinda', meaning: 'Holy basil (Tulsi), pure', gender: 'girl' },
  ],
  K: [
    { name: 'Kabir', meaning: 'Great, famous saint', gender: 'boy' },
    { name: 'Kian', meaning: 'Grace of God, royal', gender: 'boy' },
    { name: 'Kiara', meaning: 'Bright, clear-headed', gender: 'girl' },
    { name: 'Kavya', meaning: 'Poetry, creative motion', gender: 'girl' },
  ],
  S: [
    { name: 'Samar', meaning: 'Battle companion, evening talk', gender: 'boy' },
    { name: 'Shaurya', meaning: 'Bravery, physical courage', gender: 'boy' },
    { name: 'Saanvi', meaning: 'Goddess Lakshmi, blessed', gender: 'girl' },
    { name: 'Sia', meaning: 'Goddess Sita, white light', gender: 'girl' },
  ],
  R: [
    { name: 'Reyansh', meaning: 'Ray of light, Lord Vishnu part', gender: 'boy' },
    { name: 'Rishabh', meaning: 'Superior, morality, music note', gender: 'boy' },
    { name: 'Riya', meaning: 'Graceful singer, wealth', gender: 'girl' },
    { name: 'Ruhi', meaning: 'Soul, spiritual connection', gender: 'girl' },
  ],
  M: [
    { name: 'Madhav', meaning: 'Lord Krishna, sweet like honey', gender: 'boy' },
    { name: 'Manav', meaning: 'Humane, noble minded', gender: 'boy' },
    { name: 'Meera', meaning: 'Devotee of Lord Krishna, prosperous', gender: 'girl' },
    { name: 'Myra', meaning: 'Sweet smelling oil, admirable', gender: 'girl' },
  ]
};

export async function calculateBabyNames(
  dobStr: string,
  tobStr: string,
  lat: number,
  lon: number,
  timezone: string
) {
  try {
    const combinedStr = `${dobStr}T${tobStr}`;
    const birthDate = new Date(combinedStr);
    
    // Calculate birth chart
    const chart = calculateKundli(birthDate, lat, lon);
    
    // Extract Moon placement details
    const moon = chart.planets.find((p) => p.name === 'Moon');
    const nakshatra = moon ? moon.nakshatra : 'Ashwini';
    const pada = moon ? moon.pada : 1;
    const rashiIndex = moon ? moon.rashi : 1;
    const rashi = RASHI_NAMES[rashiIndex - 1] || RASHI_NAMES[0];

    const seedLetters = NAKSHATRA_SEEDS[nakshatra] || ['A', 'V', 'K', 'S'];
    
    // Map seed letters to suggested names
    const suggestedNames: { name: string; meaning: string; gender: 'boy' | 'girl' }[] = [];
    seedLetters.forEach((letter) => {
      const char = letter[0].toUpperCase();
      const list = NAMES_DATABASE[char] || NAMES_DATABASE['A'];
      suggestedNames.push(...list);
    });

    return {
      success: true,
      nakshatra,
      pada,
      rashi,
      seedLetters,
      suggestedNames: suggestedNames.slice(0, 12),
    };
  } catch (error: any) {
    console.error('Error calculating baby names:', error);
    return { success: false, error: error.message || 'Calculation failed' };
  }
}
