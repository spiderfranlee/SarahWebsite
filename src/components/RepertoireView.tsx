import React, { useState, useMemo } from "react";
import {
  Search,
  Music,
  BookOpen,
  Heart,
  Sparkles,
  CheckCircle2,
  X,
  FileText,
  Info,
  ChevronRight,
  Send
} from "lucide-react";
import {
  operaticRepertoire,
  concertRepertoire,
  songCyclesRepertoire,
  ceremonyMusicGuide,
  artistData
} from "../data";

interface RepertoireViewProps {
  onNavigateToContact?: (inquiryType?: string) => void;
}

type RepertoireTab = "opera" | "concert" | "song" | "ceremony";

export default function RepertoireView({ onNavigateToContact }: RepertoireViewProps) {
  const [activeTab, setActiveTab] = useState<RepertoireTab>("opera");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  // Opera languages for quick filter
  const operaLanguages = useMemo(() => {
    const langs = new Set<string>();
    operaticRepertoire.forEach((item) => {
      item.language.split("/").forEach((l) => langs.add(l.trim()));
    });
    return Array.from(langs);
  }, []);

  // Filter operatic roles
  const filteredOpera = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return operaticRepertoire.filter((item) => {
      const matchesLanguage =
        selectedLanguage === "all" ||
        item.language.toLowerCase().includes(selectedLanguage.toLowerCase());
      if (!matchesLanguage) return false;

      if (!query) return true;
      return (
        item.composer.toLowerCase().includes(query) ||
        item.work.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.language.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedLanguage]);

  // Filter concert works
  const filteredConcert = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return concertRepertoire;
    return concertRepertoire.filter((item) => {
      return (
        item.composer.toLowerCase().includes(query) ||
        item.work.toLowerCase().includes(query) ||
        item.soloPart.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  // Filter song cycles
  const filteredSongCycles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return songCyclesRepertoire;
    return songCyclesRepertoire.filter((sc) => {
      return (
        sc.composer.toLowerCase().includes(query) ||
        sc.cycle.toLowerCase().includes(query) ||
        sc.highlights.some((h) => h.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  // Filter ceremony music sections
  const filteredCeremonySections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return ceremonyMusicGuide.sections;
    return ceremonyMusicGuide.sections
      .map((sec) => {
        const stageMatches = sec.stage.toLowerCase().includes(query);
        const typeMatches = sec.performanceType?.toLowerCase().includes(query);
        const noteMatches = sec.note?.toLowerCase().includes(query);
        const matchingPieces = sec.pieces.filter((p) =>
          p.toLowerCase().includes(query)
        );

        if (stageMatches || typeMatches || noteMatches || matchingPieces.length > 0) {
          return {
            ...sec,
            pieces: stageMatches ? sec.pieces : (matchingPieces.length > 0 ? matchingPieces : sec.pieces)
          };
        }
        return null;
      })
      .filter((sec): sec is typeof ceremonyMusicGuide.sections[0] => sec !== null);
  }, [searchQuery]);

  // Group opera roles by composer
  const operaByComposer = useMemo(() => {
    return filteredOpera.reduce((acc, curr) => {
      if (!acc[curr.composer]) acc[curr.composer] = [];
      acc[curr.composer].push(curr);
      return acc;
    }, {} as Record<string, typeof operaticRepertoire>);
  }, [filteredOpera]);

  const handleContactClick = (type: string = "Wedding Ceremony") => {
    if (onNavigateToContact) {
      onNavigateToContact(type);
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="repertoire"
      className="py-24 bg-[#FAF8F5] border-t border-stone-200 relative text-stone-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-rose-700 uppercase font-bold block mb-2">
              VOCAL FACH & REPERTOIRE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
              Repertoire & Ceremony Guide
            </h2>
            <div className="w-16 h-[2px] bg-rose-600 mt-4" />
            <p className="text-sm font-sans text-stone-600 mt-3 max-w-2xl leading-relaxed">
              Explore Sarah's operatic roles, sacred oratorio works, song recitals, and
              the comprehensive ceremony music guide for church and civil services.
            </p>
          </div>

          {/* Download PDF or Direct Inquiry */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleContactClick("General Operatic / Recital")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-sans font-bold tracking-wider uppercase rounded-md shadow-sm transition-colors cursor-pointer"
            >
              <span>Booking Inquiries</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Repertoire Category Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-stone-200 pb-4">
          <button
            id="tab-repertoire-opera"
            onClick={() => setActiveTab("opera")}
            className={`px-4 py-2.5 text-xs font-sans tracking-wider uppercase font-bold rounded-md transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "opera"
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-950 border border-stone-200"
            }`}
          >
            <BookOpen size={14} className={activeTab === "opera" ? "text-amber-400" : "text-stone-500"} />
            <span>Operatic Roles</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === "opera" ? "bg-stone-800 text-stone-200" : "bg-stone-100 text-stone-600"
              }`}
            >
              {operaticRepertoire.length}
            </span>
          </button>

          <button
            id="tab-repertoire-ceremony"
            onClick={() => setActiveTab("ceremony")}
            className={`px-4 py-2.5 text-xs font-sans tracking-wider uppercase font-bold rounded-md transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "ceremony"
                ? "bg-rose-700 text-white shadow-sm"
                : "bg-white text-rose-800 hover:bg-rose-50 border border-rose-200"
            }`}
          >
            <Heart size={14} className={activeTab === "ceremony" ? "text-rose-200" : "text-rose-600"} />
            <span>Ceremony Music Guide</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "ceremony" ? "bg-rose-800 text-white" : "bg-rose-100 text-rose-800"
              }`}
            >
              Weddings & Services
            </span>
          </button>

          <button
            id="tab-repertoire-concert"
            onClick={() => setActiveTab("concert")}
            className={`px-4 py-2.5 text-xs font-sans tracking-wider uppercase font-bold rounded-md transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "concert"
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-950 border border-stone-200"
            }`}
          >
            <Music size={14} className={activeTab === "concert" ? "text-amber-400" : "text-stone-500"} />
            <span>Concert & Oratorio</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === "concert" ? "bg-stone-800 text-stone-200" : "bg-stone-100 text-stone-600"
              }`}
            >
              {concertRepertoire.length}
            </span>
          </button>

          <button
            id="tab-repertoire-song"
            onClick={() => setActiveTab("song")}
            className={`px-4 py-2.5 text-xs font-sans tracking-wider uppercase font-bold rounded-md transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "song"
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-950 border border-stone-200"
            }`}
          >
            <Sparkles size={14} className={activeTab === "song" ? "text-amber-400" : "text-stone-500"} />
            <span>Song & Recital</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === "song" ? "bg-stone-800 text-stone-200" : "bg-stone-100 text-stone-600"
              }`}
            >
              {songCyclesRepertoire.length}
            </span>
          </button>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === "ceremony"
                  ? "Search ceremony piece, composer, or stage (e.g. Ave Maria, Nella Fantasia, Offertory)..."
                  : activeTab === "opera"
                  ? "Search opera role, composer, or work (e.g. Mimì, Puccini, Zauberflöte)..."
                  : activeTab === "concert"
                  ? "Search oratorio, work, or composer (e.g. Messiah, Mozart, Fauré)..."
                  : "Search song cycle or title (e.g. Debussy, Strauss)..."
              }
              className="w-full pl-10 pr-10 py-3 bg-white border border-stone-300 rounded-md text-sm font-sans text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-500 shadow-xs transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 rounded cursor-pointer"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Secondary filter for Opera tab: Language */}
          {activeTab === "opera" && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans text-stone-500 uppercase tracking-wider font-semibold whitespace-nowrap">
                Language:
              </span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                aria-label="Filter by language"
                className="px-3 py-2.5 bg-white border border-stone-300 rounded-md text-xs font-sans font-semibold text-stone-700 focus:outline-none focus:border-rose-600 shadow-xs cursor-pointer"
              >
                <option value="all">All Languages</option>
                {operaLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* TAB 1: CEREMONY MUSIC GUIDE (High Priority for Weddings, Memorials, Sacred Services) */}
        {activeTab === "ceremony" && (
          <div className="space-y-10 animate-fadeIn">
            {/* Introductory Banner */}
            <div className="bg-gradient-to-br from-rose-50/80 via-white to-amber-50/40 border border-rose-200/80 rounded-xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-rose-200 rounded-full text-[11px] font-sans font-bold tracking-widest text-rose-700 uppercase mb-3 shadow-2xs">
                    <Heart size={12} className="text-rose-600" />
                    <span>Ceremony Music Guide</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    Structured Repertoire for Weddings & Sacred Services
                  </h3>
                  <p className="text-sm font-sans text-stone-700 mt-2 max-w-2xl leading-relaxed">
                    A curated selection of timeless classical, sacred, and contemporary vocal and
                    instrumental pieces tailored for each moment of your ceremony.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button
                    onClick={() => handleContactClick("Wedding Ceremony")}
                    className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-sans font-bold tracking-wider uppercase rounded-md shadow-sm transition-colors cursor-pointer text-center"
                  >
                    Inquire About Ceremony Music
                  </button>
                </div>
              </div>

              {/* Stage Jump Navigation Pills */}
              <div className="mt-6 pt-6 border-t border-stone-200/80 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-sans font-bold text-stone-500 uppercase tracking-wider mr-1">
                  Stages:
                </span>
                {ceremonyMusicGuide.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-xs font-sans font-semibold px-3 py-1 bg-white hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200 hover:border-rose-300 rounded-full transition-colors cursor-pointer shadow-2xs"
                  >
                    {sec.stage}
                  </a>
                ))}
              </div>
            </div>

            {/* Ceremony Sections Grid */}
            {filteredCeremonySections.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-stone-200">
                <p className="text-stone-600 font-sans text-base">
                  No ceremony pieces found matching "<strong>{searchQuery}</strong>".
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs font-sans font-bold text-rose-700 underline uppercase tracking-wider cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCeremonySections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:border-rose-300 hover:shadow-md transition-all flex flex-col"
                  >
                    {/* Card Header */}
                    <div className="bg-stone-50/80 border-b border-stone-200 px-6 py-4 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-serif text-xl font-bold text-stone-900 tracking-tight">
                          {section.stage}
                        </h4>
                      </div>
                      {section.performanceType && (
                        <span className="text-[11px] font-sans font-bold tracking-wider uppercase px-2.5 py-1 bg-white border border-stone-200 text-stone-700 rounded-full shadow-2xs">
                          {section.performanceType}
                        </span>
                      )}
                    </div>

                    {/* Card Body: Pieces List */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      {section.pieces.length > 0 ? (
                        <ul className="space-y-2.5">
                          {section.pieces.map((piece, pIdx) => {
                            const [title, composer] = piece.split("—").map((s) => s.trim());
                            return (
                              <li
                                key={pIdx}
                                className="flex items-start gap-3 text-sm font-sans group/item"
                              >
                                <span className="mt-1 w-2 h-2 rounded-full bg-rose-600 shrink-0 group-hover/item:scale-125 transition-transform" />
                                <div className="leading-snug">
                                  <span className="font-semibold text-stone-900">
                                    {title}
                                  </span>
                                  {composer && (
                                    <span className="text-stone-600 font-normal ml-1.5">
                                      — {composer}
                                    </span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}

                      {/* Note for section (e.g. Recessional) */}
                      {section.note && (
                        <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs font-sans text-stone-700 leading-relaxed flex items-start gap-2.5">
                          <Info size={15} className="text-amber-700 shrink-0 mt-0.5" />
                          <span>{section.note}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Notes for Couples Callout */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-4 max-w-3xl">
                  <div className="inline-flex items-center gap-2 text-xs font-sans tracking-widest text-amber-800 font-bold uppercase">
                    <Heart size={14} className="text-rose-700" />
                    <span>Notes for Couples</span>
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">
                    Personalized Ceremony Planning & Accompaniment
                  </h4>
                  <ul className="space-y-2.5 pt-1">
                    {ceremonyMusicGuide.notesForCouples.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-sans text-stone-700">
                        <CheckCircle2 size={16} className="text-amber-700 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleContactClick("Wedding Ceremony")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-950 text-white text-xs font-sans tracking-wider uppercase font-bold rounded-md shadow-sm transition-colors cursor-pointer"
                  >
                    <Send size={14} />
                    <span>Check Ceremony Availability</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPERATIC ROLES */}
        {activeTab === "opera" && (
          <div className="space-y-10 animate-fadeIn">
            {Object.keys(operaByComposer).length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-stone-200">
                <p className="text-stone-600 font-sans text-base">
                  No operatic roles found matching "<strong>{searchQuery}</strong>".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLanguage("all");
                  }}
                  className="mt-3 text-xs font-sans font-bold text-rose-700 underline uppercase tracking-wider cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              Object.keys(operaByComposer).map((composer) => {
                const roles = operaByComposer[composer];
                return (
                  <div
                    key={composer}
                    className="bg-white border border-stone-200 p-6 sm:p-8 rounded-xl shadow-xs"
                  >
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                    <div>
                      <span className="text-[11px] font-sans tracking-[0.25em] text-rose-700 font-bold uppercase block">
                        Composer
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                        {composer}
                      </h3>
                    </div>
                    <span className="text-xs font-sans font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
                      {roles.length} {roles.length === 1 ? "Role" : "Roles"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="p-5 bg-stone-50/70 hover:bg-white border border-stone-200 hover:border-rose-300 rounded-lg transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                              {role.role}
                            </h4>
                            <span
                              className={`text-[10px] tracking-wider uppercase font-bold px-2.5 py-0.5 rounded-full shrink-0 border ${
                                role.status === "Performed"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : role.status === "In Repertoire"
                                  ? "bg-rose-50 text-rose-800 border-rose-200"
                                  : role.status === "Covered"
                                  ? "bg-amber-50 text-amber-800 border-amber-200"
                                  : "bg-stone-100 text-stone-700 border-stone-200"
                              }`}
                            >
                              {role.status}
                            </span>
                          </div>
                          <p className="text-sm font-sans italic text-stone-700 font-medium">
                            {role.work}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs font-sans text-stone-500">
                          <span>Language:</span>
                          <span className="font-semibold text-stone-800">{role.language}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: CONCERT & ORATORIO */}
        {activeTab === "concert" && (
          <div className="space-y-6 animate-fadeIn">
            {filteredConcert.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-stone-200">
                <p className="text-stone-600 font-sans text-base">
                  No concert or oratorio works found matching "<strong>{searchQuery}</strong>".
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs font-sans font-bold text-rose-700 underline uppercase tracking-wider cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredConcert.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-stone-200 p-6 rounded-xl shadow-xs hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-sans tracking-widest text-rose-700 font-bold uppercase block mb-1">
                        {item.composer}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-stone-900 mb-2 leading-snug">
                        {item.work}
                      </h4>
                    </div>
                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-sans">
                      <span className="text-stone-500">Solo Part:</span>
                      <span className="font-bold text-stone-800 bg-stone-50 px-2.5 py-1 rounded border border-stone-200">
                        {item.soloPart}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SONG & RECITAL */}
        {activeTab === "song" && (
          <div className="space-y-6 animate-fadeIn">
            {filteredSongCycles.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-stone-200">
                <p className="text-stone-600 font-sans text-base">
                  No song cycles found matching "<strong>{searchQuery}</strong>".
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs font-sans font-bold text-rose-700 underline uppercase tracking-wider cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSongCycles.map((sc) => (
                  <div
                    key={sc.id}
                    className="bg-white border border-stone-200 p-6 sm:p-8 rounded-xl shadow-xs hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-sans tracking-widest text-rose-700 font-bold uppercase block mb-1">
                        {sc.composer}
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-stone-900 mb-4 pb-3 border-b border-stone-200">
                        {sc.cycle}
                      </h4>
                      <p className="text-xs text-stone-500 font-sans uppercase tracking-widest font-bold mb-3">
                        Repertoire Highlights:
                      </p>
                      <ul className="space-y-2">
                        {sc.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="text-sm font-sans text-stone-800 flex items-start gap-2.5 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-2" />
                            <span className="font-medium">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
