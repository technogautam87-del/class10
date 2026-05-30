import React, { useState, useEffect } from "react";
import { Zap, HelpCircle, CheckCircle, Flame } from "lucide-react";

interface ScienceSimulationsProps {
  chapterId: string;
}

export default function ScienceSimulations({ chapterId }: ScienceSimulationsProps) {
  switch (chapterId) {
    case "chem_reactions":
      return <ChemicalReactionLab />;
    case "electricity":
      return <ElectricityOhmsLawLab />;
    case "chem_balance":
      return <ChemicalEquationBalancer />;
    case "optics":
      return <RayOpticsLab />;
    default:
      return <div className="p-4 text-center text-slate-500 font-bold">कृपया अध्याय चुनें।</div>;
  }
}

// 1. ELECTRICITY: OHM'S LAW AND CIRCUIT LAB
function ElectricityOhmsLawLab() {
  const [volts, setVolts] = useState<number>(6); // 1V to 12V
  const [ohms, setOhms] = useState<number>(5);   // 1 to 20 ohm

  const current = (volts / ohms).toFixed(2);
  const power = (volts * parseFloat(current)).toFixed(1);

  // Animation ticks for moving electrons inside the loop path
  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
    // Speed increases proportional to Current (volts/ohms)
    const intervalSpeed = Math.max(16, 120 - parseFloat(current) * 20);
    const id = setInterval(() => {
      setOffset((prev) => (prev + 1) % 40);
    }, intervalSpeed);
    return () => clearInterval(id);
  }, [current]);

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="sci-ohms-sim">
      <div className="flex items-center justify-between border-b pb-3">
        <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">
          ओह्म नियम एवं धारा प्रवाह प्रयोगशाला (Circuit & Flow Lab)
        </span>
        <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-black font-mono">
          <Zap className="w-3.5 h-3.5 fill-amber-500" />
          <span>V = I × R</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Animated Wire Loop SVG Schema */}
        <div className="md:col-span-6 bg-slate-900 rounded-3xl p-5 border border-slate-950 flex flex-col items-center justify-center min-h-[250px] relative">
          <h5 className="text-[10px] uppercase font-black tracking-widest text-emerald-400 font-mono absolute top-4 left-4">
            विद्युत परिपथ सिमुलेटर (Live Circuit Mode)
          </h5>

          <svg width="220" height="150" className="overflow-visible mt-4">
            {/* Battery Box on bottom */}
            <rect x="70" y="115" width="80" height="25" rx="5" fill="#334155" />
            <text x="110" y="132" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">
              ⚡ {volts}V बैटरी
            </text>

            {/* Resistor zig-zag on top */}
            {/* Path representing load resistor */}
            <path
              d="M 50 35 L 75 35 L 80 25 L 90 45 L 100 25 L 110 45 L 120 25 L 130 45 L 140 25 L 145 35 L 170 35"
              fill="none"
              stroke={ohms > 12 ? "#ef4444" : ohms > 6 ? "#f97316" : "#eab308"}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Resistor load label */}
            <text x="110" y="15" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">
              प्रतिरोधक (R) = {ohms} Ω
            </text>

            {/* Complete Circuit loop wires */}
            <path
              d="M 50 35 L 15 35 L 15 125 L 70 125 M 150 125 L 205 125 L 205 35 L 170 35"
              fill="none"
              stroke="#475569"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Electron Flow particles along wires */}
            {/* Draw little yellow electron circles based on animated offset state */}
            {/* Moving anti-clockwise: path: battery + (right side) to battery - (left side) */}
            <circle cx={205} cy={125 - (offset * 2.25)} r="3" fill="#fbbf24" />
            <circle cx={205} cy={35 + (offset * 2.25)} r="3" fill="#fbbf24" />
            <circle cx={205 - (offset * 1.5)} cy="35" r="3" fill="#fbbf24" />
            <circle cx={15} cy={35 + (offset * 2.25)} r="3" fill="#fbbf24" />
            <circle cx={15} cy={125 - (offset * 2.25)} r="3" fill="#fbbf24" />
            <circle cx={15 + (offset * 1.5)} cy="125" r="3" fill="#fbbf24" />
          </svg>

          <span className="text-[10px] text-zinc-400 mt-4 text-center font-mono font-bold">
            पीली गेंदे: इलेक्ट्रॉन बहाव (Current Speed = {current} A)
          </span>
        </div>

        {/* Sliders and data inputs */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>विभवांतर (Voltage V):</span>
              <span className="text-emerald-700 font-extrabold">{volts} Volt</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={volts}
              onChange={(e) => setVolts(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>प्रतिरोध (Resistance R):</span>
              <span className="text-emerald-700 font-extrabold">{ohms} Ohm (Ω)</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={ohms}
              onChange={(e) => setOhms(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="border border-slate-100 bg-slate-50 p-4 rounded-xl space-y-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
              परिपथ सूत्र परिणाम (Circuit Mathematics Results):
            </span>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="bg-white border rounded-xl p-2.5 text-center">
                <span className="text-[10px] font-sans text-slate-400 font-black block">धारा (Current I)</span>
                <span className="text-base text-emerald-800 font-black tracking-tight">{current} A</span>
                <span className="text-[9px] text-slate-600 font-serif font-semibold block">V/R: {volts}V/{ohms}Ω</span>
              </div>

              <div className="bg-white border rounded-xl p-2.5 text-center">
                <span className="text-[10px] font-sans text-slate-400 font-black block">ऊर्जा शक्ति (Power P)</span>
                <span className="text-base text-amber-800 font-black tracking-tight">{power} W</span>
                <span className="text-[9px] text-slate-600 font-serif font-semibold block">V×I: {volts}×{current}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. CHEMISTRY: CHEMICAL EQUATION BALANCER
function ChemicalEquationBalancer() {
  const [cH2, setCH2] = useState<number>(1);
  const [cO2, setCO2] = useState<number>(1);
  const [cH2O, setCH2O] = useState<number>(1);

  const [activeReaction, setActiveReaction] = useState<"water" | "ammonia">("water");
  const [cNitrogen, setCNitrogen] = useState<number>(1);
  const [cHydrogen, setCHydrogen] = useState<number>(1);
  const [cAmmonia, setCAmmonia] = useState<number>(1);

  const [isBalanced, setIsBalanced] = useState<boolean | null>(null);

  // Reset check state on changes
  useEffect(() => {
    setIsBalanced(null);
  }, [cH2, cO2, cH2O, cNitrogen, cHydrogen, cAmmonia, activeReaction]);

  const testBalancing = () => {
    if (activeReaction === "water") {
      // 2 H2 + O2 -> 2 H2O
      const leftH = cH2 * 2;
      const leftO = cO2 * 2;
      const rightH = cH2O * 2;
      const rightO = cH2O * 1;

      setIsBalanced(leftH === rightH && leftO === rightO);
    } else {
      // N2 + 3 H2 -> 2 NH3
      const leftN = cNitrogen * 2;
      const leftH = cHydrogen * 2;
      const rightN = cAmmonia * 1;
      const rightH = cAmmonia * 3;

      setIsBalanced(leftN === rightN && leftH === rightH);
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="sci-chem-sim">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
        <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">
          रासायनिक अभिक्रिया संतुलन प्रयोग (Atoms balancing Lab)
        </span>

        {/* Reaction Type Toggles */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border text-[11px] font-bold">
          <button
            onClick={() => setActiveReaction("water")}
            className={`px-3 py-1 rounded-md transition ${activeReaction === "water" ? "bg-emerald-600 text-white shadow" : "text-slate-600"}`}
          >
            H₂O निर्माण
          </button>
          <button
            onClick={() => setActiveReaction("ammonia")}
            className={`px-3 py-1 rounded-md transition ${activeReaction === "ammonia" ? "bg-emerald-600 text-white shadow" : "text-slate-600"}`}
          >
            NH₃ अमोनिया
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Interactive Math Equation Row */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 flex flex-col items-center justify-center space-y-4 text-center">
          
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {activeReaction === "water" ? (
              <>
                {/* H2 coefficient */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <button onClick={() => setCH2(Math.max(1, cH2 - 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">-</button>
                    <span className="bg-indigo-600 text-white text-base font-black px-3 py-1 rounded-lg shadow-sm">{cH2}</span>
                    <button onClick={() => setCH2(Math.min(10, cH2 + 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">+</button>
                  </div>
                  <span className="text-xs font-serif font-black text-slate-700">H₂ (हाइड्रोजन)</span>
                </div>

                <span className="text-2xl font-black text-slate-400">+</span>

                {/* O2 coefficient */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <button onClick={() => setCO2(Math.max(1, cO2 - 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">-</button>
                    <span className="bg-emerald-600 text-white text-base font-black px-3 py-1 rounded-lg shadow-sm">{cO2}</span>
                    <button onClick={() => setCO2(Math.min(10, cO2 + 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">+</button>
                  </div>
                  <span className="text-xs font-serif font-black text-slate-700">O₂ (ऑक्सीजन)</span>
                </div>

                <span className="text-2xl font-black text-slate-400">➔</span>

                {/* H2O coefficient */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <button onClick={() => setCH2O(Math.max(1, cH2O - 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">-</button>
                    <span className="bg-rose-500 text-white text-base font-black px-3 py-1 rounded-lg shadow-sm">{cH2O}</span>
                    <button onClick={() => setCH2O(Math.min(10, cH2O + 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">+</button>
                  </div>
                  <span className="text-xs font-serif font-black text-slate-700">H₂O (जल वाष्प)</span>
                </div>
              </>
            ) : (
              <>
                {/* N2 coefficient */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <button onClick={() => setCNitrogen(Math.max(1, cNitrogen - 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">-</button>
                    <span className="bg-indigo-600 text-white text-base font-black px-3 py-1 rounded-lg shadow-sm">{cNitrogen}</span>
                    <button onClick={() => setCNitrogen(Math.min(10, cNitrogen + 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">+</button>
                  </div>
                  <span className="text-xs font-serif font-black text-slate-700">N₂ (नाइट्रोजन)</span>
                </div>

                <span className="text-2xl font-black text-slate-400">+</span>

                {/* H2 coefficient */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <button onClick={() => setCHydrogen(Math.max(1, cHydrogen - 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">-</button>
                    <span className="bg-emerald-600 text-white text-base font-black px-3 py-1 rounded-lg shadow-sm">{cHydrogen}</span>
                    <button onClick={() => setCHydrogen(Math.min(10, cHydrogen + 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">+</button>
                  </div>
                  <span className="text-xs font-serif font-black text-slate-700">H₂ (हाइड्रोजन)</span>
                </div>

                <span className="text-2xl font-black text-slate-400">➔</span>

                {/* NH3 coefficient */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <button onClick={() => setCAmmonia(Math.max(1, cAmmonia - 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">-</button>
                    <span className="bg-rose-500 text-white text-base font-black px-3 py-1 rounded-lg shadow-sm">{cAmmonia}</span>
                    <button onClick={() => setCAmmonia(Math.min(10, cAmmonia + 1))} className="px-2 py-0.5 bg-white border rounded text-[11px] font-bold shadow-sm">+</button>
                  </div>
                  <span className="text-xs font-serif font-black text-slate-700">NH₃ (अमोनिया गैस)</span>
                </div>
              </>
            )}
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2 w-full max-w-xs mx-auto">
            <button
              onClick={testBalancing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-xl text-xs font-black shadow-md transition"
            >
              द्रव्यमान संतुलन सत्यापित करें (Verify balance)
            </button>
          </div>
        </div>

        {/* Atom Table Audit View */}
        <div className="border rounded-2xl p-4 bg-slate-50/20 space-y-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            परमाणु संघटक तुलना ऑडिट (Reactants vs Products comparison):
          </span>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-100 bg-white rounded-xl p-3 text-center">
              <span className="text-[11px] font-black text-indigo-700 block">अभिकारक (Reactants Sides)</span>
              <div className="text-xs text-slate-600 font-bold space-y-1 mt-1 font-mono">
                {activeReaction === "water" ? (
                  <>
                    <p>H (हाइड्रोजन) = {cH2 * 2} परमाणु</p>
                    <p>O (ऑक्सीजन) = {cO2 * 2} परमाणु</p>
                  </>
                ) : (
                  <>
                    <p>N (नाइट्रोजन) = {cNitrogen * 2} परमाणु</p>
                    <p>H (हाइड्रोजन) = {cHydrogen * 2} परमाणु</p>
                  </>
                )}
              </div>
            </div>

            <div className="border border-slate-100 bg-white rounded-xl p-3 text-center">
              <span className="text-[11px] font-black text-rose-700 block">उत्पाद (Products Sides)</span>
              <div className="text-xs text-slate-600 font-bold space-y-1 mt-1 font-mono">
                {activeReaction === "water" ? (
                  <>
                    <p>H (हाइड्रोजन) = {cH2O * 2} परमाणु</p>
                    <p>O (ऑक्सीजन) = {cH2O * 1} परमाणु</p>
                  </>
                ) : (
                  <>
                    <p>N (नाइट्रोजन) = {cAmmonia * 1} परमाणु</p>
                    <p>H (हाइड्रोजन) = {cAmmonia * 3} परमाणु</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Validation Result overlay alerts */}
          {isBalanced !== null && (
            <div className={`p-3 rounded-xl border text-center text-xs font-extrabold shadow-sm animate-fade-in ${
              isBalanced 
                ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
                : "bg-rose-50 border-rose-100 text-rose-800"
            }`}>
              {isBalanced ? (
                <span>🎉 मुबारक हो! समीकरण संतुलित है। (Perfectly Balanced Equation according to NEP/NCERT)</span>
              ) : (
                <span>❌ असंतुलित समीकरण! दोनों तरफ परमाणुओं की संख्या बराबर करें। संतुलित अनुपात है: {
                  activeReaction === "water" ? "2, 1, 2" : "1, 3, 2"
                }</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 3. OPTICS: LENS GEOMETRIC REFRACTION BENCH
function RayOpticsLab() {
  const [focalLength, setFocalLength] = useState<number>(40);   // Focal length (f)
  const [objectDist, setObjectDist] = useState<number>(-70);   // Object distance (u)

  // Lens formula: 1/f = 1/v - 1/u => 1/v = 1/f + 1/u => v = (f * u) / (f + u)
  const u = objectDist;
  const f = focalLength;
  const denominator = f + u;
  const vDouble = denominator === 0 ? 9999 : (f * u) / denominator;
  const isInfinite = Math.abs(denominator) < 0.1 || Math.abs(vDouble) > 800;

  const imageDistVal = isInfinite ? "अनंत (Infinitive)" : vDouble.toFixed(1);
  const magnification = isInfinite ? "असीमित" : (vDouble / u).toFixed(2);

  // SVG dimensions & centers
  const cx = 110; // X axis center (Lens center coordinate)
  const cy = 70;  // Y axis constant

  // Drawn coordinates
  const oxX = cx + u; // object position (since u is negative, it goes left)
  const oxHeight = 35; // object height constant

  const imX = cx + vDouble; // image position
  const imHeight = isInfinite ? 0 : oxHeight * (vDouble / u); // inverted image if negative product

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6" id="sci-optics-sim">
      <div className="flex justify-between items-center border-b pb-3">
        <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">
          उत्तल लेंस प्रकाशीय किरण आरेख प्रयोगशाला (Optics Benching Lab)
        </span>
        <span className="text-xs text-rose-600 bg-rose-50 border border-rose-100 px-3 py-0.5 rounded-full font-black">
          1/f = 1/v - 1/u
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Optical Canvas SVG */}
        <div className="md:col-span-6 bg-slate-950 p-4 border rounded-3xl min-h-[220px] flex flex-col items-center justify-center relative">
          <svg width="220" height="140" className="overflow-visible bg-slate-900 border border-slate-950 rounded-2xl shadow-inner">
            {/* Focal markers */}
            {/* F1 (left) at cx - f, F2 (right) at cx + f */}
            <circle cx={cx - f} cy={cy} r="3.5" fill="#f43f5e" />
            <text x={cx - f} y={cy + 15} fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">F1</text>
            <circle cx={cx + f} cy={cy} r="3.5" fill="#f43f5e" />
            <text x={cx + f} y={cy + 15} fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">F2</text>

            {/* Principal Axis */}
            <line x1="5" y1={cy} x2="215" y2={cy} stroke="#475569" strokeWidth="1.5" />

            {/* Convex Lens Body */}
            <path d={`M ${cx} ${cy - 50} Q ${cx - 15} ${cy} ${cx} ${cy + 50} Q ${cx + 15} ${cy} ${cx} ${cy - 50}`} fill="rgba(14, 165, 233, 0.25)" stroke="#0ea5e9" strokeWidth="2.5" />
            <text x={cx} y={cy - 53} fill="#0ea5e9" fontSize="8" textAnchor="middle" fontWeight="black" className="font-mono">CONVEX LENS</text>

            {/* Object Arrow (Green) */}
            <line x1={oxX} y1={cy} x2={oxX} y2={cy - oxHeight} stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            {/* Arrowhead */}
            <polygon points={`${oxX},${cy - oxHeight} ${oxX - 4},${cy - oxHeight + 6} ${oxX + 4},${cy - oxHeight + 6}`} fill="#10b981" />
            <text x={oxX} y={cy - oxHeight - 5} fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">बिम्ब (O)</text>

            {/* Refracted Ray Tracer Paths if not infinite */}
            {!isInfinite && (
              <>
                {/* Ray 1: Parallel to axis, then through focal point F2 */}
                <path d={`M ${oxX} ${cy - oxHeight} L ${cx} ${cy - oxHeight} L ${cx + f * 2.5} ${cy + oxHeight * 2.5}`} fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3,1" />

                {/* Ray 2: Directly through lens center cx, cy */}
                <line x1={oxX} y1={cy - oxHeight} x2={imX} y2={cy + imHeight} stroke="#d97706" strokeWidth="1.5" />

                {/* Refracted Image (Red Arrow) */}
                {imX > 0 && imX < 220 && (
                  <>
                    <line x1={imX} y1={cy} x2={imX} y2={cy + imHeight} stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Arrowhead depending on inversion */}
                    <polygon
                      points={`${imX},${cy + imHeight} ${imX - 4.5},${cy + imHeight - (imHeight > 0 ? 7 : -7)} ${imX + 4.5},${cy + imHeight - (imHeight > 0 ? 7 : -7)}`}
                      fill="#ef4444"
                    />
                    <text x={imX} y={cy + imHeight + (imHeight > 0 ? 11 : -6)} fill="#ef4444" fontSize="9" textAnchor="middle" fontWeight="bold">प्रतिबिम्ब (I)</text>
                  </>
                )}
              </>
            )}
          </svg>
          <span className="text-[9px] text-slate-400 mt-2 font-bold font-mono">
            किरण आरेख (Ray Traces) - पीली एवं नारंगी किरणें
          </span>
        </div>

        {/* Sliders and math outcomes */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
              <span>फोकस दूरी (Focal Length f):</span>
              <span className="text-emerald-700 font-extrabold">{focalLength} cm</span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              value={focalLength}
              onChange={(e) => setFocalLength(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
              <span>बिम्ब की दूरी (Object Dist u):</span>
              <span className="text-emerald-700 font-extrabold">{objectDist} cm</span>
            </div>
            <input
              type="range"
              min="-100"
              max="-25"
              value={objectDist}
              onChange={(e) => setObjectDist(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="border border-slate-100 bg-slate-50 p-3 rounded-xl space-y-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
              लेंस सूत्र संगणक (Optics Math Desk):
            </span>

            <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
              <div className="bg-white border rounded-xl p-2">
                <span className="text-[10px] font-sans text-slate-400 block font-black">प्रतिबिम्ब दूरी (v)</span>
                <span className="font-black text-rose-800 text-sm">
                  {isInfinite ? imageDistVal : `${imageDistVal} cm`}
                </span>
              </div>

              <div className="bg-white border rounded-xl p-2">
                <span className="text-[10px] font-sans text-slate-400 block font-black">आवर्धन (m)</span>
                <span className="font-black text-amber-800 text-sm">{magnification} गुना</span>
              </div>
            </div>

            <div className="bg-emerald-50 text-[10px] p-2 rounded-lg text-emerald-800 font-bold leading-normal">
              🔍 {Math.abs(objectDist) > focalLength * 2 ? (
                <span>बिम्ब F और 2F के परे है। प्रतिबिम्ब वास्तविक, उल्टा और छोटा होगा।</span>
              ) : Math.abs(objectDist) === focalLength * 2 ? (
                <span>बिम्ब बिलकुल 2F पर है। प्रतिबिम्ब बराबर आकार का, वास्तविक और उल्टा बनेगा।</span>
              ) : Math.abs(objectDist) < focalLength ? (
                <span>बिम्ब फोकस F के भीतर है! प्रतिबिम्ब आभासी, सीधा (Virtual & Erect) और बड़ा बनेगा।</span>
              ) : (
                <span>बिम्ब F और 2F के बीच है। प्रतिबिम्ब 2F से परे, बड़ा, वास्तविक और उल्टा बनेगा।</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. CHEMISTRY: COMPREHENSIVE CHEMICAL REACTIONS ANIMATED LAB
function ChemicalReactionLab() {
  const [reactionType, setReactionType] = useState<"combination" | "displacement" | "decomposition">("combination");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 to 100
  const [stepText, setStepText] = useState<string>("चुनें और क्रिया आरंभ करें।");

  // Reset reaction state when switching types
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    if (reactionType === "combination") {
      setStepText("1. मैग्नीशियम रिबन को चिमटे से पकड़ें।\n2. 'अभिक्रिया शुरू करें' दबाकर इसे लौ के ऊपर लाएं।");
    } else if (reactionType === "displacement") {
      setStepText("1. बीकर में नीला कॉपर सल्फेट (CuSO₄) का घोल है।\n2. 'अभिक्रिया शुरू करें' दबाकर लोहे की कील (Fe) को घोल में डुबोएं।");
    } else {
      setStepText("1. परखनली में कैल्शियम कार्बोनेट (CaCO₃) का चूना पाउडर है।\n2. 'अभिक्रिया शुरू करें' दबाकर बर्नर की आंच से इसे गर्म करें।");
    }
  }, [reactionType]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
            // Handle complete text
            if (reactionType === "combination") {
              setStepText("सत्यापन: मैग्नीशियम वायु में उपस्थित ऑक्सीजन के साथ मिलकर चमकदार सफेद लौ के साथ जलता है और मैग्नीशियम ऑक्साइड (MgO) का सफेद चूर्ण बनाता है।\nसमीकरण (Equation): 2Mg(s) + O₂(g) → 2MgO(s)");
            } else if (reactionType === "displacement") {
              setStepText("सत्यापन: अधिक अभिक्रियाशील लोहा (Fe) कॉपर सल्फेट घोल से तांबे (Cu) को विस्थापित कर देता है। लोहे की कील पर तांबे की भूरी परत जमा हो जाती है और घोल का रंग नीला से हल्का हरा (FeSO₄) हो जाता है।\nसमीकरण (Equation): Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)");
            } else {
              setStepText("सत्यापन: गर्म करने पर कैल्शियम कार्बोनेट टूटकर बिना बुझा चूना (CaO) और कार्बन डाइऑक्साइड (CO₂) गैस बनाता है। यह थर्मल अपघटन का उदाहरण है।\nसमीकरण (Equation): CaCO₃(s) + ऊष्मा → CaO(s) + CO₂(g)↑");
            }
            return 100;
          }
          
          // Incremental text on different phases
          const next = prev + 2;
          if (reactionType === "combination") {
            if (next === 20) setStepText("मैग्नीशियम रिबन बर्नर की लौ के पास आ रहा है...");
            if (next === 50) setStepText("तीव्र दहन जारी! चमकदार सफेद लौ (Dazzling White Light) उत्पन्न हो रही है...");
            if (next === 85) setStepText("दहन पूरा हो रहा है। सफेद राख (मैग्नीशियम ऑक्साइड) चाइना डिश में एकत्र हो रही है...");
          } else if (reactionType === "displacement") {
            if (next === 20) setStepText("लोहे की कील कॉपर सल्फेट विलयन में डूब रही है...");
            if (next === 50) setStepText("लोहे और कॉपर सल्फेट के बीच रसायनिक विस्थापन सक्रिय है। अणुओं का आदान-प्रदान हो रहा है...");
            if (next === 80) setStepText("घोल का रंग बदल रहा है, कॉपर धातु कील पर जमा हो रही है...");
          } else {
            if (next === 20) setStepText("बर्नर चालू! टेस्ट ट्यूब नीचे से गर्म होना शुरू हो रही है...");
            if (next === 50) setStepText("कैल्शियम कार्बोनेट का अपघटन शुरू! CO₂ गैस के निकास बुलबुले उठ रहे हैं...");
            if (next === 80) setStepText("कार्बन डाइऑक्साइड गैस तेज़ी से प्रवाहित होकर ट्यूब से बाहर आ रही है...");
          }
          return next;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isPlaying, reactionType]);

  const handleStart = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="bg-white border rounded-2xl p-5 md:p-6 space-y-6 animate-fade-in-shorter" id="sci-chem-reactions-animated-lab">
      
      {/* Dynamic CSS styles injected specifically for simulation visual effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flameSway {
          0%, 100% { transform: scaleX(1) scaleY(1) rotate(-2deg); }
          50% { transform: scaleX(1.1) scaleY(1.2) rotate(2deg); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8)); }
        }
        @keyframes sparkleEffect {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.4); opacity: 1; filter: drop-shadow(0 0 30px rgba(255, 255, 255, 1)); }
        }
        @keyframes gasBubbleUp {
          0% { transform: translateY(60px) scale(0.5); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translateY(-40px) scale(0.9); opacity: 0; }
        }
        .animate-flame {
          animation: flameSway 0.6s infinite alternate;
        }
        .animate-sparkle {
          animation: sparkleEffect 0.3s infinite alternate;
        }
        .bubble-1 { animation: gasBubbleUp 1.2s infinite; }
        .bubble-2 { animation: gasBubbleUp 1.5s infinite 0.4s; }
        .bubble-3 { animation: gasBubbleUp 1s infinite 0.8s; }
        .bubble-4 { animation: gasBubbleUp 1.3s infinite 0.2s; }
      `}} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
        <span className="bg-teal-100 text-teal-700 font-extrabold px-3 py-1 rounded-full text-xs flex items-center gap-1">
          🔬 जीवंत रसायनिक अभिक्रिया प्रयोगशाला (Animated Reactions Lab)
        </span>
        
        {/* Toggle tabs */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border text-[11px] font-bold">
          <button
            onClick={() => setReactionType("combination")}
            className={`px-3 py-1 rounded-md transition ${reactionType === "combination" ? "bg-teal-600 text-white shadow" : "text-slate-600"}`}
          >
            संयोजन (Combination)
          </button>
          <button
            onClick={() => setReactionType("displacement")}
            className={`px-3 py-1 rounded-md transition ${reactionType === "displacement" ? "bg-teal-600 text-white shadow" : "text-slate-600"}`}
          >
            विस्थापन (Displacement)
          </button>
          <button
            onClick={() => setReactionType("decomposition")}
            className={`px-3 py-1 rounded-md transition ${reactionType === "decomposition" ? "bg-teal-600 text-white shadow" : "text-slate-600"}`}
          >
            अपघटन (Decomposition)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* ANIMATED INTERACTIVE STAGE */}
        <div className="md:col-span-7 bg-slate-900 rounded-3xl p-6 border-b-4 border-slate-950 flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden">
          
          <span className="absolute top-4 left-4 text-[9px] font-black tracking-widest text-teal-400 font-mono">
            LIVE ATOMIC STAGE: {reactionType.toUpperCase()}
          </span>

          {/* 1. COMBINATION REACTION STAGE (Magnesium combustion) */}
          {reactionType === "combination" && (
            <div className="flex flex-col items-center justify-between w-full h-[220px] relative">
              
              {/* Tongs holding Magnesium Ribbon */}
              <div 
                className="absolute transition-all duration-500 ease-out flex flex-col items-center"
                style={{
                  top: progress > 20 ? "40px" : "10px",
                  transform: `translateX(${progress > 20 ? "10px" : "-30px"})`
                }}
              >
                {/* Clamp */}
                <div className="w-24 h-2 bg-zinc-500 rounded-full transform rotate-12 origin-right relative">
                  <span className="absolute -left-16 -top-1 text-[9px] text-slate-400 font-bold font-mono">चिमटा (Tongs)</span>
                </div>
                {/* Magnesium Ribbon */}
                {progress < 85 ? (
                  <div className="w-3.5 h-16 bg-gradient-to-b from-slate-300 to-zinc-400 border border-slate-400 rounded-sm shadow-md mt-1 transform rotate-12 relative overflow-hidden">
                    <span className="absolute left-0 top-1 text-[8px] scale-75 text-slate-600 font-black tracking-wider">Mg</span>
                  </div>
                ) : (
                  /* Ash state */
                  <div className="w-3.5 h-8 bg-zinc-100/40 border border-dotted border-slate-300 rounded-sm mt-1 transform rotate-12 animate-pulse" />
                )}
              </div>

              {/* Dazzling Combustion Light Aura */}
              {progress >= 40 && progress <= 85 && (
                <div className="absolute top-[80px] w-24 h-24 rounded-full bg-white animate-sparkle opacity-90 blur-sm flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-300"></div>
                  <span className="absolute text-[8px] font-black text-amber-950 tracking-wider font-mono">DAZZLING Mg O₂</span>
                </div>
              )}

              {/* Bunsen Burner & Flame */}
              <div className="absolute bottom-0 flex flex-col items-center">
                {/* Flame element */}
                <div className="w-7 h-10 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-t-full rounded-b-lg animate-flame transform origin-bottom" />
                {/* Burner head */}
                <div className="w-12 h-8 bg-zinc-400 border-t-4 border-zinc-600 rounded-b-xl relative flex items-center justify-center">
                  <span className="text-[7.5px] font-black text-zinc-800 font-mono">बर्नर</span>
                </div>
                <div className="w-2 h-16 bg-zinc-500" />
                <div className="w-20 h-2 bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-full" />
              </div>

              {/* China dish catching magnesium oxide ash */}
              <div className="absolute bottom-1 right-6 flex flex-col items-center">
                <div className="w-16 h-7 bg-white border border-slate-300 rounded-b-2xl rounded-t-sm shadow-md relative overflow-hidden flex items-center justify-center">
                  {progress >= 70 && (
                    <div className="w-12 h-2.5 bg-zinc-100 rounded-full mt-2 border-b border-zinc-200 transition-all duration-300 flex items-center justify-center">
                      <span className="text-[8px] scale-90 font-black text-slate-500">MgO राख</span>
                    </div>
                  )}
                </div>
                <span className="text-[8px] text-zinc-400 mt-1 font-bold">चाइना डिश</span>
              </div>

            </div>
          )}

          {/* 2. DISPLACEMENT REACTION STAGE (Fe + CuSO4) */}
          {reactionType === "displacement" && (
            <div className="flex flex-col items-center justify-center w-full h-[220px] relative">
              
              {/* Beaker with Solution */}
              <div className="w-40 h-44 border-4 border-b-8 border-slate-400 rounded-b-3xl relative overflow-hidden bg-slate-900 shadow-xl">
                {/* Liquid fill representing CuSO4 solution changing color blue to green */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[110px] transition-all duration-500 ease-out"
                  style={{
                    backgroundColor: progress > 70 
                      ? "rgba(16, 185, 129, 0.45)" // green FeSO4 liquid
                      : progress > 30 
                        ? "rgba(6, 182, 212, 0.45)" // cyan intermediate state
                        : "rgba(59, 130, 246, 0.45)" // blue CuSO4 liquid
                  }}
                >
                  <span className="absolute bottom-2 left-4 text-[9px] font-black text-white uppercase tracking-wider font-mono">
                    {progress > 75 ? "FeSO₄ (हरा)" : "CuSO₄ (नीला)"}
                  </span>
                </div>

                {/* Hanging Iron nail moving inside solution */}
                <div 
                  className="absolute transition-all duration-700 ease-in-out flex flex-col items-center"
                  style={{
                    top: progress > 15 ? "15px" : "-60px",
                    left: "50px"
                  }}
                >
                  {/* String */}
                  <div className="w-0.5 h-16 bg-amber-100/50" />
                  {/* Nail */}
                  <div 
                    className="w-4 h-20 transition-all duration-500 ease-out rounded-b-full shadow border-r relative"
                    style={{
                      backgroundColor: progress > 70 
                        ? "#b45309" // browny copper deposits
                        : "#71717a" // steel gray iron nail
                    }}
                  >
                    <div className="w-6 h-1.5 bg-zinc-400 rounded-full" />
                    <span className="absolute bottom-6 left-0 right-0 text-center text-[7.5px] font-black text-white uppercase tracking-widest font-mono">
                      {progress > 70 ? "Cu परत" : "Fe कील"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Labels */}
              <span className="text-[10px] text-zinc-400 mt-2 font-mono font-bold">
                बीकर जल विलयन (Beaker state)
              </span>

            </div>
          )}

          {/* 3. DECOMPOSITION REACTION STAGE (CaCO3 Thermal decompose) */}
          {reactionType === "decomposition" && (
            <div className="flex flex-col items-center justify-between w-full h-[220px] relative">
              
              {/* Glowing heating test tube diagonal */}
              <div className="absolute top-[30px] rotate-[115deg] transform origin-center flex flex-col items-center">
                {/* Tube body */}
                <div className="w-10 h-36 border-4 border-slate-400 rounded-b-full bg-slate-800/35 relative overflow-hidden flex flex-col justify-end">
                  {/* Heat glow effect */}
                  {progress > 30 && (
                    <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
                  )}
                  {/* CaCO3 powder powder at the bottom */}
                  <div className="h-10 w-full bg-zinc-200 border-t border-slate-300 relative">
                    <span className="absolute -rotate-[115deg] top-1.5 left-2 text-[7.5px] scale-90 font-black text-slate-800">CaCO₃</span>
                  </div>

                  {/* Gas bubbles rising only when actively heated/generating */}
                  {progress > 45 && progress < 90 && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="w-2.5 h-2.5 bg-white/45 rounded-full absolute bottom-12 left-2 bubble-1" />
                      <div className="w-2 h-2 bg-white/45 rounded-full absolute bottom-16 left-4 bubble-2" />
                      <div className="w-1.5 h-1.5 bg-white/45 rounded-full absolute bottom-20 left-3 bubble-3" />
                      <div className="w-2 h-2 bg-white/45 rounded-full absolute bottom-10 right-3 bubble-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Bubbles and molecules rising outwards representing CO2 release */}
              {progress > 45 && progress < 90 && (
                <div className="absolute top-[10px] right-[40px] flex items-center gap-1 bg-zinc-800 border border-zinc-700 text-[9px] font-black font-mono text-cyan-400 px-2.5 py-0.5 rounded-full animate-bounce">
                  <span>💨 CO₂ गैस बुलबुले (CO₂ Exit)</span>
                </div>
              )}

              {/* Bunsen Burner heating underneath */}
              <div className="absolute bottom-0 flex flex-col items-center left-[10px] sm:left-[30px]">
                {/* Flame element */}
                {progress > 10 && (
                  <div className="w-6 h-8 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-t-full rounded-b-lg animate-flame transform origin-bottom" />
                )}
                {/* Burner base */}
                <div className="w-10 h-6 bg-zinc-400 border-t-4 border-zinc-500 rounded-b-lg text-[6.5px] text-zinc-900 font-mono text-center font-black">
                  ऊष्मा बर्नर
                </div>
              </div>

            </div>
          )}

          {/* Progress loader bar */}
          <div className="absolute bottom-4 left-4 right-4 bg-zinc-800/80 rounded-full h-1.5 overflow-hidden border border-zinc-700">
            <div 
              className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

        {/* INPUT CONTROLS / LAB MATHEMATICS PANEL */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 border rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                अभिक्रिया नियंत्रण (Reaction Trigger):
              </span>
              <p className="text-xs text-slate-600 font-bold mb-3">
                {reactionType === "combination" && "MgO चूर्ण का निर्माण"}
                {reactionType === "displacement" && "कील और CuSO4 अभिक्रिया"}
                {reactionType === "decomposition" && "CaCO3 थर्मल विघटन"}
              </p>

              {/* Step info logger */}
              <div className="bg-teal-950/5 text-teal-900 p-4 rounded-xl border border-teal-150 font-bold whitespace-pre-wrap text-[11px] sm:text-xs leading-normal">
                {stepText}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleStart}
                disabled={isPlaying}
                className={`flex-1 font-extrabold text-xs px-4 py-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all transform active:scale-95 ${
                  isPlaying 
                    ? "bg-teal-100 text-teal-600 border-teal-300 cursor-not-allowed animate-pulse" 
                    : "bg-teal-600 hover:bg-teal-700 text-white border-teal-600 hover:shadow-lg shadow-teal-50"
                }`}
              >
                <span>🧪 अभिक्रिया शुरू करें (Run Reaction)</span>
              </button>

              <button
                onClick={() => {
                  setProgress(0);
                  setIsPlaying(false);
                  if (reactionType === "combination") {
                    setStepText("1. मैग्नीशियम रिबन को चिमटे से पकड़ें।\n2. 'अभिक्रिया शुरू करें' दबाकर इसे लौ के ऊपर लाएं।");
                  } else if (reactionType === "displacement") {
                    setStepText("1. बीकर में नीला कॉपर सल्फेट (CuSO₄) का घोल है।\n2. 'अभिक्रिया शुरू करें' दबाकर लोहे की कील (Fe) को घोल में डुबोएं।");
                  } else {
                    setStepText("1. परखनली में कैल्शियम कार्बोनेट (CaCO₃) का चूना पाउडर है।\n2. 'अभिक्रिया शुरू करें' दबाकर बर्नर की आंच से इसे गर्म करें।");
                  }
                }}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs px-3 py-3 rounded-xl font-bold active:scale-95 transition-all"
              >
                पुनः आरंभ
              </button>
            </div>
          </div>

          {/* Quick Quiz validation within simulation */}
          <div className="border border-slate-100 bg-emerald-50/30 p-3 rounded-xl">
            <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">
              रासायनिक तथ्य बिंदु (Atomic Key points):
            </span>
            <ul className="text-[10px] text-slate-600 space-y-1 font-bold">
              {reactionType === "combination" && (
                <>
                  <li>• संयोजन में दो अभिकारक मिलकर सिंगल उत्पाद बनाते हैं।</li>
                  <li>• उत्पन्न प्रकाश आँखों के लिए हानिकारक हो सकता है। चश्मे का उपयोग करें।</li>
                </>
              )}
              {reactionType === "displacement" && (
                <>
                  <li>• CuSO₄ विलयन नीला होता है जबकि FeSO₄ विलयन हरा होता है।</li>
                  <li>• लोहा तांबे से अधिक सक्रिय धातु है (सक्रियता श्रेणी)।</li>
                </>
              )}
              {reactionType === "decomposition" && (
                <>
                  <li>• यह ऊष्माशोषी (Endothermic) क्रिया है क्योंकि इसे गर्маहट चाहिए।</li>
                  <li>• उत्पादित CaO (बिना बुझा चूना) सीमेंट निर्माण का मुख्य घटक है।</li>
                </>
              )}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
