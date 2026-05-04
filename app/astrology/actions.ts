'use server';

// @ts-ignore
const aztrojs = require('aztro-js');

const fallbackData: Record<string, any> = {
  aries: { desc: "A burst of fiery energy propels you forward today. Take the lead on a lingering project. Keep your impatience in check.", mood: "Energetic", color: "Red", comp: "Leo" },
  taurus: { desc: "Stability is your superpower today. A financial matter might require your attention. Enjoy a grounding meal this evening.", mood: "Grounded", color: "Green", comp: "Virgo" },
  gemini: { desc: "Your communicative prowess is at an all-time high. A chance encounter could spark a fascinating conversation.", mood: "Talkative", color: "Yellow", comp: "Libra" },
  cancer: { desc: "The cosmic alignment brings a surge of focus and clarity to your day. Trust your intuition when making fast decisions.", mood: "Intuitive", color: "Silver", comp: "Scorpio" },
  leo: { desc: "You're radiating warmth and confidence today. It's a great day to showcase your talents or pitch a creative idea.", mood: "Confident", color: "Gold", comp: "Aries" },
  virgo: { desc: "Meticulous attention to detail pays off today. Reorganize your workspace or tackle a complex puzzle.", mood: "Analytical", color: "Navy Blue", comp: "Taurus" },
  libra: { desc: "Balance is key today. You might find yourself playing peacemaker in a minor dispute. Seek harmony in your surroundings.", mood: "Harmonious", color: "Pink", comp: "Gemini" },
  scorpio: { desc: "Your emotional depth is your greatest asset right now. Trust your gut feeling about a certain situation or person.", mood: "Intense", color: "Black", comp: "Cancer" },
  sagittarius: { desc: "Adventure calls! Explore a new subject or try a different cuisine. Expand your horizons and embrace spontaneity.", mood: "Adventurous", color: "Purple", comp: "Aries" },
  capricorn: { desc: "Discipline and hard work are highlighted today. Focus on your long-term goals and take practical steps toward them.", mood: "Disciplined", color: "Brown", comp: "Taurus" },
  aquarius: { desc: "Your innovative ideas are flowing freely. Don't be afraid to think outside the box or propose unconventional solutions.", mood: "Innovative", color: "Electric Blue", comp: "Gemini" },
  pisces: { desc: "Your empathy is heightened today. Connect with loved ones on a deeper level or engage in a creative pursuit.", mood: "Empathetic", color: "Sea Green", comp: "Cancer" }
};

export async function getDailyHoroscope(sign: string) {
  return new Promise((resolve) => {
    try {
      // Wrapper around callback-based aztro-js
      aztrojs.get_horoscope(sign, 'today', function(res: any) {
        if (!res || !res.description) {
          throw new Error('Invalid response from aztro-js');
        }
        resolve(res);
      });
    } catch (error) {
      // Graceful fallback for demo/production if external API is down
      const fallback = fallbackData[sign.toLowerCase()] || fallbackData['aries'];
      resolve({
        date_range: "Daily Snapshot", // Mock
        current_date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        description: fallback.desc,
        compatibility: fallback.comp,
        mood: fallback.mood,
        color: fallback.color,
        lucky_number: Math.floor(Math.random() * 100).toString(),
        lucky_time: `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'am' : 'pm'}`
      });
    }
  });
}
