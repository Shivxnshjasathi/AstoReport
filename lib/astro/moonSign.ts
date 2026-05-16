/**
 * Moon Sign Calculator using astronomy-engine
 * Calculates Moon's sidereal position to determine Rashi and Nakshatra
 */
import * as Astronomy from 'astronomy-engine';

const RASHI_DATA = [
  { en: 'Aries', hi: 'मेष', symbol: '♈', element: 'Fire', ruler: 'Mars', rulerHi: 'मंगल' },
  { en: 'Taurus', hi: 'वृषभ', symbol: '♉', element: 'Earth', ruler: 'Venus', rulerHi: 'शुक्र' },
  { en: 'Gemini', hi: 'मिथुन', symbol: '♊', element: 'Air', ruler: 'Mercury', rulerHi: 'बुध' },
  { en: 'Cancer', hi: 'कर्क', symbol: '♋', element: 'Water', ruler: 'Moon', rulerHi: 'चंद्रमा' },
  { en: 'Leo', hi: 'सिंह', symbol: '♌', element: 'Fire', ruler: 'Sun', rulerHi: 'सूर्य' },
  { en: 'Virgo', hi: 'कन्या', symbol: '♍', element: 'Earth', ruler: 'Mercury', rulerHi: 'बुध' },
  { en: 'Libra', hi: 'तुला', symbol: '♎', element: 'Air', ruler: 'Venus', rulerHi: 'शुक्र' },
  { en: 'Scorpio', hi: 'वृश्चिक', symbol: '♏', element: 'Water', ruler: 'Mars', rulerHi: 'मंगल' },
  { en: 'Sagittarius', hi: 'धनु', symbol: '♐', element: 'Fire', ruler: 'Jupiter', rulerHi: 'बृहस्पति' },
  { en: 'Capricorn', hi: 'मकर', symbol: '♑', element: 'Earth', ruler: 'Saturn', rulerHi: 'शनि' },
  { en: 'Aquarius', hi: 'कुंभ', symbol: '♒', element: 'Air', ruler: 'Saturn', rulerHi: 'शनि' },
  { en: 'Pisces', hi: 'मीन', symbol: '♓', element: 'Water', ruler: 'Jupiter', rulerHi: 'बृहस्पति' },
];

const NAKSHATRA_DATA = [
  { en: 'Ashwini', hi: 'अश्विनी', deity: 'Ashwini Kumaras', pada: 1 },
  { en: 'Bharani', hi: 'भरणी', deity: 'Yama', pada: 1 },
  { en: 'Krittika', hi: 'कृत्तिका', deity: 'Agni', pada: 1 },
  { en: 'Rohini', hi: 'रोहिणी', deity: 'Brahma', pada: 1 },
  { en: 'Mrigashira', hi: 'मृगशिरा', deity: 'Soma', pada: 1 },
  { en: 'Ardra', hi: 'आर्द्रा', deity: 'Rudra', pada: 1 },
  { en: 'Punarvasu', hi: 'पुनर्वसु', deity: 'Aditi', pada: 1 },
  { en: 'Pushya', hi: 'पुष्य', deity: 'Brihaspati', pada: 1 },
  { en: 'Ashlesha', hi: 'आश्लेषा', deity: 'Nagas', pada: 1 },
  { en: 'Magha', hi: 'मघा', deity: 'Pitris', pada: 1 },
  { en: 'Purva Phalguni', hi: 'पूर्व फाल्गुनी', deity: 'Bhaga', pada: 1 },
  { en: 'Uttara Phalguni', hi: 'उत्तर फाल्गुनी', deity: 'Aryaman', pada: 1 },
  { en: 'Hasta', hi: 'हस्त', deity: 'Savitar', pada: 1 },
  { en: 'Chitra', hi: 'चित्रा', deity: 'Vishwakarma', pada: 1 },
  { en: 'Swati', hi: 'स्वाति', deity: 'Vayu', pada: 1 },
  { en: 'Vishakha', hi: 'विशाखा', deity: 'Indra-Agni', pada: 1 },
  { en: 'Anuradha', hi: 'अनुराधा', deity: 'Mitra', pada: 1 },
  { en: 'Jyeshtha', hi: 'ज्येष्ठा', deity: 'Indra', pada: 1 },
  { en: 'Mula', hi: 'मूल', deity: 'Nirriti', pada: 1 },
  { en: 'Purva Ashadha', hi: 'पूर्व आषाढ़ा', deity: 'Apas', pada: 1 },
  { en: 'Uttara Ashadha', hi: 'उत्तर आषाढ़ा', deity: 'Vishvedevas', pada: 1 },
  { en: 'Shravana', hi: 'श्रवण', deity: 'Vishnu', pada: 1 },
  { en: 'Dhanishta', hi: 'धनिष्ठा', deity: 'Vasus', pada: 1 },
  { en: 'Shatabhisha', hi: 'शतभिषा', deity: 'Varuna', pada: 1 },
  { en: 'Purva Bhadrapada', hi: 'पूर्व भाद्रपद', deity: 'Aja Ekapada', pada: 1 },
  { en: 'Uttara Bhadrapada', hi: 'उत्तर भाद्रपद', deity: 'Ahir Budhnya', pada: 1 },
  { en: 'Revati', hi: 'रेवती', deity: 'Pushan', pada: 1 },
];

