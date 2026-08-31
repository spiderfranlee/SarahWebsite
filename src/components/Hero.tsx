import React from "react";
import { Calendar, Play, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { artistData } from "../data";

interface HeroProps {
  heroImage: string;
  onNavigate: (section: string) => void;
  onPlayAria: () => void;
  onOpenPhotoCustomizer: () => void;
}

export default function Hero({ heroImage, onNavigate, onPlayAria, onOpenPhotoCustomizer }: HeroProps) {
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
          alt="Sarah Lavery - Irish Lyric Soprano"
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
        {/* Floating Customizer Button */}
        <div className="absolute top-0 right-6 md:right-12 hidden sm:block">
          <button
            onClick={onOpenPhotoCustomizer}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200/90 rounded-full text-[11px] font-sans font-bold tracking-wider uppercase backdrop-blur-md shadow-xs transition-all hover:shadow-sm cursor-pointer"
            title="Upload custom portrait photo"
          >
            <Sparkles size={12} className="text-rose-600" />
            <span>Customize Hero Portrait</span>
          </button>
        </div>
        <div className="max-w-3xl">
          {/* Vocal Fach / Artist Designation matching deirdrehiggins.com */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 border border-amber-300/80 rounded-full mb-6 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span className="text-[11px] tracking-[0.3em] font-sans font-bold text-amber-800 uppercase">
              {artistData.tagline}
            </span>
          </div>

          {/* Artist Large Display Name */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-stone-950 leading-[0.98] mb-5">
            Sarah <br />
            <span className="italic font-normal text-rose-800">Lavery</span>
          </h1>

          {/* Subtitle / Critical Quote */}
          <p className="font-sans text-stone-800 text-base sm:text-lg md:text-xl font-normal tracking-wide max-w-2xl leading-relaxed mb-8 border-l-3 border-rose-600 pl-4 py-1 bg-white/40 backdrop-blur-xs rounded-r">
            "{artistData.headlineQuote}"
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-schedule-btn"
              onClick={() => onNavigate("events")}
              className="px-6 py-3.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-sans tracking-[0.2em] font-bold uppercase transition-all duration-300 rounded shadow-md shadow-rose-900/20 flex items-center gap-2 group cursor-pointer"
            >
              <Calendar size={15} />
              <span>Upcoming Engagements</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-play-aria-btn"
              onClick={onPlayAria}
              className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-900 text-xs font-sans tracking-[0.2em] font-bold uppercase transition-all duration-300 border border-stone-300 rounded shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Play size={14} className="text-rose-600 fill-rose-600" />
              <span>Listen to Arias</span>
            </button>

            <button
              id="hero-bio-btn"
              onClick={() => onNavigate("about")}
              className="px-5 py-3.5 text-stone-700 hover:text-rose-700 text-xs font-sans tracking-[0.2em] font-bold uppercase transition-colors cursor-pointer"
            >
              Read Biography
            </button>
          </div>

          {/* Next Performance Notice Badge */}
          <div className="mt-10 pt-6 border-t border-stone-300/80 flex flex-wrap items-center gap-3 text-xs text-stone-700 bg-white/60 backdrop-blur-sm p-3.5 rounded-md border border-stone-200/80 shadow-xs">
            <span className="inline-flex items-center gap-1.5 text-rose-700 font-bold tracking-wider uppercase text-[10px]">
              <Sparkles size={13} /> Upcoming Engagements:
            </span>
            <span className="text-stone-900 font-semibold">
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
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-stone-500 hover:text-rose-700 transition-colors flex flex-col items-center gap-1 text-[10px] tracking-widest uppercase z-10 font-bold cursor-pointer"
        aria-label="Scroll down to Biography"
      >
        <span className="opacity-80">Explore</span>
        <ChevronDown size={16} className="animate-bounce text-rose-600" />
      </button>
    </section>
  );
}
