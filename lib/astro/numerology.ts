/**
 * Numerology Calculator
 * Implements Pythagorean numerology system for Life Path, Destiny, Soul Urge, 
 * Personality, and Lucky Numbers.
 */

const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

function reduceToSingle(num: number): number {
  // Master numbers 11, 22, 33 are preserved
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num).split('').reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
}

function sumDigits(str: string): number {
  return str.split('').reduce((sum, ch) => {
    const n = parseInt(ch);
    return isNaN(n) ? sum : sum + n;
  }, 0);
}

export interface NumerologyResult {
  lifePathNumber: number;
  lifePathMeaning: string;
  destinyNumber: number;
  destinyMeaning: string;
  soulUrgeNumber: number;
  soulUrgeMeaning: string;
  personalityNumber: number;
  personalityMeaning: string;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDay: string;
  birthdayNumber: number;
}

const LIFE_PATH_MEANINGS: Record<number, { en: string; hi: string }> = {
  1: { en: 'The Leader — Independent, ambitious, and pioneering. You forge your own path.', hi: 'नेता — स्वतंत्र, महत्वाकांक्षी और अग्रणी। आप अपना रास्ता खुद बनाते हैं।' },
  2: { en: 'The Diplomat — Sensitive, cooperative, and balanced. You bring harmony to all.', hi: 'राजनयिक — संवेदनशील, सहकारी और संतुलित। आप सभी में सामंजस्य लाते हैं।' },
  3: { en: 'The Communicator — Creative, expressive, and joyful. Your words inspire others.', hi: 'संचारक — रचनात्मक, अभिव्यक्त और आनंदमय। आपके शब्द दूसरों को प्रेरित करते हैं।' },
  4: { en: 'The Builder — Practical, disciplined, and trustworthy. You create lasting foundations.', hi: 'निर्माता — व्यावहारिक, अनुशासित और विश्वसनीय। आप स्थायी नींव बनाते हैं।' },
  5: { en: 'The Adventurer — Free-spirited, versatile, and dynamic. Change is your constant.', hi: 'साहसी — स्वतंत्र आत्मा, बहुमुखी और गतिशील। परिवर्तन आपका साथी है।' },
  6: { en: 'The Nurturer — Responsible, loving, and protective. Family is your sanctuary.', hi: 'पालनकर्ता — जिम्मेदार, प्रेमपूर्ण और सुरक्षात्मक। परिवार आपका आश्रय है।' },
  7: { en: 'The Seeker — Analytical, spiritual, and introspective. You seek deeper truth.', hi: 'साधक — विश्लेषणात्मक, आध्यात्मिक और आत्मनिरीक्षक। आप गहरे सत्य की खोज करते हैं।' },
  8: { en: 'The Powerhouse — Authoritative, ambitious, and karmic. Material success follows you.', hi: 'शक्तिशाली — आधिकारिक, महत्वाकांक्षी और कर्मिक। भौतिक सफलता आपका अनुसरण करती है।' },
  9: { en: 'The Humanitarian — Compassionate, wise, and selfless. You serve the greater good.', hi: 'मानवतावादी — दयालु, बुद्धिमान और निस्वार्थ। आप बड़े कल्याण की सेवा करते हैं।' },
  11: { en: 'Master Number — The Intuitive Visionary. Extraordinary spiritual insight and inspiration.', hi: 'मास्टर नंबर — अंतर्ज्ञानी दूरदर्शी। असाधारण आध्यात्मिक अंतर्दृष्टि और प्रेरणा।' },
  22: { en: 'Master Number — The Master Builder. Ability to turn the grandest dreams into reality.', hi: 'मास्टर नंबर — मास्टर बिल्डर। सबसे बड़े सपनों को वास्तविकता में बदलने की क्षमता।' },
  33: { en: 'Master Number — The Master Teacher. Supreme compassion and spiritual upliftment.', hi: 'मास्टर नंबर — मास्टर शिक्षक। सर्वोच्च करुणा और आध्यात्मिक उत्थान।' },
};

