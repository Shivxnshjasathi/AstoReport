export interface MantraData {
  id: string;
  planet: { en: string; hi: string };
  symbol: string;
  color: string;
  mantra: { en: string; hi: string; sanskrit: string };
  beejMantra: string;
  chantCount: number;
  day: { en: string; hi: string };
  gemstone: { en: string; hi: string };
  donations: { en: string[]; hi: string[] };
  remedies: { en: string[]; hi: string[] };
  effects: { en: string; hi: string };
}

export const MANTRAS: MantraData[] = [
  { id:'sun', planet:{en:'Sun (Surya)',hi:'सूर्य'}, symbol:'☉', color:'#FF6B35',
    mantra:{en:'Om Hraam Hreem Hraum Sah Suryaya Namah',hi:'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',sanskrit:'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः'},
    beejMantra:'ॐ ह्रां', chantCount:7000, day:{en:'Sunday',hi:'रविवार'}, gemstone:{en:'Ruby (Manik)',hi:'माणिक्य'},
    donations:{en:['Wheat','Jaggery','Red cloth','Copper vessel'],hi:['गेहूं','गुड़','लाल कपड़ा','तांबे का बर्तन']},
    remedies:{en:['Offer water to Sun at sunrise','Wear Ruby on ring finger','Donate wheat on Sundays','Chant Aditya Hridayam','Fast on Sundays'],
    hi:['सूर्योदय पर सूर्य को जल अर्पित करें','अनामिका में माणिक पहनें','रविवार को गेहूं दान करें','आदित्य हृदयम पढ़ें','रविवार को उपवास करें']},
    effects:{en:'Boosts confidence, authority, government favor, and vitality.',hi:'आत्मविश्वास, अधिकार, सरकारी कृपा और जीवन शक्ति बढ़ाता है।'}},
  { id:'moon', planet:{en:'Moon (Chandra)',hi:'चंद्रमा'}, symbol:'☽', color:'#C0C0C0',
    mantra:{en:'Om Shraam Shreem Shraum Sah Chandraya Namah',hi:'ॐ श्रां श्रीं श्रौं सः चंद्राय नमः',sanskrit:'ॐ श्रां श्रीं श्रौं सः चंद्राय नमः'},
    beejMantra:'ॐ श्रां', chantCount:11000, day:{en:'Monday',hi:'सोमवार'}, gemstone:{en:'Pearl (Moti)',hi:'मोती'},
    donations:{en:['Rice','White cloth','Milk','Silver'],hi:['चावल','सफेद कपड़ा','दूध','चांदी']},
    remedies:{en:['Wear Pearl on little finger','Donate milk on Mondays','Fast on Mondays','Worship Lord Shiva','Drink water in silver glass'],
    hi:['कनिष्ठा में मोती पहनें','सोमवार को दूध दान करें','सोमवार को उपवास करें','भगवान शिव की पूजा करें','चांदी के गिलास में पानी पिएं']},
    effects:{en:'Improves mental peace, emotional balance, and intuition.',hi:'मानसिक शांति, भावनात्मक संतुलन और अंतर्ज्ञान में सुधार करता है।'}},
  { id:'mars', planet:{en:'Mars (Mangal)',hi:'मंगल'}, symbol:'♂', color:'#DC143C',
    mantra:{en:'Om Kraam Kreem Kraum Sah Bhaumaya Namah',hi:'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',sanskrit:'ॐ क्रां क्रीं क्रौं सः भौमाय नमः'},
    beejMantra:'ॐ क्रां', chantCount:10000, day:{en:'Tuesday',hi:'मंगलवार'}, gemstone:{en:'Red Coral (Moonga)',hi:'लाल मूंगा'},
    donations:{en:['Red lentils','Red cloth','Jaggery','Copper utensils'],hi:['मसूर दाल','लाल कपड़ा','गुड़','तांबे के बर्तन']},
    remedies:{en:['Wear Red Coral on ring finger','Recite Hanuman Chalisa','Fast on Tuesdays','Worship Lord Hanuman','Donate blood if possible'],
    hi:['अनामिका में लाल मूंगा पहनें','हनुमान चालीसा पढ़ें','मंगलवार को उपवास करें','हनुमान जी की पूजा करें','रक्तदान करें']},
    effects:{en:'Increases courage, energy, property gains, resolves Manglik Dosha.',hi:'साहस, ऊर्जा, संपत्ति लाभ बढ़ाता है और मांगलिक दोष समाधान करता है।'}},
  { id:'mercury', planet:{en:'Mercury (Budh)',hi:'बुध'}, symbol:'☿', color:'#2ECC71',
    mantra:{en:'Om Braam Breem Braum Sah Budhaya Namah',hi:'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',sanskrit:'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः'},
    beejMantra:'ॐ ब्रां', chantCount:9000, day:{en:'Wednesday',hi:'बुधवार'}, gemstone:{en:'Emerald (Panna)',hi:'पन्ना'},
    donations:{en:['Green moong dal','Green cloth','Green vegetables','Camphor'],hi:['हरी मूंग दाल','हरा कपड़ा','हरी सब्जियां','कपूर']},
    remedies:{en:['Wear Emerald on little finger','Feed green grass to cows','Donate on Wednesdays','Worship Lord Vishnu','Chant Vishnu Sahasranama'],
    hi:['कनिष्ठा में पन्ना पहनें','गाय को हरा चारा खिलाएं','बुधवार को दान करें','भगवान विष्णु की पूजा करें','विष्णु सहस्रनाम पढ़ें']},
    effects:{en:'Improves communication, intelligence, and business skills.',hi:'संचार, बुद्धि और व्यापार कौशल में सुधार करता है।'}},
  { id:'jupiter', planet:{en:'Jupiter (Guru)',hi:'बृहस्पति'}, symbol:'♃', color:'#F39C12',
    mantra:{en:'Om Graam Greem Graum Sah Gurave Namah',hi:'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',sanskrit:'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः'},
    beejMantra:'ॐ ग्रां', chantCount:19000, day:{en:'Thursday',hi:'गुरुवार'}, gemstone:{en:'Yellow Sapphire (Pukhraj)',hi:'पुखराज'},
    donations:{en:['Chana dal','Yellow cloth','Turmeric','Bananas'],hi:['चना दाल','पीला कपड़ा','हल्दी','केले']},
    remedies:{en:['Wear Yellow Sapphire on index finger','Worship Banana tree on Thursdays','Apply turmeric tilak','Respect teachers and elders','Donate yellow items'],
    hi:['तर्जनी में पुखराज पहनें','गुरुवार को केले के पेड़ की पूजा करें','हल्दी तिलक लगाएं','गुरु और बड़ों का सम्मान करें','पीली वस्तुएं दान करें']},
    effects:{en:'Brings wisdom, wealth, good fortune, and spiritual growth.',hi:'ज्ञान, धन, सौभाग्य और आध्यात्मिक विकास लाता है।'}},
  { id:'venus', planet:{en:'Venus (Shukra)',hi:'शुक्र'}, symbol:'♀', color:'#E91E63',
    mantra:{en:'Om Draam Dreem Draum Sah Shukraya Namah',hi:'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',sanskrit:'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः'},
    beejMantra:'ॐ द्रां', chantCount:16000, day:{en:'Friday',hi:'शुक्रवार'}, gemstone:{en:'Diamond (Heera)',hi:'हीरा'},
    donations:{en:['White rice','Perfume','White clothes','Sugar'],hi:['सफेद चावल','इत्र','सफेद कपड़े','चीनी']},
    remedies:{en:['Wear Diamond on middle finger','Donate white items on Fridays','Worship Goddess Lakshmi','Use perfume regularly','Offer white flowers'],
    hi:['मध्यमा में हीरा पहनें','शुक्रवार को सफेद वस्तुएं दान करें','देवी लक्ष्मी की पूजा करें','नियमित इत्र लगाएं','सफेद फूल अर्पित करें']},
    effects:{en:'Enhances love, beauty, artistic talents, and marital bliss.',hi:'प्रेम, सौंदर्य, कलात्मक प्रतिभा और वैवाहिक सुख बढ़ाता है।'}},
  { id:'saturn', planet:{en:'Saturn (Shani)',hi:'शनि'}, symbol:'♄', color:'#2C3E50',
    mantra:{en:'Om Praam Preem Praum Sah Shanaischaraya Namah',hi:'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',sanskrit:'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः'},
    beejMantra:'ॐ प्रां', chantCount:23000, day:{en:'Saturday',hi:'शनिवार'}, gemstone:{en:'Blue Sapphire (Neelam)',hi:'नीलम'},
    donations:{en:['Mustard oil','Black sesame','Iron items','Black cloth'],hi:['सरसों का तेल','काले तिल','लोहे की वस्तुएं','काला कपड़ा']},
    remedies:{en:['Pour mustard oil on Shani idol on Saturdays','Feed crows on Saturdays','Donate black items','Recite Shani Chalisa','Visit Shani temple'],
    hi:['शनिवार को शनि देव पर तेल चढ़ाएं','शनिवार को कौओं को खिलाएं','काली वस्तुएं दान करें','शनि चालीसा पढ़ें','शनि मंदिर जाएं']},
    effects:{en:'Reduces Sade Sati effects, brings discipline and career stability.',hi:'साढ़े साती प्रभाव कम करता है, अनुशासन और करियर स्थिरता लाता है।'}},
  { id:'rahu', planet:{en:'Rahu (North Node)',hi:'राहु'}, symbol:'☊', color:'#4A00E0',
    mantra:{en:'Om Bhraam Bhreem Bhraum Sah Rahave Namah',hi:'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',sanskrit:'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः'},
    beejMantra:'ॐ भ्रां', chantCount:18000, day:{en:'Saturday',hi:'शनिवार'}, gemstone:{en:'Hessonite (Gomed)',hi:'गोमेद'},
    donations:{en:['Blue/black cloth','Coconut','Blanket to needy'],hi:['नीला/काला कपड़ा','नारियल','जरूरतमंदों को कंबल']},
    remedies:{en:['Wear Hessonite on middle finger','Donate blankets to poor','Keep silver elephant at home','Worship Goddess Durga','Chant Rahu mantra 18000 times'],
    hi:['मध्यमा में गोमेद पहनें','गरीबों को कंबल दान करें','घर में चांदी का हाथी रखें','देवी दुर्गा की पूजा करें','राहु मंत्र 18000 बार जपें']},
    effects:{en:'Removes confusion, phobias, and brings material success.',hi:'भ्रम, भय दूर करता है और भौतिक सफलता लाता है।'}},
  { id:'ketu', planet:{en:'Ketu (South Node)',hi:'केतु'}, symbol:'☋', color:'#795548',
    mantra:{en:'Om Sraam Sreem Sraum Sah Ketave Namah',hi:'ॐ स्रां स्रीं स्रौं सः केतवे नमः',sanskrit:'ॐ स्रां स्रीं स्रौं सः केतवे नमः'},
    beejMantra:'ॐ स्रां', chantCount:17000, day:{en:'Tuesday',hi:'मंगलवार'}, gemstone:{en:"Cat's Eye (Lahsuniya)",hi:'लहसुनिया'},
    donations:{en:['Seven grains mixture','Blanket','Sesame seeds','Dog food'],hi:['सात अनाज','कंबल','तिल','कुत्ते का भोजन']},
    remedies:{en:["Wear Cat's Eye on middle finger",'Feed stray dogs','Donate blankets on Tuesdays','Worship Lord Ganesha','Chant Ganesha mantra 108 times'],
    hi:['मध्यमा में लहसुनिया पहनें','आवारा कुत्तों को खिलाएं','मंगलवार को कंबल दान करें','भगवान गणेश की पूजा करें','गणेश मंत्र 108 बार जपें']},
    effects:{en:'Brings spiritual growth, liberation, and mystical knowledge.',hi:'आध्यात्मिक विकास, मुक्ति और रहस्यमय ज्ञान लाता है।'}}
];

export const PROBLEM_CATEGORIES = [
  { id:'all', en:'All Planets', hi:'सभी ग्रह', planets:[] as string[] },
  { id:'career', en:'Career & Success', hi:'करियर और सफलता', planets:['sun','mercury','jupiter','saturn'] },
  { id:'love', en:'Love & Marriage', hi:'प्रेम और विवाह', planets:['venus','moon','jupiter','mars'] },
  { id:'health', en:'Health & Vitality', hi:'स्वास्थ्य', planets:['sun','mars','moon'] },
  { id:'wealth', en:'Wealth & Prosperity', hi:'धन और समृद्धि', planets:['jupiter','venus','mercury'] },
  { id:'spiritual', en:'Spiritual Growth', hi:'आध्यात्मिक विकास', planets:['ketu','jupiter','moon'] },
  { id:'obstacles', en:'Removing Obstacles', hi:'बाधा निवारण', planets:['saturn','rahu','ketu','mars'] },
];
