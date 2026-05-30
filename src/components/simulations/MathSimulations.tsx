import React, { useState } from "react";
import { Zap, HelpCircle, CheckCircle, RefreshCw } from "lucide-react";

interface MathSimulationsProps {
  chapterId: string;
}

export default function MathSimulations({ chapterId }: MathSimulationsProps) {
  switch (chapterId) {
    case "trigo":
      return <TrigoIntroduction />;
    case "quadratic":
      return <QuadraticEquationSolver />;
    case "ap":
      return <ArithmeticProgressionBuilder />;
    default:
      return <div className="p-4 text-center text-slate-500 font-bold">कृपया अध्याय चुनें।</div>;
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
