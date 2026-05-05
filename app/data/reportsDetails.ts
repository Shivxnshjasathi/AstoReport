export interface ReportDetail {
  id: number;
  title: { en: string; hi: string };
  whatIsIt: { en: string; hi: string };
  whatItFixes: { en: string; hi: string };
  astrologicalLogic: { en: string; hi: string };
  priceINR: string;
  oldPriceINR: string;
  priceUSD: string;
  oldPriceUSD: string;
}

export const reportsDetails: Record<number, ReportDetail> = {
  1: {
    id: 1,
    title: { en: "Premium Personalized Kundli", hi: "प्रीमियम वैयक्तिकृत कुंडली" },
    whatIsIt: {
      en: "This is a comprehensive, 50+ page technical and spiritual manifesto of your entire life. It captures the exact celestial 'DNA' at the moment of your first breath. This report acts as a mirror to your soul, mapping out your past-life karma (Prarabdha), your current physical vitality, and your future potential. It doesn't just list planets; it explains the cosmic design behind your personality, health, family lineage, and spiritual evolution across 12 distinct houses of existence.",
      hi: "यह आपके संपूर्ण जीवन का एक व्यापक, 50+ पृष्ठों का तकनीकी और आध्यात्मिक घोषणापत्र है। यह आपकी पहली सांस के क्षण में सटीक खगोलीय 'डीएनए' को कैप्चर करता है। यह रिपोर्ट आपकी आत्मा के दर्पण के रूप में कार्य करती है, जो आपके पिछले जीवन के कर्म (प्रारब्ध), आपकी वर्तमान शारीरिक जीवन शक्ति और आपकी भविष्य की क्षमता का खाका खींचती है। यह केवल ग्रहों की सूची नहीं बनाता है; यह अस्तित्व के 12 अलग-अलग भावों में आपके व्यक्तित्व, स्वास्थ्य, पारिवारिक वंश और आध्यात्मिक विकास के पीछे के ब्रह्मांडीय डिजाइन की व्याख्या करता है।"
    },
    whatItFixes: {
      en: "It eliminates the paralyzing 'confusion of self.' Many people struggle because they are trying to live a life that contradicts their planetary design. This report fixes that misalignment by identifying your 'Atmakaraka' (Soul Planet) and your 'Yogakaraka' (Luck-bestowing planet). It clarifies why you face recurring emotional patterns, which health issues are hardcoded in your constitution, and provides a clear roadmap to leverage your natural strengths rather than fighting your inherent weaknesses.",
      hi: "यह 'स्वयं के भ्रम' को समाप्त करता है। बहुत से लोग इसलिए संघर्ष करते हैं क्योंकि वे ऐसा जीवन जीने की कोशिश कर रहे हैं जो उनके ग्रहों के डिजाइन के विपरीत है। यह रिपोर्ट आपके 'आत्मकारक' (आत्मा ग्रह) और आपके 'योगकारक' (भाग्य देने वाले ग्रह) की पहचान करके उस गलत संरेखण को ठीक करती है। यह स्पष्ट करता है कि आप बार-बार भावनात्मक पैटर्न का सामना क्यों करते हैं, आपके संविधान में कौन से स्वास्थ्य मुद्दे जुड़े हुए हैं, और आपकी अंतर्निहित कमजोरियों से लड़ने के बजाय आपकी प्राकृतिक शक्तियों का लाभ उठाने के लिए एक स्पष्ट रोडमैप प्रदान करता है।"
    },
    astrologicalLogic: {
      en: "Calculates the precise longitude and latitude-based degrees of the Lagna (Ascendant) and the 9 Grahas. It employs the 'Shadbala' system to calculate the six-fold strength of planets and evaluates the 'Vimshottari Dasha' cycles to predict timing. Crucially, it examines the 'Bhava Chalit' chart to see if a planet has shifted its influence to an adjacent house, and analyzes the 'Navamsha' (D9) chart to see if a planet's strength is real or just a superficial placement in the birth chart.",
      hi: "लग्न (Ascendant) और 9 ग्रहों के सटीक अक्षांश और देशांतर-आधारित अंशों की गणना करता है। यह ग्रहों की छह गुना शक्ति की गणना करने के लिए 'षडबल' प्रणाली का उपयोग करता है और समय की भविष्यवाणी करने के लिए 'विंशोत्तरी दशा' चक्रों का मूल्यांकन करता है। महत्वपूर्ण रूप से, यह 'भाव चलित' चार्ट की जांच करता है कि क्या किसी ग्रह ने अपना प्रभाव आसन्न भाव में स्थानांतरित कर दिया है, और यह देखने के लिए 'नवांश' (D9) चार्ट का विश्लेषण करता है कि क्या ग्रह की ताकत वास्तविक है या जन्म कुंडली में केवल एक सतही स्थिति है।"
    },
    priceINR: "₹99", oldPriceINR: "₹199", priceUSD: "$1.99", oldPriceUSD: "$3.99"
  },
  2: {
    id: 2,
    title: { en: "Personalized Couple Kundli", hi: "वैयक्तिकृत युगल कुंडली" },
    whatIsIt: {
      en: "An exhaustive 360-degree compatibility audit designed for serious couples or those seeking marriage. While basic astrology only looks at the Moon sign, this report cross-references both partners' complete horoscopes. It evaluates the psychological depth (Manas), physical intimacy (Yoni), and soul-level resonance (Nadi) to provide a realistic probability of long-term marital bliss and shared prosperity.",
      hi: "गंभीर जोड़ों या विवाह चाहने वालों के लिए डिज़ाइन किया गया एक व्यापक 360-डिग्री अनुकूलता ऑडिट। जबकि बुनियादी ज्योतिष केवल चंद्र राशि को देखता है, यह रिपोर्ट दोनों भागीदारों के पूर्ण जन्मकुंडली का क्रॉस-रेफरेंस देती है। यह दीर्घकालिक वैवाहिक सुख और साझा समृद्धि की वास्तविक संभावना प्रदान करने के लिए मनोवैज्ञानिक गहराई (मानस), शारीरिक अंतरंगता (योनि), और आत्मा-स्तर की प्रतिध्वनि (नाड़ी) का मूल्यांकन करती है।"
    },
    whatItFixes: {
      en: "Identifies and neutralizes hidden friction points before they manifest as divorce or toxic domestic environments. It specifically addresses 'Manglik Dosha'—the fire of Mars—and whether it is canceled or requires specific energy-balancing remedies. It fixes the anxiety of 'Will we last?' by providing specific behavioral adjustments for both partners to bridge the gap between their differing planetary temperaments.",
      hi: "तलाक या विषाक्त घरेलू वातावरण के रूप में प्रकट होने से पहले छिपे हुए घर्षण बिंदुओं की पहचान और निष्पक्ष करता है। यह विशेष रूप से 'मांगलिक दोष'—मंगल की अग्नि—को संबोधित करता है और क्या इसे रद्द किया जाता है या विशिष्ट ऊर्जा-संतुलन उपायों की आवश्यकता होती है। यह दोनों भागीदारों के लिए उनके अलग-अलग ग्रहों के स्वभाव के बीच के अंतर को पाटने के लिए विशिष्ट व्यवहार समायोजन प्रदान करके 'क्या हम टिक पाएंगे?' की चिंता को दूर करता है।"
    },
    astrologicalLogic: {
      en: "Utilizes the 'Ashta-Koota' (8-point) and 'Dasha-Koota' (10-point) matching systems. It analyzes the 7th house (Partnership) and 2nd house (Family) strength in both charts. Most importantly, it performs 'Bhava Milan'—checking if one partner's benefic planets fall into the other's 6th, 8th, or 12th houses (Dusthana), which can drain the relationship's energy regardless of a high Guna score.",
      hi: "'अष्ट-कूट' (8-बिंदु) और 'दश-कूट' (10-बिंदु) मिलान प्रणालियों का उपयोग करता है। यह दोनों चार्टों में 7वें भाव (साझेदारी) और 2वें भाव (परिवार) की ताकत का विश्लेषण करता है। सबसे महत्वपूर्ण बात यह है कि यह 'भाव मिलान' करता है—यह जांचता है कि क्या एक साथी के लाभकारी ग्रह दूसरे के छठे, आठवें या 12वें भाव (दुस्थान) में आते हैं, जो उच्च गुण स्कोर के बावजूद रिश्ते की ऊर्जा को खत्म कर सकते हैं।"
    },
    priceINR: "₹199", oldPriceINR: "₹399", priceUSD: "$3.99", oldPriceUSD: "$7.99"
  },
  3: {
    id: 3,
    title: { en: "Lal Kitab Report", hi: "लाल किताब रिपोर्ट" },
    whatIsIt: {
      en: "A unique, legendary predictive system often referred to as 'The Wonder Book of Astrology.' Lal Kitab focuses on the 'blind' influence of planets and specializes in practical, cost-effective remedies. It treats the horoscope as a dynamic debt (Rin) that can be repaid through simple daily actions. This report is highly sought after by those who find traditional Vedic remedies too complex or expensive.",
      hi: "एक अनूठी, प्रसिद्ध भविष्य कहने वाली प्रणाली जिसे अक्सर 'ज्योतिष की अद्भुत पुस्तक' कहा जाता है। लाल किताब ग्रहों के 'अंधे' प्रभाव पर ध्यान केंद्रित करती है और व्यावहारिक, लागत प्रभावी उपायों में विशेषज्ञता रखती है। यह कुंडली को एक गतिशील ऋण (ऋण) के रूप में मानती है जिसे सरल दैनिक कार्यों के माध्यम से चुकाया जा सकता है। यह रिपोर्ट उन लोगों द्वारा अत्यधिक मांग की जाती है जो पारंपरिक वैदिक उपायों को बहुत जटिल या महंगा पाते हैं।"
    },
    whatItFixes: {
      en: "Targets 'Unidentifiable Failures'—situations where everything seems right but nothing works. It fixes 'Pitru Rin' (Ancestral Debts) that block progress for generations. It provides highly specific, sometimes unconventional remedies (Upayas) like feeding specific animals, burying metal objects, or changing the way you store water to re-align your household energy and break stagnant luck cycles.",
      hi: "'अज्ञात विफलताओं' को लक्षित करता है—ऐसी स्थितियाँ जहाँ सब कुछ सही लगता है लेकिन कुछ भी काम नहीं करता है। यह 'पितृ ऋण' (पैतृक ऋण) को ठीक करता है जो पीढ़ियों तक प्रगति को रोकता है। यह अत्यधिक विशिष्ट, कभी-कभी अपरंपरागत उपाय (उपाय) प्रदान करता है जैसे विशिष्ट जानवरों को खिलाना, धातु की वस्तुओं को दफनाना, या आपके घर की ऊर्जा को फिर से संरेखित करने और ठहरे हुए भाग्य चक्रों को तोड़ने के लिए आपके पानी के भंडारण के तरीके को बदलना।"
    },
    astrologicalLogic: {
      en: "Diverges from standard Vedic logic by prioritizing the house (Bhava) over the sign (Rashi). It calculates 'Soya Grah' (Sleeping Planets) that need a specific 'stimulus' to wake up and start giving results. It identifies 'Bali Ka Bakra' (Sacrificial Planet) combinations where a strong planet is being neutralized by a weaker one, leading to specific life crises that traditional astrology might miss.",
      hi: "राशि (राशि) पर भाव (भाव) को प्राथमिकता देकर मानक वैदिक तर्क से अलग होता है। यह 'सोया ग्रह' (सोते हुए ग्रह) की गणना करता है जिन्हें जागने और परिणाम देना शुरू करने के लिए एक विशिष्ट 'उत्तेजना' की आवश्यकता होती है। यह 'बली का बकरा' (बलि का ग्रह) संयोजनों की पहचान करता है जहाँ एक मजबूत ग्रह को कमजोर ग्रह द्वारा निष्प्रभावी किया जा रहा है, जिससे विशिष्ट जीवन संकट पैदा होते हैं जिन्हें पारंपरिक ज्योतिष छोड़ सकता है।"
    },
    priceINR: "₹175", oldPriceINR: "₹349", priceUSD: "$3.49", oldPriceUSD: "$6.99"
  },
  4: {
    id: 4,
    title: { en: "Baby Name Report", hi: "बेबी नाम रिपोर्ट" },
    whatIsIt: {
      en: "A sacred naming guide derived from the vibrational science of 'Aksharas' (sounds). In Vedic culture, a name is not a label but a continuous mantra that the child will hear millions of times. This report ensures that the child's name vibrates in perfect harmony with the 'Janma Nakshatra' (Birth Star), providing a psychological and spiritual safety net for their entire future.",
      hi: "'अक्षरों' (ध्वनियों) के कंपन विज्ञान से प्राप्त एक पवित्र नामकरण मार्गदर्शिका। वैदिक संस्कृति में, नाम एक लेबल नहीं बल्कि एक निरंतर मंत्र है जिसे बच्चा लाखों बार सुनेगा। यह रिपोर्ट सुनिश्चित करती है कि बच्चे का नाम 'जन्म नक्षत्र' (जन्म तारा) के साथ पूर्ण सद्भाव में कंपन करता है, जो उनके पूरे भविष्य के लिए एक मनोवैज्ञानिक और आध्यात्मिक सुरक्षा जाल प्रदान करता है।"
    },
    whatItFixes: {
      en: "Eliminates the 'Vibrational Conflict' that causes childhood restlessness, frequent illnesses, or educational blocks. A name chosen without Nakshatra alignment can cause a 'personality-soul' mismatch. This report ensures the child starts life with the 'Dosha-free' first letter, promoting physical health, early intelligence (Buddhi), and a calm temperament.",
      hi: "'कंपन संघर्ष' को समाप्त करता है जो बचपन की बेचैनी, बार-बार होने वाली बीमारियों या शैक्षिक बाधाओं का कारण बनता है। नक्षत्र संरेखण के बिना चुना गया नाम 'व्यक्तित्व-आत्मा' का बेमेल कारण बन सकता है। यह रिपोर्ट सुनिश्चित करती है कि बच्चा शारीरिक स्वास्थ्य, प्रारंभिक बुद्धि (बुद्धि) और शांत स्वभाव को बढ़ावा देने वाले 'दोष-मुक्त' पहले अक्षर के साथ जीवन शुरू करे।"
    },
    astrologicalLogic: {
      en: "Maps the Moon's exact position into one of the 27 Nakshatras and, more specifically, the exact 'Pada' (Quarter) of that Nakshatra. Each Pada has a specific seed syllable (Varna). We calculate which syllable strengthens the Lagna and the Moon, avoiding syllables that correspond to the child's 'Enemy Signs' or 'Negative Houses' like the 6th, 8th, or 12th.",
      hi: "चंद्रमा की सटीक स्थिति को 27 नक्षत्रों में से एक और, विशेष रूप से, उस नक्षत्र के सटीक 'पद' (तिमाही) में मैप करता है। प्रत्येक पद में एक विशिष्ट बीज अक्षर (वर्ण) होता है। हम गणना करते हैं कि कौन सा अक्षर लग्न और चंद्रमा को मजबूत करता है, उन अक्षरों से बचते हैं जो बच्चे की 'शत्रु राशियों' या 'नकारात्मक भावों' जैसे कि छठे, आठवें या 12वें भाव के अनुरूप होते हैं।"
    },
    priceINR: "₹99", oldPriceINR: "₹199", priceUSD: "$1.99", oldPriceUSD: "$3.99"
  },
  5: {
    id: 5,
    title: { en: "Name Correction Report", hi: "नाम सुधार रिपोर्ट" },
    whatIsIt: {
      en: "A powerful numerological adjustment for adults whose current name frequency is in conflict with their birth destiny. It uses the science of numbers (Sankhya Shastra) to bridge the gap between your 'Identity' and your 'Destiny.' This report is a spiritual 're-branding' designed to align your signature, social name, and official documents with the luckiest available frequencies.",
      hi: "उन वयस्कों के लिए एक शक्तिशाली अंकशास्त्रीय समायोजन जिनका वर्तमान नाम आवृत्ति उनके जन्म भाग्य के साथ संघर्ष में है। यह आपकी 'पहचान' और आपके 'भाग्य' के बीच की खाई को पाटने के लिए अंकों के विज्ञान (संख्या शास्त्र) का उपयोग करता है। यह रिपोर्ट एक आध्यात्मिक 'री-ब्रांडिंग' है जिसे आपके हस्ताक्षर, सामाजिक नाम और आधिकारिक दस्तावेजों को सबसे भाग्यशाली उपलब्ध आवृत्तियों के साथ संरेखित करने के लिए डिज़ाइन किया गया है।"
    },
    whatItFixes: {
      en: "Breaks the 'Invisible Ceiling.' If you work 100% but get only 20% results, your name might be vibrating at a 'struggle' number like 16, 26, or 44. This report fixes this by suggesting a single letter addition or removal to transform your 'Name Number' into a 'Success Number,' removing the friction from your interactions with the world and opening doors to fame and wealth.",
      hi: "'अदृश्य छत' को तोड़ता है। यदि आप 100% काम करते हैं लेकिन केवल 20% परिणाम प्राप्त करते हैं, तो आपका नाम 16, 26 या 44 जैसे 'संघर्ष' अंक पर कंपन कर सकता है। यह रिपोर्ट आपके 'नाम अंक' को 'सफलता अंक' में बदलने के लिए एक अक्षर जोड़ने या हटाने का सुझाव देकर इसे ठीक करती है, जिससे दुनिया के साथ आपकी बातचीत से घर्षण दूर हो जाता है और प्रसिद्धि और धन के द्वार खुल जाते हैं।"
    },
    astrologicalLogic: {
      en: "Combines the 'Chaldean Numerology' system with 'Vedic Astro-Numerology.' We calculate your Life Path (Total of Date of Birth) and find its 'Enemy Numbers.' We ensure your Name Number total is 'In-Harmony' with your Lagna Lord. For example, if your Lagna Lord is Venus, we aim for a Name Number of 6 or 1, avoiding numbers that cause planetary war with your chart's dominant energy.",
      hi: "'चाल्डियन अंकशास्त्र' प्रणाली को 'वैदिक ज्योतिष-अंकशास्त्र' के साथ मिलाता है। हम आपके जीवन पथ (जन्म तिथि का कुल योग) की गणना करते हैं और उसके 'शत्रु अंक' ढूंढते हैं। हम सुनिश्चित करते हैं कि आपका नाम अंक योग आपके लग्न स्वामी के साथ 'सद्भाव में' है। उदाहरण के लिए, यदि आपका लग्न स्वामी शुक्र है, तो हम 6 या 1 के नाम अंक का लक्ष्य रखते हैं, उन अंकों से बचते हैं जो आपके चार्ट की प्रमुख ऊर्जा के साथ ग्रहों के युद्ध का कारण बनते हैं।"
    },
    priceINR: "₹149", oldPriceINR: "₹299", priceUSD: "$2.99", oldPriceUSD: "$5.99"
  },
  6: {
    id: 6,
    title: { en: "Career Report", hi: "करियर रिपोर्ट" },
    whatIsIt: {
      en: "A strategic, high-precision professional roadmap that identifies your true 'Vocation' versus a mere 'Job.' This report examines your leadership potential, your ability to handle authority, and the specific industries (IT, Law, Medical, Arts, etc.) that will bring you the highest financial and psychological ROI. It is the ultimate guide for anyone feeling stagnant or considering a major professional pivot.",
      hi: "एक रणनीतिक, उच्च-सटीक पेशेवर रोडमैप जो आपके वास्तविक 'व्यवसाय' बनाम केवल 'नौकरी' की पहचान करता है। यह रिपोर्ट आपकी नेतृत्व क्षमता, अधिकार को संभालने की आपकी क्षमता और उन विशिष्ट उद्योगों (आईटी, कानून, चिकित्सा, कला, आदि) की जांच करती है जो आपको उच्चतम वित्तीय और मनोवैज्ञानिक आरओआई (ROI) प्रदान करेंगे। यह किसी भी व्यक्ति के लिए अंतिम मार्गदर्शिका है जो खुद को स्थिर महसूस कर रहा है या एक बड़े पेशेवर बदलाव पर विचार कर रहा है।"
    },
    whatItFixes: {
      en: "Fixes the 'Career Mismatch' that leads to burnout and depression. It answers the critical question: 'Am I meant for stable service (Job) or high-growth Business?' It identifies the exact 'Dasha' periods when you should seek a promotion, launch a startup, or remain conservative to avoid job loss or public humiliation (Apaya).",
      hi: "'करियर बेमेल' को ठीक करता है जो बर्नआउट और अवसाद की ओर ले जाता है। यह महत्वपूर्ण प्रश्न का उत्तर देता है: 'क्या मैं स्थिर सेवा (नौकरी) या उच्च विकास वाले व्यवसाय के लिए बना हूँ?' यह उन सटीक 'दशा' अवधियों की पहचान करता है जब आपको पदोन्नति की तलाश करनी चाहिए, स्टार्टअप शुरू करना चाहिए, या नौकरी छूटने या सार्वजनिक अपमान (अपय) से बचने के लिए रूढ़िवादी रहना चाहिए।"
    },
    astrologicalLogic: {
      en: "Centers on the 10th House (Karma-Sthana) and the 6th House (Service). We deep-dive into the 'Dashamsha' (D10) divisional chart to find the 'hidden' professional potential. We also calculate the strength of the 'Amatyakaraka'—the planet that represents your vocational soul—and how its relationship with the current Mahadasha Lord is either accelerating or blocking your rise.",
      hi: "10वें भाव (कर्म-स्थान) और छठे भाव (सेवा) पर केंद्रित है। हम 'छिपी हुई' पेशेवर क्षमता खोजने के लिए 'दशमांश' (D10) वर्गीय कुंडली में गहराई से गोचर करते हैं। हम 'अमात्यकारक'—वह ग्रह जो आपकी व्यावसायिक आत्मा का प्रतिनिधित्व करता है—की शक्ति की भी गणना करते हैं और वर्तमान महादशा स्वामी के साथ उसका संबंध आपकी उन्नति को कैसे तेज कर रहा है या रोक रहा है।"
    },
    priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99"
  },
  7: {
    id: 7,
    title: { en: "Love Report", hi: "लव रिपोर्ट" },
    whatIsIt: {
      en: "A deep dive into your romantic blueprint, attraction factors, and the timing of finding a long-term partner. This report decodes your emotional needs and how you perceive intimacy, explaining why you are drawn to specific types of individuals and what constitutes a 'soulmate' for your specific chart.",
      hi: "आपके रोमांटिक ब्लूप्रिंट, आकर्षण कारकों और दीर्घकालिक साथी खोजने के समय का गहरा विश्लेषण। यह रिपोर्ट आपकी भावनात्मक जरूरतों और आप अंतरंगता को कैसे समझते हैं, इसे डिकोड करती है, यह समझाते हुए कि आप विशिष्ट प्रकार के व्यक्तियों की ओर क्यों आकर्षित होते हैं और आपके विशिष्ट चार्ट के लिए 'सोलमेट' क्या है।"
    },
    whatItFixes: {
      en: "Eliminates the 'Heartbreak Loop'—the cycle of repeating toxic relationship patterns or choosing emotionally unavailable partners. It identifies afflictions to Venus or the 7th Lord and provides practical remedies to heal the heart and clear the path for a harmonious, stable union.",
      hi: "'हार्टब्रेक लूप' को समाप्त करता है—विषाक्त संबंध पैटर्न को दोहराने या भावनात्मक रूप से अनुपलब्ध भागीदारों को चुनने का चक्र। यह शुक्र या 7वें स्वामी के दोषों की पहचान करता है और हृदय को ठीक करने और एक सामंजस्यपूर्ण, स्थिर मिलान के लिए रास्ता साफ करने के लिए व्यावहारिक उपाय प्रदान करता है।"
    },
    astrologicalLogic: {
      en: "Analyzes the 5th (Romance) and 7th (Partnership) houses. We examine 'Venus' (for Men) and 'Mars/Jupiter' (for Women) as natural significators. Importantly, we check 'Upapada Lagna' to see the physical and social profile of the destined partner and use the D9 (Navamsha) chart to see if the love potential manifests into marriage.",
      hi: "5वें (रोमांस) और 7वें (साझेदारी) भावों का विश्लेषण करता है। हम प्राकृतिक संकेतकों के रूप में 'शुक्र' (पुरुषों के लिए) और 'मंगल/बृहस्पति' (महिलाओं के लिए) की जांच करते हैं। महत्वपूर्ण रूप से, हम नियत साथी के शारीरिक और सामाजिक प्रोफाइल को देखने के लिए 'उपपद लग्न' की जांच करते हैं और यह देखने के लिए D9 (नवांश) चार्ट का उपयोग करते हैं कि क्या प्रेम क्षमता विवाह में प्रकट होती है।"
    },
    priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99"
  },
  8: {
    id: 8,
    title: { en: "Fortune Report", hi: "भाग्य रिपोर्ट" },
    whatIsIt: {
      en: "A master manual for your 'Luck Quotient.' Some people are born under a lucky star; this report identifies where your specific luck lies. It covers your auspicious days, lucky numbers, gemstones, and colors, providing a guide to the areas of life where opportunities will flow most naturally for you.",
      hi: "आपके 'भाग्य भागफल' के लिए एक मास्टर मैनुअल। कुछ लोग भाग्यशाली सितारों के नीचे पैदा होते हैं; यह रिपोर्ट पहचानती है कि आपका विशिष्ट भाग्य कहाँ है। इसमें आपके शुभ दिन, भाग्यशाली अंक, रत्न और रंग शामिल हैं, जो जीवन के उन क्षेत्रों के लिए एक मार्गदर्शिका प्रदान करते हैं जहाँ अवसर आपके लिए सबसे स्वाभाविक रूप से प्रवाहित होंगे।"
    },
    whatItFixes: {
      en: "Fixes the 'Missing by a Whisker' syndrome. By understanding when your 'Fortune Window' is open, you can time your significant moves (applying for a visa, launching a project) to coincide with your peak planetary support, reducing the friction and obstacles usually faced during low-luck cycles.",
      hi: "'बाल-बाल चूकने' के सिंड्रोम को ठीक करता है। यह समझकर कि आपका 'भाग्य द्वार' कब खुला है, आप अपने महत्वपूर्ण कदमों (वीजा के लिए आवेदन करना, एक परियोजना शुरू करना) को अपने चरम ग्रह समर्थन के साथ मेल खाने के लिए समयबद्ध कर सकते हैं, जिससे कम-भाग्य चक्रों के दौरान आमतौर पर सामना किए जाने वाले घर्षण और बाधाएं कम हो जाती हैं।"
    },
    astrologicalLogic: {
      en: "Evaluates the 9th House (Bhagya Sthana) and the strength of the 9th Lord. We calculate the 'Ashtakavarga' score for the 9th house to see the quantity of luck. We also look at 'Tithi' and 'Nakshatra' compatibility to find the specific days of the month when your personal energy is at its absolute highest.",
      hi: "9वें भाव (भाग्य स्थान) और 9वें स्वामी की शक्ति का मूल्यांकन करता है। हम भाग्य की मात्रा देखने के लिए 9वें भाव के 'अष्टकवर्ग' स्कोर की गणना करते हैं। हम महीने के उन विशिष्ट दिनों को खोजने के लिए 'तिथि' और 'नक्षत्र' अनुकूलता को भी देखते हैं जब आपकी व्यक्तिगत ऊर्जा अपने पूर्ण उच्चतम स्तर पर होती है।"
    },
    priceINR: "₹199", oldPriceINR: "₹399", priceUSD: "$3.99", oldPriceUSD: "$7.99"
  },
  9: {
    id: 9,
    title: { en: "Fortune Report Plus", hi: "फॉर्च्यून रिपोर्ट प्लस" },
    whatIsIt: {
      en: "An advanced wealth and prosperity audit. This goes beyond simple luck to examine the structural 'Wealth Combinations' in your chart. It identifies whether you are meant for inheritance, self-made riches, or sudden gains, and provides a strategy to activate these dormant wealth-triggers.",
      hi: "एक उन्नत धन और समृद्धि ऑडिट। यह आपके चार्ट में संरचनात्मक 'धन योग' की जांच करने के लिए साधारण भाग्य से परे जाता है। यह पहचानता है कि क्या आप विरासत, स्व-निर्मित धन, या अचानक लाभ के लिए बने हैं, और इन निष्क्रिय धन-ट्रिगर्स को सक्रिय करने के लिए एक रणनीति प्रदान करता है।"
    },
    whatItFixes: {
      en: "Fixes the 'Wealth Leak'—the situation where money comes in but never stays. It identifies if your 12th house (Losses) is draining your 11th house (Gains) and provides specific financial 'remedies' to plug the leak and ensure that earned wealth actually accumulates as assets.",
      hi: "'धन रिसाव' को ठीक करता है—वह स्थिति जहाँ पैसा आता है लेकिन कभी रुकता नहीं है। यह पहचानता है कि क्या आपका 12वां भाव (हानि) आपके 11वें भाव (लाभ) को खत्म कर रहा है और रिसाव को बंद करने के लिए विशिष्ट वित्तीय 'उपाय' प्रदान करता है और यह सुनिश्चित करता है कि अर्जित धन वास्तव में संपत्ति के रूप में संचित हो।"
    },
    astrologicalLogic: {
      en: "Deep-dives into 'Dhana Yogas' like Lakshmi Yoga and Gaj Kesari Yoga. We calculate the 'Indu Lagna'—a specialized point used only for measuring financial status. We also analyze the 2nd (Assets), 5th (Speculation), and 11th (Income) lords and their current dasha connectivity to predict wealth booms.",
      hi: "'धन योगों' जैसे लक्ष्मी योग और गज केसरी योग में गहराई से गोचर करता है। हम 'इंदु लग्न' की गणना करते हैं—एक विशेष बिंदु जिसका उपयोग केवल वित्तीय स्थिति को मापने के लिए किया जाता है। हम धन के उछाल की भविष्यवाणी करने के लिए दूसरे (संपत्ति), 5वें (सट्टा), और 11वें (आय) स्वामियों और उनकी वर्तमान दशा कनेक्टिविटी का भी विश्लेषण करते हैं।"
    },
    priceINR: "₹399", oldPriceINR: "₹799", priceUSD: "$7.99", oldPriceUSD: "$15.99"
  },
  10: {
    id: 10,
    title: { en: "When Will I Get Rich?", hi: "मैं अमीर कब बनूंगा?" },
    whatIsIt: {
      en: "A hyper-targeted financial timing report that cuts through all the noise to focus on one thing: Wealth Accumulation. It identifies the 'Golden Windows' of your life—the specific years and months where your 'Dhana Yogas' (Wealth combinations) will be activated by current planetary transits and time-cycles (Dashas). This is for those who want to know when to strike while the iron is hot and when to protect their assets.",
      hi: "एक हाइपर-लक्षित वित्तीय समय रिपोर्ट जो केवल एक चीज पर ध्यान केंद्रित करने के लिए सभी शोर को काट देती है: धन संचय। यह आपके जीवन के 'स्वर्ण द्वार' की पहचान करती है—वे विशिष्ट वर्ष और महीने जहाँ आपके 'धन योग' (धन संयोजन) वर्तमान ग्रहों के गोचर और समय-चक्रों (दशाओं) द्वारा सक्रिय होंगे। यह उनके लिए है जो जानना चाहते हैं कि कब लोहा गर्म होने पर प्रहार करना है और कब अपनी संपत्ति की रक्षा करनी है।"
    },
    whatItFixes: {
      en: "Eliminates financial anxiety and 'Missed Opportunities.' Many people fail because they invest during a 'Loss Cycle' or remain fearful during a 'Profit Cycle.' This report provides a clear, data-backed timeline for property purchase, stock market gains, or business windfalls, allowing you to synchronize your physical effort with your cosmic financial peak.",
      hi: "वित्तीय चिंता और 'छूटे हुए अवसरों' को समाप्त करता है। बहुत से लोग इसलिए असफल हो जाते हैं क्योंकि वे 'हानि चक्र' के दौरान निवेश करते हैं या 'लाभ चक्र' के दौरान डरे रहते हैं। यह रिपोर्ट संपत्ति की खरीद, शेयर बाजार के लाभ, या व्यावसायिक लाभ के लिए एक स्पष्ट, डेटा-समर्थित समयरेखा प्रदान करती है, जिससे आप अपने भौतिक प्रयास को अपने ब्रह्मांडीय वित्तीय शिखर के साथ सिंक्रनाइज़ कर सकते हैं।"
    },
    astrologicalLogic: {
      en: "Scans for 32 specialized 'Dhana Yogas' including Mahalakshmi Yoga and Saraswati Yoga. We calculate the strength of the 'Indu Lagna' (The Moon's Wealth Ascendant) and the 'Arudha Lagna' to see how much wealth the world will actually allow you to keep. We precisely map the Antardasha of the 2nd (Savings) and 11th (Income) lords to find the exact intersect points for massive wealth creation.",
      hi: "महालक्ष्मी योग और सरस्वती योग सहित 32 विशिष्ट 'धन योगों' के लिए स्कैन करता है। हम 'इंदु लग्न' (चंद्रमा का धन लग्न) और 'आरूढ़ लग्न' की शक्ति की गणना करते हैं ताकि यह देखा जा सके कि दुनिया वास्तव में आपको कितना धन रखने की अनुमति देगी। हम भारी धन सृजन के लिए सटीक प्रतिच्छेदन बिंदु खोजने के लिए दूसरे (बचत) और 11वें (आय) स्वामियों की अंतर्दशा को सटीक रूप से मैप करते हैं।"
    },
    priceINR: "₹299", oldPriceINR: "₹599", priceUSD: "$5.99", oldPriceUSD: "$11.99"
  },
  11: {
    id: 11,
    title: { en: "2026 Yearly Horoscope Report", hi: "2026 वार्षिक राशिफल रिपोर्ट" },
    whatIsIt: {
      en: "A comprehensive monthly breakdown of the year 2026. This report acts as your personal GPS for the next 12 months, highlighting the key planetary shifts that will define your health, career, and relationships month-by-month.",
      hi: "वर्ष 2026 का एक व्यापक मासिक विश्लेषण। यह रिपोर्ट अगले 12 महीनों के लिए आपके व्यक्तिगत जीपीएस के रूप में कार्य करती है, जो प्रमुख ग्रहों के बदलावों को उजागर करती है जो महीने-दर-महीने आपके स्वास्थ्य, करियर और रिश्तों को परिभाषित करेंगे।"
    },
    whatItFixes: {
      en: "Fixes 'Uncertainty Paralysis.' Instead of worrying about what the year holds, you can plan your major life events (marriage, travel, job changes) during the specific months where your personal chart has the maximum support from transiting planets.",
      hi: "'अनिश्चितता पक्षाघात' को ठीक करता है। वर्ष में क्या होगा, इसकी चिंता करने के बजाय, आप उन विशिष्ट महीनों के दौरान अपने प्रमुख जीवन कार्यक्रमों (विवाह, यात्रा, नौकरी में बदलाव) की योजना बना सकते हैं जहाँ आपके व्यक्तिगत चार्ट में गोचर ग्रहों का अधिकतम समर्थन है।"
    },
    astrologicalLogic: {
      en: "Analyzes 'Gochar' (Transits) against your Natal Moon. We track the movement of Jupiter (Luck), Saturn (Discipline), and Rahu/Ketu (Sudden shifts) through your houses. We also look at 'Vimshottari Dasha' transitions occurring within the year 2026.",
      hi: "आपके जन्म के चंद्रमा के विरुद्ध 'गोचर' (ट्रांजिट) का विश्लेषण करता है। हम आपके भावों के माध्यम से बृहस्पति (भाग्य), शनि (अनुशासन), और राहु/केतु (अचानक बदलाव) की गति को ट्रैक करते हैं। हम वर्ष 2026 के भीतर होने वाले 'विंशोत्तरी दशा' संक्रमणों को भी देखते हैं।"
    },
    priceINR: "₹399", oldPriceINR: "₹799", priceUSD: "$7.99", oldPriceUSD: "$15.99"
  },
  12: {
    id: 12,
    title: { en: "Varshphal Report", hi: "वर्षफल रिपोर्ट" },
    whatIsIt: {
      en: "A specialized Birthday-to-Birthday report using the Tajika system. Every birthday marks a 'New Solar Return.' This report identifies the 'Lord of the Year' and the specific theme that will dominate your life for this particular 12-month cycle.",
      hi: "ताजिक प्रणाली का उपयोग करते हुए एक विशेष जन्मदिन-से-जन्मदिन रिपोर्ट। हर जन्मदिन एक 'नया सौर रिटर्न' चिह्नित करता है। यह रिपोर्ट 'वर्ष के स्वामी' और विशिष्ट विषय की पहचान करती है जो इस विशेष 12-महीने के चक्र के लिए आपके जीवन पर हावी होगा।"
    },
    whatItFixes: {
      en: "Fixes 'Generic Predictions.' While standard horoscopes apply to your sign, Varshphal is unique to your exact birthday. It identifies if this is a year for 'Accumulation,' 'Expenditure,' or 'Transformation,' allowing you to adjust your expectations and effort accordingly.",
      hi: "'सामान्य भविष्यवाणियों' को ठीक करता है। जबकि मानक राशिफल आपकी राशि पर लागू होते हैं, वर्षफल आपके सटीक जन्मदिन के लिए अद्वितीय है। यह पहचानता है कि क्या यह 'संचय,' 'व्यय,' या 'परिवर्तन' का वर्ष है, जिससे आप अपनी उम्मीदों और प्रयासों को उसी के अनुसार समायोजित कर सकते हैं।"
    },
    astrologicalLogic: {
      en: "Uses Tajika Yogas and the 'Muntha'—a sensitive mathematical point that moves one house every year. We analyze the 'Varsheshwara' (Year Lord) and the annual chart strength to predict specific outcomes for health, wealth, and family.",
      hi: "ताजिक योगों और 'मुन्था' का उपयोग करता है—एक संवेदनशील गणितीय बिंदु जो हर साल एक भाव आगे बढ़ता है। हम स्वास्थ्य, धन और परिवार के लिए विशिष्ट परिणामों की भविष्यवाणी करने के लिए 'वर्षेश्वर' (वर्ष स्वामी) और वार्षिक चार्ट शक्ति का विश्लेषण करते हैं।"
    },
    priceINR: "₹349", oldPriceINR: "₹699", priceUSD: "$6.99", oldPriceUSD: "$13.99"
  },
  13: {
    id: 13,
    title: { en: "Saturn Transit Report", hi: "शनि गोचर रिपोर्ट" },
    whatIsIt: {
      en: "A dedicated analysis of Saturn’s movement through your houses. Saturn is the taskmaster of the zodiac; its transit determines where you will face hard lessons, delays, but also where you will build permanent foundations.",
      hi: "आपके भावों के माध्यम से शनि की गति का एक समर्पित विश्लेषण। शनि राशि चक्र का कार्य-प्रशिक्षक है; इसका गोचर यह निर्धारित करता है कि आप कठिन पाठ, देरी का सामना कहाँ करेंगे, लेकिन यह भी कि आप स्थायी नींव कहाँ बनाएंगे।"
    },
    whatItFixes: {
      en: "Fixes 'Discipline Gaps.' Saturn forces you to face what you have been avoiding. This report tells you which house is under pressure, so you can work harder in that area and prevent Saturn from causing sudden 'corrective' life events.",
      hi: "'अनुशासन अंतराल' को ठीक करता है। शनि आपको उस चीज़ का सामना करने के लिए मजबूर करता है जिससे आप बचते रहे हैं। यह रिपोर्ट आपको बताती है कि कौन सा भाव दबाव में है, ताकि आप उस क्षेत्र में कड़ी मेहनत कर सकें और शनि को अचानक 'सुधारात्मक' जीवन कार्यक्रमों का कारण बनने से रोक सकें।"
    },
    astrologicalLogic: {
      en: "Tracks Saturn's 2.5-year stay in a house relative to your Moon and Ascendant. We calculate 'Ashtakavarga' points to see if Saturn will be a 'Teacher' or a 'Punisher' for you personally during this cycle.",
      hi: "आपके चंद्रमा और लग्न के सापेक्ष एक भाव में शनि के 2.5 साल के प्रवास को ट्रैक करता है। हम यह देखने के लिए 'अष्टकवर्ग' बिंदुओं की गणना करते हैं कि क्या शनि इस चक्र के दौरान व्यक्तिगत रूप से आपके लिए 'शिक्षक' या 'दंडक' होगा।"
    },
    priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99"
  },
  14: {
    id: 14,
    title: { en: "Jupiter Transit Report", hi: "बृहस्पति गोचर रिपोर्ट" },
    whatIsIt: {
      en: "A report on the planet of luck, wisdom, and expansion. Jupiter’s transit shows where doors will open and where you can expect sudden growth, spiritual insights, or financial windfalls.",
      hi: "भाग्य, ज्ञान और विस्तार के ग्रह पर एक रिपोर्ट। बृहस्पति का गोचर दिखाता है कि दरवाजे कहाँ खुलेंगे और आप कहाँ अचानक विकास, आध्यात्मिक अंतर्दृष्टि, या वित्तीय लाभ की उम्मीद कर सकते हैं।"
    },
    whatItFixes: {
      en: "Fixes 'Missed Luck.' Many people are unaware when they have cosmic support. This report highlights the house where Jupiter is bestowing its 'Amrit' (Nectar), identifying the best time to take risks or start new ventures.",
      hi: "'छूटे हुए भाग्य' को ठीक करता है। बहुत से लोग अनजान होते हैं जब उनके पास ब्रह्मांडीय समर्थन होता है। यह रिपोर्ट उस भाव पर प्रकाश डालती है जहाँ बृहस्पति अपना 'अमृत' प्रदान कर रहा है, जोखिम लेने या नए उद्यम शुरू करने के लिए सबसे अच्छे समय की पहचान करती है।"
    },
    astrologicalLogic: {
      en: "Analyzes 'Guru Gochar' and its aspects (Drishti). We check if Jupiter is transiting over your natal planets, which often triggers major life breakthroughs. We also analyze the 'Pushkara Navamsha' strength for the transit duration.",
      hi: "'गुरु गोचर' और उसके पहलुओं (दृष्टि) का विश्लेषण करता है। हम जांचते हैं कि क्या बृहस्पति आपके जन्म के ग्रहों के ऊपर से गोचर कर रहा है, जो अक्सर प्रमुख जीवन सफलताओं को गति देता है। हम गोचर की अवधि के लिए 'पुष्कर नवांश' शक्ति का भी विश्लेषण करते हैं।"
    },
    priceINR: "₹249", oldPriceINR: "₹499", priceUSD: "$4.99", oldPriceUSD: "$9.99"
  },
  15: {
    id: 15,
    title: { en: "Rahu Ketu Report", hi: "राहु केतु रिपोर्ट" },
    whatIsIt: {
      en: "An analysis of the Shadow Planets (Lunar Nodes) which drive our deepest desires and karmic detachments. This report shows where Rahu is creating 'Obsession' and where Ketu is forcing 'Detachment' in your current life phase.",
      hi: "छाया ग्रहों (चंद्र नोड्स) का एक विश्लेषण जो हमारी गहरी इच्छाओं और कर्मिक अलगाव को संचालित करते हैं। यह रिपोर्ट दिखाती है कि आपके वर्तमान जीवन चरण में राहु कहाँ 'जुनून' पैदा कर रहा है और केतु कहाँ 'अलगाव' के लिए मजबूर कर रहा है।"
    },
    whatItFixes: {
      en: "Fixes 'Sudden Chaos.' Rahu/Ketu cause illusions and unexpected shifts. This report provides the grounding needed to navigate their energy, helping you avoid impulsive mistakes and utilize Rahu’s drive for material success without falling into its traps.",
      hi: "'अचानक अराजकता' को ठीक करता है। राहु/केतु भ्रम और अप्रत्याशित बदलाव पैदा करते हैं। यह रिपोर्ट उनकी ऊर्जा को नेविगेट करने के लिए आवश्यक आधार प्रदान करती है, जिससे आपको आवेगी गलतियों से बचने और इसके जाल में फंसे बिना भौतिक सफलता के लिए राहु के अभियान का उपयोग करने में मदद मिलती है।"
    },
    astrologicalLogic: {
      en: "Calculates the Rahu-Ketu axis in your chart (18-month transit). We look at the 'Dispositor' strength of these nodes to see if the resulting changes will be stable or volatile, and check for 'Kala Sarpa' impacts during the transit.",
      hi: "आपके चार्ट में राहु-केतु अक्ष की गणना करता है (18 महीने का गोचर)। हम यह देखने के लिए इन नोड्स की 'डिस्पोजिटर' शक्ति को देखते हैं कि परिणामी परिवर्तन स्थिर होंगे या अस्थिर, और गोचर के दौरान 'काल सर्प' प्रभावों की जांच करते हैं।"
    },
    priceINR: "₹299", oldPriceINR: "₹599", priceUSD: "$5.99", oldPriceUSD: "$11.99"
  },
  16: {
    id: 16,
    title: { en: "Kaal Sarp And Manglik Dosh", hi: "काल सर्प और मांगलिक दोष" },
    whatIsIt: {
      en: "A precision report identifying the two most feared doshas. It clarifies if you are truly Manglik or have Kaal Sarp, and whether these are actually canceled (Nivaran) by other planetary strengths in your chart.",
      hi: "दो सबसे डरावने दोषों की पहचान करने वाली एक सटीक रिपोर्ट। यह स्पष्ट करती है कि क्या आप वास्तव में मांगलिक हैं या काल सर्प है, और क्या ये वास्तव में आपके चार्ट में अन्य ग्रहों की ताकत से रद्द (निवारण) हो गए हैं।"
    },
    whatItFixes: {
      en: "Fixes 'Misguided Fear.' Many people think these doshas ruin life. This report identifies the *exact* type (there are 12 types of Kaal Sarp) and provides modern, practical remedies to turn these 'curses' into 'blessings' through energy alignment.",
      hi: "'गुमराह डर' को ठीक करता है। बहुत से लोग सोचते हैं कि ये दोष जीवन बर्बाद कर देते हैं। यह रिपोर्ट *सटीक* प्रकार (काल सर्प के 12 प्रकार हैं) की पहचान करती है और इन 'श्रापों' को ऊर्जा संरेखण के माध्यम से 'आशीर्वाद' में बदलने के लिए आधुनिक, व्यावहारिक उपाय प्रदान करती है।"
    },
    astrologicalLogic: {
      en: "Analyzes Mars placement in 1/4/7/8/12 houses for Manglik status. For Kaal Sarp, we check if all planets are hemmed between Rahu and Ketu, and evaluate 'Yogakaraka' support to see if the dosha's power is weakened.",
      hi: "मांगलिक स्थिति के लिए 1/4/7/8/12 भावों में मंगल की स्थिति का विश्लेषण करता है। काल सर्प के लिए, हम जांचते हैं कि क्या सभी ग्रह राहु और केतु के बीच घिरे हुए हैं, और यह देखने के लिए 'योगकारक' समर्थन का मूल्यांकन करते हैं कि क्या दोष की शक्ति कमजोर हुई है।"
    },
    priceINR: "₹349", oldPriceINR: "₹699", priceUSD: "$6.99", oldPriceUSD: "$13.99"
  },
  17: {
    id: 17,
    title: { en: "Sade Sati Report", hi: "साढ़े साती रिपोर्ट" },
    whatIsIt: {
      en: "The definitive survival and transformation guide for the 7.5-year transit of Saturn (Shani) over your natal Moon. While Sade Sati is widely feared, it is actually a period of 'Cosmic Auditing.' This report breaks down the cycle into three distinct phases—Rising, Peak, and Setting—providing a psychological and tactical roadmap to navigate the pressure, delays, and profound lessons that define this period.",
      hi: "आपके जन्म के चंद्रमा पर शनि के 7.5 साल के गोचर के लिए निश्चित उत्तरजीविता और परिवर्तन मार्गदर्शिका। जबकि साढ़े साती से व्यापक रूप से डरा जाता है, यह वास्तव में 'ब्रह्मांडीय ऑडिटिंग' की अवधि है। यह रिपोर्ट चक्र को तीन अलग-अलग चरणों—उदय, शिखर और अस्त—में विभाजित करती है, जो इस अवधि को परिभाषित करने वाले दबाव, देरी और गहन पाठों को नेविगेट करने के लिए एक मनोवैज्ञानिक और सामरिक रोडमैप प्रदान करती है।"
    },
    whatItFixes: {
      en: "Fixes 'Paralyzing Fear' and 'Planetary Friction.' Most people suffer during Sade Sati because they fight the discipline Saturn demands. This report identifies exactly where Saturn is 'testing' you—health, family, or career—and provides specific rituals, mantras, and behavioral changes to transform a period of potential suffering into a period of massive character-building and long-term legacy creation.",
      hi: "'पंगु बना देने वाले डर' और 'ग्रहों के घर्षण' को ठीक करता है। अधिकांश लोग साढ़े साती के दौरान पीड़ित होते हैं क्योंकि वे उस अनुशासन से लड़ते हैं जिसकी शनि मांग करता है। यह रिपोर्ट सटीक रूप से पहचानती है कि शनि आपको कहाँ 'परख' रहा है—स्वास्थ्य, परिवार या करियर—और संभावित पीड़ा की अवधि को विशाल चरित्र-निर्माण और दीर्घकालिक विरासत निर्माण की अवधि में बदलने के लिए विशिष्ट अनुष्ठान, मंत्र और व्यवहार परिवर्तन प्रदान करती है।"
    },
    astrologicalLogic: {
      en: "Tracks Saturn's movement through the 12th, 1st, and 2nd houses from your Moon sign. We employ 'Ashtakavarga' logic—if your Moon sign has high points (Bindus), even a peak Sade Sati can make you a global leader. We also evaluate the 'Dhaiya' (2.5-year mini cycles) and check if Saturn's transit is aspecting your natal Sun or Mars, which can intensify the psychological heat.",
      hi: "आपकी चंद्र राशि से 12वें, 1वें और 2वें भावों के माध्यम से शनि की गति को ट्रैक करता है। हम 'अष्टकवर्ग' तर्क का उपयोग करते हैं—यदि आपकी चंद्र राशि में उच्च अंक (बिंदु) हैं, तो एक शिखर साढ़े साती भी आपको वैश्विक नेता बना सकती है। हम 'ढैया' (2.5 साल के मिनी चक्र) का भी मूल्यांकन करते हैं और जांचते हैं कि क्या शनि का गोचर आपके जन्म के सूर्य या मंगल पर दृष्टि डाल रहा है, जो मनोवैज्ञानिक गर्मी को तेज कर सकता है।"
    },
    priceINR: "₹449", oldPriceINR: "₹899", priceUSD: "$8.99", oldPriceUSD: "$17.99"
  },
  18: {
    id: 18,
    title: { en: "Complete Numerology Report", hi: "पूर्ण अंकज्योतिष रिपोर्ट" },
    whatIsIt: {
      en: "A roadmap of your life through the vibration of numbers. Every digit in your birth date and every letter in your name has a frequency that dictates your character, obstacles, and ultimate destiny.",
      hi: "अंकों के कंपन के माध्यम से आपके जीवन का रोडमैप। आपकी जन्म तिथि का हर अंक और आपके नाम का हर अक्षर एक आवृत्ति रखता है जो आपके चरित्र, बाधाओं और अंतिम भाग्य को निर्धारित करता है।"
    },
    whatItFixes: {
      en: "Fixes 'Identity Mismatch.' It aligns your Life Path Number (DOB) with your Destiny Number (Name). It identifies 'Warning Numbers' that might be attracting bad luck and provides simple name-spelling adjustments to synchronize your identity with your goals.",
      hi: "'पहचान बेमेल' को ठीक करता है। यह आपके जीवन पथ अंक (जन्म तिथि) को आपके भाग्य अंक (नाम) के साथ संरेखित करता है। यह उन 'चेतावनी अंकों' की पहचान करता है जो दुर्भाग्य को आकर्षित कर रहे होंगे और आपके लक्ष्यों के साथ आपकी पहचान को सिंक्रनाइज़ करने के लिए सरल नाम-वर्तनी समायोजन प्रदान करता है।"
    },
    astrologicalLogic: {
      en: "Uses Pythagorean and Chaldean systems. We calculate Life Path, Expression, Soul Urge, and Personality numbers, mapping them to planetary energies (e.g., 1 is Sun, 8 is Saturn) to see how they interact with your Vedic chart.",
      hi: "पायथागोरस और चाल्डियन प्रणालियों का उपयोग करता है। हम जीवन पथ, अभिव्यक्ति, आत्मा आग्रह और व्यक्तित्व अंकों की गणना करते हैं, उन्हें ग्रहों की ऊर्जाओं (जैसे 1 सूर्य है, 8 शनि है) में मैप करते हैं ताकि यह देखा जा सके कि वे आपके वैदिक चार्ट के साथ कैसे इंटरैक्ट करते हैं।"
    },
    priceINR: "₹199", oldPriceINR: "₹399", priceUSD: "$3.99", oldPriceUSD: "$7.99"
  },
  19: {
    id: 19,
    title: { en: "Home Vastu Analysis", hi: "गृह वास्तु विश्लेषण" },
    whatIsIt: {
      en: "A comprehensive structural energy audit of your living space based on the ancient science of 'Sthapatya Veda.' This report treats your home as a living organism that interacts with the 8 directions and 5 elements (Fire, Water, Air, Earth, Space). It maps your floor plan to the cosmic grid to ensure that the Prana (life force) in your home supports your health, relationships, and financial growth rather than draining them.",
      hi: "'स्थापत्य वेद' के प्राचीन विज्ञान पर आधारित आपके रहने की जगह का एक व्यापक संरचनात्मक ऊर्जा ऑडिट। यह रिपोर्ट आपके घर को एक जीवित जीव के रूप में मानती है जो 8 दिशाओं और 5 तत्वों (अग्नि, जल, वायु, पृथ्वी, आकाश) के साथ क्रिया करता है। यह आपके घर में प्राण (जीवन शक्ति) को आपके स्वास्थ्य, रिश्तों और वित्तीय विकास का समर्थन करने के लिए आपके फर्श योजना को ब्रह्मांडीय ग्रिड से जोड़ती है।"
    },
    whatItFixes: {
      en: "Resolves 'Geopathic Stress' and 'Vastu Defects' that cause chronic illness, insomnia, and recurring domestic arguments. If you feel 'heavy' or stuck in your own home, it's likely a directional imbalance. We provide non-demolition remedies—using pyramid geometry, color therapy, and metal strips—to fix energy leaks in the North-East (Spiritual center) and South-West (Stability center) of your home.",
      hi: "'जियोपैथिक तनाव' और 'वास्तु दोषों' का समाधान करता है जो पुरानी बीमारी, अनिद्रा और बार-बार होने वाले घरेलू तर्कों का कारण बनते हैं। यदि आप अपने ही घर में 'भारी' या फंसा हुआ महसूस करते हैं, तो यह संभवतः एक दिशात्मक असंतुलन है। हम आपके घर के उत्तर-पूर्व (आध्यात्मिक केंद्र) और दक्षिण-पश्चिम (स्थिरता केंद्र) में ऊर्जा रिसाव को ठीक करने के लिए—पिरामिड ज्यामिति, रंग चिकित्सा और धातु की पट्टियों का उपयोग करके—गैर-विध्वंस उपाय प्रदान करते हैं।"
    },
    astrologicalLogic: {
      en: "Integrates the 'Vastu Purusha Mandala' with your personal horoscope. We check if your 4th House Lord (Home) is in conflict with your home's entrance direction. We analyze 32 specific 'Entrance Padus' (Gate positions) to determine which exact degree of your door is leaking wealth or causing accidents, and use 'Element Balancing' to restore the natural flow of the North-East (Ishanya) and South-West (Nairutya).",
      hi: "आपके व्यक्तिगत राशिफल के साथ 'वास्तु पुरुष मंडल' को एकीकृत करता है। हम जांचते हैं कि क्या आपके चौथे भाव का स्वामी (घर) आपके घर के प्रवेश द्वार की दिशा के साथ संघर्ष में है। हम 32 विशिष्ट 'प्रवेश पदों' (गेट की स्थिति) का विश्लेषण करते हैं ताकि यह निर्धारित किया जा सके कि आपके दरवाजे का कौन सा सटीक अंश धन का रिसाव कर रहा है या दुर्घटनाओं का कारण बन रहा है, और उत्तर-पूर्व (ईशान) और दक्षिण-पश्चिम (नैऋत्य) के प्राकृतिक प्रवाह को बहाल करने के लिए 'तत्व संतुलन' का उपयोग करते हैं।"
    },
    priceINR: "₹499", oldPriceINR: "₹999", priceUSD: "$9.99", oldPriceUSD: "$19.99"
  },
  20: {
    id: 20,
    title: { en: "Business Vastu Report", hi: "बिजनेस वास्तु रिपोर्ट" },
    whatIsIt: {
      en: "A strategic spatial guide for shops, offices, and factories. This report focuses on maximizing profit, employee retention, and customer attraction by aligning the workspace with commercial cosmic energies.",
      hi: "दुकानों, कार्यालयों और कारखानों के लिए एक रणनीतिक स्थानिक मार्गदर्शिका। यह रिपोर्ट कार्यक्षेत्र को व्यावसायिक ब्रह्मांडीय ऊर्जाओं के साथ संरेखित करके लाभ, कर्मचारी प्रतिधारण और ग्राहक आकर्षण को अधिकतम करने पर ध्यान केंद्रित करती है।"
    },
    whatItFixes: {
      en: "Fixes 'Stagnant Growth.' If your business is stuck despite hard work, the energy flow might be blocked. It identifies the best direction for the Owner's Desk (Stability), the Sales counter (Cash flow), and storage (Stability), providing remedies to ensure the 'North' (Kuber's direction) is open and vibrant.",
      hi: "'स्थिर विकास' को ठीक करता है। यदि कड़ी मेहनत के बावजूद आपका व्यवसाय अटका हुआ है, तो ऊर्जा प्रवाह अवरुद्ध हो सकता है। यह मालिक की डेस्क (स्थिरता), बिक्री काउंटर (नकदी प्रवाह) और भंडारण (स्थिरता) के लिए सर्वोत्तम दिशा की पहचान करता है, यह सुनिश्चित करने के लिए उपाय प्रदान करता है कि 'उत्तर' (कुबेर की दिशा) खुला और जीवंत है।"
    },
    astrologicalLogic: {
      en: "Analyzes the owner's 'Lagna Lord' relative to the business directions. We focus on the 'Agni' (South-East) corner for kitchens/factories and 'Nairutya' (South-West) for the CEO's cabin to ensure authority and financial dominance.",
      hi: "व्यावसायिक दिशाओं के सापेक्ष मालिक के 'लग्न स्वामी' का विश्लेषण करता है। हम रसोई/कारखानों के लिए 'अग्नि' (दक्षिण-पूर्व) कोने और अधिकार और वित्तीय प्रभुत्व सुनिश्चित करने के लिए सीईओ के केबिन के लिए 'नैऋत्य' (दक्षिण-पश्चिम) पर ध्यान केंद्रित करते हैं।"
    },
    priceINR: "₹799", oldPriceINR: "₹1599", priceUSD: "$15.99", oldPriceUSD: "$31.99"
  },
  21: {
    id: 21,
    title: { en: "Basic Palm Analysis", hi: "बेसिक हस्तरेखा विश्लेषण" },
    whatIsIt: {
      en: "A reading of the primary lines on your palm (Life, Heart, Head). Your hand is the physical manifestation of your brain's neural patterns; as your mindset changes, your lines evolve.",
      hi: "आपकी हथेली की प्राथमिक रेखाओं (जीवन, हृदय, मस्तिष्क) का विश्लेषण। आपका हाथ आपके मस्तिष्क के तंत्रिका पैटर्न की शारीरिक अभिव्यक्ति है; जैसे-जैसे आपकी मानसिकता बदलती है, आपकी रेखाएं विकसित होती हैं।"
    },
    whatItFixes: {
      en: "Fixes 'Self-Doubt.' By seeing your inherent strengths (vitality on the Life Line, logic on the Head Line), you gain clarity on your personality and immediate health predispositions, allowing for better self-management.",
      hi: "'आत्म-संदेह' को ठीक करता है। अपनी अंतर्निहित शक्तियों (जीवन रेखा पर जीवन शक्ति, मस्तिष्क रेखा पर तर्क) को देखकर, आप अपने व्यक्तित्व और तत्काल स्वास्थ्य प्रवृत्तियों पर स्पष्टता प्राप्त करते हैं, जिससे बेहतर आत्म-प्रबंधन संभव होता है।"
    },
    astrologicalLogic: {
      en: "Evaluates the consistency, length, and depth of lines. We analyze the 'Mounts' (Jupiter, Saturn, Apollo, Mercury) to see which planetary energy is dominant in your character and physical build.",
      hi: "रेखाओं की स्थिरता, लंबाई और गहराई का मूल्यांकन करता है। हम 'पर्वतों' (बृहस्पति, शनि, अपोलो, बुध) का विश्लेषण करते हैं ताकि यह देखा जा सके कि आपके चरित्र और शारीरिक बनावट में कौन सी ग्रह ऊर्जा प्रमुख है।"
    },
    priceINR: "₹299", oldPriceINR: "₹599", priceUSD: "$5.99", oldPriceUSD: "$11.99"
  },
  22: {
    id: 22,
    title: { en: "Premium Hand Reading", hi: "प्रीमियम हैंड रीडिंग" },
    whatIsIt: {
      en: "An exhaustive manual including minor lines (Fate, Sun, Mercury), finger shapes, and palm texture. This is a deep predictive tool used for precise timing of life events visible on the skin.",
      hi: "एक संपूर्ण मैनुअल जिसमें छोटी रेखाएं (भाग्य, सूर्य, बुध), उंगलियों के आकार और हथेली की बनावट शामिल है। यह त्वचा पर दिखाई देने वाले जीवन की घटनाओं के सटीक समय के लिए उपयोग किया जाने वाला एक गहरा भविष्य कहने वाला उपकरण है।"
    },
    whatItFixes: {
      en: "Fixes 'Future Uncertainty.' The Fate Line and Sun Line show when fame, travel, or wealth spikes will occur. It identifies rare markings like 'Fish,' 'Temple,' or 'Lotus' that indicate extraordinary success and provides a detailed personality audit.",
      hi: "'भविष्य की अनिश्चितता' को ठीक करता है। भाग्य रेखा और सूर्य रेखा दिखाती है कि प्रसिद्धि, यात्रा या धन में वृद्धि कब होगी। यह 'मछली,' 'मंदिर,' या 'कमल' जैसे दुर्लभ निशानों की पहचान करता है जो असाधारण सफलता का संकेत देते हैं और एक विस्तृत व्यक्तित्व ऑडिट प्रदान करते हैं।"
    },
    astrologicalLogic: {
      en: "Uses 'Chirology' timing scales to measure ages on the Fate and Life lines. We compare the 'Active' and 'Passive' hands to see the difference between what you were born with and what you have achieved through effort.",
      hi: "भाग्य और जीवन रेखाओं पर उम्र को मापने के लिए 'चिरोलॉजी' टाइमिंग स्केल का उपयोग करता है। हम 'सक्रिय' और 'निष्क्रिय' हाथों की तुलना करते हैं ताकि यह देखा जा सके कि आप किसके साथ पैदा हुए थे और आपने प्रयास के माध्यम से क्या हासिल किया है।"
    },
    priceINR: "₹599", oldPriceINR: "₹1199", priceUSD: "$11.99", oldPriceUSD: "$23.99"
  },
  99: {
    id: 99,
    title: { en: "Ultimate Destiny Guide (Bundle)", hi: "अल्टीमेट डेस्टिनी गाइड (बंडल)" },
    whatIsIt: {
      en: "The 'Master Key' to your existence. This exclusive bundle connects the dots across all major reports—Career, Wealth, Love, and Vastu—to show you how they influence each other. It's a holistic life-manual that reveals why a block in your home's Vastu might be stopping a promotion identified in your career report, or how a Rahu transit is causing illusions in your love life while simultaneously triggering a massive business idea.",
      hi: "आपके अस्तित्व की 'मास्टर कुंजी'। यह विशेष बंडल सभी प्रमुख रिपोर्टों—करियर, धन, प्रेम और वास्तु—के बीच की कड़ियों को जोड़ता है ताकि आपको दिखाया जा सके कि वे एक-दूसरे को कैसे प्रभावित करते हैं। यह एक समग्र जीवन-मैनुअल है जो प्रकट करता है कि आपके घर के वास्तु में एक बाधा आपके करियर रिपोर्ट में पहचानी गई पदोन्नति को क्यों रोक सकती है, या राहु का गोचर आपके प्रेम जीवन में भ्रम पैदा कर रहा है और साथ ही एक बड़े व्यावसायिक विचार को गति दे रहा है।"
    },
    whatItFixes: {
      en: "Fixes 'Siloed Living' and 'Karmic Blind Spots.' Most people treat life's problems in isolation, failing to see that a 2nd house (Wealth) problem is often caused by a 4th house (Home/Vastu) imbalance. This bundle provides a coordinated 12-month strategy, aligning your physical environment, your naming vibration, and your professional timing to create a high-speed path toward your peak potential.",
      hi: "'अलग-थलग जीवन' और 'कर्मिक ब्लाइंड स्पॉट' को ठीक करता है। अधिकांश लोग जीवन की समस्याओं का अलगाव में इलाज करते हैं, यह देखने में विफल रहते हैं कि दूसरे भाव (धन) की समस्या अक्सर चौथे भाव (घर/वास्तु) के असंतुलन के कारण होती है। यह बंडल आपके भौतिक वातावरण, आपके नामकरण कंपन और आपके पेशेवर समय को संरेखित करते हुए एक समन्वित 12-महीने की रणनीति प्रदान करता है ताकि आपकी चरम क्षमता की ओर एक उच्च गति वाला मार्ग बनाया जा सके।"
    },
    astrologicalLogic: {
      en: "Synthesizes data from 5 different divisional charts (D1, D9, D10, D12, D60) and the Vastu Mandala. It cross-references the 'Mahadasha' Lord with the 'Vastu Direction' currently being activated in your life. It identifies the 'Karmic Hotspot'—the one specific area of your chart that, if fixed with the provided remedies, will cause a positive 'domino effect' across all other areas of your life.",
      hi: "5 अलग-अलग वर्गीय कुंडलियों (D1, D9, D10, D12, D60) और वास्तु मंडल के डेटा को संश्लेषित करता है। यह आपके जीवन में वर्तमान में सक्रिय हो रहे 'वास्तु दिशा' के साथ 'महादशा' स्वामी का क्रॉस-रेफरेंस देता है। यह 'कर्मिक हॉटस्पॉट' की पहचान करता है—आपके चार्ट का वह विशिष्ट क्षेत्र जिसे यदि दिए गए उपायों से ठीक किया जाता है, तो आपके जीवन के अन्य सभी क्षेत्रों में सकारात्मक 'डोमिनो प्रभाव' पैदा होगा।"
    },
    priceINR: "₹999", oldPriceINR: "₹1999", priceUSD: "$19.99", oldPriceUSD: "$39.99"
  }
};