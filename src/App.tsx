/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SubjectBlockMarquee from "./components/SubjectBlockMarquee";
import SubjectContent from "./components/SubjectContent";
import DeveloperTeam from "./components/DeveloperTeam";
import AdminPanel from "./components/AdminPanel";

import { Subject, TeamMember, Flashcard, AdminConfig } from "./types";
import { 
  INITIAL_SUBJECTS, 
  INITIAL_TEAM, 
  INITIAL_FLASHCARDS, 
  INITIAL_ADMIN 
} from "./data/initialData";

import { Sparkles, ArrowLeft, BookOpen, GraduationCap, ChevronRight, Share2, Heart } from "lucide-react";

export default function App() {
  // --- STATE PERSISTENCE ---
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(INITIAL_ADMIN);

  // Layout navigation state
  const [activeTab, setActiveTab] = useState<"home" | "dev" | "admin">("home");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  // Accessibility Font Scale: normal (16px), large (20px), xlarge (24px)
  const [fontSizeScale, setFontSizeScale] = useState<"normal" | "large" | "xlarge">("large");

  // Load state from LocalStorage on mount
  useEffect(() => {
    try {
      const storedSubjects = localStorage.getItem("c10_subjects");
      if (storedSubjects) {
        setSubjects(JSON.parse(storedSubjects));
      } else {
        setSubjects(INITIAL_SUBJECTS);
      }

      const storedTeam = localStorage.getItem("c10_team");
      if (storedTeam) {
        setTeam(JSON.parse(storedTeam));
      } else {
        setTeam(INITIAL_TEAM);
      }

      const storedFlashcards = localStorage.getItem("c10_flashcards");
      if (storedFlashcards) {
        setFlashcards(JSON.parse(storedFlashcards));
      } else {
        setFlashcards(INITIAL_FLASHCARDS);
      }

      const storedAdmin = localStorage.getItem("c10_admin_config");
      if (storedAdmin) {
        setAdminConfig(JSON.parse(storedAdmin));
      } else {
        setAdminConfig(INITIAL_ADMIN);
      }

      const storedFont = localStorage.getItem("c10_font_scale");
      if (storedFont) {
        setFontSizeScale(storedFont as any);
      }
    } catch (e) {
      console.error("Local storage load failed, using fallback initial mock datasets", e);
      setSubjects(INITIAL_SUBJECTS);
      setTeam(INITIAL_TEAM);
      setFlashcards(INITIAL_FLASHCARDS);
      setAdminConfig(INITIAL_ADMIN);
    }
  }, []);

  // --- SAVE HOOKS ---
  const handleUpdateSubjects = (newSubjects: Subject[]) => {
    setSubjects(newSubjects);
    localStorage.setItem("c10_subjects", JSON.stringify(newSubjects));
  };

  const handleUpdateTeam = (newTeam: TeamMember[]) => {
    setTeam(newTeam);
    localStorage.setItem("c10_team", JSON.stringify(newTeam));
  };

  const handleUpdateFlashcards = (newCards: Flashcard[]) => {
    setFlashcards(newCards);
    localStorage.setItem("c10_flashcards", JSON.stringify(newCards));
  };

  const handleUpdateAdminConfig = (newConfig: AdminConfig) => {
    setAdminConfig(newConfig);
    localStorage.setItem("c10_admin_config", JSON.stringify(newConfig));
  };

  const handleSetFontSizeScale = (scale: "normal" | "large" | "xlarge") => {
    setFontSizeScale(scale);
    localStorage.setItem("c10_font_scale", scale);
  };

  // Convert scale type to dynamic Tailwind typography tags with responsive mobile scaling
  const getFontSizeClass = (): string => {
    switch (fontSizeScale) {
      case "normal":
        return "text-sm md:text-base lg:text-lg leading-relaxed";
      case "large":
        return "text-base md:text-lg lg:text-xl leading-relaxed";
      case "xlarge":
        // Base size 24px (text-2xl is 24px) on desktop, dynamically scales down gracefully on mobile for perfect readability!
        return "text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-loose font-extrabold";
      default:
        return "text-base leading-relaxed";
    }
  };

  const handleSelectSubject = (id: string) => {
    setSelectedSubjectId(id);
    setActiveTab("home");
    // Scroll smoothly to active subject card container
    setTimeout(() => {
      document.getElementById("active-subject-content-view")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const activeSubject = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-12">
      
      {/* Dynamic Header Component */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // If we navigate to another section, we can keep selectedSubjectId or clear it based on preference.
        }}
        isAdminLocked={adminConfig.isLocked}
        fontSizeScale={fontSizeScale}
        setFontSizeScale={handleSetFontSizeScale}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6" id="applet-primary-layout">
        
        {/* HOMEPAGE VIEW */}
        {activeTab === "home" && (
          <div className="space-y-6" id="homepage-dashboard-wrapper">
            
            {/* Infinite scrolling block & subject static summaries */}
            {subjects.length > 0 && (
              <SubjectBlockMarquee
                subjects={subjects}
                onSelectSubject={handleSelectSubject}
                selectedSubjectId={selectedSubjectId}
                fontSizeClass={getFontSizeClass()}
              />
            )}

            {/* TABBED SUBJECT DETAILS WINDOW (Conditional) */}
            {activeSubject ? (
              <div id="subject-details-root" className="animate-fade-in">
                <div className="flex items-center justify-between mt-8 mb-4">
                  <button
                    onClick={() => setSelectedSubjectId(null)}
                    className="bg-white hover:bg-slate-50 text-indigo-700 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 group transition"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>सभी विषयों पर वापस जाएँ</span>
                  </button>

                  <span className="text-xs font-black text-slate-500 hidden sm:inline">
                    सक्रिय विषय: <b className="text-indigo-600 font-extrabold">{activeSubject.name}</b>
                  </span>
                </div>

                <SubjectContent
                  key={activeSubject.id} // Re-mounts correctly on change
                  subject={activeSubject}
                  fontSizeClass={getFontSizeClass()}
                />
              </div>
            ) : (
              /* If no subject is active, show the welcome card */
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 rounded-3xl mt-8 shadow-xl text-center border-b-8 border-indigo-700 relative overflow-hidden" id="homepage-default-welcome">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <GraduationCap className="w-16 h-16 text-yellow-300 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl sm:text-3xl font-black text-yellow-300">अपनी पसंदीदा विषय ब्लॉक का चयन करें!</h3>
                <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
                  ऊपर की ओर स्वतः बह रहे विषय ब्लॉक्स या हमारे समग्र डैशबोर्ड में से किसी एक विषय पर क्लिक करें। उसके पश्चात आपको विस्तृत **वीडियो लेक्चर्स**, **डाउनलोड करने योग्य PDF सिलेबस** और **रैंडम शफल्ड परीक्षा क्विज़** का लाभ मिलेगा।
                </p>
              </div>
            )}

          </div>
        )}

        {/* DEVELOPER TEAM TAB */}
        {activeTab === "dev" && (
          <div className="animate-fade-in" id="developer-team-wrapper">
            <DeveloperTeam
              team={team}
              updateTeam={handleUpdateTeam}
              flashcards={flashcards}
              updateFlashcards={handleUpdateFlashcards}
              fontSizeClass={getFontSizeClass()}
            />
          </div>
        )}

        {/* ADMIN PANEL REGISTER */}
        {activeTab === "admin" && (
          <div className="animate-fade-in" id="admin-panel-wrapper">
            <AdminPanel
              subjects={subjects}
              updateSubjects={handleUpdateSubjects}
              adminConfig={adminConfig}
              updateAdminConfig={handleUpdateAdminConfig}
              fontSizeClass={getFontSizeClass()}
              team={team}
              updateTeam={handleUpdateTeam}
            />
          </div>
        )}

      </main>

      {/* Decorative footer credits */}
      <footer className="mt-12 text-center text-slate-400 text-xs py-6 border-t border-slate-200 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 gap-4 select-none">
        <p className="font-bold">
          © {new Date().getFullYear()} कक्षा 10 लर्निंग प्लेटफ़ॉर्म • सर्वाधिकार सुरक्षित।
        </p>
        <p className="flex items-center gap-1 font-semibold text-slate-400">
          बोर्ड परीक्षा में बेहतर अंकों के लिए विशेष रूप से डिज़ाइन किया गया <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
        </p>
      </footer>

    </div>
  );
}
