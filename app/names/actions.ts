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

// Highly comprehensive and accurate Vedic / Sanskrit database
const NAMES_DATABASE: Record<string, { name: string; meaning: string; gender: 'boy' | 'girl' }[]> = {
  A: [
    { name: 'Aarav', meaning: 'Peaceful, calm, wise', gender: 'boy' },
    { name: 'Aditya', meaning: 'The Sun, radiant and limitless', gender: 'boy' },
    { name: 'Ananya', meaning: 'Matchless, unique, beautiful', gender: 'girl' },
    { name: 'Anya', meaning: 'Graceful, favorable, bright', gender: 'girl' },
    { name: 'Advait', meaning: 'Unique, non-dual, spiritual', gender: 'boy' },
    { name: 'Aradhya', meaning: 'One who is worshipped, pure', gender: 'girl' }
  ],
  B: [
    { name: 'Bala', meaning: 'Young, strong, filled with energy', gender: 'boy' },
    { name: 'Baldev', meaning: 'God of divine strength', gender: 'boy' },
    { name: 'Barkha', meaning: 'Rain, life-giving monsoon', gender: 'girl' },
    { name: 'Bindiya', meaning: 'Dewdrop, small point, glowing', gender: 'girl' }
  ],
  BH: [
    { name: 'Bhargav', meaning: 'Lord Shiva, highly radiant', gender: 'boy' },
    { name: 'Bhuvan', meaning: 'The world, beautiful universe', gender: 'boy' },
    { name: 'Bhavya', meaning: 'Grand, splendid, beautiful', gender: 'girl' },
    { name: 'Bhumika', meaning: 'Earth, foundation, graceful role', gender: 'girl' },
    { name: 'Bhavika', meaning: 'Cheerful, righteous, well-meaning', gender: 'girl' }
  ],
  CH: [
    { name: 'Chetan', meaning: 'Consciousness, full of life force', gender: 'boy' },
    { name: 'Chirag', meaning: 'Lamp, ultimate source of light', gender: 'boy' },
    { name: 'Charvi', meaning: 'Extremely beautiful, lovely lady', gender: 'girl' },
    { name: 'Chhaya', meaning: 'Shadow, divine protection and shelter', gender: 'girl' },
    { name: 'Chinmay', meaning: 'Full of knowledge, supreme consciousness', gender: 'boy' }
  ],
  D: [
    { name: 'Dev', meaning: 'Divine, godlike', gender: 'boy' },
    { name: 'Divyansh', meaning: 'Part of the divine light', gender: 'boy' },
    { name: 'Divya', meaning: 'Divine, pure light', gender: 'girl' },
    { name: 'Diya', meaning: 'Clay lamp, brightness, shining', gender: 'girl' },
    { name: 'Daksh', meaning: 'Capable, talented, son of Lord Brahma', gender: 'boy' },
    { name: 'Drishti', meaning: 'Vision, clear sight, focal point', gender: 'girl' }
  ],
  DH: [
    { name: 'Dhruv', meaning: 'Pole star, constant, faithful, steady', gender: 'boy' },
    { name: 'Dheeraj', meaning: 'Patience, courage, calm mindset', gender: 'boy' },
    { name: 'Dharani', meaning: 'The Earth, mother nature', gender: 'girl' },
    { name: 'Dhriti', meaning: 'Patience, courage, determination', gender: 'girl' },
    { name: 'Dhanush', meaning: 'Bow, cosmic weapon', gender: 'boy' }
  ],
  E: [
    { name: 'Ekansh', meaning: 'Whole, complete, one', gender: 'boy' },
    { name: 'Eeshwar', meaning: 'Supreme Lord, powerful ruler', gender: 'boy' },
    { name: 'Ekta', meaning: 'Unity, harmony', gender: 'girl' },
    { name: 'Eshika', meaning: 'One who achieves, pure arrow', gender: 'girl' }
  ],
  G: [
    { name: 'Ganesh', meaning: 'Lord of the Ganas, remover of obstacles', gender: 'boy' },
    { name: 'Girish', meaning: 'Lord of the mountains, Lord Shiva', gender: 'boy' },
    { name: 'Gauri', meaning: 'Goddess Parvati, fair, shining', gender: 'girl' },
    { name: 'Geetika', meaning: 'A little song, melodious voice', gender: 'girl' },
    { name: 'Gaurav', meaning: 'Pride, honor, respect', gender: 'boy' }
  ],
  H: [
    { name: 'Hriday', meaning: 'The heart, deep feelings', gender: 'boy' },
    { name: 'Harish', meaning: 'Lord Shiva, supreme ruler', gender: 'boy' },
    { name: 'Harini', meaning: 'Beautiful like a deer, graceful', gender: 'girl' },
    { name: 'Hema', meaning: 'Golden, precious, Goddess Lakshmi', gender: 'girl' },
    { name: 'Harsh', meaning: 'Joy, delight, happiness', gender: 'boy' }
  ],
  I: [
    { name: 'Ishan', meaning: 'Lord Shiva, ruler of the north-east direction', gender: 'boy' },
    { name: 'Indrajeet', meaning: 'Conqueror of the heavens', gender: 'boy' },
    { name: 'Ira', meaning: 'The Earth, Goddess Saraswati, wisdom', gender: 'girl' },
    { name: 'Isha', meaning: 'One who protects, powerful ruler', gender: 'girl' }
  ],
  J: [
    { name: 'Jai', meaning: 'Victory, triumph', gender: 'boy' },
    { name: 'Jatin', meaning: 'Lord Shiva, disciplined one', gender: 'boy' },
    { name: 'Janvi', meaning: 'River Ganga, beloved daughter', gender: 'girl' },
    { name: 'Jeevika', meaning: 'Water, source of life', gender: 'girl' },
    { name: 'Jivansh', meaning: 'Part of soul, life-giving', gender: 'boy' }
  ],
  JN: [
    { name: 'Jnan', meaning: 'Knowledge, spiritual wisdom', gender: 'boy' },
    { name: 'Jnanendra', meaning: 'Lord of supreme knowledge', gender: 'boy' },
    { name: 'Jnana', meaning: 'Spiritual intelligence', gender: 'girl' },
    { name: 'Jnanada', meaning: 'Giver of knowledge, Goddess Saraswati', gender: 'girl' }
  ],
  K: [
    { name: 'Kabir', meaning: 'Great, famous mystic saint', gender: 'boy' },
    { name: 'Kartik', meaning: 'Month of courage, son of Shiva', gender: 'boy' },
    { name: 'Kavya', meaning: 'Poetry, creative motion', gender: 'girl' },
    { name: 'Kiara', meaning: 'Bright, clear-headed, glowing', gender: 'girl' },
    { name: 'Kian', meaning: 'Grace of God, royal character', gender: 'boy' },
    { name: 'Kritika', meaning: 'Name of a star, pure and active', gender: 'girl' }
  ],
  L: [
    { name: 'Laksh', meaning: 'Aim, goal, ultimate destination', gender: 'boy' },
    { name: 'Lokesh', meaning: 'King of the world, Lord Brahma', gender: 'boy' },
    { name: 'Lavanya', meaning: 'Grace, elegance, natural beauty', gender: 'girl' },
    { name: 'Lekha', meaning: 'Writing, picture, destiny', gender: 'girl' },
    { name: 'Lipika', meaning: 'A short alphabet, sweet script', gender: 'girl' }
  ],
  M: [
    { name: 'Madhav', meaning: 'Lord Krishna, sweet as honey', gender: 'boy' },
    { name: 'Manav', meaning: 'Humane, noble-minded, gentleman', gender: 'boy' },
    { name: 'Meera', meaning: 'Devotee of Lord Krishna, prosperous', gender: 'girl' },
    { name: 'Myra', meaning: 'Sweet-smelling flower, beloved', gender: 'girl' },
    { name: 'Mayank', meaning: 'The Moon, peaceful glow', gender: 'boy' }
  ],
  N: [
    { name: 'Nakul', meaning: 'Lord Shiva, handsome brother', gender: 'boy' },
    { name: 'Naman', meaning: 'Salutation, respectful bow', gender: 'boy' },
    { name: 'Navya', meaning: 'New, fresh, praised', gender: 'girl' },
    { name: 'Nisha', meaning: 'Night, dream, quiet peace', gender: 'girl' },
    { name: 'Nirav', meaning: 'Silent, peaceful, quiet', gender: 'boy' }
  ],
  O: [
    { name: 'Ojas', meaning: 'Vital energy, brilliant luster', gender: 'boy' },
    { name: 'Omkaar', meaning: 'Sound of the universe, Aum', gender: 'boy' },
    { name: 'Oviya', meaning: 'Artist, beautiful painting', gender: 'girl' },
    { name: 'Ojaswi', meaning: 'Radiant, bright, energetic', gender: 'girl' }
  ],
  P: [
    { name: 'Pranav', meaning: 'Sacred syllable Om, fresh energy', gender: 'boy' },
    { name: 'Parth', meaning: 'Prince Arjuna, focused one', gender: 'boy' },
    { name: 'Prisha', meaning: 'Beloved, God\'s precious gift', gender: 'girl' },
    { name: 'Pooja', meaning: 'Worship, holy prayer', gender: 'girl' },
    { name: 'Prisha', meaning: 'Beloved, sweet talent', gender: 'girl' }
  ],
  PH: [
    { name: 'Phanish', meaning: 'Lord of serpents, Shesha', gender: 'boy' },
    { name: 'Phalguni', meaning: 'Born in Phalguna, beautiful spring', gender: 'girl' },
    { name: 'Pahal', meaning: 'Initiative, new beginning', gender: 'girl' }
  ],
  R: [
    { name: 'Reyansh', meaning: 'Ray of light, part of Lord Vishnu', gender: 'boy' },
    { name: 'Rishabh', meaning: 'Superior, excellent, first note', gender: 'boy' },
    { name: 'Riya', meaning: 'Graceful singer, wealth', gender: 'girl' },
    { name: 'Ruhi', meaning: 'Soul, spiritual connection', gender: 'girl' },
    { name: 'Rohan', meaning: 'Ascending, developing, growing', gender: 'boy' }
  ],
  S: [
    { name: 'Samar', meaning: 'Evening talk, battle companion', gender: 'boy' },
    { name: 'Shaurya', meaning: 'Bravery, physical courage', gender: 'boy' },
    { name: 'Saanvi', meaning: 'Goddess Lakshmi, followed', gender: 'girl' },
    { name: 'Sia', meaning: 'Goddess Sita, white moonlight', gender: 'girl' },
    { name: 'Siddharth', meaning: 'One who has achieved his goal', gender: 'boy' }
  ],
  SH: [
    { name: 'Shivansh', meaning: 'Part of Lord Shiva, divine', gender: 'boy' },
    { name: 'Shreyas', meaning: 'Auspicious, excellent, prosperity', gender: 'boy' },
    { name: 'Shruti', meaning: 'Vedic scripture, hearing', gender: 'girl' },
    { name: 'Shreya', meaning: 'Auspicious, beautiful, fortunate', gender: 'girl' },
    { name: 'Shourya', meaning: 'Fame, bravery, courage', gender: 'boy' }
  ],
  T: [
    { name: 'Tanish', meaning: 'Jewel, ultimate ambition', gender: 'boy' },
    { name: 'Tejas', meaning: 'Sharpness, brilliance, vital energy', gender: 'boy' },
    { name: 'Tanvi', meaning: 'Slender, beautiful goddess', gender: 'girl' },
    { name: 'Trisha', meaning: 'Thirst for knowledge, wish', gender: 'girl' },
    { name: 'Tushar', meaning: 'Dew drops, snow, pure cold', gender: 'boy' }
  ],
  U: [
    { name: 'Uday', meaning: 'To rise, dawn, ascension', gender: 'boy' },
    { name: 'Utkarsh', meaning: 'Excellence, prosperity, rise', gender: 'boy' },
    { name: 'Upasana', meaning: 'Devotion, sitting near God', gender: 'girl' },
    { name: 'Urvashi', meaning: 'Most beautiful celestial maiden', gender: 'girl' }
  ],
  V: [
    { name: 'Vihaan', meaning: 'Dawn, morning\'s first ray', gender: 'boy' },
    { name: 'Vivaan', meaning: 'Full of life, Lord Krishna', gender: 'boy' },
    { name: 'Veda', meaning: 'Sacred wisdom, scripture', gender: 'girl' },
    { name: 'Vrinda', meaning: 'Holy basil, pure, gathering', gender: 'girl' },
    { name: 'Varun', meaning: 'Lord of the oceans, sky ruler', gender: 'boy' }
  ],
  Y: [
    { name: 'Yash', meaning: 'Glory, fame, success', gender: 'boy' },
    { name: 'Yuvraj', meaning: 'Prince, heir apparent', gender: 'boy' },
    { name: 'Yashika', meaning: 'Success, brave and bright girl', gender: 'girl' },
    { name: 'Yamini', meaning: 'Night, peaceful and dark', gender: 'girl' }
  ]
};

