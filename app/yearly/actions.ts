'use server';

import { calculateKundli } from '@/lib/astro/calculator';
import { DateTime } from 'luxon';

export interface VarshphalResult {
  year: number;
  age: number;
  munthaRashi: string;
  munthaHouse: number;
  munthaLord: string;
  yearLord: string;
  forecasts: {
    career: { en: string; hi: string };
    wealth: { en: string; hi: string };
    love: { en: string; hi: string };
    health: { en: string; hi: string };
  };
}

const RASHI_LORD: Record<number, string> = {
  1: 'Mars', 2: 'Venus', 3: 'Mercury', 4: 'Moon', 5: 'Sun', 6: 'Mercury',
  7: 'Venus', 8: 'Mars', 9: 'Jupiter', 10: 'Saturn', 11: 'Saturn', 12: 'Jupiter'
};

const RASHI_NAMES = [
  'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)',
  'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrischika)',
  'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
];

export async function calculateVarshphal(
  dobStr: string,
  tobStr: string,
  lat: number,
  lon: number,
  timezone: string,
  targetYear: number
) {
  try {
    const birthDate = DateTime.fromISO(`${dobStr}T${tobStr}`, { zone: timezone });
    const birthYear = birthDate.year;
    const age = targetYear - birthYear;
    
    // Calculate birth chart
    const chart = await calculateKundli(birthDate, lat, lon);

    // Calculate Muntha House: (Lagna Rashi + Age) % 12
    const lagna = chart.lagnaRashi;
    const munthaRashiIdx = ((lagna + age - 1) % 12) + 1;
    const munthaRashi = RASHI_NAMES[munthaRashiIdx - 1];
    const munthaLord = RASHI_LORD[munthaRashiIdx];

    // Muntha House location in the chart:
    const munthaHouse = ((munthaRashiIdx - lagna + 12) % 12) + 1;

    // Standard high-fidelity forecasts based on Muntha House
    let forecasts = {
      career: {
        en: 'A highly progressive year for business. Relocation or expansion yields dynamic new opportunities. Respect managers.',
        hi: 'व्यवसाय के लिए एक अत्यधिक प्रगतिशील वर्ष। स्थानांतरण या विस्तार गतिशील नए अवसर प्रदान करता है। प्रबंधकों का सम्मान करें।'
      },
      wealth: {
        en: 'Sudden financial gains are highly likely through investments. Avoid impulsive expenditures and speculative assets.',
        hi: 'निवेश के माध्यम से अचानक वित्तीय लाभ की प्रबल संभावना है। आवेगी खर्चों और सट्टा संपत्तियों से बचें।'
      },
      love: {
        en: 'A pleasant, supportive phase for domestic happiness and relationship building. Singulars may meet someone special.',
        hi: 'घरेलू सुख और संबंध निर्माण के लिए एक सुखद, सहायक चरण। एकल लोग किसी विशेष व्यक्ति से मिल सकते हैं।'
      },
      health: {
        en: 'Vitality remains high. Maintain a balanced diet and regular yoga to prevent minor seasonal fatigue.',
        hi: 'जीवन शक्ति बनी रहती है। मामूली मौसमी थकान को रोकने के लिए संतुलित आहार और नियमित योग बनाए रखें।'
      }
    };

    if ([6, 8, 12].includes(munthaHouse)) {
      forecasts = {
        career: {
          en: 'Exercise patience in professional matters. Operational delays or workload will teach deep perseverance.',
          hi: 'पेशेवर मामलों में धैर्य रखें। परिचालन में देरी या कार्यभार गहरा दृढ़ संकल्प सिखाएगा।'
        },
        wealth: {
          en: 'Monitor expenses carefully. Prioritize liquid savings over high-risk investments this year.',
          hi: 'खर्चों पर सावधानीपूर्वक नजर रखें। इस वर्ष उच्च जोखिम वाले निवेशों की तुलना में तरल बचत को प्राथमिकता दें।'
        },
        love: {
          en: 'Occasional misunderstandings require open communication and calm talks to sustain relationship harmony.',
          hi: 'रिश्तों में सद्भाव बनाए रखने के लिए कभी-कभार होने वाली गलतफहमियों के लिए खुले संचार और शांत बातचीत की आवश्यकता होती है।'
        },
        health: {
          en: 'Focus on digestion and stress management. Adequate sleep and morning walks are highly recommended.',
          hi: 'पाचन और तनाव प्रबंधन पर ध्यान दें। पर्याप्त नींद और सुबह की सैर की अत्यधिक अनुशंसा की जाती है।'
        }
      };
    }

    return {
      success: true,
      data: {
        year: targetYear,
        age,
        munthaRashi,
        munthaHouse,
        munthaLord,
        yearLord: munthaLord, // Muntha Lord acts as standard Year Lord in general forecasts
        forecasts,
      }
    };
  } catch (error: any) {
    console.error('Error calculating Varshphal:', error);
    return { success: false, error: error.message || 'Varshphal failed' };
  }
}