const RASHI_TRAITS: Record<string, { en: string; hi: string }> = {
  Aries: { en: 'Courageous, energetic, and confident. You are a natural-born leader with a fiery spirit. You act first and think later, driven by passion and a desire to conquer.', hi: 'साहसी, ऊर्जावान और आत्मविश्वासी। आप जन्मजात नेता हैं। आप जुनून से प्रेरित होकर पहले कार्य करते हैं।' },
  Taurus: { en: 'Patient, reliable, and devoted. You value stability and beauty. With Venus as your ruler, you have a deep appreciation for comfort and luxury.', hi: 'धैर्यवान, विश्वसनीय और समर्पित। आप स्थिरता और सुंदरता को महत्व देते हैं। शुक्र आपके शासक के रूप में, आप आराम और विलासिता की गहरी सराहना करते हैं।' },
  Gemini: { en: 'Versatile, curious, and communicative. You thrive on intellectual stimulation and social interaction. Your dual nature makes you adaptable.', hi: 'बहुमुखी, जिज्ञासु और संवादशील। आप बौद्धिक उत्तेजना और सामाजिक संपर्क पर पनपते हैं।' },
  Cancer: { en: 'Intuitive, emotional, and nurturing. The Moon rules your sign, making you deeply connected to family and home. Your empathy is your greatest gift.', hi: 'अंतर्ज्ञानी, भावनात्मक और पालन-पोषक। चंद्रमा आपकी राशि का शासक है, जो आपको परिवार से गहराई से जोड़ता है।' },
  Leo: { en: 'Dramatic, confident, and generous. Ruled by the Sun, you naturally attract attention and respect. Your warmth lights up any room.', hi: 'नाटकीय, आत्मविश्वासी और उदार। सूर्य द्वारा शासित, आप स्वाभाविक रूप से ध्यान और सम्मान आकर्षित करते हैं।' },
  Virgo: { en: 'Analytical, practical, and diligent. Mercury blesses you with sharp intellect and attention to detail. Perfection is your pursuit.', hi: 'विश्लेषणात्मक, व्यावहारिक और परिश्रमी। बुध आपको तीक्ष्ण बुद्धि और विस्तार पर ध्यान प्रदान करता है।' },
  Libra: { en: 'Diplomatic, fair-minded, and social. You seek balance and harmony in all things. Venus gives you a refined aesthetic sense.', hi: 'कूटनीतिक, निष्पक्ष और सामाजिक। आप सभी चीजों में संतुलन और सामंजस्य चाहते हैं।' },
  Scorpio: { en: 'Passionate, strategic, and transformative. You possess incredible depth and intensity. Your determination is unmatched.', hi: 'भावुक, रणनीतिक और परिवर्तनकारी। आपमें अविश्वसनीय गहराई और तीव्रता है।' },
  Sagittarius: { en: 'Optimistic, adventurous, and philosophical. Jupiter expands your horizons and makes you a seeker of truth and wisdom.', hi: 'आशावादी, साहसी और दार्शनिक। बृहस्पति आपके क्षितिज का विस्तार करता है और आपको सत्य का साधक बनाता है।' },
  Capricorn: { en: 'Disciplined, ambitious, and responsible. Saturn teaches you patience and rewards your persistence. You climb steadily to the top.', hi: 'अनुशासित, महत्वाकांक्षी और जिम्मेदार। शनि आपको धैर्य सिखाता है और आपकी दृढ़ता को पुरस्कृत करता है।' },
  Aquarius: { en: 'Progressive, humanitarian, and original. You think ahead of your time. Your innovative ideas can reshape the world.', hi: 'प्रगतिशील, मानवतावादी और मौलिक। आप अपने समय से आगे सोचते हैं।' },
  Pisces: { en: 'Intuitive, compassionate, and artistic. Jupiter gives you deep spiritual wisdom. You feel the emotions of others as your own.', hi: 'अंतर्ज्ञानी, दयालु और कलात्मक। बृहस्पति आपको गहरा आध्यात्मिक ज्ञान देता है।' },
};

