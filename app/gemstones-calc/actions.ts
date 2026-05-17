'use server';

import { calculateKundli } from '@/lib/astro/calculator';
import { DateTime } from 'luxon';

export interface GemstoneRecommendation {
  name: string;
  hindiName: string;
  stone: string;
  ruler: string;
  benefits: { en: string; hi: string };
  finger: { en: string; hi: string };
  metal: { en: string; hi: string };
  mantra: string;
}

const GEMSTONES_MAP: Record<number, GemstoneRecommendation[]> = {
  1: [ // Aries
    {
      name: 'Red Coral',
      hindiName: 'मूंगा',
      stone: 'Moonga',
      ruler: 'Mars',
      benefits: { en: 'Enhances physical energy, courage, self-confidence, and leadership qualities.', hi: 'शारीरिक ऊर्जा, साहस, आत्मविश्वास और नेतृत्व गुणों को बढ़ाता है।' },
      finger: { en: 'Ring Finger of right hand', hi: 'दाहिने हाथ की अनामिका उंगली' },
      metal: { en: 'Copper or Gold', hi: 'तांबा या सोना' },
      mantra: 'Om Kraam Kreem Kroum Sah Bhaumaya Namah',
    },
    {
      name: 'Yellow Sapphire',
      hindiName: 'पुखराज',
      stone: 'Pukhraj',
      ruler: 'Jupiter',
      benefits: { en: 'Brings wisdom, spiritual growth, financial prosperity, and marital bliss.', hi: 'ज्ञान, आध्यात्मिक विकास, वित्तीय समृद्धि और वैवाहिक सुख लाता है।' },
      finger: { en: 'Index Finger of right hand', hi: 'दाहिने हाथ की तर्जनी उंगली' },
      metal: { en: 'Gold', hi: 'सोना' },
      mantra: 'Om Gram Greem Groum Sah Gurave Namah',
    }
  ],
  2: [ // Taurus
    {
      name: 'Diamond / White Sapphire',
      hindiName: 'हीरा / ओपल',
      stone: 'Heera / Opal',
      ruler: 'Venus',
      benefits: { en: 'Enhances luxury, artistic talents, attraction, relationships, and global wealth.', hi: 'लक्जरी, कलात्मक प्रतिभा, आकर्षण, रिश्तों और वैश्विक धन को बढ़ाता है।' },
      finger: { en: 'Middle or Ring Finger of right hand', hi: 'दाहिने हाथ की मध्यमा या अनामिका उंगली' },
      metal: { en: 'Silver or Platinum', hi: 'चांदी या प्लैटिनम' },
      mantra: 'Om Draam Dreem Droum Sah Shukraya Namah',
    },
    {
      name: 'Emerald',
      hindiName: 'पन्ना',
      stone: 'Panna',
      ruler: 'Mercury',
      benefits: { en: 'Boosts communication skills, business intelligence, memory, and concentration.', hi: 'संचार कौशल, व्यावसायिक बुद्धिमत्ता, स्मृति और एकाग्रता को बढ़ावा देता है।' },
      finger: { en: 'Little Finger of right hand', hi: 'दाहिने हाथ की कनिष्ठिका उंगली' },
      metal: { en: 'Gold or Silver', hi: 'सोना या चांदी' },
      mantra: 'Om Braam Breem Broum Sah Budhaya Namah',
    }
  ],
  3: [ // Gemini
    {
      name: 'Emerald',
      hindiName: 'पन्ना',
      stone: 'Panna',
      ruler: 'Mercury',
      benefits: { en: 'Enhances intellectual growth, logical reasoning, speech, and business expansion.', hi: 'बौद्धिक विकास, तार्किक सोच, भाषण और व्यावसायिक विस्तार को बढ़ाता है।' },
      finger: { en: 'Little Finger of right hand', hi: 'दाहिने हाथ की कनिष्ठिका उंगली' },
      metal: { en: 'Gold or Silver', hi: 'सोना या चांदी' },
      mantra: 'Om Braam Breem Broum Sah Budhaya Namah',
    },
    {
      name: 'Blue Sapphire',
      hindiName: 'नीलम',
      stone: 'Neelam',
      ruler: 'Saturn',
      benefits: { en: 'Provides instant focus, discipline, protection from negative energies, and huge success.', hi: 'त्वरित ध्यान, अनुशासन, नकारात्मक ऊर्जा से सुरक्षा और भारी सफलता प्रदान करता है।' },
      finger: { en: 'Middle Finger of right hand', hi: 'दाहिने हाथ की मध्यमा उंगली' },
      metal: { en: 'Panchdhatu or Iron', hi: 'पंचधातु या लोहा' },
      mantra: 'Om Praam Preem Proum Sah Shanaishcharaya Namah',
    }
  ],
  4: [ // Cancer
    {
      name: 'Pearl',
      hindiName: 'मोती',
      stone: 'Moti',
      ruler: 'Moon',
      benefits: { en: 'Brings mental peace, emotional stability, high intuition, and domestic harmony.', hi: 'मानसिक शांति, भावनात्मक स्थिरता, उच्च अंतर्ज्ञान और घरेलू सद्भाव लाता है।' },
      finger: { en: 'Little Finger of right hand', hi: 'दाहिने हाथ की कनिष्ठिका उंगली' },
      metal: { en: 'Silver', hi: 'चांदी' },
      mantra: 'Om Shraam Shreem Shroum Sah Chandraya Namah',
    },
    {
      name: 'Red Coral',
      hindiName: 'मूंगा',
      stone: 'Moonga',
      ruler: 'Mars',
      benefits: { en: 'Brings extreme physical strength, success in career, and protects from administrative blockages.', hi: 'अत्यधिक शारीरिक शक्ति, करियर में सफलता लाता है और प्रशासनिक बाधाओं से बचाता है।' },
      finger: { en: 'Ring Finger of right hand', hi: 'दाहिने हाथ की अनामिका उंगली' },
      metal: { en: 'Copper or Gold', hi: 'तांबा या सोना' },
      mantra: 'Om Kraam Kreem Kroum Sah Bhaumaya Namah',
    }
  ],
  5: [ // Leo
    {
      name: 'Ruby',
      hindiName: 'माणिक्य',
      stone: 'Manik',
      ruler: 'Sun',
      benefits: { en: 'Brings immense fame, willpower, leadership qualities, authority, and high self-esteem.', hi: 'अत्यधिक प्रसिद्धि, इच्छाशक्ति, नेतृत्व गुण, अधिकार और उच्च आत्म-सम्मान लाता है।' },
      finger: { en: 'Ring Finger of right hand', hi: 'दाहिने हाथ की अनामिका उंगली' },
      metal: { en: 'Gold or Copper', hi: 'सोना या तांबा' },
      mantra: 'Om Hraam Hreem Hroum Sah Suryaya Namah',
    },
    {
      name: 'Yellow Sapphire',
      hindiName: 'पुखराज',
      stone: 'Pukhraj',
      ruler: 'Jupiter',
      benefits: { en: 'Brings wisdom, spiritual growth, financial prosperity, and protection from obstacles.', hi: 'ज्ञान, आध्यात्मिक विकास, वित्तीय समृद्धि और बाधाओं से सुरक्षा लाता है।' },
      finger: { en: 'Index Finger of right hand', hi: 'दाहिने हाथ की तर्जनी उंगली' },
      metal: { en: 'Gold', hi: 'सोना' },
      mantra: 'Om Gram Greem Groum Sah Gurave Namah',
    }
  ],
  6: [ // Virgo
    {
      name: 'Emerald',
      hindiName: 'पन्ना',
      stone: 'Panna',
      ruler: 'Mercury',
      benefits: { en: 'Boosts commerce skills, clear decision-making, high focus, and physical health.', hi: 'वाणिज्य कौशल, स्पष्ट निर्णय लेने, उच्च फोकस और शारीरिक स्वास्थ्य को बढ़ावा देता है।' },
      finger: { en: 'Little Finger of right hand', hi: 'दाहिने हाथ की कनिष्ठिका उंगली' },
      metal: { en: 'Gold or Silver', hi: 'सोना या चांदी' },
      mantra: 'Om Braam Breem Broum Sah Budhaya Namah',
    },
    {
      name: 'Diamond / Opal',
      hindiName: 'हीरा / ओपल',
      stone: 'Heera / Opal',
      ruler: 'Venus',
      benefits: { en: 'Brings high luck, luxury, artistic success, foreign travels, and peace.', hi: 'उच्च भाग्य, विलासिता, कलात्मक सफलता, विदेश यात्रा और शांति लाता है।' },
      finger: { en: 'Ring Finger of right hand', hi: 'दाहिने हाथ की अनामिका उंगली' },
      metal: { en: 'Silver or Platinum', hi: 'चांदी या प्लैटिनम' },
      mantra: 'Om Draam Dreem Droum Sah Shukraya Namah',
    }
  ],
  7: [ // Libra
    {
      name: 'Diamond / Opal',
      hindiName: 'हीरा / ओपल',
      stone: 'Heera / Opal',
      ruler: 'Venus',
      benefits: { en: 'Enhances attraction, prosperity, public life, and balances life energies.', hi: 'आकर्षण, समृद्धि, सार्वजनिक जीवन को बढ़ाता है और जीवन की ऊर्जा को संतुलित करता है।' },
      finger: { en: 'Middle or Ring Finger of right hand', hi: 'दाहिने हाथ की मध्यमा या अनामिका उंगली' },
      metal: { en: 'Silver or Platinum', hi: 'चांदी या प्लैटिनम' },
      mantra: 'Om Draam Dreem Droum Sah Shukraya Namah',
    },
    {
      name: 'Blue Sapphire',
      hindiName: 'नीलम',
      stone: 'Neelam',
      ruler: 'Saturn',
      benefits: { en: 'The most powerful yoga-karaka stone for Libra, bringing swift rise in career and name.', hi: 'तुला राशि के लिए सबसे शक्तिशाली योग-कारक रत्न, करियर और नाम में तेजी से वृद्धि लाता है।' },
      finger: { en: 'Middle Finger of right hand', hi: 'दाहिने हाथ की मध्यमा उंगली' },
      metal: { en: 'Iron or Gold', hi: 'लोहा या सोना' },
      mantra: 'Om Praam Preem Proum Sah Shanaishcharaya Namah',
    }
  ],
  8: [ // Scorpio
    {
      name: 'Red Coral',
      hindiName: 'मूंगा',
      stone: 'Moonga',
      ruler: 'Mars',
      benefits: { en: 'Enhances physical stamina, defeats enemies, and ensures smooth completion of tasks.', hi: 'शारीरिक सहनशक्ति बढ़ाता है, शत्रुओं को परास्त करता है और कार्यों को सुचारू रूप से पूरा करना सुनिश्चित करता है।' },
      finger: { en: 'Ring Finger of right hand', hi: 'दाहिने हाथ की अनामिका उंगली' },
      metal: { en: 'Copper or Gold', hi: 'तांबा या सोना' },
      mantra: 'Om Kraam Kreem Kroum Sah Bhaumaya Namah',
    },
    {
      name: 'Pearl',
      hindiName: 'मोती',
      stone: 'Moti',
      ruler: 'Moon',
      benefits: { en: 'Enhances luck, triggers intuitive power, emotional stability, and high learning capacity.', hi: 'भाग्य बढ़ाता है, सहज शक्ति को सक्रिय करता है, भावनात्मक स्थिरता और उच्च सीखने की क्षमता देता है।' },
      finger: { en: 'Little Finger of right hand', hi: 'दाहिने हाथ की कनिष्ठिका उंगली' },
      metal: { en: 'Silver', hi: 'चांदी' },
      mantra: 'Om Shraam Shreem Shroum Sah Chandraya Namah',
    }
  ],
  9: [ // Sagittarius
    {
      name: 'Yellow Sapphire',
      hindiName: 'पुखराज',
      stone: 'Pukhraj',
      ruler: 'Jupiter',
      benefits: { en: 'Brings leadership traits, extreme wealth, success in teaching/legal careers, and fortune.', hi: 'नेतृत्व गुण, अत्यधिक धन, शिक्षण/कानूनी करियर में सफलता और भाग्य लाता है।' },
      finger: { en: 'Index Finger of right hand', hi: 'दाहिने हाथ की तर्जनी उंगली' },
      metal: { en: 'Gold', hi: 'सोना' },
      mantra: 'Om Gram Greem Groum Sah Gurave Namah',
    },
    {
      name: 'Red Coral',
      hindiName: 'मूंगा',
      stone: 'Moonga',
      ruler: 'Mars',
      benefits: { en: 'Brings dynamic creativity, high intelligence, child joy, and physical courage.', hi: 'गतिशील रचनात्मकता, उच्च बुद्धिमत्ता, बच्चों का सुख और शारीरिक साहस लाता है।' },
      finger: { en: 'Ring Finger of right hand', hi: 'दाहिने हाथ की अनामिका उंगली' },
      metal: { en: 'Copper or Gold', hi: 'तांबा या सोना' },
      mantra: 'Om Kraam Kreem Kroum Sah Bhaumaya Namah',
    }
  ],
  10: [ // Capricorn
    {
      name: 'Blue Sapphire',
      hindiName: 'नीलम',
      stone: 'Neelam',
      ruler: 'Saturn',
      benefits: { en: 'Highly protective, structures life discipline, and ensures long-term career stability.', hi: 'अत्यधिक सुरक्षात्मक, जीवन के अनुशासन को संरचित करता है और दीर्घकालिक करियर स्थिरता सुनिश्चित करता है।' },
      finger: { en: 'Middle Finger of right hand', hi: 'दाहिने हाथ की मध्यमा उंगली' },
      metal: { en: 'Panchdhatu or Iron', hi: 'पंचधातु या लोहा' },
      mantra: 'Om Praam Preem Proum Sah Shanaishcharaya Namah',
    },
    {
      name: 'Emerald',
      hindiName: 'पन्ना',
      stone: 'Panna',
      ruler: 'Mercury',
      benefits: { en: 'Improves business calculations, clear analytical skills, speech, and locks fortune.', hi: 'व्यापारिक गणनाओं में सुधार, स्पष्ट विश्लेषणात्मक कौशल, भाषण और भाग्य को बढ़ाता है।' },
      finger: { en: 'Little Finger of right hand', hi: 'दाहिने हाथ की कनिष्ठिका उंगली' },
      metal: { en: 'Gold or Silver', hi: 'सोना या चांदी' },
      mantra: 'Om Braam Breem Broum Sah Budhaya Namah',
    }
  ],
  11: [ // Aquarius
    {
      name: 'Blue Sapphire',
      hindiName: 'नीलम',
      stone: 'Neelam',
      ruler: 'Saturn',
      benefits: { en: 'Enhances planetary strength, self-identity, financial stability, and long-term security.', hi: 'ग्रहीय शक्ति, आत्म-पहचान, वित्तीय स्थिरता और दीर्घकालिक सुरक्षा को बढ़ाता है।' },
      finger: { en: 'Middle Finger of right hand', hi: 'दाहिने हाथ की मध्यमा उंगली' },
      metal: { en: 'Panchdhatu or Iron', hi: 'पंचधातु या लोहा' },
      mantra: 'Om Praam Preem Proum Sah Shanaishcharaya Namah',
    },
    {
      name: 'Diamond / Opal',
      hindiName: 'हीरा / ओपल',
      stone: 'Heera / Opal',
      ruler: 'Venus',
      benefits: { en: 'Brings high luck, luxury, artistic progress, spiritual alignment, and fortune.', hi: 'उच्च भाग्य, विलासिता, कलात्मक प्रगति, आध्यात्मिक संरेखण और भाग्य लाता है।' },
      finger: { en: 'Ring Finger of right hand', hi: 'दाहिने हाथ की अनामिका उंगली' },
      metal: { en: 'Silver or Platinum', hi: 'चांदी या प्लैटिनम' },
      mantra: 'Om Draam Dreem Droum Sah Shukraya Namah',
    }
  ],
  12: [ // Pisces
    {
      name: 'Yellow Sapphire',
      hindiName: 'पुखराज',
      stone: 'Pukhraj',
      ruler: 'Jupiter',
      benefits: { en: 'Brings self-growth, wisdom, strong health, spiritual insights, and financial rise.', hi: 'आत्म-विकास, ज्ञान, मजबूत स्वास्थ्य, आध्यात्मिक अंतर्दृष्टि और वित्तीय वृद्धि लाता है।' },
      finger: { en: 'Index Finger of right hand', hi: 'दाहिने हाथ की तर्जनी उंगली' },
      metal: { en: 'Gold', hi: 'सोना' },
      mantra: 'Om Gram Greem Groum Sah Gurave Namah',
    },
    {
      name: 'Red Coral',
      hindiName: 'मूंगा',
      stone: 'Moonga',
      ruler: 'Mars',
      benefits: { en: 'Enhances fortune, triggers global expansions, luck in career, and protects health.', hi: 'भाग्य को बढ़ाता है, वैश्विक विस्तार को सक्रिय करता है, करियर में भाग्य और स्वास्थ्य की रक्षा करता है।' },
      finger: { en: 'Ring Finger of right hand', hi: 'दाहिने हाथ की अनामिका उंगली' },
      metal: { en: 'Gold or Copper', hi: 'सोना या तांबा' },
      mantra: 'Om Kraam Kreem Kroum Sah Bhaumaya Namah',
    }
  ]
};

