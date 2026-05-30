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
