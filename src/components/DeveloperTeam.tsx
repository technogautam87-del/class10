import React, { useState } from "react";
import { TeamMember, Flashcard } from "../types";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  Mail, 
  UserPlus, 
  Check, 
  X, 
  Sparkles, 
  FileText, 
  GraduationCap, 
  Image,
  Award,
  Zap
} from "lucide-react";

interface DeveloperTeamProps {
  team: TeamMember[];
  updateTeam: (newTeam: TeamMember[]) => void;
  flashcards: Flashcard[];
  updateFlashcards: (newCards: Flashcard[]) => void;
  fontSizeClass: string;
}

// Preset modern SVG avatars for quick selection when changing images
const PRESET_AVATARS = [
  { name: "इंडीगो स्टार", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%236366F1'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><polygon points='50,15 53,23 62,23 55,28 58,36 50,31 42,36 45,28 38,23 47,23' fill='%23FBBF24'/></svg>" },
  { name: "एमेरल्ड कोडर", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%2310B981'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='42' y='40' font-family='monospace' font-size='12' font-weight='black' fill='%2310B981'>&lt;&gt;</text></svg>" },
  { name: "ऐम्बर जीनियस", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23F59E0B'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='45' y='38' font-size='12' fill='%23F59E0B'>💡</text></svg>" },
  { name: "रोज़ गुरु", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23F43F5E'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='44' y='38' font-size='12' fill='%23F43F5E'>🎓</text></svg>" },
  { name: "वायलेट एक्सपर्ट", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%238B5CF6'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='45' y='38' font-size='12' fill='%238B5CF6'>🔬</text></svg>" },
  { name: "सायान विज़ार्ड", url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%2306B6D4'/><circle cx='50' cy='35' r='18' fill='white'/><path d='M20,80 C20,55 80,55 80,80 Z' fill='white'/><text x='44' y='38' font-size='11' fill='%2306B6D4'>🚀</text></svg>" }
];

export default function DeveloperTeam({
  team,
  updateTeam,
  flashcards,
  updateFlashcards,
  fontSizeClass,
}: DeveloperTeamProps) {
  // States for changing photo URL
  const [activePhotoChangeMemberId, setActivePhotoChangeMemberId] = useState<string | null>(null);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string>("");

  // States for interactive Flashcard deck
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [selectedFlashSubject, setSelectedFlashSubject] = useState<string>("सभी");

  // States for Flashcard Form (Add / Edit)
  const [isEditingCard, setIsEditingCard] = useState<boolean>(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [cardQuestion, setCardQuestion] = useState<string>("");
  const [cardAnswer, setCardAnswer] = useState<string>("");
  const [cardSubject, setCardSubject] = useState<string>("गणित");

  // Filter labels for flashcard selection
  const uniqueSubjects = ["सभी", "गणित", "विज्ञान", "सामाजिक विज्ञान", "हिंदी", "अंग्रेज़ी", "संस्कृत"];

  // Replace photo function
  const handleApplyPhoto = (memberId: string, url: string) => {
    const updated = team.map((tm) => {
      if (tm.id === memberId) {
        return { ...tm, photoUrl: url };
      }
      return tm;
    });
    updateTeam(updated);
    setActivePhotoChangeMemberId(null);
    setCustomPhotoUrl("");
  };

  // Create or Update Flashcard
  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardQuestion.trim() || !cardAnswer.trim()) return;

    if (isEditingCard && editingCardId) {
      // Edit existing
      const updated = flashcards.map((fc) => 
        fc.id === editingCardId 
          ? { ...fc, question: cardQuestion, answer: cardAnswer, subject: cardSubject } 
          : fc
      );
      updateFlashcards(updated);
      setIsEditingCard(false);
      setEditingCardId(null);
    } else {
      // Create new
      const newCard: Flashcard = {
        id: `fc-${Date.now()}`,
        question: cardQuestion,
        answer: cardAnswer,
        subject: cardSubject
      };
      updateFlashcards([newCard, ...flashcards]);
    }

    // Reset inputs
    setCardQuestion("");
    setCardAnswer("");
  };

  // Start edit flashcard
  const startEditCard = (card: Flashcard) => {
    setIsEditingCard(true);
    setEditingCardId(card.id);
    setCardQuestion(card.question);
    setCardAnswer(card.answer);
    setCardSubject(card.subject);
    window.scrollTo({ top: document.getElementById("flashcard-form-anchor")?.offsetTop, behavior: "smooth" });
  };

  // Delete flashcard
  const handleDeleteCard = (id: string) => {
    const remaining = flashcards.filter((fc) => fc.id !== id);
    updateFlashcards(remaining);
    if (flippedCardId === id) setFlippedCardId(null);
  };

  // Filtered Flashcards
  const filteredFlashcards = selectedFlashSubject === "सभी"
    ? flashcards
    : flashcards.filter((fc) => fc.subject === selectedFlashSubject);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6" id="dev-and-flashcard-sector">
      
      {/* LEFT COLUMN: DEVELOPER TEAM ROSTER */}
      <div className="lg:col-span-6 flex flex-col gap-6" id="dev-roster-column">
        <div className="bg-gradient-to-br from-rose-600 to-pink-700 text-white p-6 rounded-3xl shadow-xl border-b-4 border-yellow-400">
          <h2 className={`font-black tracking-tight flex items-center gap-2 ${fontSizeClass}`}>
            <Award className="w-8 h-8 text-yellow-300 animate-pulse" />
            डिजिटल डेवलपर टीम
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 font-medium mt-1 leading-relaxed">
            कक्षा 10 लर्निंग प्लेटफ़ॉर्म को आधुनिक डिज़ाइनों से सुसज्जित करने वाले हमारे शिक्षक और मुख्य विकासकर्ता (Educators & Coders) की सूची:
          </p>
        </div>

        {/* TEAM CARDS */}
        <div className="space-y-4" id="team-roster-list">
          {team.map((member) => (
            <div 
              key={member.id}
              className="bg-white border-2 border-slate-100 hover:border-indigo-300 rounded-3xl p-5 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-5 transition duration-300 hover:shadow-2xl"
            >
              {/* Photo component slot */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-100 shrink-0 shadow-inner relative group bg-indigo-50">
                <img 
                  src={member.photoUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay trigger to change photo */}
                <button
                  onClick={() => {
                    setActivePhotoChangeMemberId(member.id);
                    setCustomPhotoUrl(member.photoUrl);
                  }}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-white font-extrabold transition duration-200 cursor-pointer"
                  title="फोटो बदलने के विकल्प"
                >
                  <Image className="w-5 h-5 mb-1 text-yellow-300 animate-bounce" />
                  <span>स्वैप फ़ोटो</span>
                </button>
              </div>

              {/* Text metadata */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-black text-indigo-950">
                  {member.name}
                </h3>
                <span className="text-xs font-black text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full inline-block mt-1">
                  {member.role}
                </span>
                <p className="text-slate-600 text-xs sm:text-sm font-medium mt-3 leading-relaxed">
                  {member.bio}
                </p>

                {member.email && (
                  <div className="mt-4 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 font-bold">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{member.email}</span>
                  </div>
                )}
              </div>

              {/* Photo Change Dynamic Inline Dashboard Section */}
              {activePhotoChangeMemberId === member.id && (
                <div className="absolute inset-0 bg-slate-950/95 text-white p-5 z-20 flex flex-col justify-between rounded-3xl animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-xs sm:text-sm font-black text-yellow-300 uppercase tracking-widest flex items-center gap-1">
                      📁 फोटो बदलने का विज़ार्ड • {member.name.split(" ")[0]}
                    </h4>
                    <button 
                      onClick={() => setActivePhotoChangeMemberId(null)}
                      className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Preset selections */}
                  <div className="my-2">
                    <span className="text-[10px] text-slate-400 font-black block mb-2">
                      A. आधुनिक क्विक प्रीसेट अवतार चुनें:
                    </span>
                    <div className="grid grid-cols-6 gap-2">
                      {PRESET_AVATARS.map((av, avIdx) => (
                        <button
                          key={avIdx}
                          onClick={() => handleApplyPhoto(member.id, av.url)}
                          className="border border-slate-700 hover:border-yellow-400 transition rounded-xl p-1 overflow-hidden h-12 bg-slate-900 shadow hover:scale-110"
                          title={av.name}
                        >
                          <img src={av.url} alt={av.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual URL input Box */}
                  <div className="mt-2 pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-400 font-black block mb-1">
                      B. अथवा कस्टमाइज्ड ऑनलाइन इमेज URL दर्ज करें:
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={customPhotoUrl}
                        onChange={(e) => setCustomPhotoUrl(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      />
                      <button
                        onClick={() => handleApplyPhoto(member.id, customPhotoUrl)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-1.5 rounded-xl transition inline-flex items-center gap-1 shrink-0"
                      >
                        <Check className="w-3.5 h-3.5" /> लागू करें
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: FLASHCARD STUDIO (फ्लैशकार्ड स्टूडियो) */}
      <div className="lg:col-span-6 flex flex-col gap-6" id="flashcards-studio-column">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-3xl shadow-xl border-b-4 border-yellow-300">
          <h2 className={`font-black tracking-tight flex items-center gap-2 ${fontSizeClass}`}>
            <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
            स्मार्ट फ्लैशकार्ड स्टूडियो
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 font-medium mt-1 leading-relaxed">
            कठिन प्रत्ययों को आसानी से कंठस्थ करने के लिए 3D फ्लैशकार्ड खेलें! विषय चुने और कार्ड फ्लिप करके उत्तर जाँचें। आप नए कार्ड भी जोड़ने और संपादित करने के लिए स्वतंत्र हैं:
          </p>
        </div>

        {/* Dynamic subject filter pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 rounded-2xl p-1.5" id="flashcard-filters">
          {uniqueSubjects.map((subj) => (
            <button
              key={subj}
              onClick={() => {
                setSelectedFlashSubject(subj);
                setFlippedCardId(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition duration-200 ${
                selectedFlashSubject === subj
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        {/* ACTIVE MAIN FLASHCARD DISPLAY */}
        {filteredFlashcards.length > 0 ? (
          <div className="flex flex-col gap-3" id="active-featured-flashcard">
            <span className="text-xs text-slate-400 font-black uppercase text-center block">
              💡 फ्लिप करने के लिए कार्ड पर क्लिक करें (Click to Flip)
            </span>
            
            {/* Flip Card CSS frame wrapper */}
            <div 
              onClick={() => {
                const headId = filteredFlashcards[0].id;
                setFlippedCardId(flippedCardId === headId ? null : headId);
              }}
              className={`flip-card w-full cursor-pointer select-none rounded-3xl h-64 ${
                flippedCardId === filteredFlashcards[0].id ? "flipped" : ""
              }`}
            >
              <div className="flip-card-inner relative w-full h-full duration-500 rounded-3xl">
                
                {/* FRONT FACE of FLIP CARD (Question) */}
                <div className="flip-card-front absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between border-b-8 border-indigo-900">
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase backdrop-blur-sm">
                      📖 प्रश्न पत्रक • {filteredFlashcards[0].subject}
                    </span>
                    <span className="text-[10px] text-yellow-300 font-black tracking-wider block animate-pulse">
                      तैयारी जाँचें 👋
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-center leading-relaxed drop-shadow my-4">
                    {filteredFlashcards[0].question}
                  </h4>
                  <div className="text-center text-xs text-indigo-200 font-bold shrink-0">
                    🔄 क्लिक करें (उत्तर देखने के लिए पलटें)
                  </div>
                </div>

                {/* BACK FACE of FLIP CARD (Answer) */}
                <div className="flip-card-back absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between border-b-8 border-teal-950">
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase backdrop-blur-sm">
                      ✅ उत्तर पत्रक • {filteredFlashcards[0].subject}
                    </span>
                    <span className="text-emerald-200 text-xs font-black">
                      अद्भुत स्मरणशक्ति! 🌟
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold bg-white/10 p-4 rounded-2xl border border-white/20 text-center leading-relaxed my-3">
                    {filteredFlashcards[0].answer}
                  </h4>
                  <div className="text-center text-xs text-emerald-200 font-bold shrink-0">
                    🔄 क्लिक करें (वापस प्रश्न पर जाएँ)
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border">
            इस विषय में कोई फ्लैशकार्ड उपलब्ध नहीं है। नया बनाएं!
          </div>
        )}

        {/* MASTER CARDS MANAGER LIST & CREATE FORM */}
        <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 mt-2" id="flashcard-form-anchor">
          <h3 className="text-lg font-black text-indigo-950 mb-3 flex items-center gap-1.5">
            ✏️ नया फ्लैशकार्ड बनाएं और संपादन करें (Studio Dashboard)
          </h3>

          <form onSubmit={handleSaveCard} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">संबंधित विषय:</label>
                <select
                  value={cardSubject}
                  onChange={(e) => setCardSubject(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {uniqueSubjects.filter((s) => s !== "सभी").map((subj) => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                {isEditingCard && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingCard(false);
                      setEditingCardId(null);
                      setCardQuestion("");
                      setCardAnswer("");
                    }}
                    className="w-full bg-slate-300 hover:bg-slate-400 text-slate-800 font-black text-xs py-2 px-4 rounded-xl transition duration-150 inline-flex items-center justify-center gap-1"
                  >
                    <X className="w-4 h-4" /> रद्द करें संपादन
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">प्रश्न (Question Card):</label>
              <textarea
                rows={2}
                value={cardQuestion}
                onChange={(e) => setCardQuestion(e.target.value)}
                placeholder="उदा. गुरुत्वाकर्षण का सिद्धांत क्या है?"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">उत्तर (Answer Card):</label>
              <textarea
                rows={2}
                value={cardAnswer}
                onChange={(e) => setCardAnswer(e.target.value)}
                placeholder="उदा. दो पिंडों के बीच लगने वाले आकर्षण बल को गुरुत्वाकर्षण कहते हैं।"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              {isEditingCard ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>फ्लैशकार्ड को अपडेट करें</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>नया फ्लैशकार्ड जोड़ें</span>
                </>
              )}
            </button>
          </form>

          {/* TABLE / LIST of existing cards to edit or delete */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">
              मौजूदा फ्लैशकार्ड्स संग्रह ({filteredFlashcards.length})
            </h4>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1" id="existing-flashcard-list">
              {filteredFlashcards.map((c) => (
                <div 
                  key={c.id}
                  className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-4 transition duration-150 hover:bg-indigo-50/50"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md inline-block mb-1">
                      {c.subject}
                    </span>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                      Q: {c.question}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      A: {c.answer}
                    </p>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => startEditCard(c)}
                      className="p-1.5 hover:bg-slate-100 text-indigo-600 rounded-lg transition"
                      title="संपादित करें"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCard(c.id)}
                      className="p-1.5 hover:bg-slate-100 text-rose-600 rounded-lg transition"
                      title="हटाएं"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Flip Card global CSS layout rules */}
      <style>{`
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  );
}
