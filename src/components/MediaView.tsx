import React, { useState } from "react";
import { Play, Pause, Volume2, Music, Film, Image as ImageIcon, Sparkles, ExternalLink, Maximize2 } from "lucide-react";
import { audioRecordings, mediaShowcase } from "../data";
import { AudioTrack, MediaItem } from "../types";

interface MediaViewProps {
  currentTrack: AudioTrack;
  isPlaying: boolean;
  onTogglePlay: (track: AudioTrack) => void;
  onSelectMedia: (item: MediaItem) => void;
}

export default function MediaView({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onSelectMedia
}: MediaViewProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<"all" | "audio" | "video" | "photos">("all");

  const filteredMedia = mediaShowcase.filter((item) => {
    if (activeMediaTab === "all") return true;
    if (activeMediaTab === "video") return item.type === "video";
    if (activeMediaTab === "photos") return item.type === "image";
    return true;
  });

  return (
    <section id="media" className="py-24 bg-stone-950 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-gold-accent uppercase font-semibold block mb-2">
              RECORDINGS & GALLERY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
              Media & Audio
            </h2>
            <div className="w-16 h-[2px] bg-gold-accent mt-4" />
          </div>

          {/* Media Format Filter */}
          <div className="flex items-center gap-1 bg-stone-900/80 p-1 border border-stone-800 rounded-sm">
            {[
              { id: "all", label: "All Media" },
              { id: "audio", label: "Audio Player" },
              { id: "video", label: "Live Videos" },
              { id: "photos", label: "Photo Gallery" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMediaTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase font-semibold rounded-sm transition-all ${
                  activeMediaTab === tab.id
                    ? "bg-gold-accent text-stone-950 shadow-md"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 1: Featured Interactive Audio Jukebox Player */}
        {(activeMediaTab === "all" || activeMediaTab === "audio") && (
          <div className="mb-16 bg-stone-900/60 border border-stone-800 p-6 md:p-10 rounded-sm shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-stone-800">
              {/* Active Playing Track Info */}
              <div className="flex items-center gap-5">
                <button
                  onClick={() => onTogglePlay(currentTrack)}
                  className="w-16 h-16 rounded-full bg-gold-accent hover:bg-[#d8b56f] text-stone-950 flex items-center justify-center shrink-0 shadow-xl transition-transform active:scale-95"
                  aria-label={isPlaying ? "Pause Aria" : "Play Aria"}
                >
                  {isPlaying ? (
                    <Pause size={24} className="fill-stone-950" />
                  ) : (
                    <Play size={24} className="fill-stone-950 ml-1" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 bg-stone-950 text-gold-accent border border-gold-accent/40 font-semibold rounded-xs">
                      {isPlaying ? "Now Playing" : "Selected Aria"}
                    </span>
                    <span className="text-xs font-sans text-stone-400">{currentTrack.category}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 mt-1">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs font-sans text-stone-300">
                    {currentTrack.work} · <span className="text-gold-accent">{currentTrack.composer}</span>
                  </p>
                </div>
              </div>

              {/* Fake animated audio waveform visualizer */}
              <div className="flex items-center gap-1.5 h-10 px-4 bg-stone-950/80 border border-stone-800 rounded-sm">
                {[12, 28, 16, 32, 22, 38, 18, 30, 24, 14, 34, 20, 26, 12, 30, 18].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      height: isPlaying ? `${Math.max(6, (h * (0.6 + 0.4 * Math.sin(i + Date.now() / 200))))}px` : "6px"
                    }}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isPlaying ? "bg-gold-accent" : "bg-stone-700"
                    }`}
                  />
                ))}
                <span className="ml-3 text-[11px] font-sans text-stone-400">{currentTrack.duration}</span>
              </div>
            </div>

            {/* Audio Track List */}
            <div className="mt-6">
              <p className="text-xs font-sans tracking-widest uppercase text-stone-500 font-semibold mb-4">
                Select from Studio & Concert Recordings:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {audioRecordings.map((track) => {
                  const isCurrent = currentTrack.id === track.id;
                  const isCurrentPlaying = isCurrent && isPlaying;
                  return (
                    <button
                      key={track.id}
                      onClick={() => onTogglePlay(track)}
                      className={`w-full p-3.5 text-left rounded-sm border transition-all flex items-center justify-between gap-4 ${
                        isCurrent
                          ? "bg-stone-950 border-gold-accent/70 shadow-lg text-white"
                          : "bg-stone-950/50 hover:bg-stone-950 border-stone-800/80 hover:border-stone-700 text-stone-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            isCurrent
                              ? "bg-gold-accent text-stone-950"
                              : "bg-stone-800 text-stone-400"
                          }`}
                        >
                          {isCurrentPlaying ? (
                            <Pause size={12} className="fill-current" />
                          ) : (
                            <Play size={12} className="fill-current ml-0.5" />
                          )}
                        </div>

                        <div className="truncate">
                          <p className="font-serif text-sm font-bold text-stone-100 truncate">
                            {track.title}
                          </p>
                          <p className="text-[11px] font-sans text-stone-400 truncate">
                            {track.composer} · {track.work}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-sans text-stone-500 shrink-0">
                        {track.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Video Performances and Photo Gallery */}
        {(activeMediaTab === "all" || activeMediaTab === "video" || activeMediaTab === "photos") && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-stone-100">
                Visual Showcase & Performances
              </h3>
              <span className="text-xs font-sans text-stone-500 tracking-wider">
                {filteredMedia.length} Items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectMedia(item)}
                  className="group bg-stone-900/40 border border-stone-800/80 hover:border-gold-accent/60 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-stone-950/90 backdrop-blur-md rounded-xs border border-stone-800 text-[10px] tracking-wider uppercase font-semibold text-gold-accent">
                      {item.type === "video" ? <Film size={11} /> : <ImageIcon size={11} />}
                      <span>{item.category}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/10 flex items-center justify-center transition-colors">
                      {item.type === "video" ? (
                        <div className="w-12 h-12 rounded-full bg-gold-accent text-stone-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play size={18} className="fill-stone-950 ml-0.5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-stone-900/80 text-stone-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 size={16} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-serif text-lg font-bold text-stone-100 group-hover:text-gold-accent transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs font-sans text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    {item.year && (
                      <span className="text-[10px] font-sans text-stone-500 tracking-wider block mt-3">
                        {item.year} Production
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
