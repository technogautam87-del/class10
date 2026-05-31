import React, { useState, useEffect } from "react";
import { Subject, Video, Note } from "../types";
import QuizView from "./QuizView";
import MindMapSimulationTab from "./MindMapSimulationTab";
import { 
  Play, 
  Download, 
  HelpCircle, 
  Youtube, 
  FileText, 
  ChevronRight, 
  BookOpen, 
  Activity, 
  Video as VideoIcon,
  Sparkles,
  Info,
  GitFork
} from "lucide-react";

// Helper function to detect if URL is YouTube
function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  const cleaned = url.trim().toLowerCase();
  return (
    cleaned.includes("youtube.com") ||
    cleaned.includes("youtu.be") ||
    cleaned.includes("y2u.be")
  );
}

// Helper function to detect if URL is direct video file
function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  const cleaned = url.trim().toLowerCase();
  return (
    cleaned.endsWith(".mp4") ||
    cleaned.endsWith(".webm") ||
    cleaned.endsWith(".ogg") ||
    cleaned.includes(".mp4?") ||
    cleaned.includes(".webm?") ||
    cleaned.includes(".ogg?")
  );
}

// Helper function to safely format manually updated YouTube URLs or Google Drive URLs to embed URLs for iframes
function getEmbedUrl(url: string): string {
  if (!url) return "";
  let cleaned = url.trim();

  // Convert Google Drive links so they embed without Refused to Connect
  if (cleaned.includes("drive.google.com")) {
    if (cleaned.includes("/view")) {
      return cleaned.replace(/\/view.*/, "/preview");
    }
    if (cleaned.includes("/edit")) {
      return cleaned.replace(/\/edit.*/, "/preview");
    }
    if (cleaned.includes("open?id=")) {
      try {
        const urlObj = new URL(cleaned);
        const folderId = urlObj.searchParams.get("id");
        if (folderId) return `https://drive.google.com/file/d/${folderId}/preview`;
      } catch (e) {
        const match = cleaned.match(/id=([^&#]+)/);
        if (match && match[1]) return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
  }

  if (cleaned.includes("/embed/")) {
    return cleaned;
  }

  // Robust YouTube URL ID Match including mobile, short, live, watch, etc.
  const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/|live\/)([^#\&\?]*).*/;
  const match = cleaned.match(ytRegExp);

  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  return cleaned;
}

interface SubjectContentProps {
  subject: Subject;
  fontSizeClass: string;
  initialChapterId?: string | null;
  initialTab?: "video" | "notes" | "quiz" | "mindmap_sim" | null;
  onClearedInitialParams?: () => void;
}

export default function SubjectContent({
  subject,
  fontSizeClass,
  initialChapterId,
  initialTab,
  onClearedInitialParams,
}: SubjectContentProps) {
  const [activeTab, setActiveTab] = useState<"video" | "notes" | "quiz" | "mindmap_sim">("video");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Auto-set the first video as selected when subject or videos list changes
  useEffect(() => {
    if (initialChapterId) {
      setSelectedChapterId(initialChapterId);
    } else {
      setSelectedChapterId(null);
    }

    if (subject.videos && subject.videos.length > 0) {
      setSelectedVideo(subject.videos[0]);
    } else {
      setSelectedVideo(null);
    }

    if (initialTab) {
      setActiveTab(initialTab);
    } else {
      setActiveTab("video");
    }

    if ((initialChapterId || initialTab) && onClearedInitialParams) {
      onClearedInitialParams();
    }
  }, [subject, initialChapterId, initialTab]);

  const selectedChapterObj = selectedChapterId ? subject.notes.find(n => n.id === selectedChapterId) : null;
  const displayedVideos = !selectedChapterId || selectedChapterId === "all"
    ? subject.videos
    : subject.videos.filter(vid => {
        if (!selectedChapterObj) return false;
        
        // Extract chapter number from selected chapter, e.g. "अध्याय 1" or "अध्याय 11"
        const numMatch = selectedChapterObj.title.match(/अध्याय\s*(\d+)/);
        if (numMatch) {
          const num = parseInt(numMatch[1], 10);
          // Check if video title includes the chapter number
          const matchTerms = [
            `अध्याय ${num}`,
            `अध्याय 0${num}`,
            `Ch ${num}`,
            `Ch 0${num}`,
            `Chapter ${num}`,
            `Chapter 0${num}`
          ];
          return matchTerms.some(term => vid.title.toLowerCase().includes(term.toLowerCase()));
        }
        
        // Secondary keyword matching (eg. Trigonometry, Electric, etc from English/Hindi name)
        const childWords = selectedChapterObj.title.replace(/विज्ञान|गणित|इतिहास|भूगोल|अध्याय/g, "").trim().split(/\s+/);
        return childWords.some(w => w.length > 2 && vid.title.toLowerCase().includes(w.toLowerCase()));
      });

  // Track state matching
  useEffect(() => {
    if (displayedVideos && displayedVideos.length > 0) {
      // If our current selected video is not in the displayed videos, set it to the first matching
      if (!displayedVideos.some(v => v.id === selectedVideo?.id)) {
        setSelectedVideo(displayedVideos[0]);
      }
    } else {
      setSelectedVideo(null);
    }
  }, [selectedChapterId, subject]);

  const handleDownload = (note: Note) => {
    setDownloadingId(note.id);
    
    // Simulate interactive educational PDF download
    setTimeout(() => {
      setDownloadingId(null);
      
      // Let's open or trigger direct download of the NCERT book PDF
      const link = document.createElement("a");
      link.href = note.pdfUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("download", `${note.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <div 
      className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-200 mt-6 transform transition-all"
      id="active-subject-content-view"
    >
      
      {/* Subject banner row */}
      <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-r ${subject.gradient || "from-amber-500 to-orange-600"} text-white mb-6 shadow-md relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transform translate-x-8 -translate-y-8">
          <BookOpen className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-sm">
              विषय मॉड्यूल (Subject Module)
            </span>
            <span className="bg-yellow-400 text-slate-900 text-xs px-2.5 py-1 rounded-full font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> कक्षा 10वीं बोर्ड
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
            {subject.name}
            <span className="text-xl sm:text-2xl font-normal opacity-85">({subject.englishName})</span>
          </h2>
          <p className="text-sm sm:text-base text-white/90 mt-2 max-w-3xl leading-relaxed">
            {subject.description}
          </p>
        </div>
      </div>

      {/* Dynamic Conditional view: Chapter block menu OR Tab Content */}
      {!selectedChapterId ? (
        <div id="chapter-selection-grid-view" className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b pb-3 border-slate-150">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <span className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white">📖</span>
              <span>अध्याय चयन सूची (Select Chapter Block)</span>
            </h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-black">
              कुल {subject.notes.filter(n => n.id !== "m-full" && n.id !== "s-full" && !n.id.includes("full")).length} अध्याय
            </span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-500 leading-relaxed">
            कृपया नीचे दिए गए अध्यायों में से किसी एक ब्लॉक का चयन करें। चयन करने के पश्चात उस अध्याय से संबंधित सभी वीडियो व्याख्यान, विषय पुस्तकें, माइंड मैप, विज्ञान प्रयोगशाला सिमुलेशन और स्व-मूल्यांकन क्विज़ अपने आप सक्रिय हो जाएंगे:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {subject.notes
              .filter(n => n.id !== "m-full" && n.id !== "s-full" && !n.id.includes("full"))
              .map((chap, idx) => {
                const getChapterIcon = () => {
                  if (subject.id === "math") return "📐";
                  if (subject.id === "science") return "🧪";
                  if (subject.id.includes("social") || subject.id === "social") return "🌍";
                  return "📝";
                };

                return (
                  <div
                    key={chap.id}
                    onClick={() => {
                      setSelectedChapterId(chap.id);
                    }}
                    className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-amber-400 hover:shadow-xl rounded-2xl p-5 cursor-pointer group transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-15 transition-opacity text-5xl">
                      {getChapterIcon()}
                    </div>

                    <div className="space-y-4">
                      {/* Chapter badge */}
                      <span className="inline-block bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        अध्याय {idx + 1}
                      </span>

                      <h4 className="text-base font-black text-slate-900 group-hover:text-amber-700 line-clamp-2 leading-snug transition-colors">
                        {chap.title}
                      </h4>

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                        <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded font-black">
                          🎥 वीडियो
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-black">
                          📖 नोट्स/पुस्तक
                        </span>
                        <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded font-black">
                          🧠 माइंड मैप
                        </span>
                        <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded font-black">
                          ✏️ क्विज़
                        </span>
                      </div>

                      <div className="text-right pt-2">
                        <span className="inline-flex items-center gap-1 text-xs font-black text-amber-600 group-hover:translate-x-1 duration-200 transition-transform">
                          सीखना आरंभ करें ➜
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <>
          {/* Back to chapters Breadcrumb / Active Header bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-amber-5/20 border border-amber-100 rounded-2xl select-none">
            <button
              onClick={() => setSelectedChapterId(null)}
              className="px-4 py-2.5 bg-white text-slate-700 border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-amber-400 hover:text-amber-700 font-extrabold text-xs sm:text-xs flex items-center gap-2 shadow-sm transition-all duration-250 group cursor-pointer active:scale-95"
            >
              <span>⬅️ सभी अध्यायों की सूची पर वापस जाएँ</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-black text-center shrink-0">
                चयनित अध्याय :
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-800 line-clamp-1">
                {selectedChapterObj?.title}
              </span>
            </div>
          </div>

          {/* THREE TABS NAVIGATOR: "वीडियो", "एनसीईआरटी पुस्तकें", "क्विज़" (Visible only after a chapter selection) */}
          <div className="flex border-b-2 border-slate-100 mb-6 font-bold" id="subject-tabs-container">
            
            <button
              onClick={() => setActiveTab("video")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-4 sm:px-8 border-b-4 text-[11px] sm:text-base transition-all ${
                activeTab === "video"
                  ? "border-amber-500 text-amber-700 bg-amber-50/40"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              id="tab-btn-video"
            >
              <VideoIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === "video" ? "text-amber-600" : ""}`} />
              <span>वीडियो व्याख्यान ({displayedVideos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("notes")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-4 sm:px-8 border-b-4 text-[11px] sm:text-base transition-all ${
                activeTab === "notes"
                  ? "border-amber-600 text-amber-800 bg-amber-50/40"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              id="tab-btn-notes"
            >
              <FileText className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === "notes" ? "text-amber-600" : ""}`} />
              <span>एनसीईआरटी पुस्तकें / PDF</span>
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-4 sm:px-8 border-b-4 text-[11px] sm:text-base transition-all ${
                activeTab === "quiz"
                  ? "border-rose-600 text-rose-700 bg-rose-50/40"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              id="tab-btn-quiz"
            >
              <HelpCircle className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === "quiz" ? "text-rose-600" : ""}`} />
              <span>स्व-मूल्यांकन क्विज़</span>
            </button>

            <button
              onClick={() => setActiveTab("mindmap_sim")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-4 sm:px-8 border-b-4 text-[11px] sm:text-base transition-all ${
                activeTab === "mindmap_sim"
                  ? "border-purple-600 text-purple-700 bg-purple-50/40 font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              id="tab-btn-mindmap_sim"
            >
              <GitFork className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === "mindmap_sim" ? "text-purple-600 animate-pulse" : ""}`} />
              <span>माइंड मैप & सिमुलेशन</span>
            </button>

          </div>


      {/* TAB CONTENTS */}
      <div className="min-h-[400px]">
        
        {/* VIDEOS TAB */}
        {activeTab === "video" && (
          <div className="space-y-6 animate-fade-in" id="tab-videos-panel">
            
            {/* Chapter Selector Dropdown ("dd") */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-tr from-amber-600 to-rose-600 text-white rounded-2xl shadow-md">
                  <VideoIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-800">📖 अध्याय-वार वीडियो व्याख्यान</h4>
                  <p className="text-[11px] text-slate-500 font-bold">नीचे ड्रापडाउन से अध्याय चुनें और अपनी बोर्ड परीक्षा की तैयारी के लिए सर्वश्रेष्ठ यूट्यूब व्याख्यान देखें।</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-black text-slate-600 shrink-0 font-sans">अध्याय चयन (Select):</label>
                <select
                  value={selectedChapterId}
                  onChange={(e) => {
                    setSelectedChapterId(e.target.value);
                  }}
                  className="bg-white border-2 border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs font-black outline-none ring-amber-500 focus:ring-2 focus:border-amber-500 shadow-sm"
                  id="chapter-video-dropdown"
                >
                  <option value="all">📁 सभी अध्याय (Show All Chapters)</option>
                  {subject.notes.filter(n => n.id !== "m-full" && n.id !== "s-full" && !n.id.includes("full")).map((chap) => (
                    <option key={chap.id} value={chap.id}>
                      📖 {chap.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Player or Fallback Portal Widget */}
              <div className="lg:col-span-8 flex flex-col">
                {selectedVideo ? (
                  <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-2.5 border-2 border-amber-100 flex flex-col justify-between">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden relative bg-black">
                      {isDirectVideoUrl(selectedVideo.url) ? (
                        <video
                          src={selectedVideo.url}
                          controls
                          className="w-full h-full rounded-2xl"
                        />
                      ) : isYouTubeUrl(selectedVideo.url) || selectedVideo.url.includes("drive.google.com") || selectedVideo.url.includes("/embed/") ? (
                        <iframe
                          src={getEmbedUrl(selectedVideo.url)}
                          title={selectedVideo.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        /* GORGEOUS DIRECT LINK PLAY BLOCK - EXCELLENT RESOLUTION FOR REFUSED TO CONNECT */
                        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 flex flex-col justify-center items-center text-center p-6 space-y-4">
                          <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center text-white text-3xl animate-pulse shadow-lg shadow-rose-950/50">
                            ▶️
                          </div>
                          <div className="space-y-1 max-w-md px-4">
                            <h4 className="text-sm sm:text-base font-black text-white">
                              {selectedVideo.title}
                            </h4>
                            <p className="text-[11px] text-amber-200 font-bold leading-normal">
                              यह वीडियो बाह्य स्रोत (External Source) से है। ब्राउज़र सुरक्षा नियमों के कारण इसे सीधे यहाँ चलाने की जगह सीधे नई विंडो में सुरक्षित रूप से खोला जाएगा।
                            </p>
                          </div>
                          
                          <a
                            href={selectedVideo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 py-3 rounded-2xl text-xs font-black shadow-lg shadow-yellow-400/20 active:scale-95 transition-transform flex items-center gap-2"
                          >
                            <Youtube className="w-4 h-4 text-rose-600" />
                            <span>अभी वीडियो चालू करें (Play Direct Link)</span>
                          </a>
                        </div>
                      )}
                    </div>
                    
                    {/* Active video metadata */}
                    <div className="p-4 sm:p-5 text-white space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                        <span className="text-yellow-300 font-bold text-xs flex items-center gap-1">
                          <Youtube className="w-4 h-4 text-rose-500 animate-pulse" /> अब चल रहा है • व्याख्यान
                        </span>
                        {selectedVideo.duration && (
                          <span className="text-[11px] bg-slate-800 border border-slate-700 text-slate-300 font-bold px-2 py-1 rounded-full">
                            🕒 अवधि: {selectedVideo.duration}
                          </span>
                        )}
                      </div>
                      
                      <h4 className={`font-black text-white ${fontSizeClass}`}>
                        {selectedVideo.title}
                      </h4>
                      {selectedVideo.description && (
                        <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                          वर्णन: {selectedVideo.description}
                        </p>
                      )}

                      {/* Direct YouTube Video Link */}
                      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="space-y-0.5 text-left">
                          <span className="text-[10px] font-black tracking-wider text-amber-400 uppercase block">
                            डायरेक्ट वीडियो प्लेअर लिंक
                          </span>
                          <span className="text-xs text-slate-300 font-bold">
                            क्या आप इस लेक्चर को सीधे अपने फ़ोन/कंप्यूटर के मूल प्लेयर में देखना चाहते हैं?
                          </span>
                        </div>
                        <a
                          href={selectedVideo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 shadow-md shadow-rose-950/20 shrink-0"
                        >
                          <Youtube className="w-4 h-4 text-white" />
                          <span>यूट्यूब या सोर्स पर सीधे खोलें</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* GORGEOUS FALLBACK CARD FOR CHAPTERS WITH NO LOCAL EMBED */
                  <div className="bg-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 text-center text-white space-y-6 shadow-2xl flex flex-col justify-center items-center relative overflow-hidden" id="portal-matching-callout">
                    <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12">
                      <VideoIcon className="w-64 h-64" />
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-600 flex items-center justify-center text-3xl animate-bounce shadow-lg shadow-orange-950/40">
                      📺
                    </div>
                    
                    <div className="space-y-2 max-w-xl">
                      <span className="text-yellow-400 font-black text-xs tracking-wider block uppercase">
                        विषय व्याख्यान खोजें (YouTube Video Search)
                      </span>
                      <h3 className="text-lg sm:text-2xl font-black text-white">
                        {selectedChapterObj?.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-bold leading-relaxed">
                        इस विशिष्ट अध्याय के लिए कोई स्थानीय वीडियो व्याख्यान उपलब्ध नहीं है। आप सीधे यूट्यूब पर इस विषय से जुड़े उत्कृष्ट वीडियो देख सकते हैं। कृपया नीचे दिए गए यूट्यूब सर्च बटन पर क्लिक करें:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 w-full max-w-xs">
                      <a 
                        href={`https://www.youtube.com/results?search_query=NCERT+Class+10+${encodeURIComponent(subject.name)}+${encodeURIComponent(selectedChapterObj?.title || "")}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-rose-600 hover:bg-rose-700 text-white py-3 px-4 rounded-xl text-xs font-black shadow-md transition transform active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Youtube className="w-4 h-4" />
                        <span>यूट्यूब पर वीडियो खोजें</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: video list */}
              <div className="lg:col-span-4 flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                <h4 className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wide mb-1 flex items-center gap-1.5 font-sans">
                  <Activity className="w-4 h-4 text-amber-600 shrink-0" />
                  अध्याय व्याख्यान सूची ({displayedVideos.length})
                </h4>
                
                {displayedVideos.length > 0 ? (
                  displayedVideos.map((vid) => {
                    const isActive = selectedVideo?.id === vid.id;
                    return (
                      <button
                        key={vid.id}
                        onClick={() => setSelectedVideo(vid)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-4 group shrink-0 ${
                          isActive
                            ? "bg-amber-700 border-amber-700 text-white shadow-lg shadow-amber-100"
                            : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-white text-amber-700 border border-amber-100 group-hover:scale-110 transition-transform"}`}>
                          <Play className="w-4 h-4 stroke-[3px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-extrabold text-xs sm:text-sm line-clamp-2 leading-snug">
                            {vid.title}
                          </h5>
                          <span className={`text-[10px] block mt-1 font-bold ${isActive ? "text-yellow-200" : "text-slate-500"}`}>
                            🕒 {vid.duration || "आधिकारिक"}
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs font-bold bg-slate-50 border border-dashed rounded-2xl p-4">
                    इस अध्याय के वीडियो व्याख्यान उपलब्ध नहीं हैं। विषय का नाम बदलकर नई खोज करें।
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* NOTES (PDF DOWNLOADS / NCERT TEXTBOOKS) TAB */}
        {activeTab === "notes" && (
          <div id="tab-notes-panel" className="animate-fade-in">
            <div className="bg-amber-50 text-amber-900 rounded-2xl p-5 mb-6 border border-amber-200 text-xs sm:text-base font-bold flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-2xl sm:text-3xl shrink-0">📙</span>
              <div>
                <p className="font-extrabold text-amber-950">एनसीईआरटी (NCERT) आधिकारिक पाठ्यपुस्तक लिंक</p>
                <p className="text-xs sm:text-sm text-amber-800 font-medium mt-1 leading-relaxed">
                  नीचे दी गई सभी पुस्तकें और प्रत्येक अध्याय की पीडीएफ फाइलें सीधे <strong>ncert.nic.in</strong> के आधिकारिक सर्वर से लिंक की गई हैं। आप डाउनलोड बटन पर क्लिक करके इन्हें सहेज सकते हैं, भविष्य की परीक्षा की उत्कृष्ट तैयारी के लिए ऑफ़लाइन संग्रह कर सकते हैं।
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {subject.notes.map((note) => {
                const isDownloading = downloadingId === note.id;
                return (
                  <div
                    key={note.id}
                    className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-white hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-3 bg-amber-100 text-amber-700 rounded-xl shadow-inner shrink-0">
                        <FileText className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-black text-slate-800 text-sm sm:text-base leading-tight font-sans break-words">
                          {note.title}
                        </h4>
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-100/50 px-2.5 py-0.5 rounded-full inline-block mt-1.5 border border-amber-200">
                          अध्याय/टॉपिक: {note.topic || "सभी अध्याय"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(note)}
                      disabled={isDownloading}
                      className={`w-full sm:w-auto shrink-0 font-extrabold text-xs sm:text-sm px-4 py-3 rounded-xl border flex items-center justify-center gap-2 transform active:scale-95 transition-all ${
                        isDownloading
                          ? "bg-amber-100 text-amber-600 border-amber-300 cursor-not-allowed animate-pulse"
                          : "bg-amber-600 hover:bg-amber-700 text-white border-amber-600 hover:shadow-lg shadow-amber-50"
                      }`}
                    >
                      <Download className={`w-4 h-4 ${isDownloading ? "animate-spin" : "stroke-[2.5]"}`} />
                      <span>{isDownloading ? "चैनल लोड हो रहा है..." : "पुस्तक डाउनलोड करें"}</span>
                    </button>
                  </div>
                );
              })}

              {subject.notes.length === 0 && (
                <div className="col-span-2 text-center py-10 text-slate-500">
                  इस विषय में कोई डिजिटल पुस्तकें उपलब्ध नहीं हैं।
                </div>
              )}
            </div>
            
            {/* Quick Helper for browser downloads */}
            <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 leading-relaxed font-semibold flex items-start gap-2.5">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block mb-1">💡 डाउनलोड निर्देश (Download Guidance):</span>
                यदि आपके फ़ोन या कंप्यूटर में पॉपअप ब्लॉकर्स सक्रिय हैं, तो 'डाउनलोड' बटन दबाने पर नई टैब में एनसीईआरटी की साइट स्वतः न खुले तो बटन पर पुनः क्लिक करें। पीडीएफ खुलने के बाद आप अपने ब्राउज़र के ऊपरी दाहिने कोने वाले 'Save/Download' तीर के निशान पर क्लिक करके स्थायी रूप से डाउनलोड कर सकते हैं।
              </div>
            </div>
          </div>
        )}

        {/* RANDOM SHUFFLED QUIZ TAB */}
        {activeTab === "quiz" && (
          <div id="tab-quiz-panel" className="animate-fade-in">
            <QuizView
              subjectName={subject.name}
              originalQuestions={subject.quiz}
              fontSizeClass={fontSizeClass}
            />
          </div>
        )}

        {/* INTERACTIVE MIND MAP & SIMULATION LAB TAB */}
        {activeTab === "mindmap_sim" && (
          <div id="tab-mindmapsim-panel" className="animate-fade-in">
            <MindMapSimulationTab
              subjectId={subject.id}
              fontSizeClass={fontSizeClass}
              selectedChapterId={selectedChapterId}
              selectedChapterTitle={selectedChapterObj?.title}
            />
          </div>
        )}

      </div>
      </>
      )}
    </div>
  );
}
