import * as Astronomy from 'astronomy-engine';

const RASHI = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const RASHI_HI = ['मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुंभ','मीन'];
const RASHI_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

function getJulianDay(date: Date): number {
  const y = date.getUTCFullYear(); const m = date.getUTCMonth()+1;
  const d = date.getUTCDate()+(date.getUTCHours()+date.getUTCMinutes()/60)/24;
  const a = Math.floor((14-m)/12); const yy = y+4800-a; const mm = m+12*a-3;
  return d+Math.floor((153*mm+2)/5)+365*yy+Math.floor(yy/4)-Math.floor(yy/100)+Math.floor(yy/400)-32045;
}

function getAyanamsa(date: Date): number {
  const jd = getJulianDay(date);
  return 23.85 + 0.0137 * (jd - 2451545.0) / 365.25;
}

function getSiderealLong(tropLong: number, ayanamsa: number): number {
  let s = tropLong - ayanamsa;
  if (s < 0) s += 360; if (s >= 360) s -= 360; return s;
}

export interface PlanetTransit {
  name: string; nameHi: string; symbol: string; color: string;
  longitude: number; rashi: string; rashiHi: string; rashiSymbol: string;
  degree: string; isRetrograde: boolean;
  effect: { en: string; hi: string };
}

const PLANET_META: Record<string, {hi:string;symbol:string;color:string;body:Astronomy.Body}> = {
  Sun:{hi:'सूर्य',symbol:'☉',color:'#FF6B35',body:Astronomy.Body.Sun},
  Moon:{hi:'चंद्रमा',symbol:'☽',color:'#C0C0C0',body:Astronomy.Body.Moon},
  Mars:{hi:'मंगल',symbol:'♂',color:'#DC143C',body:Astronomy.Body.Mars},
  Mercury:{hi:'बुध',symbol:'☿',color:'#2ECC71',body:Astronomy.Body.Mercury},
  Jupiter:{hi:'बृहस्पति',symbol:'♃',color:'#F39C12',body:Astronomy.Body.Jupiter},
  Venus:{hi:'शुक्र',symbol:'♀',color:'#E91E63',body:Astronomy.Body.Venus},
  Saturn:{hi:'शनि',symbol:'♄',color:'#607D8B',body:Astronomy.Body.Saturn},
};

