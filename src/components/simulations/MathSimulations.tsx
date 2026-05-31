import React, { useState } from "react";
import { Zap, HelpCircle, CheckCircle, RefreshCw } from "lucide-react";

interface MathSimulationsProps {
  chapterId: string;
}

export default function MathSimulations({ chapterId }: MathSimulationsProps) {
  switch (chapterId) {
    case "trigo":
    case "m-ch8":
      return <TrigoIntroduction />;
    case "quadratic":
    case "m-ch4":
      return <QuadraticEquationSolver />;
    case "ap":
    case "m-ch5":
      return <ArithmeticProgressionBuilder />;
    case "m-ch1":
      return <RealNumbersLab />;
    case "m-ch2":
      return <PolynomialsCurveLab />;
    case "m-ch3":
      return <LinearEquationsIntersectionLab />;
    case "m-ch7":
      return <CoordinateGeometryLab />;
    case "m-ch13":
      return <StatisticsLab />;
    case "m-ch14":
      return <ProbabilityFlipLab />;
    default:
      return <MathUniversalWhiteboard chapterId={chapterId} />;
  }
}

// 1. CHAPTER 8: INTRODUCTION TO TRIGONOMETRY
function TrigoIntroduction() {
  const [angle, setAngle] = useState<number>(30); // 0 to 90 degrees

  const rad = (angle * Math.PI) / 180;
  const hyp = 140; // SVG Hypotenuse constant
  const adj = Math.min(140, Math.round(hyp * Math.cos(rad)));
  const opp = Math.min(140, Math.round(hyp * Math.sin(rad)));

  // Trig outputs
  const sinV = Math.sin(rad);
  const cosV = Math.cos(rad);
  const tanV = angle === 90 ? null : Math.tan(rad);

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="math-trigo-sim">
      <div className="flex items-center justify-between border-b pb-3">
        <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs">
          त्रिभुज रूपान्तरण प्रयोगशाला (Triangle deformation Lab)
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono font-bold">
          <span>विद्यमान कोण:</span>
          <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-black">{angle}°</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Interactive SVG Right Triangle Canvas */}
        <div className="md:col-span-6 bg-slate-50 rounded-2xl border border-slate-100 p-4 flex flex-col items-center justify-center min-h-[250px] relative">
          <svg width="220" height="220" className="overflow-visible">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f3f7" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="220" height="220" fill="url(#grid)" rx="12" />

            {/* Triangle Lines */}
            {/* Vertices: Base Right angle is at (40, 180), acute angle at (40+adj, 180), top vert at (40, 180-opp) */}
            <path
              d={`M 40 ${180 - opp} L 40 180 L ${40 + adj} 180 Z`}
              fill="rgba(99, 102, 241, 0.08)"
              stroke="#4f46e5"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Right Angle Indicator (Square corner) */}
            <path d="M 40 165 L 55 165 L 55 180" fill="none" stroke="#818cf8" strokeWidth="2" />

            {/* Hypotenuse label */}
            <text x={(40 + 40 + adj) / 2 + 5} y={(180 - opp + 180) / 2 - 10} fill="#4338ca" fontSize="12" fontWeight="900" className="font-sans">
              कर्ण (Hypotenuse) = {hyp}px
            </text>

            {/* Perpendicular / Opp label */}
            <text x="5" y={(180 - opp + 180) / 2} fill="#dc2626" fontSize="11" fontWeight="900" className="font-sans" textAnchor="start">
              लम्ब (Perp) = {opp}px
            </text>

            {/* Base / Adj label */}
            <text x={(40 + 40 + adj) / 2} y="200" fill="#059669" fontSize="11" fontWeight="900" className="font-sans" textAnchor="middle">
              आधार (Base) = {adj}px
            </text>

            {/* Angle arc symbol at acute vertex */}
            <path
              d={`M ${40 + adj - 20} 180 A 20 20 0 0 0 ${40 + adj - 20 * Math.cos(rad)} ${180 - 20 * Math.sin(rad)}`}
              fill="none"
              stroke="#ea580c"
              strokeWidth="3.5"
            />
            {/* Angle text */}
            <text x={40 + adj - 38} y="174" fill="#d97706" fontSize="11" fontWeight="bold">
              θ={angle}°
            </text>

            {/* Vertices points */}
            <circle cx="40" cy={180 - opp} r="5" fill="#4f46e5" />
            <circle cx="40" cy="180" r="5" fill="#1e1b4b" />
            <circle cx={40 + adj} cy="180" r="5" fill="#4f46e5" />
          </svg>

          <span className="text-[10px] text-slate-400 mt-3 font-semibold text-center">
            समकोण त्रिभुज ज्यामितीय रूपान्तरण (Live Geometry Vector)
          </span>
        </div>

        {/* Sliders and Trigonometry Math Outputs */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">
              कोण नियंत्रण (Adjust Angle θ)
            </label>
            <input
              type="range"
              min="1"
              max="90"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold">
              <span>1°</span>
              <span>45°</span>
              <span>90° (परिपूर्ण)</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
              त्रिकोणमितीय अनुपात गणना (Trig Ratio Values):
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div className="border border-slate-100 bg-slate-50/50 p-2.5 rounded-xl text-center">
                <span className="text-[11px] font-bold text-slate-400 block">sin θ (लम्ब / कर्ण)</span>
                <span className="font-extrabold text-sm text-indigo-700">{sinV.toFixed(4)}</span>
                <span className="text-[9px] text-slate-500 block">={opp}/{hyp}</span>
              </div>

              <div className="border border-slate-100 bg-slate-50/50 p-2.5 rounded-xl text-center">
                <span className="text-[11px] font-bold text-slate-400 block">cos θ (आधार / कर्ण)</span>
                <span className="font-extrabold text-sm text-emerald-700">{cosV.toFixed(4)}</span>
                <span className="text-[9px] text-slate-500 block">={adj}/{hyp}</span>
              </div>

              <div className="border border-slate-100 bg-slate-50/50 p-2.5 rounded-xl text-center">
                <span className="text-[11px] font-bold text-slate-400 block">tan θ (लम्ब / आधार)</span>
                <span className="font-extrabold text-sm text-rose-700">
                  {tanV === null ? "∞" : tanV.toFixed(4)}
                </span>
                <span className="text-[9px] text-slate-500 block">={opp}/{adj}</span>
              </div>

              <div className="border border-slate-100 bg-slate-50/50 p-2.5 rounded-xl text-center">
                <span className="text-[11px] font-bold text-slate-400 block">cosec θ (1/sin)</span>
                <span className="font-extrabold text-sm text-cyan-700">{(1/sinV).toFixed(4)}</span>
                <span className="text-[9px] text-slate-500 block">={hyp}/{opp}</span>
              </div>
            </div>
          </div>

          {/* Special formula box */}
          <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center gap-2">
            <span className="text-lg">💡</span>
            <div className="text-xs">
              <span className="font-bold text-indigo-950 block">सर्वसमिका सत्यापन (Identity Verification)</span>
              <span className="font-mono text-[11px] text-indigo-700 font-black">
                sin² θ + cos² {angle}° = {sinV.toFixed(2)}² + {cosV.toFixed(2)}² = {(sinV*sinV + cosV*cosV).toFixed(0)} (हमेशा 1)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. CHAPTER 4: QUADRATIC EQUATIONS
function QuadraticEquationSolver() {
  const [coeffA, setCoeffA] = useState<number>(1);   // -5 to 5, excluding 0
  const [coeffB, setCoeffB] = useState<number>(-4);  // -10 to 10
  const [coeffC, setCoeffC] = useState<number>(3);   // -10 to 10

  const safeA = coeffA === 0 ? 1 : coeffA;

  // Compute stats
  const D = coeffB * coeffB - 4 * safeA * coeffC;
  
  let root1Str = "";
  let root2Str = "";
  let rootNature = "";
  let rootColor = "bg-slate-55 text-slate-600";

  if (D > 0) {
    const r1 = (-coeffB + Math.sqrt(D)) / (2 * safeA);
    const r2 = (-coeffB - Math.sqrt(D)) / (2 * safeA);
    root1Str = r1.toFixed(3);
    root2Str = r2.toFixed(3);
    rootNature = "दो भिन्न और वास्तविक मूल (Real & Distinct Roots)";
    rootColor = "bg-emerald-50 border-emerald-100 text-emerald-800";
  } else if (D === 0) {
    const r = -coeffB / (2 * safeA);
    root1Str = r.toFixed(3);
    root2Str = r.toFixed(3);
    rootNature = "दो समान और वास्तविक मूल (Equal & Real Roots)";
    rootColor = "bg-blue-50 border-blue-100 text-blue-800";
  } else {
    const realPart = (-coeffB / (2 * safeA)).toFixed(2);
    const imagPart = (Math.sqrt(Math.abs(D)) / (2 * safeA)).toFixed(2);
    root1Str = `${realPart} + ${imagPart}i`;
    root2Str = `${realPart} - ${imagPart}i`;
    rootNature = "काल्पनिक मूल (Imaginary / Complex Roots)";
    rootColor = "bg-rose-50 border-rose-100 text-rose-800";
  }

  // Generate SVG path for a parabola
  // y = ax^2 + bx + c
  // Map x coords (0 to 200), center is at x=100 (which corresponds to math x=0)
  // Scale y by dividing or multiplying
  const points: string[] = [];
  for (let sx = 0; sx <= 200; sx += 5) {
    const realX = (sx - 100) / 10; // math x goes from -10 to 10
    const realY = safeA * realX * realX + coeffB * realX + coeffC;
    // Map math y to SVG sy: sy=100 matches realY=0. Going up is negative sy
    const sy = 100 - realY * 4;
    if (sy >= 0 && sy <= 200) {
      points.push(`${sx},${sy}`);
    }
  }
  const pathData = points.length > 0 ? "M " + points.join(" L ") : "";

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="math-quadratic-sim">
      <div className="flex items-center justify-between border-b pb-3">
        <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs">
          परवलय रेखाचितीय ग्राफ लैब (Parabola Plotter Lab)
        </span>
        <span className="font-mono text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-0.5 rounded-full font-black">
          {safeA}x² {coeffB >= 0 ? `+ ${coeffB}` : `${coeffB}`}x {coeffC >= 0 ? `+ ${coeffC}` : `${coeffC}`} = 0
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Curve Plotter */}
        <div className="md:col-span-5 bg-slate-50 p-4 border border-slate-100 rounded-2xl flex flex-col items-center justify-center min-h-[220px]">
          <svg width="200" height="200" className="overflow-visible bg-white border border-slate-150 rounded-xl shadow-inner">
            {/* Draw Axes */}
            <line x1="100" y1="0" x2="100" y2="200" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="0" y1="100" x2="200" y2="100" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Path */}
            {pathData && (
              <path d={pathData} fill="none" stroke="#4f46e5" strokeWidth="3" />
            )}

            {/* Vertex/Center guide */}
            <circle cx="100" cy="100" r="3" fill="#000" />
            
            {/* Roots indicator on x-axis if D >= 0 */}
            {D >= 0 && (
              <>
                {/* Visual indicator of roots */}
                <circle cx={100 + parseFloat(root1Str) * 10} cy="100" r="4.5" fill="#dc2626" />
                <circle cx={100 + parseFloat(root2Str) * 10} cy="100" r="4.5" fill="#dc2626" />
              </>
            )}
          </svg>
          <span className="text-[10px] text-slate-400 mt-2 font-mono font-bold">
            लाल बिन्दु: एक्स-अक्ष पर मूल (Roots on X)
          </span>
        </div>

        {/* Sliders and solutions column */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-500 uppercase block">गुणांक a = {coeffA}</span>
              <input
                type="range"
                min="-4"
                max="4"
                value={coeffA}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setCoeffA(val === 0 ? 1 : val);
                }}
                className="w-full accent-indigo-600"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-500 uppercase block">गुणांक b = {coeffB}</span>
              <input
                type="range"
                min="-8"
                max="8"
                value={coeffB}
                onChange={(e) => setCoeffB(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-500 uppercase block">गुणांक c = {coeffC}</span>
              <input
                type="range"
                min="-8"
                max="8"
                value={coeffC}
                onChange={(e) => setCoeffC(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          <div className="border border-slate-100 bg-slate-50 p-3.5 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>विविक्तकर (Discriminant D)</span>
              <span className="font-mono bg-white border border-slate-150 px-2 py-0.5 rounded text-indigo-700 font-extrabold">
                b² - 4ac = {D}
              </span>
            </div>

            <div className={`p-2 rounded-lg border text-xs text-center font-bold ${rootColor}`}>
              {rootNature}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
              <div className="bg-white border rounded p-1.5 text-center text-[10px]">
                <span className="text-slate-400 block font-sans">मूल 1 (α)</span>
                <span className="text-slate-700 font-black text-[12px]">{root1Str}</span>
              </div>
              <div className="bg-white border rounded p-1.5 text-center text-[10px]">
                <span className="text-slate-400 block font-sans">मूल 2 (β)</span>
                <span className="text-slate-700 font-black text-[12px]">{root2Str}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. CHAPTER 5: ARITHMETIC PROGRESSION
function ArithmeticProgressionBuilder() {
  const [firstTerm, setFirstTerm] = useState<number>(3); // a
  const [diff, setDiff] = useState<number>(2);          // d
  const [count, setCount] = useState<number>(8);        // n

  // Generate sequence
  const list: number[] = [];
  for (let i = 0; i < count; i++) {
    list.push(firstTerm + i * diff);
  }

  // Calculations
  const nthTerm = firstTerm + (count - 1) * diff;
  const sumN = (count / 2) * (firstTerm + nthTerm);

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-5" id="math-ap-sim">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs">
          समांतर श्रेढ़ी अनुक्रम निर्माता (Sequence Builder Lab)
        </span>
        <span className="text-xs text-slate-400 font-bold font-mono">AP Maker</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* AP control dashboard slider column */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black text-slate-500">
              <span>प्रथम पद a = {firstTerm}</span>
            </div>
            <input
              type="range"
              min="-10"
              max="20"
              value={firstTerm}
              onChange={(e) => setFirstTerm(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black text-slate-500">
              <span>सार्व अंतर d = {diff}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="10"
              value={diff}
              onChange={(e) => setDiff(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-black text-slate-500">
              <span>पदों की संख्या n = {count}</span>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* Real-time terms visual display list */}
        <div className="md:col-span-7 border border-slate-150 rounded-2xl p-4 bg-slate-50/50 space-y-4">
          <div>
            <span className="text-xs font-black text-slate-400 uppercase block mb-2">
              निर्मित समांतर श्रेढ़ी अनुक्रम (Generated Sequence List):
            </span>
            <div className="flex flex-wrap gap-2">
              {list.map((val, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-slate-100 rounded-xl p-2 min-w-[45px] text-center shadow-sm flex flex-col transition-all hover:border-indigo-400"
                >
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">
                    T{index + 1}
                  </span>
                  <span className="text-sm font-black text-slate-800">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AP summation formulas displays */}
          <div className="grid grid-cols-2 gap-3 pt-2 font-bold text-xs">
            <div className="bg-indigo-50/55 border border-indigo-100 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">
                {count}-वां पद सूलीकरण (nth Term a_n)
              </span>
              <span className="font-mono text-xs text-indigo-800 font-extrabold block mt-1">
                a_n = a + (n-1)d
              </span>
              <span className="text-[11px] text-slate-600 font-mono font-medium block">
                = {firstTerm} + ({count}-1)({diff}) = {nthTerm}
              </span>
            </div>

            <div className="bg-emerald-50/55 border border-emerald-100 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">
                पदों का योगफल (Sum of n terms S_n)
              </span>
              <span className="font-mono text-xs text-emerald-800 font-extrabold block mt-1">
                S_{count} = n/2 (a + l)
              </span>
              <span className="text-[11px] text-slate-600 font-mono font-medium block">
                = {count}/2 ({firstTerm} + {nthTerm}) = {sumN}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. CHAPTER 1: REAL NUMBERS - HCF & LCM TREE LAB
function RealNumbersLab() {
  const [numA, setNumA] = useState<number>(36);
  const [numB, setNumB] = useState<number>(48);

  const getPrimeFactors = (num: number) => {
    let temp = num;
    const factors: Record<number, number> = {};
    for (let d = 2; d * d <= temp; d++) {
      while (temp % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        temp /= d;
      }
    }
    if (temp > 1) {
      factors[temp] = (factors[temp] || 0) + 1;
    }
    return Object.keys(factors).map(k => ({ prime: Number(k), count: factors[Number(k)] }));
  };

  const getHcf = (a: number, b: number): number => {
    return b === 0 ? a : getHcf(b, a % b);
  };

  const hcf = getHcf(numA, numB);
  const lcm = (numA * numB) / hcf;

  const factorsA = getPrimeFactors(numA);
  const factorsB = getPrimeFactors(numB);

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="real-num-lab-container">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-indigo-150 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs">
          वास्तविक संख्याएं - अभाज्य गुणनखण्ड व HCF-LCM सत्यापन लैब
        </span>
        <span className="text-xs text-slate-400 font-bold font-mono">NEP Math 1.1</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">इनपुट पैरामीटर (Sliders):</span>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">प्रथम संख्या (A):</span>
                <span className="text-indigo-600 font-black">{numA}</span>
              </div>
              <input
                type="range"
                min="12"
                max="180"
                value={numA}
                onChange={(e) => setNumA(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">द्वितीय संख्या (B):</span>
                <span className="text-indigo-600 font-black">{numB}</span>
              </div>
              <input
                type="range"
                min="12"
                max="180"
                value={numB}
                onChange={(e) => setNumB(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100/50 space-y-3">
            <h5 className="text-xs font-black text-indigo-900 uppercase tracking-widest">अभाज्य गुणनखण्ड (Prime Factorization):</h5>
            <div className="text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
                <span className="font-bold">संख्या {numA} =</span>
                <span className="font-mono text-indigo-700 font-black">
                  {factorsA.map(f => `${f.prime}${f.count > 1 ? `^${f.count}` : ""}`).join(" × ") || numA}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
                <span className="font-bold">संख्या {numB} =</span>
                <span className="font-mono text-indigo-700 font-black">
                  {factorsB.map(f => `${f.prime}${f.count > 1 ? `^${f.count}` : ""}`).join(" × ") || numB}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between border border-slate-150 rounded-2xl p-4 bg-slate-50/50">
          <div className="space-y-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">गणना परिणाम (HCF & LCM):</span>
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white border rounded-xl p-3 shadow-sm">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">महत्तम समापवर्तक (HCF)</span>
                <span className="text-2xl font-black text-indigo-600">{hcf}</span>
              </div>
              <div className="bg-white border rounded-xl p-3 shadow-sm">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">लघुत्तम समापवर्त्य (LCM)</span>
                <span className="text-2xl font-black text-indigo-600">{lcm}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 space-y-2 text-xs">
              <span className="font-black text-emerald-900 block flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>गुणनफल सूत्र सत्यापन (Product Formula Verification):</span>
              </span>
              <p className="font-mono text-emerald-800 leading-normal font-semibold">
                HCF(A, B) × LCM(A, B) = A × B <br />
                ⇒ {hcf} × {lcm} = {numA} × {numB} <br />
                ⇒ <span className="font-black underline text-emerald-900">{hcf * lcm} = {numA * numB}</span> (सत्यापित!)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. CHAPTER 2: POLYNOMIALS - GRADIENT CURVE GRAPHING LAB
function PolynomialsCurveLab() {
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-2);
  const [coeffC, setCoeffC] = useState<number>(-3);

  const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;

  const vertexX = -coeffB / (2 * coeffA || 1);
  const vertexY = -discriminant / (4 * coeffA || 1);

  const plotPoints: string[] = [];
  const svgWidth = 260;
  const svgHeight = 160;
  const scaleX = 20;
  const scaleY = 10;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2 + 20;

  for (let x = -6; x <= 6; x += 0.25) {
    const y = coeffA * x * x + coeffB * x + coeffC;
    const svgX = centerX + x * scaleX;
    const svgY = centerY - y * scaleY;
    if (svgY >= 0 && svgY <= svgHeight) {
      plotPoints.push(`${svgX},${svgY}`);
    }
  }

  const dPath = plotPoints.length > 0 ? `M ${plotPoints.join(" L ")}` : "";

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="polynomials-lab-container">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">
          बहुपद - द्विघात समीकरण वक्र परवलय (Parabola Curve Grapher)
        </span>
        <span className="text-xs text-slate-400 font-bold font-mono">NEP Math 2.1</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3.5">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">द्विघात समीकरण गुणांक (Adjust coefficients):</span>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">गुणांक a (x² का गुणांक):</span>
                <span className="text-emerald-700 font-black">{coeffA}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="1"
                value={coeffA}
                onChange={(e) => setCoeffA(Number(e.target.value) === 0 ? 1 : Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">गुणांक b (x का गुणांक):</span>
                <span className="text-emerald-700 font-black">{coeffB}</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={coeffB}
                onChange={(e) => setCoeffB(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">अचर पद c (Constant):</span>
                <span className="text-emerald-700 font-black">{coeffC}</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={coeffC}
                onChange={(e) => setCoeffC(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>

          <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/40 text-xs space-y-2">
            <span className="font-extrabold text-emerald-950 block">द्विघात संकल्पना समीकरण:</span>
            <div className="font-mono text-sm bg-white border p-2 rounded-lg text-emerald-800 text-center font-black">
              y = ({coeffA})x² + ({coeffB})x + ({coeffC})
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-4 flex flex-col justify-between shadow-inner min-h-[220px]">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">लाइव ग्राफिक्स आरेख (Live SVG Plot):</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${discriminant >= 0 ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-red-950 text-red-400 border border-red-800"}`}>
              D = {discriminant} (विविक्तकर)
            </span>
          </div>

          <div className="relative flex justify-center items-center h-[160px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden self-center w-full">
            <svg width={svgWidth} height={svgHeight} className="absolute inset-0 w-full h-full">
              <line x1="0" y1={centerY} x2={svgWidth} y2={centerY} stroke="#334155" strokeWidth="1" />
              <line x1={centerX} y1="0" x2={centerX} y2={svgHeight} stroke="#334155" strokeWidth="1" />
              
              {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((t) => (
                <line
                  key={t}
                  x1={centerX + t * scaleX}
                  y1={centerY - 3}
                  x2={centerX + t * scaleX}
                  y2={centerY + 3}
                  stroke="#475569"
                />
              ))}

              {dPath && (
                <path
                  d={dPath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  className="transition-all duration-200"
                />
              )}

              <circle
                cx={centerX + vertexX * scaleX}
                cy={centerY - vertexY * scaleY}
                r="5"
                fill="#ec4899"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            <span className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono">X-Axis</span>
            <span className="absolute top-1 left-2 text-[9px] text-slate-500 font-mono">Y-Axis</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 font-semibold text-slate-300">
            <div>
              <span>शीर्ष बिंदु (Vertex):</span> <span className="font-mono text-pink-400 font-bold">({vertexX.toFixed(1)}, {vertexY.toFixed(1)})</span>
            </div>
            <div className="text-right">
              <span>शून्यकों की प्रवृत्ति:</span> <span className="text-emerald-400 font-bold">{discriminant > 0 ? "2 वास्तविक" : discriminant === 0 ? "1 वास्तविक" : "काल्पनिक वक्र"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. CHAPTER 3: PAIR OF LINEAR EQUATIONS IN TWO VARIABLES
function LinearEquationsIntersectionLab() {
  const [m1, setM1] = useState<number>(1);
  const [c1, setC1] = useState<number>(-1);
  const [m2, setM2] = useState<number>(-1);
  const [c2, setC2] = useState<number>(3);

  const isParallel = m1 === m2;
  const xIntersect = isParallel ? 0 : (c2 - c1) / (m1 - m2);
  const yIntersect = isParallel ? 0 : m1 * xIntersect + c1;

  const width = 260;
  const height = 160;
  const scale = 20;
  const cx = width / 2;
  const cy = height / 2;

  const getLinePoints = (m: number, c: number) => {
    const xMin = -6;
    const xMax = 6;
    const yMin = m * xMin + c;
    const yMax = m * xMax + c;
    return {
      x1: cx + xMin * scale,
      y1: cy - yMin * scale,
      x2: cx + xMax * scale,
      y2: cy - yMax * scale
    };
  };

  const line1 = getLinePoints(m1, c1);
  const line2 = getLinePoints(m2, c2);

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="linear-eq-lab">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full text-xs">
          दो रेखाओं का प्रतिच्छेदन व संगति ग्राफ प्रयोगशाला
        </span>
        <span className="text-xs text-slate-400 font-bold font-mono">NEP Math 3.1</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">रेखा मानकों का समायोजन (Slopes & Intercepts):</span>
          
          <div className="space-y-2 border-b pb-3">
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-black font-sans">रेखा-1: y = {m1}x + ({c1})</span>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold">ढाल (Slope m1): {m1}</span>
                <input type="range" min="-3" max="3" value={m1} onChange={(e) => setM1(Number(e.target.value))} className="w-full accent-blue-600 h-1 rounded-lg" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold">अन्तःखंड (c1): {c1}</span>
                <input type="range" min="-4" max="4" value={c1} onChange={(e) => setC1(Number(e.target.value))} className="w-full accent-blue-600 h-1 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-black font-sans">रेखा-2: y = {m2}x + ({c2})</span>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold">ढाल (Slope m2): {m2}</span>
                <input type="range" min="-3" max="3" value={m2} onChange={(e) => setM2(Number(e.target.value))} className="w-full accent-rose-600 h-1 rounded-lg" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold">अन्तःखंड (c2): {c2}</span>
                <input type="range" min="-4" max="4" value={c2} onChange={(e) => setC2(Number(e.target.value))} className="w-full accent-rose-600 h-1 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between border rounded-2xl p-4 bg-slate-950 text-white min-h-[220px]">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase font-sans">ग्राफ समीकरण तल:</span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${isParallel ? "bg-red-950 text-red-500" : "bg-emerald-950 text-emerald-500"}`}>
              {isParallel ? "असंगत (No Intersection)" : "संगत (Unique Intersection)"}
            </span>
          </div>

          <div className="relative flex justify-center items-center h-[130px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden self-center w-full shadow-inner">
            <svg width={width} height={height} className="absolute inset-0 w-full h-full">
              <line x1="0" y1={cy} x2={width} y2={cy} stroke="#334155" strokeWidth="1" />
              <line x1={cx} y1="0" x2={cx} y2={height} stroke="#334155" strokeWidth="1" />

              <line x1={line1.x1} y1={line1.y1} x2={line1.x2} y2={line1.y2} stroke="#3b82f6" strokeWidth="3" />
              <line x1={line2.x1} y1={line2.y1} x2={line2.x2} y2={line2.y2} stroke="#f43f5e" strokeWidth="3" />

              {!isParallel && (
                <circle cx={cx + xIntersect * scale} cy={cy - yIntersect * scale} r="6" fill="#10b981" stroke="white" strokeWidth="2" />
              )}
            </svg>
          </div>

          <div className="text-center text-xs font-semibold text-slate-400 mt-2">
            {isParallel ? (
              <span className="text-red-400">रेखाएँ समांतर हैं! कोई हल विद्यमान नहीं है।</span>
            ) : (
              <span>प्रतिच्छेदन बिंदु हल: <span className="text-emerald-400 font-mono font-black">X = {xIntersect.toFixed(1)}, Y = {yIntersect.toFixed(1)}</span></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. CHAPTER 7: COORDINATE GEOMETRY - VECTOR LAB
function CoordinateGeometryLab() {
  const [x1, setX1] = useState<number>(-2);
  const [y1, setY1] = useState<number>(-2);
  const [x2, setX2] = useState<number>(3);
  const [y2, setY2] = useState<number>(2);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const distanceSq = dx * dx + dy * dy;
  const distance = Math.sqrt(distanceSq);

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const graphW = 260;
  const graphH = 160;
  const mul = 18;
  const ox = graphW / 2;
  const oy = graphH / 2;

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="coord-geom-lab">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs">
          निर्देशांक ज्यामिति - दूरी एवं मध्य बिंदु सदिश प्रयोगशाला
        </span>
        <span className="text-xs text-slate-400 font-bold font-mono">NEP Math 7.1</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">बिंदु निर्देशांक नियंत्रण (Locate Nodes):</span>
          
          <div className="space-y-3">
            <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-black">बिंदु A (x1, y1): ({x1}, {y1})</span>
            <div className="flex gap-3">
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold">भुज (x1): {x1}</span>
                <input type="range" min="-5" max="5" value={x1} onChange={(e) => setX1(Number(e.target.value))} className="w-full h-1" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold">कोटि (y1): {y1}</span>
                <input type="range" min="-4" max="4" value={y1} onChange={(e) => setY1(Number(e.target.value))} className="w-full h-1" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-black">बिंदु B (x2, y2): ({x2}, {y2})</span>
            <div className="flex gap-3">
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold">भुज (x2): {x2}</span>
                <input type="range" min="-5" max="5" value={x2} onChange={(e) => setX2(Number(e.target.value))} className="w-full h-1" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold">कोटि (y2): {y2}</span>
                <input type="range" min="-4" max="4" value={y2} onChange={(e) => setY2(Number(e.target.value))} className="w-full h-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between border rounded-2xl p-4 bg-slate-900 text-white min-h-[220px]">
          <div className="relative flex justify-center items-center h-[140px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden self-center w-full">
            <svg width={graphW} height={graphH} className="absolute inset-0 w-full h-full">
              <line x1="0" y1={oy} x2={graphW} y2={oy} stroke="#475569" strokeWidth="1" />
              <line x1={ox} y1="0" x2={ox} y2={graphH} stroke="#475569" strokeWidth="1" />

              <line x1={ox + x1 * mul} y1={oy - y1 * mul} x2={ox + x2 * mul} y2={oy - y2 * mul} stroke="#6366f1" strokeWidth="3" />

              <circle cx={ox + x1 * mul} cy={oy - y1 * mul} r="6" fill="#60a5fa" stroke="white" strokeWidth="1.5" />
              <circle cx={ox + x2 * mul} cy={oy - y2 * mul} r="6" fill="#f43f5e" stroke="white" strokeWidth="1.5" />
              <circle cx={ox + midX * mul} cy={oy - midY * mul} r="4.5" fill="#10b981" stroke="white" strokeWidth="1.5" />
            </svg>
            <span className="absolute bottom-1 right-2 text-[9px] text-slate-500">Grid Plane</span>
          </div>

          <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700/50 mt-2 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">दूरी AB (Distance):</span>
              <span className="font-mono text-indigo-400 font-black">
                √({dx}² + {dy}²) = √{distanceSq} ≈ {distance.toFixed(2)} इकाइयां
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">मध्य बिंदु M (Midpoint):</span>
              <span className="font-mono text-emerald-400 font-black">
                ({midX.toFixed(1)}, {midY.toFixed(1)})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. CHAPTER 13: STATISTICS - DATA MAPPER LAB
function StatisticsLab() {
  const [dataPoints, setDataPoints] = useState<number[]>([40, 20, 60, 80, 50]);

  const handleValChange = (idx: number, newVal: number) => {
    const updated = [...dataPoints];
    updated[idx] = newVal;
    setDataPoints(updated);
  };

  const totalSum = dataPoints.reduce((acc, v) => acc + v, 0);
  const meanVal = totalSum / dataPoints.length;

  const sorted = [...dataPoints].sort((a,b)=>a-b);
  const medianVal = sorted[Math.floor(sorted.length / 2)];

  const frequency: Record<number, number> = {};
  dataPoints.forEach(v => { frequency[v] = (frequency[v] || 0) + 1; });
  let modeVal = dataPoints[0];
  let maxFreq = 0;
  Object.keys(frequency).forEach(k => {
    if (frequency[Number(k)] > maxFreq) {
      maxFreq = frequency[Number(k)];
      modeVal = Number(k);
    }
  });

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="stats-lab-master">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-teal-100 text-teal-700 font-bold px-3 py-1 rounded-full text-xs">
          सांख्यिकी - वर्गीकृत आँकड़े व केंद्रीय प्रवृत्ति के माप
        </span>
        <span className="text-xs text-slate-400 font-bold font-mono">NEP Math 13.1</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3.5">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">आँकड़े समायोजक (Customize Inputs):</span>
          
          {dataPoints.map((val, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">श्रेणी-भाग X{idx + 1} बारंबारता:</span>
                <span className="text-teal-750 font-black">{val}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={val}
                onChange={(e) => handleValChange(idx, Number(e.target.value))}
                className="w-full accent-teal-600 h-1"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between border rounded-2xl p-4 bg-slate-50/50">
          <div className="space-y-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">आलेख विजुअल व गणना (Mean & Median):</span>

            <div className="flex items-end justify-around h-[120px] bg-slate-900 rounded-xl p-3 border shadow-inner">
              {dataPoints.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center w-full max-w-[28px]">
                  <div
                    style={{ height: `${val || 1}px` }}
                    className="w-full bg-teal-500 border-b-2 border-teal-600 rounded-t-md transition-all duration-300"
                  />
                  <span className="text-[8px] text-slate-400 font-black mt-1 font-mono">X{idx+1}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white border rounded-xl p-2.5 shadow-sm">
                <span className="text-[8px] font-bold text-slate-400 block uppercase">माध्य (Mean)</span>
                <span className="text-base font-black text-teal-700">{meanVal.toFixed(1)}</span>
              </div>
              <div className="bg-white border rounded-xl p-2.5 shadow-sm">
                <span className="text-[8px] font-bold text-slate-400 block uppercase">माध्यक (Median)</span>
                <span className="text-base font-black text-teal-700">{medianVal}</span>
              </div>
              <div className="bg-white border rounded-xl p-2.5 shadow-sm">
                <span className="text-[8px] font-bold text-slate-400 block uppercase">बहुलक (Mode)</span>
                <span className="text-base font-black text-teal-700">{modeVal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. CHAPTER 14: PROBABILITY - TRIAL SIMULATOR LAB
function ProbabilityFlipLab() {
  const [trials, setTrials] = useState<number>(0);
  const [heads, setHeads] = useState<number>(0);
  const [tails, setTails] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  const tossFlipCoins = (n: number) => {
    setIsFlipping(true);
    setTimeout(() => {
      let hCount = 0;
      let tCount = 0;
      for (let i = 0; i < n; i++) {
        if (Math.random() < 0.5) {
          hCount++;
        } else {
          tCount++;
        }
      }
      setHeads(prev => prev + hCount);
      setTails(prev => prev + tCount);
      setTrials(prev => prev + n);
      setIsFlipping(false);
    }, 400);
  };

  const resetFlipState = () => {
    setTrials(0);
    setHeads(0);
    setTails(0);
  };

  const headsRatio = trials > 0 ? (heads / trials) * 100 : 0;
  const tailsRatio = trials > 0 ? (tails / trials) * 100 : 0;

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="probability-master-lab">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-pink-100 text-pink-700 font-bold px-3 py-1 rounded-full text-xs">
          प्रायिकता - यादृच्छिक सिक्का उछाल प्रयोगात्मक जाँच (Trial simulator)
        </span>
        <span className="text-xs text-slate-400 font-bold font-mono">NEP Math 14.1</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-12 lg:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">नियंत्रण डेशबोर्ड (Controls):</span>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => tossFlipCoins(10)}
                disabled={isFlipping}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-2.5 rounded-xl text-xs active:scale-95 transition-all shadow-sm"
              >
                10 बार उछालें
              </button>
              <button
                onClick={() => tossFlipCoins(100)}
                disabled={isFlipping}
                className="bg-slate-900 hover:bg-slate-800 text-white font-black py-2.5 rounded-xl text-xs active:scale-95 transition-all shadow-sm"
              >
                100 बार उछालें
              </button>
            </div>
          </div>

          <button
            onClick={resetFlipState}
            className="w-full border-2 border-slate-200 hover:bg-slate-100 text-slate-600 font-black py-2 rounded-xl text-xs mt-4 flex items-center justify-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>डेटा रीसेट करें</span>
          </button>
        </div>

        <div className="md:col-span-12 lg:col-span-7 flex flex-col justify-between border rounded-2xl p-4 bg-slate-950 text-white min-h-[220px]">
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
              <span>कुल परीक्षण उछाल (Total Flips):</span>
              <span className="text-pink-400 font-black">{trials}</span>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>पट (Heads H): {heads} बार</span>
                  <span className="text-pink-400">{headsRatio.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div style={{ width: `${headsRatio}%` }} className="bg-pink-500 h-full transition-all duration-300" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>चित (Tails T): {tails} बार</span>
                  <span className="text-blue-400">{tailsRatio.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden">
                  <div style={{ width: `${tailsRatio}%` }} className="bg-blue-500 h-full transition-all duration-300" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] leading-relaxed text-slate-400">
              ⚡ सिद्धांत: जैसे-जैसे कुल परीक्षणों की संख्या बढ़ती जाएगी, प्रायोगिक दर सैद्धांतिक प्रायिकता <span className="font-bold text-pink-400">0.5 (50%)</span> के अधिकाधिक निकट आती जाएगी। (महान संख्याओं का नियम - Law of Large Numbers)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. UNIVERSAL MATH STUDY WORKBOOK FALLBACK
function MathUniversalWhiteboard({ chapterId }: { chapterId: string }) {
  const [valS, setValS] = useState<number>(5);

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="math-whiteboard-sim">
      <div className="border-b pb-3 flex justify-between items-center">
        <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-xs">
          प्रयोगात्मक सूत्र सत्यापन एवं संकल्पना बोर्ड (Simulation Lab)
        </span>
        <span className="text-xs text-slate-400 font-bold font-mono">NEP Formula Live</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        <div className="md:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">चर मान नियंत्रक (Scale parameters):</span>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>सक्रिय कारक गुणांक (Factor Scale):</span>
                <span className="font-mono text-amber-700 font-black">{valS}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={valS}
                onChange={(e) => setValS(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-amber-50/40 p-3 rounded-xl border text-xs text-amber-800 font-semibold mt-4">
            इस अध्याय के मुख्य संकल्पना विजुअल आरेख को दाईं ओर लाइव सक्रिय कर परिमाप बदलें।
          </div>
        </div>

        <div className="md:col-span-7 bg-slate-950 text-white rounded-2xl p-4 flex flex-col justify-between min-h-[220px]">
          <span className="text-[10px] font-black text-slate-400 uppercase font-sans">यूनिवर्सल ज्यामितीय आलेख रचना:</span>

          <div className="relative flex justify-center items-center h-[130px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden self-center w-full my-2">
            <svg width="240" height="120" className="absolute inset-0 w-full h-full">
              {[1, 2, 3, 4].map((i) => (
                <circle
                  key={i}
                  cx="120"
                  cy="60"
                  r={Math.min(55, i * valS * 3.5)}
                  fill="none"
                  stroke={i % 2 === 0 ? "#f59e0b" : "#6366f1"}
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  className="opacity-75"
                />
              ))}
              <circle cx="120" cy="60" r="4" fill="#ef4444" />
            </svg>
          </div>

          <div className="text-center text-xs font-semibold text-slate-400">
            विस्तृत त्रिज्यात्मक परिमाप अनुपात: <span className="text-amber-400 font-mono font-black">R = {(valS * 7.5).toFixed(1)} इकाइयों</span>
          </div>
        </div>
      </div>
    </div>
  );
}
