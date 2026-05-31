export interface MindMapNode {
  label: string;
  engLabel?: string;
  color: string;
  description: string;
  bullets?: string[];
  children?: MindMapNode[];
}

export interface ChapterStructure {
  id: string;
  title: string;
  topicName: string;
  icon: string;
  mindMap: {
    title: string;
    rootNode: MindMapNode;
  };
}

export const SUBJECT_CHAPTERS: Record<string, ChapterStructure[]> = {
  math: [
    {
      id: "trigo",
      title: "त्रिकोणमिति का परिचय",
      topicName: "अध्याय 8: त्रिकोणमिति (Introduction)",
      icon: "📐",
      mindMap: {
        title: "त्रिकोणमिति एवं ज्यामिति मप",
        rootNode: {
          label: "त्रिकोणमिति सिद्धांत",
          engLabel: "Trigonometry Core",
          color: "bg-indigo-600 border-indigo-700 text-white shadow-indigo-200",
          description: "समकोण त्रिभुज की भुजाओं और कोणों के बीच के संबंधों का संपूर्ण अध्ययन।",
          bullets: [
            "समकोण त्रिभुज सिद्धांत पर आधारित",
            "6 मुख्य त्रिकोणमितीय अनुपात",
            "त्रिकोणमितीय सर्वसमिकाएं"
          ],
          children: [
            {
              label: "त्रिकोणमितीय अनुपात",
              engLabel: "Ratios (sin, cos, tan)",
              color: "bg-blue-500 border-blue-600 text-white",
              description: "भुजाओं का अनुपात ज्ञात करने के लिए 'LAL/KKA' या 'लाल/कक्का' सूत्र:",
              bullets: [
                "sin θ = लम्ब / कर्ण (L/K)",
                "cos θ = आधार / कर्ण (A/K)",
                "tan θ = लम्ब / आधार (L/A)"
              ]
            },
            {
              label: "विशिष्ट कोणों के मान",
              engLabel: "Specific Angles (0°-90°)",
              color: "bg-cyan-500 border-cyan-600 text-white",
              description: "0°, 30°, 45°, 60° और 90° के ट्रिग्नोमेट्रिक मान परीक्षाओं के लिए अत्यंत उपयोगी हैं:",
              bullets: [
                "sin 30° = 1/2, sin 90° = 1",
                "cos 60° = 1/2, cos 0° = 1",
                "tan 45° = 1, tan 90° = अपरिभाषित"
              ]
            },
            {
              label: "प्रमुख सर्वसमिकाएं",
              engLabel: "Identities",
              color: "bg-teal-500 border-teal-600 text-white",
              description: "समीकरण जो कोणों के सभी मानों के लिए सत्य होते हैं:",
              bullets: [
                "sin² θ + cos² θ = 1",
                "1 + tan² θ = sec² θ",
                "1 + cot² θ = cosec² θ"
              ]
            }
          ]
        }
      }
    },
    {
      id: "quadratic",
      title: "द्विघात समीकरण",
      topicName: "अध्याय 4: द्विघात समीकरण (Quadratic)",
      icon: "🧮",
      mindMap: {
        title: "द्विघात समीकरण संकल्पना",
        rootNode: {
          label: "द्विघात समीकरण",
          engLabel: "ax² + bx + c = 0",
          color: "bg-indigo-600 border-indigo-700 text-white shadow-indigo-200",
          description: "एक चर राशि में घात दो का समीकरण, जिसे हल करने की विभिन्न विधियां हैं।",
          bullets: [
            "काल्पनिक या वास्तविक मूल (Roots)",
            "विविक्तकर D = b² - 4ac",
            "श्रीधराचार्य सूत्र विधि"
          ],
          children: [
            {
              label: "मूलों की प्रकृति",
              engLabel: "Nature of Roots",
              color: "bg-violet-500 border-violet-600 text-white",
              description: "D के मान पर मूलों के प्रकार स्थिर होते हैं:",
              bullets: [
                "D > 0: दो भिन्न वास्तविक मूल (Real & Distinct)",
                "D = 0: दो बराबर वास्तविक मूल (Equal Roots)",
                "D < 0: कोई वास्तविक मूल नहीं (Imaginary Roots)"
              ]
            },
            {
              label: "हल करने की विधियां",
              engLabel: "Solution Methods",
              color: "bg-purple-500 border-purple-600 text-white",
              description: "समीकरण के मूल निकालने के मुख्य तीन तरीके हैं:",
              bullets: [
                "गुणनखंड विधि (Factorisation)",
                "पूर्ण वर्ग बनाने की विधि",
                "द्विघाती सूत्र (श्रीधराचार्य नियम): x = (-b ± √D) / 2a"
              ]
            }
          ]
        }
      }
    },
    {
      id: "ap",
      title: "समांतर श्रेढ़ियां",
      topicName: "अध्याय 5: समांतर श्रेढ़ियां (AP)",
      icon: "📈",
      mindMap: {
        title: "समांतर श्रेढ़ी संकल्पना",
        rootNode: {
          label: "समांतर श्रेढ़ी (AP)",
          engLabel: "Arithmetic Progression",
          color: "bg-indigo-600 border-indigo-700 text-white shadow-indigo-200",
          description: "संख्याओं की ऐसी सूची जिसमें प्रत्येक पद अपने पिछले पद में एक निश्चित संख्या 'd' जोड़कर मिलता है।",
          bullets: [
            "प्रथम पद 'a' और सार्व अंतर 'd'",
            "n-वां पद a_n = a + (n-1)d",
            "n पदों का योग S_n = n/2 * [2a + (n-1)d]"
          ],
          children: [
            {
              label: "सार्व अंतर (d)",
              engLabel: "Common Difference",
              color: "bg-emerald-500 border-emerald-600 text-white",
              description: "सार्व अंतर धनात्मक, ऋणात्मक या शून्य हो सकता है:",
              bullets: [
                "d = a_2 - a_1",
                "यदि d > 0, तो AP ऊपर की ओर बढ़ेगी",
                "यदि d < 0, तो AP नीचे की ओर घटेगी"
              ]
            },
            {
              label: "n पदों का योग",
              engLabel: "Sum of n Terms",
              color: "bg-teal-500 border-teal-600 text-white",
              description: "AP के सभी पदों को जोड़ने का सटीक सूत्र:",
              bullets: [
                "S_n = n/2 * (a + l) [जहाँ l अंतिम पद है]",
                "S_n = n/2 * [2a + (n-1)d]"
              ]
            }
          ]
        }
      }
    }
  ],
  science: [
    {
      id: "chem_reactions",
      title: "रासायनिक अभिक्रियाएं (Interactive Lab)",
      topicName: "अध्याय 1: रासायनिक अभिक्रियाएं एवं समीकरण",
      icon: "🔥",
      mindMap: {
        title: "रासायनिक अभिक्रियाओं के प्रकार",
        rootNode: {
          label: "रासायनिक अभिक्रियाएं",
          engLabel: "Chemical Reactions",
          color: "bg-emerald-600 border-emerald-700 text-white shadow-emerald-250",
          description: "वह प्रक्रम जिसमें नए गुणधर्मों के साथ नए पदार्थ बनते हैं।",
          bullets: [
            "अवस्था, रंग परिवर्तन, गैस का निकास या तापमान में परिवर्तन",
            "संतुलित रासायनिक समीकरण का महत्व",
            "संयोजन, वियोजन, विस्थापन एवं द्विविस्थापन अभिक्रियाएं"
          ],
          children: [
            {
              label: "संयोजन अभिक्रिया",
              engLabel: "Combination Reaction",
              color: "bg-teal-500 border-teal-600 text-white",
              description: "ऐसी अभिक्रिया जिसमें दो या दो से अधिक अभिकारक मिलकर एकल उत्पाद बनाते हैं।",
              bullets: [
                "2Mg + O₂ → 2MgO (मैग्नीशियम रिबन का तीव्र प्रकाश के साथ दहन)",
                "CaO + H₂O → Ca(OH)₂ + ऊष्मा (बिना बुझा चूना और जल)"
              ]
            },
            {
              label: "विस्थापन अभिक्रिया",
              engLabel: "Displacement Reaction",
              color: "bg-cyan-500 border-cyan-600 text-white",
              description: "ऐसी अभिक्रिया जिसमें अधिक अभिक्रियाशील तत्व कम अभिक्रियाशील तत्व को उसके यौगिक से विस्थापित करता है।",
              bullets: [
                "Fe + CuSO₄ → FeSO₄ + Cu (लोहे की कील पर तांबे का जमना)",
                "नीला कॉपर सल्फेट विलयन हरे रंग के फेरस सल्फेट में परिवर्तित हो जाता है"
              ]
            },
            {
              label: "अपघटन अभिक्रिया",
              engLabel: "Decomposition Reaction",
              color: "bg-lime-600 border-lime-700 text-white",
              description: "एकल अभिकारक टूटकर दो या अधिक सरल पदार्थों का निर्माण करता है।",
              bullets: [
                "CaCO₃ + ऊष्मा → CaO + CO₂",
                "इसके लिए ऊष्मा, प्रकाश या विद्युत ऊर्जा की आवश्यकता होती है"
              ]
            }
          ]
        }
      }
    },
    {
      id: "electricity",
      title: "विद्युत (Physics Lab)",
      topicName: "अध्याय 11: विद्युत (Electricity)",
      icon: "⚡",
      mindMap: {
        title: "विद्युत परिपथ एवं ओह्म नियम",
        rootNode: {
          label: "विद्युत धारा एवं विभवांतर",
          engLabel: "Electricity & Circuit",
          color: "bg-emerald-600 border-emerald-700 text-white",
          description: "विद्युत आवेश के प्रवाह तथा चालक में प्रवाहित होने वाली धारा का नियमन।",
          bullets: [
            "आवेश का प्रवाह दर = विद्युत धारा",
            "वोल्टता प्रवणता = विभवांतर",
            "ओह्म का मूलभूत सिद्धांत"
          ],
          children: [
            {
              label: "ओह्म का नियम",
              engLabel: "Ohm's Law (V = IR)",
              color: "bg-green-500 border-green-600 text-white",
              description: "निश्चित ताप पर विभवांतर सीधे विद्युत धारा के समानुपाती होता है:",
              bullets: [
                "V = I × R",
                "R = चालक का प्रतिरोध (Ohm में)",
                "I = धारा का प्रमाण (Ampere में)"
              ]
            },
            {
              label: "श्रेणी और समान्तर",
              engLabel: "Series & Parallel",
              color: "bg-lime-600 border-lime-700 text-white",
              description: "प्रतिरोधों को जोड़ने के दो महत्वपूर्ण तरीके:",
              bullets: [
                "श्रेणीक्रम: Rs = R1 + R2 + R3",
                "समान्तरक्रम: 1/Rp = 1/R1 + 1/R2 + 1/R3"
              ]
            }
          ]
        }
      }
    },
    {
      id: "chem_balance",
      title: "रासायनिक समीकरण संतुलित करना",
      topicName: "अध्याय 1: रासायनिक अभिक्रियाएं (Chemistry)",
      icon: "🧪",
      mindMap: {
        title: "रासायनिक अभिक्रिया के नियम",
        rootNode: {
          label: "द्रव्यमान संरक्षण का नियम",
          engLabel: "Conservation of Mass",
          color: "bg-emerald-600 border-emerald-700 text-white",
          description: "रासायनिक अभिक्रिया में द्रव्यमान का न तो सृजन होता है और न ही विनाश।",
          bullets: [
            "कारक परमाणुओं की संख्या = उत्पाद परमाणुओं की संख्या",
            "हिट एंड ट्रायल विधि द्वारा संतुलन",
            "भौतिक अवस्था के संकेत (s, l, g, aq) लिखना"
          ],
          children: [
            {
              label: "अभिक्रियाओं के प्रकार",
              engLabel: "Types of Reactions",
              color: "bg-teal-500 border-teal-600 text-white",
              description: "अभिक्रिया होने के रासायनिक तरीके:",
              bullets: [
                "संयोजन (Combination): A + B -> AB",
                "वियोजन (Decomposition): AB -> A + B",
                "विस्थापन (Displacement): A + BC -> AC + B"
              ]
            }
          ]
        }
      }
    },
    {
      id: "optics",
      title: "प्रकाश परावर्तन एवं लेंस लैब",
      topicName: "अध्याय 9: प्रकाश - परावर्तन तथा अपवर्तन",
      icon: "👓",
      mindMap: {
        title: "प्रकाशिकी संकल्पना मप",
        rootNode: {
          label: "प्रकाशिकी नियम",
          engLabel: "Reflection & Refraction Rules",
          color: "bg-emerald-600 border-emerald-700 text-white",
          description: "दर्पण एवं लेंस द्वारा किरणों का अपवर्तन एवं परावर्तन कर प्रतिबिम्ब निर्माण।",
          bullets: [
            "परावर्तन के नियम (Angle i = Angle r)",
            "स्नेल का अपवर्तन नियम (sin i / sin r = constant)",
            "लेंस सूत्र और दर्पण सूत्र गणना"
          ],
          children: [
            {
              label: "दर्पण सूत्र और लेंस सूत्र",
              engLabel: "Formulae Study",
              color: "bg-cyan-500 border-cyan-600 text-white",
              description: "उचित चिन्ह परिपाटी के साथ स्थिति निर्धारण:",
              bullets: [
                "दर्पण सूत्र: 1/f = 1/v + 1/u",
                "लेंस सूत्र: 1/f = 1/v - 1/u",
                "आवर्धन (m) = -v/u (दर्पण) या v/u (लेंस)"
              ]
            }
          ]
        }
      }
    }
  ],
  social: [
    {
      id: "nationalism",
      title: "भारत में राष्ट्रवाद (इतिहास)",
      topicName: "इतिहास - अध्याय 2: भारत में राष्ट्रवाद",
      icon: "🇮🇳",
      mindMap: {
        title: "स्वतंत्रता संग्राम की समयरेखा",
        rootNode: {
          label: "भारतीय राष्ट्रीय आंदोलन",
          engLabel: "Freedom Struggle",
          color: "bg-amber-600 border-amber-700 text-white",
          description: "महात्मा गांधी जी के नेतृत्व में लड़ा गया राष्ट्रव्यापी सत्याग्रह संग्राम।",
          bullets: [
            "सत्याग्रह और अहिंसा मुख्य हथियार",
            "जन-जन की भागीदारी",
            "पूर्ण स्वराज का संकल्प"
          ],
          children: [
            {
              label: "असहयोग आंदोलन (1920-22)",
              engLabel: "Non-Cooperation Movement",
              color: "bg-orange-500 border-orange-600 text-white",
              description: "अंग्रेज हुकूमत की आर्थिक मशीनरी को ठप्प करने का अहिंसक प्रयास:",
              bullets: [
                "जलियांवाला बाग के प्रतिशोध में आरंभ",
                "स्वदेशी खादी तथा स्कूल बहिष्कार का नारा",
                "चौरी-चौरा कांड के बाद गांधीजी द्वारा स्थगित"
              ]
            },
            {
              label: "सविनय अवज्ञा (1930)",
              engLabel: "Civil Disobedience",
              color: "bg-yellow-500 border-yellow-600 text-slate-900",
              description: "कानूनों का सामूहिक उलंघन कर ब्रिटिश शासन को कमजोर करना:",
              bullets: [
                "साबरमती से दांडी तट तक दांडी नमक यात्रा",
                "नमक कानून तोड़कर सत्याग्रह का बिगुल फूंका"
              ]
            }
          ]
        }
      }
    },
    {
      id: "geography",
      title: "मृदा संसाधन एवं कृषि (भूगोल)",
      topicName: "भूगोल - अध्याय 1: संसाधन एवं कृषि",
      icon: "🌾",
      mindMap: {
        title: "सस्य प्रारूप और मृदा वर्गीकरण",
        rootNode: {
          label: "भारतीय मृदा एवं फसलें",
          engLabel: "Soil and Agriculture",
          color: "bg-amber-600 border-amber-700 text-white",
          description: "भारत की विविध भौगोलिक संरचना में विभिन्न मृदाओं और तदनुकूल खेती का प्रारूप।",
          bullets: [
            "भौगोलिक परिस्थितियां एवं जल उपलब्धता",
            "प्रमुख 6 प्रकार की मृदा (Soil)",
            "खरीफ, रबी और जायद फसल चक्र"
          ],
          children: [
            {
              label: "मृदा के प्रकार",
              engLabel: "Soil Types",
              color: "bg-amber-500 border-amber-600 text-white",
              description: "प्रमुख भारतीय मृदाएं:",
              bullets: [
                "जलोढ़ मृदा (Alluvial): अत्यंत उपजाऊ, चावल-गेहूं के लिए उत्तम",
                "काली मृदा (Black): कपास की खेती के लिए सर्वोत्तम",
                "लैटराइट मृदा (Laterite): चाय, कॉफी और काजू हेतु अनुकूल"
              ]
            }
          ]
        }
      }
    },
    {
      id: "civics",
      title: "सत्ता की साझेदारी (नागरिक शास्त्र)",
      topicName: "नागरिक शास्त्र - अध्याय 1: सत्ता साझेदारी",
      icon: "🏛️",
      mindMap: {
        title: "लोकतांत्रिक नियंत्रण एवं संतुलन",
        rootNode: {
          label: "सत्ता की साझेदारी",
          engLabel: "Power Sharing",
          color: "bg-amber-600 border-amber-700 text-white",
          description: "लोकतंत्र में टकराव को टालने और स्थायित्व के लिए शक्तियों का समान विभाजन।",
          bullets: [
            "बेल्जियम की समझदारी vs श्रीलंका का गृहयुद्ध",
            "सत्ता के क्षैतिज एवं ऊर्ध्वाधर वितरण",
            "लोकतंत्र की आत्मा"
          ],
          children: [
            {
              label: "साझेदारी के रूप",
              engLabel: "Forms of Power Sharing",
              color: "bg-yellow-500 border-yellow-600 text-slate-800",
              description: "विभाजन के मुख्य प्रकार:",
              bullets: [
                "क्षैतिज (Horizontal): विधायिका, कार्यपालिका और न्यायपालिका",
                "ऊर्ध्वाधर (Vertical): संघ सरकार, राज्य सरकार और स्थानीय निकाय"
              ]
            }
          ]
        }
      }
    }
  ],
  hindi: [
    {
      id: "sandhi",
      title: "स्वर संधि विमर्श (व्याकरण)",
      topicName: "व्याकरण खण्ड: संधि का रहस्य",
      icon: "✍️",
      mindMap: {
        title: "वर्ण संगम और विकार",
        rootNode: {
          label: "संधि",
          engLabel: "Sandhi Rule Matrix",
          color: "bg-rose-600 border-rose-700 text-white",
          description: "दो निकटवर्ती वर्णों के परस्पर मेल से जो परिवर्तन (विकार) होता है, उसे संधि कहते हैं।",
          bullets: [
            "तीन मुख्य भेद: स्वर, व्यंजन और विसर्ग",
            "स्वर संधि के 5 उपभेद",
            "अक्षरों का वैज्ञानिक संयोग"
          ],
          children: [
            {
              label: "स्वर संधि उपभेद",
              engLabel: "5 types of Svar Sandhi",
              color: "bg-pink-500 border-pink-600 text-white",
              description: "स्वरों का मेल:",
              bullets: [
                "दीर्घ (Dirgha): अ+अ=आ, इ+इ=ई",
                "गुण (Guna): अ+इ=ए, अ+उ=ओ",
                "वृद्धि (Vriddhi): अ+ए=ऐ, अ+ओ=औ",
                "यण (Yana): इ+अ=य, उ+अ=व"
              ]
            }
          ]
        }
      }
    },
    {
      id: "samas",
      title: "समास संरचना एवं विग्रह",
      topicName: "व्याकरण खण्ड: समास",
      icon: "📚",
      mindMap: {
        title: "हिंदी समास संकल्पना",
        rootNode: {
          label: "समास (Samas)",
          engLabel: "Compound Words",
          color: "bg-rose-600 border-rose-700 text-white",
          description: "दो या दो से अधिक शब्दों के सार्थक मेल से नए संक्षिप्त शब्द बनाने की क्रिया को समास कहते हैं।",
          bullets: [
            "विभक्ति का लोप",
            "पूर्वपद एवं उत्तरपद प्रधानता",
            "6 प्रमुख भेद"
          ],
          children: [
            {
              label: "महत्वपूर्ण भेद",
              engLabel: "Key Samas Types",
              color: "bg-fuchsia-500 border-fuchsia-600 text-white",
              description: "अर्थ के आधार पर वर्गीकरण:",
              bullets: [
                "अव्ययीभाव: पहला पद अव्यय (यथाशक्ति)",
                "तत्पुरुष: उत्तर पद प्रधान (राजपुत्र)",
                "द्वंद्व: दोनों पद प्रधान (माता-पिता)",
                "बहुव्रीहि: अन्य अर्थ प्रधान (नीलकंठ अर्थात शिव)"
              ]
            }
          ]
        }
      }
    }
  ],
  english: [
    {
      id: "tenses",
      title: "Tense and Verb Transformation",
      topicName: "Grammar Section: Tense Grid",
      icon: "💬",
      mindMap: {
        title: "Tenses & Syntactical Flow",
        rootNode: {
          label: "English Tenses",
          engLabel: "Time Frames",
          color: "bg-sky-600 border-sky-700 text-white",
          description: "The form taken by a verb to show the time of an action and its degree of completeness.",
          bullets: [
            "Present, Past, and Future foundations",
            "Aspects: Simple, Continuous, Perfect, Perfect Continuous",
            "Active and Dynamic Helping Verbs"
          ],
          children: [
            {
              label: "The Tense Quadrant",
              engLabel: "Formulas",
              color: "bg-blue-500 border-blue-600 text-white",
              description: "Key Verb Structures to master for writing corrections:",
              bullets: [
                "Simple Present: V1 / V-s/es",
                "Present Continuous: is/am/are + V-ing",
                "Present Perfect: has/have + V3",
                "Simple Past: static V2 second form"
              ]
            }
          ]
        }
      }
    },
    {
      id: "voice",
      title: "Active and Passive Voice",
      topicName: "Grammar: English Voice Converter",
      icon: "🗣️",
      mindMap: {
        title: "Subject-Object Interplay",
        rootNode: {
          label: "Active & Passive Voice",
          engLabel: "Sentence Structure",
          color: "bg-sky-600 border-sky-700 text-white",
          description: "Active voice centers the performer (Subject) while Passive voice highlights the recipient (Object) of the action.",
          bullets: [
            "Subject and Object swap places",
            "Always uses past participle (V3) in passive",
            "By-agent implementation is crucial"
          ],
          children: [
            {
              label: "Structural Rules",
              engLabel: "Transitions",
              color: "bg-cyan-500 border-cyan-600 text-white",
              description: "Subject, Helping Verb & Verb conversions:",
              bullets: [
                "Active: Subject + Verb + Object",
                "Passive: Object + Auxiliary + V3 + by + Subject",
                "Continuous uses 'being', Perfect uses 'been'"
              ]
            }
          ]
        }
      }
    }
  ],
  sanskrit: [
    {
      id: "lakar",
      title: "धातुरूपाणि एवं लकारः (Verb Conj)",
      topicName: "संस्कृत व्याकरण प्रकाश: लकार",
      icon: "🕉️",
      mindMap: {
        title: "संस्कृत क्रिया प्रवाहः",
        rootNode: {
          label: "लकारः (Sanskrit Lakars)",
          engLabel: "Verb System",
          color: "bg-violet-600 border-violet-700 text-white",
          description: "संस्कृत में कालों तथा अवस्थाओं को व्यक्त करने के लिए १० प्रकार के लकार होते हैं।",
          bullets: [
            "लट् (वर्तमान काल), लृट् (भविष्यत् काल)",
            "लङ् (भूतकाल)",
            "प्रथम, मध्यम, उत्तम पुरुष विभाग"
          ],
          children: [
            {
              label: "प्रत्यय व्यवस्था",
              engLabel: "Suffix endings",
              color: "bg-purple-500 border-purple-600 text-white",
              description: "क्रिया रूप बनाने वाले अंतः प्रत्यय:",
              bullets: [
                "लट् लकार (प्रेजेंट): ति, तः, अन्ति",
                "लृट् लकार (फ्यूचर): स्यति, स्यतः, स्यन्ति",
                "लङ् लकार (पास्ट): अत्, अताम्, अन्"
              ]
            }
          ]
        }
      }
    },
    {
      id: "karak",
      title: "कारक एवं विभक्ति व्यवस्था",
      topicName: "संस्कृत व्याकरण: कारक",
      icon: "🚩",
      mindMap: {
        title: "वाक्यसंरचना कारक चक्र",
        rootNode: {
          label: "कारकम् विभक्तयः",
          engLabel: "Cases & Endings",
          color: "bg-violet-600 border-violet-700 text-white",
          description: "क्रिया के साथ सीधे संबंध रखने वाले संज्ञा अथवा सर्वनाम पदों को कारक कहते हैं।",
          bullets: [
            "संस्कृत में 6 मुख्य कारक (संबंध और संबोधन को कारक नहीं माना जाता)",
            "7 विभक्तियां और उनके चिन्ह",
            "उपपद विभक्ति विशेष नियम"
          ],
          children: [
            {
              label: "विभक्ति एवं कारक चिन्ह",
              engLabel: "Vibhakti Rules",
              color: "bg-indigo-500 border-indigo-600 text-white",
              description: "संस्कृत कारक तालिका सम्बन्ध:",
              bullets: [
                "प्रथमा विभक्ति -> कर्ता कारक (ने)",
                "द्वितीया विभक्ति -> कर्म कारक (को)",
                "तृतीया विभक्ति -> करण कारक (से / द्वारा)"
              ]
            }
          ]
        }
      }
    }
  ]
};