const RASHI_NAMES: Record<number, { en: string; hi: string }> = {
  1: { en: 'Aries (Mesha)', hi: 'मेष राशि' },
  2: { en: 'Taurus (Vrishabha)', hi: 'वृषभ राशि' },
  3: { en: 'Gemini (Mithuna)', hi: 'मिथुन राशि' },
  4: { en: 'Cancer (Karka)', hi: 'कर्क राशि' },
  5: { en: 'Leo (Simha)', hi: 'सिंह राशि' },
  6: { en: 'Virgo (Kanya)', hi: 'कन्या राशि' },
  7: { en: 'Libra (Tula)', hi: 'तुला राशि' },
  8: { en: 'Scorpio (Vrischika)', hi: 'वृश्चिक राशि' },
  9: { en: 'Sagittarius (Dhanu)', hi: 'धनु राशि' },
  10: { en: 'Capricorn (Makara)', hi: 'मकर राशि' },
  11: { en: 'Aquarius (Kumbha)', hi: 'कुंभ राशि' },
  12: { en: 'Pisces (Meena)', hi: 'मीन राशि' },
};

export async function calculateGemstones(
  dobStr: string,
  tobStr: string,
  lat: number,
  lon: number,
  timezone: string
) {
  try {
    const combinedStr = `${dobStr}T${tobStr}`;
    const birthDate = new Date(combinedStr);
    
    // Calculate Lagna using current core NodeJHora engine wrapper
    const chart = calculateKundli(birthDate, lat, lon);
    const lagna = chart.lagnaRashi;
    
    const recommendations = GEMSTONES_MAP[lagna] || GEMSTONES_MAP[1];
    const ascendantName = RASHI_NAMES[lagna] || RASHI_NAMES[1];

    return {
      success: true,
      recommendations,
      ascendant: ascendantName,
    };
  } catch (error: any) {
    console.error('Error calculating gemstones:', error);
    return { success: false, error: error.message || 'Calculation failed' };
  }
}
