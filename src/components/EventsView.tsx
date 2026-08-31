import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  MapPin,
  ExternalLink,
  Clock,
  User,
  Filter,
  Heart,
  Music2,
  Sparkles,
  Building2,
  CheckCircle2,
  ChevronRight,
  Disc,
  Feather
} from "lucide-react";
import { scheduleData, weddingEventData, funeralEventData, corporateEventData } from "../data";

export type EventTabType = "upcoming" | "weddings" | "funeral" | "corporate";

interface EventsViewProps {
  activeTab?: EventTabType;
  onTabChange?: (tab: EventTabType) => void;
  onNavigateToContact?: (subjectPrefix?: string) => void;
}

export default function EventsView({
  activeTab = "upcoming",
  onTabChange,
  onNavigateToContact
}: EventsViewProps) {
  const [currentTab, setCurrentTab] = useState<EventTabType>(activeTab);
  const [selectedPerformanceFilter, setSelectedPerformanceFilter] = useState<string>("all");
  const [showPastPerformances, setShowPastPerformances] = useState<boolean>(false);

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const handleSwitchTab = (tab: EventTabType) => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Filter schedule events
  const filteredEvents = scheduleData.filter((event) => {
    const isPast = event.status === "Past Performance";
    if (showPastPerformances ? !isPast : isPast) return false;

    if (selectedPerformanceFilter === "all") return true;
    return event.category.toLowerCase() === selectedPerformanceFilter.toLowerCase();
  });

  return (
    <section id="events" className="py-24 bg-white border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-rose-700 uppercase font-bold block mb-2">
              ENGAGEMENTS & SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
              Events & Performances
            </h2>
            <div className="w-16 h-[2px] bg-rose-600 mt-4" />
          </div>

          <p className="text-stone-600 max-w-md text-sm font-sans leading-relaxed">
            From premier operatic stages and symphonic galas to bespoke weddings, sacred memorial services, and luxury corporate recitals.
          </p>
        </div>

        {/* Primary Events Sub-Navigation Menu matching user's requested hierarchy */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 p-1.5 bg-[#FAF8F5] border border-stone-200 rounded-lg mb-12 shadow-sm">
          <button
            id="events-tab-upcoming"
            onClick={() => handleSwitchTab("upcoming")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans tracking-wider uppercase rounded-md transition-all cursor-pointer ${
              currentTab === "upcoming"
                ? "bg-rose-700 text-white shadow-md font-bold"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 font-semibold"
            }`}
          >
            <CalendarIcon size={14} />
            <span>Upcoming Performances</span>
          </button>

          <button
            id="events-tab-weddings"
            onClick={() => handleSwitchTab("weddings")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans tracking-wider uppercase rounded-md transition-all cursor-pointer ${
              currentTab === "weddings"
                ? "bg-rose-700 text-white shadow-md font-bold"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 font-semibold"
            }`}
          >
            <Heart size={14} />
            <span>Weddings</span>
          </button>

          <button
            id="events-tab-funeral"
            onClick={() => handleSwitchTab("funeral")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans tracking-wider uppercase rounded-md transition-all cursor-pointer ${
              currentTab === "funeral"
                ? "bg-rose-700 text-white shadow-md font-bold"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 font-semibold"
            }`}
          >
            <Feather size={14} />
            <span>Funeral & Memorials</span>
          </button>

          <button
            id="events-tab-corporate"
            onClick={() => handleSwitchTab("corporate")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans tracking-wider uppercase rounded-md transition-all cursor-pointer ${
              currentTab === "corporate"
                ? "bg-rose-700 text-white shadow-md font-bold"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 font-semibold"
            }`}
          >
            <Building2 size={14} />
            <span>Corporate</span>
          </button>
        </div>

        {/* TAB 1: UPCOMING PERFORMANCES */}
        {currentTab === "upcoming" && (
          <div id="events-upcoming-content" className="space-y-8 animate-fadeIn">
            {/* Filters & Season Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-stone-500 font-sans uppercase tracking-widest font-bold flex items-center gap-1.5 mr-2">
                  <Filter size={13} /> Filter:
                </span>
                {[
                  { id: "all", label: "All Engagements" },
                  { id: "opera", label: "Opera Productions" },
                  { id: "concert", label: "Concerts & Galas" },
                  { id: "recital", label: "Solo Recitals" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedPerformanceFilter(tab.id)}
                    className={`px-3.5 py-1.5 text-xs font-sans tracking-wider rounded transition-all cursor-pointer ${
                      selectedPerformanceFilter === tab.id
                        ? "bg-rose-50 text-rose-700 border border-rose-300 font-bold"
                        : "bg-[#FAF8F5] text-stone-600 hover:text-stone-900 border border-stone-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Upcoming vs Past Toggle */}
              <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 border border-stone-200 rounded-md">
                <button
                  onClick={() => setShowPastPerformances(false)}
                  className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase rounded transition-all cursor-pointer ${
                    !showPastPerformances
                      ? "bg-white text-rose-700 shadow-2xs font-bold border border-stone-200"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Upcoming (2026/27)
                </button>
                <button
                  onClick={() => setShowPastPerformances(true)}
                  className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase rounded transition-all cursor-pointer ${
                    showPastPerformances
                      ? "bg-white text-rose-700 shadow-2xs font-bold border border-stone-200"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Past Archive
                </button>
              </div>
            </div>

            {/* Performance Event Cards */}
            {filteredEvents.length === 0 ? (
              <div className="py-16 text-center bg-[#FAF8F5] border border-stone-200 rounded-md">
                <p className="text-stone-600 font-serif text-lg">No performances found matching this selection.</p>
                <button
                  onClick={() => { setSelectedPerformanceFilter("all"); setShowPastPerformances(false); }}
                  className="mt-3 text-xs font-sans tracking-widest text-rose-700 uppercase font-bold underline cursor-pointer"
                >
                  View All Upcoming Season Performances
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="group bg-[#FAF8F5] hover:bg-rose-50/30 border border-stone-200 hover:border-rose-300 p-5 sm:p-6 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6"
                  >
                    {/* Left & Middle: Poster / Date & Production Details */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
                      {/* Event Poster / Stage Visual */}
                      {evt.imageUrl && (
                        <div className="relative w-full sm:w-32 h-36 sm:h-28 rounded-lg overflow-hidden shrink-0 border border-stone-300/80 shadow-2xs bg-stone-900">
                          <img
                            src={evt.imageUrl}
                            alt={evt.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] font-sans font-bold text-white tracking-wider uppercase truncate">
                              {evt.domain || evt.company}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Date Badge */}
                      <div className="w-full sm:w-36 shrink-0 border-l-3 border-rose-600 pl-3 sm:border-l-0 sm:pl-0 sm:text-center sm:bg-white sm:p-3 sm:border sm:border-stone-200 sm:rounded-lg shadow-2xs">
                        <span className="text-[11px] font-sans font-bold tracking-widest text-amber-700 uppercase block">
                          {evt.date.split(" ")[0]} {evt.date.split(" ")[2] || ""}
                        </span>
                        <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight block my-0.5">
                          {evt.date.split(" ")[1]?.replace(",", "") || evt.date}
                        </span>
                        {evt.time && (
                          <span className="text-[11px] font-sans text-stone-500 flex items-center justify-start sm:justify-center gap-1 font-medium">
                            <Clock size={11} /> {evt.time}
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] tracking-wider uppercase font-bold rounded-sm">
                            {evt.category}
                          </span>
                          <span className="text-xs font-sans tracking-wide text-stone-700 font-bold">
                            {evt.company}
                          </span>
                          {evt.domain && (
                            <span className="text-[11px] font-sans text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded font-mono">
                              {evt.domain}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-rose-700 transition-colors">
                          {evt.title}
                        </h3>

                        {/* Dates detail list */}
                        {evt.datesDetail && (
                          <p className="text-xs font-sans text-stone-600 font-semibold flex items-center gap-1.5">
                            <CalendarIcon size={12} className="text-rose-600 shrink-0" />
                            <span>Performance Dates: <strong className="text-stone-900 font-bold">{evt.datesDetail}</strong></span>
                          </p>
                        )}

                        {/* Performance Role & Custom Performer Note */}
                        <div className="space-y-1">
                          <p className="text-sm font-sans text-stone-800 flex items-center gap-1.5 font-medium">
                            <span className="text-rose-700 font-bold">Role:</span> {evt.role}
                          </p>
                          {evt.notes && (
                            <p className="text-xs font-sans text-stone-700 bg-rose-50/70 border-l-2 border-rose-500 px-2.5 py-1 rounded-r italic">
                              {evt.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-stone-500 pt-1">
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-rose-600 shrink-0" />
                            <span>{evt.venue}, {evt.city}</span>
                          </span>
                          {evt.conductor && (
                            <span className="flex items-center gap-1">
                              <User size={13} className="text-stone-400 shrink-0" />
                              <span>{evt.conductor}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Ticket / Booking Action */}
                    <div className="shrink-0 flex sm:flex-col items-end sm:items-center justify-between sm:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-200">
                      {evt.status === "Past Performance" ? (
                        <span className="px-4 py-2 bg-stone-100 border border-stone-200 text-stone-500 text-xs font-sans tracking-wider uppercase font-bold rounded">
                          Completed
                        </span>
                      ) : (
                        <a
                          href={evt.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-sans tracking-wider uppercase font-bold rounded-md transition-all shadow-xs hover:shadow-sm cursor-pointer whitespace-nowrap"
                        >
                          <span>{evt.status}</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                      {evt.domain && (
                        <a
                          href={evt.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-sans text-stone-600 hover:text-rose-700 transition-colors hidden sm:block underline decoration-stone-300"
                        >
                          {evt.domain}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WEDDINGS */}
        {currentTab === "weddings" && (
          <div id="events-weddings-content" className="space-y-12 animate-fadeIn">
            {/* Wedding Intro Banner */}
            <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50/60 border border-rose-200 p-8 sm:p-10 rounded-lg shadow-sm relative overflow-hidden">
              <div className="max-w-3xl relative z-10 space-y-4">
                <span className="text-xs font-sans tracking-[0.25em] text-rose-700 uppercase font-bold flex items-center gap-2">
                  <Heart size={14} className="fill-rose-700 text-rose-700" /> Wedding Ceremony & Drinks Reception Vocalist
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
                  {weddingEventData.title}
                </h3>
                <p className="text-stone-700 font-sans text-base leading-relaxed">
                  {weddingEventData.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => onNavigateToContact && onNavigateToContact("Wedding Ceremony Booking Inquiry")}
                    className="px-6 py-3 bg-rose-700 text-white text-xs font-sans tracking-widest uppercase font-bold rounded hover:bg-rose-800 transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Check Wedding Date & Inquire</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Ceremony Formats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {weddingEventData.ceremonyTypes.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] border border-stone-200 p-6 rounded-lg hover:border-rose-300 transition duration-300 space-y-3 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
                    <Music2 size={18} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-stone-900">
                    {item.type}
                  </h4>
                  <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Wedding Repertoire Showcase */}
            <div className="bg-[#FAF8F5] border border-stone-200 p-8 rounded-lg space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">
                    Popular Wedding Ceremony Repertoire
                  </h4>
                  <p className="text-stone-600 text-xs font-sans mt-1">
                    Couples are welcome to request special songs or personal arrangements.
                  </p>
                </div>
                <span className="text-xs font-sans text-rose-700 uppercase tracking-widest font-bold">
                  Classical • Sacred • Irish • Acoustic
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {weddingEventData.repertoireCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-3 bg-white p-5 border border-stone-200 rounded-md shadow-2xs">
                    <h5 className="text-xs font-sans uppercase tracking-widest text-rose-700 font-bold pb-2 border-b border-stone-200">
                      {cat.category}
                    </h5>
                    <ul className="space-y-2 text-xs font-sans text-stone-700">
                      {cat.pieces.map((piece, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-rose-600 text-sm leading-none">•</span>
                          <span>{piece}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Accompaniment Options & Consultation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#FAF8F5] border border-stone-200 p-8 rounded-lg shadow-sm">
              <div className="space-y-4">
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Accompaniment & Ensemble Options
                </h4>
                <p className="text-stone-600 text-sm font-sans leading-relaxed">
                  Sarah works closely with Ireland's finest professional church organists, concert harpists, string players, and pianists to deliver a polished, cohesive musical experience.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {weddingEventData.accompaniment.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2 text-xs font-sans text-stone-800 bg-white p-2.5 rounded border border-stone-200 shadow-2xs">
                      <CheckCircle2 size={14} className="text-rose-600 shrink-0" />
                      <span className="font-medium">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 border border-rose-200 rounded-lg space-y-4 text-center shadow-xs">
                <Sparkles className="mx-auto text-amber-700" size={28} />
                <h5 className="font-serif text-xl font-bold text-stone-900">
                  Personal Musical Consultation
                </h5>
                <p className="text-stone-600 text-xs font-sans leading-relaxed">
                  Includes personalized telephone / video consultation to guide you through music placement, liturgical permissions, and accompanist coordination.
                </p>
                <button
                  onClick={() => onNavigateToContact && onNavigateToContact("Wedding Ceremony Booking Inquiry")}
                  className="w-full py-2.5 bg-rose-700 text-white text-xs font-sans font-bold uppercase tracking-widest rounded hover:bg-rose-800 transition cursor-pointer"
                >
                  Inquire for Your Wedding
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FUNERAL & MEMORIAL SERVICES */}
        {currentTab === "funeral" && (
          <div id="events-funeral-content" className="space-y-12 animate-fadeIn">
            {/* Funeral Intro Banner */}
            <div className="bg-gradient-to-br from-stone-50 via-white to-amber-50/40 border border-stone-200 p-8 sm:p-10 rounded-lg shadow-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-sans tracking-[0.25em] text-amber-800 uppercase font-bold flex items-center gap-2">
                  <Feather size={14} /> Sacred Music & Funeral Singing
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
                  {funeralEventData.title}
                </h3>
                <p className="text-stone-700 font-sans text-base leading-relaxed">
                  {funeralEventData.description}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigateToContact && onNavigateToContact("Funeral & Memorial Service Inquiry")}
                    className="px-6 py-3 bg-stone-900 text-white text-xs font-sans tracking-widest uppercase font-bold rounded hover:bg-rose-700 transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Funeral Music Support</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Service Formats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {funeralEventData.serviceTypes.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] border border-stone-200 p-6 rounded-lg hover:border-stone-400 transition duration-300 space-y-3 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-700">
                    <Disc size={18} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-stone-900">
                    {item.type}
                  </h4>
                  <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Repertoire for Funerals */}
            <div className="bg-[#FAF8F5] border border-stone-200 p-8 rounded-lg space-y-6 shadow-sm">
              <div className="border-b border-stone-200 pb-4">
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Comforting Sacred Hymns & Traditional Farewells
                </h4>
                <p className="text-stone-600 text-xs font-sans mt-1">
                  Gentle, dignified selections chosen in consultation with the family and parish celebrant.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {funeralEventData.repertoireCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-3 bg-white p-5 border border-stone-200 rounded-md shadow-2xs">
                    <h5 className="text-xs font-sans uppercase tracking-widest text-amber-800 font-bold pb-2 border-b border-stone-200">
                      {cat.category}
                    </h5>
                    <ul className="space-y-2 text-xs font-sans text-stone-700">
                      {cat.pieces.map((piece, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-rose-600 text-sm leading-none">•</span>
                          <span>{piece}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Funeral Accompaniment & Sensitive Support */}
            <div className="bg-[#FAF8F5] border border-stone-200 p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2">
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  Compassionate Direct Booking & Organist Coordination
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
                  Sarah handles all liaison with church organists, funeral directors, and parish priests on your behalf to ensure seamless, stress-free delivery.
                </p>
              </div>
              <button
                onClick={() => onNavigateToContact && onNavigateToContact("Funeral & Memorial Service Inquiry")}
                className="shrink-0 px-6 py-2.5 bg-white hover:bg-rose-700 hover:text-white text-stone-800 text-xs font-sans uppercase tracking-wider font-bold rounded border border-stone-300 transition cursor-pointer shadow-2xs"
              >
                Direct Inquiry
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: CORPORATE & PRIVATE EVENTS */}
        {currentTab === "corporate" && (
          <div id="events-corporate-content" className="space-y-12 animate-fadeIn">
            {/* Corporate Intro Banner */}
            <div className="bg-gradient-to-br from-amber-50/50 via-white to-rose-50/40 border border-amber-200/80 p-8 sm:p-10 rounded-lg shadow-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-sans tracking-[0.25em] text-amber-800 uppercase font-bold flex items-center gap-2">
                  <Building2 size={14} /> Corporate Galas, Banquets & VIP Recitals
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
                  {corporateEventData.title}
                </h3>
                <p className="text-stone-700 font-sans text-base leading-relaxed">
                  {corporateEventData.description}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigateToContact && onNavigateToContact("Corporate Gala / Event Inquiry")}
                    className="px-6 py-3 bg-rose-700 text-white text-xs font-sans tracking-widest uppercase font-bold rounded hover:bg-rose-800 transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Corporate Performance Proposal</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Corporate Offerings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {corporateEventData.eventTypes.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] border border-stone-200 p-6 rounded-lg hover:border-amber-400 transition duration-300 space-y-3 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                    <Sparkles size={18} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    {item.type}
                  </h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Corporate Repertoire Categories */}
            <div className="bg-[#FAF8F5] border border-stone-200 p-8 rounded-lg space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">
                    Signature Showpieces & High-Impact Arias
                  </h4>
                  <p className="text-stone-600 text-xs font-sans mt-1">
                    Custom tailored to your event timeline, whether as an opening fanfare, awards accompaniment, or grand finale.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {corporateEventData.repertoireCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-3 bg-white p-5 border border-stone-200 rounded-md shadow-2xs">
                    <h5 className="text-xs font-sans uppercase tracking-widest text-amber-800 font-bold pb-2 border-b border-stone-200">
                      {cat.category}
                    </h5>
                    <ul className="space-y-2 text-xs font-sans text-stone-700">
                      {cat.pieces.map((piece, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-rose-600 text-sm leading-none">•</span>
                          <span>{piece}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Specifications & Inquiries */}
            <div className="bg-[#FAF8F5] border border-stone-200 p-8 rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
              <div className="lg:col-span-8 space-y-4">
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Technical & Event Production Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {corporateEventData.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs font-sans text-stone-800 font-medium">
                      <CheckCircle2 size={15} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white p-6 border border-amber-200 rounded-lg text-center space-y-4 shadow-2xs">
                <h5 className="font-serif text-lg font-bold text-stone-900">
                  Request a Formal Quote
                </h5>
                <p className="text-xs text-stone-600 font-sans">
                  Direct management contact for enterprise booking, technical riders, and date availability.
                </p>
                <button
                  onClick={() => onNavigateToContact && onNavigateToContact("Corporate Gala / Event Inquiry")}
                  className="w-full py-2.5 bg-rose-700 text-white text-xs font-sans font-bold uppercase tracking-widest rounded hover:bg-rose-800 transition shadow cursor-pointer"
                >
                  Contact Management
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
