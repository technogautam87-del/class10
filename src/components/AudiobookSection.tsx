import React, { useState } from "react";
import { Headphones, BookOpen, Volume2, Globe, ExternalLink, Sparkles, Award, Star } from "lucide-react";

interface AudiobookBook {
  id: string;
  title: string;
  subject: string;
  medium: "Hindi" | "English" | "Sanskrit";
  chaptersCount: number;
  description: string;
  cietUrl: string;
  gradient: string;
  chapters: { name: string; url: string }[];
}

const CLASS_10_AUDIOBOOKS: AudiobookBook[] = [
  {
    id: "science-hi",
    title: "विज्ञान (कक्षा 10)",
    subject: "Science",
    medium: "Hindi",
    chaptersCount: 16,
    description: "कक्षा 10 के विज्ञान विषय की सम्पूर्ण पाठ्यपुस्तक का सस्वर ऑडियो संस्करण। रासायनिक अभिक्रियाएं, कार्बन, धातु-अधातु, जैव प्रक्रम आदि पाठों का विस्तृत वाचन।",
    cietUrl: "https://ciet.ncert.gov.in/audio-books",
    gradient: "from-emerald-500 to-teal-600",
    chapters: [
      { name: "अध्याय 1: रासायनिक अभिक्रियाएं एवं समीकरण", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 2: अम्ल, क्षारक एवं लवण", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 3: धातु एवं अधातु", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 4: कार्बन एवं उसके यौगिक", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 5: तत्वों का आवर्त वर्गीकरण", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 6: जैव प्रक्रम", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 7: नियंत्रण एवं समन्वय", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 8: जीव जनन कैसे करते हैं?", url: "https://ciet.ncert.gov.in/audio-books" }
    ]
  },
  {
    id: "math-hi",
    title: "गणित (कक्षा 10)",
    subject: "Mathematics",
    medium: "Hindi",
    chaptersCount: 15,
    description: "गणित विषय के प्रत्येक सूत्र, सिद्धांत और प्रमेयों के व्याख्यान का आसान भाषा में प्रस्तुत ऑडियो गाइड।",
    cietUrl: "https://ciet.ncert.gov.in/audio-books",
    gradient: "from-indigo-500 to-blue-600",
    chapters: [
      { name: "अध्याय 1: वास्तविक संख्याएं", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 2: बहुपद", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 3: दो चर वाले रैखिक समीकरण", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 4: द्विघात समीकरण", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 5: समांतर श्रेढ़ियां", url: "https://ciet.ncert.gov.in/audio-books" }
    ]
  },
  {
    id: "history-hi",
    title: "भारत और समकालीन विश्व-II (इतिहास)",
    subject: "History",
    medium: "Hindi",
    chaptersCount: 5,
    description: "यूरोप में राष्ट्रवाद, भारत में राष्ट्रवाद, भूमंडलीकृत विश्व का बनना और औद्योगिकीकरण के युग का सजीव ऑडियो प्रसारण।",
    cietUrl: "https://ciet.ncert.gov.in/audio-books",
    gradient: "from-amber-600 to-orange-700",
    chapters: [
      { name: "अध्याय 1: यूरोप में राष्ट्रवाद का उदय", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 2: भारत में राष्ट्रवाद", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 3: भूमंडलीकृत विश्व का बनना", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 4: औद्योगिकीकरण का युग", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 5: मुद्रण संस्कृति और आधुनिक दुनिया", url: "https://ciet.ncert.gov.in/audio-books" }
    ]
  },
  {
    id: "geography-hi",
    title: "समकालीन भारत-II (भूगोल)",
    subject: "Geography",
    medium: "Hindi",
    chaptersCount: 7,
    description: "संसाधन एवं विकास, वन और वन्यजीव, जल संसाधन, कृषि, खनिज ऊर्जा संसाधन तथा राष्ट्रीय अर्थव्यवस्था की जीवन रेखाओं का वाचन।",
    cietUrl: "https://ciet.ncert.gov.in/audio-books",
    gradient: "from-rose-500 to-amber-600",
    chapters: [
      { name: "अध्याय 1: संसाधन एवं विकास", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 2: वन एवं वन्य जीव संसाधन", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 3: जल संसाधन", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 4: कृषि", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 5: खनिज तथा ऊर्जा संसाधन", url: "https://ciet.ncert.gov.in/audio-books" }
    ]
  },
  {
    id: "civics-hi",
    title: "लोकतांत्रिक राजनीति-II (नागरिक शास्त्र)",
    subject: "Civics",
    medium: "Hindi",
    chaptersCount: 8,
    description: "सत्ता की साझेदारी, संघवाद, लोकतंत्र और विविधता, जाति धर्म और लैंगिक मसले, जन-संघर्ष और लोकतंत्र के परिणामों का सुगम श्रवण।",
    cietUrl: "https://ciet.ncert.gov.in/audio-books",
    gradient: "from-cyan-500 to-blue-600",
    chapters: [
      { name: "अध्याय 1: सत्ता की साझेदारी", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 2: संघवाद", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 3: लोकतंत्र और विविधता", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 4: जाति, धर्म और लैंगिक मसले", url: "https://ciet.ncert.gov.in/audio-books" }
    ]
  },
  {
    id: "economics-hi",
    title: "आर्थिक विकास की समझ (अर्थशास्त्र)",
    subject: "Economics",
    medium: "Hindi",
    chaptersCount: 5,
    description: "सकल घरेलू उत्पाद, विकास की अवधारणा, भारतीय अर्थव्यवस्था के क्षेत्रक, मुद्रा और साख तथा वैश्वीकरण का सरल विश्लेषण।",
    cietUrl: "https://ciet.ncert.gov.in/audio-books",
    gradient: "from-fuchsia-600 to-rose-600",
    chapters: [
      { name: "अध्याय 1: विकास", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 2: भारतीय अर्थव्यवस्था के क्षेत्रक", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 3: मुद्रा और साख", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "अध्याय 4: वैश्वीकरण और भारतीय अर्थव्यवस्था", url: "https://ciet.ncert.gov.in/audio-books" }
    ]
  },
  {
    id: "hindi-kshitij",
    title: "क्षितिज भाग-II (हिंदी)",
    subject: "Hindi Literature",
    medium: "Hindi",
    chaptersCount: 17,
    description: "हिंदी क्षितिज पुस्तक के काव्य खण्ड (सूरदास, तुलसीदास, सूर्यकांत त्रिपाठी निराला जी) एवं गद्य खण्ड (नेताजी का चश्मा, बालगोबिन भगत) का भावपूर्ण सस्वर ऑडियो पाठ।",
    cietUrl: "https://ciet.ncert.gov.in/audio-books",
    gradient: "from-yellow-500 to-amber-600",
    chapters: [
      { name: "पाठ 1: सूरदास के पद", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "पाठ 2: राम-लक्ष्मण-परशुराम संवाद", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "पाठ 10: नेताजी का चश्मा", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "पाठ 11: बालगोबिन भगत", url: "https://ciet.ncert.gov.in/audio-books" }
    ]
  },
  {
    id: "english-flight",
    title: "First Flight (English)",
    subject: "English Literature",
    medium: "English",
    chaptersCount: 11,
    description: "Listen to masterfully read chapters including 'A Letter to God', 'Nelson Mandela: Long Walk to Freedom', and beautiful classic poetry with native pronunciation guidelines.",
    cietUrl: "https://ciet.ncert.gov.in/audio-books",
    gradient: "from-violet-500 to-indigo-600",
    chapters: [
      { name: "Chapter 1: A Letter to God / Dust of Snow", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "Chapter 2: Nelson Mandela: Long Walk to Freedom", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "Chapter 3: Two Stories about Flying", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "Chapter 4: From the Diary of Anne Frank", url: "https://ciet.ncert.gov.in/audio-books" }
    ]
  },
  {
    id: "sanskrit-shemushi",
    title: "शेमुषी - द्वितीय भाग (संस्कृत)",
    subject: "Sanskrit",
    medium: "Sanskrit",
    chaptersCount: 12,
    description: "कक्षा 10वीं शेमुषी ग्रन्थ के शुद्ध देववाणी उच्चारण, सुन्दर श्लोक सस्वर वाचन और उनके अर्थ की मधुर श्रव्य प्रस्तुति।",
    cietUrl: "https://ciet.ncert.gov.in/audio-books",
    gradient: "from-amber-500 to-rose-700",
    chapters: [
      { name: "प्रथमः पाठः: शुचिपर्यावरणम्", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "द्वितीयः पाठः: बुद्धिर्बलवती सदा", url: "https://ciet.ncert.gov.in/audio-books" },
      { name: "तृतीयः पाठः: व्यायामः सर्वदा पथ्यः", url: "https://ciet.ncert.gov.in/audio-books" }
    ]
  }
];

export default function AudiobookSection() {
  const [selectedMedium, setSelectedMedium] = useState<"All" | "Hindi" | "English" | "Sanskrit">("All");
  const [selectedBook, setSelectedBook] = useState<AudiobookBook | null>(null);

  const filteredBooks = selectedMedium === "All"
    ? CLASS_10_AUDIOBOOKS
    : CLASS_10_AUDIOBOOKS.filter(b => b.medium === selectedMedium);

  return (
    <div className="space-y-8" id="audiobook-portal">
      
      {/* Dynamic Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-950 to-amber-950 text-white p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden border-b-8 border-indigo-700">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none transform translate-x-6 -translate-y-6">
          <Headphones className="w-64 h-64 text-yellow-300 animate-pulse" />
        </div>
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Volume2 className="w-4 h-4 animate-bounce text-yellow-400" />
            <span>राष्ट्रीय डिजिटल ऑडियोबुक लाइब्रेरी (CIET NCERT)</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight font-sans tracking-tight">
            कक्षा 10वीं हेतु <span className="text-yellow-300">स्वर-अधिगम ऑडियोबुक्स</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-bold">
            चलते-फिरते, सुनते और सीखते हुए अपनी बोर्ड परीक्षा की तैयारी को उत्कृष्ट बनाएं। यहाँ कक्षा 10 वीं के लिए राष्ट्रीय शैक्षिक अनुसंधान और प्रशिक्षण परिषद (NCERT) और केन्द्रीय शैक्षिक प्रौद्योगिकी संस्थान (CIET) की आधिकारिक आवाज़ों में रिकॉर्ड की गई पुस्तकें सूचीबद्ध हैं।
          </p>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs sm:text-sm text-yellow-200 mt-4 leading-relaxed font-bold flex items-start gap-3">
            <Award className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-white block font-black text-sm mb-0.5">📜 आभार एवं क्रेडिट संदेश (Official Credit Roll):</span>
              यह पूरा का पूरा ऑडियोबुक अधिगम संग्रह <strong>एनसीईआरटी (NCERT) सी.आई.ई.टी. (CIET)</strong> की अधिकारिक वेबसाइट से लिया गया है और केवल छात्रों के शैक्षिक मार्ग दर्शन व नि:शुल्क परीक्षा तैयारी हेतु यहाँ सुगमता से सुव्यवस्थित रूपों में लिंक किया गया है।
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Playback Focus Mode - Left Column (Conditional) */}
        {selectedBook ? (
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6 animate-fade-in">
            <div className={`p-5 rounded-2xl bg-gradient-to-br ${selectedBook.gradient} text-white shadow-md relative`}>
              <button 
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 focus:ring-2 focus:ring-white transition"
                title="बंद करें"
              >
                ✕
              </button>
              
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-black uppercase">
                {selectedBook.medium} माध्यम
              </span>
              <h3 className="text-lg font-black mt-2 leading-snug">{selectedBook.title}</h3>
              <p className="text-xs text-white/80 mt-1 font-bold">{selectedBook.subject} पुस्तक • {selectedBook.chaptersCount} पाठ</p>
              
              <div className="flex justify-center my-6">
                <div className="w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center animate-pulse shadow-lg scale-110">
                  <Headphones className="w-8 h-8 text-indigo-600 animate-bounce" />
                </div>
              </div>

              <a 
                href={selectedBook.cietUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-slate-900 hover:bg-slate-100 font-black text-xs py-3 rounded-xl flex items-center justify-center gap-2 group transition"
              >
                <span>आधिकारिक ऑडियो प्लेयर खोलें</span>
                <ExternalLink className="w-3.5 h-3.5 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5 border-b pb-2">
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span>अध्याय संदर्भ सूची ({selectedBook.chapters.length} पाठ)</span>
              </h4>
              <p className="text-xs text-slate-500 leading-normal font-medium">
                एनसीईआरटी की वेबसाइट पर जाने के पश्चात, आप दिए गए अध्याय का चयन कर सीधे सस्वर पाठन सुन सकते हैं। कृपया अभ्यास हेतु नीचे किसी भी अध्याय पर क्लिक करें:
              </p>

              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                {selectedBook.chapters.map((ch, idx) => (
                  <a
                    key={idx}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-150 hover:bg-slate-100/80 hover:border-slate-300 text-xs font-black text-slate-700 transition"
                  >
                    <span>{ch.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center text-slate-500 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto text-2xl">
              🎧
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-sm">प्रवाहमान लाइब्रेरी प्लेयर</h4>
              <p className="text-xs text-slate-500 mt-1 font-bold">
                अध्यायों की सूची देखने और सीधे सुनने के लिए दाईं ओर दी गई किसी भी पुस्तक ब्लॉक के "अध्याय देखें और सुनें" या "सीधे सुनें" बटन पर क्लिक करने का कष्ट करें।
              </p>
            </div>
          </div>
        )}

        {/* Audiobook Category Grid - Right Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Quick Language Categorizer */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs sm:text-sm font-black text-slate-700 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>भाषा/माध्यम के आधार पर छानें (Filter):</span>
            </span>
            <div className="flex gap-1.5">
              {(["All", "Hindi", "English", "Sanskrit"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedMedium(m);
                    setSelectedBook(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                    selectedMedium === m
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  {m === "All" ? "सभी पुस्तकें" : m}
                </button>
              ))}
            </div>
          </div>

          {/* Book blocks grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredBooks.map((book) => {
              const isSelected = selectedBook?.id === book.id;
              return (
                <div
                  key={book.id}
                  className={`bg-white border rounded-3xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4 ${
                    isSelected ? "border-indigo-600 ring-2 ring-indigo-600/20 shadow-md" : "border-slate-200"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-black uppercase text-white px-2 py-0.5 rounded-md bg-gradient-to-r ${book.gradient}`}>
                        {book.medium} MEDIUM
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold">
                        📙 {book.chaptersCount} अध्यायों
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900 leading-snug">
                      {book.title}
                    </h4>

                    <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                      {book.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>अध्याय सूची</span>
                    </button>

                    <a
                      href={book.cietUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm shadow-yellow-400/10"
                    >
                      <span>सीधे सुनें</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
