import React, { useState } from "react";
import { Calendar as CalendarIcon, MapPin, ExternalLink, Clock, User, Filter, Ticket } from "lucide-react";
import { scheduleData } from "../data";
import { EventItem } from "../types";

export default function ScheduleView() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showPast, setShowPast] = useState<boolean>(false);

  // Filter events based on category and upcoming vs past
  const filteredEvents = scheduleData.filter((event) => {
    const isPast = event.status === "Past Performance";
    if (showPast ? !isPast : isPast) return false;

    if (selectedFilter === "all") return true;
    return event.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <section id="schedule" className="py-24 bg-stone-950 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-gold-accent uppercase font-semibold block mb-2">
              PERFORMANCES & DIARY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
              Schedule & Engagements
            </h2>
            <div className="w-16 h-[2px] bg-gold-accent mt-4" />
          </div>

          {/* Toggle Upcoming vs Past */}
          <div className="flex items-center gap-2 bg-stone-900/80 p-1 border border-stone-800 rounded-sm">
            <button
              onClick={() => setShowPast(false)}
              className={`px-4 py-2 text-xs font-sans tracking-wider uppercase font-semibold rounded-sm transition-all ${
                !showPast
                  ? "bg-gold-accent text-stone-950 shadow-md"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Upcoming Season (2026/27)
            </button>
            <button
              onClick={() => setShowPast(true)}
              className={`px-4 py-2 text-xs font-sans tracking-wider uppercase font-semibold rounded-sm transition-all ${
                showPast
                  ? "bg-gold-accent text-stone-950 shadow-md"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Past Archive
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-stone-800/60">
          <span className="text-xs text-stone-500 font-sans uppercase tracking-widest flex items-center gap-1.5 mr-2">
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
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-sans tracking-wider rounded-sm transition-all ${
                selectedFilter === tab.id
                  ? "bg-stone-800 text-gold-accent border border-gold-accent/40 font-semibold"
                  : "bg-stone-900/50 text-stone-400 hover:text-stone-200 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Schedule List Cards */}
        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center bg-stone-900/30 border border-stone-800 rounded-sm">
            <p className="text-stone-400 font-serif text-lg">No performances found in this category.</p>
            <button
              onClick={() => { setSelectedFilter("all"); setShowPast(false); }}
              className="mt-3 text-xs font-sans tracking-widest text-gold-accent uppercase underline"
            >
              View Upcoming Performances
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="group bg-stone-900/40 hover:bg-stone-900/90 border border-stone-800/80 hover:border-gold-accent/50 p-6 rounded-sm transition-all duration-300 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Date badge & Production info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Date Column */}
                  <div className="w-36 shrink-0 border-l-2 border-gold-accent pl-3 sm:border-l-0 sm:pl-0 sm:text-center sm:bg-stone-950 sm:p-3 sm:border sm:border-stone-800 sm:rounded-sm">
                    <span className="text-xs font-sans font-bold tracking-widest text-gold-accent uppercase block">
                      {evt.date.split(" ")[0]} {evt.date.split(" ")[2]}
                    </span>
                    <span className="font-serif text-2xl font-bold text-stone-100 leading-none">
                      {evt.date.split(" ")[1]?.replace(",", "")}
                    </span>
                    {evt.time && (
                      <span className="text-[11px] font-sans text-stone-400 mt-1 flex items-center justify-start sm:justify-center gap-1">
                        <Clock size={11} /> {evt.time}
                      </span>
                    )}
                  </div>

                  {/* Production & Role */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-stone-950 text-gold-accent border border-gold-accent/30 text-[10px] tracking-wider uppercase font-semibold rounded-xs">
                        {evt.category}
                      </span>
                      <span className="text-xs font-sans tracking-wider text-stone-400">
                        {evt.company}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 group-hover:text-gold-accent transition-colors">
                      {evt.title}
                    </h3>

                    <p className="text-sm font-sans text-stone-300 flex items-center gap-1.5 font-medium">
                      <span className="text-gold-accent">Role:</span> {evt.role}
                    </p>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-stone-400 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-stone-500" />
                        <span>{evt.venue}, {evt.city}</span>
                      </span>
                      {evt.conductor && (
                        <span className="flex items-center gap-1">
                          <User size={13} className="text-stone-500" />
                          <span>Cond: {evt.conductor}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Action Button */}
                <div className="shrink-0 flex items-center gap-3 self-start lg:self-center">
                  {evt.status === "Past Performance" ? (
                    <span className="px-4 py-2 bg-stone-950 border border-stone-800 text-stone-500 text-xs font-sans tracking-wider uppercase rounded-sm">
                      Completed
                    </span>
                  ) : (
                    <a
                      href={evt.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-stone-900 hover:bg-gold-accent text-stone-200 hover:text-stone-950 border border-stone-700/80 hover:border-gold-accent text-xs font-sans tracking-widest font-bold uppercase transition-all duration-300 rounded-sm flex items-center gap-2 shadow-md group/btn"
                    >
                      <Ticket size={14} className="text-gold-accent group-hover/btn:text-stone-950 transition-colors" />
                      <span>{evt.status}</span>
                      <ExternalLink size={13} className="opacity-70" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
