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
      className="relative min-h-[92vh] md:min-h-screen flex items-end pb-16 md:pb-24 pt-32 overflow-hidden bg-stone-950"
    >
      {/* Background Image Container with Cinematic Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          id="main-hero-portrait"
          src={heroImage}
          alt="Sarah Lavery - Irish Lyric Soprano"
          className="w-full h-full object-cover object-center md:object-[center_28%] opacity-55 md:opacity-60 scale-100 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />

        {/* Multi-layered Deep Vignettes to guarantee high contrast typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-stone-950/30 to-stone-950/80" />
      </div>

      {/* Hero Content Overlay */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="max-w-3xl">
          {/* Vocal Fach / Artist Designation matching deirdrehiggins.com */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-stone-900/80 border border-gold-accent/40 rounded-full mb-5 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-gold-accent animate-ping" />
            <span className="text-[11px] tracking-[0.3em] font-sans font-semibold text-gold-accent uppercase">
              {artistData.tagline}
            </span>
          </div>

          {/* Artist Large Display Name */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-stone-100 leading-[1.05] mb-4">
            Sarah <br />
            <span className="italic font-normal text-stone-200">Lavery</span>
          </h1>

          {/* Subtitle / Critical Quote */}
          <p className="font-sans text-stone-300 text-base sm:text-lg md:text-xl font-light tracking-wide max-w-2xl leading-relaxed mb-8 border-l-2 border-gold-accent/70 pl-4 py-1">
            "{artistData.headlineQuote}"
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-schedule-btn"
              onClick={() => onNavigate("schedule")}
              className="px-6 py-3.5 bg-gold-accent hover:bg-[#d8b56f] text-stone-950 text-xs font-sans tracking-[0.2em] font-bold uppercase transition-all duration-300 rounded-sm shadow-xl flex items-center gap-2 group"
            >
              <Calendar size={15} />
              <span>Upcoming Engagements</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-play-aria-btn"
              onClick={onPlayAria}
              className="px-6 py-3.5 bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-sans tracking-[0.2em] font-semibold uppercase transition-all duration-300 border border-stone-700/80 rounded-sm backdrop-blur-md flex items-center gap-2 shadow-lg"
            >
              <Play size={14} className="text-gold-accent fill-gold-accent" />
              <span>Listen to Arias</span>
            </button>

            <button
              id="hero-bio-btn"
              onClick={() => onNavigate("biography")}
              className="px-5 py-3.5 text-stone-300 hover:text-gold-accent text-xs font-sans tracking-[0.2em] uppercase transition-colors"
            >
              Read Biography
            </button>
          </div>

          {/* Next Performance Notice Badge */}
          <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-wrap items-center gap-3 text-xs text-stone-400">
            <span className="inline-flex items-center gap-1.5 text-gold-accent font-semibold tracking-wider uppercase text-[10px]">
              <Sparkles size={13} /> Next Season:
            </span>
            <span className="text-stone-200 font-medium">
              Mimì in Puccini's <em>La Bohème</em> · Irish National Opera
            </span>
            <span className="hidden sm:inline text-stone-600">•</span>
            <span className="text-stone-400">Bord Gáis Energy Theatre, Dublin</span>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={() => onNavigate("biography")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-400 hover:text-gold-accent transition-colors flex flex-col items-center gap-1 text-[10px] tracking-widest uppercase z-10"
        aria-label="Scroll down to Biography"
      >
        <span className="opacity-70">Explore</span>
        <ChevronDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}