export interface MoonSignResult {
  rashi: typeof RASHI_DATA[0];
  nakshatra: typeof NAKSHATRA_DATA[0];
  nakshatraPada: number;
  moonDegree: number;
  traits: { en: string; hi: string };
  sunSign: typeof RASHI_DATA[0];
}

function getJulianDay(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate() + (date.getUTCHours() + date.getUTCMinutes() / 60) / 24;
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}

function getLahiriAyanamsa(date: Date): number {
  const jd = getJulianDay(date);
  return 23.85 + 0.0137 * (jd - 2451545.0) / 365.25;
}

export function calculateMoonSign(dob: string, tob: string): MoonSignResult {
  // dob: YYYY-MM-DD, tob: HH:MM
  const dateStr = `${dob}T${tob}:00`;
  const date = new Date(dateStr);
  
  const ayanamsa = getLahiriAyanamsa(date);

  // Moon tropical longitude
  const moonEq = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Moon, date, true));
  const moonTropLong = moonEq.elon;
  let moonSidLong = moonTropLong - ayanamsa;
  if (moonSidLong < 0) moonSidLong += 360;
  if (moonSidLong >= 360) moonSidLong -= 360;

  // Sun
  const sunEq = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Sun, date, true));
  const sunTropLong = sunEq.elon;
  let sunSidLong = sunTropLong - ayanamsa;
  if (sunSidLong < 0) sunSidLong += 360;
  if (sunSidLong >= 360) sunSidLong -= 360;

  const rashiIndex = Math.floor(moonSidLong / 30) % 12;
  const nakshatraIndex = Math.floor(moonSidLong / (360 / 27)) % 27;
  const nakshatraPada = Math.floor((moonSidLong % (360 / 27)) / (360 / 108)) + 1;

  const sunRashiIndex = Math.floor(sunSidLong / 30) % 12;

  return {
    rashi: RASHI_DATA[rashiIndex],
    nakshatra: NAKSHATRA_DATA[nakshatraIndex],
    nakshatraPada,
    moonDegree: moonSidLong,
    traits: RASHI_TRAITS[RASHI_DATA[rashiIndex].en],
    sunSign: RASHI_DATA[sunRashiIndex],
  };
}

// Ashtakoot (8-point) Gun Milan for Kundli Matching
const GUNA_CATEGORIES = [
  { name: 'Varna', nameHi: 'वर्ण', max: 1, desc: 'Spiritual compatibility' },
  { name: 'Vashya', nameHi: 'वश्य', max: 2, desc: 'Mutual attraction & control' },
  { name: 'Tara', nameHi: 'तारा', max: 3, desc: 'Birth star compatibility' },
  { name: 'Yoni', nameHi: 'योनि', max: 4, desc: 'Physical & sexual compatibility' },
  { name: 'Graha Maitri', nameHi: 'ग्रह मैत्री', max: 5, desc: 'Mental compatibility' },
  { name: 'Gana', nameHi: 'गण', max: 6, desc: 'Temperament compatibility' },
  { name: 'Bhakoot', nameHi: 'भकूट', max: 7, desc: 'Love & family prosperity' },
  { name: 'Nadi', nameHi: 'नाड़ी', max: 8, desc: 'Health & genetic compatibility' },
];

// Varna mapping (rashi index -> varna: 0=Brahmin, 1=Kshatriya, 2=Vaishya, 3=Shudra)
const VARNA_MAP = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0]; // Aries=Kshatriya, etc.

// Yoni mapping (nakshatra index -> yoni animal index)
const YONI_MAP = [0, 1, 2, 3, 3, 4, 5, 6, 5, 7, 8, 9, 10, 11, 10, 11, 7, 8, 4, 12, 12, 13, 0, 0, 13, 9, 1];

// Gana mapping (nakshatra index -> gana: 0=Deva, 1=Manushya, 2=Rakshasa)
const GANA_MAP = [0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0];

// Nadi mapping (nakshatra index -> nadi: 0=Aadi, 1=Madhya, 2=Antya)
const NADI_MAP = [0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2];

export interface MatchResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  verdict: { en: string; hi: string };
  categories: Array<{
    name: string;
    nameHi: string;
    score: number;
    max: number;
    desc: string;
  }>;
  brideRashi: typeof RASHI_DATA[0];
  groomRashi: typeof RASHI_DATA[0];
  brideNakshatra: typeof NAKSHATRA_DATA[0];
  groomNakshatra: typeof NAKSHATRA_DATA[0];
}

