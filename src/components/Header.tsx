import React from "react";
import { BookOpen, Users, Lock, Unlock, Sliders, Home, Tv, Headphones } from "lucide-react";

interface HeaderProps {
  activeTab: "home" | "signLanguage" | "audiobook" | "dev" | "admin";
  setActiveTab: (tab: "home" | "signLanguage" | "audiobook" | "dev" | "admin") => void;
  isAdminLocked: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  isAdminLocked,
}: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-teal-600 via-indigo-600 to-rose-600 text-white shadow-xl rounded-b-2xl border-b-4 border-yellow-400 select-none">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Title and Logo */}
        <div 
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-3 cursor-pointer group text-center md:text-left"
          id="header-brand-container"
        >
          <div className="p-3 bg-white text-indigo-700 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <BookOpen className="w-8 h-8 md:w-10 md:h-10 animate-pulse text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-yellow-300 drop-shadow">
              कक्षा 10 लर्निंग प्लेटफ़ॉर्म
            </h1>
          </div>
        </div>

        {/* Accessibility and Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4" id="header-settings-nav">
          
          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-black/25 p-1 rounded-xl">
            <button
              id="nav-home"
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg font-bold transition-all duration-200 text-xs md:text-sm ${
                activeTab === "home"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>मुख्य पृष्ठ</span>
            </button>

            <button
              id="nav-sign-language"
              onClick={() => setActiveTab("signLanguage")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg font-bold transition-all duration-200 text-xs md:text-sm ${
                activeTab === "signLanguage"
                  ? "bg-white text-emerald-800 shadow-md animate-pulse"
                  : "text-emerald-100 hover:bg-white/10"
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>सांकेतिक भाषा</span>
            </button>

            <button
              id="nav-audiobook"
              onClick={() => setActiveTab("audiobook")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg font-bold transition-all duration-200 text-xs md:text-sm ${
                activeTab === "audiobook"
                  ? "bg-white text-indigo-900 shadow-md"
                  : "text-white/95 hover:bg-white/10"
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>ऑडियोबुक</span>
            </button>

            <button
              id="nav-dev"
              onClick={() => setActiveTab("dev")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg font-bold transition-all duration-200 text-xs md:text-sm ${
                activeTab === "dev"
                  ? "bg-white text-rose-700 shadow-md"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>डेवलपर टीम</span>
            </button>

            <button
              id="nav-admin"
              onClick={() => setActiveTab("admin")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg font-bold transition-all duration-200 text-xs md:text-sm ${
                activeTab === "admin"
                  ? "bg-white text-emerald-700 shadow-md"
                  : "text-white/90 hover:bg-white/10"
              } relative`}
            >
              {isAdminLocked ? (
                <Lock className="w-4 h-4 text-red-400" />
              ) : (
                <Unlock className="w-4 h-4 text-emerald-400 animate-bounce" />
              )}
              <span>एडमिन पैनल</span>
              {isAdminLocked && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </button>
          </nav>
        </div>

      </div>
    </header>
  );
}
