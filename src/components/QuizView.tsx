import React, { useState, useEffect } from "react";
import { QuizQuestion } from "../types";
import { Award, RefreshCw, CheckCircle2, XCircle, AlertTriangle, ChevronRight, ChevronLeft, Lightbulb } from "lucide-react";

interface QuizViewProps {
  subjectName: string;
  originalQuestions: QuizQuestion[];
  fontSizeClass: string;
}

export default function QuizView({
  subjectName,
  originalQuestions,
  fontSizeClass,
}: QuizViewProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  // Initialize and shuffle quiz on start or restart
  const startNewQuiz = () => {
    if (!originalQuestions || originalQuestions.length === 0) {
      setShuffledQuestions([]);
      return;
    }

    // Clone and shuffle using Fisher-Yates
    const arr = [...originalQuestions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Pick exactly 15 questions representing the "50 में से 15 प्रश्न" requirement
    const selected = arr.slice(0, 15);
    setShuffledQuestions(selected);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setQuizStarted(true);
  };

  useEffect(() => {
    // Auto-start or auto-reset whenever subject changes
    startNewQuiz();
  }, [originalQuestions]);

  if (!quizStarted) {
    return (
      <div className="text-center py-10 bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-300" id="quiz-pre-start">
        <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-xl font-extrabold text-slate-800">कक्षा 10 {subjectName} विशेष परीक्षा</h3>
        <p className="text-slate-600 mt-2 text-sm max-w-sm mx-auto">
          इस विषय में हमारे पास 50 उच्च-स्तरीय प्रश्नों का महासागर है। आप इस टेस्ट को जितनी बार खेलेंगे, हर बार रैंडम 15 अलग-अलग प्रश्न शफल होकर दिखेंगे!
        </p>
        <button
          onClick={startNewQuiz}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          📝 नया टेस्ट शुरू करें (15 रैंडम प्रश्न, ऑटो-शफल)
        </button>
      </div>
    );
  }

  if (shuffledQuestions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        इस विषय में कोई भी प्रश्न उपलब्ध नहीं है। एडमिन पैनल से जोड़ें!
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentIdx];
  const totalQuestions = shuffledQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return; // Prevent change after submit
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    shuffledQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="bg-slate-50 rounded-3xl p-4 sm:p-6 md:p-8 shadow-inner border border-slate-200" id="quiz-workspace">
      
      {/* Header Info stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6" id="quiz-header">
        <div>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-black uppercase">
            कंटेस्ट मोड ({subjectName})
          </span>
          <h4 className="text-lg font-extrabold text-slate-800 mt-1">
            50 में से 15 शफल किए गए प्रश्न
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-bold text-slate-600">
            कवर किया गया: <b className="text-indigo-600">{answeredCount}/{totalQuestions}</b>
          </span>
          <button
            onClick={startNewQuiz}
            className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-xs sm:text-sm font-black px-3 py-2 rounded-xl transition"
            title="पुनः शफल करें और नए प्रश्न लाएं"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>पुनः शफल टेस्ट</span>
          </button>
        </div>
      </div>

      {!isSubmitted ? (
        <div id="quiz-question-card">
          {/* Question Index Progress Dots */}
          <div className="flex flex-wrap gap-1.5 mb-6 justify-center">
            {shuffledQuestions.map((_, idx) => {
              const isSelected = selectedAnswers[idx] !== undefined;
              const isCurrent = idx === currentIdx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                    isCurrent 
                      ? "bg-indigo-600 text-white scale-110 ring-2 ring-indigo-400" 
                      : isSelected 
                      ? "bg-emerald-300 text-emerald-950 border border-emerald-400" 
                      : "bg-white hover:bg-slate-200 text-slate-600 border border-slate-300"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Core Question Content */}
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-indigo-600 mb-6">
            <div className="text-xs font-black text-indigo-500 tracking-wider mb-2">
              प्रश्न {currentIdx + 1} / {totalQuestions}
            </div>
            <h5 className={`font-black text-slate-800 mb-6 leading-relaxed ${fontSizeClass}`} id="quiz-headline-text">
              {currentQuestion.question}
            </h5>

            {/* Options list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="quiz-options-container">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border-2 font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-between ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-600 text-indigo-900 shadow-md transform translate-x-1"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <span>
                      <strong className="mr-2 text-indigo-500">{(optIdx + 10).toString(36).toUpperCase()}.</strong> 
                      {option}
                    </span>
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300"
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls inside active Quiz */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="flex items-center gap-1 bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 border border-slate-300 font-bold px-4 py-2.5 rounded-xl transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>पिछला</span>
            </button>

            {currentIdx < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-md"
              >
                <span>अगला प्रश्न</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setIsSubmitted(true)}
                disabled={answeredCount === 0}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-black px-8 py-3 rounded-xl transition shadow-lg animate-pulse"
              >
                🏁 सबमिट करें और रिजल्ट देखें
              </button>
            )}
          </div>
        </div>
      ) : (
        /* SCORE AND RESULTS SHEET VIEW */
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100 text-center" id="quiz-result-sheet">
          <div className="mb-6">
            {percentage >= 80 ? (
              <div className="inline-block p-4 bg-emerald-100 text-emerald-800 rounded-full mb-3">
                <CheckCircle2 className="w-16 h-16 animate-bounce" />
              </div>
            ) : percentage >= 50 ? (
              <div className="inline-block p-4 bg-yellow-101 text-yellow-800 rounded-full mb-3">
                <Award className="w-16 h-16 text-yellow-500 animate-pulse" />
              </div>
            ) : (
              <div className="inline-block p-4 bg-rose-100 text-rose-800 rounded-full mb-3">
                <AlertTriangle className="w-16 h-16 text-rose-600" />
              </div>
            )}

            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              {percentage >= 80 ? "उत्कृष्ट प्रदर्शन!" : percentage >= 50 ? "अच्छा प्रयास!" : "और अभ्यास की आवश्यकता है"}
            </h3>
            <p className="text-slate-500 text-sm mt-1">कक्षा 10 बोर्ड परीक्षा स्व-मूल्यांकन </p>
          </div>

          {/* Marks Meter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto my-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <span className="text-xs text-slate-500 font-bold block">प्राप्तांक</span>
              <strong className="text-2xl sm:text-3xl font-black text-indigo-600">{score} / {totalQuestions}</strong>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <span className="text-xs text-slate-500 font-bold block">प्रतिशत</span>
              <strong className="text-2xl sm:text-3xl font-black text-emerald-600">{percentage}%</strong>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <span className="text-xs text-slate-500 font-bold block">सटीकता</span>
              <strong className="text-2xl sm:text-3xl font-black text-amber-600">
                {answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0}%
              </strong>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <span className="text-xs text-slate-500 font-bold block">सॉल्वड</span>
              <strong className="text-2xl sm:text-3xl font-black text-slate-700">{answeredCount} / {totalQuestions}</strong>
            </div>
          </div>

          <button
            onClick={startNewQuiz}
            className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg transition transform hover:scale-103 active:scale-97 my-4 inline-flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>पुनः नए 15 प्रश्नों के संग शुरू करें (ऑटो-शफल)</span>
          </button>

          {/* DEEP ANALYSIS OF ALL ANSWERS */}
          <div className="text-left mt-8 border-t border-slate-200 pt-6">
            <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              विस्तृत उत्तर कुंजी और विश्लेषण (Solutions)
            </h4>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2" id="solutions-scroll-area">
              {shuffledQuestions.map((q, idx) => {
                const userAnsIdx = selectedAnswers[idx];
                const isCorrect = userAnsIdx === q.correctAnswerIndex;
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl border-l-4 ${
                      isCorrect 
                        ? "bg-emerald-50/50 border-emerald-500" 
                        : userAnsIdx === undefined 
                        ? "bg-amber-50/50 border-amber-500" 
                        : "bg-rose-50/50 border-rose-500"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h6 className="font-bold text-slate-800 text-sm sm:text-base leading-relaxed">
                        प्रश्न {idx + 1}: {q.question}
                      </h6>
                      {isCorrect ? (
                        <span className="text-emerald-600 bg-emerald-100 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> सही
                        </span>
                      ) : userAnsIdx === undefined ? (
                        <span className="text-amber-600 bg-amber-100 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                          <AlertTriangle className="w-3.5 h-3.5" /> अनसोल्वड
                        </span>
                      ) : (
                        <span className="text-rose-600 bg-rose-100 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                          <XCircle className="w-3.5 h-3.5" /> गलत
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs sm:text-sm">
                      <div className="p-2.5 bg-white/60 rounded-lg">
                        <span className="text-slate-500 block font-medium">आपका उत्तर:</span>
                        <span className={`font-bold ${isCorrect ? "text-emerald-700" : "text-rose-600"}`}>
                          {userAnsIdx !== undefined ? q.options[userAnsIdx] : "प्रयास नहीं किया"}
                        </span>
                      </div>
                      <div className="p-2.5 bg-white/60 rounded-lg">
                        <span className="text-slate-500 block font-medium">सही उत्तर:</span>
                        <span className="font-bold text-emerald-700">
                          {q.options[q.correctAnswerIndex]}
                        </span>
                      </div>
                    </div>

                    {q.explanation && (
                      <div className="mt-3 bg-indigo-50/50 p-2.5 rounded-lg text-xs font-medium text-slate-700 border-l-2 border-indigo-300">
                        📒 <strong>हल की व्याख्या:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
