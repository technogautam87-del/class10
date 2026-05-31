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

// Firebase imports for real-time cloud multi-user sync
import { collection, doc, setDoc, deleteDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./lib/firebase";

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

  // Load state from Firestore with client-side reactive subscription listeners
  useEffect(() => {
    // Dynamically enforce browser tab title
    document.title = "कक्षा 10 लर्निंग प्लेटफ़ॉर्म";

    // 1. Set local localStorage cache for instant UI paint before Firestore handshake completes
    try {
      const storedSubjects = localStorage.getItem("c10_subjects");
      if (storedSubjects) setSubjects(JSON.parse(storedSubjects));
      else setSubjects(INITIAL_SUBJECTS);

      const storedTeam = localStorage.getItem("c10_team");
      if (storedTeam) setTeam(JSON.parse(storedTeam));
      else setTeam(INITIAL_TEAM);

      const storedFlashcards = localStorage.getItem("c10_flashcards");
      if (storedFlashcards) setFlashcards(JSON.parse(storedFlashcards));
      else setFlashcards(INITIAL_FLASHCARDS);

      const storedAdmin = localStorage.getItem("c10_admin_config");
      if (storedAdmin) setAdminConfig(JSON.parse(storedAdmin));
      else setAdminConfig(INITIAL_ADMIN);

      const storedFont = localStorage.getItem("c10_font_scale");
      if (storedFont) {
        setFontSizeScale(storedFont as any);
      }
    } catch (e) {
      console.error("Local storage load failed", e);
    }

    // 2. Setup real-time cloud subscription sync listeners with Firestore
    const unsubSubjects = onSnapshot(collection(db, "subjects"), async (snapshot) => {
      if (snapshot.empty) {
        console.log("Seeding subjects to cloud-hosted database...");
        try {
          for (const s of INITIAL_SUBJECTS) {
            await setDoc(doc(db, "subjects", s.id), s);
          }
        } catch (e) {
          console.error("Failed to seed subjects on first launch:", e);
        }
      } else {
        const list: Subject[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as Subject);
        });
        const orderMap = { "math": 0, "science": 1, "sst": 2, "hindi": 3, "english": 4, "sanskrit": 5 };
        list.sort((a, b) => (orderMap[a.id as keyof typeof orderMap] ?? 99) - (orderMap[b.id as keyof typeof orderMap] ?? 99));
        setSubjects(list);
        localStorage.setItem("c10_subjects", JSON.stringify(list));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "subjects");
    });

    const unsubTeam = onSnapshot(collection(db, "team"), async (snapshot) => {
      if (snapshot.empty) {
        console.log("Seeding team to cloud-hosted database...");
        try {
          for (const t of INITIAL_TEAM) {
            await setDoc(doc(db, "team", t.id), t);
          }
        } catch (e) {
          console.error("Failed to seed team:", e);
        }
      } else {
        const list: TeamMember[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as TeamMember);
        });
        setTeam(list);
        localStorage.setItem("c10_team", JSON.stringify(list));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "team");
    });

    const unsubFlashcards = onSnapshot(collection(db, "flashcards"), async (snapshot) => {
      if (snapshot.empty) {
        console.log("Seeding flashcards to cloud-hosted database...");
        try {
          for (const f of INITIAL_FLASHCARDS) {
            await setDoc(doc(db, "flashcards", f.id), f);
          }
        } catch (e) {
          console.error("Failed to seed flashcards:", e);
        }
      } else {
        const list: Flashcard[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as Flashcard);
        });
        setFlashcards(list);
        localStorage.setItem("c10_flashcards", JSON.stringify(list));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "flashcards");
    });

    const unsubAdmin = onSnapshot(doc(db, "settings", "admin"), async (docSnap) => {
      if (!docSnap.exists()) {
        console.log("Seeding admin accounts to cloud-hosted database...");
        try {
          await setDoc(doc(db, "settings", "admin"), INITIAL_ADMIN);
        } catch (e) {
          console.error("Failed to seed admin configuration:", e);
        }
      } else {
        const cfg = docSnap.data() as AdminConfig;
        setAdminConfig(cfg);
        localStorage.setItem("c10_admin_config", JSON.stringify(cfg));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "settings/admin");
    });

    // Clean up subscription handles on unmount
    return () => {
      unsubSubjects();
      unsubTeam();
      unsubFlashcards();
      unsubAdmin();
    };
  }, []);

  // --- SAVE HOOKS CORRESPONDING TO THE CLOUD DATABASE ---
  const handleUpdateSubjects = async (newSubjects: Subject[]) => {
    setSubjects(newSubjects);
    localStorage.setItem("c10_subjects", JSON.stringify(newSubjects));
    try {
      for (const s of newSubjects) {
        await setDoc(doc(db, "subjects", s.id), s);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, "subjects");
    }
  };

  const handleUpdateTeam = async (newTeam: TeamMember[]) => {
    setTeam(newTeam);
    localStorage.setItem("c10_team", JSON.stringify(newTeam));
    try {
      // Fetch currently saved IDs from Firestore to look for deleted members
      const currentSnap = await getDocs(collection(db, "team"));
      const currentIds = currentSnap.docs.map(doc => doc.id);
      const newIds = newTeam.map(m => m.id);

      // Delete the obsolete team documents that were removed by admin
      for (const id of currentIds) {
        if (!newIds.includes(id)) {
          await deleteDoc(doc(db, "team", id));
        }
      }

      // Overwrite/Write all team profiles to cloud storage
      for (const m of newTeam) {
        await setDoc(doc(db, "team", m.id), m);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, "team");
    }
  };

  const handleUpdateFlashcards = async (newCards: Flashcard[]) => {
    setFlashcards(newCards);
    localStorage.setItem("c10_flashcards", JSON.stringify(newCards));
    try {
      // Fetch currently saved IDs from Firestore to look for deleted flashcards
      const currentSnap = await getDocs(collection(db, "flashcards"));
      const currentIds = currentSnap.docs.map(doc => doc.id);
      const newIds = newCards.map(c => c.id);

      // Delete any obsolete cards
      for (const id of currentIds) {
        if (!newIds.includes(id)) {
          await deleteDoc(doc(db, "flashcards", id));
        }
      }

      // Save each flashcard to Firestore
      for (const c of newCards) {
        await setDoc(doc(db, "flashcards", c.id), c);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, "flashcards");
    }
  };

  const handleUpdateAdminConfig = async (newConfig: AdminConfig) => {
    setAdminConfig(newConfig);
    localStorage.setItem("c10_admin_config", JSON.stringify(newConfig));
    try {
      await setDoc(doc(db, "settings", "admin"), newConfig);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, "settings/admin");
    }
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
