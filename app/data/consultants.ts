export interface Astrologer {
  id: string;
  name: { en: string; hi: string };
  image: string;
  specialties: { en: string[]; hi: string[] };
  experience: number;
  languages: string[];
  rating: number;
  reviews: number;
  pricePerMin: number;
  available: boolean;
  about: { en: string; hi: string };
}

export const ASTROLOGERS: Astrologer[] = [
  {
    id: 'sharma',
    name: { en: 'Acharya Sharma', hi: 'आचार्य शर्मा' },
    image: '/experts/acharya.jpg',
    specialties: { en: ['Vedic Astrology', 'Vastu', 'Kundli'], hi: ['वैदिक ज्योतिष', 'वास्तु', 'कुंडली'] },
    experience: 25,
    languages: ['Hindi', 'English', 'Sanskrit'],
    rating: 4.9,
    reviews: 1240,
    pricePerMin: 50,
    available: true,
    about: { 
      en: 'Specializing in deep Kundli analysis and karmic remedies with over 2 decades of traditional temple experience.',
      hi: 'दो दशकों से अधिक के पारंपरिक मंदिर के अनुभव के साथ गहरी कुंडली विश्लेषण और कार्मिक उपायों के विशेषज्ञ।'
    }
  },
  {
    id: 'verma',
    name: { en: 'Dr. K. Verma', hi: 'डॉ. के. वर्मा' },
    image: '/experts/verma.jpg',
    specialties: { en: ['Numerology', 'Career', 'Finance'], hi: ['अंक ज्योतिष', 'करियर', 'वित्त'] },
    experience: 15,
    languages: ['English', 'Hindi', 'Gujarati'],
    rating: 4.8,
    reviews: 850,
    pricePerMin: 40,
    available: true,
    about: {
      en: 'A PhD in Astrological Sciences, Dr. Verma merges modern psychology with ancient predictive techniques.',
      hi: 'ज्योतिषीय विज्ञान में पीएचडी, डॉ. वर्मा प्राचीन भविष्य कहने वाली तकनीकों के साथ आधुनिक मनोविज्ञान का विलय करते हैं।'
    }
  },
  {
    id: 'priya',
    name: { en: 'Tarot Priya', hi: 'टैरो प्रिया' },
    image: '/experts/priya.jpg',
    specialties: { en: ['Tarot Reading', 'Relationships', 'Healing'], hi: ['टैरो रीडिंग', 'रिश्ते', 'हीलिंग'] },
    experience: 8,
    languages: ['English', 'Hindi'],
    rating: 4.9,
    reviews: 2100,
    pricePerMin: 30,
    available: false,
    about: {
      en: 'Intuitive Tarot reader and energy healer focusing on soulmate connections and emotional blockages.',
      hi: 'सहज टैरो रीडर और ऊर्जा हीलर जो सोलमेट कनेक्शन और भावनात्मक रुकावटों पर ध्यान केंद्रित करती हैं।'
    }
  },
  {
    id: 'mishra',
    name: { en: 'Pandit Mishra', hi: 'पंडित मिश्रा' },
    image: '/experts/mishra.jpg',
    specialties: { en: ['Muhurat', 'Marriage', 'Gemology'], hi: ['मुहूर्त', 'विवाह', 'रत्न विज्ञान'] },
    experience: 30,
    languages: ['Hindi', 'Bhojpuri'],
    rating: 5.0,
    reviews: 3200,
    pricePerMin: 60,
    available: true,
    about: {
      en: 'Renowned for finding the most auspicious Muhurats and prescribing powerful gemstone remedies.',
      hi: 'सबसे शुभ मुहूर्त खोजने और शक्तिशाली रत्न उपायों को निर्धारित करने के लिए प्रसिद्ध।'
    }
  }
];
