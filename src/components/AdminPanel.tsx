import React, { useState } from "react";
import { Subject, Video, Note, QuizQuestion, AdminConfig, TeamMember } from "../types";
import { 
  Lock, 
  Unlock, 
  Settings, 
  Save, 
  Edit, 
  Trash2, 
  Plus, 
  Key, 
  Check, 
  X, 
  FileText, 
  Video as VideoIcon, 
  Calculator, 
  HelpCircle,
  LogOut,
  UserPlus
} from "lucide-react";
import { renderSubjectIcon } from "./SubjectBlockMarquee";

// Preset modern SVG avatars for quick selection when changing images in Admin Panel
const PRESET_AVATARS = [
  { name: "इंडीगो स्टार", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%236366F1'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><polygon points='50,15 53,23 62,23 55,28 58,36 50,31 42,36 45,28 38,23 47,23' fill='%23FBBF24'/></svg>" },
  { name: "एमेरल्ड कोडर", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%2310B981'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='42' y='40' font-family='monospace' font-size='12' font-weight='black' fill='%2310B981'>&lt;&gt;</text></svg>" },
  { name: "ऐम्बर जीनियस", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23F59E0B'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='45' y='38' font-size='12' fill='%23F59E0B'>💡</text></svg>" },
  { name: "रोज़ गुरु", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23F43F5E'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='44' y='38' font-size='12' fill='%23F43F5E'>🎓</text></svg>" },
  { name: "वायलेट एक्सपर्ट", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%238B5CF6'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='45' y='38' font-size='12' fill='%238B5CF6'>🔬</text></svg>" },
  { name: "सायान विज़ार्ड", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%2306B6D4'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='44' y='38' font-size='11' fill='%2306B6D4'>🚀</text></svg>" }
];

interface AdminPanelProps {
  subjects: Subject[];
  updateSubjects: (newSubjects: Subject[]) => void;
  adminConfig: AdminConfig;
  updateAdminConfig: (newConfig: AdminConfig) => void;
  fontSizeClass: string;
  team: TeamMember[];
  updateTeam: (newTeam: TeamMember[]) => void;
}

export default function AdminPanel({
  subjects,
  updateSubjects,
  adminConfig,
  updateAdminConfig,
  fontSizeClass,
  team,
  updateTeam,
}: AdminPanelProps) {
  // Authentication Form States
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // New Credentials Form States
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [credMessage, setCredMessage] = useState<string>("");

  // Active Subject Selection inside Admin Panel
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("math");
  
  // Tab within Editor
  const [editTab, setEditTab] = useState<"videos" | "notes" | "quiz">("videos");

  // Selection states for editing sub-nodes
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoDuration, setVideoDuration] = useState<string>("");
  const [videoDesc, setVideoDesc] = useState<string>("");

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [notePdfUrl, setNotePdfUrl] = useState<string>("");
  const [noteTopic, setNoteTopic] = useState<string>("");

  const [editingQuizQId, setEditingQuizQId] = useState<string | null>(null);
  const [quizQuestionText, setQuizQuestionText] = useState<string>("");
  const [quizOptions, setQuizOptions] = useState<string[]>(["", "", "", ""]);
  const [quizCorrectIdx, setQuizCorrectIdx] = useState<number>(0);
  const [quizExplainText, setQuizExplainText] = useState<string>("");

  // States for Developer Team Editing
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberName, setMemberName] = useState<string>("");
  const [memberRole, setMemberRole] = useState<string>("");
  const [memberPhotoUrl, setMemberPhotoUrl] = useState<string>("");
  const [memberBio, setMemberBio] = useState<string>("");
  const [memberEmail, setMemberEmail] = useState<string>("");

  // -------------------------
  // DEVELOPER TEAM ACTIONS
  // -------------------------
  const startEditMember = (member: TeamMember) => {
    setEditingMemberId(member.id);
    setMemberName(member.name);
    setMemberRole(member.role);
    setMemberPhotoUrl(member.photoUrl);
    setMemberBio(member.bio);
    setMemberEmail(member.email || "");
  };

  const saveEditedMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberRole.trim()) return;

    const updatedTeam = team.map((member) => {
      if (member.id === editingMemberId) {
        return {
          ...member,
          name: memberName.trim(),
          role: memberRole.trim(),
          photoUrl: memberPhotoUrl.trim(),
          bio: memberBio.trim(),
          email: memberEmail.trim() || undefined
        };
      }
      return member;
    });

    updateTeam(updatedTeam);
    setEditingMemberId(null);
  };

  const deleteMember = (id: string) => {
    const updatedTeam = team.filter((member) => member.id !== id);
    updateTeam(updatedTeam);
  };

  const addNewMemberPlaceholder = () => {
    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: "नया टीम सदस्य",
      role: "शिक्षक / विकासकर्ता",
      photoUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%236366F1'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/></svg>",
      bio: "विषय संबंधी मार्गदर्शन और शैक्षणिक सहायता प्रदान करने वाले उत्कृष्ट शिक्षक का परिचय दर्ज करें।",
      email: "educator@example.com"
    };

    updateTeam([...team, newMember]);
    startEditMember(newMember);
  };

  // Handler for Admin Login auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      inputUsername === adminConfig.username && 
      inputPassword === adminConfig.passwordHash
    ) {
      updateAdminConfig({ ...adminConfig, isLocked: false });
      setAuthError("");
      setInputUsername("");
      setInputPassword("");
    } else {
      setAuthError("❌ अमान्य एडमिन आईडी या पासवर्ड! कृपया पुनः प्रयास करें।");
    }
  };

  // Handler for Locking the Panel
  const handleLock = () => {
    updateAdminConfig({ ...adminConfig, isLocked: true });
    setCredMessage("");
  };

  // Handler to Create New Admin ID & Password
  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      setCredMessage("❌ कृपया दोनों क्षेत्रों को सही से भरें।");
      return;
    }

    updateAdminConfig({
      username: newUsername.trim(),
      passwordHash: newPassword.trim(),
      isLocked: false // Keep unlocked during credentials replacement
    });
    setCredMessage("✅ नया आईडी और पासवर्ड सफलतापूर्वक सक्रिय हो गया है!");
    setNewUsername("");
    setNewPassword("");
    setTimeout(() => setCredMessage(""), 4000);
  };

  // Find currently active editing subject
  const currentSubjectIndex = subjects.findIndex(s => s.id === selectedSubjectId);
  const curSubject = subjects[currentSubjectIndex] || subjects[0];

  // -------------------------
  // VIDEO EDIT ACTIONS
  // -------------------------
  const startEditVideo = (vid: Video) => {
    setEditingVideoId(vid.id);
    setVideoTitle(vid.title);
    setVideoUrl(vid.url);
    setVideoDuration(vid.duration || "");
    setVideoDesc(vid.description || "");
  };

  const saveEditedVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoUrl.trim()) return;

    const updatedVideos = curSubject.videos.map((vid) => {
      if (vid.id === editingVideoId) {
        return {
          ...vid,
          title: videoTitle.trim(),
          url: videoUrl.trim(),
          duration: videoDuration.trim(),
          description: videoDesc.trim()
        };
      }
      return vid;
    });

    const updatedSubjects = [...subjects];
    updatedSubjects[currentSubjectIndex] = {
      ...curSubject,
      videos: updatedVideos
    };

    updateSubjects(updatedSubjects);
    setEditingVideoId(null);
  };

  const deleteVideo = (id: string) => {
    const updatedVideos = curSubject.videos.filter(v => v.id !== id);
    const updatedSubjects = [...subjects];
    updatedSubjects[currentSubjectIndex] = {
      ...curSubject,
      videos: updatedVideos
    };
    updateSubjects(updatedSubjects);
  };

  const addNewVideoPlaceholder = () => {
    const newVid: Video = {
      id: `vid-${Date.now()}`,
      title: "नया वीडियो व्याख्यान संपादन",
      url: "https://www.youtube.com/embed/S20C3uC9M00",
      duration: "15:00",
      description: "कक्षा 10 विषय पर आधारित महत्वपूर्ण अध्याय वीडियो।"
    };

    const updatedSubjects = [...subjects];
    updatedSubjects[currentSubjectIndex] = {
      ...curSubject,
      videos: [...curSubject.videos, newVid]
    };
    updateSubjects(updatedSubjects);
    startEditVideo(newVid);
  };

  // -------------------------
  // NOTES (PDF) EDIT ACTIONS
  // -------------------------
  const startEditNote = (note: Note) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNotePdfUrl(note.pdfUrl);
    setNoteTopic(note.topic || "");
  };

  const saveEditedNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !notePdfUrl.trim()) return;

    const updatedNotes = curSubject.notes.map((note) => {
      if (note.id === editingNoteId) {
        return {
          ...note,
          title: noteTitle.trim(),
          pdfUrl: notePdfUrl.trim(),
          topic: noteTopic.trim()
        };
      }
      return note;
    });

    const updatedSubjects = [...subjects];
    updatedSubjects[currentSubjectIndex] = {
      ...curSubject,
      notes: updatedNotes
    };

    updateSubjects(updatedSubjects);
    setEditingNoteId(null);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = curSubject.notes.filter(n => n.id !== id);
    const updatedSubjects = [...subjects];
    updatedSubjects[currentSubjectIndex] = {
      ...curSubject,
      notes: updatedNotes
    };
    updateSubjects(updatedSubjects);
  };

  const addNewNotePlaceholder = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "हस्तलिखित नोट्स PDF",
      pdfUrl: "https://ncert.nic.in/pdf/publication/exemplarproblems/classX/mathematics/keep101.pdf",
      topic: "नया अध्याय सूत्र"
    };

    const updatedSubjects = [...subjects];
    updatedSubjects[currentSubjectIndex] = {
      ...curSubject,
      notes: [...curSubject.notes, newNote]
    };
    updateSubjects(updatedSubjects);
    startEditNote(newNote);
  };

  // -------------------------
  // QUIZ (POOL) EDIT ACTIONS
  // -------------------------
  const startEditQuizQ = (q: QuizQuestion) => {
    setEditingQuizQId(q.id);
    setQuizQuestionText(q.question);
    setQuizOptions([...q.options]);
    setQuizCorrectIdx(q.correctAnswerIndex);
    setQuizExplainText(q.explanation || "");
  };

  const saveEditedQuizQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizQuestionText.trim() || quizOptions.some(o => !o.trim())) return;

    const updatedQuiz = curSubject.quiz.map((q) => {
      if (q.id === editingQuizQId) {
        return {
          ...q,
          question: quizQuestionText.trim(),
          options: quizOptions.map(o => o.trim()),
          correctAnswerIndex: quizCorrectIdx,
          explanation: quizExplainText.trim()
        };
      }
      return q;
    });

    const updatedSubjects = [...subjects];
    updatedSubjects[currentSubjectIndex] = {
      ...curSubject,
      quiz: updatedQuiz
    };

    updateSubjects(updatedSubjects);
    setEditingQuizQId(null);
  };

  const deleteQuizQ = (id: string) => {
    const updatedQuiz = curSubject.quiz.filter(q => q.id !== id);
    const updatedSubjects = [...subjects];
    updatedSubjects[currentSubjectIndex] = {
      ...curSubject,
      quiz: updatedQuiz
    };
    updateSubjects(updatedSubjects);
  };

  const addNewQuizQPlaceholder = () => {
    const newQ: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: "कक्षा 10 परीक्षा अभ्यास प्रश्न: प्रश्न का विवरण दर्ज करें?",
      options: ["विकल्प 1", "विकल्प 2", "विकल्प 3", "विकल्प 4"],
      correctAnswerIndex: 0,
      explanation: "इस गणितीय व्याख्या समीकरण का हल यहाँ दर्शित करें।"
    };

    const updatedSubjects = [...subjects];
    updatedSubjects[currentSubjectIndex] = {
      ...curSubject,
      quiz: [newQ, ...curSubject.quiz] // Insert at top
    };
    updateSubjects(updatedSubjects);
    startEditQuizQ(newQ);
  };

  const handleOptionChange = (idx: number, text: string) => {
    const updated = [...quizOptions];
    updated[idx] = text;
    setQuizOptions(updated);
  };

  // If Admin Panel is Locked, Render Security Lock Screen
  if (adminConfig.isLocked) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200" id="admin-lock-screen">
        <div className="bg-gradient-to-br from-red-600 to-rose-700 p-6 text-white text-center">
          <div className="inline-block p-4 bg-white/10 rounded-full mb-3 animate-pulse">
            <Lock className="w-12 h-12 text-yellow-300" />
          </div>
          <h2 className="text-2xl font-black">एडमिन सुरक्षा लॉक</h2>
          <p className="text-xs text-rose-100 font-bold mt-1">
            डेटा संपादन को सुरक्षित करने के लिए आईडी और पासवर्ड आवश्यक है
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4" id="login-auth-form">
          {authError && (
            <div className="text-xs bg-rose-50 text-rose-600 p-3 rounded-lg border border-rose-200 font-bold">
              {authError}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">एडमिन आईडी (Username):</label>
            <input
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="उदा. admin10"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">पासवर्ड (Password):</label>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 rounded-xl transition shadow-lg inline-flex items-center justify-center gap-1.5"
          >
            <Unlock className="w-4 h-4" />
            <span>अनलॉक करें</span>
          </button>

          {/* Prompting default credentials for ease */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-[11px] text-slate-500 leading-relaxed font-semibold">
            🗝️ <strong>परीक्षक संदर्भ (Default Demo Credentials):</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-indigo-700">
              <li>युज़र आईडी: <code className="bg-slate-200 px-1 rounded">admin10</code></li>
              <li>पासवर्ड: <code className="bg-slate-200 px-1 rounded">boardexam2026</code></li>
            </ul>
          </div>
        </form>
      </div>
    );
  }

  // ELSE RENDER ACTIVE DYNAMIC ADMIN OFFICE DATASHEET WORKSPACE
  return (
    <div className="my-6 space-y-6" id="admin-workspace-master">
      
      {/* Top Banner Control Board */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border-t-4 border-emerald-500 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full uppercase font-black flex items-center gap-1 w-max">
            <Unlock className="w-3.5 h-3.5 animate-pulse" /> सम्पादन मोड सक्रिय अलोक है
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1.5 flex items-center gap-2">
            कक्षा 10 पाठ्य सामग्री नियंत्रण बोर्ड
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            यहाँ आप सभी ६ विषयों के वीडियो लेक्चर, पीडीएफ़ नोट्स और 50 प्रश्नों का परीक्षा पूल सीधे एडिट कर सकते हैं।
          </p>
        </div>

        <button
          onClick={handleLock}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-black px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-1.5 shrink-0"
        >
          <Lock className="w-4 h-4" />
          <span>सुरक्षा लॉक लगाएं (Lock Data)</span>
        </button>
      </div>

      {/* CREDENTIALS MANAGER FOR NEW ID / PASSWORD */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-4">
          <h3 className="text-lg font-black text-indigo-950 flex items-center gap-1.5">
            <Key className="w-5 h-5 text-indigo-600" />
            नया एडमिन बनाएं
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
            सुरक्षा मजबूत करने के लिए वर्तमान क्रेडेंशियल्स की जगह नई युज़र आईडी और पासवर्ड सेट करें:
          </p>
        </div>

        <form onSubmit={handleUpdateCredentials} className="md:col-span-8 flex flex-wrap gap-3 items-end" id="new-credentials-form">
          <div className="flex-1 min-w-[160px]">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">नया एडमिन आईडी:</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
              placeholder="नया युज़र"
              required
            />
          </div>

          <div className="flex-1 min-w-[160px]">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">नया एडमिन पासवर्ड:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
              placeholder="नया पासवर्ड"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-5 py-2.5 rounded-xl transition inline-flex items-center gap-1 h-9"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>सहेजें</span>
          </button>
        </form>

        {credMessage && (
          <div className="col-span-12 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg">
            {credMessage}
          </div>
        )}
      </div>

      {/* CORE DATA MANAGER: SUBJECT SELECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Select Subject for editing */}
        <div className="lg:col-span-3 bg-white border border-slate-200 p-5 rounded-3xl shadow-lg space-y-2">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pb-2 border-b block mb-2">
            संपादकीय विषय चुनें
          </h4>
          {subjects.map((s) => {
            const isSelected = s.id === selectedSubjectId;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSubjectId(s.id);
                  setEditingVideoId(null);
                  setEditingNoteId(null);
                  setEditingQuizQId(null);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left font-black text-sm transition ${
                  isSelected 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  {renderSubjectIcon(s.icon, "w-4 h-4")}
                  <span>{s.name}</span>
                </div>
                <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded">
                  {s.quiz.length}Q
                </span>
              </button>
            );
          })}

          <div className="border-t border-slate-100 pt-3 mt-3">
            <button
              onClick={() => {
                setSelectedSubjectId("dev-team");
                setEditingVideoId(null);
                setEditingNoteId(null);
                setEditingQuizQId(null);
                setEditingMemberId(null);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-left font-black text-sm transition ${
                selectedSubjectId === "dev-team"
                  ? "bg-pink-600 text-white shadow-md shadow-pink-100"
                  : "bg-pink-50 hover:bg-pink-100 text-pink-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                <span>डेवलपर टीम संपादन</span>
              </div>
              <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded">
                {team.length} सदस्य
              </span>
            </button>
          </div>
        </div>

        {/* Right Side: Tabbed Node Editor */}
        {selectedSubjectId === "dev-team" ? (
          <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6 animate-fade-in" id="dev-team-workspace-pane">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-pink-500 block">सक्रिय नियंत्रण विभाग:</span>
                <h3 className="text-xl font-black text-slate-900">
                  डिजिटल डेवलपर और शिक्षक टीम प्रबंधन
                </h3>
              </div>
              <button
                onClick={addNewMemberPlaceholder}
                className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition flex items-center gap-1 shadow-md animate-pulse"
              >
                <Plus className="w-4 h-4" />
                <span>नया शिक्षक / कोड सदस्य जोड़ें</span>
              </button>
            </div>

            {/* DYNAMIC TEAM MEMBER EDITING FORM */}
            {editingMemberId && (
              <form onSubmit={saveEditedMember} className="bg-pink-50/45 outline outline-2 outline-pink-200 p-5 rounded-2xl space-y-4 animate-fade-in" id="dev-member-edit-form">
                <div className="flex items-center justify-between border-b pb-2">
                  <h5 className="font-extrabold text-pink-900 flex items-center gap-1.5 text-xs sm:text-sm">
                    <UserPlus className="w-4 h-4 text-pink-600" />
                    टीम सदस्य का विवरण संपादित करें
                  </h5>
                  <button type="button" onClick={() => setEditingMemberId(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">नाम (Name):</label>
                    <input
                      type="text"
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">भूमिका (Role):</label>
                    <input
                      type="text"
                      value={memberRole}
                      onChange={(e) => setMemberRole(e.target.value)}
                      placeholder="उदा. भौतिकी विशेषज्ञ, मुख्य विकासकर्ता"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">ईमेल (Email):</label>
                    <input
                      type="email"
                      value={memberEmail}
                      onChange={(e) => setMemberEmail(e.target.value)}
                      placeholder="educator@example.com"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">बायो/परिचय (Short Bio):</label>
                    <input
                      type="text"
                      value={memberBio}
                      onChange={(e) => setMemberBio(e.target.value)}
                      placeholder="उदा. बी.टेक, 5+ साल शिक्षण का अनुभव।"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Predefined Avatar Gallery */}
                <div className="border border-slate-200 bg-white p-4 rounded-xl space-y-3">
                  <span className="text-[11px] text-slate-500 font-extrabold block">
                    आधुनिक प्रीसेट अवतार चुनें (Click any preset to apply):
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {PRESET_AVATARS.map((av, avIdx) => (
                      <button
                        key={avIdx}
                        type="button"
                        onClick={() => setMemberPhotoUrl(av.url)}
                        className={`border rounded-xl p-1 overflow-hidden h-12 w-12 bg-slate-900 shadow transition hover:scale-110 shrink-0 ${
                          memberPhotoUrl === av.url ? "border-pink-500 ring-4 ring-pink-100" : "border-slate-200 hover:border-slate-400"
                        }`}
                        title={av.name}
                      >
                        <img src={av.url} alt={av.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1 mt-1">अथवा कस्टमाइज्ड ऑनलाइन इमेज URL दर्ज करें:</label>
                    <input
                      type="url"
                      value={memberPhotoUrl}
                      onChange={(e) => setMemberPhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... or SVG data URI"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" /> सहेजें (Save Team Member Profile)
                </button>
              </form>
            )}

            {/* TEAM LIST WITH COMPREHENSIVE CONTROLS */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">
                वर्तमान पंजीकृत टीम सदस्य ({team.length})
              </h4>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {team.map((member) => (
                  <div key={member.id} className="border border-slate-200 rounded-2xl p-4 bg-white flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 hover:shadow-md transition">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 text-center sm:text-left min-w-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shrink-0 shadow-inner">
                        <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-extrabold text-slate-800 text-sm truncate flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                          {member.name}
                          {member.email && <span className="text-[10px] text-slate-400 font-mono font-medium">({member.email})</span>}
                        </h5>
                        <span className="text-[10px] font-black text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-100 inline-block mt-0.5 font-bold">
                          {member.role}
                        </span>
                        <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed break-words font-medium">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          startEditMember(member);
                          window.scrollTo({ top: document.getElementById("dev-team-workspace-pane")?.offsetTop, behavior: "smooth" });
                        }}
                        className="p-1.5 hover:bg-slate-100 text-indigo-600 rounded-xl transition"
                        title="संपादन करें"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMember(member.id)}
                        className="p-1.5 hover:bg-slate-100 text-rose-600 rounded-xl transition"
                        title="हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {team.length === 0 && (
                  <div className="text-center py-10 text-slate-400 font-semibold bg-slate-50 rounded-2xl border">
                    कोई शिक्षक / ट्यूटर डेटा उपलब्ध नहीं है। सदस्य जोड़ने के लिए ऊपर दायें 'नया शिक्षक / कोड सदस्य जोड़ें' बटन दबाएँ।
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-500 block">सक्रिय विषय:</span>
                <h3 className="text-xl font-black text-slate-900">
                  {curSubject.name} — संपादन शाखा
                </h3>
              </div>

            {/* Editing tabs */}
            <div className="flex bg-slate-150 p-1 rounded-xl gap-1 text-xs sm:text-sm font-bold">
              <button
                onClick={() => setEditTab("videos")}
                className={`px-3 py-1.5 rounded-lg transition ${editTab === "videos" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"}`}
              >
                वीडियो ({curSubject.videos.length})
              </button>
              <button
                onClick={() => setEditTab("notes")}
                className={`px-3 py-1.5 rounded-lg transition ${editTab === "notes" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600"}`}
              >
                pdf नोट्स ({curSubject.notes.length})
              </button>
              <button
                onClick={() => setEditTab("quiz")}
                className={`px-3 py-1.5 rounded-lg transition ${editTab === "quiz" ? "bg-white text-rose-700 shadow-sm" : "text-slate-600"}`}
              >
                क्विज़ प्रश्न पूल ({curSubject.quiz.length})
              </button>
            </div>
          </div>

          {/* A. VIDEOS EDITOR GRID */}
          {editTab === "videos" && (
            <div className="space-y-6" id="videos-editor-pane">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest">
                  वीडियो लिंक्स प्रबंधन
                </h4>
                <button
                  onClick={addNewVideoPlaceholder}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया वीडियो व्याख्यान जोडें</span>
                </button>
              </div>

              {/* Editing Form */}
              {editingVideoId && (
                <form onSubmit={saveEditedVideo} className="bg-indigo-50/50 outline outline-2 outline-indigo-200 p-5 rounded-2xl space-y-4 animate-fade-in" id="video-edit-form">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h5 className="font-extrabold text-indigo-900 select-none flex items-center gap-1.5 text-xs sm:text-sm">
                      <VideoIcon className="w-4 h-4 text-indigo-600" />
                      वीडियो का विवरण संपादित करें
                    </h5>
                    <button type="button" onClick={() => setEditingVideoId(null)} className="text-slate-400 hover:text-slate-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">शीर्षक (Title):</label>
                      <input
                        type="text"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">यूट्यूब एम्बेड URL:</label>
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/embed/S20C3uC9M00"
                        className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">अवधि (Duration):</label>
                      <input
                        type="text"
                        value={videoDuration}
                        onChange={(e) => setVideoDuration(e.target.value)}
                        placeholder="उदा. 45:12"
                        className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">लघु वर्णन (Description):</label>
                      <input
                        type="text"
                        value={videoDesc}
                        onChange={(e) => setVideoDesc(e.target.value)}
                        className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl transition inline-flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> सहेजें (Save Video Details)
                  </button>
                </form>
              )}

              {/* Display list */}
              <div className="space-y-2">
                {curSubject.videos.map((vid) => (
                  <div key={vid.id} className="border border-slate-150 rounded-2xl p-4 bg-white flex items-center justify-between gap-4 hover:shadow-md transition">
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-slate-800 text-sm truncate">
                        {vid.title}
                      </h5>
                      <p className="text-[10px] text-slate-500 font-bold mt-1 max-w-sm truncate">
                        🔗 {vid.url}  •  ⏱️ {vid.duration || "अज्ञात"}
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEditVideo(vid)}
                        className="p-2 hover:bg-slate-100 text-indigo-600 rounded-xl transition"
                        title="संपादन करें"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteVideo(vid.id)}
                        className="p-2 hover:bg-slate-100 text-rose-600 rounded-xl transition"
                        title="हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* B. NOTES EDITOR GRID */}
          {editTab === "notes" && (
            <div className="space-y-6" id="notes-editor-pane">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest">
                  डिजिटल PDF नोट्स प्रबंधन
                </h4>
                <button
                  onClick={addNewNotePlaceholder}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया PDF सहेजें</span>
                </button>
              </div>

              {/* Editing Form */}
              {editingNoteId && (
                <form onSubmit={saveEditedNote} className="bg-emerald-50/50 outline outline-2 outline-emerald-200 p-5 rounded-2xl space-y-4 animate-fade-in" id="notes-edit-form">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h5 className="font-extrabold text-emerald-900 flex items-center gap-1.5 text-xs sm:text-sm">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      नोट्स का विवरण संपादित करें
                    </h5>
                    <button type="button" onClick={() => setEditingNoteId(null)} className="text-slate-400 hover:text-slate-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">शीर्षक (Title):</label>
                      <input
                        type="text"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">विषय/अध्याय (Topic):</label>
                      <input
                        type="text"
                        value={noteTopic}
                        onChange={(e) => setNoteTopic(e.target.value)}
                        className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">PDF स्रोत (PDF URL/Nic Link):</label>
                    <input
                      type="url"
                      value={notePdfUrl}
                      onChange={(e) => setNotePdfUrl(e.target.value)}
                      className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-semibold"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl transition inline-flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> सहेजें (Save PDF Notes)
                  </button>
                </form>
              )}

              {/* Display list */}
              <div className="space-y-2">
                {curSubject.notes.map((note) => (
                  <div key={note.id} className="border border-slate-150 rounded-2xl p-4 bg-white flex items-center justify-between gap-4 hover:shadow-md transition">
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-slate-800 text-sm truncate">
                        {note.title}
                      </h5>
                      <p className="text-[10px] text-slate-500 font-bold mt-1 truncate">
                        📁 {note.topic || "साझा अध्याय"} • 📥 {note.pdfUrl}
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEditNote(note)}
                        className="p-2 hover:bg-slate-100 text-emerald-600 rounded-xl transition"
                        title="संपादन करें"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-2 hover:bg-slate-100 text-rose-600 rounded-xl transition"
                        title="हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C. QUIZ POOL EDITOR */}
          {editTab === "quiz" && (
            <div className="space-y-6" id="quiz-editor-pane">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest block">
                    क्विज़ प्रश्न महासागर नियंत्रण
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">यहाँ जोड़े गए प्रश्न 15 रैंडम शफल पूल का भाग बनते हैं।</p>
                </div>
                <button
                  onClick={addNewQuizQPlaceholder}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया प्रश्न शामिल करें</span>
                </button>
              </div>

              {/* Editing Form */}
              {editingQuizQId && (
                <form onSubmit={saveEditedQuizQ} className="bg-rose-50/50 outline outline-2 outline-rose-200 p-5 rounded-2xl space-y-4 animate-fade-in" id="quizq-edit-form">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h5 className="font-extrabold text-rose-900 flex items-center gap-1.5 text-xs sm:text-sm">
                      <HelpCircle className="w-4 h-4 text-rose-600" />
                      प्रश्न एवं बहुविकल्पीय संपादन
                    </h5>
                    <button type="button" onClick={() => setEditingQuizQId(null)} className="text-slate-400 hover:text-slate-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">प्रश्न का विषय-वस्तु (Question Text):</label>
                    <textarea
                      rows={2}
                      value={quizQuestionText}
                      onChange={(e) => setQuizQuestionText(e.target.value)}
                      className="w-full bg-white border rounded-xl px-3 py-2 text-xs font-bold"
                      required
                    />
                  </div>

                  {/* Options inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quizOptions.map((opt, oIdx) => (
                      <div key={oIdx}>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">
                          विकल्प {(oIdx + 10).toString(36).toUpperCase()}:
                        </label>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(oIdx, e.target.value)}
                          className="w-full bg-white border rounded-xl px-3 py-1.5 text-xs font-semibold"
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">सही उत्तर सूचकांक (Correct Option):</label>
                      <select
                        value={quizCorrectIdx}
                        onChange={(e) => setQuizCorrectIdx(Number(e.target.value))}
                        className="w-full bg-white border rounded-xl px-3 py-2 text-xs font-bold"
                      >
                        {quizOptions.map((_, oIdx) => (
                          <option key={oIdx} value={oIdx}>
                            विकल्प {(oIdx + 10).toString(36).toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">व्याख्या (Explanation):</label>
                      <input
                        type="text"
                        value={quizExplainText}
                        onChange={(e) => setQuizExplainText(e.target.value)}
                        placeholder="हल करने की सरल विधि"
                        className="w-full bg-white border rounded-xl px-3 py-2 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-black py-2.5 rounded-xl transition inline-flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> डेटा पूल अपडेट सहेजें
                  </button>
                </form>
              )}

              {/* Display list */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {curSubject.quiz.map((q, qIndex) => (
                  <div key={q.id || qIndex} className="border border-slate-150 rounded-2xl p-4 bg-white space-y-2 hover:shadow-md transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] bg-slate-100 text-slate-500 font-extrabold px-2 py-0.5 rounded uppercase block w-max">
                          प्रश्न {qIndex + 1} ({q.id})
                        </span>
                        <h5 className="font-extrabold text-slate-800 text-xs mt-1">
                          {q.question}
                        </h5>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => startEditQuizQ(q)}
                          className="p-1.5 hover:bg-slate-100 text-indigo-600 rounded-lg transition"
                          title="संपादन"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteQuizQ(q.id)}
                          className="p-1.5 hover:bg-slate-100 text-rose-600 rounded-lg transition"
                          title="हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Quick options overview */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2 rounded-xl">
                      {q.options.map((opt, optId) => (
                        <div 
                          key={optId} 
                          className={`p-1 rounded font-semibold ${
                            optId === q.correctAnswerIndex 
                              ? "bg-emerald-100 text-emerald-800" 
                              : "text-slate-600"
                          }`}
                        >
                          <strong>{(optId + 10).toString(36).toUpperCase()}:</strong> {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      </div>

    </div>
  );
}