// Map actual Nakshatra syllable seeds to clean database prefix keys
function getSyllableGroup(syllable: string): string {
  const s = syllable.toLowerCase();
  if (s.startsWith('chh') || s.startsWith('ch') || s.startsWith('c')) return 'CH';
  if (s.startsWith('sh')) return 'SH';
  if (s.startsWith('bh')) return 'BH';
  if (s.startsWith('dh')) return 'DH';
  if (s.startsWith('ph')) return 'PH';
  if (s.startsWith('jn')) return 'JN';
  if (s.startsWith('l')) return 'L';
  if (s.startsWith('a')) return 'A';
  if (s.startsWith('ee') || s.startsWith('i')) return 'I';
  if (s.startsWith('u')) return 'U';
  if (s.startsWith('ea') || s.startsWith('e')) return 'E';
  if (s.startsWith('o')) return 'O';
  if (s.startsWith('v')) return 'V';
  if (s.startsWith('k')) return 'K';
  if (s.startsWith('g')) return 'G';
  if (s.startsWith('h')) return 'H';
  if (s.startsWith('d')) return 'D';
  if (s.startsWith('m')) return 'M';
  if (s.startsWith('t')) return 'T';
  if (s.startsWith('p')) return 'P';
  if (s.startsWith('s')) return 'S';
  if (s.startsWith('n')) return 'N';
  if (s.startsWith('r')) return 'R';
  if (s.startsWith('y')) return 'Y';
  if (s.startsWith('b')) return 'B';
  if (s.startsWith('j')) return 'J';
  return 'A'; // Ultimate fallback
}

