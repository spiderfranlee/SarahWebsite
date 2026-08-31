import React, { useState } from "react";
import { BookOpen, Search, Sparkles, CheckCircle2, Bookmark, Flame } from "lucide-react";
import { operaticRepertoire, concertRepertoire, songCyclesRepertoire } from "../data";

export default function RepertoireView() {
  const [activeTab, setActiveTab] = useState<"opera" | "concert" | "song">("opera");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter operatic roles
  const filteredOpera = operaticRepertoire.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.composer.toLowerCase().includes(query) ||
      item.work.toLowerCase().includes(query) ||
      item.role.toLowerCase().includes(query) ||
      item.language.toLowerCase().includes(query)
    );
  });

  // Filter concert works
  const filteredConcert = concertRepertoire.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.composer.toLowerCase().includes(query) ||
      item.work.toLowerCase().includes(query) ||
      item.soloPart.toLowerCase().includes(query)
    );
  });

  // Group opera roles by composer
  const operaByComposer = filteredOpera.reduce((acc, curr) => {
    if (!acc[curr.composer]) acc[curr.composer] = [];
    acc[curr.composer].push(curr);
    return acc;
  }, {} as Record<string, typeof operaticRepertoire>);

  return (
    <section id="repertoire" className="py-24 bg-stone-900/40 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-gold-accent uppercase font-semibold block mb-2">
              VOCAL FACH & ROLES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
              Repertoire
            </h2>
            <div className="w-16 h-[2px] bg-gold-accent mt-4" />
          </div>

          {/* Repertoire Category Switcher */}
          <div className="flex items-center gap-1 bg-stone-950 p-1 border border-stone-800 rounded-sm">
            <button
              onClick={() => setActiveTab("opera")}
              className={`px-4 py-2 text-xs font-sans tracking-wider uppercase font-semibold rounded-sm transition-all ${
                activeTab === "opera"
                  ? "bg-gold-accent text-stone-950 shadow-md"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Operatic Roles
            </button>
            <button
              onClick={() => setActiveTab("concert")}
              className={`px-4 py-2 text-xs font-sans tracking-wider uppercase font-semibold rounded-sm transition-all ${
                activeTab === "concert"
                  ? "bg-gold-accent text-stone-950 shadow-md"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Concert & Oratorio
            </button>
            <button
              onClick={() => setActiveTab("song")}
              className={`px-4 py-2 text-xs font-sans tracking-wider uppercase font-semibold rounded-sm transition-all ${
                activeTab === "song"
                  ? "bg-gold-accent text-stone-950 shadow-md"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Song & Recital
            </button>
          </div>
        </div>

        {/* Live Search Filter Bar */}
        <div className="mb-10 max-w-md relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search composer, role, or opera..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-sm text-xs font-sans text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-accent transition-colors"
          />
        </div>

        {/* Tab 1: Operatic Roles */}
        {activeTab === "opera" && (
          <div className="space-y-10">
            {Object.keys(operaByComposer).length === 0 ? (
              <p className="text-stone-400 font-sans text-sm italic">No operatic roles found for "{searchQuery}".</p>
            ) : (
              Object.entries(operaByComposer).map(([composer, roles]) => (
                <div key={composer} className="bg-stone-950/80 border border-stone-800/80 p-6 md:p-8 rounded-sm shadow-xl">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 pb-3 mb-6 border-b border-stone-800 flex items-center justify-between">
                    <span>{composer}</span>
                    <span className="text-xs font-sans font-normal text-stone-500 tracking-wider">
                      {roles.length} {roles.length === 1 ? "Role" : "Roles"}
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="p-4 bg-stone-900/40 hover:bg-stone-900 border border-stone-800/60 hover:border-gold-accent/40 rounded-sm transition-all flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="font-serif text-lg font-bold text-stone-100">
                            {role.role}
                          </p>
                          <p className="text-xs font-sans italic text-stone-400 mt-0.5">
                            {role.work}
                          </p>
                          <p className="text-[11px] font-sans text-stone-500 mt-1">
                            Language: <span className="text-stone-300">{role.language}</span>
                          </p>
                        </div>

                        <span
                          className={`text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-xs shrink-0 border ${
                            role.status === "Performed"
                              ? "bg-gold-accent/10 text-gold-accent border-gold-accent/40"
                              : role.status === "In Repertoire"
                              ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/40"
                              : role.status === "Covered"
                              ? "bg-stone-800 text-stone-300 border-stone-700"
                              : "bg-stone-900 text-stone-400 border-stone-800"
                          }`}
                        >
                          {role.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Concert & Oratorio */}
        {activeTab === "concert" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredConcert.map((item) => (
              <div
                key={item.id}
                className="bg-stone-950/80 border border-stone-800 p-6 rounded-sm hover:border-gold-accent/40 transition-all shadow-xl"
              >
                <span className="text-xs font-sans tracking-widest text-gold-accent font-semibold uppercase block mb-1">
                  {item.composer}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
                  {item.work}
                </h3>
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-300">
                  <span className="text-stone-400 font-sans">Solo Part:</span>
                  <span className="font-semibold text-stone-200">{item.soloPart}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Song & Recital */}
        {activeTab === "song" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {songCyclesRepertoire.map((sc) => (
              <div
                key={sc.id}
                className="bg-stone-950/80 border border-stone-800 p-6 md:p-8 rounded-sm shadow-xl hover:border-gold-accent/40 transition-all"
              >
                <span className="text-xs font-sans tracking-widest text-gold-accent font-semibold uppercase block mb-1">
                  {sc.composer}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-100 mb-4 pb-3 border-b border-stone-800">
                  {sc.cycle}
                </h3>
                <p className="text-xs text-stone-400 font-sans uppercase tracking-widest mb-3">
                  Repertoire Highlights:
                </p>
                <ul className="space-y-2">
                  {sc.highlights.map((h, i) => (
                    <li key={i} className="text-sm font-sans text-stone-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
