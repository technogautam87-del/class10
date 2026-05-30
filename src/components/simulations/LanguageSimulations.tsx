import React, { useState } from "react";
import { BookOpen, RefreshCw, Zap, AlignLeft } from "lucide-react";

interface LanguageSimulationsProps {
  subjectId: string;
  chapterId: string;
}

export default function LanguageSimulations({ subjectId, chapterId }: LanguageSimulationsProps) {
  if (subjectId === "hindi") {
    switch (chapterId) {
      case "sandhi":
        return <HindiSandhiMixer />;
      case "samas":
        return <HindiSamasBuilder />;
      default:
        return <div className="p-4 text-center text-slate-500 font-bold">कृपया व्याकरण विषय चुनें।</div>;
    }
  } else if (subjectId === "english") {
    switch (chapterId) {
      case "tenses":
        return <EnglishTenseMorpher />;
      case "voice":
        return <EnglishVoiceRestructurer />;
      default:
        return <div className="p-4 text-center text-slate-500 font-bold">Select Grammar Topic.</div>;
    }
  } else if (subjectId === "sanskrit") {
    switch (chapterId) {
      case "lakar":
        return <SanskritLakarConjugator />;
      case "karak":
        return <SanskritKarakWheel />;
      default:
        return <div className="p-4 text-center text-slate-500 font-bold">कृपया व्याकरण विमर्श चुनें।</div>;
    }
  }

  return <div className="p-4 text-center text-slate-500 font-bold">कृपया विषय और अध्याय चुनें।</div>;
}

// ==========================================
// HINDI SIMULATIONS
// ==========================================