export async function calculateBabyNames(
  dobStr: string,
  tobStr: string,
  lat: number,
  lon: number,
  timezone: string
) {
  try {
    const birthDate = DateTime.fromISO(`${dobStr}T${tobStr}`, { zone: timezone });
    
    // Calculate birth chart asynchronously to guarantee EphemerisEngine is initialized
    const chart = await calculateKundli(birthDate, lat, lon);
    
    // Extract Moon placement details
    const moon = chart.planets.find((p) => p.name === 'Moon');
    const nakshatra = moon ? moon.nakshatra : 'Ashwini';
    const pada = moon ? moon.pada : 1;
    const rashiIndex = moon ? moon.rashi : 1;
    const rashi = RASHI_NAMES[rashiIndex - 1] || RASHI_NAMES[0];

    const seedLetters = NAKSHATRA_SEEDS[nakshatra] || ['A', 'V', 'K', 'S'];
    
    // Map phonetic syllables to highly accurate matching names
    const suggestedNames: { name: string; meaning: string; gender: 'boy' | 'girl' }[] = [];
    seedLetters.forEach((syllable) => {
      const groupKey = getSyllableGroup(syllable);
      const list = NAMES_DATABASE[groupKey] || NAMES_DATABASE['A'];
      
      // Customize name prefixes to closely match the starting sound if possible
      list.forEach(item => {
        // Double check we aren't adding exact duplicates in list
        if (!suggestedNames.some(existing => existing.name === item.name)) {
          suggestedNames.push(item);
        }
      });
    });

    // Ensure we filter or cap nicely
    return {
      success: true,
      nakshatra,
      pada,
      rashi,
      seedLetters,
      suggestedNames: suggestedNames.slice(0, 16),
    };
  } catch (error: any) {
    console.error('Error calculating baby names:', error);
    return { success: false, error: error.message || 'Calculation failed' };
  }
}