const DESTINY_MEANINGS: Record<number, { en: string; hi: string }> = {
  1: { en: 'Your destiny is to lead and innovate. You are meant to stand at the forefront.', hi: 'आपकी नियति नेतृत्व और नवाचार है। आप अग्रणी बनने के लिए बने हैं।' },
  2: { en: 'Your destiny involves partnerships and diplomacy. Cooperation is your power.', hi: 'आपकी नियति साझेदारी और कूटनीति से जुड़ी है। सहयोग आपकी शक्ति है।' },
  3: { en: 'Your destiny is creative self-expression. Art, communication, and joy are your gifts.', hi: 'आपकी नियति रचनात्मक आत्म-अभिव्यक्ति है। कला और संचार आपकी देन है।' },
  4: { en: 'Your destiny is to build stable structures. Discipline and hard work define you.', hi: 'आपकी नियति स्थिर संरचनाएं बनाना है। अनुशासन और मेहनत आपको परिभाषित करती है।' },
  5: { en: 'Your destiny involves freedom and exploration. Adventure shapes your journey.', hi: 'आपकी नियति स्वतंत्रता और अन्वेषण से जुड़ी है। साहस आपकी यात्रा को आकार देता है।' },
  6: { en: 'Your destiny is service and nurturing. Home, family, and responsibility are central.', hi: 'आपकी नियति सेवा और पालन-पोषण है। घर और परिवार केंद्रीय हैं।' },
  7: { en: 'Your destiny is wisdom and spiritual growth. Introspection reveals your power.', hi: 'आपकी नियति ज्ञान और आध्यात्मिक विकास है। आत्मनिरीक्षण आपकी शक्ति प्रकट करता है।' },
  8: { en: 'Your destiny involves power and material achievement. Wealth follows effort.', hi: 'आपकी नियति शक्ति और भौतिक उपलब्धि से जुड़ी है। धन प्रयास का अनुसरण करता है।' },
  9: { en: 'Your destiny is humanitarian service. Compassion for all defines your path.', hi: 'आपकी नियति मानवतावादी सेवा है। सभी के लिए करुणा आपका मार्ग है।' },
  11: { en: 'Your destiny is spiritual illumination. You are a channel for higher wisdom.', hi: 'आपकी नियति आध्यात्मिक प्रकाश है। आप उच्च ज्ञान के माध्यम हैं।' },
  22: { en: 'Your destiny is monumental creation. You can build systems that last generations.', hi: 'आपकी नियति स्मारकीय सृजन है। आप पीढ़ियों तक चलने वाली व्यवस्था बना सकते हैं।' },
  33: { en: 'Your destiny is selfless healing. The world benefits from your compassion.', hi: 'आपकी नियति निस्वार्थ उपचार है। दुनिया आपकी करुणा से लाभान्वित होती है।' },
};

const LUCKY_COLORS: Record<number, string[]> = {
  1: ['Red', 'Gold'], 2: ['White', 'Cream'], 3: ['Yellow', 'Violet'],
  4: ['Blue', 'Grey'], 5: ['Light Grey', 'White'], 6: ['Pink', 'Blue'],
  7: ['Green', 'Light Yellow'], 8: ['Dark Blue', 'Black'], 9: ['Red', 'Crimson'],
  11: ['Silver', 'White'], 22: ['Coral', 'Gold'], 33: ['Turquoise', 'Indigo'],
};

const LUCKY_DAYS: Record<number, string> = {
  1: 'Sunday', 2: 'Monday', 3: 'Thursday', 4: 'Saturday',
  5: 'Wednesday', 6: 'Friday', 7: 'Monday', 8: 'Saturday',
  9: 'Tuesday', 11: 'Monday', 22: 'Saturday', 33: 'Thursday',
};

export function calculateNumerology(fullName: string, dob: string): NumerologyResult {
  const name = fullName.toLowerCase().replace(/[^a-z]/g, '');

  // --- Life Path Number (from DOB) ---
  // dob format: YYYY-MM-DD
  const parts = dob.split('-');
  const daySum = reduceToSingle(sumDigits(parts[2]));
  const monthSum = reduceToSingle(sumDigits(parts[1]));
  const yearSum = reduceToSingle(sumDigits(parts[0]));
  const lifePathNumber = reduceToSingle(daySum + monthSum + yearSum);

  // --- Destiny Number (from full name) ---
  const nameSum = name.split('').reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch] || 0), 0);
  const destinyNumber = reduceToSingle(nameSum);

  // --- Soul Urge (vowels only) ---
  const vowelSum = name.split('').reduce((sum, ch) => {
    if (VOWELS.has(ch)) return sum + (PYTHAGOREAN_MAP[ch] || 0);
    return sum;
  }, 0);
  const soulUrgeNumber = reduceToSingle(vowelSum);

  // --- Personality Number (consonants only) ---
  const consonantSum = name.split('').reduce((sum, ch) => {
    if (!VOWELS.has(ch)) return sum + (PYTHAGOREAN_MAP[ch] || 0);
    return sum;
  }, 0);
  const personalityNumber = reduceToSingle(consonantSum);

  // --- Birthday Number ---
  const birthdayNumber = reduceToSingle(parseInt(parts[2]));

  // --- Lucky Numbers ---
  const luckyNumbers = [lifePathNumber, destinyNumber, birthdayNumber];

  // Meanings
  const lpm = LIFE_PATH_MEANINGS[lifePathNumber] || LIFE_PATH_MEANINGS[reduceToSingle(lifePathNumber)];
  const dm = DESTINY_MEANINGS[destinyNumber] || DESTINY_MEANINGS[reduceToSingle(destinyNumber)];
  const sum_meaning = LIFE_PATH_MEANINGS[soulUrgeNumber] || LIFE_PATH_MEANINGS[reduceToSingle(soulUrgeNumber)];
  const pm = DESTINY_MEANINGS[personalityNumber] || DESTINY_MEANINGS[reduceToSingle(personalityNumber)];

  return {
    lifePathNumber,
    lifePathMeaning: lpm?.en || '',
    destinyNumber,
    destinyMeaning: dm?.en || '',
    soulUrgeNumber,
    soulUrgeMeaning: sum_meaning?.en || '',
    personalityNumber,
    personalityMeaning: pm?.en || '',
    luckyNumbers,
    luckyColors: LUCKY_COLORS[lifePathNumber] || ['Gold'],
    luckyDay: LUCKY_DAYS[lifePathNumber] || 'Sunday',
    birthdayNumber,
  };
}

// Export meanings for bilingual support
export { LIFE_PATH_MEANINGS, DESTINY_MEANINGS };
