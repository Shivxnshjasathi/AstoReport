'use server';

import { calculateKundli } from '@/lib/astro/calculator';
import { DateTime } from 'luxon';

export interface LalKitabRemedy {
  planet: string;
  house: number;
  effect: { en: string; hi: string };
  remedy: { en: string; hi: string };
  intensity: 'High' | 'Moderate' | 'General';
}

const LAL_KITAB_DATABASE: Record<string, Record<number, { effect: { en: string; hi: string }; remedy: { en: string; hi: string }; intensity: 'High' | 'Moderate' | 'General' }>> = {
  Sun: {
    1: {
      effect: { en: 'Brings dynamic authority but causes occasional high ego or health headaches.', hi: 'गतिशील अधिकार लाता है लेकिन कभी-कभी उच्च अहंकार या स्वास्थ्य संबंधी सिरदर्द का कारण बनता है।' },
      remedy: { en: 'Feed monkeys and keep a copper coin in your pocket. Avoid selling copper.', hi: 'बंदरों को भोजन कराएं और अपनी जेब में तांबे का सिक्का रखें। तांबा बेचने से बचें।' },
      intensity: 'Moderate'
    },
    7: {
      effect: { en: 'May cause ego friction with business partners or spouse.', hi: 'व्यावसायिक भागीदारों या जीवनसाथी के साथ अहंकार में टकराव का कारण बन सकता है।' },
      remedy: { en: 'Offer water to the rising Sun daily. Avoid entering joint partnerships.', hi: 'प्रतिदिन उगते सूर्य को जल अर्पित करें। संयुक्त साझेदारी में प्रवेश करने से बचें।' },
      intensity: 'High'
    },
    10: {
      effect: { en: 'Excellent for government service, career progress, and professional name.', hi: 'सरकारी सेवा, करियर की प्रगति और पेशेवर नाम के लिए उत्कृष्ट।' },
      remedy: { en: 'Do not wear blue or black clothes on Sundays. Keep silver square piece at home.', hi: 'रविवार को नीले या काले रंग के कपड़े न पहनें। घर पर चांदी का चौकोर टुकड़ा रखें।' },
      intensity: 'General'
    }
  },
  Moon: {
    1: {
      effect: { en: 'Gives high emotional sensitivity, deep imagination, and beautiful domestic environment.', hi: 'उच्च भावनात्मक संवेदनशीलता, गहरी कल्पना और सुंदर घरेलू वातावरण देता है।' },
      remedy: { en: 'Serve your mother daily. Keep a silver article in your pocket.', hi: 'प्रतिदिन अपनी माता की सेवा करें। अपनी जेब में चांदी की कोई वस्तु रखें।' },
      intensity: 'Moderate'
    },
    4: {
      effect: { en: 'Deeply auspicious for wisdom and properties, but can affect mothers health.', hi: 'ज्ञान और संपत्ति के लिए गहरा शुभ, लेकिन माता के स्वास्थ्य को प्रभावित कर सकता है।' },
      remedy: { en: 'Do not sell milk or milk products directly. Donate milk in temple on Mondays.', hi: 'दूध या डेयरी उत्पादों को सीधे न बेचें। सोमवार को मंदिर में दूध का दान करें।' },
      intensity: 'High'
    }
  },
  Mars: {
    1: {
      effect: { en: 'Creates intense physical energy and hot temper (Manglik effect).', hi: 'तीव्र शारीरिक ऊर्जा और गर्म मिजाज (मांगलिक प्रभाव) पैदा करता है।' },
      remedy: { en: 'Keep a red handkerchief in your pocket. Serve your younger brothers.', hi: 'अपनी जेब में लाल रुमाल रखें। अपने छोटे भाइयों की सेवा करें।' },
      intensity: 'High'
    },
    8: {
      effect: { en: 'Causes sudden operational blocks or delays in general affairs.', hi: 'अचानक परिचालन संबंधी बाधाएं या सामान्य मामलों में देरी का कारण बनता है।' },
      remedy: { en: 'Wear a solid silver ring on the little finger. Keep solid silver ball at home.', hi: 'कनिष्ठिका उंगली में चांदी की ठोस अंगूठी पहनें। घर में चांदी की ठोस गेंद रखें।' },
      intensity: 'High'
    }
  },
  Mercury: {
    1: {
      effect: { en: 'Provides dynamic business intelligence and highly persuasive speech.', hi: 'गतिशील व्यावसायिक बुद्धिमत्ता और अत्यधिक प्रेरक भाषण प्रदान करता है।' },
      remedy: { en: 'Wear a copper coin in a green thread around your neck. Respect sister/aunt.', hi: 'गले में हरे धागे में तांबे का सिक्का पहनें। बहन/चाची का सम्मान करें।' },
      intensity: 'Moderate'
    },
    3: {
      effect: { en: 'Gives great writing talents, but occasional analytical blockages.', hi: 'महान लेखन प्रतिभा देता है, लेकिन कभी-कभी विश्लेषणात्मक बाधाएं भी आती हैं।' },
      remedy: { en: 'Serve green grams (Moong dal) to birds. Avoid keeping broad-leaved plants inside home.', hi: 'पक्षियों को हरी मूंग दाल खिलाएं। घर के अंदर चौड़ी पत्ती वाले पौधे रखने से बचें।' },
      intensity: 'General'
    }
  },
  Jupiter: {
    1: {
      effect: { en: 'Deeply auspicious placement ensuring protection from all chart defects.', hi: 'अत्यंत शुभ स्थिति जो चार्ट के सभी दोषों से सुरक्षा सुनिश्चित करती है।' },
      remedy: { en: 'Apply a saffron (kesar) tilak on your forehead daily. Respect elders.', hi: 'प्रतिदिन माथे पर केसर का तिलक लगाएं। बड़ों का सम्मान करें।' },
      intensity: 'General'
    },
    9: {
      effect: { en: 'Excellent for global knowledge, higher education, and religious activities.', hi: 'वैश्विक ज्ञान, उच्च शिक्षा और धार्मिक गतिविधियों के लिए उत्कृष्ट।' },
      remedy: { en: 'Visit temple regularly. Donate yellow sweets or gram flour to needys.', hi: 'नियमित रूप से मंदिर जाएं। जरूरतमंदों को पीली मिठाई या बेसन दान करें।' },
      intensity: 'Moderate'
    }
  },
  Venus: {
    1: {
      effect: { en: 'Brings immense luxury, attraction, physical beauty, and global fortunes.', hi: 'अत्यधिक विलासिता, आकर्षण, शारीरिक सुंदरता और वैश्विक भाग्य लाता है।' },
      remedy: { en: 'Serve white cows. Wear clean, well-ironed clothes daily.', hi: 'सफेद गायों की सेवा करें। प्रतिदिन साफ-सुथरे, प्रेस किए हुए कपड़े पहनें।' },
      intensity: 'General'
    },
    7: {
      effect: { en: 'Auspicious for marital growth, but can trigger relationship over-passion.', hi: 'वैवाहिक विकास के लिए शुभ, लेकिन रिश्तों में अत्यधिक जुनून पैदा कर सकता है।' },
      remedy: { en: 'Throw blue flowers in flowing clean water. Keep a solid silver ball in locker.', hi: 'बहते साफ पानी में नीले फूल प्रवाहित करें। लॉकर में चांदी की ठोस गेंद रखें।' },
      intensity: 'Moderate'
    }
  },
  Saturn: {
    1: {
      effect: { en: 'Teaches deep life lessons through hard struggle and operational delays.', hi: 'कठिन संघर्ष और परिचालन में देरी के माध्यम से जीवन के गहरे सबक सिखाता है।' },
      remedy: { en: 'Serve black dogs with sweet rotis. Never tell lies or act falsely.', hi: 'काले कुत्तों को मीठी रोटी खिलाएं। कभी झूठ न बोलें और न ही गलत काम करें।' },
      intensity: 'High'
    },
    10: {
      effect: { en: 'Excellent placement for engineering, long-term trade, and structures.', hi: 'इंजीनियरिंग, दीर्घकालिक व्यापार और संरचनाओं के लिए उत्कृष्ट स्थिति।' },
      remedy: { en: 'Feed crows regularly. Do not accept free articles from strangers.', hi: 'कौओं को नियमित भोजन कराएं। अजनबियों से मुफ्त वस्तुएं स्वीकार न करें।' },
      intensity: 'Moderate'
    },
    12: {
      effect: { en: 'May trigger mental stress, occasional insomnia, or high expenditures.', hi: 'मानसिक तनाव, कभी-कभी अनिद्रा या उच्च खर्चों को ट्रिगर कर सकता है।' },
      remedy: { en: 'Keep a small pouch of fennel seeds (saunf) under your pillow.', hi: 'अपने तकिये के नीचे सौंफ की एक छोटी पोटली रखें।' },
      intensity: 'High'
    }
  }
};

