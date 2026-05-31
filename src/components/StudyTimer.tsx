import React, { useState, useEffect, useRef } from "react";
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Plus, 
  Minus, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  X, 
  ChevronRight, 
  BookOpen, 
  Info, 
  Target 
} from "lucide-react";

interface SessionLog {
  id: string;
  task: string;
  duration: number;
  completedAt: string;
}

export default function StudyTimer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<"study" | "shortBreak" | "longBreak">("study");
  const [taskInput, setTaskInput] = useState<string>("");
  const [activeTask, setActiveTask] = useState<string>("सामान्य स्व-अध्ययन (Self-Study)");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completedSessions, setCompletedSessions] = useState<SessionLog[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Custom durational settings
  const [studySetting, setStudySetting] = useState<number>(25);
  const [shortBreakSetting, setShortBreakSetting] = useState<number>(5);
  const [longBreakSetting, setLongBreakSetting] = useState<number>(15);

  const timerRef = useRef<any>(null);

  // Total seconds calculation helper
  const totalSecondsForMode = () => {
    if (mode === "study") return studySetting * 60;
    if (mode === "shortBreak") return shortBreakSetting * 60;
    return longBreakSetting * 60;
  };

  const currentRemainingSeconds = minutes * 60 + seconds;
  const progressRatio = totalSecondsForMode() > 0 
    ? (totalSecondsForMode() - currentRemainingSeconds) / totalSecondsForMode() 
    : 0;

  // Load stats from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("c10_study_sessions");
      if (stored) {
        setCompletedSessions(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load study sessions log", e);
    }
  }, []);

  // Web Audio API Synths for chime feedback
  const playChime = (frequency: number, type: "sine" | "triangle" | "sawtooth" = "sine", duration: number = 0.5) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio context not allowed yet by user interaction", e);
    }
  };

  const playSuccessChime = () => {
    playChime(523.25, "sine", 0.15); // C5
    setTimeout(() => playChime(659.25, "sine", 0.15), 150); // E5
    setTimeout(() => playChime(783.99, "sine", 0.4), 300); // G5
  };

  const playPauseChime = () => {
    playChime(329.63, "triangle", 0.25); // E4
  };

  // Timer interval handling
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prev => prev - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            // Timer Finished! Let's handle completion
            handleTimerComplete();
          } else {
            setMinutes(prev => prev - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, minutes, seconds]);

  // Handle completion
  const handleTimerComplete = () => {
    setIsActive(false);
    playSuccessChime();
    
    if (mode === "study") {
      const newSession: SessionLog = {
        id: `sess-${Date.now()}`,
        task: activeTask,
        duration: studySetting,
        completedAt: new Date().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" })
      };
      const updated = [newSession, ...completedSessions];
      setCompletedSessions(updated);
      localStorage.setItem("c10_study_sessions", JSON.stringify(updated));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      // Auto toggle to break
      setMode("shortBreak");
      setMinutes(shortBreakSetting);
      setSeconds(0);
    } else {
      // Break over - toggle back to study
      setMode("study");
      setMinutes(studySetting);
      setSeconds(0);
    }
  };

  // Switch Modes explicitly
  const switchMode = (newMode: "study" | "shortBreak" | "longBreak") => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === "study") {
      setMinutes(studySetting);
    } else if (newMode === "shortBreak") {
      setMinutes(shortBreakSetting);
    } else {
      setMinutes(longBreakSetting);
    }
    setSeconds(0);
    playChime(392.00, "triangle", 0.15); // G4
  };

  // Manual Trigger play/pause
  const togglePlay = () => {
    setIsActive(!isActive);
    playPauseChime();
  };

  // Manual reset
  const resetTimer = () => {
    setIsActive(false);
    if (mode === "study") {
      setMinutes(studySetting);
    } else if (mode === "shortBreak") {
      setMinutes(shortBreakSetting);
    } else {
      setMinutes(longBreakSetting);
    }
    setSeconds(0);
    playChime(261.63, "sawtooth", 0.2); // C4
  };

  // Add customized task target
  const handleSetTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskInput.trim()) {
      setActiveTask(taskInput.trim());
      setTaskInput("");
      playChime(440.00, "sine", 0.1); // A4
    }
  };

  // Real-time custom duration adjustments
  const adjustSetting = (type: "study" | "short" | "long", amount: number) => {
    if (type === "study") {
      const newVal = Math.max(1, studySetting + amount);
      setStudySetting(newVal);
      if (mode === "study") {
        setMinutes(newVal);
        setSeconds(0);
        setIsActive(false);
      }
    } else if (type === "short") {
      const newVal = Math.max(1, shortBreakSetting + amount);
      setShortBreakSetting(newVal);
      if (mode === "shortBreak") {
        setMinutes(newVal);
        setSeconds(0);
        setIsActive(false);
      }
    } else {
      const newVal = Math.max(1, longBreakSetting + amount);
      setLongBreakSetting(newVal);
      if (mode === "longBreak") {
        setMinutes(newVal);
        setSeconds(0);
        setIsActive(false);
      }
    }
    playChime(493.88, "sine", 0.08); // B4
  };

  // Quotes generator
  const getMotivationalQuote = () => {
    if (mode === "study") {
      return "धीरज धरें! सफलता की चाबी एकाग्रता है। अभ्यास करते रहें।";
    }
    return "शानदार! थोड़ा विश्राम करें, कुछ स्ट्रेच करें या पानी पिएं।";
  };

  const formatTime = (m: number, s: number) => {
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Floating Trigger Tag */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none"
        id="pomodoro-trigger-button"
      >
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            playChime(523.25, "sine", 0.1);
          }}
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 active:scale-95 ${
            isActive && mode === "study"
              ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white animate-pulse"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          <Timer className="w-5 h-5" />
          <span className="text-xs font-black">
            {isActive ? `${formatTime(minutes, seconds)} (${mode === "study" ? "ध्यान केंद्रित करें" : "ब्रेक"})` : "पढ़ाई टाइमर / फोकस"}
          </span>
          <span className="bg-white/20 pl-1.5 pr-1 py-0.5 rounded text-[9px] font-bold">
            {completedSessions.length} सत्र
          </span>
        </button>
      </div>

      {/* Slide-out Overlay drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end select-none animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Main Panel Box */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto relative animate-slide-left border-l-4 border-indigo-600"
            id="pomodoro-study-panel"
          >
            {/* Header section */}
            <div className="bg-gradient-to-r from-indigo-700 to-violet-800 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="w-6 h-6 text-yellow-300 animate-pulse" />
                <div>
                  <h3 className="text-base font-black">स्टडी फोकस टाइमर (Pomodoro Method)</h3>
                  <p className="text-[10px] text-indigo-200 font-bold">कक्षा 10वीं के छात्रों की सघन एकाग्रता हेतु</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                {/* Audio feedback on/off */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 transition text-yellow-300"
                  title={soundEnabled ? "ध्वनि बंद करें" : "ध्वनि चालू करें"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main content body */}
            <div className="p-5 flex-1 space-y-6">
              
              {/* Mode quick switch */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border">
                <button
                  onClick={() => switchMode("study")}
                  className={`py-1.5 text-[11px] font-black rounded-lg transition ${
                    mode === "study"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  📖 पढ़ाई सत्र
                </button>
                <button
                  onClick={() => switchMode("shortBreak")}
                  className={`py-1.5 text-[11px] font-black rounded-lg transition ${
                    mode === "shortBreak"
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  ☕ छोटा ब्रेक
                </button>
                <button
                  onClick={() => switchMode("longBreak")}
                  className={`py-1.5 text-[11px] font-black rounded-lg transition ${
                    mode === "longBreak"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  🌴 लंबा ब्रेक
                </button>
              </div>

              {/* Huge Timer display with circular SVG meter */}
              <div className="flex flex-col items-center justify-center py-4 bg-slate-50 border border-slate-150 rounded-2xl relative overflow-hidden">
                {showConfetti && (
                  <div className="absolute inset-0 bg-yellow-400/10 flex items-center justify-center z-10">
                    <span className="text-center font-black text-rose-600 animate-bounce text-sm">
                      🎉 बधाई हो! सत्र पूरा हुआ 🎖️
                    </span>
                  </div>
                )}

                <div className="relative w-44 h-44 flex items-center justify-center">
                  
                  {/* SVG background circle & progress ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      className="stroke-slate-200 fill-none"
                      strokeWidth="8"
                    />
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      className={`fill-none transition-stroke duration-500 ${
                        mode === "study" 
                          ? "stroke-indigo-600" 
                          : mode === "shortBreak" 
                            ? "stroke-teal-500" 
                            : "stroke-blue-500"
                      }`}
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 76}
                      strokeDashoffset={2 * Math.PI * 76 * (1 - progressRatio)}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Absolute Time Text */}
                  <div className="absolute text-center">
                    <span className="text-3xl font-black text-slate-900 block tracking-wider">
                      {formatTime(minutes, seconds)}
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 block">
                      {mode === "study" ? "ध्यान सत्र" : "ब्रेक सत्र"}
                    </span>
                  </div>
                </div>

                {/* Motivational Quote in Real time */}
                <p className="text-xs text-indigo-900 text-center font-extrabold mt-3 px-4">
                  {getMotivationalQuote()}
                </p>
              </div>

              {/* Controls bar */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetTimer}
                  className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition border border-slate-200 active:scale-95"
                  title="रीसेट करें"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className={`px-8 py-3 rounded-2xl font-black shadow-lg shadow-indigo-150 flex items-center gap-2 text-white text-sm transition active:scale-95 hover:brightness-105 ${
                    isActive
                      ? "bg-amber-600"
                      : "bg-indigo-600"
                  }`}
                >
                  {isActive ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>विश्राम (Pause)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white animate-pulse" />
                      <span>आरंभ करें (Play)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleTimerComplete}
                  className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition border border-slate-200 active:scale-95"
                  title="सत्र समाप्त करें (Skip)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Task/Topic setting widget */}
              <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-indigo-950 font-black">
                  <Target className="w-4 h-4 text-rose-500" />
                  <span>सक्रिय अध्ययन लक्ष्य निर्धारित करें:</span>
                </div>
                
                <form onSubmit={handleSetTask} className="flex gap-2">
                  <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="उदा. विज्ञान अध्याय 1 नोट्स तैयार करना..."
                    className="flex-1 px-3 py-1.5 text-xs border border-indigo-150 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0"
                  >
                    बदलें
                  </button>
                </form>

                <div className="text-[10px] text-slate-600 font-bold bg-white p-2.5 rounded-lg border border-indigo-100/30">
                  <span className="text-rose-600">वर्तमान लक्ष्य:</span> {activeTask}
                </div>
              </div>

              {/* Advanced customizable duration timers */}
              <div className="space-y-2 border-t pt-4">
                <span className="text-xs font-black text-slate-700 block">कस्टम अवधि व्यवस्था (Set Timer Durations):</span>
                <div className="grid grid-cols-3 gap-2">
                  
                  {/* Study timer custom */}
                  <div className="space-y-1 text-center bg-slate-50 p-2 border rounded-xl">
                    <span className="text-[9px] font-bold text-slate-500 block">पढ़ाई (मिनट)</span>
                    <div className="flex items-center justify-between gap-1.5 px-1 py-0.5">
                      <button 
                        onClick={() => adjustSetting("study", -5)}
                        className="text-[10px] bg-white border font-bold w-4 h-4 hover:bg-slate-100 flex items-center justify-center rounded"
                      >
                        -
                      </button>
                      <span className="text-xs font-black text-slate-800">{studySetting}</span>
                      <button 
                        onClick={() => adjustSetting("study", 5)}
                        className="text-[10px] bg-white border font-bold w-4 h-4 hover:bg-slate-100 flex items-center justify-center rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Short Break timer custom */}
                  <div className="space-y-1 text-center bg-slate-50 p-2 border rounded-xl">
                    <span className="text-[9px] font-bold text-slate-500 block">छोटा ब्रेक</span>
                    <div className="flex items-center justify-between gap-1.5 px-1 py-0.5">
                      <button 
                        onClick={() => adjustSetting("short", -1)}
                        className="text-[10px] bg-white border font-bold w-4 h-4 hover:bg-slate-100 flex items-center justify-center rounded"
                      >
                        -
                      </button>
                      <span className="text-xs font-black text-slate-800">{shortBreakSetting}</span>
                      <button 
                        onClick={() => adjustSetting("short", 1)}
                        className="text-[10px] bg-white border font-bold w-4 h-4 hover:bg-slate-100 flex items-center justify-center rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Long Break timer custom */}
                  <div className="space-y-1 text-center bg-slate-50 p-2 border rounded-xl">
                    <span className="text-[9px] font-bold text-slate-500 block">लंबा ब्रेक</span>
                    <div className="flex items-center justify-between gap-1.5 px-1 py-0.5">
                      <button 
                        onClick={() => adjustSetting("long", -2)}
                        className="text-[10px] bg-white border font-bold w-4 h-4 hover:bg-slate-100 flex items-center justify-center rounded"
                      >
                        -
                      </button>
                      <span className="text-xs font-black text-slate-800">{longBreakSetting}</span>
                      <button 
                        onClick={() => adjustSetting("long", 2)}
                        className="text-[10px] bg-white border font-bold w-4 h-4 hover:bg-slate-100 flex items-center justify-center rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Completed sessions log footer (Persistence) */}
            <div className="bg-slate-50 border-t p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>आज के संपन्न सत्र ({completedSessions.length} सत्र)</span>
                </span>
                {completedSessions.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm("क्या आप वाकई इतिहास मिटाना चाहते हैं?")) {
                        setCompletedSessions([]);
                        localStorage.removeItem("c10_study_sessions");
                        playChime(196, "sine", 0.3);
                      }
                    }}
                    className="text-[10px] text-red-500 hover:underline font-bold"
                  >
                    साफ़ करें
                  </button>
                )}
              </div>

              <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1">
                {completedSessions.length > 0 ? (
                  completedSessions.map((sess) => (
                    <div key={sess.id} className="flex items-center justify-between bg-white border p-2 rounded-lg text-[11px]">
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-slate-800 line-clamp-1">{sess.task}</span>
                        <span className="text-[9px] text-slate-400 font-bold">अवधि: {sess.duration} मिनट</span>
                      </div>
                      <span className="text-[10px] text-indigo-600 bg-indigo-50 font-bold px-2 py-0.5 rounded shrink-0">
                        {sess.completedAt}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-[10px] text-slate-400 text-center font-bold py-4">
                    अभी कोई सत्र संपन्न नहीं किया गया है। पढ़ना शुरू करें और लक्ष्य तय करें!
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
