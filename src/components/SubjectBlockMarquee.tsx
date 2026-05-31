import React, { useState } from "react";
import { Subject } from "../types";
import { 
  Calculator, 
  Atom, 
  Globe, 
  BookOpen, 
  Languages, 
  FileText, 
  Play, 
  FileCheck, 
  HelpCircle,
  HelpCircleIcon,
  ChevronsUp,
  Award
} from "lucide-react";

interface SubjectBlockMarqueeProps {
  subjects: Subject[];
  onSelectSubject: (id: string) => void;
  selectedSubjectId: string | null;
  fontSizeClass: string;
}

// Icon Mapping helper
export function renderSubjectIcon(iconName: string, className: string = "w-7 h-7") {
  switch (iconName) {
    case "Calculator": return <Calculator className={className} />;
    case "Atom": return <Atom className={className} />;
    case "Globe": return <Globe className={className} />;
    case "BookOpen": return <BookOpen className={className} />;
    case "Languages": return <Languages className={className} />;
    case "FileText": return <FileText className={className} />;
    default: return <BookOpen className={className} />;
  }
}

export default function SubjectBlockMarquee({
  subjects,
  onSelectSubject,
  selectedSubjectId,
  fontSizeClass,
}: SubjectBlockMarqueeProps) {
  return (
    <div className="w-full my-6 space-y-6" id="subject-main-section">
      
      {/* Static Visual subject grid overview */}
      <div className="w-full flex flex-col justify-between">
        <div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border-t-4 border-indigo-600 mb-6">
            <h2 className={`font-black text-indigo-900 flex items-center gap-2 ${fontSizeClass}`}>
              <Award className="w-8 h-8 text-yellow-500 shrink-0" />
              कक्षा 10 बोर्ड परीक्षा तैयारी मॉड्यूल
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
              प्रिय विद्यार्थियों, कक्षा 10 आपके शैक्षणिक जीवन का एक महत्वपूर्ण पड़ाव है। इस मंच पर सभी मुख्य विषयों को सुव्यवस्थित तरीके से संकलित किया गया है। नीचे दिए गए डैशबोर्ड ग्रिड में सीधे किसी एक ब्लॉक पर क्लिक करके अपनी पढ़ाई आरंभ करें:
            </p>
          </div>

          {/* Static dashboard grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="subject-static-grid">
            {subjects.map((subj) => {
              const isCurrent = selectedSubjectId === subj.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => onSelectSubject(subj.id)}
                  className={`cursor-pointer group flex flex-col justify-between text-left rounded-3xl p-6 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-104 ${subj.color} ${
                    isCurrent ? "ring-4 ring-yellow-400 border-yellow-400 bg-opacity-100 animate-pulse" : "bg-opacity-90"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-white rounded-2xl shadow-indigo-100 shadow-md group-hover:rotate-12 transition-transform">
                        {renderSubjectIcon(subj.icon, "w-8 h-8 " + subj.textColor)}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/15">
                        कक्षा 10
                      </span>
                    </div>
                    <h3 className={`font-black tracking-wide text-xl sm:text-2xl ${subj.textColor}`}>
                      {subj.name}
                    </h3>
                    <p className="text-xs text-slate-700 font-bold mt-1 opacity-90">
                      {subj.englishName}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-3 mt-2 font-medium leading-relaxed">
                      {subj.description}
                    </p>
                  </div>

                  {/* Indicator info pill */}
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-bold text-slate-800">
                    <span className="flex items-center gap-1">🎥 व्याख्यान</span>
                    <span className="flex items-center gap-1">📄 नोट्स</span>
                    <span className="flex items-center gap-1">⏱️ क्विज़</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global CSS animation injections for Vertical Marquee */}
      <style>{`
        @keyframes scroll-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical linear infinite;
        }
        .hover\\:scale-103:hover {
          transform: scale(1.03);
        }
        .hover\\:scale-104:hover {
          transform: scale(1.04);
        }
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>

    </div>
  );
}
