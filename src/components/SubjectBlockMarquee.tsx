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
  const [isPaused, setIsPaused] = useState(false);

  // We duplicate the list to make the infinite vertical scrolling seamless
  const duplicatedSubjects = [...subjects, ...subjects, ...subjects];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-6" id="subject-main-section">
      
      {/* Scrollable Marquee column */}
      <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-2xl relative border-t-4 border-rose-500 overflow-hidden h-[540px] flex flex-col">
        <div className="mb-4 z-10 flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-black text-rose-400 flex items-center gap-1">
              <ChevronsUp className="w-5 h-5 animate-bounce" />
              स्वतः स्क्रॉलिंग विषय (Auto-Scroll)
            </h3>
            <p className="text-xs text-slate-300">ब्लॉक पर माउस लाएँ (या स्पर्श करें) और चयन करें:</p>
          </div>
          <span className="text-[10px] bg-rose-600/30 text-rose-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
            Live Stream
          </span>
        </div>

        {/* Vertical scrolling track */}
        <div 
          className="flex-1 overflow-hidden relative rounded-xl bg-slate-950/60 p-4 border border-slate-700/50"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          id="marquee-scroll-container"
        >
          <div 
            className={`flex flex-col gap-4 py-2 ${isPaused ? "animate-none" : "animate-scroll-vertical"}`}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
              animationDuration: "25s",
            }}
          >
            {duplicatedSubjects.map((subject, index) => {
              const worksAsSelected = selectedSubjectId === subject.id;
              return (
                <div
                  key={`${subject.id}-marquee-${index}`}
                  onClick={() => onSelectSubject(subject.id)}
                  className={`cursor-pointer transform hover:scale-103 hover:shadow-lg hover:border-yellow-400 border-2 rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 ${subject.color} ${
                    worksAsSelected ? "ring-4 ring-yellow-400 animate-pulse border-yellow-400 scale-102" : ""
                  }`}
                >
                  <div className={`p-3 rounded-xl bg-white shadow-md text-slate-900`}>
                    {renderSubjectIcon(subject.icon, "w-8 h-8")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`font-extrabold tracking-wide text-lg sm:text-xl md:text-2xl`}>
                        {subject.name}
                      </span>
                      <span className="text-[10px] opacity-80 bg-black/10 px-2 py-0.5 rounded-full font-bold">
                        {subject.englishName}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mt-1 opacity-90 line-clamp-2">
                      {subject.description}
                    </p>
                  </div>
                  <div className="text-xs font-bold shrink-0 self-end bg-black/10 px-2 py-1 rounded-md text-right">
                    {subject.quiz.length} प्रश्न
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fade effect on top and bottom */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none rounded-t-xl" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none rounded-b-xl" />
        </div>

        {/* Control hint label */}
        <div className="mt-3 text-center text-xs text-slate-400 font-medium">
          {isPaused ? "⏸️ स्क्रॉल रुका हुआ है" : "🔄 स्वतः ऊपर स्क्रॉल जारी है"}
        </div>
      </div>

      {/* Static Visual subject grid overview column */}
      <div className="lg:col-span-8 flex flex-col justify-between h-full min-h-[500px]">
        <div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border-t-4 border-indigo-600 mb-6">
            <h2 className={`font-black text-indigo-900 flex items-center gap-2 ${fontSizeClass}`}>
              <Award className="w-8 h-8 text-yellow-500 shrink-0" />
              कक्षा 10 बोर्ड परीक्षा तैयारी मॉड्यूल
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
              प्रिय विद्यार्थियों, कक्षा 10 आपके शैक्षणिक जीवन का एक महत्वपूर्ण पड़ाव है। इस मंच पर सभी मुख्य विषयों को सुव्यवस्थित तरीके से संकलित किया गया है। ऊपर स्क्रॉल हो रहे किसी भी विषय को क्लिक करें या नीचे दिए गए डैशबोर्ड ग्रिड में सीधे किसी एक ब्लॉक पर क्लिक करके अपनी पढ़ाई आरंभ करें:
            </p>
          </div>

          {/* Static dashboard grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="subject-static-grid">
            {subjects.map((subj) => {
              const isCurrent = selectedSubjectId === subj.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => onSelectSubject(subj.id)}
                  className={`cursor-pointer group flex flex-col justify-between text-left rounded-3xl p-5 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-104 ${subj.color} ${
                    isCurrent ? "ring-4 ring-yellow-400 border-yellow-400 bg-opacity-100" : "bg-opacity-90"
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
                    <h3 className={`font-black tracking-wide text-xl sm:text-xl md:text-2xl ${subj.textColor}`}>
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
                    <span className="flex items-center gap-1">🎥 4 वीडियो</span>
                    <span className="flex items-center gap-1">📄 (PDF) नोट्स</span>
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
