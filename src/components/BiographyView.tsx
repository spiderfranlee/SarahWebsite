import React from "react";
import { Download, Award, Music2, BookOpen, FileText, CheckCircle2 } from "lucide-react";
import { artistData } from "../data";

interface BiographyViewProps {
  portraitImage: string;
}

export default function BiographyView({ portraitImage }: BiographyViewProps) {
  const awardsList = [
    { name: "Bernadette Greevy Vocal Bursary", org: "National Concert Hall Dublin", year: "2024" },
    { name: "Gervase Elwes Memorial Cup", org: "Feis Ceoil Dublin", year: "2023" },
    { name: "Irish National Opera Young Artist Associate", org: "Irish National Opera", year: "2023-2025" },
    { name: "First Prize in Bel Canto & German Lieder", org: "Veronica Dunne Singing Bursary", year: "2023" }
  ];

  return (
    <section id="biography" className="py-24 bg-stone-900/50 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-sans tracking-[0.3em] text-gold-accent uppercase font-semibold block mb-2">
            BIOGRAPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
            About Sarah Lavery
          </h2>
          <div className="w-16 h-[2px] bg-gold-accent mt-4" />
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Press Kit Widget */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold-accent/20 to-stone-800 rounded-sm blur-md opacity-50 group-hover:opacity-80 transition duration-500" />
              <div className="relative overflow-hidden rounded-sm border border-stone-700/80 shadow-2xl bg-stone-950 aspect-[4/5]">
                <img
                  src={portraitImage}
                  alt="Sarah Lavery - Irish Lyric Soprano Portrait"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent p-6">
                  <p className="font-serif text-lg font-bold text-stone-100">
                    Sarah Lavery
                  </p>
                  <p className="text-xs font-sans tracking-widest text-gold-accent uppercase">
                    Irish Lyric Soprano
                  </p>
                </div>
              </div>
            </div>

            {/* Press Kit & Downloads Widget */}
            <div className="bg-stone-950/90 border border-stone-800 p-6 rounded-sm shadow-xl">
              <h3 className="font-serif text-lg font-bold text-stone-200 mb-2 flex items-center gap-2">
                <FileText size={18} className="text-gold-accent" />
                <span>Press Kit & Downloads</span>
              </h3>
              <p className="text-xs text-stone-400 font-sans leading-relaxed mb-5">
                Download official high-resolution headshots, promoter biography, and complete repertoire list.
              </p>

              <div className="space-y-2.5">
                <a
                  href="#download-bio-pdf"
                  onClick={(e) => {
                    e.preventDefault();
                    window.print();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-gold-accent/50 text-stone-300 hover:text-white text-xs font-sans tracking-wider rounded-sm transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Download size={14} className="text-gold-accent group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Full Biography (PDF)</span>
                  </span>
                  <span className="text-[10px] text-stone-500">PDF</span>
                </a>

                <a
                  href="#download-repertoire"
                  onClick={(e) => {
                    e.preventDefault();
                    window.print();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-gold-accent/50 text-stone-300 hover:text-white text-xs font-sans tracking-wider rounded-sm transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Download size={14} className="text-gold-accent group-hover:translate-y-0.5 transition-transform" />
                    <span>Complete Repertoire & CV</span>
                  </span>
                  <span className="text-[10px] text-stone-500">PDF</span>
                </a>

                <a
                  href="#download-headshots"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(portraitImage, "_blank");
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-gold-accent/50 text-stone-300 hover:text-white text-xs font-sans tracking-wider rounded-sm transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Download size={14} className="text-gold-accent group-hover:translate-y-0.5 transition-transform" />
                    <span>High-Res Promoter Headshots</span>
                  </span>
                  <span className="text-[10px] text-stone-500">ZIP / JPG</span>
                </a>
              </div>
            </div>

            {/* Awards & Bursaries */}
            <div className="bg-stone-950/90 border border-stone-800 p-6 rounded-sm shadow-xl">
              <h3 className="font-serif text-lg font-bold text-stone-200 mb-4 flex items-center gap-2">
                <Award size={18} className="text-gold-accent" />
                <span>Awards & Distinctions</span>
              </h3>
              <div className="space-y-3">
                {awardsList.map((award, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs border-b border-stone-800/60 pb-3 last:border-0 last:pb-0">
                    <CheckCircle2 size={14} className="text-gold-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-stone-200">{award.name}</p>
                      <p className="text-stone-400 text-[11px]">{award.org} · <span className="text-gold-accent">{award.year}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Section Narrative */}
          <div className="lg:col-span-7 space-y-8">
            {/* Opening Intro Callout */}
            <div className="p-6 bg-stone-950 border-l-4 border-gold-accent rounded-r-sm">
              <p className="font-serif italic text-lg sm:text-xl text-stone-200 leading-relaxed">
                "{artistData.shortBio}"
              </p>
            </div>

            {/* Narrative Sections */}
            {artistData.bioSections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-stone-100 tracking-wide flex items-center gap-3">
                  <span className="text-xs font-sans tracking-widest text-gold-accent font-bold">
                    0{idx + 1}
                  </span>
                  <span>{section.title}</span>
                </h3>
                <div className="space-y-4 text-stone-300 font-sans text-sm sm:text-base leading-relaxed">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Experience Pills */}
            <div className="pt-6 border-t border-stone-800">
              <h4 className="text-xs font-sans tracking-widest text-gold-accent uppercase font-bold mb-4">
                Featured Companies & Venues
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Irish National Opera",
                  "Wexford Festival Opera",
                  "National Symphony Orchestra",
                  "National Concert Hall Dublin",
                  "RTÉ Concert Orchestra",
                  "Bord Gáis Energy Theatre",
                  "Cork Opera House",
                  "Royal Opera House ROH Guild",
                  "Irish Baroque Orchestra"
                ].map((venue, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-stone-950 text-stone-300 border border-stone-800 text-xs font-sans rounded-sm hover:border-gold-accent/60 transition-colors"
                  >
                    {venue}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
