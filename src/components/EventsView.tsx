import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  MapPin,
  ExternalLink,
  Clock,
  User,
  Heart,
  Music2,
  Sparkles,
  Building2,
  ChevronRight,
  Disc,
  Feather
} from "lucide-react";
import { scheduleData, weddingEventData, funeralEventData, corporateEventData, funeralRepertoireSelection } from "../data";

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

  return (
    <section id="engagements" className="py-24 bg-white border-t border-stone-200 relative">
      {/* Anchor for backward compatibility with #events */}
      <div id="events" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-gold-700 uppercase font-bold block mb-2">
              PERFORMANCES & SPECIAL OCCASIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
              Engagements
            </h2>
            <div className="w-16 h-[2px] bg-gold-500 mt-4" />
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
                ? "bg-navy-900 text-gold-300 shadow-md font-bold"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 font-semibold"
            }`}
          >
            <CalendarIcon size={14} />
            <span>Upcoming performances</span>
          </button>

          <button
            id="events-tab-weddings"
            onClick={() => handleSwitchTab("weddings")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans tracking-wider uppercase rounded-md transition-all cursor-pointer ${
              currentTab === "weddings"
                ? "bg-navy-900 text-gold-300 shadow-md font-bold"
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
                ? "bg-navy-900 text-gold-300 shadow-md font-bold"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 font-semibold"
            }`}
          >
            <Feather size={14} />
            <span>Funerals</span>
          </button>

          <button
            id="events-tab-corporate"
            onClick={() => handleSwitchTab("corporate")}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans tracking-wider uppercase rounded-md transition-all cursor-pointer ${
              currentTab === "corporate"
                ? "bg-navy-900 text-gold-300 shadow-md font-bold"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 font-semibold"
            }`}
          >
            <Building2 size={14} />
            <span>Corporate</span>
          </button>
        </div>

        {/* TAB 1: UPCOMING PERFORMANCES */}
        {currentTab === "upcoming" && (
          <div id="events-upcoming-content" className="space-y-6 animate-fadeIn">
            {/* Season Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="text-xs font-sans tracking-widest text-gold-800 uppercase font-bold">
                Upcoming Season Engagements
              </span>
              <span className="text-xs font-sans text-stone-500 font-medium">
                {scheduleData.length} Confirmed Productions
              </span>
            </div>

            {/* Performance Event Cards */}
            <div className="space-y-5">
              {scheduleData.map((evt) => (
                <div
                  key={evt.id}
                  className="group bg-[#FAF8F5] hover:bg-gold-50/30 border border-stone-200 hover:border-gold-300 p-5 sm:p-6 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6"
                >
                    {/* Left & Middle: Poster / Date & Production Details */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
                      {/* Event Poster / Official Production Artwork */}
                      {evt.imageUrl && (
                        <a
                          href={evt.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View official production for ${evt.title}`}
                          className="relative w-full sm:w-36 md:w-44 h-48 sm:h-32 md:h-36 rounded-lg overflow-hidden shrink-0 border border-stone-200/90 shadow-2xs bg-navy-950 block group/poster"
                        >
                          <img
                            src={evt.imageUrl}
                            alt={`${evt.title} official production artwork`}
                            className="w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-500"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null;
                              if (evt.fallbackImageUrl && target.src !== evt.fallbackImageUrl) {
                                target.src = evt.fallbackImageUrl;
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent flex items-end p-2.5">
                            <span className="text-[10px] font-sans font-bold text-gold-300 tracking-wider uppercase truncate">
                              {evt.domain || evt.company}
                            </span>
                          </div>
                        </a>
                      )}

                      {/* Date Badge */}
                      <div className="w-full sm:w-36 shrink-0 border-l-3 border-gold-600 pl-3 sm:border-l-0 sm:pl-0 sm:text-center sm:bg-white sm:p-3 sm:border sm:border-stone-200 sm:rounded-lg shadow-2xs">
                        <span className="text-[11px] font-sans font-bold tracking-widest text-gold-800 uppercase block">
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
                          <span className="px-2.5 py-0.5 bg-gold-50 text-navy-950 border border-gold-200 text-[10px] tracking-wider uppercase font-bold rounded-sm">
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

                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-navy-900 transition-colors">
                          {evt.title}
                        </h3>

                        {/* Dates detail list */}
                        {evt.datesDetail && (
                          <p className="text-xs font-sans text-stone-600 font-semibold flex items-center gap-1.5">
                            <CalendarIcon size={12} className="text-gold-600 shrink-0" />
                            <span>Performance Dates: <strong className="text-stone-900 font-bold">{evt.datesDetail}</strong></span>
                          </p>
                        )}

                        {/* Performance Role & Custom Performer Note */}
                        <div className="space-y-1">
                          <p className="text-sm font-sans text-stone-800 flex items-center gap-1.5 font-medium">
                            <span className="text-gold-700 font-bold">Role:</span> {evt.role}
                          </p>
                          {evt.notes && (
                            <p className="text-xs font-sans text-stone-700 bg-gold-50/70 border-l-2 border-gold-500 px-2.5 py-1 rounded-r italic">
                              {evt.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-stone-500 pt-1">
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-gold-600 shrink-0" />
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
                          className="flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-850 text-gold-300 text-xs font-sans tracking-wider uppercase font-bold rounded-md transition-all shadow-xs hover:shadow-sm cursor-pointer whitespace-nowrap"
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
                          className="text-[11px] font-sans text-stone-600 hover:text-gold-700 transition-colors hidden sm:block underline decoration-stone-300"
                        >
                          {evt.domain}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}

        {/* TAB 2: WEDDINGS */}
        {currentTab === "weddings" && (
          <div id="events-weddings-content" className="space-y-12 animate-fadeIn">
            {/* Wedding Intro Banner */}
            <div className="bg-gradient-to-br from-gold-50 via-white to-stone-50 border border-gold-200 p-8 sm:p-10 rounded-lg shadow-sm relative overflow-hidden">
              <div className="max-w-3xl relative z-10 space-y-4">
                <span className="text-xs font-sans tracking-[0.25em] text-navy-950 uppercase font-bold flex items-center gap-2">
                  <Heart size={14} className="fill-gold-600 text-gold-600" /> Wedding Ceremony Vocalist
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
                    className="px-6 py-3 bg-navy-900 text-gold-300 text-xs font-sans tracking-widest uppercase font-bold rounded hover:bg-navy-850 transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Send an Inquiry</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Ceremony Formats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weddingEventData.ceremonyTypes.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] border border-stone-200 p-6 rounded-lg hover:border-gold-300 transition duration-300 space-y-3 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700">
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
          </div>
        )}

        {/* TAB 3: FUNERAL & MEMORIAL SERVICES */}
        {currentTab === "funeral" && (
          <div id="events-funeral-content" className="space-y-12 animate-fadeIn">
            {/* Funeral Intro Banner */}
            <div className="bg-gradient-to-br from-stone-50 via-white to-gold-50/40 border border-stone-200 p-8 sm:p-10 rounded-lg shadow-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-sans tracking-[0.25em] text-gold-800 uppercase font-bold flex items-center gap-2">
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
                    className="px-6 py-3 bg-navy-900 text-gold-300 text-xs font-sans tracking-widest uppercase font-bold rounded hover:bg-navy-850 transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Send an Inquiry</span>
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
                  className="bg-[#FAF8F5] border border-stone-200 p-6 rounded-lg hover:border-gold-300 transition duration-300 space-y-3 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700">
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

            {/* Funeral Music - Repertoire Selection */}
            <div id="funeral-music-repertoire" className="bg-[#FAF8F5] border border-stone-200 p-8 sm:p-10 rounded-lg space-y-8 shadow-sm">
              <div className="border-b border-stone-200 pb-6 text-center max-w-3xl mx-auto space-y-2">
                <span className="text-xs font-sans tracking-[0.3em] text-gold-700 uppercase font-bold block">
                  {funeralRepertoireSelection.subHeader}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {funeralRepertoireSelection.header}
                </h4>
                <p className="text-stone-700 text-sm font-sans leading-relaxed pt-2">
                  {funeralRepertoireSelection.intro}
                </p>
              </div>

              {/* Liturgical Stages Grid (6 distinct sections) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {funeralRepertoireSelection.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 border border-stone-200 rounded-md shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 pb-3 border-b border-stone-200 mb-3">
                        <Music2 size={14} className="text-gold-700 shrink-0" />
                        <h5 className="text-xs font-sans uppercase tracking-wider text-stone-900 font-bold">
                          {sec.title}
                        </h5>
                      </div>
                      <ul className="space-y-2 text-xs font-sans text-stone-700">
                        {sec.pieces.map((piece, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-gold-600 text-sm leading-none">•</span>
                            <span className="leading-snug">{piece}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* S G L Brand Monogram & Warm Welcome Note */}
              <div className="pt-6 border-t border-stone-200 text-center space-y-3">
                <div className="inline-block py-1">
                  <span className="font-serif text-2xl font-bold tracking-[0.4em] text-stone-900 block pl-[0.4em]">
                    {funeralRepertoireSelection.monogram}
                  </span>
                  <span className="text-[11px] font-sans tracking-[0.25em] text-gold-700 font-bold uppercase mt-1 block">
                    {funeralRepertoireSelection.tagline}
                  </span>
                </div>
                <p className="text-stone-700 text-xs sm:text-sm font-sans italic pt-1">
                  "{funeralRepertoireSelection.footerNote}"
                </p>
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
                className="shrink-0 px-6 py-2.5 bg-white hover:bg-navy-900 hover:text-gold-300 text-stone-800 text-xs font-sans uppercase tracking-wider font-bold rounded border border-stone-300 transition cursor-pointer shadow-2xs"
              >
                Send an Inquiry
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: CORPORATE & PRIVATE EVENTS */}
        {currentTab === "corporate" && (
          <div id="events-corporate-content" className="space-y-12 animate-fadeIn">
            {/* Corporate Intro Banner */}
            <div className="bg-gradient-to-br from-gold-50/50 via-white to-stone-50 border border-gold-200/80 p-8 sm:p-10 rounded-lg shadow-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-sans tracking-[0.25em] text-gold-800 uppercase font-bold flex items-center gap-2">
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
                    className="px-6 py-3 bg-navy-900 text-gold-300 text-xs font-sans tracking-widest uppercase font-bold rounded hover:bg-navy-850 transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Send an Inquiry</span>
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
                  className="bg-[#FAF8F5] border border-stone-200 p-6 rounded-lg hover:border-gold-300 transition duration-300 space-y-3 shadow-2xs flex flex-col justify-start"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-800">
                    <Sparkles size={18} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                    {item.type}
                  </h4>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