export function calculateKundliMatch(
  brideDob: string, brideTob: string,
  groomDob: string, groomTob: string
): MatchResult {
  const bride = calculateMoonSign(brideDob, brideTob);
  const groom = calculateMoonSign(groomDob, groomTob);

  const brideRashiIdx = RASHI_DATA.indexOf(bride.rashi);
  const groomRashiIdx = RASHI_DATA.indexOf(groom.rashi);
  const brideNakIdx = NAKSHATRA_DATA.indexOf(bride.nakshatra);
  const groomNakIdx = NAKSHATRA_DATA.indexOf(groom.nakshatra);

  const scores: number[] = [];

  // 1. Varna (max 1)
  const brideVarna = VARNA_MAP[brideRashiIdx];
  const groomVarna = VARNA_MAP[groomRashiIdx];
  scores.push(groomVarna >= brideVarna ? 1 : 0);

  // 2. Vashya (max 2)
  // Simplified: same element = 2, adjacent = 1, else 0
  const brideElem = bride.rashi.element;
  const groomElem = groom.rashi.element;
  scores.push(brideElem === groomElem ? 2 : (Math.abs(brideRashiIdx - groomRashiIdx) <= 2 ? 1 : 0));

  // 3. Tara (max 3)
  let taraDiff = (groomNakIdx - brideNakIdx + 27) % 27;
  const taraRem = (taraDiff % 9) + 1;
  scores.push([1, 3, 5, 7].includes(taraRem) ? 3 : (taraRem % 2 === 0 ? 1.5 : 0));

  // 4. Yoni (max 4)
  const brideYoni = YONI_MAP[brideNakIdx];
  const groomYoni = YONI_MAP[groomNakIdx];
  scores.push(brideYoni === groomYoni ? 4 : (Math.abs(brideYoni - groomYoni) <= 2 ? 2 : 1));

  // 5. Graha Maitri (max 5)
  const brideRuler = bride.rashi.ruler;
  const groomRuler = groom.rashi.ruler;
  scores.push(brideRuler === groomRuler ? 5 : 3);

  // 6. Gana (max 6)
  const brideGana = GANA_MAP[brideNakIdx];
  const groomGana = GANA_MAP[groomNakIdx];
  scores.push(brideGana === groomGana ? 6 : (Math.abs(brideGana - groomGana) === 1 ? 3 : 0));

  // 7. Bhakoot (max 7)
  const rashiDiff = Math.abs(brideRashiIdx - groomRashiIdx);
  const badBhakoot = [5, 7, 1, 11]; // 6-8, 2-12 pattern (0-indexed diffs)
  scores.push(badBhakoot.includes(rashiDiff) ? 0 : 7);

  // 8. Nadi (max 8)
  const brideNadi = NADI_MAP[brideNakIdx];
  const groomNadi = NADI_MAP[groomNakIdx];
  scores.push(brideNadi !== groomNadi ? 8 : 0);

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = 36;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let verdict: { en: string; hi: string };
  if (totalScore >= 28) {
    verdict = { en: 'Excellent Match! Highly auspicious for marriage.', hi: 'उत्कृष्ट मिलान! विवाह के लिए अत्यंत शुभ।' };
  } else if (totalScore >= 21) {
    verdict = { en: 'Good Match. Compatible for a happy married life.', hi: 'अच्छा मिलान। सुखी वैवाहिक जीवन के लिए अनुकूल।' };
  } else if (totalScore >= 18) {
    verdict = { en: 'Average Match. Marriage possible with some remedies.', hi: 'औसत मिलान। कुछ उपायों के साथ विवाह संभव।' };
  } else {
    verdict = { en: 'Below Average. Remedies strongly recommended before proceeding.', hi: 'औसत से नीचे। आगे बढ़ने से पहले उपायों की दृढ़ता से सिफारिश की जाती है।' };
  }

  const categories = GUNA_CATEGORIES.map((cat, i) => ({
    name: cat.name,
    nameHi: cat.nameHi,
    score: scores[i],
    max: cat.max,
    desc: cat.desc,
  }));

  return {
    totalScore,
    maxScore,
    percentage,
    verdict,
    categories,
    brideRashi: bride.rashi,
    groomRashi: groom.rashi,
    brideNakshatra: bride.nakshatra,
    groomNakshatra: groom.nakshatra,
  };
}

export { RASHI_DATA, NAKSHATRA_DATA, RASHI_TRAITS };
