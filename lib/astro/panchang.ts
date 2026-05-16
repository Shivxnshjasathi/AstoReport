/**
 * Panchang Calculator using astronomy-engine
 * Calculates Tithi, Nakshatra, Yoga, Karana, Vara, Rahu Kaal, and Sunrise/Sunset
 */
import * as Astronomy from 'astronomy-engine';

// Lahiri Ayanamsa calculation (Chitrapaksha)
function getJulianDay(date: Date): number {
  // Convert date to Julian Day Number
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
  // Lahiri ayanamsa formula (precession of equinoxes)
  const T = (jd - 2451545.0) / 36525.0;
  // Approximate Lahiri ayanamsa
  return 23.85 + 0.0137 * (jd - 2451545.0) / 365.25;
}

function getSiderealLongitude(tropicalLong: number, ayanamsa: number): number {
  let sid = tropicalLong - ayanamsa;
  if (sid < 0) sid += 360;
  if (sid >= 360) sid -= 360;
  return sid;
}

const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
];

const TITHI_NAMES_HI = [
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
  'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
  'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा',
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
  'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
  'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'अमावस्या'
];

const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

const NAKSHATRA_NAMES_HI = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा',
  'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा',
  'पूर्व फाल्गुनी', 'उत्तर फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति',
  'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्व आषाढ़ा',
  'उत्तर आषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्व भाद्रपद',
  'उत्तर भाद्रपद', 'रेवती'
];

const YOGA_NAMES = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarma', 'Dhriti', 'Shoola', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti'
];

const KARANA_NAMES = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja',
  'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'
];

const VARA_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const VARA_NAMES_HI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];

const RAHU_KAAL_MAP: Record<number, [number, number]> = {
  0: [16.5, 18],   // Sunday: 4:30 PM - 6:00 PM
  1: [7.5, 9],     // Monday: 7:30 AM - 9:00 AM
  2: [15, 16.5],   // Tuesday: 3:00 PM - 4:30 PM
  3: [12, 13.5],   // Wednesday: 12:00 PM - 1:30 PM
  4: [13.5, 15],   // Thursday: 1:30 PM - 3:00 PM
  5: [10.5, 12],   // Friday: 10:30 AM - 12:00 PM
  6: [9, 10.5],    // Saturday: 9:00 AM - 10:30 AM
};

function formatHour(h: number): string {
  const hours = Math.floor(h);
  const minutes = Math.round((h - hours) * 60);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

export interface PanchangData {
  date: string;
  vara: string;
  varaHi: string;
  tithi: string;
  tithiHi: string;
  tithiPaksha: string;
  nakshatra: string;
  nakshatraHi: string;
  yoga: string;
  karana: string;
  rahuKaal: string;
  sunrise: string;
  sunset: string;
  moonSign: string;
  moonSignHi: string;
  sunSign: string;
}

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const RASHI_NAMES_HI = [
  'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या',
  'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'
];

export function calculatePanchang(date: Date, lat: number = 28.6139, lon: number = 77.209): PanchangData {
  const ayanamsa = getLahiriAyanamsa(date);
  const observer = new Astronomy.Observer(lat, lon, 0);

  // Sunrise/Sunset
  let sunriseStr = '6:00 AM';
  let sunsetStr = '6:00 PM';
  try {
    const sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, date, 1);
    const sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, date, 1);
    if (sunrise) {
      const sr = new Date(sunrise.date);
      sunriseStr = sr.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
    }
    if (sunset) {
      const ss = new Date(sunset.date);
      sunsetStr = ss.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
    }
  } catch (e) {
    // fallback already set
  }

  // Sun and Moon positions
  const sunEq = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Sun, date, true));
  const moonEq = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Moon, date, true));

  const sunTropLong = sunEq.elon;
  const moonTropLong = moonEq.elon;

  const sunSidLong = getSiderealLongitude(sunTropLong, ayanamsa);
  const moonSidLong = getSiderealLongitude(moonTropLong, ayanamsa);

  // Tithi: based on angular distance between Moon and Sun
  let diff = moonSidLong - sunSidLong;
  if (diff < 0) diff += 360;
  const tithiIndex = Math.floor(diff / 12);
  const tithi = TITHI_NAMES[tithiIndex % 30];
  const tithiHi = TITHI_NAMES_HI[tithiIndex % 30];
  const tithiPaksha = tithiIndex < 15 ? 'Shukla Paksha' : 'Krishna Paksha';

  // Nakshatra: based on Moon's sidereal longitude
  const nakshatraIndex = Math.floor(moonSidLong / (360 / 27));
  const nakshatra = NAKSHATRA_NAMES[nakshatraIndex % 27];
  const nakshatraHi = NAKSHATRA_NAMES_HI[nakshatraIndex % 27];

  // Yoga: Sum of Sun and Moon sidereal longitudes / (360/27)
  let yogaSum = sunSidLong + moonSidLong;
  if (yogaSum >= 360) yogaSum -= 360;
  const yogaIndex = Math.floor(yogaSum / (360 / 27));
  const yoga = YOGA_NAMES[yogaIndex % 27];

  // Karana: Half of a Tithi (2 karanas per tithi)
  const karanaIndex = Math.floor(diff / 6);
  const karana = KARANA_NAMES[karanaIndex % 11];

  // Vara (Day of week)
  const dayOfWeek = date.getDay();
  const vara = VARA_NAMES[dayOfWeek];
  const varaHi = VARA_NAMES_HI[dayOfWeek];

  // Rahu Kaal
  const rahuKaalTimes = RAHU_KAAL_MAP[dayOfWeek];
  const rahuKaal = `${formatHour(rahuKaalTimes[0])} – ${formatHour(rahuKaalTimes[1])}`;

  // Moon Sign
  const moonSignIndex = Math.floor(moonSidLong / 30);
  const moonSign = RASHI_NAMES[moonSignIndex % 12];
  const moonSignHi = RASHI_NAMES_HI[moonSignIndex % 12];

  // Sun Sign
  const sunSignIndex = Math.floor(sunSidLong / 30);
  const sunSign = RASHI_NAMES[sunSignIndex % 12];

  return {
    date: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    vara,
    varaHi,
    tithi,
    tithiHi,
    tithiPaksha,
    nakshatra,
    nakshatraHi,
    yoga,
    karana,
    rahuKaal,
    sunrise: sunriseStr,
    sunset: sunsetStr,
    moonSign,
    moonSignHi,
    sunSign,
  };
}
