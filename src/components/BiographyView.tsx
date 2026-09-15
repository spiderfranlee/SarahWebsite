import React from "react";
import { artistData } from "../data";

interface BiographyViewProps {
  portraitImage: string;
}

export default function BiographyView({ portraitImage }: BiographyViewProps) {

  return (
    <section id="about" className="py-24 bg-white border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-sans tracking-[0.3em] text-gold-700 uppercase font-bold block mb-2">
            ABOUT & BIOGRAPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            About Sarah Guilmartin Lavery
          </h2>
          <div className="w-16 h-[2px] bg-gold-500 mt-4" />
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Press Kit Widget */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold-100 to-navy-100 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition duration-500" />
              <div className="relative overflow-hidden rounded-md border border-stone-200 shadow-xl bg-white aspect-[4/5]">
                <img
                  src={portraitImage}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1920&q=85") {
                      target.src = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1920&q=85";
                    }
                  }}
                  alt="Sarah Guilmartin Lavery - Irish Lyric Soprano Portrait"
                  className="w-full h-full object-cover object-[center_top] sm:object-[center_12%] group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent p-6 text-white">
                  <p className="font-serif text-xl font-bold text-white">
                    Sarah Guilmartin Lavery
                  </p>
                  <p className="text-xs font-sans tracking-widest text-gold-300 uppercase font-bold">
                    Irish Lyric Soprano
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Multi-Section Narrative */}
          <div className="lg:col-span-7 space-y-8">
            {/* Opening Intro Callout */}
            <div className="p-6 bg-gold-50/70 border-l-4 border-gold-500 rounded-r-md border border-gold-100/80 shadow-xs">
              <p className="font-serif italic text-lg sm:text-xl text-stone-900 leading-relaxed">
                "{artistData.shortBio}"
              </p>
            </div>

            {/* Narrative Sections */}
            {artistData.bioSections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
                  {section.title}
                </h3>
                <div className="space-y-4 text-stone-700 font-sans text-sm sm:text-base leading-relaxed">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