// ==========================================================
// DYNAMIC CHAPTER GENERATOR & CATALOG (NEP 100% COVERAGE)
// ==========================================================

export const DYNAMIC_CATALOG: Record<string, ChapterStructure> = {
  // --- MATHEMATICS ---
  "m-ch1": {
    id: "m-ch1",
    title: "वास्तविक संख्याएं",
    topicName: "अध्याय 1: वास्तविक संख्याएं (Real Numbers)",
    icon: "🔢",
    mindMap: {
      title: "वास्तविक संख्या संरचना",
      rootNode: {
        label: "वास्तविक संख्या संरचना",
        engLabel: "Real Numbers System",
        color: "bg-indigo-600 border-indigo-700 text-white",
        description: "परिमेय और अपरिमेय संख्याओं का पूर्ण संघटन।",
        bullets: [
          "अंकगणित की आधारभूत प्रमेय (BTA)",
          "अभाज्य गुणनखण्डन विधि द्वारा HCF व LCM",
          "अपूर्ण वर्गमूल सिद्धान्त (जैसे √2, √5 की अपरिमेयता)"
        ],
        children: [
          {
            label: "अंकगणित की आधारभूत प्रमेय",
            engLabel: "Fundamental Theorem",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "प्रत्येक भाज्य संख्या को अभाज्य संख्याओं के गुणनफल के रूप में विशिष्टतः व्यक्त कर सकते हैं।",
            bullets: ["अभाज्य गुणनखण्डन क्रिया", "HCF × LCM = a × b सम्बन्ध", "गुणनखण्ड वृक्ष संरचना (Factor Tree)"]
          },
          {
            label: "अपरिमेयता प्रमाण",
            engLabel: "Irrationality Proofs",
            color: "bg-cyan-500 border-cyan-600 text-white",
            description: "बाध्यकारी विरोध विधि (Contradiction) से सिद्ध करना कि √2, √3, √5 अपरिमेय हैं।",
            bullets: ["p/q सह-अभाज्य सम्बन्धी विरोधाभास", "मानक सूत्र सत्यापन", "बोर्ड परीक्षा का नियमित प्रश्न प्रारूप"]
          },
          {
            label: "शांत एवं अशांत प्रसार",
            engLabel: "Decimal Representation",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "हर के अभाज्य खण्ड 2^n * 5^m होने पर सांत प्रसार, अन्यथा अशांत आवर्ती।",
            bullets: ["शांत और अशांत आवर्ती की पहचान", "अपरिमेय संख्या का अशांत अनावर्ती प्रसार", "बिना विभाजन क्रिया उत्तर नियम"]
          }
        ]
      }
    }
  },
  "m-ch2": {
    id: "m-ch2",
    title: "बहुपद",
    topicName: "अध्याय 2: बहुपद (Polynomials)",
    icon: "📈",
    mindMap: {
      title: "बहुपद बुनियादी ढांचा",
      rootNode: {
        label: "बहुपद सिद्धान्त",
        engLabel: "Polynomial Core",
        color: "bg-indigo-600 border-indigo-700 text-white",
        description: "बीजगणितीय व्यंजक जिसमें चर की घातें धनात्मक पूर्णांक होती हैं।",
        bullets: [
          "बहुपद की कोटि/घात (Degree)",
          "शून्यकों का ज्यामितीय आलेख अर्थ",
          "शून्यकों एवं गुणांकों में सम्बन्ध समीकरण"
        ],
        children: [
          {
            label: "घात व प्रकार",
            engLabel: "Degree & Classifications",
            color: "bg-emerald-500 border-emerald-600 text-white",
            description: "चर की अधिकतम घात बहुपद की घात कहलाती है।",
            bullets: ["रैखिक (Linear): घात 1", "द्विघात (Quadratic): घात 2", "त्रिघात (Cubic): घात 3"]
          },
          {
            label: "शून्यक ज्यामितीय अर्थ",
            engLabel: "Geometrical Zeroes",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "बहुपद आलेख x-अक्ष को जहाँ प्रच्छेदन करता है, वह शून्यक है।",
            bullets: ["रैखिक का एक सरल रेखा आलेख", "द्विघात का परवलय (Parabola) रूप", "शून्यकों की कुल संख्या x-प्रतिच्छेदन पर आधारित"]
          },
          {
            label: "गुणांक-शून्यक अंतर्संबंध",
            engLabel: "Coefficients Relation",
            color: "bg-pink-500 border-pink-600 text-white",
            description: "द्विघात ax² + bx + c के शून्यक α, β के सम्बन्ध नियम:",
            bullets: ["शून्यकों का योग (α + β) = -b/a", "शून्यकों का गुणन (α × β) = c/a", "समीकरण निर्माण: x² - (α+β)x + αβ = 0"]
          }
        ]
      }
    }
  },
  "m-ch3": {
    id: "m-ch3",
    title: "दो चर वाले रैखिक समीकरण युग्म",
    topicName: "अध्याय 3: रैखिक समीकरण (Linear Equations)",
    icon: "📊",
    mindMap: {
      title: "रैखिक समीकरण सिद्धान्त",
      rootNode: {
        label: "रैखिक समीकरण युग्म",
        engLabel: "Pair of Linear Equations",
        color: "bg-indigo-600 border-indigo-700 text-white",
        description: "दो चरों x और y में दो रैखिक समीकरणों का विश्लेषण।",
        bullets: [
          "स्थिति की शर्तें (a1/a2)",
          "प्रतिस्थापन एवं विलोपन विधियाँ",
          "ग्राफीय निरूपण व हल प्रकार"
        ],
        children: [
          {
            label: "ग्राफीय एवं संगति नियम",
            engLabel: "Symmetry & Graphing",
            color: "bg-orange-500 border-orange-600 text-white",
            description: "रेखाओं की स्थिति गुणांकों के अनुपात से ज्ञात करना:",
            bullets: ["अद्वितीय हल: a1/a2 ≠ b1/b2 (प्रतिच्छेदी)", "अनंत हल: a1/a2 = b1/b2 = c1/c2 (संपाती)", "कोई हल नहीं: a1/a2 = b1/b2 ≠ c1/c2 (समांतर)"]
          },
          {
            label: "बीजगणितीय विधियाँ",
            engLabel: "Algebraic Resolution",
            color: "bg-emerald-500 border-emerald-600 text-white",
            description: "समीकरणों को हल करने हेतु सर्वश्रेष्ठ रणनीतियाँ:",
            bullets: ["प्रतिस्थापन विधि (Substitution)", "विलोपन विधि (Elimination)", "वज्रगुणन विधि (Cross-multiplication)"]
          },
          {
            label: "व्यावहारिक अनुप्रयोग",
            engLabel: "Word Problems",
            color: "bg-indigo-500 border-indigo-600 text-white",
            description: "आयु, दूरी, कार्य, नाव व धारा सम्बन्धी इबारती प्रश्न हल विधि।",
            bullets: ["कथनों को समीकरणों में ढालना", "इकाइयों का सुसंगतीकरण", "त्रुटिहीन बीजगणितीय संक्रियाएं"]
          }
        ]
      }
    }
  },
  "m-ch6": {
    id: "m-ch6",
    title: "त्रिभुज",
    topicName: "अध्याय 6: त्रिभुज (Triangles)",
    icon: "🔺",
    mindMap: {
      title: "समरूप त्रिभुज सिद्धान्त",
      rootNode: {
        label: "समरूपता सिद्धान्त",
        engLabel: "Similar Triangles",
        color: "bg-amber-600 border-amber-700 text-white",
        description: "त्रिभुजों की समरूपता एवं उनके ज्यामितीय प्रमेयों का गहन अध्ययन।",
        bullets: [
          "थेल्स प्रमेय (BPT आधारभूत आनुपातिकता प्रमेय)",
          "समरूपता की मुख्य कसौटियाँ (AAA, SSS, SAS)",
          "पाइथागोरस सिद्धान्त व समरूप आकृतियाँ"
        ],
        children: [
          {
            label: "आधारभूत समानुपातिकता",
            engLabel: "BPT / Thales Theorem",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "त्रिभुज की एक भुजा के समांतर खींची गई रेखा अन्य दो भुजाओं को निश्चित अनुपात में बांटती है।",
            bullets: ["AD/DB = AE/EC सत्यापन", "थेल्स प्रमेय का विलोम रूप", "समानुपाती रेखाओं के गुणधर्म"]
          },
          {
            label: "समरूपता की कसौटियाँ",
            engLabel: "Similarity Criteria",
            color: "bg-cyan-500 border-cyan-600 text-white",
            description: "त्रिभुजों की समरूपता की शर्तें:",
            bullets: ["AAA (कोण-कोण-कोण) समरूपता", "SSS (भुजा-भुजा-भुजा) आनुपातिक नियम", "SAS (भुजा-कोण-भुजा) सम्बन्ध"]
          },
          {
            label: "समरूप त्रिभुजों के क्षेत्रफल",
            engLabel: "Areas & Pythagoras",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "क्षेत्रफलों का अनुपात उनकी संगत भुजाओं के वर्ग के अनुपात के बराबर होता है।",
            bullets: ["AreaRatio = (SideRatio)²", "पाइथागोरस प्रमेय: कर्ण² = आधार² + लम्ब²", "समकोण त्रिभुज समरूपता उपप्रमेय"]
          }
        ]
      }
    }
  },
  "m-ch7": {
    id: "m-ch7",
    title: "निर्देशांक ज्यामिति",
    topicName: "अध्याय 7: निर्देशांक ज्यामिति (Coordinate Geometry)",
    icon: "📍",
    mindMap: {
      title: "निर्देशांक ज्यामिति सूत्र",
      rootNode: {
        label: "निर्देशांक ज्यामिति",
        engLabel: "Coordinate Geometry",
        color: "bg-indigo-600 border-indigo-700 text-white",
        description: "कार्तिय तल पर बिंदुओं की स्थिति, दूरी एवं विभाजन के बीजगणितीय हल।",
        bullets: [
          "दूरी सूत्र (Distance Formula)",
          "विभाजन सूत्र (Section Formula)",
          "त्रिभुज का क्षेत्रफल समीकरण"
        ],
        children: [
          {
            label: "दूरी सूत्र संकल्पना",
            engLabel: "Distance Formula",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "दो बिंदुओं P(x1,y1) और Q(x2,y2) के मध्य की हवाई दूरी:",
            bullets: ["d = √[(x2-x1)² + (y2-y1)²]", "मूल बिंदु से दूरी: √(x² + y²)", "संरेखता (Collinearity) परीक्षण"]
          },
          {
            label: "विभाजन सूत्र",
            engLabel: "Section Formula",
            color: "bg-indigo-500 border-indigo-600 text-white",
            description: "रेखाखण्ड को m1 : m2 के अनुपात में बांटने वाले बिंदु के निर्देशांक:",
            bullets: ["x = (m1x2 + m2x1)/(m1+m2)", "y = (m1y2 + m2y1)/(m1+m2)", "मध्यबिंदु: ((x1+x2)/2, (y1+y2)/2)"]
          },
          {
            label: "क्षेत्रफल सूत्र",
            engLabel: "Area of Triangle",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "शीर्ष (x1,y1), (x2,y2), (x3,y3) वाले त्रिभुज का क्षेत्रफल:",
            bullets: ["1/2 |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|", "क्षेत्रफल शून्य होने पर बिंदु संरेख हैं", "चतुर्भुज क्षेत्रफल हेतु दो त्रिभुजों का योग"]
          }
        ]
      }
    }
  },
  "m-ch10": {
    id: "m-ch10",
    title: "वृत्त",
    topicName: "अध्याय 10: वृत्त (Circles)",
    icon: "⚪",
    mindMap: {
      title: "वृत्त एवं स्पर्शरेखाएं",
      rootNode: {
        label: "वृत्त ज्यामिति",
        engLabel: "Circles Core Geometry",
        color: "bg-amber-600 border-amber-700 text-white",
        description: "वृत्त तथा उसकी छेदक एवं स्पर्शरेखाओं के मूलभूत गुणधर्म।",
        bullets: [
          "स्पर्श रेखा (Tangent) परिभाषा",
          "त्रिज्या-स्पर्शरेखा लम्बवत सम्बन्ध",
          "बाह्य बिंदु से स्पर्शरेखा समता प्रमेय"
        ],
        children: [
          {
            label: "स्पर्शरेखा गुणधर्म",
            engLabel: "Tangent Properties",
            color: "bg-emerald-500 border-emerald-600 text-white",
            description: "वह रेखा जो वृत्त को केवल एक बिंदु पर स्पर्श करती है स्पर्श रेखा है।",
            bullets: ["स्पर्श बिंदु (Point of Contact)", "वृत्त पर अनंत स्पर्शरेखाएं सम्भव", "छेदक रेखा (Secant) से तुलना"]
          },
          {
            label: "प्रमेय 10.1 (लम्बवत)",
            engLabel: "Theorem 10.1 (Perpendicular)",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "स्पर्श बिंदु से जाने वाली त्रिज्या स्पर्श रेखा पर लम्ब होती है।",
            bullets: ["OP ⊥ XY सम्बन्ध", "त्रिज्या और स्पर्श रेखा के मध्य 90° कोण", "समकोण त्रिभुज पाइथागोरस का अनुप्रयोग"]
          },
          {
            label: "प्रमेय 10.2 (बाह्य बिंदु)",
            engLabel: "Theorem 10.2 (Lengths)",
            color: "bg-pink-500 border-pink-600 text-white",
            description: "बाह्य बिंदु से वृत्त पर खींची गई स्पर्श रेखाओं की लम्बाइयाँ बराबर होती हैं।",
            bullets: ["PA = PB सत्यता", "केंद्र पर स्पर्शरेखाओं द्वारा बनाया गया समान कोण", "चक्रीय चतुर्भुज की विशेष उपपत्तियाँ"]
          }
        ]
      }
    }
  },
  "m-ch11": {
    id: "m-ch11",
    title: "वृत्तों से संबंधित क्षेत्रफल",
    topicName: "अध्याय 11: वृत्तीय क्षेत्रफल (Areas of Circles)",
    icon: "🍰",
    mindMap: {
      title: "वृत्तीय क्षेत्रफल खण्ड",
      rootNode: {
        label: "वृत्तीय खण्ड फल",
        engLabel: "Areas Related to Circles",
        color: "bg-indigo-600 border-indigo-700 text-white",
        description: "वृत्त के त्रिज्यखंड, वृत्तखंड और चाप की लंबाई के सूत्रों का व्यावहारिक ज्ञान।",
        bullets: [
          "त्रिज्यखंड का क्षेत्रफल (Sector Area)",
          "वृत्तखंड का क्षेत्रफल (Segment Area)",
          "चाप की लंबाई (Arc Length) गणना"
        ],
        children: [
          {
            label: "त्रिज्यखंड क्षेत्रफल",
            engLabel: "Area of Sector",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "दो त्रिज्याओं और संगत चाप से घिरा वृत्त का भाग त्रिज्यखंड कहलाता है।",
            bullets: ["लघु त्रिज्यखंड: (θ/360°) × πr²", "दीर्घ त्रिज्यखंड: πr² - लघु त्रिज्यखंड", "केंद्र पर अंतरित कोण θ"]
          },
          {
            label: "चाप की लंबाई",
            engLabel: "Length of Arc",
            color: "bg-cyan-500 border-cyan-600 text-white",
            description: "त्रिज्यखंड के चाप की लम्बाई परिधि का एक टुकड़ा है:",
            bullets: ["L = (θ/360°) × 2πr", "पूर्ण परिधि सम्बन्ध नियम", "घड़ी की सुई द्वारा घेरा गया भाग"]
          },
          {
            label: "वृत्तखंड का क्षेत्रफल",
            engLabel: "Area of Segment",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "जीवा और संगत चाप के बीच स्थित वृत्त का भाग वृत्तखंड है।",
            bullets: ["क्षेत्रफल = त्रिज्यखंड - संगत त्रिभुज का क्षेत्रफल", "त्रिभुज क्षेत्रफल: 1/2 r² sin θ", "दीर्घ वृत्तखंड गणना विधि"]
          }
        ]
      }
    }
  },
  "m-ch12": {
    id: "m-ch12",
    title: "पृष्ठीय क्षेत्रफल और आयतन",
    topicName: "अध्याय 12: ठोसों की ज्यामिति (3D Volumes)",
    icon: "📦",
    mindMap: {
      title: "3D पृष्ठीय आयतन",
      rootNode: {
        label: "3D ठोस ज्यामिति",
        engLabel: "Surface Areas & Volumes",
        color: "bg-indigo-600 border-indigo-700 text-white",
        description: "संयोजित ठोसों (शंकु, बेलन, गोलार्ध, घन) के क्षेत्रफल एवं आयतन का विश्लेषण।",
        bullets: [
          "संयोजित ठोसों का क्षेत्रफल",
          "संयोजित ठोसों का आयतन",
          "एक ठोस का दूसरे में रूपांतरण"
        ],
        children: [
          {
            label: "संयोजित पृष्ठीय क्षेत्रफल",
            engLabel: "Combined Surface Area",
            color: "bg-indigo-500 border-indigo-600 text-white",
            description: "दो या दो से अधिक ठोस आकृतियों के मेल से बनी आकृति का कुल क्षेत्रफल:",
            bullets: ["खिलौने (शंकु+अर्धगोला) का वक्र क्षेत्रफल", "तम्बू (बेलन+शंकु) का कैनवास क्षेत्रफल", "छिपे हुए उभयनिष्ठ फलकों को घटाना"]
          },
          {
            label: "संयोजित आयतन",
            engLabel: "Combined Volume",
            color: "bg-pink-500 border-pink-600 text-white",
            description: "संयोजित ठोसों द्वारा घेरा गया कुल स्थान (आयतन):",
            bullets: ["दोनों ठोसों के पृथक आयतनों का सीधा जोड़", "कैप्सूल (बेलन+2 गोलार्ध) की क्षमता", "जैम जार या बीकर सम्बन्धी रासायनिक प्रश्न"]
          },
          {
            label: "आकार का रूपांतरण",
            engLabel: "Melting and Recasting",
            color: "bg-purple-500 border-purple-600 text-white",
            description: "एक ठोस (जैसे गोला) को पिघलाकर दूसरे ठोस (जैसे बेलन) में बदलने पर आयतन अपरिवर्तित रहता है।",
            bullets: ["प्रारंभिक आयतन = अंतिम आयतन सुत्र", "संख्या की गणना (बड़ी आकृति / छोटी आकृति)", "ऊंचाई या त्रिज्या में परिवर्तन समीकरण"]
          }
        ]
      }
    }
  },
  "m-ch13": {
    id: "m-ch13",
    title: "सांख्यिकी",
    topicName: "अध्याय 13: सांख्यिकी (Statistics Core)",
    icon: "📊",
    mindMap: {
      title: "सांख्यिकी माप चार्ट",
      rootNode: {
        label: "सांख्यिकी विश्लेषण",
        engLabel: "Statistics",
        color: "bg-amber-600 border-amber-700 text-white",
        description: "वर्गीकृत आंकड़ों का माध्य, बहुलक तथा माध्यिका ज्ञात करने के सिद्धांत।",
        bullets: [
          "माध्य (Mean) की तीनों विधियाँ",
          "बहुलक (Mode) का सटीक वर्गीकरण",
          "माध्यिका (Median) व संचयी बारंबारता"
        ],
        children: [
          {
            label: "माध्य (Mean) गणना",
            engLabel: "Mean Calculation",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "वर्गीकृत आंकड़ों का औसत ज्ञात करने की उत्कृष्ट वैज्ञानिक विधियाँ:",
            bullets: ["प्रत्यक्ष विधि (Direct): Σfi xi / Σfi", "कल्पित माध्य विधि (Assumed Mean): a + Σfi di / Σfi", "पग विचलन विधि (Step Deviation)"]
          },
          {
            label: "बहुलक (Mode)",
            engLabel: "Mode of Grouped Data",
            color: "bg-orange-500 border-orange-600 text-white",
            description: "वर्गीकृत आंकड़ों में सर्वाधिक आवृत्ति वाला बिंदु बहुलक वर्ग कहलाता है।",
            bullets: ["सूत्र: l + [(f1 - f0)/(2f1 - f0 - f2)] × h", "f1 = बहुलक वर्ग की बारंबारता", "l = बहुलक वर्ग की निम्न सीमा"]
          },
          {
            label: "माध्यक (Median)",
            engLabel: "Median & Accumulation",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "वर्गीकृत आंकड़ों में ठीक मध्य का मान ज्ञात करने का नियम:",
            bullets: ["सूत्र: l + [(N/2 - CF)/f] × h", "CF = संचयी बारंबारता (Cumulative)", "तीनों मापों का आनुभविक संबंध: 3 माध्यक = बहुलक + 2 माध्य"]
          }
        ]
      }
    }
  },
  "m-ch14": {
    id: "m-ch14",
    title: "प्रायिकता",
    topicName: "अध्याय 14: प्रायिकता सिद्धांत (Probability)",
    icon: "🎲",
    mindMap: {
      title: "प्रायिकता संभाव्यता नक्शा",
      rootNode: {
        label: "प्रायिकता सिद्धान्त",
        engLabel: "Probability Theory",
        color: "bg-indigo-600 border-indigo-700 text-white",
        description: "अनिश्चितता के बीच घटनाओं के घटित होने की गणितीय संभावना।",
        bullets: [
          "सैद्धांतिक प्रायिकता P(E) नियम",
          "निश्चित (P=1) व असंभव (P=0) घटनाएँ",
          "सिक्के, पासे एवं ताश के सामान्य प्रयोग"
        ],
        children: [
          {
            label: "मूल प्रायिकता नियम",
            engLabel: "Core Formulas",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "घटना E की प्रायिकता P(E) = अनुकूल परिणाम / कुल परिणाम।",
            bullets: ["0 ≤ P(E) ≤ 1 की सीमा", "प्राथमिक घटनाओं की प्रायिकताओं का योग 1", "पूरक घटना: P(E) + P(not E) = 1"]
          },
          {
            label: "ताश एवं पासा पद्धतियाँ",
            engLabel: "Cards & Dice Labs",
            color: "bg-purple-500 border-purple-600 text-white",
            description: "ताश की 52 पत्तियों और पासे के 6 फलकों के प्रायिकता नियम:",
            bullets: ["ताश: 26 लाल, 26 काले, 12 फेस कार्ड", "एक पासे पर विषम, सम या अभाज्य संख्या प्रायिकता", "दो सिक्कों या एक पासे के युगल प्रयोग परिणाम"]
          },
          {
            label: "प्रायोगिक एवं व्यावहारिक",
            engLabel: "Applications",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "दैनिक जीवन में प्रायिकता, त्रुटिपूर्ण डिब्बों में से अच्छे पेन निकालना या बैग में से गेंद चुनना।",
            bullets: ["यादृच्छिक चयन (Random Selection)", "थैले में विभिन्न रंगों की गेंदें संकल्पना", "असंभाव्य और संभावित घटनाओं की व्यावहारिक समझ"]
          }
        ]
      }
    }
  },

  // --- SCIENCE ---
  "s-ch2": {
    id: "s-ch2",
    title: "अम्ल, क्षारक एवं लवण",
    topicName: "अध्याय 2: रासायनिक रसायन (Acid-Base-Salt)",
    icon: "🧪",
    mindMap: {
      title: "अम्ल-क्षार-लवण तंत्र",
      rootNode: {
        label: "अम्ल, क्षारक एवं लवण",
        engLabel: "Acids, Bases & Salts",
        color: "bg-emerald-600 border-emerald-700 text-white",
        description: "रसायन शास्त्र की वह शाखा जो हमारे दैनिक भोजन और रसायनों के गुणों को समझती है।",
        bullets: [
          "सूचकों (Indicators) द्वारा पहचान",
          "pH पैमाना एवं दैनिक जीवन में प्रभाव",
          "औद्योगिक लवण (उदा. धोने का सोडा, ब्लीचिंग)"
        ],
        children: [
          {
            label: "मूल गुणधर्म व पहचान",
            engLabel: "Indicator Properties",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "अम्ल स्वाद में खट्टे (H+ आयन) और क्षारक कसैले (OH- आयन) होते हैं।",
            bullets: ["नीला लिटमस लाल = अम्ल नियम", "लाल लिटमस नीला = क्षार नियम", "हल्दी व फिनोलफ्थेलीन कृत्रिम सूचक"]
          },
          {
            label: "pH पैमाना",
            engLabel: "pH Scale 0 to 14",
            color: "bg-amber-500 border-amber-600 text-white",
            description: "हाइड्रोजन आयन की सांद्रता नापने का पैमाना, जहां 7 उदासीन है।",
            bullets: ["pH < 7 अम्लीय, pH > 7 क्षारीय", "दंतक्षय प्रारंभ pH 5.5 से कम होने पर", "अम्लीय वर्षा (pH < 5.6) के विनाशक प्रभाव"]
          },
          {
            label: "महत्वपूर्ण रसायनिक लवण",
            engLabel: "Key Industrial Salts",
            color: "bg-rose-500 border-rose-600 text-white",
            description: "साधारण नमक (NaCl) से निर्मित होने वाले प्रमुख रसायन:",
            bullets: ["ब्लीचिंग पाउडर (विरंजक चूर्ण): CaOCl₂", "बेकिंग सोडा (खाने का सोडा): NaHCO₃", "प्लास्टर ऑफ पेरिस (POP): CaSO₄ • 1/2 H₂O"]
          }
        ]
      }
    }
  },
  "s-ch3": {
    id: "s-ch3",
    title: "धातु एवं अधातु",
    topicName: "अध्याय 3: धातु और अधातु (Metals-Nonmetals)",
    icon: "⚙️",
    mindMap: {
      title: "धातु विज्ञान संकल्पना",
      rootNode: {
        label: "धातु एवं अधातु",
        engLabel: "Metals & Non-metals",
        color: "bg-emerald-600 border-emerald-700 text-white",
        description: "तत्वों का उनके भौतिक, रासायनिक व आबंध बनाने के आधार पर वर्गीकरण।",
        bullets: [
          "आघातवर्धनीयता (Malleable) व तन्यता (Ductile)",
          "तत्वों की सक्रियता श्रेणी (Reactivity Series)",
          "आयनिक यौगिकों के असाधारण गुणधर्म"
        ],
        children: [
          {
            label: "भौतिक एवं रसायनिक",
            engLabel: "Physical & Chemical",
            color: "bg-gray-500 border-gray-600 text-white",
            description: "धातुएं चमकीली व ठोस हैं, अधातुएं भंगुर व कुचालक हैं।",
            bullets: ["अपवाद: पारा कमरे के ताप पर द्रव है", "तांबा व चांदी विद्युत के सर्वोत्तम सुचालक", "अधातु अपवाद: ग्रेफाइट सुचालक है"]
          },
          {
            label: "सक्रियता श्रेणी",
            engLabel: "Reactivity and Extraction",
            color: "bg-orange-500 border-orange-600 text-white",
            description: "धातुओं की क्रियाशीलता का घटता हुआ क्रम:",
            bullets: ["पोटेशियम व सोडियम अत्यधिक सक्रिय (किरोसिन में सुरक्षित)", "विस्थापन अभिक्रिया: अधिक सक्रिय कम को विस्थापित करती है", "धातु निष्कर्षण: भर्जन (Roasting) एवं निस्तापन (Calcination)"]
          },
          {
            label: "आयनिक यौगिक",
            engLabel: "Ionic Bonding (NaCl)",
            color: "bg-amber-500 border-amber-600 text-white",
            description: "धातु से अधातु में इलेक्ट्रॉनों के पूर्ण स्थानांतरण से बने आबंध।",
            bullets: ["उच्च गलनांक और क्वथनांक (Melting Point)", "जल में घुलनशील, बेंजीन में अघुलनशील", "जलीय विलयन में विद्युत के चालक"]
          }
        ]
      }
    }
  },
  "s-ch4": {
    id: "s-ch4",
    title: "कार्बन एवं उसके यौगिक",
    topicName: "अध्याय 4: कार्बनिक रसायन (Carbon Compounds)",
    icon: "💎",
    mindMap: {
      title: "कार्बनिक रसायन पेड़",
      rootNode: {
        label: "कार्बन शास्त्र",
        engLabel: "Carbon & Compounds",
        color: "bg-emerald-600 border-emerald-700 text-white",
        description: "कार्बन की सर्वतोमुखी प्रकृति, सहसंयोजी आबंध और अनगिनत कार्बनिक यौगिकों का विस्तृत विमर्श।",
        bullets: [
          "सहसंयोजी आबंध व चतुःसंयोजकता",
          "समजातीय श्रेणी व नामकरण (IUPAC)",
          "साबुन, अपमार्जक व मिसेल संरचना"
        ],
        children: [
          {
            label: "सहसंयोजी आबंधन",
            engLabel: "Covalent Bonds",
            color: "bg-emerald-500 border-emerald-600 text-white",
            description: "इलेक्ट्रॉनों की समान साझेदारी से बनने वाले मजबूत आबंध।",
            bullets: ["कार्बन की चतुःसंयोजकता (Tetravalency)", "श्रृंखलन गुण (Catenation - बड़ी श्रृंखलाएं बनाना)", "अपररूप: हीरा, ग्रेफाइट व फुलरीन (C-60)"]
          },
          {
            label: "समजातीय व IUPAC",
            engLabel: "Homologous & Nomenclature",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "समान क्रियात्मक समूह जिनमें निकटवर्ती यौगिकों में -CH₂- का अंतर हो।",
            bullets: ["एल्केन (CnH2n+2), एल्कीन (CnH2n), एल्काइन (CnH2n-2)", "प्रकार्यात्मक समूह: कलोरो, एल्कोहल, एल्डिहाइड, कीटोन, कार्बोक्सिलिक", "IUPAC नामकरण मानक प्रक्रिया पद्धति"]
          },
          {
            label: "साबुन व मिसेल क्रियाशीलता",
            engLabel: "Soaps & Detergents",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "साबुन के अणु लंबी श्रृंखला वाले कार्बोक्सिलिक अम्लों के सोडियम लवण होते हैं।",
            bullets: ["जलरागी सिरा (Hydrophilic): जल-आकर्षित", "जलविरागी सिरा (Hydrophobic): मैल-आकर्षित", "मिसेल (Micelle) द्वारा तैलीय मैल का पायसीकरण"]
          }
        ]
      }
    }
  },
  "s-ch5": {
    id: "s-ch5",
    title: "जैव प्रक्रम",
    topicName: "अध्याय 5: जीव विज्ञान (Life Processes)",
    icon: "☘️",
    mindMap: {
      title: "जैव प्रक्रम मुख्य जीवन चक्र",
      rootNode: {
        label: "जैव प्रक्रम (Life Processes)",
        engLabel: "Life Processes Biological Core",
        color: "bg-emerald-600 border-emerald-700 text-white",
        description: "वे सभी प्रक्रम जो सम्मिलित रूप से सजीवों के अनुरक्षण और जीवन जीने के लिए अनिवार्य हैं।",
        bullets: [
          "पोषण (स्वपोषी और विषमपोषी)",
          "श्वसन क्रिया (वायवीय व अवायवीय)",
          "उत्सर्जन व दोहरा परिसंचरण तंत्र"
        ],
        children: [
          {
            label: "सजीव पोषण प्रक्रम",
            engLabel: "Nutrition Block",
            color: "bg-emerald-500 border-emerald-600 text-white",
            description: "भोजन ग्रहण करना और उसे पचाकर ऊर्जा प्राप्त करना पोषण कहलाता है।",
            bullets: ["प्रकाश संश्लेषण: 6CO₂ + 12H₂O + सूर्यप्रकाश -> ग्लूकोज + 6O₂ + 6H₂O", "अमीबा में पोषण: पादाभ (Pseudopodia) द्वारा भोजन घेरना", "मानव पाचन तंत्र: आमाशय, क्षुद्रान्त्र (HCI, पेप्सिन, पित्त रस)"]
          },
          {
            label: "श्वसन एवं परिवहन",
            engLabel: "Respiration & Flow",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "ग्लूकोज का विखंडन कर कोशिका स्तर पर ऊर्जा (ATP) उत्पन्न करना श्वसन है।",
            bullets: ["वायवीय (ऑक्सीजन युक्त) बनाम अवायवीय (ऑक्सीजन हीन)", "मानव हृदय: चार कोष्ठक (चार चैंबर) व दोहरा परिसंचरण", "रक्तदाब (Blood Pressure): सिस्टोलिक 120 / डायस्टोलिक 80 mmHg"]
          },
          {
            label: "मानव उत्सर्जन तंत्र",
            engLabel: "Excretion & Nephron",
            color: "bg-indigo-500 border-indigo-600 text-white",
            description: "शरीर से हानिकारक नाइट्रोजन युक्त अपशिष्ट पदार्थों को बाहर निकालना उत्सर्जन है।",
            bullets: ["उत्सर्जन तंत्र के अंग: वृक्क (Kidney), मूत्रवाहिनी, यूरिनरी ब्लैडर", "वृक्काणु (Nephron): वृक्क की कार्यात्मक छननी इकाई", "पौधों में उत्सर्जन: गोंद, रेजिन और पत्तियों के गिरने द्वारा"]
          }
        ]
      }
    }
  },
  "s-ch6": {
    id: "s-ch6",
    title: "नियंत्रण एवं समन्वय",
    topicName: "अध्याय 6: जीव विज्ञान (Control & Coordination)",
    icon: "🧠",
    mindMap: {
      title: "तंत्रिका तंत्र समन्वय",
      rootNode: {
        label: "नियंत्रण व समन्वय",
        engLabel: "Control & Coordination",
        color: "bg-emerald-600 border-emerald-700 text-white",
        description: "शरीर के विभिन्न अंगों की क्रियाओं को नियंत्रित कर बाहरी वातावरण के अनुकूल ढालने की प्रणाली।",
        bullets: [
          "तंत्रिका कोशिका (Neuron) संरचना",
          "मानव मस्तिष्क के तीनों मुख्य भाग",
          "पादप एवं जंतु हार्मोन संतुलन"
        ],
        children: [
          {
            label: "तंत्रिका कोशिका / न्यूरॉन",
            engLabel: "Neuron Functioning",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "सूचनाओं को विद्युत आवेगों के रूप में भेजने वाली क्रियाशील इकाई।",
            bullets: ["द्रुमिका (Dendrite): सूचना ग्रहण करना", "प्रतिक्षेपी चाप (Reflex Arc): मेरुरज्जु (Spinal Cord) द्वारा त्वरित सुरक्षा प्रतिक्रिया", "सिनेप्स (Synapse): दो न्यूरॉन के बीच रासायनिक संधि"]
          },
          {
            label: "मानव मस्तिष्क घटक",
            engLabel: "Human Brain Parts",
            color: "bg-pink-500 border-pink-600 text-white",
            description: "समस्त शरीर का केंद्रीय नियंत्रण कक्ष:",
            bullets: ["अग्रमस्तिष्क (Forebrain): विचार, स्मरण, स्वैच्छिक क्रियाएं", "मध्यमस्तिष्क: अनैच्छिक क्रियाओं का केंद्रक", "पश्चमस्तिष्क: अनुमस्तिष्क (संतुलन), मेडुला (रक्तदाब, उल्टी), पोंस"]
          },
          {
            label: "हार्मोनल समन्वय तंत्र",
            engLabel: "Plant & Animal Hormones",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "रासायनिक दूत जो वृद्धि और विकास का समन्वय करते हैं।",
            bullets: ["पादप हार्मोन: ऑक्सिन (झुकाव), जिबरेलिन, साइटोकाइनिन, एब्सिसिक (पतझड़)", "मानव अंतःस्रावी ग्रंथियां: थायराइड (थायरोक्सिन), अग्न्याशय (इंसुलिन)", "अधिवृक्क ग्रंथि: एड्रिनेलिन (लड़ो या उड़ो आपातकालीन हार्मोन)"]
          }
        ]
      }
    }
  },
  "s-ch7": {
    id: "s-ch7",
    title: "जीव जनन कैसे करते हैं?",
    topicName: "अध्याय 7: जीव जनन (Reproduction)",
    icon: "🧬",
    mindMap: {
      title: "जनन स्वास्थ्य एवं प्रणालियाँ",
      rootNode: {
        label: "जीवों में जनन",
        engLabel: "How Organisms Reproduce",
        color: "bg-emerald-600 border-emerald-700 text-white",
        description: "प्रजाति की निरंतरता बनाए रखने के लिए नए जीवों की उत्पत्ति का जैविक अध्याय।",
        bullets: [
          "अलैंगिक जनन की विविध विधियाँ",
          "पुष्पी पादपों में द्वि-निषेचन सिद्धांत",
          "मानव जनन स्वास्थ्य व गर्भ-निरोध"
        ],
        children: [
          {
            label: "अलैंगिक जनन तकनीक",
            engLabel: "Asexual Methods",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "केवल एक जनक की भागीदारी से नए जीव का विकास होना।",
            bullets: ["द्विखंडन (अमीबा), बहुखंडन (प्लाज्मोडियम)", "पुनरुद्भवन (प्लेनेरिया), मुकुलन (यूरेशिया, हाइड्रा)", "कायिक प्रवर्धन (Vegetative): गन्ना, गुलाब, ब्रायोफिलम पत्ती"]
          },
          {
            label: "लैंगिक जनन व परागण",
            engLabel: "Sexual & Plants",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "नर और मादा युग्मकों (Gametes) के संलयन से संतान का उत्पन्न होना।",
            bullets: ["पुष्प के भाग: बाह्यदल, पंखुड़ी, पुंकेसर (नर), स्त्रीकेसर (मादा)", "स्व-परागण (Self) बनाम पर-परागण (Cross pollination)", "निषेचन के बाद बीजांड से बीज और अंडाशय से फल का बनना"]
          },
          {
            label: "मानव जनन एवं स्वास्थ्य",
            engLabel: "Reproductive Health",
            color: "bg-purple-500 border-purple-600 text-white",
            description: "यौवनारंभ (Puberty) पर शारीरिक परिवर्तन तथा जनन अंगों की परिपक्वता।",
            bullets: ["नर जनन तंत्र: वृषण (टेस्टोस्टेरोन), मादा जनन: अंडाशय, गर्भाशय", "गर्भनिरोधक युक्तियाँ: कंडोम, कॉपर-टी, शल्यक्रिया (वेसेक्टॉमी/ट्यूबेक्टॉमी)", "यौन संचारित रोग (STDs): एड्स (AIDS), सिफलिस, गोनोरिया से सुरक्षा"]
          }
        ]
      }
    }
  },
  "s-ch8": {
    id: "s-ch8",
    title: "आनुवंशिकता एवं जैव विकास",
    topicName: "अध्याय 8: आनुवंशिकी (Heredity)",
    icon: "🧬",
    mindMap: {
      title: "आनुवंशिकी एवं मेंडल सिद्धांत",
      rootNode: {
        label: "जीन एवं आनुवंशिकी",
        engLabel: "Heredity & Genetics",
        color: "bg-emerald-600 border-emerald-700 text-white",
        description: "माता-पिता के लक्षणों का जीन के माध्यम से संतति में स्थानांतरण का वैज्ञानिक नियम।",
        bullets: [
          "ग्रेगर जॉन मेंडल के मटर प्रयोग",
          "एकल संकर (3:1) व द्वि-संकर (9:3:3:1)",
          "मानव शिशु लिंग निर्धारण सिद्धांत"
        ],
        children: [
          {
            label: "मेंडल के अनुवांशिकी नियम",
            engLabel: "Mendelian Genetics",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "मेंडल ने उद्यान मटर (पाइसम सैटाइवम) के पौधों पर वंशागति का सफल विश्लेषण किया।",
            bullets: ["प्रभावित का नियम (Law of Dominance)", "प्रभावी लक्षण (लंबा टी) बनाम अप्रभावी लक्षण (बौना टी)", "युग्मकों की शुद्धता या पृथक्करण का नियम"]
          },
          {
            label: "संकरण परिणाम",
            engLabel: "Monohybrid & Dihybrid",
            color: "bg-pink-500 border-pink-600 text-white",
            description: "विशिष्ट क्रॉस प्रयोगों के माध्यम से लक्षणों का पीढ़ीगत प्रकटीकरण:",
            bullets: ["एकल-संकर F2 अनुपात: जीनोटाइप 1:2:1, फिनोटाइप 3:1", "द्वि-संकर फिनोटाइप अनुपात: 9:3:3:1 (गोल-पीला व झुर्रीदार-हरा)", "जीन संरचना ही शारीरिक फेनोटाइप को नियंत्रित करती है"]
          },
          {
            label: "लिंग निर्धारण सिद्धान्त",
            engLabel: "Sex Determination XY",
            color: "bg-indigo-500 border-indigo-600 text-white",
            description: "मानव में गुणसूत्रों की संख्या 23 जोड़े (46 कुल) होती है।",
            bullets: ["22 जोड़े ऑटोसोम तथा 1 जोड़ा लिंग गुणसूत्र", "मादा का जीनोटाइप XX, नर का XY स्वरूप", "शिशु का लिंग पिता से प्राप्त क्रोमोसोम (X या Y) पर ही निर्भर है"]
          }
        ]
      }
    }
  }
};

