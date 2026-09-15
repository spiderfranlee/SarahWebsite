import React from "react";
import { Calendar, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { artistData } from "../data";

interface HeroProps {
  heroImage: string;
  onNavigate: (section: string) => void;
  onPlayAria?: () => void;
}

export default function Hero({ heroImage, onNavigate }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] md:min-h-screen flex items-end pb-16 md:pb-24 pt-32 overflow-hidden bg-[#FAF8F5]"
    >
      {/* Background Image Container with Luminous High-Key Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          id="main-hero-portrait"
          src={heroImage}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1920&q=85") {
              target.src = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1920&q=85";
            }
          }}
          alt="Sarah Guilmartin Lavery - Irish Lyric Soprano"
          className="w-full h-full object-cover object-[center_top] sm:object-[center_8%] md:object-[right_top] lg:object-[82%_6%] opacity-90 md:opacity-95 scale-100 transition-all duration-700"
          referrerPolicy="no-referrer"
        />

        {/* Luminous Light Vignette Gradients for Crisp High-Contrast Editorial Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent md:w-3/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-[#FAF8F5]/20 to-[#FAF8F5]/70" />
      </div>

      {/* Hero Content Overlay */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="max-w-3xl">
          {/* Artist Large Display Name */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic font-normal tracking-tight text-navy-800 leading-[1.02] mb-5">
            Sarah Guilmartin <br />
            Lavery
          </h1>

          {/* Subtitle / Critical Quote */}
          <div className="mb-8 border-l-3 border-gold-500 pl-4 py-1.5 bg-white/60 backdrop-blur-xs rounded-r max-w-2xl shadow-2xs">
            <p className="font-serif italic text-stone-900 text-lg sm:text-xl md:text-2xl font-normal tracking-wide leading-relaxed">
              “{artistData.headlineQuote}”
            </p>
            {artistData.headlineQuoteSource && (
              <span className="block font-sans text-xs sm:text-sm tracking-wider uppercase text-gold-700 font-bold mt-1">
                — {artistData.headlineQuoteSource}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-schedule-btn"
              onClick={() => onNavigate("events")}
              className="px-6 py-3.5 bg-navy-800 hover:bg-navy-900 text-white text-xs font-sans tracking-[0.2em] font-bold uppercase transition-all duration-300 rounded shadow-md shadow-navy-950/20 border border-navy-700/50 flex items-center gap-2 group cursor-pointer"
            >
              <Calendar size={15} className="text-gold-300" />
              <span>Upcoming Engagements</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-gold-300" />
            </button>

            <button
              id="hero-bio-btn"
              onClick={() => onNavigate("about")}
              className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-900 hover:text-navy-950 text-xs font-sans tracking-[0.2em] font-bold uppercase transition-all duration-300 border border-stone-300 hover:border-gold-300 rounded shadow-xs cursor-pointer"
            >
              Read Biography
            </button>
          </div>

          {/* Next Performance Notice Badge */}
          <div className="mt-10 pt-6 border-t border-stone-300/80 flex flex-wrap items-center gap-3 text-xs text-stone-700 bg-white/70 backdrop-blur-sm p-3.5 rounded-md border border-stone-200/80 shadow-xs">
            <span className="inline-flex items-center gap-1.5 text-gold-700 font-bold tracking-wider uppercase text-[10px]">
              <Sparkles size={13} className="text-gold-600" /> Upcoming Engagements:
            </span>
            <span className="text-navy-950 font-semibold">
              <em>Carmen</em> · Irish National Opera
            </span>
            <span className="hidden sm:inline text-stone-400">•</span>
            <span className="text-stone-600">Bord Gáis Energy Theatre (2, 4, 6, 7 Nov)</span>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={() => onNavigate("about")}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-stone-500 hover:text-navy-800 transition-colors flex flex-col items-center gap-1 text-[10px] tracking-widest uppercase z-10 font-bold cursor-pointer"
        aria-label="Scroll down to Biography"
      >
        <span className="opacity-80">Explore</span>
        <ChevronDown size={16} className="animate-bounce text-gold-600" />
      </button>
    </section>
  );
}
