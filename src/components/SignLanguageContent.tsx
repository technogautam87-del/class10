import React, { useState } from "react";
import { SignLanguageSubject, SignLanguageChapter, SignLanguageTopic } from "../types";
import { 
  Youtube, 
  BookOpen, 
  Layers, 
  Play, 
  Video,
  ArrowLeft, 
  Sparkles, 
  ExternalLink,
  HelpCircle,
  Tv
} from "lucide-react";

interface SignLanguageContentProps {
  subjects: SignLanguageSubject[];
  fontSizeClass: string;
}

// Robust YouTube URL utility to format URLs properly for iframe embed
function getEmbedUrl(url: string): string {
  if (!url) return "";
  let cleaned = url.trim();

  if (cleaned.includes("/embed/")) {
    return cleaned;
  }

  // Robust YouTube URL ID Match
  const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/|live\/)([^#\&\?]*).*/;
  const match = cleaned.match(ytRegExp);

  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  return cleaned;
}

export default function SignLanguageContent({
  subjects,
  fontSizeClass,
}: SignLanguageContentProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
  const selectedChapter = selectedSubject?.chapters.find(c => c.id === selectedChapterId);

  const handleSubjectChange = (id: string) => {
    setSelectedSubjectId(id);
    setSelectedChapterId(null);
    setActiveTopicId(null);
  };

  const handleChapterChange = (id: string) => {
    setSelectedChapterId(id);
    setActiveTopicId(null);
  };

  return (
    <div className="space-y-8" id="sign-lang-root-container">
      
      {/* Banner / Header Card */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border-b-4 border-emerald-400">
        <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
          <Tv className="w-64 h-64" />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
          </div>
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] sm:text-xs font-black bg-emerald-500/30 px-3 py-1 rounded-full border border-emerald-400/30 tracking-widest uppercase text-emerald-200">
              विशेष समावेशी डिजिटल शिक्षा पहल
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white">
              सांकेतिक भाषा (Sign Language) डिजिटल लाइब्रेरी
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              मूक-बधिर विद्यार्थियों की सुविधा के लिए भारतीय सांकेतिक भाषा (ISL) में अध्याय-वार वीडियो व्याख्यान एवं टॉपिक स्तर पर प्रस्तुत सामग्री।
            </p>
          </div>
        </div>
      </div>

      {/* STEP 1: SUBJECT WISE BLOCKS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
            1
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-800">
            सबसे पहले विषय ब्लॉक का चयन करें (Select a Sign Subject):
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {subjects.map((sub) => {
            const isSelected = sub.id === selectedSubjectId;
            return (
              <button
                key={sub.id}
                onClick={() => handleSubjectChange(sub.id)}
                className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 transform active:scale-95 flex flex-col justify-between h-48 relative shadow-sm hover:shadow-lg ${
                  isSelected 
                    ? "border-emerald-500 bg-white ring-4 ring-emerald-500/10" 
                    : `${sub.color} hover:scale-[1.02]`
                }`}
              >
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-xl text-indigo-600 border border-slate-100">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="space-y-2 mt-4 pr-10">
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    {sub.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-bold line-clamp-3">
                    {sub.description}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full border-t border-slate-200/50 pt-3 mt-auto">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    कुल अध्याय: {sub.chapters?.length || 0}
                  </span>
                  <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                    खोलें →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: CHAPTER BLOCKS (CONDITIONAL ON SUBJECT SELECTED) */}
      {selectedSubject ? (
        <div className="space-y-4 pt-4 border-t border-slate-200 animate-fade-in" id="sign-lang-chapters-section">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black">
                2
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-800">
                अध्याय का चयन करें (Select a Chapter in {selectedSubject.name}):
              </h3>
            </div>
            
            <button
              onClick={() => {
                setSelectedSubjectId(null);
                setSelectedChapterId(null);
                setActiveTopicId(null);
              }}
              className="text-xs font-black text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition"
            >
              चयन रद्द करें X
            </button>
          </div>

          {selectedSubject.chapters && selectedSubject.chapters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedSubject.chapters.map((ch) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleChapterChange(ch.id)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all transform hover:scale-[1.01] active:scale-95 flex flex-col justify-between gap-4 ${
                      isSelected
                        ? "bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-indigo-950 shadow-md ring-4 ring-indigo-500/20"
                        : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-indigo-800 text-yellow-300' : 'bg-slate-100 text-teal-600'}`}>
                        <Layers className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-sm sm:text-base font-black leading-snug ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                          {ch.title}
                        </h4>
                        <span className={`text-[10px] font-bold block ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                          कुल उप-टॉपिक्स: {ch.topics?.length || 0}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-end mt-2 pt-2 border-t border-slate-100/10">
                      <span className={`text-xs font-black ${isSelected ? 'text-yellow-300' : 'text-indigo-600'}`}>
                        विषय-वार टॉपिक्स देखें →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed text-center p-8 rounded-2xl text-slate-500 font-bold text-xs">
              इस विषय के अंतर्गत कोई अध्याय अभी उपलब्ध नहीं है। एडमिन पैनल से नया अध्याय जोड़ें।
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 text-center rounded-3xl p-8 text-slate-500 text-xs sm:text-sm font-bold flex flex-col items-center justify-center space-y-2">
          <span>⚠️ जारी रखने के लिए ऊपर दी गई सूची से किसी एक सांकेतिक विषय पर क्लिक करें।</span>
          <span className="text-[11px] text-slate-400">विषय का चयन करते ही उसके अध्याय यहाँ दिखाई देंगे।</span>
        </div>
      )}

      {/* STEP 3: TOPIC BLOCKS AND INTEGRATED VIDEO PLAY FRAME */}
      {selectedChapter ? (
        <div className="space-y-4 pt-4 border-t border-slate-200 animate-fade-in" id="sign-lang-topics-section">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                3
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-800">
                टॉपिक स्तर विवरण एवं वीडियो प्लेअर (Topics & Integrated Player):
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* List of Topic Blocks */}
            <div className="xl:col-span-5 space-y-3">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                अध्याय के अध्ययन योग्य मुख्य टॉपिक्स:
              </span>
              
              {selectedChapter.topics && selectedChapter.topics.length > 0 ? (
                selectedChapter.topics.map((tp) => {
                  const isActive = tp.id === activeTopicId;
                  return (
                    <div
                      key={tp.id}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300/30"
                          : "bg-white hover:bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <h5 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
                            {tp.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-bold block">
                            स्रोतः यूट्यूब सांकेतिक व्याख्यान
                          </span>
                        </div>
                        
                        <button
                          onClick={() => setActiveTopicId(isActive ? null : tp.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 flex items-center gap-1.5 transition active:scale-95 ${
                            isActive
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-700/10"
                              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                          }`}
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{isActive ? "चालू है (Playing)" : "व्याख्यान देखें"}</span>
                        </button>
                      </div>

                      {/* COLLAPSED PLAYER CONTAINER - Renders YouTube Frame Right Below the Active Topic Block */}
                      {isActive && (
                        <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-3 animate-fade-in">
                          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border-2 border-emerald-500 shadow-lg relative">
                            {tp.youtubeUrl ? (
                              <iframe
                                src={getEmbedUrl(tp.youtubeUrl)}
                                title={tp.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 font-bold text-center p-4">
                                <span>लिंक उपलब्ध नहीं है</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <span className="text-[10px] text-slate-500 font-bold text-center sm:text-left">
                              क्या आप इसे यूट्यूब ऐप में खोलना चाहते हैं?
                            </span>
                            <a
                              href={tp.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-black text-rose-600 hover:text-white bg-white hover:bg-rose-600 border border-slate-200 px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition active:scale-95"
                            >
                              <Youtube className="w-3.5 h-3.5 text-rose-500 group-hover:text-white" />
                              <span>यूट्यूब पर सीधे खोलें</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-slate-50 border border-dashed text-center p-8 rounded-2xl text-slate-400 font-bold text-xs col-span-full">
                  इस अध्याय में कोई व्याख्यान टॉपिक अभी निर्दिष्ट नहीं हैं।
                </div>
              )}
            </div>

            {/* Side Static Demonstration Instruction Panel */}
            <div className="xl:col-span-7 flex flex-col justify-center">
              {activeTopicId ? (
                (() => {
                  const currentActiveTopic = selectedChapter.topics?.find(t => t.id === activeTopicId);
                  return (
                    <div className="bg-slate-900 rounded-3xl p-5 border-4 border-slate-800 text-white space-y-4 shadow-xl relative overflow-hidden hidden xl:block">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                          <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                            सक्रिय प्लेअर स्क्रीन (Active Theater Frame)
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          कक्षा 10 बोर्ड स्पेशल
                        </span>
                      </div>

                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative">
                        {currentActiveTopic?.youtubeUrl ? (
                          <iframe
                            src={getEmbedUrl(currentActiveTopic.youtubeUrl)}
                            title={currentActiveTopic.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500 text-xs font-bold">
                            यूट्यूब यूआरएल अनुपलब्ध या अमान्य है।
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5 pt-1.5">
                        <h4 className="text-base font-black text-amber-300 leading-snug">
                          {currentActiveTopic?.title}
                        </h4>
                        <p className="text-xs text-slate-300 font-bold leading-normal">
                          यह भारतीय सांकेतिक भाषा (ISL) आधारित शिक्षण मॉड्यूल विशेष रूप से विद्यार्थियों को बोर्ड परीक्षा में शानदार अंक दिलाने और वैचारिक स्पष्टीकरण देने हेतु राष्ट्रीय विशेषज्ञों द्वारा तैयार किया गया है।
                        </p>
                      </div>

                      <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50 flex items-center justify-between gap-3">
                        <span className="text-[10px] text-slate-400 font-bold leading-normal">
                          यदि वीडियो फ्रेम यहाँ लोड होने में समय ले रहा है, तो अधिक सुगमता के लिए सीधे जाएँ:
                        </span>
                        <a
                          href={currentActiveTopic?.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] px-4 py-2 rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-rose-950/20 whitespace-nowrap"
                        >
                          <Youtube className="w-3.5 h-3.5 text-white" />
                          <span>यूट्यूब पर डायरेक्ट चलाएं</span>
                        </a>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="bg-slate-100 border-2 border-slate-200/70 rounded-3xl p-8 text-center text-slate-500 space-y-4 hidden xl:flex flex-col justify-center items-center h-[460px]">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-3xl shadow-sm">
                    📺
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h4 className="text-sm sm:text-base font-black text-slate-800">
                      कोई सक्रिय वीडियो व्याख्यान चयनित नहीं है
                    </h4>
                    <p className="text-xs text-slate-400 font-bold leading-relaxed">
                      बाईं ओर सूचीबद्ध टॉपिक्स में से किसी "व्याख्यान देखें" बटन पर क्लिक करें। क्लिक करते ही वीडियो सीधे यहाँ बड़ी स्क्रीन थिएटर फ्रेम तथा छोटे टॉपिक ब्लॉक के नीचे स्वतंत्र रूप से चलने लगेगा।
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      ) : selectedSubject ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 text-center rounded-3xl p-8 text-slate-500 text-xs font-bold">
          ⚠️ उप-टॉपिक सूची देखने के लिए चरण 2 से किसी एक अध्याय का चयन करें।
        </div>
      ) : null}

    </div>
  );
}