const TRANSIT_EFFECTS: Record<string, Record<string, {en:string;hi:string}>> = {
  Sun: {Aries:{en:'Strong willpower, leadership energy.',hi:'मजबूत इच्छाशक्ति, नेतृत्व ऊर्जा।'},Taurus:{en:'Focus on finances and material comfort.',hi:'वित्त और भौतिक आराम पर ध्यान।'},Gemini:{en:'Communication skills peak, social energy.',hi:'संचार कौशल चरम, सामाजिक ऊर्जा।'},Cancer:{en:'Emotional depth, home and family focus.',hi:'भावनात्मक गहराई, घर और परिवार पर ध्यान।'},Leo:{en:'Maximum confidence and creative expression.',hi:'अधिकतम आत्मविश्वास और रचनात्मक अभिव्यक्ति।'},Virgo:{en:'Analytical mind, health consciousness.',hi:'विश्लेषणात्मक मन, स्वास्थ्य चेतना।'},Libra:{en:'Balance in relationships, diplomacy.',hi:'रिश्तों में संतुलन, कूटनीति।'},Scorpio:{en:'Transformation, deep introspection.',hi:'परिवर्तन, गहरा आत्मनिरीक्षण।'},Sagittarius:{en:'Expansion, travel, philosophical growth.',hi:'विस्तार, यात्रा, दार्शनिक विकास।'},Capricorn:{en:'Discipline, career ambition peaks.',hi:'अनुशासन, करियर महत्वाकांक्षा चरम।'},Aquarius:{en:'Innovation, humanitarian pursuits.',hi:'नवाचार, मानवतावादी कार्य।'},Pisces:{en:'Spiritual insight, artistic inspiration.',hi:'आध्यात्मिक अंतर्दृष्टि, कलात्मक प्रेरणा।'}},
  Moon: {Aries:{en:'Impulsive emotions, quick reactions.',hi:'आवेगपूर्ण भावनाएं, तीव्र प्रतिक्रिया।'},Taurus:{en:'Calm, stable emotions, comfort-seeking.',hi:'शांत, स्थिर भावनाएं।'},Gemini:{en:'Chatty mood, curiosity heightened.',hi:'बातचीत का मूड, जिज्ञासा बढ़ी।'},Cancer:{en:'Deeply emotional, nurturing energy.',hi:'गहरी भावनाएं, पोषण ऊर्जा।'},Leo:{en:'Dramatic, generous, warm-hearted.',hi:'नाटकीय, उदार, गर्मजोशी।'},Virgo:{en:'Analytical mood, desire for order.',hi:'विश्लेषणात्मक मूड, व्यवस्था की इच्छा।'},Libra:{en:'Harmony-seeking, social energy.',hi:'सामंजस्य चाहना, सामाजिक ऊर्जा।'},Scorpio:{en:'Intense feelings, deep intuition.',hi:'तीव्र भावनाएं, गहरा अंतर्ज्ञान।'},Sagittarius:{en:'Optimistic mood, freedom-loving.',hi:'आशावादी मूड, स्वतंत्रता प्रेमी।'},Capricorn:{en:'Serious mood, goal-oriented.',hi:'गंभीर मूड, लक्ष्य-उन्मुख।'},Aquarius:{en:'Detached, intellectual emotions.',hi:'अलग, बौद्धिक भावनाएं।'},Pisces:{en:'Dreamy, compassionate, spiritual.',hi:'स्वप्निल, दयालु, आध्यात्मिक।'}},
  Jupiter: {Aries:{en:'Bold expansion, new ventures favored.',hi:'साहसिक विस्तार, नए उद्यम अनुकूल।'},Taurus:{en:'Financial growth, material abundance.',hi:'वित्तीय वृद्धि, भौतिक प्रचुरता।'},Gemini:{en:'Intellectual growth, learning phase.',hi:'बौद्धिक विकास, सीखने का चरण।'},Cancer:{en:'Emotional wisdom, family blessings.',hi:'भावनात्मक ज्ञान, पारिवारिक आशीर्वाद।'},Leo:{en:'Leadership opportunities, fame.',hi:'नेतृत्व अवसर, प्रसिद्धि।'},Virgo:{en:'Service-oriented growth, health focus.',hi:'सेवा-उन्मुख विकास, स्वास्थ्य ध्यान।'},Libra:{en:'Partnership blessings, justice.',hi:'साझेदारी आशीर्वाद, न्याय।'},Scorpio:{en:'Deep transformation, hidden gains.',hi:'गहरा परिवर्तन, छिपे लाभ।'},Sagittarius:{en:'Maximum expansion, spiritual journey.',hi:'अधिकतम विस्तार, आध्यात्मिक यात्रा।'},Capricorn:{en:'Structured growth, slow but steady.',hi:'संरचित विकास, धीमा लेकिन स्थिर।'},Aquarius:{en:'Social causes, innovative growth.',hi:'सामाजिक कार्य, नवाचार विकास।'},Pisces:{en:'Spiritual enlightenment, compassion.',hi:'आध्यात्मिक ज्ञान, करुणा।'}},
  Saturn: {Aries:{en:'Tests courage, builds resilience.',hi:'साहस की परीक्षा, लचीलापन।'},Taurus:{en:'Financial discipline required.',hi:'वित्तीय अनुशासन आवश्यक।'},Gemini:{en:'Communication challenges, patience.',hi:'संचार चुनौतियां, धैर्य।'},Cancer:{en:'Emotional tests, family karma.',hi:'भावनात्मक परीक्षा, पारिवारिक कर्म।'},Leo:{en:'Ego lessons, humble leadership.',hi:'अहंकार के पाठ, विनम्र नेतृत्व।'},Virgo:{en:'Work discipline, health routines.',hi:'कार्य अनुशासन, स्वास्थ्य दिनचर्या।'},Libra:{en:'Relationship tests, commitment.',hi:'रिश्तों की परीक्षा, प्रतिबद्धता।'},Scorpio:{en:'Deep karmic clearing, rebirth.',hi:'गहरा कार्मिक शुद्धिकरण, पुनर्जन्म।'},Sagittarius:{en:'Belief systems tested.',hi:'विश्वास प्रणालियों की परीक्षा।'},Capricorn:{en:'Career rewards for hard work.',hi:'कड़ी मेहनत का करियर पुरस्कार।'},Aquarius:{en:'Social responsibility, innovation.',hi:'सामाजिक जिम्मेदारी, नवाचार।'},Pisces:{en:'Spiritual discipline, letting go.',hi:'आध्यात्मिक अनुशासन, त्याग।'}},
};

export function calculateTransits(date: Date): PlanetTransit[] {
  const ayanamsa = getAyanamsa(date);
  const results: PlanetTransit[] = [];

  for (const [name, meta] of Object.entries(PLANET_META)) {
    try {
      const ecl = Astronomy.Ecliptic(Astronomy.GeoVector(meta.body, date, true));
      const sidLong = getSiderealLong(ecl.elon, ayanamsa);
      const rashiIdx = Math.floor(sidLong / 30) % 12;
      const degInSign = sidLong % 30;
      const rashiName = RASHI[rashiIdx];

      const effectMap = TRANSIT_EFFECTS[name];
      const effect = effectMap?.[rashiName] || {en:`${name} transiting ${rashiName}.`,hi:`${meta.hi} ${RASHI_HI[rashiIdx]} में गोचर।`};

      results.push({
        name, nameHi: meta.hi, symbol: meta.symbol, color: meta.color,
        longitude: sidLong, rashi: rashiName, rashiHi: RASHI_HI[rashiIdx], rashiSymbol: RASHI_SYMBOLS[rashiIdx],
        degree: `${Math.floor(degInSign)}°${Math.floor((degInSign % 1) * 60)}'`,
        isRetrograde: false,
        effect,
      });
    } catch (e) { /* skip on error */ }
  }
  return results;
}
