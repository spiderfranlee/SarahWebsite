import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { GalleryPhoto } from "../types";

interface PhotoLightboxProps {
  isOpen: boolean;
  photos: GalleryPhoto[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function PhotoLightbox({
  isOpen,
  photos,
  currentIndex,
  onClose,
  onSelectIndex
}: PhotoLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, photos.length]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = () => {
    const nextIdx = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    onSelectIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    onSelectIndex(nextIdx);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/90 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Photo Gallery Lightbox"
    >
      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded text-[11px] font-sans tracking-widest text-gold-300 uppercase font-bold flex items-center gap-1.5">
            <ImageIcon size={12} />
            <span>{currentPhoto.category || "Gallery"}</span>
          </span>
          <span className="text-white/60 font-mono text-xs">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Stage: Left Arrow, Image, Right Arrow */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-12 min-h-0">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-gold-300 border border-white/10 hover:border-gold-400 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Center High-Res Image */}
        <div className="relative max-w-5xl max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center">
          <img
            key={currentPhoto.url}
            src={currentPhoto.url}
            alt={currentPhoto.title || `Performance photograph ${currentIndex + 1}`}
            className="max-w-full max-h-[75vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded shadow-2xl border border-white/10 select-none animate-fadeIn"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-gold-300 border border-white/10 hover:border-gold-400 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Thumbnails Strip */}
      <div className="relative z-10 px-4 py-3 bg-gradient-to-t from-black/90 to-transparent">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 overflow-x-auto py-2 scrollbar-thin">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => onSelectIndex(idx)}
              className={`shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                idx === currentIndex
                  ? "border-gold-400 scale-110 shadow-md opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            >
              <img
                src={photo.url}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
