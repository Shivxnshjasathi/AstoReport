export interface DreamSymbol {
  id: string;
  symbol: { en: string; hi: string };
  emoji: string;
  meaning: { en: string; hi: string };
  category: string;
}

export const DREAM_SYMBOLS: DreamSymbol[] = [
  {id:'snake',symbol:{en:'Snake',hi:'सांप'},emoji:'🐍',meaning:{en:'Transformation, hidden enemies, kundalini energy. Seeing a snake in dreams often indicates upcoming changes or unresolved fears. A white snake signifies spiritual awakening.',hi:'परिवर्तन, छिपे शत्रु, कुंडलिनी ऊर्जा। सपने में सांप देखना आगामी परिवर्तन या अनसुलझे भय का संकेत है।'},category:'animals'},
  {id:'water',symbol:{en:'Water',hi:'पानी'},emoji:'🌊',meaning:{en:'Emotions, purification, subconscious mind. Clear water signifies peace, muddy water indicates confusion. Flowing water means life is progressing.',hi:'भावनाएं, शुद्धि, अवचेतन मन। साफ पानी शांति, गंदा पानी भ्रम का संकेत। बहता पानी जीवन प्रगति दर्शाता है।'},category:'nature'},
  {id:'temple',symbol:{en:'Temple / Mandir',hi:'मंदिर'},emoji:'🛕',meaning:{en:'Divine blessings, spiritual progress, inner peace. Visiting a temple in dreams means your prayers will be answered. Seeing a lit temple indicates auspicious times ahead.',hi:'दिव्य आशीर्वाद, आध्यात्मिक प्रगति, आंतरिक शांति। सपने में मंदिर जाना आपकी प्रार्थना स्वीकार होने का संकेत है।'},category:'spiritual'},
  {id:'death',symbol:{en:'Death',hi:'मृत्यु'},emoji:'💀',meaning:{en:'End of a phase, major transformation, rebirth. Death in dreams rarely means literal death — it signifies the end of old habits and beginning of new life.',hi:'एक चरण का अंत, बड़ा परिवर्तन, पुनर्जन्म। सपने में मृत्यु शायद ही कभी वास्तविक मृत्यु का अर्थ है — यह पुरानी आदतों के अंत का संकेत है।'},category:'events'},
  {id:'flying',symbol:{en:'Flying',hi:'उड़ना'},emoji:'🦅',meaning:{en:'Freedom, ambition, rising above problems. Flying dreams indicate you are overcoming obstacles. If you struggle to fly, it means you feel held back in waking life.',hi:'स्वतंत्रता, महत्वाकांक्षा, समस्याओं से ऊपर उठना। उड़ने के सपने बताते हैं कि आप बाधाओं पर विजय पा रहे हैं।'},category:'actions'},
  {id:'gold',symbol:{en:'Gold / Jewelry',hi:'सोना / आभूषण'},emoji:'💰',meaning:{en:'Wealth, prosperity, self-worth. Finding gold means unexpected financial gains. Losing gold warns of careless spending. Wearing gold indicates recognition.',hi:'धन, समृद्धि, आत्म-मूल्य। सोना पाना अप्रत्याशित वित्तीय लाभ का संकेत। सोना खोना लापरवाह खर्च की चेतावनी।'},category:'objects'},
  {id:'fire',symbol:{en:'Fire',hi:'आग'},emoji:'🔥',meaning:{en:'Passion, anger, destruction and renewal. Controlled fire means passion and energy. Uncontrolled fire warns of anger or destructive behavior. Sacred fire means purification.',hi:'जुनून, क्रोध, विनाश और नवीनीकरण। नियंत्रित आग जुनून और ऊर्जा। अनियंत्रित आग क्रोध की चेतावनी। पवित्र अग्नि शुद्धि।'},category:'nature'},
  {id:'baby',symbol:{en:'Baby / Child',hi:'बच्चा / शिशु'},emoji:'👶',meaning:{en:'New beginnings, innocence, creativity. A healthy baby means new opportunities. A crying baby indicates neglected responsibilities. Holding a baby means nurturing growth.',hi:'नई शुरुआत, मासूमियत, रचनात्मकता। स्वस्थ शिशु नए अवसरों का संकेत। रोता हुआ बच्चा उपेक्षित जिम्मेदारियों का संकेत।'},category:'people'},
  {id:'teeth',symbol:{en:'Falling Teeth',hi:'दांत गिरना'},emoji:'🦷',meaning:{en:'Anxiety about appearance, loss of control, fear of aging. Very common dream indicating stress. Falling teeth suggest you feel powerless in a situation.',hi:'रूप-रंग की चिंता, नियंत्रण की हानि, बुढ़ापे का भय। बहुत आम सपना जो तनाव दर्शाता है।'},category:'body'},
  {id:'cow',symbol:{en:'Cow',hi:'गाय'},emoji:'🐄',meaning:{en:'Prosperity, motherhood, sacred blessings. A white cow means spiritual purity. Milking a cow indicates abundance. A sick cow warns of family health issues.',hi:'समृद्धि, मातृत्व, पवित्र आशीर्वाद। सफेद गाय आध्यात्मिक शुद्धता। गाय दुहना प्रचुरता। बीमार गाय पारिवारिक स्वास्थ्य चेतावनी।'},category:'animals'},
  {id:'marriage',symbol:{en:'Marriage / Wedding',hi:'शादी / विवाह'},emoji:'💒',meaning:{en:'Union, commitment, new partnership. Your own wedding means a major life commitment is approaching. Attending a wedding means celebrations ahead.',hi:'मिलन, प्रतिबद्धता, नई साझेदारी। अपनी शादी का मतलब एक बड़ी जीवन प्रतिबद्धता आ रही है।'},category:'events'},
  {id:'exam',symbol:{en:'Exam / Test',hi:'परीक्षा'},emoji:'📝',meaning:{en:'Self-evaluation, fear of failure, life challenges. Failing an exam in dreams reflects waking-life anxiety about performance or being judged.',hi:'आत्म-मूल्यांकन, असफलता का भय। सपने में परीक्षा में फेल होना प्रदर्शन की चिंता दर्शाता है।'},category:'events'},
  {id:'elephant',symbol:{en:'Elephant',hi:'हाथी'},emoji:'🐘',meaning:{en:'Power, wisdom, Lord Ganesha blessings. Riding an elephant means authority and success. A white elephant is extremely auspicious — great fortune ahead.',hi:'शक्ति, ज्ञान, भगवान गणेश का आशीर्वाद। हाथी पर सवारी अधिकार और सफलता। सफेद हाथी अत्यंत शुभ।'},category:'animals'},
  {id:'rain',symbol:{en:'Rain',hi:'बारिश'},emoji:'🌧️',meaning:{en:'Cleansing, fertility, emotional release. Light rain means blessings. Heavy rain indicates emotional overwhelm. Dancing in rain means joy and freedom.',hi:'शुद्धि, उर्वरता, भावनात्मक मुक्ति। हल्की बारिश आशीर्वाद। भारी बारिश भावनात्मक बोझ। बारिश में नाचना आनंद।'},category:'nature'},
  {id:'running',symbol:{en:'Running / Chasing',hi:'दौड़ना / पीछा'},emoji:'🏃',meaning:{en:'Avoiding problems, urgency, fear. Being chased means you are avoiding confrontation. If you cannot run, you feel stuck. Chasing someone means pursuing goals.',hi:'समस्याओं से बचना, तत्काल भय। पीछा किया जाना टकराव से बचने का संकेत।'},category:'actions'},
  {id:'mountain',symbol:{en:'Mountain',hi:'पर्वत'},emoji:'⛰️',meaning:{en:'Ambition, obstacles, spiritual ascent. Climbing means progress toward goals. Standing on top means achievement. A blocked path means current obstacles.',hi:'महत्वाकांक्षा, बाधाएं, आध्यात्मिक चढ़ाई। चढ़ना लक्ष्यों की ओर प्रगति। शीर्ष पर खड़ा होना उपलब्धि।'},category:'nature'},
  {id:'goddess',symbol:{en:'God / Goddess',hi:'भगवान / देवी'},emoji:'🙏',meaning:{en:'Divine guidance, protection, spiritual awakening. Seeing a deity means you are being guided. Receiving blessings means your wishes will be fulfilled soon.',hi:'दिव्य मार्गदर्शन, सुरक्षा, आध्यात्मिक जागृति। देवता दर्शन मार्गदर्शन का संकेत। आशीर्वाद प्राप्त करना इच्छापूर्ति।'},category:'spiritual'},
  {id:'falling',symbol:{en:'Falling',hi:'गिरना'},emoji:'😱',meaning:{en:'Loss of control, insecurity, letting go. Falling from height means fear of failure. If you land safely, you will overcome the crisis. Endless falling means deep anxiety.',hi:'नियंत्रण की हानि, असुरक्षा। ऊंचाई से गिरना विफलता का भय। सुरक्षित उतरना संकट पर विजय।'},category:'actions'},
  {id:'tree',symbol:{en:'Tree',hi:'पेड़'},emoji:'🌳',meaning:{en:'Growth, family roots, life force. A green tree means prosperity. A dead tree warns of stagnation. A fruit-bearing tree means rewards for hard work.',hi:'विकास, पारिवारिक जड़ें, जीवन शक्ति। हरा पेड़ समृद्धि। सूखा पेड़ ठहराव की चेतावनी। फलदार पेड़ मेहनत का फल।'},category:'nature'},
  {id:'house',symbol:{en:'House / Home',hi:'घर'},emoji:'🏠',meaning:{en:'Self, family, security. A new house means fresh start. A damaged house means family problems. Many rooms mean undiscovered aspects of yourself.',hi:'स्वयं, परिवार, सुरक्षा। नया घर नई शुरुआत। क्षतिग्रस्त घर पारिवारिक समस्याएं।'},category:'objects'},
];

export const DREAM_CATEGORIES = [
  {id:'all',en:'All Symbols',hi:'सभी प्रतीक'},
  {id:'animals',en:'Animals',hi:'जानवर'},
  {id:'nature',en:'Nature',hi:'प्रकृति'},
  {id:'spiritual',en:'Spiritual',hi:'आध्यात्मिक'},
  {id:'events',en:'Events',hi:'घटनाएं'},
  {id:'actions',en:'Actions',hi:'क्रियाएं'},
  {id:'objects',en:'Objects',hi:'वस्तुएं'},
  {id:'people',en:'People',hi:'लोग'},
  {id:'body',en:'Body',hi:'शरीर'},
];
