export interface BlogPost {
  slug: string;
  title: { en: string; hi: string };
  excerpt: { en: string; hi: string };
  content: { en: string; hi: string };
  date: string;
  category: { en: string; hi: string };
  image: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'understanding-sade-sati',
    title: {
      en: 'Surviving Sade Sati: A Comprehensive Vedic Guide',
      hi: 'साढ़े साती से बचना: एक व्यापक वैदिक मार्गदर्शिका'
    },
    excerpt: {
      en: 'Learn how the 7.5-year transit of Saturn affects your life and what remedies can help you navigate this karmic period.',
      hi: 'जानें कि शनि का साढ़े सात साल का गोचर आपके जीवन को कैसे प्रभावित करता है और कौन से उपाय आपको इस कार्मिक अवधि को पार करने में मदद कर सकते हैं।'
    },
    date: '2026-05-10',
    category: { en: 'Saturn', hi: 'शनि' },
    image: '/blog/saturn.jpg',
    author: 'Acharya Sharma',
    content: {
      en: `Sade Sati is the 7.5 years long period of Saturn (Shani). This period begins when Saturn enters the zodiac sign immediately before the zodiac sign of Moon at the time of the birth of the individual.
      
      ### Phases of Sade Sati
      1. **Rising Phase:** When Saturn transits the 12th house from the Moon.
      2. **Peak Phase:** When Saturn transits the Moon sign itself.
      3. **Setting Phase:** When Saturn transits the 2nd house from the Moon.
      
      ### Myths vs Reality
      Many fear Sade Sati as a purely negative period, but in reality, it is a time of spiritual cleansing and structural growth. Saturn is the taskmaster who rewards hard work and discipline.
      
      ### Remedies
      - Chant the Shani Beej Mantra 108 times on Saturdays.
      - Donate black sesame seeds and mustard oil.
      - Read the Shani Chalisa daily.
      - Respect elders and support the underprivileged.`,
      hi: `साढ़े साती शनि (शनि) की 7.5 साल लंबी अवधि है। यह अवधि तब शुरू होती है जब शनि व्यक्ति के जन्म के समय चंद्रमा की राशि से ठीक पहले की राशि में प्रवेश करता है।

      ### साढ़े साती के चरण
      1. **उदय चरण:** जब शनि चंद्रमा से 12वें भाव में गोचर करता है।
      2. **शिखर चरण:** जब शनि चंद्रमा की ही राशि में गोचर करता है।
      3. **अस्त चरण:** जब शनि चंद्रमा से दूसरे भाव में गोचर करता है।

      ### मिथक बनाम वास्तविकता
      कई लोग साढ़े साती को विशुद्ध रूप से नकारात्मक अवधि के रूप में डरते हैं, लेकिन वास्तव में, यह आध्यात्मिक शुद्धि और संरचनात्मक विकास का समय है। शनि वह कार्यपालक है जो कड़ी मेहनत और अनुशासन का फल देता है।

      ### उपाय
      - शनिवार को 108 बार शनि बीज मंत्र का जाप करें।
      - काले तिल और सरसों के तेल का दान करें।
      - प्रतिदिन शनि चालीसा पढ़ें।
      - बड़ों का सम्मान करें और वंचितों की सहायता करें।`
    }
  },
  {
    slug: 'benefits-of-ruby-gemstone',
    title: {
      en: 'Sun Power: The Spiritual Benefits of Ruby (Manik)',
      hi: 'सूर्य की शक्ति: माणिक्य (माणिक) के आध्यात्मिक लाभ'
    },
    excerpt: {
      en: 'Discover how wearing a natural Ruby can boost your leadership qualities, vitality, and career prospects according to Vedic Gemology.',
      hi: 'वैदिक रत्न विज्ञान के अनुसार जानें कि प्राकृतिक माणिक पहनने से आपके नेतृत्व गुण, जीवन शक्ति और करियर की संभावनाएं कैसे बढ़ सकती हैं।'
    },
    date: '2026-05-05',
    category: { en: 'Gemstones', hi: 'रत्न' },
    image: '/blog/ruby.jpg',
    author: 'Pandit Mishra',
    content: {
      en: `The Ruby gemstone, known as Manik in Hindi, is the king of gemstones and represents the Sun (Surya). It is known for its ability to provide the wearer with name, fame, and power.
      
      ### Who should wear a Ruby?
      Rubies are most beneficial for those with Leo (Simha) as their Lagna or Rashi. It is also highly effective for those in government jobs, politics, or administrative roles.
      
      ### Benefits
      - **Leadership:** Enhances decision-making skills and authority.
      - **Vitality:** Improves blood circulation and overall physical energy.
      - **Confidence:** Removes self-doubt and provides a positive aura.
      
      ### How to wear?
      It should ideally be set in gold or copper and worn on the ring finger of the right hand. The best day to wear it is a Sunday morning during the Shukla Paksha.`,
      hi: `माणिक्य रत्न, जिसे हिंदी में माणिक के नाम से जाना जाता है, रत्नों का राजा है और सूर्य (सूर्य) का प्रतिनिधित्व करता है। यह पहनने वाले को नाम, प्रसिद्धि और शक्ति प्रदान करने की क्षमता के लिए जाना जाता है।

      ### माणिक किसे पहनना चाहिए?
      माणिक उन लोगों के लिए सबसे अधिक फायदेमंद है जिनका लग्न या राशि सिंह (Simha) है। यह सरकारी नौकरियों, राजनीति या प्रशासनिक भूमिकाओं में रहने वालों के लिए भी अत्यधिक प्रभावी है।

      ### लाभ
      - **नेतृत्व:** निर्णय लेने के कौशल और अधिकार को बढ़ाता है।
      - **जीवन शक्ति:** रक्त परिसंचरण और समग्र शारीरिक ऊर्जा में सुधार करता है।
      - **आत्मविश्वास:** आत्म-संदेह को दूर करता है और एक सकारात्मक आभा प्रदान करता।

      ### कैसे पहनें?
      इसे आदर्श रूप से सोने या तांबे में सेट किया जाना चाहिए और दाहिने हाथ की अनामिका उंगली में पहना जाना चाहिए। इसे पहनने का सबसे अच्छा दिन शुक्ल पक्ष के दौरान रविवार की सुबह है।`
    }
  },
  {
    slug: 'vedic-rituals-for-wealth',
    title: {
      en: '5 Ancient Vedic Rituals for Financial Abundance',
      hi: 'वित्तीय प्रचुरता के लिए 5 प्राचीन वैदिक अनुष्ठान'
    },
    excerpt: {
      en: 'Unlocking the secrets of Lakshmi and Kubera to manifest wealth and prosperity through simple daily practices.',
      hi: 'सरल दैनिक प्रथाओं के माध्यम से धन और समृद्धि प्रकट करने के लिए लक्ष्मी और कुबेर के रहस्यों को खोलना।'
    },
    date: '2026-04-28',
    category: { en: 'Prosperity', hi: 'समृद्धि' },
    image: '/blog/wealth.jpg',
    author: 'Acharya Sharma',
    content: {
      en: `Financial stability is often seen as a combination of hard work and divine grace. In Vedic culture, specific rituals are dedicated to attracting the energy of abundance.
      
      ### 1. Lighting the evening lamp
      Light a ghee lamp in the North-East corner (Ishan Kon) of your house every evening. This invites the blessings of Goddess Lakshmi.
      
      ### 2. Shree Yantra Worship
      The Shree Yantra is the most powerful symbol of wealth. Keeping a sanctified Shree Yantra in your home temple provides stability.
      
      ### 3. Gratitude toward Earth
      Before stepping on the floor in the morning, touch the ground and offer a prayer of gratitude. This grounds your financial energy.
      
      ### 4. Feeding the birds
      Donating food to birds (especially grains like Bajra) is a remedy for clearing obstacles in wealth accumulation.`,
      hi: `वित्तीय स्थिरता को अक्सर कड़ी मेहनत और दैवीय कृपा के संयोजन के रूप में देखा जाता है। वैदिक संस्कृति में, विशिष्ट अनुष्ठान प्रचुरता की ऊर्जा को आकर्षित करने के लिए समर्पित हैं।

      ### 1. शाम का दीपक जलाना
      हर शाम अपने घर के उत्तर-पूर्व कोने (ईशान कोण) में घी का दीपक जलाएं। यह देवी लक्ष्मी के आशीर्वाद को आमंत्रित करता है।

      ### 2. श्री यंत्र पूजा
      श्री यंत्र धन का सबसे शक्तिशाली प्रतीक है। अपने घर के मंदिर में एक पवित्र श्री यंत्र रखने से स्थिरता मिलती है।

      ### 3. पृथ्वी के प्रति कृतज्ञता
      सुबह फर्श पर कदम रखने से पहले, जमीन को छुएं और कृतज्ञता की प्रार्थना करें। यह आपकी वित्तीय ऊर्जा को आधार प्रदान करता है।

      ### 4. पक्षियों को दाना खिलाना
      पक्षियों (विशेष रूप से बाजरा जैसे अनाज) को भोजन दान करना धन संचय में बाधाओं को दूर करने का एक उपाय है।`
    }
  }
];