const DEFAULT_REMEDIES: LalKitabRemedy[] = [
  {
    planet: 'Sun',
    house: 1,
    effect: { en: 'Standard solar energy placement.', hi: 'सामान्य सूर्य ऊर्जा प्रभाव।' },
    remedy: { en: 'Feed monkeys and offer water to the rising sun.', hi: 'बंदरों को भोजन कराएं और उगते सूर्य को जल अर्पित करें।' },
    intensity: 'General'
  },
  {
    planet: 'Moon',
    house: 1,
    effect: { en: 'Standard lunar energy placement.', hi: 'सामान्य चंद्र ऊर्जा प्रभाव।' },
    remedy: { en: 'Serve your mother and avoid speaking rudely.', hi: 'अपनी माता की सेवा करें और असभ्य भाषा बोलने से बचें।' },
    intensity: 'General'
  },
  {
    planet: 'Jupiter',
    house: 1,
    effect: { en: 'Standard jupiter energy placement.', hi: 'सामान्य गुरु ऊर्जा प्रभाव।' },
    remedy: { en: 'Respect spiritual masters and apply turmeric tilak.', hi: 'आध्यात्मिक गुरुओं का सम्मान करें और हल्दी का तिलक लगाएं।' },
    intensity: 'General'
  }
];

export async function calculateLalKitab(
  dobStr: string,
  tobStr: string,
  lat: number,
  lon: number,
  timezone: string
) {
  try {
    const combinedStr = `${dobStr}T${tobStr}`;
    const birthDate = new Date(combinedStr);
    
    // Calculate houses using the core calculator
    const chart = calculateKundli(birthDate, lat, lon);
    const resolvedRemedies: LalKitabRemedy[] = [];

    // Map planety positions to LAL KITAB remedies
    for (let h = 1; h <= 12; h++) {
      const planetsInHouse = chart.houses[h] || [];
      planetsInHouse.forEach((p) => {
        const databasePlan = LAL_KITAB_DATABASE[p];
        if (databasePlan) {
          // If we have house mapping, extract, else fallback to house 1
          const map = databasePlan[h] || databasePlan[1];
          if (map) {
            resolvedRemedies.push({
              planet: p,
              house: h,
              effect: map.effect,
              remedy: map.remedy,
              intensity: map.intensity,
            });
          }
        }
      });
    }

    // Fallback if no specific matched remedies
    if (resolvedRemedies.length === 0) {
      resolvedRemedies.push(...DEFAULT_REMEDIES);
    }

    return {
      success: true,
      remedies: resolvedRemedies,
    };
  } catch (error: any) {
    console.error('Error calculating Lal Kitab remedies:', error);
    return { success: false, error: error.message || 'Calculation failed' };
  }
}
