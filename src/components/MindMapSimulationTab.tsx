import React, { useState, useEffect } from "react";
import { 
  GitFork, 
  Cpu, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  Award,
  Book,
  Compass
} from "lucide-react";
import { SUBJECT_CHAPTERS, MindMapNode, getOrCreateChapterStructure } from "../data/simulationData";
import MathSimulations from "./simulations/MathSimulations";
import ScienceSimulations from "./simulations/ScienceSimulations";
import SstSimulations from "./simulations/SstSimulations";
import LanguageSimulations from "./simulations/LanguageSimulations";

interface MindMapSimulationTabProps {
  subjectId: string;
  fontSizeClass: string;
  selectedChapterId?: string | null;
  selectedChapterTitle?: string;
}

export default function MindMapSimulationTab({
  subjectId,
  fontSizeClass,
  selectedChapterId: propChapterId,
  selectedChapterTitle,
}: MindMapSimulationTabProps) {
  // Normalize subjectId to match our data keys robustly
  const normalizedSubjectId = subjectId === "social-science" ? "social" : subjectId === "social" ? "social" : subjectId;
  
  // Get chapters lists
  const availableChapters = SUBJECT_CHAPTERS[normalizedSubjectId] || SUBJECT_CHAPTERS.math;
  
  // State variables
  const [selectedChapterId, setSelectedChapterId] = useState<string>(availableChapters[0]?.id || "trigo");
  const [activeItem, setActiveItem] = useState<"mindmap" | "simulation">("mindmap");
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);

  // Use dynamic chapter resolution
  const activeChapterId = propChapterId || selectedChapterId;
  const currentChapter = getOrCreateChapterStructure(normalizedSubjectId, activeChapterId, selectedChapterTitle || "");
  const mindMapData = currentChapter?.mindMap;

  // Auto reset states when current chapter changes
  useEffect(() => {
    if (currentChapter && currentChapter.mindMap) {
      setSelectedNode(currentChapter.mindMap.rootNode);
    }
  }, [currentChapter]);

  // Handle chapter changes (fallback if manual picker is visible)
  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapterId(chapterId);
  };

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 space-y-6" id="mindmap-sim-master-panel">
      
      {/* Banner & NEP standard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <span className="bg-gradient-to-r from-amber-600 to-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-sans">
            डिजिटल प्रयोगात्मक अधिगम (NEP Simulation Labs)
          </span>
          <h3 className="text-2xl font-black text-slate-800 mt-2 flex items-center gap-2">
            🧠 {currentChapter?.title || "अध्याय"} माइंड मैप एवं सिमुलेशन लैब
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            कठिन अध्यायों को रंगीन ग्राफिक्स में समझें और जीवंत प्रयोगों के माध्यम से सिद्धान्तों का स्वयं सत्यापन करें।
          </p>
        </div>

        {/* Top Toggler between map and simulations */}
        <div className="flex bg-white border-2 border-slate-200 p-1 rounded-xl shadow-inner text-xs sm:text-sm font-bold self-start md:self-center shrink-0">
          <button
            onClick={() => setActiveItem("mindmap")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeItem === "mindmap"
                ? "bg-amber-600 text-white shadow font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>ग्राफिकल माइंड मैप</span>
          </button>
          
          <button
            onClick={() => setActiveItem("simulation")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeItem === "simulation"
                ? "bg-amber-600 text-white shadow font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>सिमुलेशन लैब (Live)</span>
          </button>
        </div>
      </div>

      {/* Chapter Picker Row Tabs (Only shown if viewing general or fallback context) */}
      {!propChapterId && (
        <div className="space-y-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            अध्याय चयन करें (Select Chapter):
          </span>
          
          <div className="flex flex-wrap gap-2.5">
            {availableChapters.map((chap) => {
              const isSelected = chap.id === selectedChapterId;
              return (
                <button
                  key={chap.id}
                  onClick={() => handleChapterSelect(chap.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-black transition-all shadow-sm ${
                    isSelected 
                      ? "bg-amber-600 border-amber-600 text-white font-extrabold scale-102" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-sm shrink-0">{chap.icon}</span>
                  <span>{chap.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* View Content based on selection */}
      {activeItem === "mindmap" ? (
        /* ==================== MIND MAP SCREEN ==================== */
        <div className="space-y-6 animate-fade-in-shorter">
          <div className="bg-amber-50/60 border border-amber-200/60 p-4 rounded-xl flex items-start gap-3">
            <span className="text-xl">🌟</span>
            <div>
              <p className="font-bold text-amber-950 text-xs sm:text-sm">
                माइंड मैप गाइड (Interactive Guide):
              </p>
              <p className="text-xs text-amber-800 font-medium leading-relaxed mt-0.5">
                नीचे इस पाठ का पदानुक्रमित रंगीन पेड़ बना हुआ है। किसी भी कार्ड पर क्लिक करके उसके मुख्य तथ्य, सर्वसमिकाएं और परीक्षा उपयोगी बुलेट पॉइंट्स दाईं ओर/नीचे विस्तार से देखें।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Visual Mind Map Graph (Left Col 7) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm overflow-hidden flex flex-col justify-between">
              
              <div className="border-b pb-3 mb-6 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase block font-mono">
                    {currentChapter?.topicName}
                  </span>
                  <h4 className="text-lg font-black text-slate-800">
                    {currentChapter?.title} संकल्पना विजुअल
                  </h4>
                </div>
                <BookOpen className="w-5 h-5 text-slate-400 shrink-0" />
              </div>

              {/* Hierarchy Tree Area */}
              <div className="relative min-h-[300px] flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-50/50 border border-slate-100 overflow-x-auto">
                
                {/* Central Root Node Card */}
                {mindMapData?.rootNode && (
                  <div 
                    onClick={() => setSelectedNode(mindMapData.rootNode)}
                    className={`cursor-pointer max-w-[280px] p-4 text-center rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 shadow-md flex flex-col items-center gap-1.5 ${mindMapData.rootNode.color} ${
                      selectedNode?.label === mindMapData.rootNode.label ? "ring-4 ring-amber-200 animate-pulse font-extrabold" : ""
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span className="font-black text-xs leading-tight">{mindMapData.rootNode.label}</span>
                    <span className="text-[9px] opacity-75 font-mono">{mindMapData.rootNode.engLabel}</span>
                    <p className="text-[10px] leading-tight opacity-90 font-medium mt-1 line-clamp-2">
                      {mindMapData.rootNode.description}
                    </p>
                  </div>
                )}

                {/* Connecting Line */}
                <div className="my-4 h-6 w-1 border-l-4 border-dashed border-slate-300"></div>

                {/* Children Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                  {mindMapData?.rootNode?.children?.map((child, idx) => {
                    const isSelected = selectedNode?.label === child.label;
                    return (
                      <div 
                        key={idx}
                        onClick={() => setSelectedNode(child)}
                        className={`cursor-pointer p-3.5 rounded-xl border transition-all text-center flex flex-col justify-between hover:scale-103 active:scale-97 shadow-sm text-xs ${
                          child.color || "bg-white border-slate-200 text-slate-800"
                        } ${
                          isSelected ? "ring-4 ring-amber-400 font-black scale-103" : "opacity-85 hover:opacity-100"
                        }`}
                      >
                        <div>
                          <div className="w-5 h-5 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-1.5 font-bold font-mono text-[10px]">
                            {idx + 1}
                          </div>
                          <h5 className="font-black leading-tight break-words">
                            {child.label}
                          </h5>
                          {child.engLabel && (
                            <span className="text-[9px] font-mono opacity-80 block mt-0.5">
                              {child.engLabel}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] mt-2 leading-snug opacity-90 line-clamp-2">
                          {child.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>

              <div className="text-center mt-4">
                <span className="text-[11px] font-semibold text-slate-400">
                  ⚡ उपरोक्त किसी भी रंगीन नोड पर क्लिक कर विवरण दाईं ओर विस्तार से देखें।
                </span>
              </div>

            </div>

            {/* Explanation side drawer panel (Right Col 5) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
              {selectedNode ? (
                <div className="space-y-4 animate-fade-in-shorter">
                  
                  {/* Title node banner */}
                  <div className="flex items-center gap-3 border-b pb-3">
                    <div className="p-2.5 rounded-xl bg-amber-150/60 text-amber-700 font-extrabold text-lg">
                      🎓
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-amber-600 block uppercase font-mono tracking-wider">
                        क्रियाशील नोड (Active Node Branch)
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                        {selectedNode.label}
                      </h4>
                      {selectedNode.engLabel && (
                        <span className="text-xs text-slate-400 font-mono">({selectedNode.engLabel})</span>
                      )}
                    </div>
                  </div>

                  {/* Summary card description */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                      {selectedNode.description}
                    </p>
                  </div>

                  {/* Bullets metrics */}
                  {selectedNode.bullets && selectedNode.bullets.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                        परीक्षा मुख्य सूत्र / आधार बिंदु:
                      </span>
                      <ul className="space-y-1.5">
                        {selectedNode.bullets.map((bull, bIdx) => (
                          <li key={bIdx} className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-start gap-2.5 font-bold">
                            <span className="text-amber-500 font-black shrink-0 mt-0.5">●</span>
                            <span className="leading-normal">{bull}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 my-auto text-slate-400">
                  <Book className="w-10 h-10 stroke-1" />
                  <span className="text-xs font-bold">कृपया विवरण देखने के लिए बाएँ चार्ट के किसी भी कार्ड पर क्लिक करें।</span>
                </div>
              )}

              {/* Bottom footer incentive button */}
              <button
                onClick={() => {
                  setActiveItem("simulation");
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2 px-4 text-xs font-black shadow-md mt-4 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>इस चेप्टर का लाइव सिमुलेटर खोलें</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* ==================== ACTIVE SIMULATOR SCREEN ==================== */
        <div className="space-y-5 animate-fade-in-shorter">
          <div className="bg-emerald-50/50 border border-emerald-200/50 p-4 rounded-xl flex items-start gap-3">
            <span className="text-xl">🔬</span>
            <div>
              <p className="font-bold text-emerald-950 text-xs sm:text-sm">
                लाइव प्रयोगात्मक लैब (Simulation Rules):
              </p>
              <p className="text-xs text-emerald-800 font-medium leading-relaxed mt-0.5">
                नीचे दी गई भौतिक/गणितीय/साहित्यिक प्रयोगशाला में स्लाइडर्स तथा बटन क्लिक द्वारा इनपुट पैरामीटर बदलें। इनपुट बदलते ही परिपथ, सुत्र या आरेख तुरंत परिवर्तित होकर गणना परिणाम प्रदर्शित करेंगे।
              </p>
            </div>
          </div>

          {/* Conditional rendering of language, math, science, sst simulations */}
          {normalizedSubjectId === "math" && (
            <MathSimulations chapterId={selectedChapterId} />
          )}

          {normalizedSubjectId === "science" && (
            <ScienceSimulations chapterId={selectedChapterId} />
          )}

          {normalizedSubjectId === "social" && (
            <SstSimulations chapterId={selectedChapterId} />
          )}

          {/* Languages subjects: english, hindi, sanskrit */}
          {(normalizedSubjectId === "hindi" || normalizedSubjectId === "english" || normalizedSubjectId === "sanskrit") && (
            <LanguageSimulations subjectId={normalizedSubjectId} chapterId={selectedChapterId} />
          )}

          <div className="bg-slate-100 border rounded-2xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Award className="w-5 h-5 text-amber-500 shrink-0" />
              <span>क्या आपने सभी प्रयोग सम्पन्न कर सत्यापन कर लिया है? परिणाम नोट करें।</span>
            </div>
            
            <button
              onClick={() => setActiveItem("mindmap")}
              className="text-xs shrink-0 font-black text-indigo-700 bg-white border px-3 py-1.5 rounded-lg active:scale-95 transition-all hover:bg-slate-50"
            >
              वापस माइंड मैप देखें 🧠
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
