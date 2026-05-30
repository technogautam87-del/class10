import React, { useState } from "react";
import { Compass, Calendar, Sparkles, AlertCircle } from "lucide-react";

interface SstSimulationsProps {
  chapterId: string;
}

export default function SstSimulations({ chapterId }: SstSimulationsProps) {
  switch (chapterId) {
    case "nationalism":
      return <HistoryTimelineNavigator />;
    case "geography":
      return <SoilCropPlanter />;
    case "civics":
      return <PowerSharingBalancer />;
    default:
      return <div className="p-4 text-center text-slate-500 font-bold">कृपया अध्याय चुनें।</div>;
  }
}

// 1. HISTORY: INDIAN NATIONALISM TIMELINE NAVIGATOR
function HistoryTimelineNavigator() {
  const [selectedYear, setSelectedYear] = useState<number>(1915);

  const timelineEvents: Record<number, { title: string; desc: string; banner: string; sub: string; badgeColor: string }> = {
    1915: {
      title: "गांधीजी का भारत शुभागमन",
      sub: "९ जनवरी १९१५ — महान प्रस्थान",
      desc: "महात्मा गांधी जी दक्षिण अफ्रीका में अपने सफल सत्याग्रह के बाद भारत लौटे। भारतवासियों ने उत्साह से बापू का स्वागत किया और यहाँ भी सत्याग्रह की नींव रखी।",
      banner: "🚢 🇮🇳 🌟",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200"
    },
    1917: {
      title: "चंपारण नील सत्याग्रह",
      sub: "बिहार के नील किसानों का उदय",
      desc: "अंग्रेज जमींदारों के दमनकारी तिनकठिया कानून के विरुद्ध किसानों का नेतृत्व। यह बापू का भारत में पहला सफल अहिंसक आंदोलन साबित हुआ।",
      banner: "🌱 ✊ 🌾",
      badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200"
    },
    1919: {
      title: "रॉलेट एक्ट एवं जलियांवाला बाग हत्याकांड",
      sub: "काला कानून एवं भीषण त्रासदी",
      desc: "बिना वकील-अपील-दलील के भारतीयों को असीमित कैद का क्रूर रॉलेट कानून आया। बैसाखी पर अमृतसर के निहत्थे जलियांवाला बाग में अंधाधुंध गोलियां बरसाई गईं।",
      banner: "🚫 🕯️ 👮🏽",
      badgeColor: "bg-rose-100 text-rose-700 border-rose-200"
    },
    1920: {
      title: "असहयोग आंदोलन शंखनाद",
      sub: "पहला विशाल जन आंदोलन",
      desc: "विदेशी वस्त्रों की होली जली, अदालतों एवं कॉलेजों का पूर्ण बहिष्कार हुआ। चौरी-चौरा हिंसक घटना के कारण गांधीजी ने इसे अचानक वापस ले लिया।",
      banner: "🧶 🚫 🇬🇧",
      badgeColor: "bg-orange-100 text-orange-700 border-orange-200"
    },
    1930: {
      title: "दांडी मार्च एवं सविनय अवज्ञा",
      sub: "२४ दिनों की एतिहासिक नमक यात्रा",
      desc: "सत्याग्रहियों संग साबरमती से समुद्र तट दांडी पहुंचे। चुटकी भर नमक बनाकर औपनिवेशिक नमक कानून तोड़ा और देशव्यापी सामूहिक नाफरमानी आरंभ की।",
      banner: "🧂 🚶🏽‍♂️ 🚶🏽‍♀️",
      badgeColor: "bg-amber-100 text-amber-700 border-amber-200"
    },
    1942: {
      title: "भारत छोड़ो आंदोलन",
      sub: "अंग्रेजों को अंतिम ऐतिहासिक चेतावनी",
      desc: "बापू ने मुंबई के गवालिया टैंक मैदान से 'करो या मरो (Do or Die)' का महामंत्र दिया। संपूर्ण देश अंग्रेजों के विरुद्ध सड़कों पर उतर आया।",
      banner: "💥 ✊ 🎖️",
      badgeColor: "bg-purple-100 text-purple-700 border-purple-200"
    },
    1947: {
      title: "स्वतंत्रता का पावन प्रभात",
      sub: "१५ अगस्त १९४७ — जय हिन्द!",
      desc: "असंख्य वीरों के प्राणोत्सर्ग के बाद दासता समाप्त हुई और देश स्वाधीन हुआ। लाल किले पर गर्व से आजाद तिरंगा गगनचुंबी लहरा उठा!",
      banner: "🎉 🇮🇳 🗽",
      badgeColor: "bg-teal-100 text-teal-700 border-teal-200"
    }
  };

  const activeEvent = timelineEvents[selectedYear] || timelineEvents[1915];

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-5" id="sst-history-sim">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-xs">
          ऐतिहासिक राष्ट्रव्यापी समयरेखा सिम (Freedom Timeline scrub)
        </span>
        <span className="text-xs text-slate-400 font-bold">1915 - 1947</span>
      </div>

      <div className="space-y-6">
        {/* Interactive Scrub slider */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">
            वर्ष चयनकर्ता (Scrub Years Axis):
          </label>
          <div className="relative pt-1 px-2">
            <input
              type="range"
              min="1915"
              max="1947"
              value={selectedYear}
              step="1"
              onChange={(e) => {
                const yr = parseInt(e.target.value);
                // Snapping to valid years
                const validYears = [1915, 1917, 1919, 1920, 1930, 1942, 1947];
                const closest = validYears.reduce((prev, curr) => 
                  Math.abs(curr - yr) < Math.abs(prev - yr) ? curr : prev
                );
                setSelectedYear(closest);
              }}
              className="w-full accent-amber-600 cursor-ew-resize h-2.5 bg-amber-50 rounded-lg"
            />
          </div>

          {/* Timeline markers */}
          <div className="flex justify-between text-[11px] font-black font-mono text-slate-400 px-1">
            <button onClick={() => setSelectedYear(1915)} className={`p-1 rounded ${selectedYear === 1915 ? "text-amber-700 font-black scale-110" : ""}`}>1915</button>
            <button onClick={() => setSelectedYear(1917)} className={`p-1 rounded ${selectedYear === 1917 ? "text-amber-700 font-black scale-110" : ""}`}>1917</button>
            <button onClick={() => setSelectedYear(1919)} className={`p-1 rounded ${selectedYear === 1919 ? "text-amber-700 font-black scale-110" : ""}`}>1919</button>
            <button onClick={() => setSelectedYear(1920)} className={`p-1 rounded ${selectedYear === 1920 ? "text-amber-700 font-black scale-110" : ""}`}>1920</button>
            <button onClick={() => setSelectedYear(1930)} className={`p-1 rounded ${selectedYear === 1930 ? "text-amber-700 font-black scale-110" : ""}`}>1930</button>
            <button onClick={() => setSelectedYear(1942)} className={`p-1 rounded ${selectedYear === 1942 ? "text-amber-700 font-black scale-110" : ""}`}>1942</button>
            <button onClick={() => setSelectedYear(1947)} className={`p-1 rounded ${selectedYear === 1947 ? "text-amber-700 font-black scale-110" : ""}`}>1947</button>
          </div>
        </div>

        {/* Dynamic Display Board Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          <div className="md:col-span-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 flex flex-col justify-between text-white shadow-md relative overflow-hidden min-h-[160px]">
            <span className="text-4xl filter drop-shadow">{activeEvent.banner}</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">ऐतिहासिक वर्ष</span>
              <span className="text-3xl font-black font-mono block leading-none">{selectedYear}</span>
            </div>
            {/* Ambient background rings */}
            <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-white/10 rounded-full"></div>
          </div>

          <div className="md:col-span-8 border border-slate-150 rounded-2xl p-5 flex flex-col justify-between bg-slate-50/50">
            <div>
              <span className={`border px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-block ${activeEvent.badgeColor}`}>
                {activeEvent.sub}
              </span>
              <h4 className="text-lg font-black text-slate-800 mt-2">
                {activeEvent.title}
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2">
                {activeEvent.desc}
              </p>
            </div>

            <div className="border-t pt-3 mt-4 text-[11px] font-serif font-black text-amber-700 tracking-wide flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>बोर्ड परीक्षा प्रश्न: {selectedYear} की घटना का क्या दूरगामी प्रभाव पड़ा? विश्लेषण लिखें।</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// 2. GEOGRAPHY: SOIL CLASSIFICATION & CROP PLANTER LAB
function SoilCropPlanter() {
  const [soil, setSoil] = useState<"alluvial" | "black" | "laterite" | "arid">("alluvial");
  const [crop, setCrop] = useState<"wheat" | "cotton" | "tea" | "millet">("wheat");
  const [growthStage, setGrowthStage] = useState<number>(0); // 0 = Seed, 1 = Sprout, 2 = Plant, 3 = Harvest

  // Crop compatibility rules
  const compatibility: Record<string, { soils: string[]; successMsg: string; failMsg: string }> = {
    wheat: {
      soils: ["alluvial"],
      successMsg: "जलोढ़ उपजाऊ जलोढ़ मिट्टी में गेहूं की फसल प्रचुरता से लहलहाई! आदर्श वातावरण।",
      failMsg: "असंतोष जनक वृद्धि! गेहूं को दोमट शिथिल या जलोढ़ उपजाऊ मिट्टी की आवश्यकता होती है।"
    },
    cotton: {
      soils: ["black"],
      successMsg: "काली रीगुर मिट्टी में कपास की फसल अत्यधिक उत्तम! नमी संग्रहण से रेशे बेहतरीन बने।",
      failMsg: "अल्प वृद्धि! कपास को उष्ण मौसम तथा काली लावा मृदा (Regur Soil) का आधार चाहिए।"
    },
    tea: {
      soils: ["laterite"],
      successMsg: "अम्लीय पर्वतीय लैटराइट मिट्टी पर चाय के पौधे शानदार विकसित हुए! रोपण सफल रहा।",
      failMsg: "गमले का पौधा मृतप्राय! चाय को ढलानदार जलनिकासी युक्त अम्लीय लैटराइट मृदा अनुकूल है।"
    },
    millet: {
      soils: ["arid"],
      successMsg: "शुष्क बलुई रेतीली मिट्टी में बाजरे की शानदार पैदावार हुई! कम पानी में परिपूर्ण वृद्धि।",
      failMsg: "जड़ें गल गईं! बाजरा (मोटे अनाज) को शुष्क तथा कम जलोढ़ बलुई भूमि की ही आवश्यकता है।"
    }
  };

  const currentRules = compatibility[crop];
  const isCompatible = currentRules.soils.includes(soil);

  const getGrowthGraphic = () => {
    if (!isCompatible) return "🥀 (फसल मुरझा गई - गलत मिट्टी)";
    switch (growthStage) {
      case 0: return "🟤 🌱 (बीज बोया गया है)";
      case 1: return "🌿 (अंकुर निकला - सुचारू विकास)";
      case 2: return "🪴 (पौधा लहलहा उठा)";
      case 3: return "🌾 (पकी हुई शानदार फसल तैयार)";
      default: return "🟤";
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="sst-geo-sim">
      <div className="border-b pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">
          मृदा अनुकूलता एवं सस्य प्रारूप सिमुलेटर (Crop Planter)
        </span>
        <span className="text-xs text-slate-400 font-black">Soil Biology Desk</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Plant Growth simulation monitor */}
        <div className="md:col-span-5 bg-gradient-to-b from-teal-50 to-emerald-100 border border-emerald-200/60 rounded-3xl p-5 flex flex-col justify-between items-center text-center min-h-[220px]">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
            पैदावार सिमुलेटर (Horticulture Monitor)
          </span>

          <div className="my-6 space-y-3">
            <span className="text-5xl filter drop-shadow block animate-bounce">
              {getGrowthGraphic().split(" ")[0]}
            </span>
            <span className="bg-white/80 border border-emerald-100 rounded-full px-3 py-1 text-xs font-black text-emerald-950 inline-block">
              {getGrowthGraphic().split(" ").slice(1).join(" ")}
            </span>
          </div>

          <div className="w-full">
            {isCompatible && growthStage < 3 ? (
              <button
                onClick={() => setGrowthStage(prev => prev + 1)}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-2 px-4 shadow text-xs font-black transition"
              >
                सिंचाई करें और बढ़ाएं (Water Plant 💦)
              </button>
            ) : isCompatible ? (
              <button
                onClick={() => setGrowthStage(0)}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-2 px-4 shadow text-xs font-black transition"
              >
                पुनः बीज बोएं (Sow New Seed 🔄)
              </button>
            ) : (
              <span className="text-xs text-rose-700 font-bold block bg-rose-50 border border-rose-100 p-2 rounded-xl">
                ⚠️ मुरझाया पौधा! अनुकूल मृदा चुनना अनिवार्य है।
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Controls soil and crops selecting lists */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
              1. मृदा प्रकार चुनें (Select Soil Type):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => { setSoil("alluvial"); setGrowthStage(0); }}
                className={`p-2.5 rounded-xl border-2 transition text-left ${soil === "alluvial" ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-extrabold" : "border-slate-100 bg-slate-50"}`}
              >
                🌾 जलोढ़ दोमट (Alluvial)
              </button>
              <button
                onClick={() => { setSoil("black"); setGrowthStage(0); }}
                className={`p-2.5 rounded-xl border-2 transition text-left ${soil === "black" ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-extrabold" : "border-slate-100 bg-slate-50"}`}
              >
                🟤 काली रीगुर (Black Soil)
              </button>
              <button
                onClick={() => { setSoil("laterite"); setGrowthStage(0); }}
                className={`p-2.5 rounded-xl border-2 transition text-left ${soil === "laterite" ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-extrabold" : "border-slate-100 bg-slate-50"}`}
              >
                🧱 लैटराइट मृदा (Laterite)
              </button>
              <button
                onClick={() => { setSoil("arid"); setGrowthStage(0); }}
                className={`p-2.5 rounded-xl border-2 transition text-left ${soil === "arid" ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-extrabold" : "border-slate-100 bg-slate-50"}`}
              >
                🏜️ शुष्क रेतीली (Arid Soil)
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
              2. फसल का बीज चुनें (Select Seed Type):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => { setCrop("wheat"); setGrowthStage(0); }}
                className={`p-2.5 rounded-xl border-2 transition text-left ${crop === "wheat" ? "border-indigo-600 bg-indigo-50 text-indigo-900 font-extrabold" : "border-slate-100 bg-slate-50"}`}
              >
                🌾 गेहूँ (Wheat)
              </button>
              <button
                onClick={() => { setCrop("cotton"); setGrowthStage(0); }}
                className={`p-2.5 rounded-xl border-2 transition text-left ${crop === "cotton" ? "border-indigo-600 bg-indigo-50 text-indigo-900 font-extrabold" : "border-slate-100 bg-slate-50"}`}
              >
                ☁️ कपास (Cotton)
              </button>
              <button
                onClick={() => { setCrop("tea"); setGrowthStage(0); }}
                className={`p-2.5 rounded-xl border-2 transition text-left ${crop === "tea" ? "border-indigo-600 bg-indigo-50 text-indigo-900 font-extrabold" : "border-slate-100 bg-slate-50"}`}
              >
                🍵 चायपत्ती (Tea)
              </button>
              <button
                onClick={() => { setCrop("millet"); setGrowthStage(0); }}
                className={`p-2.5 rounded-xl border-2 transition text-left ${crop === "millet" ? "border-indigo-600 bg-indigo-50 text-indigo-900 font-extrabold" : "border-slate-100 bg-slate-50"}`}
              >
                🌾 बाजरा (Millet)
              </button>
            </div>
          </div>

          {/* Educational Feedback Message */}
          <div className={`p-3 rounded-2xl text-xs border font-medium ${isCompatible ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-red-50 border-red-100 text-red-800"}`}>
            {isCompatible ? currentRules.successMsg : currentRules.failMsg}
          </div>

        </div>
      </div>
    </div>
  );
}

// 3. CIVICS: DISSOLUTION & POWER SHARING BALANCER
function PowerSharingBalancer() {
  const [unionPower, setUnionPower] = useState<number>(45);  // Union gov share
  const [statePower, setStatePower] = useState<number>(35);  // Regional state share
  
  const localPower = Math.max(0, 100 - unionPower - statePower);

  // Democratic metrics calculations
  let status = "";
  let metricColor = "";
  let message = "";

  if (unionPower >= 65) {
    status = "अधिनायकवादी तानाशाही (Autocratic centralisation)";
    metricColor = "text-rose-600 bg-rose-50 border-rose-200";
    message = "चेतावनी! केंद्र सरकार के पास ६५% से अधिक शक्ति एकाधिकार होने से राज्यों की स्वायत्तता ख़त्म हो गई है। देश लोकतंत्र से तानाशाही की तरफ झुका!";
  } else if (statePower >= 60 || localPower >= 60) {
    status = "संघीय विखंडन / गृहयुद्ध खतरा (Anarchical fragmentation)";
    metricColor = "text-red-700 bg-red-50 border-red-200";
    message = "अराजकता! प्रांतीय सरकारों के पास अत्यधिक अधिकारों से केंद्रीय निर्णय लेने की क्षमता ध्वस्त हो गई है। गृहयुद्ध की आशंका बढ़ी।";
  } else if (localPower < 10) {
    status = "कमजोर स्थानीय स्वशासन (Weak Local Panchayat)";
    metricColor = "text-amber-600 bg-amber-50 border-amber-200";
    message = "असंतुलित! पंचायत राज तथा नगर निकायों के पास वित्त एवं अधिकार शुन्य हैं। ग्रामीण लोकतंत्र दम तोड़ रहा है।";
  } else {
    status = "आदर्श संघीय लोकतांत्रिक संतुलन (Perfect Federal Democracy)";
    metricColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
    message = "उत्कृष्ट! विधायिका, संघ तथा प्रांतीय परिषदों में अधिकारों का आदर्श संतुलित वर्गीकरण (Power-Sharing) होने के कारण लोकतंत्र समृद्ध हो रहा है।";
  }

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="sst-civics-sim">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-xs">
          शक्तियों का विभाजन लोकतांत्रिक तराजू (Federalism Scale Game)
        </span>
        <span className="text-xs text-slate-400 font-mono font-bold">Stability Matcher</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Stability Scale Balance Gauge */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-3xl p-5 flex flex-col justify-between items-center text-center min-h-[220px]">
          <span className="text-[10px] font-black uppercase text-slate-400">
            लोकतांत्रिक संतुलन तराजू (Democratic Balance Scale)
          </span>

          {/* SVG graphical scale needle */}
          <div className="my-4 relative">
            <svg width="120" height="70" className="overflow-visible">
              {/* Semi-circular scale dial */}
              <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
              {/* Central Pin */}
              <circle cx="60" cy="60" r="6" fill="#1e293b" />
              {/* Needle rotating according to union power share limit */}
              {/* Rotation ranges from -60deg (Union 100%) to 60deg (State/Local 100%) */}
              {/* Center is at 0 degrees */}
              {(() => {
                const angleDeg = ((unionPower - 30) / 70) * -120 + 60; // maps power to angle
                const angleRad = (angleDeg * Math.PI) / 180;
                const nx = 60 + 45 * Math.sin(angleRad);
                const ny = 60 - 45 * Math.cos(angleRad);
                return (
                  <line x1="60" y1="60" x2={nx} y2={ny} stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
                );
              })()}
            </svg>
            <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-1">
              <span>तानाशाही (Union)</span>
              <span>संतुलित (Shared)</span>
              <span>अराजकता (States)</span>
            </div>
          </div>

          <div className={`p-2.5 text-center text-xs font-black rounded-xl border ${metricColor}`}>
            {status}
          </div>
        </div>

        {/* Sliders to partition Power */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>1. संघ (केंद्र सरकार) साक्षरता शेयर:</span>
              <span className="font-extrabold font-mono text-indigo-700">{unionPower}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              value={unionPower}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setUnionPower(val);
              }}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>2. प्रांतीय (राज्य सरकार) अधिकार शेयर:</span>
              <span className="font-extrabold font-mono text-indigo-700">{statePower}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={statePower}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setStatePower(val);
              }}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2.5 text-[11px] font-medium font-mono text-slate-500 justify-between">
            <span>3. स्थानीय स्वशासन (Panchayats) स्वतः शेयर:</span>
            <span className="font-extrabold text-amber-700">{localPower}%</span>
          </div>

          <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-200/50 flex gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-900 leading-normal font-semibold">
              {message}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
