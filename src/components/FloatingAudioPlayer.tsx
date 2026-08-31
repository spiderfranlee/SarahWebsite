import React from "react";
import { Play, Pause, Volume2, X, Music, Disc } from "lucide-react";
import { AudioTrack } from "../types";

interface FloatingAudioPlayerProps {
  currentTrack: AudioTrack;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export default function FloatingAudioPlayer({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onClose
}: FloatingAudioPlayerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full bg-stone-950/95 border border-gold-accent/40 backdrop-blur-md p-4 rounded-sm shadow-2xl animate-fadeIn flex items-center justify-between gap-4">
      {/* Vinyl / Disc icon with spinning animation */}
      <div className="relative shrink-0">
        <div
          className={`w-11 h-11 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-gold-accent ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "6s" }}
        >
          <Disc size={20} />
        </div>
      </div>

      {/* Track Info */}
      <div className="overflow-hidden flex-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-pulse" />
          <span className="text-[9px] font-sans tracking-widest text-gold-accent uppercase font-bold">
            {isPlaying ? "Playing Aria" : "Aria Paused"}
          </span>
        </div>
        <p className="font-serif text-xs font-bold text-stone-100 truncate mt-0.5">
          {currentTrack.title}
        </p>
        <p className="text-[10px] font-sans text-stone-400 truncate">
          {currentTrack.composer} · {currentTrack.work}
        </p>
      </div>

      {/* Play/Pause & Close Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onTogglePlay}
          className="w-8 h-8 rounded-full bg-gold-accent hover:bg-[#d8b56f] text-stone-950 flex items-center justify-center transition-transform active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={13} className="fill-stone-950" />
          ) : (
            <Play size={13} className="fill-stone-950 ml-0.5" />
          )}
        </button>

        <button
          onClick={onClose}
          className="p-1 text-stone-400 hover:text-stone-100 transition-colors"
          aria-label="Close audio player"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