export function getOrCreateChapterStructure(subjectId: string, chapterId: string, chapterTitle: string): ChapterStructure {
  const normalizedSubjectId = subjectId === "social-science" ? "social" : subjectId === "social" ? "social" : subjectId;
  
  // 1. First search in DYNAMIC_CATALOG for perfect custom data
  if (chapterId && DYNAMIC_CATALOG[chapterId]) {
    return DYNAMIC_CATALOG[chapterId];
  }

  // 2. Fallback check inside statically defined list
  const list = SUBJECT_CHAPTERS[normalizedSubjectId] || SUBJECT_CHAPTERS.math;
  let found = list.find(c => c.id === chapterId);
  if (found) return found;

  const cleanSel = (chapterTitle || "").replace(/अध्याय\s*\d+\s*-?/g, "").replace(/विज्ञान|गणित|इतिहास|भूगोल|कक्षा\s*\d+/g, "").trim().toLowerCase();
  
  if (cleanSel) {
    found = list.find(c => {
      const cTitle = c.title.toLowerCase();
      const cTopic = c.topicName.toLowerCase();
      return cleanSel.includes(cTitle) || cTitle.includes(cleanSel) || cleanSel.includes(cTopic);
    });
    if (found) return found;

    // Search inside DYNAMIC_CATALOG keys looking for matching words
    const dynamicKeys = Object.keys(DYNAMIC_CATALOG);
    const matchedKey = dynamicKeys.find(key => {
      const dTitle = DYNAMIC_CATALOG[key].title.toLowerCase();
      const dTopic = DYNAMIC_CATALOG[key].topicName.toLowerCase();
      return cleanSel.includes(dTitle) || dTitle.includes(cleanSel) || cleanSel.includes(dTopic);
    });
    if (matchedKey) return DYNAMIC_CATALOG[matchedKey];
  }

  // 3. Fallback absolute: Generate a beautiful customized ChapterStructure on the fly dynamically!
  return {
    id: chapterId || "dynamic-chap",
    title: chapterTitle ? chapterTitle.replace(/गणित|विज्ञान|इतिहास|भूगोल|अध्याय\s*\d+\s*-?/g, "").trim() : "पाठ्य सामग्री",
    topicName: chapterTitle || "अध्याय संकल्पना विश्लेषण",
    icon: normalizedSubjectId === "math" ? "📐" : normalizedSubjectId === "science" ? "🔬" : normalizedSubjectId === "social" ? "🌍" : "📚",
    mindMap: {
      title: chapterTitle ? `${chapterTitle} माइंड मैप` : "अध्याय संकल्पना आरेख",
      rootNode: {
        label: chapterTitle ? chapterTitle.replace(/अध्याय\s*\d+\s*-?/g, "").trim() : "मुख्य संकल्पना",
        engLabel: "Topic Core Pillar",
        color: "bg-indigo-600 border-indigo-700 text-white shadow-md",
        description: `प्रस्तुत पाठ्य-भाग के सभी महत्वपूर्ण सिद्धांतों का एक एकीकृत विश्लेषण व परीक्षा-उपयोगी सारांश।`,
        bullets: [
          "महत्वपूर्ण तथ्यों व सर्वसमिकाओं का समग्र संग्रह",
          "एनईपी (NEP-2020) परीक्षा आरेख और सुत्र विश्लेषण",
          "विस्तृत आरेख एवं संकल्पनात्मक स्पष्टता"
        ],
        children: [
          {
            label: "बुनियादी सिद्धांत एवं परिभाषाएं",
            engLabel: "Core Foundations & Concepts",
            color: "bg-blue-500 border-blue-600 text-white",
            description: "इस पाठ के मूल संप्रत्यय, परिभाषाएं और प्रारंभिक विषय वस्तु जो परीक्षा के दृष्टिकोण से अनिवार्य हैं।",
            bullets: ["पारिभाषिक शब्दावली एवं मूल नियम", "दैनिक जीवन में इस अध्याय की प्रासंगिकता और महत्व", "प्रारंभिक सूत्रों व तथ्यों का संग्रह"]
          },
          {
            label: "मुख्य अनुप्रयोग एवं सूत्र विश्लेषण",
            engLabel: "Formulas & Scientific Processes",
            color: "bg-teal-500 border-teal-600 text-white",
            description: "जटिल गणना प्रणालियाँ, भौतिकी/रसायन/गणित के प्रतिपादन तथा बोर्ड परीक्षाओं के प्रमुख प्रश्न प्रभाग।",
            bullets: ["समीकरणों एवं कथनों का गणितीय रूप में रूपांतरण", "चरण-दर-चरण समाधान प्रक्रिया का अभ्यास", "मॉडल प्रश्न पत्रों के तार्किक प्रारूप"]
          },
          {
            label: "परीक्षा मार्गदर्शन तथा अभ्यास विमर्श",
            engLabel: "Exam Prep & High Score Drills",
            color: "bg-amber-500 border-amber-600 text-white",
            description: "उच्च स्तरीय बहुविकल्पीय प्रश्न (MCQs) और दीर्घात्मक उत्तर लेखन की रूपरेखा का वैज्ञानिक मार्गदर्शन।",
            bullets: ["अक्सर पूछे जाने वाले पिछले वर्षों के बोर्ड प्रश्न (PYQs)", "मुख्य चित्रकारी तथा नामकरण के सरल नियम", "सटीक उत्तर लेखन द्वारा पूरे अंक अर्जित करने की ट्रिक्स"]
          }
        ]
      }
    }
  };
}