// 1. HINDI: VOWEL SANDHI SYNTHESIZER
function HindiSandhiMixer() {
  const [v1, setV1] = useState<string>("अ");
  const [v2, setV2] = useState<string>("इ");

  const computeSandhi = (char1: string, char2: string) => {
    if (char1 === "अ" && char2 === "इ") return { result: "ए (e)", name: "गुण स्वर संधि (Guna)", demo: "देव + इंद्र = देवेंद्र", rule: "अ/आ + इ/ई मिलकर 'ए' हो जाता है।" };
    if (char1 === "अ" && char2 === "उ") return { result: "ओ (o)", name: "गुण स्वर संधि (Guna)", demo: "सूर्य + उदय = सूर्योदय", rule: "अ/आ + उ/ऊ मिलकर 'ओ' हो जाता है।" };
    if (char1 === "अ" && char2 === "अ") return { result: "आ (aa)", name: "दीर्घ स्वर संधि (Dirgha)", demo: "परम + अर्थ = परमार्थ", rule: "दो समान हस्व या दीर्घ स्वर मिलकर 'दीर्घ' हो जाते हैं।" };
    if (char1 === "आ" && char2 === "आ") return { result: "आ (aa)", name: "दीर्घ स्वर संधि (Dirgha)", demo: "विद्या + आलय = विद्यालय", rule: "आ + आ मिलकर दीर्घ 'आ' हो जाता है।" };
    if (char1 === "इ" && char2 === "इ") return { result: "ई (ee)", name: "दीर्घ स्वर संधि (Dirgha)", demo: "रवि + इंद्र = रवींद्र", rule: "इ + इ मिलकर दीर्घ 'ई' हो जाती है।" };
    if (char1 === "इ" && char2 === "अ") return { result: "य (ya)", name: "यण स्वर संधि (Yana)", demo: "इति + आदि = इत्यादि", rule: "इ/ई के बाद कोई भिन्न स्वर आने पर 'य' बनता है।" };
    return { result: "संधि वर्ण विकार", name: "स्वर संधि", demo: "कृपया दूसरा स्वर चुनकर देखें", rule: "स्वर वर्णों का निकटतम संयोग नियम।" };
  };

  const outcome = computeSandhi(v1, v2);

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="hindi-sandhi-sim">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-rose-100 text-rose-700 font-bold px-3 py-1 rounded-full text-xs">
          स्वर संधि रासायनिक वर्ण-मिश्रक (Vowel Mixer Lab)
        </span>
        <span className="text-xs text-slate-400 font-bold">Sandhi Master</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Selecting vowels */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">1. पूर्व पद का अंतिम स्वर:</span>
            <div className="flex gap-2">
              {["अ", "आ", "इ"].map(char => (
                <button
                  key={char}
                  onClick={() => setV1(char)}
                  className={`flex-1 py-2 text-sm font-black rounded-lg border-2 transition ${v1 === char ? "border-rose-600 bg-rose-50 text-rose-700" : "border-slate-150 bg-slate-50"}`}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">2. उत्तर पद का प्रथम स्वर:</span>
            <div className="flex gap-2">
              {["अ", "इ", "उ", "आ"].map(char => (
                <button
                  key={char}
                  onClick={() => setV2(char)}
                  className={`flex-1 py-2 text-sm font-black rounded-lg border-2 transition ${v2 === char ? "border-rose-600 bg-rose-50 text-rose-700" : "border-slate-150 bg-slate-50"}`}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic chemistry-like combination results */}
        <div className="md:col-span-7 border border-rose-100 bg-rose-50/20 rounded-2xl p-4 flex flex-col justify-between">
          <div className="grid grid-cols-3 items-center justify-center p-3 bg-white border border-rose-100/50 rounded-xl shadow-sm text-center">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">पूर्व स्वर</span>
              <span className="text-xl font-black text-rose-800">{v1}</span>
            </div>
            <span className="text-xl font-bold text-slate-400">+</span>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">उत्तर स्वर</span>
              <span className="text-xl font-black text-rose-800">{v2}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">विकार संयुक्त वर्ण:</span>
              <span className="font-extrabold text-rose-700 bg-rose-100/60 border border-rose-200 px-2.5 py-0.5 rounded-lg text-sm">{outcome.result}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">संधि का नाम:</span>
              <span className="font-extrabold text-slate-700">{outcome.name}</span>
            </div>
            <div className="flex justify-between items-start text-xs pt-1">
              <span className="font-bold text-slate-500 shrink-0">वैज्ञानिक नियम:</span>
              <span className="font-semibold text-slate-600 text-right leading-relaxed pl-4">{outcome.rule}</span>
            </div>
          </div>

          <div className="border-t border-rose-150/40 pt-3 mt-3">
            <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">पुस्तक प्रयोग उदाहरण (Book Example):</span>
            <span className="bg-white border rounded px-3 py-1 text-xs font-black text-rose-950 font-serif block text-center shadow-inner">
              {outcome.demo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. HINDI: SAMAS COMPOUND MAKER
function HindiSamasBuilder() {
  const [prefix, setPrefix] = useState<string>("राज");
  const [suffix, setSuffix] = useState<string>("पुत्र");

  const getSamasVerdict = (p: string, s: string) => {
    const combined = p + s;
    if (p === "राज" && s === "पुत्र") return { word: "राजपुत्र", type: "तत्पुरुष समास (उत्तरपद प्रधान)", meaning: "राजा का पुत्र", definition: "इस समास में दूसरा पद प्रधान होता है तथा विभक्ति कारक चिन्ह का लोप हो जाता है।" };
    if (p === "यथा" && s === "शक्ति") return { word: "यथाशक्ति", type: "अव्ययीभाव समास (पूर्वपद प्रधान)", meaning: "शक्ति के अनुसार", definition: "जिस समास का पहला पद अव्यय तथा मुख्य हो, उसे अव्ययीभाव समास कहते हैं।" };
    if (p === "माता" && p === s) return { word: "माता-पिता", type: "द्वंद्व समास (दोनों पद प्रधान)", meaning: "माता और पिता", definition: "दोनों पद समान रूप से प्रधान होते हैं और विग्रह करने पर 'और' अथवा 'या' लगता है।" };
    if (p === "नील" && s === "कंठ") return { word: "नीलकंठ", type: "बहुव्रीहि समास (अन्य अर्थ प्रधान)", meaning: "नीला है कंठ जिसका (शिव)", definition: "कोई भी पद प्रधान न होकर किसी तीसरे विशिष्ट संज्ञा की ओर संकेत होता है।" };
    
    // Fallbacks
    const linked = p === "माता" ? "माता-पिता" : combined;
    const lType = p === "माता" ? "द्वंद्व समास" : "तत्पुरुष समास";
    const lMean = p === "माता" ? "माता और पिता" : `${p} रूपी ${s}`;
    return { word: linked, type: lType, meaning: lMean, definition: "पदों के सार्थक एवं संक्षिप्त मेल से बने नवशब्द रूप।" };
  };

  const samasInfo = getSamasVerdict(prefix, suffix);

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="hindi-samas-sim">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-rose-100 text-rose-700 font-bold px-3 py-1 rounded-full text-xs">
          सामासिक पद निर्माण एवं विग्रह शाला (Compound words match)
        </span>
        <span className="text-xs text-slate-400 font-black">Samas Maker</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch animate-fade-in">
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">1. पहला पद (Prefix):</span>
            <div className="grid grid-cols-3 gap-2">
              {["यथा", "राज", "नील", "माता"].map(w => (
                <button
                  key={w}
                  onClick={() => { setPrefix(w); if (w === "माता") setSuffix("पिता"); }}
                  className={`py-2 text-xs font-black rounded-lg border-2 transition ${prefix === w ? "border-rose-600 bg-rose-50 text-rose-700" : "border-slate-100 bg-slate-50"}`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">2. दूसरा पद (Suffix):</span>
            <div className="grid grid-cols-3 gap-2">
              {prefix === "माता" ? (
                <button className="col-span-3 py-2 text-xs font-black rounded-lg border-2 border-rose-600 bg-rose-50 text-rose-700" disabled>पिता</button>
              ) : (
                ["शक्ति", "पुत्र", "कंठ"].map(w => (
                  <button
                    key={w}
                    onClick={() => setSuffix(w)}
                    className={`py-2 text-xs font-black rounded-lg border-2 transition ${suffix === w ? "border-rose-600 bg-rose-50 text-rose-700" : "border-slate-100 bg-slate-50"}`}
                  >
                    {w}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-6 border rounded-2xl p-4 bg-slate-55/40 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">सामासिक पद (Fused Word):</span>
            <span className="text-xl font-serif font-black text-rose-800 tracking-wide block mt-1">
              {samasInfo.word}
            </span>
          </div>

          <div className="space-y-2 mt-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500">समास भेद:</span>
              <span className="text-rose-950 font-black">{samasInfo.type}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500">समास विग्रह:</span>
              <span className="text-emerald-700 font-extrabold">{samasInfo.meaning}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal border-t pt-2 mt-2 font-serif font-semibold">
              {samasInfo.definition}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ENGLISH SIMULATIONS
// ==========================================

// 1. ENGLISH: TENSE SHIFTING MACHINE
function EnglishTenseMorpher() {
  const [activeTense, setActiveTense] = useState<"simp" | "cont" | "perf" | "past">("simp");

  const options: Record<string, { label: string; text: string; code: string; rule: string }> = {
    simp: {
      label: "Simple Present",
      text: "Sita sings a song sweetly.",
      code: "Subject + Verb(s/es) + Object",
      rule: "Describes habitual facts, universal truths, or general routines."
    },
    cont: {
      label: "Present Continuous",
      text: "Sita is singing a song sweetly.",
      code: "Subject + is/am/are + V-ing + Object",
      rule: "Used for actions currently happening at the moment of speaking."
    },
    perf: {
      label: "Present Perfect",
      text: "Sita has sung a song sweetly.",
      code: "Subject + has/have + Verb(V3) + Object",
      rule: "Linked to past events that have completed recently and affect the now."
    },
    past: {
      label: "Simple Past",
      text: "Sita sang a song sweetly.",
      code: "Subject + Verb(V2) + Object",
      rule: "Details completed historical actions that took place in a finished time."
    }
  };

  const setting = options[activeTense];

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="eng-tense-sim">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-sky-100 text-sky-700 font-bold px-3 py-1 rounded-full text-xs">
          Tense Morphing Synthesizer (Active Tense shift)
        </span>
        <span className="text-xs text-slate-400 font-bold">Structure Desk</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        <div className="md:col-span-5 flex flex-col gap-2">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">Choose tense:</span>
          {Object.keys(options).map(key => (
            <button
              key={key}
              onClick={() => setActiveTense(key as any)}
              className={`p-2.5 rounded-xl border-2 transition text-left text-xs font-bold ${activeTense === key ? "border-sky-600 bg-sky-50 text-sky-700 font-black" : "border-slate-100 bg-slate-50"}`}
            >
              {options[key].label}
            </button>
          ))}
        </div>

        <div className="md:col-span-7 border border-sky-100 bg-sky-50/20 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Morphing Output sentence:</span>
            <span className="text-base font-black text-sky-950 font-serif block mt-2 p-3 bg-white border border-sky-100/50 rounded-xl shadow-inner text-center">
              {setting.text}
            </span>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Formal structure:</span>
              <span className="text-sky-800 font-black">{setting.code}</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed border-t pt-2 mt-2 font-sans">
              <strong>Grammar Note:</strong> {setting.rule}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. ENGLISH: ACTIVE TO PASSIVE RESTRUCTURER
function EnglishVoiceRestructurer() {
  const [activeSent, setActiveSent] = useState<number>(0);

  const sentences = [
    {
      active: "The chef cooks delicious dinner.",
      passive: "Delicious dinner is cooked by the chef.",
      type: "Simple Present Voice shift"
    },
    {
      active: "People build massive bridges.",
      passive: "Massive bridges are built by people.",
      type: "Simple Present (Plural Object) shift"
    },
    {
      active: "Sita sang an elegant song.",
      passive: "An elegant song was sung by Sita.",
      type: "Simple Past Voice shift"
    }
  ];

  const curr = sentences[activeSent];

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="eng-voice-sim">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-sky-100 text-sky-700 font-bold px-3 py-1 rounded-full text-xs">
          Active to Passive sentence Restructurer
        </span>
        <span className="text-xs text-slate-400 font-bold">Voice Bench</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        <div className="md:col-span-5 flex flex-col gap-2">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">Select statement:</span>
          {sentences.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSent(idx)}
              className={`p-2.5 rounded-xl border-2 transition text-left text-xs font-bold ${activeSent === idx ? "border-sky-600 bg-sky-50 text-sky-700 font-black" : "border-slate-100 bg-slate-50"}`}
            >
              {opt.type}
            </button>
          ))}
        </div>

        <div className="md:col-span-7 border rounded-2xl p-4 bg-slate-50 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-2.5 bg-white border border-slate-150 rounded-xl">
              <span className="text-[9px] font-black uppercase text-emerald-600 tracking-wider">Active voice (Subject Focused)</span>
              <p className="text-xs font-black font-mono text-slate-800 leading-normal mt-0.5">{curr.active}</p>
            </div>

            <div className="p-2.5 bg-white border border-slate-150 rounded-xl relative overflow-hidden">
              <span className="text-[9px] font-black uppercase text-rose-600 tracking-wider">Passive voice (Object Focused)</span>
              <p className="text-xs font-black font-mono text-indigo-900 leading-normal mt-0.5">{curr.passive}</p>
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 h-full w-1 bg-sky-500"></div>
            </div>
          </div>

          <div className="mt-4 text-[10px] bg-sky-50 p-2.5 border border-sky-100/30 rounded-lg text-slate-500 leading-normal">
            <strong>Key Rule:</strong> Object swaps to the front, passive Verb conjugated into past-participle (V3 like <em>sung, built, cooked</em>) plus auxiliary elements.
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SANSKRIT SIMULATIONS
// ==========================================

// 1. SANSKRIT: VERB CONJUGATION MATRIX CREATOR
function SanskritLakarConjugator() {
  const [dhatu, setDhatu] = useState<"पठ्" | "लिख्" | "गम्">("पठ्");
  const [lakar, setLakar] = useState<"लट्" | "लृट्" | "लङ्">("लट्");

  const conjData = () => {
    let base = dhatu === "गम्" ? "गच्छ्" : dhatu === "पठ्" ? "पठ्" : "लिख्";
    let baseFut = dhatu === "गम्" ? "गमिष्" : dhatu === "पठ्" ? "पठिष्" : "लेखिष्";

    if (lakar === "लट्") {
      return {
        row1: [`${base}ति`, `${base}तः`, `${base}न्ति`],
        row2: [`${base}सि`, `${base}थः`, `${base}थ`],
        row3: [`${base}ामि`, `${base}ावः`, `${base}ामः`],
        meta: "लट् लकार (वर्तमानकाल) — नियमित वर्तमान घटनाओं हेतु प्रयुक्त।"
      };
    } else if (lakar === "लृट्") {
      return {
        row1: [`${baseFut}यति`, `${baseFut}यतः`, `${baseFut}यन्ति`],
        row2: [`${baseFut}यसि`, `${baseFut}यथः`, `${baseFut}यध`],
        row3: [`${baseFut}यामी`, `${baseFut}यावः`, `${baseFut}यामः`],
        meta: "लृट् लकार (भविष्यत्काल) — आने वाले समय की क्रिया।"
      };
    } else {
      let past = dhatu === "गम्" ? "गच्छ" : dhatu === "पठ्" ? "पठ" : "लिख";
      return {
        row1: [`अ${past}त्`, `अ${past}ताम्`, `अ${past}न्`],
        row2: [`अ${past}ः`, `अ${past}तम्`, `अ${past}त`],
        row3: [`अ${past}म्`, `अ${past}ाव`, `अ${past}ाम`],
        meta: "लङ् लकार (भूतकाल) — बीते हुए काल की घटनाएँ विवरण।"
      };
    }
  };

  const matrix = conjData();

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="sansk-lakar-sim">
      <div className="border-b pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <span className="bg-violet-100 text-violet-700 font-bold px-3 py-1 rounded-full text-xs">
          3×3 तिङ्-प्रत्यय रूप-सिद्धि ग्रिड प्रयोगशाला (Verb Conjugation Matrix)
        </span>
        <span className="text-xs text-slate-400 font-black">Lakar Matrix</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Selecting parameters */}
        <div className="md:col-span-4 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-slate-500 uppercase block">1. मुख्य धातु चुनें:</span>
            <div className="flex gap-2">
              {["पठ्", "लिख्", "गम्"].map(d => (
                <button
                  key={d}
                  onClick={() => setDhatu(d as any)}
                  className={`flex-1 py-1.5 text-xs font-black rounded-lg border-2 transition ${dhatu === d ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-100 bg-slate-50"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black text-slate-500 block">2. लकार (Tense) चुनें:</span>
            <div className="flex flex-col gap-1.5">
              {[
                { k: "लट्", n: "लट् लकार (वर्तमानकाल)" },
                { k: "लृट्", n: "लृट् लकार (भविष्यकाल)" },
                { k: "लङ्", n: "लङ् लकार (भूतकाल)" }
              ].map(item => (
                <button
                  key={item.k}
                  onClick={() => setLakar(item.k as any)}
                  className={`p-2 text-left text-xs font-bold rounded-lg border transition ${lakar === item.k ? "border-violet-600 bg-violet-50/60 text-violet-800 font-black shadow-sm" : "border-slate-100 bg-slate-50"}`}
                >
                  {item.n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3x3 Conjugation Matrix Layout */}
        <div className="md:col-span-8 border border-slate-150 rounded-2xl p-4 bg-slate-50 flex flex-col justify-between">
          <table className="w-full text-center border-collapse text-xs font-bold">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px]">
                <th className="py-2">पुरुष (Person)</th>
                <th className="py-2">एकवचनं</th>
                <th className="py-2">द्विवचनं</th>
                <th className="py-2">बहुवचनं</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-serif">
              <tr className="hover:bg-slate-100/50">
                <td className="py-3 text-[10px] text-slate-400 uppercase font-sans">प्रथम पुरुषः (Third)</td>
                <td className="py-3 text-violet-950 font-black">{matrix.row1[0]}</td>
                <td className="py-3 text-slate-700">{matrix.row1[1]}</td>
                <td className="py-3 text-slate-700">{matrix.row1[2]}</td>
              </tr>
              <tr className="hover:bg-slate-100/50">
                <td className="py-3 text-[10px] text-slate-400 uppercase font-sans">मध्यम पुरुषः (Second)</td>
                <td className="py-3 text-slate-700">{matrix.row2[0]}</td>
                <td className="py-3 text-violet-950 font-black">{matrix.row2[1]}</td>
                <td className="py-3 text-slate-700">{matrix.row2[2]}</td>
              </tr>
              <tr className="hover:bg-slate-100/50">
                <td className="py-3 text-[10px] text-slate-400 uppercase font-sans">उत्तम पुरुषः (First)</td>
                <td className="py-3 text-slate-700">{matrix.row3[0]}</td>
                <td className="py-3 text-slate-700">{matrix.row3[1]}</td>
                <td className="py-3 text-violet-950 font-black">{matrix.row3[2]}</td>
              </tr>
            </tbody>
          </table>

          <p className="text-[10px] text-slate-500 border-t pt-2 mt-4 text-center italic">
            <strong>विवरण:</strong> {matrix.meta}
          </p>
        </div>
      </div>
    </div>
  );
}

// 2. SANSKRIT: KARAK-VIBHAKTI CHAKRAM
function SanskritKarakWheel() {
  const [vibhakti, setVibhakti] = useState<number>(1); // 1 to 7

  const karakMap: Record<number, { name: string; sign: string; meaning: string; exam: string }> = {
    1: { name: "कर्ता कारकम्", sign: "ने (prathama)", meaning: "जो क्रिया को संपन्न करता है, उसमें प्रथमा विभक्ति लगती है।", exam: "सह पठति (वह पढ़ता है) - 'सह' कर्ता है।" },
    2: { name: "कर्म कारकम्", sign: "को (dwitiya)", meaning: "क्रिया का फल अथवा प्रभाव जिस पर पड़ता है, उसमें द्वितीया लगती है।", exam: "सः पुस्तकं पठति (वह पुस्तक पढ़ता है) - 'पुस्तकं' कर्म है।" },
    3: { name: "करण कारकम्", sign: "से / द्वारा (tritiya)", meaning: "जिस साधन की सहायता से क्रिया संपन्न होती है, उसमें तृतीया विभक्ति का प्रयोग होता है।", exam: "सः कलमेन लिखति (वह कलम से लिखता है) - 'कलमेन' करण है।" },
    4: { name: "सम्प्रदान कारकम्", sign: "के लिए / अर्पण (chaturthi)", meaning: "जिसके लिए कोई कार्य किया जाए या दान स्वरूप कुछ दिया जाए, उसमें चतुर्थी विभक्ति होती है।", exam: "विप्राय गां ददाति (ब्राह्मण को गाय देता है - दानार्थे)।" },
    5: { name: "अपादान कारकम्", sign: "से अलग होना (panchami)", meaning: "जिस स्थान या संज्ञा वस्तु से किसी का अलगाव अथवा दूरीबोध हो, उसमें पंचमी लगती है।", exam: "वृक्षात् पत्राणि पतन्ति (वृक्ष से पत्ते गिरते हैं - अलगाव)।" },
    6: { name: "सम्बन्ध (षष्ठी विभ.)", sign: "का / की / के (shasthi)", meaning: "दो संज्ञाओं में परस्पर सम्बन्ध दिखाने हेतु षष्ठी विभक्ति का प्रयोग होता है (इसे संस्कृत में कारक नहीं माना जाता)।", exam: "रामस्य भ्राता लक्ष्मणः (राम का भाई लक्ष्मण है)।" },
    7: { name: "अधिकरण कारकम्", sign: "में / पर (saptami)", meaning: "जो क्रिया का मुख्य आधार (स्थान अथवा समय) हो, उसे अधिकरण मानकर सप्तमी लगाते हैं।", exam: "खगाः वृक्षे तिष्ठन्ति (पक्षी वृक्ष पर बैठते हैं)।" }
  };

  const currentKarak = karakMap[vibhakti];

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="sansk-karak-sim">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-violet-100 text-violet-700 font-bold px-3 py-1 rounded-full text-xs">
          कारक एवं विभक्ति चक्र विश्लेषक (Karak Wheel Parser)
        </span>
        <span className="text-xs text-slate-400 font-bold">Karak Sutra</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        <div className="md:col-span-5 flex flex-col gap-1.5">
          <span className="text-xs font-black text-slate-500 uppercase block mb-1">विभक्ति चयनम् (Cases):</span>
          {[1, 2, 3, 4, 5, 6, 7].map(num => (
            <button
              key={num}
              onClick={() => setVibhakti(num)}
              className={`p-2 rounded-lg border text-left text-xs font-bold transition flex justify-between ${vibhakti === num ? "border-violet-600 bg-violet-50 text-violet-800 font-black" : "border-slate-150 bg-slate-50"}`}
            >
              <span>{num === 1 ? "प्रथमा" : num === 2 ? "द्वितीया" : num === 3 ? "तृतीया" : num === 4 ? "चतुर्थी" : num === 5 ? "पंचमी" : num === 6 ? "षष्ठी" : "सप्तमी"} विभक्तिः</span>
              <span className="font-mono text-[10px] opacity-75">{karakMap[num].name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <div className="md:col-span-8 border border-violet-100 bg-violet-50/20 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-center bg-white border border-violet-100 rounded-xl p-3 shadow-sm">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">सम्बन्धित कारक</span>
              <span className="text-base font-serif font-black text-violet-900">{currentKarak.name}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-sans">कारक चिन्ह</span>
              <span className="bg-violet-100/70 border border-violet-200 text-violet-800 text-xs px-2.5 py-0.5 rounded-md font-black">{currentKarak.sign}</span>
            </div>
          </div>

          <div className="space-y-3 mt-4 text-xs">
            <div>
              <span className="font-black text-slate-400 uppercase text-[9px] block">कारक परिभाषा एवं व्याख्या:</span>
              <p className="text-slate-600 font-medium leading-relaxed font-serif mt-0.5">{currentKarak.meaning}</p>
            </div>

            <div className="border-t border-violet-150/40 pt-3 mt-3">
              <span className="font-black text-slate-400 uppercase text-[9px] block">संस्कृत उदाहरण वाक्य:</span>
              <p className="text-indigo-900 font-black font-serif text-sm bg-white border rounded px-3 py-1.5 shadow-inner mt-1 text-center">
                {currentKarak.exam}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
