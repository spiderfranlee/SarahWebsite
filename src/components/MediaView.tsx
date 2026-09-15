import React, { useState, useEffect } from "react";
import { Play, Pause, Film, Image as ImageIcon, Maximize2, Youtube, ExternalLink, Video, Columns2, LayoutGrid } from "lucide-react";
import { audioRecordings, mediaShowcase, artistData } from "../data";
import { AudioTrack, MediaItem } from "../types";
import VideoFacade from "./VideoFacade";

export type MediaTabType = "all" | "recordings" | "gallery";

interface MediaViewProps {
  currentTrack: AudioTrack;
  isPlaying: boolean;
  activeMediaTab?: MediaTabType;
  onTabChange?: (tab: MediaTabType) => void;
  onTogglePlay: (track: AudioTrack) => void;
  onSelectMedia: (item: MediaItem) => void;
}

export default function MediaView({
  currentTrack,
  isPlaying,
  activeMediaTab = "all",
  onTabChange,
  onTogglePlay,
  onSelectMedia
}: MediaViewProps) {
  const [currentTab, setCurrentTab] = useState<MediaTabType>(activeMediaTab);
  const [layoutMode, setLayoutMode] = useState<"grid" | "compact">("grid");

  useEffect(() => {
    if (activeMediaTab) {
      setCurrentTab(activeMediaTab);
    }
  }, [activeMediaTab]);

  const handleTabChange = (tab: MediaTabType) => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const filteredMedia = mediaShowcase.filter((item) => {
    if (currentTab === "all" || currentTab === "gallery") return true;
    return false;
  });

  const handleOpenVideoForTrack = (track: AudioTrack, e: React.MouseEvent) => {
    e.stopPropagation();
    const matchedMedia = mediaShowcase.find(
      (m) => (track.youtubeId && m.youtubeId === track.youtubeId) || m.title.toLowerCase().includes(track.title.toLowerCase())
    );
    if (matchedMedia) {
      onSelectMedia(matchedMedia);
    } else if (track.youtubeId || track.videoUrl) {
      onSelectMedia({
        id: `track-${track.id}`,
        title: track.title,
        category: (track.category === "Opera Aria" ? "Opera" : "Concert") as any,
        type: "video",
        thumbnailUrl: track.youtubeId ? `https://i.ytimg.com/vi/${track.youtubeId}/hqdefault.jpg` : "",
        videoUrl: track.videoUrl || (track.youtubeId ? `https://www.youtube.com/watch?v=${track.youtubeId}` : ""),
        youtubeId: track.youtubeId,
        composer: track.composer,
        work: track.work,
        description: `Live vocal performance of ${track.title} (${track.work}) by soprano Sarah Guilmartin Lavery. Accompaniment: ${track.accompaniment}.`
      });
    }
  };

  return (
    <section id="media" className="py-24 bg-[#FAF8F5] border-t border-stone-200 relative">
      <div id="recordings" className="absolute -top-20" />
      <div id="gallery" className="absolute top-[40%]" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-sans tracking-[0.3em] text-gold-700 uppercase font-bold">
                RECORDINGS & GALLERY
              </span>
              <a
                href={artistData.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded text-[11px] font-sans font-bold transition-colors cursor-pointer"
              >
                <Youtube size={13} className="text-red-600" />
                <span>YouTube Channel</span>
                <ExternalLink size={10} />
              </a>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
              Media
            </h2>
            <div className="w-16 h-[2px] bg-gold-500 mt-4" />
          </div>

          {/* Media Format Filter */}
          <div className="flex items-center gap-1 bg-white p-1 border border-stone-200 rounded-md shadow-2xs">
            {[
              { id: "all", label: "All Media" },
              { id: "recordings", label: "Recordings" },
              { id: "gallery", label: "Gallery" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as MediaTabType)}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase font-bold rounded transition-all cursor-pointer ${
                  currentTab === tab.id
                    ? "bg-navy-900 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 1: Featured Interactive Audio Jukebox Player (Recordings) */}
        {(currentTab === "all" || currentTab === "recordings") && (
          <div className="mb-16 bg-white border border-stone-200 p-6 md:p-10 rounded-lg shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-stone-200">
              {/* Active Playing Track Info */}
              <div className="flex items-center gap-5">
                <button
                  onClick={() => onTogglePlay(currentTrack)}
                  className="w-16 h-16 rounded-full bg-navy-900 hover:bg-navy-850 text-gold-300 flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? "Pause Aria" : "Play Aria"}
                >
                  {isPlaying ? (
                    <Pause size={24} className="fill-gold-300" />
                  ) : (
                    <Play size={24} className="fill-gold-300 ml-1" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 bg-gold-50 text-navy-950 border border-gold-200 font-bold rounded">
                      {isPlaying ? "Now Playing" : "Selected Aria"}
                    </span>
                    <span className="text-xs font-sans text-stone-500 font-medium">{currentTrack.category}</span>
                    {currentTrack.youtubeId && (
                      <span className="text-[10px] font-sans px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded font-bold flex items-center gap-1">
                        <Youtube size={11} />
                        <span>Video Available</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs font-sans text-stone-600">
                    {currentTrack.work} · <span className="text-gold-700 font-bold">{currentTrack.composer}</span>
                  </p>
                </div>
              </div>

              {/* Controls and Audio Waveform Visualizer */}
              <div className="flex items-center gap-3">
                {currentTrack.youtubeId && (
                  <button
                    onClick={(e) => handleOpenVideoForTrack(currentTrack, e)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-md text-xs font-sans font-bold transition-colors cursor-pointer"
                  >
                    <Video size={14} />
                    <span>Watch Video</span>
                  </button>
                )}

                <div className="flex items-center gap-1.5 h-10 px-4 bg-stone-50 border border-stone-200 rounded-md">
                  {[12, 28, 16, 32, 22, 38, 18, 30, 24, 14, 34, 20, 26, 12, 30, 18].map((h, i) => (
                    <span
                      key={i}
                      style={{
                        height: isPlaying ? `${Math.max(6, (h * (0.6 + 0.4 * Math.sin(i + Date.now() / 200))))}px` : "6px"
                      }}
                      className={`w-1 rounded-full transition-all duration-200 ${
                        isPlaying ? "bg-gold-500" : "bg-stone-300"
                      }`}
                    />
                  ))}
                  <span className="ml-3 text-[11px] font-sans text-stone-500 font-medium">{currentTrack.duration}</span>
                </div>
              </div>
            </div>

            {/* Audio Track List */}
            <div className="mt-6">
              <p className="text-xs font-sans tracking-widest uppercase text-stone-600 font-bold mb-4">
                Select from Studio, Concert & YouTube Recordings:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {audioRecordings.map((track) => {
                  const isCurrent = currentTrack.id === track.id;
                  const isCurrentPlaying = isCurrent && isPlaying;
                  return (
                    <div
                      key={track.id}
                      onClick={() => onTogglePlay(track)}
                      className={`w-full p-3.5 text-left rounded-md border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                        isCurrent
                          ? "bg-gold-50/80 border-gold-300 shadow-sm text-stone-900"
                          : "bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-700"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            isCurrent
                              ? "bg-navy-900 text-gold-300"
                              : "bg-stone-100 text-stone-600"
                          }`}
                        >
                          {isCurrentPlaying ? (
                            <Pause size={12} className="fill-current" />
                          ) : (
                            <Play size={12} className="fill-current ml-0.5" />
                          )}
                        </div>

                        <div className="truncate">
                          <p className="font-serif text-sm font-bold text-stone-900 truncate">
                            {track.title}
                          </p>
                          <p className="text-[11px] font-sans text-stone-500 truncate">
                            {track.composer} · {track.work}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {track.youtubeId && (
                          <button
                            onClick={(e) => handleOpenVideoForTrack(track, e)}
                            title="Watch live YouTube performance"
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          >
                            <Youtube size={16} />
                          </button>
                        )}
                        <span className="text-xs font-sans text-stone-400 font-medium">
                          {track.duration}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Performance Gallery */}
        {(currentTab === "all" || currentTab === "gallery") && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-gold-700 block mb-1">
                  VOCAL HIGHLIGHTS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                  Gallery & Video Performances
                </h3>
              </div>

              {/* View Layout Controls & Video Count */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-sans text-stone-500 font-medium">
                  {filteredMedia.length} Performances
                </span>

                <div className="hidden sm:flex items-center p-1 bg-white border border-stone-200 rounded-lg shadow-2xs">
                  <button
                    onClick={() => setLayoutMode("grid")}
                    title="2×2 Balanced Grid View"
                    aria-label="2x2 Balanced Grid View"
                    className={`p-1.5 rounded transition-all cursor-pointer ${
                      layoutMode === "grid"
                        ? "bg-navy-900 text-gold-300 shadow-xs"
                        : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                    }`}
                  >
                    <Columns2 size={16} />
                  </button>
                  <button
                    onClick={() => setLayoutMode("compact")}
                    title="4-Column Compact View"
                    aria-label="4-Column Compact View"
                    className={`p-1.5 rounded transition-all cursor-pointer ${
                      layoutMode === "compact"
                        ? "bg-navy-900 text-gold-300 shadow-xs"
                        : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                    }`}
                  >
                    <LayoutGrid size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Cards Grid - Balanced 2x2 or Compact 4-Column */}
            <div
              className={
                layoutMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-8"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              }
            >
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-stone-200 hover:border-gold-400/80 rounded-xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
                >
                  {/* Video Thumbnail with Clean Framing (No duplicate text overlays) */}
                  {item.type === "video" ? (
                    <VideoFacade
                      youtubeId={item.youtubeId}
                      title={item.title}
                      thumbnailUrl={item.thumbnailUrl}
                      aspectRatio="wide"
                      showBottomBanner={false}
                      onOpenModal={() => onSelectMedia(item)}
                    />
                  ) : (
                    <div
                      onClick={() => onSelectMedia(item)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View photo: ${item.title}`}
                      className="group relative aspect-[16/9] overflow-hidden bg-stone-900 cursor-pointer"
                    >
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded border border-stone-200 text-[10px] tracking-wider uppercase font-bold text-navy-900 shadow-2xs">
                        <ImageIcon size={11} />
                        <span>{item.category}</span>
                      </div>
                      <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 flex items-center justify-center transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/90 text-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          <Maximize2 size={16} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Information Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Composer & Category Pill */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {item.composer ? (
                          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold-700 font-bold block truncate">
                            {item.composer}
                          </span>
                        ) : (
                          <span />
                        )}
                        <span className="shrink-0 text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
                          {item.category}
                        </span>
                      </div>

                      {/* Main Title */}
                      <h4
                        onClick={() => onSelectMedia(item)}
                        className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-navy-950 transition-colors cursor-pointer leading-snug line-clamp-2"
                      >
                        {item.title}
                      </h4>

                      {/* Work/Role */}
                      {item.work && (
                        <p className="text-xs font-sans text-stone-500 font-medium italic mt-1 line-clamp-1">
                          {item.work}
                        </p>
                      )}

                      {/* Musical Synopsis */}
                      <p className="text-xs sm:text-sm font-sans text-stone-600 mt-2.5 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs font-sans">
                      <button
                        onClick={() => onSelectMedia(item)}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-navy-900 hover:bg-navy-850 text-gold-300 hover:text-white rounded-md font-bold tracking-wider uppercase transition-all duration-200 shadow-xs cursor-pointer group-hover:bg-gold-600 group-hover:text-white"
                      >
                        <Play size={12} className="fill-current" />
                        <span>Watch Video</span>
                      </button>

                      <div className="flex items-center gap-3">
                        {item.youtubeId && (
                          <a
                            href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-stone-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-stone-50"
                            title="Open directly on YouTube"
                            aria-label="Open on YouTube"
                          >
                            <Youtube size={17} />
                          </a>
                        )}
                        {item.year && (
                          <span className="font-mono text-xs text-stone-400 font-medium">
                            {item.year}
                          </span>
                        )}
                      </div>
                    </div>
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
