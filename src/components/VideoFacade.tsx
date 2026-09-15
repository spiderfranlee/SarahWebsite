import React, { useState } from "react";
import { Play, Youtube, Clock, ExternalLink } from "lucide-react";

interface VideoFacadeProps {
  id?: string;
  youtubeId?: string;
  title: string;
  subtitle?: string;
  thumbnailUrl: string;
  duration?: string;
  aspectRatio?: "video" | "wide";
  showBottomBanner?: boolean;
  onOpenModal?: () => void;
  inlinePlay?: boolean;
}

export default function VideoFacade({
  youtubeId,
  title,
  subtitle,
  thumbnailUrl,
  duration,
  aspectRatio = "wide",
  showBottomBanner = false,
  onOpenModal,
  inlinePlay = false,
}: VideoFacadeProps) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inlinePlay && youtubeId) {
      setIsPlayingInline(true);
    } else if (onOpenModal) {
      onOpenModal();
    } else if (youtubeId) {
      window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank", "noopener,noreferrer");
    }
  };

  const ratioClass = aspectRatio === "wide" ? "aspect-[16/9]" : "aspect-[16/10]";

  if (isPlayingInline && youtubeId) {
    return (
      <div className={`relative ${ratioClass} w-full overflow-hidden rounded-md bg-stone-900 shadow-md`}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
      className={`group relative ${ratioClass} w-full overflow-hidden rounded-md bg-stone-900 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300`}
    >
      {/* Optimized Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
      />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-stone-950/40 group-hover:from-stone-950/70 transition-colors" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        {youtubeId && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded border border-stone-200 text-[10px] font-sans font-bold uppercase tracking-wider text-red-700 shadow-xs">
            <Youtube size={12} className="text-red-600" />
            <span>Live Recording</span>
          </span>
        )}

        {duration && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] font-sans font-medium text-stone-200">
            <Clock size={10} />
            <span>{duration}</span>
          </span>
        )}
      </div>

      {/* Center Action Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-navy-900 hover:bg-navy-850 text-gold-300 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
          <Play size={22} className="fill-gold-300 ml-0.5" />
        </div>
      </div>

      {/* Bottom Info Banner (optional, hidden in cards to prevent duplicate text) */}
      {showBottomBanner && (title || subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-left pointer-events-none">
          {subtitle && (
            <p className="text-[11px] font-sans font-semibold tracking-wider uppercase text-gold-300 drop-shadow-xs line-clamp-1">
              {subtitle}
            </p>
          )}
          <h4 className="font-serif text-sm sm:text-base font-bold text-white drop-shadow-sm line-clamp-1">
            {title}
          </h4>
        </div>
      )}
    </div>
  );
}
