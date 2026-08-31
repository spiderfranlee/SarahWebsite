import React, { useState } from "react";
import { Play, Pause, Film, Image as ImageIcon, Maximize2, Youtube, ExternalLink, Video } from "lucide-react";
import { audioRecordings, mediaShowcase, artistData } from "../data";
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
        description: `Live vocal performance of ${track.title} (${track.work}) by soprano Sarah Lavery. Accompaniment: ${track.accompaniment}.`
      });
    }
  };

  return (
    <section id="media" className="py-24 bg-[#FAF8F5] border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-sans tracking-[0.3em] text-rose-700 uppercase font-bold">
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
              Media & Audio
            </h2>
            <div className="w-16 h-[2px] bg-rose-600 mt-4" />
          </div>

          {/* Media Format Filter */}
          <div className="flex items-center gap-1 bg-white p-1 border border-stone-200 rounded-md shadow-2xs">
            {[
              { id: "all", label: "All Media" },
              { id: "audio", label: "Audio Player" },
              { id: "video", label: "Live Videos" },
              { id: "photos", label: "Photo Gallery" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMediaTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase font-bold rounded transition-all cursor-pointer ${
                  activeMediaTab === tab.id
                    ? "bg-rose-700 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 1: Featured Interactive Audio Jukebox Player */}
        {(activeMediaTab === "all" || activeMediaTab === "audio") && (
          <div className="mb-16 bg-white border border-stone-200 p-6 md:p-10 rounded-lg shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-stone-200">
              {/* Active Playing Track Info */}
              <div className="flex items-center gap-5">
                <button
                  onClick={() => onTogglePlay(currentTrack)}
                  className="w-16 h-16 rounded-full bg-rose-700 hover:bg-rose-800 text-white flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? "Pause Aria" : "Play Aria"}
                >
                  {isPlaying ? (
                    <Pause size={24} className="fill-white" />
                  ) : (
                    <Play size={24} className="fill-white ml-1" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 font-bold rounded">
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
                    {currentTrack.work} · <span className="text-rose-700 font-bold">{currentTrack.composer}</span>
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
                        isPlaying ? "bg-rose-600" : "bg-stone-300"
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
                          ? "bg-rose-50 border-rose-300 shadow-sm text-stone-900"
                          : "bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-700"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            isCurrent
                              ? "bg-rose-700 text-white"
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

        {/* Section 2: Video Performances and Photo Gallery */}
        {(activeMediaTab === "all" || activeMediaTab === "video" || activeMediaTab === "photos") && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Visual Showcase & Performances
              </h3>
              <span className="text-xs font-sans text-stone-500 tracking-wider font-semibold">
                {filteredMedia.length} Items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectMedia(item)}
                  className="group bg-white border border-stone-200 hover:border-rose-300 rounded-md overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded border border-stone-200 text-[10px] tracking-wider uppercase font-bold text-rose-700 shadow-2xs">
                      {item.type === "video" ? (
                        item.youtubeId ? (
                          <Youtube size={12} className="text-red-600" />
                        ) : (
                          <Film size={11} />
                        )
                      ) : (
                        <ImageIcon size={11} />
                      )}
                      <span>{item.category}</span>
                    </div>

                    {/* YouTube Watermark if applicable */}
                    {item.youtubeId && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[9px] font-sans font-bold text-white uppercase tracking-widest flex items-center gap-1">
                        <Youtube size={10} className="text-red-500" />
                        <span>YouTube</span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/20 flex items-center justify-center transition-colors">
                      {item.type === "video" ? (
                        <div className="w-12 h-12 rounded-full bg-rose-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={18} className="fill-white ml-0.5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/90 text-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          <Maximize2 size={16} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    {item.composer && (
                      <span className="text-[11px] font-sans uppercase tracking-wider text-rose-700 font-bold block mb-1">
                        {item.composer} {item.work ? `· ${item.work}` : ""}
                      </span>
                    )}
                    <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-rose-700 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs font-sans text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100 text-[10px] font-sans text-stone-400 font-semibold tracking-wider">
                      <span>{item.type === "video" ? "Watch Video Performance" : "High-Resolution Image"}</span>
                      {item.year && <span>{item.year}</span>}
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
