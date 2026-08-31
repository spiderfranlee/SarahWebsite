import { useEffect } from "react";
import { X, Film, Image as ImageIcon, ExternalLink, Youtube } from "lucide-react";
import { MediaItem } from "../types";

interface MediaModalProps {
  isOpen: boolean;
  item: MediaItem | null;
  onClose: () => void;
}

export default function MediaModal({ isOpen, item, onClose }: MediaModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const isVideo = item.type === "video";

  // Helper to construct secure embed URL
  const getEmbedUrl = () => {
    if (item.youtubeId) {
      return `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`;
    }
    if (item.videoUrl) {
      if (item.videoUrl.includes("embed/")) {
        return item.videoUrl.includes("?") ? `${item.videoUrl}&autoplay=1` : `${item.videoUrl}?autoplay=1`;
      }
      const match = item.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
      }
    }
    return "https://www.youtube.com/embed/UBx3agwNmB0?autoplay=1&rel=0";
  };

  const getWatchUrl = () => {
    if (item.youtubeId) {
      return `https://www.youtube.com/watch?v=${item.youtubeId}`;
    }
    return item.videoUrl || `https://www.youtube.com/@SarahGuilmartinLavery-soprano`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <div className="relative bg-white border border-stone-200 text-stone-900 max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 bg-rose-50 border border-rose-200 rounded text-[10px] font-sans tracking-widest text-rose-700 uppercase font-bold flex items-center gap-1.5">
              {isVideo ? <Film size={12} /> : <ImageIcon size={12} />}
              <span>{item.category}</span>
            </span>
            {item.composer && (
              <span className="text-rose-800 text-xs font-sans font-bold">
                · {item.composer}
              </span>
            )}
            {item.year && (
              <span className="text-stone-500 text-xs font-sans font-medium">
                · {item.year}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Media Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          <div className="w-full bg-stone-950 aspect-video relative rounded-md overflow-hidden border border-stone-200 shadow-inner">
            {isVideo ? (
              <iframe
                src={getEmbedUrl()}
                title={item.title}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            ) : (
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {item.title}
              </h3>
              {isVideo && (
                <a
                  href={getWatchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-sans font-bold tracking-wider uppercase transition-colors shrink-0 shadow-2xs"
                >
                  <Youtube size={14} />
                  <span>Watch on YouTube</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
            <p className="text-stone-600 font-sans text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <span className="text-[11px] font-sans text-stone-500 font-medium">
            Sarah Guilmartin Lavery · Soprano Recordings & Performance Archive
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-sans uppercase tracking-widest font-bold rounded transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
