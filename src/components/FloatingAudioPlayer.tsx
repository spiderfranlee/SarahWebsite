import React from "react";
import { Play, Pause, X, Disc, Youtube } from "lucide-react";
import { AudioTrack } from "../types";

interface FloatingAudioPlayerProps {
  currentTrack: AudioTrack;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onOpenVideo?: () => void;
}

export default function FloatingAudioPlayer({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onClose,
  onOpenVideo
}: FloatingAudioPlayerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full bg-white/95 border border-stone-300 backdrop-blur-md p-3.5 rounded-lg shadow-2xl animate-fadeIn flex items-center justify-between gap-3 text-stone-900">
      {/* Vinyl / Disc icon with spinning animation */}
      <div className="relative shrink-0">
        <div
          className={`w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "6s" }}
        >
          <Disc size={18} />
        </div>
      </div>

      {/* Track Info */}
      <div className="overflow-hidden flex-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
          <span className="text-[9px] font-sans tracking-widest text-rose-700 uppercase font-bold">
            {isPlaying ? "Playing Aria" : "Aria Paused"}
          </span>
        </div>
        <p className="font-serif text-xs font-bold text-stone-900 truncate mt-0.5">
          {currentTrack.title}
        </p>
        <p className="text-[10px] font-sans text-stone-500 truncate">
          {currentTrack.composer} · {currentTrack.work}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        {currentTrack.youtubeId && onOpenVideo && (
          <button
            onClick={onOpenVideo}
            title="Watch YouTube video"
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
          >
            <Youtube size={16} />
          </button>
        )}

        <button
          onClick={onTogglePlay}
          className="w-8 h-8 rounded-full bg-rose-700 hover:bg-rose-800 text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm cursor-pointer"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={13} className="fill-white" />
          ) : (
            <Play size={13} className="fill-white ml-0.5" />
          )}
        </button>

        <button
          onClick={onClose}
          className="p-1 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          aria-label="Close audio player"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
