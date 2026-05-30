import React from "react";
import { BookOpen, Users, Lock, Unlock, Sliders, Type, Home } from "lucide-react";

interface HeaderProps {
  activeTab: "home" | "dev" | "admin";
  setActiveTab: (tab: "home" | "dev" | "admin") => void;
  isAdminLocked: boolean;
  fontSizeScale: "normal" | "large" | "xlarge";
  setFontSizeScale: (scale: "normal" | "large" | "xlarge") => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  isAdminLocked,
  fontSizeScale,
  setFontSizeScale,
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
            <p className="text-xs md:text-sm font-medium text-emerald-100 uppercase tracking-widest mt-0.5">
              बोर्ड परीक्षा 2026 स्पेशल • सर्वोत्तम तैयारी द्वार
            </p>
          </div>
        </div>

        {/* Accessibility and Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4" id="header-settings-nav">
          
          {/* Font Scaling Options */}
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 text-xs md:text-sm">
            <Type className="w-4 h-4 text-yellow-300" />
            <span className="font-bold text-white hidden sm:inline">फ़ॉन्ट आकार:</span>
            <div className="flex bg-black/20 rounded-lg p-0.5 gap-1">
              <button
                onClick={() => setFontSizeScale("normal")}
                className={`px-2 py-1 rounded-md font-bold transition-all ${
                  fontSizeScale === "normal"
                    ? "bg-yellow-400 text-slate-900"
                    : "hover:bg-white/10"
                }`}
                title="सामान्य फ़ॉन्ट (Normal Text)"
              >
                16px
              </button>
              <button
                onClick={() => setFontSizeScale("large")}
                className={`px-2 py-1 rounded-md font-bold transition-all ${
                  fontSizeScale === "large"
                    ? "bg-yellow-400 text-slate-900"
                    : "hover:bg-white/10"
                }`}
                title="बड़ा फ़ॉन्ट (20px Text)"
              >
                20px
              </button>
              <button
                onClick={() => setFontSizeScale("xlarge")}
                className={`px-2 py-1 rounded-md font-bold transition-all ${
                  fontSizeScale === "xlarge"
                    ? "bg-yellow-400 text-slate-900"
                    : "hover:bg-white/10"
                }`}
                title="विशेष बोर्ड फ़ॉन्ट (24px Text)"
              >
                24px
              </button>
            </div>
          </div>

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
