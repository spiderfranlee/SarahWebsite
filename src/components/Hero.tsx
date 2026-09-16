import React from "react";
import { Calendar, ArrowRight, ChevronDown } from "lucide-react";
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
      {/* Background Image Container - Sarah placed to the right of the headline on mobile, and right half on desktop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Photo frame - cleanly positioned to the right on mobile (giving clearance for text) without any blur-inducing GPU layer transforms */}
        <div className="absolute right-[-2rem] sm:right-[-2.25rem] md:right-0 top-0 bottom-0 w-full md:w-[62%] lg:w-[54%] xl:w-[48%] h-full overflow-hidden">
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
            className="w-full h-full object-cover object-[0%_top] sm:object-[10%_top] md:object-[center_top] opacity-100"
            referrerPolicy="no-referrer"
          />

          {/* Desktop Left Edge Feathering */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-40 lg:w-56 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent pointer-events-none" />
        </div>

        {/* Mobile Left-Hand Text Ground: Cushions the headline text while leaving Sarah completely unobstructed */}
        <div className="md:hidden absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 via-75% to-transparent pointer-events-none" />

        {/* Desktop Left-Side Typography Backdrop */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-[45%] lg:w-[50%] bg-[#FAF8F5] pointer-events-none" />

        {/* Soft Bottom Transition */}
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/50 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="max-w-xl md:max-w-4xl">
          {/* Artist Large Display Name - Crisp Navy on parchment, strictly to the left of Sarah on mobile */}
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-8xl lg:text-9xl italic font-medium tracking-tight text-navy-950 leading-[1.05] mb-5 max-w-[200px] xs:max-w-[230px] sm:max-w-none">
            Sarah <br />
            Guilmartin <br />
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
