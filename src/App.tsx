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

import { Subject, TeamMember, Flashcard, AdminConfig, SignLanguageSubject } from "./types";
import { 
  INITIAL_SUBJECTS, 
  INITIAL_TEAM, 
  INITIAL_FLASHCARDS, 
  INITIAL_ADMIN,
  INITIAL_SIGN_LANGUAGE
} from "./data/initialData";

import { Sparkles, ArrowLeft, BookOpen, GraduationCap, ChevronRight, Share2, Heart, MessageSquare, Search, X, FileText, Play, Sliders, Volume2, VolumeX } from "lucide-react";
import { SUBJECT_CHAPTERS } from "./data/simulationData";

// Firebase imports for real-time cloud multi-user sync
import { collection, doc, setDoc, deleteDoc, getDocs, onSnapshot, getDoc, updateDoc, increment } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./lib/firebase";
import SignLanguageContent from "./components/SignLanguageContent";
import AudiobookSection from "./components/AudiobookSection";
import StudyTimer from "./components/StudyTimer";

export default function App() {
  // --- STATE PERSISTENCE ---
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [signLanguageSubjects, setSignLanguageSubjects] = useState<SignLanguageSubject[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(INITIAL_ADMIN);

  // Layout navigation state
  const [activeTab, setActiveTab] = useState<"home" | "signLanguage" | "audiobook" | "dev" | "admin">("home");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  // Search and page counter states
  const [pageViews, setPageViews] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [targetChapterId, setTargetChapterId] = useState<string | null>(null);
  const [targetTab, setTargetTab] = useState<"video" | "notes" | "quiz" | "mindmap_sim" | null>(null);

  // Accessibility Font Scale: normal (16px), large (20px), xlarge (24px)
  const [fontSizeScale, setFontSizeScale] = useState<"normal" | "large" | "xlarge">("large");
  const [talkbackEnabled, setTalkbackEnabled] = useState<boolean>(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState<boolean>(false);

  // Load state from Firestore with client-side reactive subscription listeners
  useEffect(() => {
    // Dynamically enforce browser tab title
    document.title = "कक्षा 10 लर्निंग प्लेटफ़ॉर्म";

    // 1. Set local localStorage cache for instant UI paint before Firestore handshake completes
    try {
      const storedSubjects = localStorage.getItem("c10_subjects");
      if (storedSubjects) setSubjects(JSON.parse(storedSubjects));
      else setSubjects(INITIAL_SUBJECTS);

      const storedSignLanguage = localStorage.getItem("c10_sign_language");
      if (storedSignLanguage) setSignLanguageSubjects(JSON.parse(storedSignLanguage));
      else setSignLanguageSubjects(INITIAL_SIGN_LANGUAGE);

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

      const storedTalkback = localStorage.getItem("c10_talkback_enabled");
      if (storedTalkback) {
        setTalkbackEnabled(storedTalkback === "true");
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

    const unsubSignLanguage = onSnapshot(collection(db, "signLanguageSubjects"), async (snapshot) => {
      if (snapshot.empty) {
        console.log("Seeding sign language database...");
        try {
          for (const s of INITIAL_SIGN_LANGUAGE) {
            await setDoc(doc(db, "signLanguageSubjects", s.id), s);
          }
        } catch (e) {
          console.error("Failed to seed sign language database:", e);
        }
      } else {
        const list: SignLanguageSubject[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as SignLanguageSubject);
        });
        setSignLanguageSubjects(list);
        localStorage.setItem("c10_sign_language", JSON.stringify(list));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "signLanguageSubjects");
    });

    // Clean up subscription handles on unmount
    return () => {
      unsubSubjects();
      unsubSignLanguage();
      unsubTeam();
      unsubFlashcards();
      unsubAdmin();
    };
  }, []);

  // Talkback speech synthesizer helper function
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel(); // stop any active speech
      const utterance = new SpeechSynthesisUtterance(text);
      // Prefer Indian Hindi voice for optimal experience
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(v => v.lang.includes("hi") || v.lang.includes("HI") || v.lang.includes("en-IN"));
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
      utterance.rate = 0.95; // highly legible rate for classrooms
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis failure:", e);
    }
  };

  // Page view tracker persistence loader & Talkback controller combined
  useEffect(() => {
    // 1. PAGE VIEWS TRACKING WITH CLOUD FIRESTORE SYNC
    const trackView = async () => {
      try {
        const analyticsRef = doc(db, "settings", "analytics");
        const docSnap = await getDoc(analyticsRef).catch(() => null);

        // Start with a high base (2484) to include previous historic views
        let currentViews = 2484; 
        
        if (docSnap && docSnap.exists()) {
          const fetched = docSnap.data().pageViews;
          if (fetched && fetched > 0) {
            currentViews = fetched;
          }
        } else {
          // Initialize analytics record in DB
          await setDoc(analyticsRef, { pageViews: currentViews }).catch(e => console.error(e));
        }

        // Prevent counter flooding on fast reload triggers in React dev servers
        const sessionKey = "c10_tracked_session_active";
        const hasTrackedThisSession = sessionStorage.getItem(sessionKey);

        if (!hasTrackedThisSession) {
          const nextViews = currentViews + 1;
          await updateDoc(analyticsRef, { pageViews: increment(1) }).catch(async () => {
            // fallback merging trigger
            await setDoc(analyticsRef, { pageViews: nextViews }, { merge: true }).catch(err => console.error(err));
          });
          sessionStorage.setItem(sessionKey, "true");
          setPageViews(nextViews);
          localStorage.setItem("c10_page_views", nextViews.toString());
        } else {
          setPageViews(currentViews);
        }
      } catch (e) {
        console.error("Firestore page view tracking failure:", e);
        // Localstorage fallback count
        const storedViews = localStorage.getItem("c10_page_views");
        const currentLocal = storedViews ? parseInt(storedViews, 10) : 2484;
        const nextLocal = currentLocal + 1;
        localStorage.setItem("c10_page_views", nextLocal.toString());
        setPageViews(nextLocal);
      }
    };

    trackView();

    // Reactive subscription to display page count live across users
    const unsubViews = onSnapshot(doc(db, "settings", "analytics"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && typeof data.pageViews === "number" && data.pageViews > 0) {
          setPageViews(data.pageViews);
        }
      }
    }, (err) => {
      console.log("Analytics live subscriptions off or updating:", err);
    });

    return () => {
      unsubViews();
    };
  }, []);

  // 2. TALKBACK VOICE ENGINE OVER MOUSE-ENTER
  useEffect(() => {
    if (!talkbackEnabled) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    const handleHover = (e: MouseEvent) => {
      if (!talkbackEnabled) return;
      const target = e.target as HTMLElement;
      if (!target) return;

      // Identify interactive elements
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.tagName === "H1" || 
        target.tagName === "H2" || 
        target.tagName === "H3" || 
        target.tagName === "H4" ||
        target.tagName === "SPAN" && (target.classList.contains("clickable") || target.closest("nav") || target.closest("button")) ||
        target.closest("button") || 
        target.closest("a");

      if (isInteractive) {
        const finalTarget = target.closest("button") || target.closest("a") || target;
        const textToSpeak = finalTarget.innerText || finalTarget.getAttribute("aria-label") || finalTarget.title;
        if (textToSpeak && textToSpeak.trim().length > 0) {
          const timeoutId = setTimeout(() => {
            speak(textToSpeak.slice(0, 155));
          }, 350);
          finalTarget.onmouseleave = () => clearTimeout(timeoutId);
        }
      }
    };

    document.addEventListener("mouseover", handleHover);
    return () => {
      document.removeEventListener("mouseover", handleHover);
    };
  }, [talkbackEnabled]);

  // Speech cues on screen transition
  useEffect(() => {
    if (talkbackEnabled) {
      let speechText = "";
      if (activeTab === "home") speechText = "दिखाया जा रहा है होम पेज, मुख्य पाठ्यक्रम पृष्ठ।";
      else if (activeTab === "signLanguage") speechText = "सांकेतिक भाषा लाइब्रेरी।";
      else if (activeTab === "audiobook") speechText = "एनसीईआरटी ऑडियो बुक लाइब्रेरी।";
      else if (activeTab === "dev") speechText = "कक्षा १० लर्निंग प्लेटफ़ॉर्म डेवलपर टीम।";
      else if (activeTab === "admin") speechText = "एडमिन पैनल और सेटिंग्स।";
      speak(speechText);
    }
  }, [activeTab, talkbackEnabled]);

  // Speech cues on subject cards select
  useEffect(() => {
    if (talkbackEnabled && selectedSubjectId) {
      const activeSub = subjects.find(s => s.id === selectedSubjectId);
      if (activeSub) {
        speak(`विषय का विवरण: ${activeSub.name}। ${activeSub.englishName}। ${activeSub.description}`);
      }
    }
  }, [selectedSubjectId, talkbackEnabled, subjects]);

  // Search filter query listener effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const results: any[] = [];

    // 1. Search Subjects
    subjects.forEach((subject) => {
      if (
        subject.name.toLowerCase().includes(query) ||
        subject.englishName.toLowerCase().includes(query) ||
        subject.description.toLowerCase().includes(query)
      ) {
        results.push({
          type: "subject",
          title: subject.name,
          subtitle: `${subject.englishName} • विषय`,
          subjectId: subject.id,
          payload: subject,
        });
      }

      // 2. Search Subject Notes
      if (subject.notes) {
        subject.notes.forEach((note) => {
          if (
            note.title.toLowerCase().includes(query) ||
            (note.id && note.id.toLowerCase().includes(query))
          ) {
            results.push({
              type: "note",
              title: note.title,
              subtitle: `${subject.name} • नोट्स & पुस्तक PDF`,
              subjectId: subject.id,
              payload: note,
            });
          }
        });
      }

      // 3. Search Subject Videos
      if (subject.videos) {
        subject.videos.forEach((video) => {
          if (
            video.title.toLowerCase().includes(query) ||
            (video.description && video.description.toLowerCase().includes(query))
          ) {
            results.push({
              type: "video",
              title: video.title,
              subtitle: `${subject.name} • वीडियो लेक्चर`,
              subjectId: subject.id,
              payload: video,
            });
          }
        });
      }
    });

    // 4. Search simulation chapters
    if (SUBJECT_CHAPTERS) {
      Object.keys(SUBJECT_CHAPTERS).forEach((subjKey) => {
        const dbSubj = subjects.find(s => s.id === subjKey || (subjKey === "social" && s.id === "sst"));
        const subjName = dbSubj ? dbSubj.name : (subjKey === "math" ? "गणित" : subjKey === "science" ? "विज्ञान" : "सामाजिक विज्ञान");
        
        const chaps = SUBJECT_CHAPTERS[subjKey] || [];
        chaps.forEach((chap) => {
          if (
            chap.title.toLowerCase().includes(query) ||
            chap.topicName.toLowerCase().includes(query)
          ) {
            results.push({
              type: "chapter",
              title: chap.title,
              subtitle: `${subjName} • माइंड मैप & प्रयोग`,
              subjectId: dbSubj ? dbSubj.id : (subjKey === "social" ? "sst" : subjKey),
              payload: chap,
            });
          }
        });
      });
    }

    setSearchResults(results.slice(0, 8));
  }, [searchQuery, subjects]);

  const handleSelectSearchResult = (result: any) => {
    setActiveTab("home");
    setSelectedSubjectId(result.subjectId);

    if (result.type === "subject") {
      setTargetChapterId(null);
      setTargetTab(null);
    } else if (result.type === "chapter") {
      setTargetChapterId(result.payload.id);
      setTargetTab("mindmap_sim");
    } else if (result.type === "note") {
      setTargetChapterId(result.payload.id);
      setTargetTab("notes");
    } else if (result.type === "video") {
      setTargetChapterId("all");
      setTargetTab("video");
    }

    setSearchQuery("");

    setTimeout(() => {
      document.getElementById("active-subject-content-view")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // --- SAVE HOOKS CORRESPONDING TO THE CLOUD DATABASE ---
  const handleUpdateSignLanguage = async (newSL: SignLanguageSubject[]) => {
    setSignLanguageSubjects(newSL);
    localStorage.setItem("c10_sign_language", JSON.stringify(newSL));
    try {
      // Clean up deleted subjects
      const currentSnap = await getDocs(collection(db, "signLanguageSubjects"));
      const currentIds = currentSnap.docs.map(docSnap => docSnap.id);
      const newIds = newSL.map(s => s.id);

      for (const id of currentIds) {
        if (!newIds.includes(id)) {
          await deleteDoc(doc(db, "signLanguageSubjects", id));
        }
      }

      for (const s of newSL) {
        await setDoc(doc(db, "signLanguageSubjects", s.id), s);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, "signLanguageSubjects");
    }
  };

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
      
      {/* Top Utility Row containing Search bar on the left */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-100 relative z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
          
          {/* LEFT-ALIGNED SEARCH BAR */}
          <div className="relative w-full sm:w-80 md:w-96 flex items-center gap-1.5" id="top-search-group">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="विषय, एनईपी अध्याय, नोट्स या प्रयोग खोजें..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 px-3 pl-9 pr-8 text-xs font-semibold text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick action flag */}
            <span className="hidden md:inline-block bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase shrink-0">
              खोजें 🔍
            </span>

            {/* FLOATING SUGGESTIONS DROPDOWN OVERLAY */}
            {searchQuery.trim() && (
              <div 
                className="absolute left-0 right-0 top-full mt-2 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 z-50"
                style={{ maxHeight: "350px", overflowY: "auto" }}
                id="search-results-dropdown-list"
              >
                <div className="bg-slate-50 px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between select-none border-b">
                  <span>खोज परिणाम ({searchResults.length}):</span>
                  <span className="text-indigo-600">एनईपी 2026</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-5 text-center text-xs font-semibold text-slate-500 select-none">
                    कोई परिणाम नहीं मिला! कृपया सही शब्द लिखें।
                  </div>
                ) : (
                  searchResults.map((res, index) => {
                    const getIconComponent = () => {
                      switch (res.type) {
                        case "subject":
                          return <BookOpen className="w-4 h-4 text-indigo-650 shrink-0" />;
                        case "chapter":
                          return <Sparkles className="w-4 h-4 text-amber-500 shrink-0 text-amber-500" />;
                        case "note":
                          return <FileText className="w-4 h-4 text-emerald-650 shrink-0" />;
                        case "video":
                          return <Play className="w-4 h-4 text-rose-500 shrink-0" />;
                        default:
                          return <Search className="w-4 h-4 text-slate-500 shrink-0" />;
                      }
                    };

                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectSearchResult(res)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-start gap-3 transition-colors group cursor-pointer"
                      >
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-amber-100 group-hover:scale-105 duration-200 transition-all shrink-0">
                          {getIconComponent()}
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors">
                            {res.title}
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 mt-0.5 uppercase tracking-wide">
                            {res.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* RIGHT-ALIGNED INFO CLOCK & SLOGAN */}
          <div className="flex flex-wrap items-center justify-end gap-3 md:gap-5 text-[10px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 bg-slate-800 font-bold px-2.5 py-1.5 rounded-lg border border-slate-700/60 shadow-inner">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>कक्षा 10वीं बोर्ड पाठ्यक्रम</span>
            </span>
            <span className="text-yellow-400 font-extrabold flex items-center gap-1 select-none animate-pulse">
              ⚡ डिजिटल शिक्षा क्रांति
            </span>
          </div>

        </div>
      </div>

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
                  key={activeSubject.id + (targetChapterId || "") + (targetTab || "")} // Re-mounts correctly with search context
                  subject={activeSubject}
                  fontSizeClass={getFontSizeClass()}
                  initialChapterId={targetChapterId}
                  initialTab={targetTab}
                  onClearedInitialParams={() => {
                    setTargetChapterId(null);
                    setTargetTab(null);
                  }}
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

        {/* SIGN LANGUAGE DIGITAL LIBRARY TAB */}
        {activeTab === "signLanguage" && (
          <div className="animate-fade-in" id="sign-language-library-wrapper">
            <SignLanguageContent
              subjects={signLanguageSubjects}
              fontSizeClass={getFontSizeClass()}
            />
          </div>
        )}

        {/* AUDIOBOOK DIGITAL PORTAL SECTION */}
        {activeTab === "audiobook" && (
          <div className="animate-fade-in" id="audiobook-portal-wrapper">
            <AudiobookSection />
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
              signLanguageSubjects={signLanguageSubjects}
              updateSignLanguage={handleUpdateSignLanguage}
            />
          </div>
        )}

      </main>

      {/* Decorative footer credits */}
      <footer className="mt-12 text-center text-slate-400 text-xs py-6 border-t border-slate-200 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 gap-4 select-none">
        <p className="font-bold text-slate-500">
          © {new Date().getFullYear()} कक्षा 10 लर्निंग प्लेटफ़ॉर्म • सर्वाधिकार सुरक्षित।
        </p>

        {/* PAGE VIEW COUNT ACCUMULATOR */}
        <div className="flex items-center gap-2 font-bold text-slate-500 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 border-dashed shadow-sm text-xs hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-250 cursor-pointer" id="footer-page-counter" title="कुल विज़िट संचय">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>कुल अवलोकन (Page Views): <b className="text-indigo-600 font-extrabold font-mono text-xs">{pageViews}</b> बार</span>
        </div>

        {/* Colorful and Attractive Developed By Credit transformed into Premium Multi-Hue Badge */}
        <div 
          className="flex items-center gap-2 font-black text-[11px] sm:text-xs bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white px-4 py-2 rounded-2xl shadow-xl border border-white/20 transform hover:scale-105 transition-all duration-300 cursor-pointer text-center select-none"
          title="Designed and programmed with love for Class 10 NEP Scholars"
          id="colorful-developer-badge"
        >
          <span>Developed by <b className="font-black text-yellow-300 tracking-wide underline decoration-yellow-400 decoration-2">CS Gautam and Kushagra Gaur</b></span>
          <Heart className="w-4 h-4 text-white fill-white animate-bounce shrink-0" />
        </div>
      </footer>

      {/* Dynamic Floating Accessibility Center / Talkback Voice Guide Overlay */}
      <div className="fixed right-4 bottom-28 z-50">
        <button
          onClick={() => {
            setShowAccessibilityMenu(!showAccessibilityMenu);
            if (talkbackEnabled) {
              speak(showAccessibilityMenu ? "एक्सेसिबिलिटी मेनू बंद किया गया।" : "एक्सेसिबिलिटी सहायता विकल्प खोले गए।");
            }
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-indigo-600 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white font-extrabold px-3.5 py-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 duration-200 transition-all cursor-pointer border-2 border-white/30 animate-pulse"
          title="एक्सेसिबिलिटी सहायता (Accessibility Help Control)"
          id="accessibility-floating-btn"
        >
          <Sliders className="w-4 h-4 text-yellow-300 transform rotate-90" />
          <span className="text-xs font-black tracking-wide hidden md:inline">♿ एक्सेसिबिलिटी टॉकबैक</span>
        </button>

        {showAccessibilityMenu && (
          <div 
            className="absolute right-0 bottom-14 w-80 bg-white rounded-2xl shadow-3xl border border-slate-200 overflow-hidden text-slate-800 animate-slide-up z-50 mr-1"
            id="accessibility-options-container"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-rose-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-sm">
                  <span>♿ एक्सेसिबिलिटी सपोर्ट सेंटर</span>
                </div>
                <button 
                  onClick={() => setShowAccessibilityMenu(false)}
                  className="text-white bg-white/10 hover:bg-white/20 p-1 rounded-lg text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-indigo-100 font-bold mt-1">
                विशेष रूप से सक्षम (दिव्यांग) छात्रों हेतु विशेष सुविधाएं
              </p>
            </div>

            {/* Options Body */}
            <div className="p-4 space-y-4">
              
              {/* Option 1: Font Size Scaling */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wide block">
                  🔎 अक्षरों का आकार (Font Size)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["normal", "large", "xlarge"] as const).map((scale) => {
                    const label = scale === "normal" ? "सामान्य" : scale === "large" ? "बड़ा" : "अति बड़ा";
                    const isSelected = fontSizeScale === scale;
                    return (
                      <button
                        key={scale}
                        onClick={() => {
                          handleSetFontSizeScale(scale);
                          if (talkbackEnabled) {
                            speak(`अक्षरों का आकार ${label} पर सेट किया गया।`);
                          }
                        }}
                        className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-tight border duration-150 transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-indigo-600 text-white border-transparent shadow-md font-bold scale-102"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 2: Talkback Voice Guide Toggle */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-black text-slate-800 tracking-wide flex items-center gap-1.5">
                      {talkbackEnabled ? (
                        <Volume2 className="w-4 h-4 text-emerald-600 animate-bounce cursor-pointer" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-slate-400" />
                      )}
                      <span>टॉकबैक वॉइस गाइड (TTS)</span>
                    </label>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                      कर्सर ले जाने पर विषयवस्तु बोलकर सुनाई जाएगी
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const nextState = !talkbackEnabled;
                      setTalkbackEnabled(nextState);
                      localStorage.setItem("c10_talkback_enabled", nextState ? "true" : "false");
                      
                      // Immediate voice response
                      setTimeout(() => {
                        if (nextState) {
                          speak("टॉकबैक वॉइस गाइड ऑन किया गया है। अब विवरण पढ़ने के लिए किसी भी बटन या शीर्षक पर कर्सर लाएँ।");
                        } else {
                          speak("टॉकबैक बंद किया गया है।");
                        }
                      }, 100);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-350 cursor-pointer ${
                      talkbackEnabled 
                        ? "bg-emerald-600 text-white shadow-md animate-pulse font-bold" 
                        : "bg-slate-200 text-slate-650 hover:bg-slate-300"
                    }`}
                  >
                    {talkbackEnabled ? "चालू" : "बंद"}
                  </button>
                </div>
              </div>

              {/* Option 3: Screen Reading Utility Trigger */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    let pageDesc = "";
                    if (activeTab === "home") {
                      pageDesc = `होम स्क्रीन। यहाँ कक्षा १० के ६ मुख्य विषय उपलब्ध हैं। ${selectedSubjectId ? `अभी आपने ${subjects.find(s=>s.id === selectedSubjectId)?.name} विषय का चयन किया हुआ है जिसमें विभिन्न वीडियो, नोट्स और प्रयोग उपलब्ध हैं।` : "कृपया अपनी पसंद के किसी विषय बटन पर क्लिक करके अध्ययन आरंभ करें।"}`;
                    } else if (activeTab === "signLanguage") {
                      pageDesc = "सांकेतिक भाषा लाइब्रेरी। यहाँ मुख्य अध्यायों के विशेष व्याख्यान विडियो रूप में उपलब्ध हैं।";
                    } else if (activeTab === "audiobook") {
                      pageDesc = "ऑडियो बुक पोर्टल। यहाँ से आप एनसीईआरटी ऑडियो बुक्स के विभिन्न अध्यायों की ऑडियो सुन सकते हैं।";
                    } else if (activeTab === "dev") {
                      pageDesc = "डेवलपर विवरण। इस पोर्टल को सी एस गौतम और कुशाग्र गौर जी ने मिलकर विकसित किया है।";
                    } else {
                      pageDesc = "एडमिन कंट्रोल पैनल सेटिंग्स पृष्ठ खुला हुआ है।";
                    }
                    speak(pageDesc);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 text-slate-900 font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition duration-200"
                >
                  <Sparkles className="w-4 h-4 text-slate-900 animate-spin-slow" />
                  <span>🔊 पूरा स्क्रीन बोलकर सुनाएं</span>
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Persistent floating Study Timer & Pomodoro Buddy */}
      <StudyTimer />

    </div>
  );
}
