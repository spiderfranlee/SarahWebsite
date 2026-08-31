import { useEffect } from "react";
import { X, Play, Maximize2, Film, Image as ImageIcon } from "lucide-react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/90 backdrop-blur-md"
      />

      {/* Modal Card */}
      <div className="relative bg-stone-900 border border-stone-800 text-stone-100 max-w-4xl w-full rounded-sm overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 bg-stone-900 border border-stone-800 rounded-xs text-[10px] font-sans tracking-widest text-gold-accent uppercase font-bold flex items-center gap-1.5">
              {isVideo ? <Film size={12} /> : <ImageIcon size={12} />}
              <span>{item.category}</span>
            </span>
            {item.year && (
              <span className="text-stone-400 text-xs font-sans">
                · {item.year}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-100 p-1.5 rounded-sm hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Media Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          <div className="w-full bg-stone-950 aspect-video relative rounded-sm overflow-hidden border border-stone-800">
            {isVideo ? (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
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

          <div className="space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
              {item.title}
            </h3>
            <p className="text-stone-300 font-sans text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-sans uppercase tracking-widest font-semibold rounded-sm transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
